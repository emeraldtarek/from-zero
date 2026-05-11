import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {
  CONTENT_DIR,
  PHASE_DIRS,
  GLOSSARY_PATH,
  KNOWLEDGE_TRACKER_PATH,
  QA_PATH,
  PROGRESS_LOG_PATH,
} from "./paths";
import { getDb, type ConceptStatus, type PageRow } from "./db";
import { slugify } from "./slug";

/**
 * User-data tracking files (.env.example pattern). The seed templates live
 * at `*.example.md` and are committed; the live `*.md` files are gitignored
 * and auto-copied from the template on first run.
 */
const USER_DATA_FILES = [
  GLOSSARY_PATH,
  KNOWLEDGE_TRACKER_PATH,
  QA_PATH,
  PROGRESS_LOG_PATH,
];

export function bootstrapUserData(): { created: string[]; skipped: string[] } {
  const created: string[] = [];
  const skipped: string[] = [];
  for (const live of USER_DATA_FILES) {
    if (fs.existsSync(live)) {
      skipped.push(live);
      continue;
    }
    const example = live.replace(/\.md$/, ".example.md");
    if (!fs.existsSync(example)) {
      // No template available — leave it; the individual regenerate*/append*
      // functions will create a fresh file with their own initial header.
      continue;
    }
    fs.mkdirSync(path.dirname(live), { recursive: true });
    fs.copyFileSync(example, live);
    created.push(live);
  }
  return { created, skipped };
}

export type DiscoveredPage = {
  slug: string;
  phase_id: string;
  phase_number: number;
  file_order: number;
  title: string;
  relative_path: string;
  absolute_path: string;
  content: string;
  word_count: number;
  content_hash: string;
};

const HASH = (s: string) =>
  crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);

function extractTitle(content: string, fallback: string) {
  const m = content.match(/^\s*#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

export function discoverPages(): DiscoveredPage[] {
  const out: DiscoveredPage[] = [];
  for (const phase of PHASE_DIRS) {
    const dir = path.join(CONTENT_DIR, phase.id);
    if (!fs.existsSync(dir)) continue;
    const entries = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .sort();
    for (const file of entries) {
      const abs = path.join(dir, file);
      const stat = fs.statSync(abs);
      if (!stat.isFile()) continue;
      const content = fs.readFileSync(abs, "utf8");
      const base = file.replace(/\.md$/, "");
      const orderMatch = base.match(/^(\d+)/);
      const file_order = orderMatch ? Number.parseInt(orderMatch[1], 10) : 999;
      const titleFallback = base
        .replace(/^\d+-?/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const title = extractTitle(content, titleFallback);
      const slug = `${phase.id}/${base}`;
      out.push({
        slug,
        phase_id: phase.id,
        phase_number: phase.number,
        file_order,
        title,
        relative_path: path.join(phase.id, file),
        absolute_path: abs,
        content,
        word_count: wordCount(content),
        content_hash: HASH(content),
      });
    }
  }
  out.sort((a, b) => {
    if (a.phase_number !== b.phase_number) return a.phase_number - b.phase_number;
    return a.file_order - b.file_order;
  });
  return out;
}

export function syncPagesToDb(): { added: number; updated: number; total: number } {
  const db = getDb();
  const pages = discoverPages();
  const upsert = db.prepare(`
    INSERT INTO pages (slug, phase_id, phase_number, file_order, title, relative_path, content, content_hash, word_count, updated_at)
    VALUES (@slug, @phase_id, @phase_number, @file_order, @title, @relative_path, @content, @content_hash, @word_count, datetime('now'))
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      content = excluded.content,
      content_hash = excluded.content_hash,
      word_count = excluded.word_count,
      file_order = excluded.file_order,
      relative_path = excluded.relative_path,
      updated_at = datetime('now')
    WHERE pages.content_hash != excluded.content_hash
       OR pages.title != excluded.title
       OR pages.file_order != excluded.file_order
  `);
  const before = db.prepare("SELECT COUNT(*) AS n FROM pages").get() as { n: number };
  const tx = db.transaction((rows: DiscoveredPage[]) => {
    for (const p of rows) upsert.run(p);
  });
  tx(pages);
  const after = db.prepare("SELECT COUNT(*) AS n FROM pages").get() as { n: number };
  return { added: after.n - before.n, updated: pages.length, total: after.n };
}

// ---------------------------------------------------------------------------
// Concept seeding from knowledge-tracker.md
//
// The tracker uses this shape (per phase):
//   ## Phase 1 — Chemistry fundamentals
//   ### Matter & atoms
//   - ⏳ What "matter" is, and its relationship to mass and energy
//   - 🔴 ...
//   - 🟡 ...
//   - ✅ ...
//
// We map each bullet into a concept row. Phase header → phase_id mapping:
//   Phase 1 → 01-chemistry-fundamentals
//   Phase 2 → 02-water-treatment
//   Phase 3 → 03-lithium-isotope-separation
// ---------------------------------------------------------------------------

const SYMBOL_TO_STATUS: Record<string, ConceptStatus> = {
  "⏳": "todo",
  "🔴": "exposed",
  "🟡": "comfortable",
  "✅": "solid",
};

const PHASE_HEADER_TO_ID: Record<string, string> = {
  "1": "01-chemistry-fundamentals",
  "2": "02-water-treatment",
  "3": "03-lithium-isotope-separation",
};

export type DiscoveredConcept = {
  slug: string;
  phase_id: string;
  section: string | null;
  label: string;
  sort_order: number;
  status: ConceptStatus;
};

export function discoverConcepts(): DiscoveredConcept[] {
  const trackerPath = path.join(CONTENT_DIR, "04-learning", "knowledge-tracker.md");
  if (!fs.existsSync(trackerPath)) return [];
  const text = fs.readFileSync(trackerPath, "utf8");

  const out: DiscoveredConcept[] = [];
  let phase_id: string | null = null;
  let section: string | null = null;
  let order = 0;

  const phaseRe = /^##\s+Phase\s+(\d+)/i;
  const sectionRe = /^###\s+(.+)$/;
  const itemRe = /^[-*]\s+(⏳|🔴|🟡|✅)\s+(.+)$/u;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trimEnd();
    const phaseMatch = line.match(phaseRe);
    if (phaseMatch) {
      phase_id = PHASE_HEADER_TO_ID[phaseMatch[1]] ?? null;
      section = null;
      continue;
    }
    const sectionMatch = line.match(sectionRe);
    if (sectionMatch) {
      section = sectionMatch[1].trim();
      continue;
    }
    const itemMatch = line.match(itemRe);
    if (itemMatch && phase_id) {
      const status = SYMBOL_TO_STATUS[itemMatch[1]] ?? "todo";
      const label = itemMatch[2].trim();
      const slug = `${phase_id}/${slugify(`${section ?? ""}-${label}`)}`;
      out.push({
        slug,
        phase_id,
        section,
        label,
        sort_order: order++,
        status,
      });
    }
  }
  return out;
}

export function syncConceptsToDb(): { total: number; inserted: number } {
  const db = getDb();
  const concepts = discoverConcepts();
  const before = (db.prepare("SELECT COUNT(*) AS n FROM concepts").get() as { n: number }).n;
  const insert = db.prepare(`
    INSERT INTO concepts (slug, phase_id, section, label, sort_order, status)
    VALUES (@slug, @phase_id, @section, @label, @sort_order, @status)
    ON CONFLICT(slug) DO UPDATE SET
      label = excluded.label,
      section = excluded.section,
      sort_order = excluded.sort_order,
      phase_id = excluded.phase_id,
      updated_at = datetime('now')
  `);
  const tx = db.transaction((rows: DiscoveredConcept[]) => {
    for (const c of rows) insert.run(c);
  });
  tx(concepts);
  const after = (db.prepare("SELECT COUNT(*) AS n FROM concepts").get() as { n: number }).n;
  return { total: after, inserted: after - before };
}

export function getPageBySlug(slug: string): PageRow | null {
  const db = getDb();
  return (db.prepare("SELECT * FROM pages WHERE slug = ?").get(slug) as PageRow) ?? null;
}

export function listPages(): PageRow[] {
  const db = getDb();
  return db
    .prepare(
      "SELECT * FROM pages ORDER BY phase_number ASC, file_order ASC, slug ASC",
    )
    .all() as PageRow[];
}

export function listConcepts() {
  const db = getDb();
  return db
    .prepare(
      "SELECT * FROM concepts ORDER BY phase_id ASC, sort_order ASC",
    )
    .all() as import("./db").ConceptRow[];
}

export function ensureSeeded() {
  bootstrapUserData();
  const db = getDb();
  const pageCount = (db.prepare("SELECT COUNT(*) AS n FROM pages").get() as { n: number }).n;
  if (pageCount === 0) syncPagesToDb();
  const conceptCount = (db.prepare("SELECT COUNT(*) AS n FROM concepts").get() as { n: number }).n;
  if (conceptCount === 0) syncConceptsToDb();
  const nodeCount = (db.prepare("SELECT COUNT(*) AS n FROM corpus_node").get() as { n: number }).n;
  if (nodeCount === 0) {
    // Lazy-import to avoid pulling fs/crypto into edge bundles.
    import("./corpus-builder").then((m) => m.buildCorpusIndex()).catch(() => {});
  }
}
