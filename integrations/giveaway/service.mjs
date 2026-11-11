import { DatabaseSync } from 'node:sqlite';
import { createHmac } from 'node:crypto';

export const CAMPAIGN = 'BFCM 2026 Giveaway';
export function normalize(body) {
  const email = String(body.email || '').trim().toLowerCase();
  const digits = String(body.phone || '').replace(/\D/g, '');
  const phone = digits.length === 10 ? '+1' + digits : digits.length === 11 && digits[0] === '1' ? '+' + digits : '';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+1[2-9]\d{2}[2-9]\d{6}$/.test(phone)) throw new Error('invalid_fields');
  return { email, phone };
}

export class DeliveryError extends Error {
  constructor(code, review = false) { super(code); this.review = review; }
}

export function makePipedrive({ domain, token, fetchImpl = fetch }) {
  if (!/^[a-z0-9][a-z0-9-]*\.pipedrive\.com$/.test(domain) || !token) throw new Error('invalid_pipedrive_config');
  async function api(path, body) {
    const method = body ? 'POST' : 'GET';
    let response;
    try {
      response = await fetchImpl(`https://${domain}/api/${path}`, {
        method, headers: { 'x-api-token': token, 'Content-Type': 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(12000), redirect: 'error'
      });
    } catch { throw new DeliveryError('pipedrive_network', method === 'POST'); }
    if (!response.ok) throw new DeliveryError(`pipedrive_http_${response.status}`, method === 'POST' && response.status >= 500);
    let payload;
    try { payload = await response.json(); } catch { throw new DeliveryError('pipedrive_response', method === 'POST'); }
    if (!payload.success || !payload.data) throw new DeliveryError('pipedrive_response', method === 'POST');
    return payload.data;
  }
  return {
    async person({ email, phone }) {
      const result = await api('v2/persons/search?' + new URLSearchParams({ term: email, fields: 'email', exact_match: 'true', limit: '100' }));
      const found = result.items.find(({ item }) => item.emails?.some(e => e.toLowerCase() === email));
      if (found) return found.item.id;
      const person = await api('v2/persons', { name: email, emails: [{ value: email, primary: true, label: 'work' }], phones: [{ value: phone, primary: true, label: 'mobile' }] });
      if (!person.id) throw new DeliveryError('pipedrive_person_id', true);
      return person.id;
    },
    async lead({ email, phone, person_id }) {
      const lead = await api('v1/leads', { title: `${CAMPAIGN} | ${email} | ${phone}`, person_id, origin_id: 'onelaser-bfcm2026-giveaway' });
      if (!lead.id) throw new DeliveryError('pipedrive_lead_id', true);
      return lead.id;
    }
  };
}

export function makeQueue({ filename, secret, pipedrive, now = Date.now, log = console.log }) {
  if (!secret || secret.length < 32) throw new Error('dedupe_secret_too_short');
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, payload TEXT, state TEXT NOT NULL, person_id INTEGER, lead_id TEXT, attempts INTEGER NOT NULL DEFAULT 0, next_at INTEGER NOT NULL, error TEXT, created_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS limits (id TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
    UPDATE jobs SET state='review', error='restart_during_delivery' WHERE state='working';`);
  const hash = value => createHmac('sha256', secret).update(value).digest('hex');
  let running = false;
  return {
    db,
    enqueue(body) {
      const data = normalize(body), id = hash(CAMPAIGN + ':' + data.email);
      db.prepare("INSERT OR IGNORE INTO jobs(id,payload,state,next_at,created_at) VALUES(?,?,'pending',?,?)").run(id, JSON.stringify(data), now(), now());
      const job = db.prepare('SELECT state FROM jobs WHERE id=?').get(id);
      return { accepted: !['review', 'failed'].includes(job.state) };
    },
    allow(ip) {
      db.prepare('DELETE FROM limits WHERE expires < ?').run(now());
      const window = Math.floor(now() / 600000);
      for (const [key, max] of [[hash(ip) + ':' + window, 20], ['global:' + window, 500]]) {
        db.prepare('INSERT INTO limits VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET count=count+1').run(key, now() + 600000);
        if (db.prepare('SELECT count FROM limits WHERE id=?').get(key).count > max) return false;
      }
      return true;
    },
    async tick() {
      if (running) return;
      running = true;
      try {
        const job = db.prepare("SELECT * FROM jobs WHERE state='pending' AND next_at<=? ORDER BY created_at LIMIT 1").get(now());
        if (!job) return;
        db.prepare("UPDATE jobs SET state='working', attempts=attempts+1 WHERE id=?").run(job.id);
        try {
          const data = JSON.parse(job.payload);
          const person_id = job.person_id || await pipedrive.person(data);
          db.prepare('UPDATE jobs SET person_id=? WHERE id=?').run(person_id, job.id);
          const lead_id = await pipedrive.lead({ ...data, person_id });
          db.prepare("UPDATE jobs SET state='done', lead_id=?, payload=NULL, error=NULL WHERE id=?").run(lead_id, job.id);
          log(JSON.stringify({ event: 'giveaway_delivered', id: job.id }));
        } catch (error) {
          const permanent = /http_4\d\d/.test(error.message) && !/http_429/.test(error.message);
          const state = error.review ? 'review' : permanent || job.attempts >= 7 ? 'failed' : 'pending';
          const code = error instanceof DeliveryError ? error.message : 'delivery_internal';
          db.prepare('UPDATE jobs SET state=?, error=?, next_at=? WHERE id=?').run(state, code, now() + Math.min(3600000, 30000 * 2 ** job.attempts), job.id);
          log(JSON.stringify({ event: 'giveaway_delivery_error', id: job.id, state, code }));
        }
      } finally { running = false; }
    },
    close() { db.close(); }
  };
}
