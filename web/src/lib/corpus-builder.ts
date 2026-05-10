/**
 * Build a hierarchical "PageIndex-style" navigation tree over the markdown
 * corpus and persist it to SQLite (`corpus_node`).
 *
 * Nodes are derived from `#` headings:
 *   level 1 → the page itself
 *   level 2 → ## sections within the page
 *   level 3 → ### subsections
 *
 * Each node holds a line range [line_start, line_end] within the source file
 * and a one-sentence `summary` placeholder (first non-heading sentence in the
 * section). LLM-written summaries can backfill later via a separate pass.
 */
import crypto from "node:crypto";
import { getDb, type CorpusNodeRow } from "./db";
import { discoverPages } from "./content-loader";
import { slugify } from "./slug";

type Heading = {
  line: number; // 1-indexed
  level: number; // 1, 2, 3...
  title: string;
};

const HEADING_RE = /^(#{1,6})\s+(.+?)\s*$/;
// Lines inside ``` fences are not headings.
function findHeadings(source: string): Heading[] {
  const lines = source.split(/\r?\n/);
  const out: Heading[] = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(HEADING_RE);
    if (m) {
      out.push({ line: i + 1, level: m[1].length, title: m[2].trim() });
    }
  }
  return out;
}

function firstSentence(text: string): string {
  // Skip the leading heading line; collapse to first sentence.
  const body = text
    .split(/\r?\n/)
    .filter((l) => !/^\s*#/.test(l))
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/`+/g, "")
    .trim();
  if (!body) return "";
  // Sentence boundary: . ! ? followed by space + capital, or end of string.
  const m = body.match(/^(.{20,400}?[.!?])(\s|$)/);
  return (m ? m[1] : body.slice(0, 240)).trim();
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function hash(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
}

function dedupSlug(base: string, used: Set<string>): string {
  if (!used.has(base)) {
    used.add(base);
    return base;
  }
  let i = 2;
  while (used.has(`${base}-${i}`)) i++;
  used.add(`${base}-${i}`);
  return `${base}-${i}`;
}

export function buildCorpusIndex(): { added: number; total: number; pages: number } {
  const db = getDb();
  const pages = discoverPages();
  const beforeCount = (db.prepare("SELECT COUNT(*) AS n FROM corpus_node").get() as { n: number }).n;

  const upsert = db.prepare(`
    INSERT INTO corpus_node (
      slug, page_slug, phase_id, phase_number, file, parent_slug, level, title,
      line_start, line_end, sort_order, summary, word_count, content_hash, updated_at
    ) VALUES (
      @slug, @page_slug, @phase_id, @phase_number, @file, @parent_slug, @level, @title,
      @line_start, @line_end, @sort_order, @summary, @word_count, @content_hash, datetime('now')
    )
    ON CONFLICT(slug) DO UPDATE SET
      page_slug = excluded.page_slug,
      phase_id = excluded.phase_id,
      phase_number = excluded.phase_number,
      file = excluded.file,
      parent_slug = excluded.parent_slug,
      level = excluded.level,
      title = excluded.title,
      line_start = excluded.line_start,
      line_end = excluded.line_end,
      sort_order = excluded.sort_order,
      summary = excluded.summary,
      word_count = excluded.word_count,
      content_hash = excluded.content_hash,
      updated_at = datetime('now')
  `);

  const deletePageNodes = db.prepare("DELETE FROM corpus_node WHERE page_slug = ?");

  const tx = db.transaction(() => {
    let globalOrder = 0;
    for (const page of pages) {
      // Wipe and re-insert this page's nodes — keeps the table clean across
      // header renames.
      deletePageNodes.run(page.slug);

      const lines = page.content.split(/\r?\n/);
      const headings = findHeadings(page.content);

      // Synthesize a level-1 heading for the page if none exists.
      const hasH1 = headings.some((h) => h.level === 1);
      const effective: Heading[] = hasH1
        ? headings
        : [{ line: 1, level: 1, title: page.title }, ...headings];

      type Node = Heading & {
        slug: string;
        parent_slug: string | null;
        line_end: number;
      };
      const stack: Node[] = [];
      const nodes: Node[] = [];
      const usedSlugs = new Set<string>();

      for (let i = 0; i < effective.length; i++) {
        const h = effective[i];
        // Pop until the top is strictly higher in level (smaller number)
        while (stack.length && stack[stack.length - 1].level >= h.level) stack.pop();
        const parent = stack[stack.length - 1] ?? null;

        // Slug:
        //   level 1 → page.slug (matches pages.slug for joining)
        //   level 2+ → page.slug + "#" + slugified-heading (deduped per-page)
        let slug: string;
        if (h.level === 1 && parent === null) {
          slug = page.slug;
        } else {
          const headSlug = slugify(h.title) || `section-${i}`;
          const candidate = `${page.slug}#${headSlug}`;
          slug = dedupSlug(candidate, usedSlugs);
        }

        // line_end: until the next heading at level <= h.level, or EOF
        let line_end = lines.length;
        for (let j = i + 1; j < effective.length; j++) {
          if (effective[j].level <= h.level) {
            line_end = effective[j].line - 1;
            break;
          }
        }

        nodes.push({
          ...h,
          slug,
          parent_slug: parent ? parent.slug : null,
          line_end,
        });
        stack.push({ ...h, slug, parent_slug: parent ? parent.slug : null, line_end });
      }

      const cacheLookup = db.prepare(
        "SELECT summary FROM summary_cache WHERE content_hash = ?",
      );

      for (const n of nodes) {
        const sectionLines = lines.slice(n.line - 1, n.line_end);
        const sectionText = sectionLines.join("\n");
        const content_hash = hash(sectionText);
        const cached = cacheLookup.get(content_hash) as { summary: string } | undefined;
        const summary = cached ? cached.summary : firstSentence(sectionText);
        upsert.run({
          slug: n.slug,
          page_slug: page.slug,
          phase_id: page.phase_id,
          phase_number: page.phase_number,
          file: page.relative_path,
          parent_slug: n.parent_slug,
          level: n.level,
          title: n.title,
          line_start: n.line,
          line_end: n.line_end,
          sort_order: globalOrder++,
          summary: summary || null,
          word_count: wordCount(sectionText),
          content_hash,
        });
      }
    }
  });
  tx();

  const after = (db.prepare("SELECT COUNT(*) AS n FROM corpus_node").get() as { n: number }).n;
  return { added: after - beforeCount, total: after, pages: pages.length };
}

// Convenience accessors used by the rest of the app.

export function listCorpusNodes(): CorpusNodeRow[] {
  return getDb()
    .prepare("SELECT * FROM corpus_node ORDER BY sort_order ASC")
    .all() as CorpusNodeRow[];
}

export function getCorpusNode(slug: string): CorpusNodeRow | null {
  return (
    (getDb().prepare("SELECT * FROM corpus_node WHERE slug = ?").get(slug) as CorpusNodeRow) ??
    null
  );
}

export function listCorpusNodesByPhase(phase_id: string): CorpusNodeRow[] {
  return getDb()
    .prepare("SELECT * FROM corpus_node WHERE phase_id = ? ORDER BY sort_order ASC")
    .all(phase_id) as CorpusNodeRow[];
}
