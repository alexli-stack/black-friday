import { createServer } from 'node:http';
import { mkdirSync } from 'node:fs';
import { makePipedrive, makeQueue } from './service.mjs';

export function makeHandler({ queue, origins, trustProxy = false }) {
  return async (req, res) => {
    const send = (code, data) => { res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(JSON.stringify(data)); };
    if (req.url === '/healthz' && req.method === 'GET') return send(200, { ok: true });
    if (req.url !== '/api/giveaway') return send(404, { error: 'not_found' });
    const origin = req.headers.origin;
    if (!origins.has(origin)) return send(403, { error: 'origin_not_allowed' });
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return send(204, null);
    }
    if (req.method !== 'POST') return send(405, { error: 'method_not_allowed' });
    if (req.headers['content-type']?.split(';')[0] !== 'application/json') return send(415, { error: 'json_required' });
    const ip = trustProxy ? String(req.headers['x-forwarded-for'] || '').split(',').at(-1).trim() || req.socket.remoteAddress : req.socket.remoteAddress;
    try {
      if (!queue.allow(ip)) return send(429, { error: 'rate_limited' });
      let raw = '', size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 4096) { send(413, { error: 'body_too_large' }); return; }
        raw += chunk;
      }
      let body;
      try { body = JSON.parse(raw); } catch { return send(400, { error: 'invalid_json' }); }
      if (!body || typeof body !== 'object' || Array.isArray(body)) return send(400, { error: 'invalid_fields' });
      const result = queue.enqueue(body);
      return send(result.accepted ? 202 : 503, result);
    } catch (error) {
      return send(error.message === 'invalid_fields' ? 400 : 503, { error: error.message === 'invalid_fields' ? 'invalid_fields' : 'temporarily_unavailable' });
    }
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.umask(0o077);
  const dataDir = process.env.DATA_DIR || './data';
  mkdirSync(dataDir, { recursive: true });
  const origins = new Set((process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean));
  if (!origins.size) throw new Error('allowed_origins_required');
  const queue = makeQueue({ filename: `${dataDir}/giveaway.sqlite`, secret: process.env.DEDUPE_SECRET, pipedrive: makePipedrive({ domain: process.env.PIPEDRIVE_DOMAIN, token: process.env.PIPEDRIVE_API_TOKEN }) });
  const timer = setInterval(() => queue.tick(), 2000);
  const server = createServer({ requestTimeout: 15000, headersTimeout: 10000 }, makeHandler({ queue, origins, trustProxy: process.env.TRUST_PROXY === 'true' }));
  server.listen(Number(process.env.PORT || 3000), '0.0.0.0');
  process.on('SIGTERM', () => { clearInterval(timer); server.close(() => process.exit(0)); });
}
