import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(`${process.env.DATA_DIR || './data'}/giveaway.sqlite`, { readOnly: true });
console.log(JSON.stringify({
  counts: db.prepare('SELECT state, count(*) AS count FROM jobs GROUP BY state').all(),
  attention: db.prepare("SELECT id, state, person_id, lead_id, attempts, error, created_at FROM jobs WHERE state IN ('review','failed')").all()
}, null, 2));
db.close();
