import { getDb } from "../src/lib/db";
const db = getDb();
const bad = db
  .prepare(
    `SELECT content_hash, summary FROM summary_cache
       WHERE summary LIKE '%# %'
          OR summary LIKE 'I %'
          OR summary LIKE 'Summary%'
          OR summary LIKE 'Here%'
          OR summary LIKE 'This section%'
          OR length(summary) > 320`,
  )
  .all() as Array<{ content_hash: string; summary: string }>;
console.log("bad cache rows:", bad.length);
for (const b of bad.slice(0, 8)) console.log("  -", b.summary.slice(0, 100));
const del = db.prepare("DELETE FROM summary_cache WHERE content_hash = ?");
for (const b of bad) del.run(b.content_hash);
console.log(`deleted ${bad.length}`);
