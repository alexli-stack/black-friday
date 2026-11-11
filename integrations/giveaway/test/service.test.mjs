import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { normalize, makeQueue, makePipedrive, DeliveryError } from '../service.mjs';
import { makeHandler } from '../server.mjs';

const entry = { email: ' Person@example.com ', phone: '(626) 800-4130' };
const options = { secret: 'x'.repeat(32), log() {} };
test('normalization and required fields match the giveaway US phone rules', () => {
  assert.deepEqual(normalize(entry), { email: 'person@example.com', phone: '+16268004130' });
  for (const bad of [{}, { ...entry, email: 'bad' }, { ...entry, phone: '+442080001234' }]) assert.throws(() => normalize(bad));
});
test('durable deduplication survives restart and clears delivered personal data', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'giveaway-'));
  let persons = 0, leads = 0;
  const pipedrive = { async person() { persons++; return 12; }, async lead(data) { leads++; assert.equal(data.person_id, 12); return 'lead-12'; } };
  const config = { ...options, filename: join(dir, 'db.sqlite'), pipedrive };
  let queue = makeQueue(config);
  assert.equal(queue.enqueue(entry).accepted, true);
  queue.close(); queue = makeQueue(config);
  queue.enqueue({ ...entry, email: 'PERSON@example.com' });
  await Promise.all([queue.tick(), queue.tick()]);
  queue.enqueue(entry); await queue.tick();
  assert.equal(persons, 1); assert.equal(leads, 1);
  assert.equal(queue.db.prepare('SELECT payload FROM jobs').get().payload, null);
  queue.close(); rmSync(dir, { recursive: true });
});
test('safe retry reuses saved person and uncertain lead creation stops for review', async () => {
  let clock = 0, persons = 0, leads = 0;
  const queue = makeQueue({ ...options, filename: ':memory:', now: () => clock, pipedrive: {
    async person() { persons++; return 10; },
    async lead() { leads++; throw new DeliveryError(leads === 1 ? 'pipedrive_http_429' : 'pipedrive_network', leads > 1); }
  } });
  queue.enqueue(entry); await queue.tick();
  assert.equal(queue.db.prepare('SELECT state FROM jobs').get().state, 'pending');
  clock = 60000; await queue.tick(); await queue.tick();
  assert.equal(persons, 1); assert.equal(leads, 2);
  assert.equal(queue.db.prepare('SELECT state FROM jobs').get().state, 'review');
  assert.equal(queue.enqueue(entry).accepted, false); queue.close();
});
test('restart during a write holds the job for review instead of duplicating it', () => {
  const dir = mkdtempSync(join(tmpdir(), 'giveaway-'));
  const config = { ...options, filename: join(dir, 'db'), pipedrive: {} };
  let queue = makeQueue(config); queue.enqueue(entry);
  queue.db.exec("UPDATE jobs SET state='working'"); queue.close();
  queue = makeQueue(config); assert.equal(queue.enqueue(entry).accepted, false);
  queue.close(); rmSync(dir, { recursive: true });
});
test('Pipedrive uses exact email lookup and v2 person / v1 lead schemas with server token', async () => {
  const calls = [];
  const api = makePipedrive({ domain: 'one.pipedrive.com', token: 'private-token', fetchImpl: async (url, init) => {
    calls.push({ url, init });
    const data = url.includes('/search?') ? { items: [] } : url.endsWith('/persons') ? { id: 123 } : { id: 'uuid-lead' };
    return new Response(JSON.stringify({ success: true, data }));
  } });
  const data = normalize(entry), person_id = await api.person(data);
  await api.lead({ ...data, person_id });
  assert.match(calls[0].url, /exact_match=true/);
  assert.match(calls[1].url, /api\/v2\/persons$/);
  assert.deepEqual(JSON.parse(calls[1].init.body).phones, [{ value: '+16268004130', primary: true, label: 'mobile' }]);
  assert.match(calls[2].url, /api\/v1\/leads$/);
  assert.equal(JSON.parse(calls[2].init.body).person_id, 123);
  assert.equal(calls[2].init.headers['x-api-token'], 'private-token');
  assert.ok(calls.every(c => !c.url.includes('private-token')));
});
test('existing contact is reused without overwriting its details', async () => {
  const api = makePipedrive({ domain: 'one.pipedrive.com', token: 'private', fetchImpl: async (url) => {
    assert.match(url, /persons\/search/);
    return new Response(JSON.stringify({ success: true, data: { items: [{ item: { id: 5, emails: ['PERSON@example.com'] } }] } }));
  } });
  assert.equal(await api.person(normalize(entry)), 5);
});
test('public endpoint enforces origin, JSON, size, validation, deduplication and rate limits', async t => {
  const queue = makeQueue({ ...options, filename: ':memory:', pipedrive: {} });
  const server = createServer(makeHandler({ queue, origins: new Set(['https://www.1laser.com']) }));
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  t.after(() => { server.close(); queue.close(); });
  const url = `http://127.0.0.1:${server.address().port}/api/giveaway`;
  const post = (data, origin = 'https://www.1laser.com') => fetch(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  assert.equal((await post(entry, 'https://evil.example')).status, 403);
  assert.equal((await post({})).status, 400);
  assert.equal((await post(null)).status, 400);
  assert.equal((await post({ ...entry, extra: 'x'.repeat(5000) })).status, 413);
  const response = await post(entry); assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), { accepted: true });
  assert.equal((await post(entry)).status, 202);
  assert.equal(queue.db.prepare('SELECT count(*) AS n FROM jobs').get().n, 1);
  for (let i = 0; i < 20; i++) await post(entry);
  assert.equal((await post(entry)).status, 429);
});
