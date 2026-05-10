/**
 * Query helpers over the `corpus_node` tree built by `corpus-builder.ts`.
 *
 * These power the Claude tools (`get_corpus_outline`, `get_section`,
 * `search_corpus`) and the system-prompt outline injection.
 */
import fs from "node:fs";
import path from "node:path";
import { CONTENT_DIR } from "./paths";
import { getDb, type CorpusNodeRow } from "./db";

export type OutlineNode = {
  slug: string;
  title: string;
  level: number;
  parent_slug: string | null;
  page_slug: string;
  phase_id: string;
  phase_number: number;
  word_count: number;
  summary: string | null;
};

export function getCorpusOutline(): OutlineNode[] {
  return getDb()
    .prepare(
      `SELECT slug, title, level, parent_slug, page_slug, phase_id, phase_number,
              word_count, summary
         FROM corpus_node
         ORDER BY sort_order ASC`,
    )
    .all() as OutlineNode[];
}

/**
 * Render the corpus outline as compact Markdown bullets nested by header level.
 * Used for system-prompt injection.
 *
 * Defaults are tuned for prompt injection: H1+H2 only, 80-char summaries.
 * For the full tree (including H3+), call with `maxLevel: 6`.
 */
export function renderOutlineMarkdown(opts: {
  maxLevel?: number;
  summaryLen?: number;
  phase_id?: string;
} = {}): string {
  const maxLevel = opts.maxLevel ?? 2;
  const summaryLen = opts.summaryLen ?? 80;
  const nodes = opts.phase_id
    ? (getDb()
        .prepare(
          `SELECT slug, title, level, parent_slug, page_slug, phase_id, phase_number,
                  word_count, summary
             FROM corpus_node
             WHERE phase_id = ?
             ORDER BY sort_order ASC`,
        )
        .all(opts.phase_id) as OutlineNode[])
    : getCorpusOutline();

  const lines: string[] = [];
  for (const n of nodes) {
    if (n.level > maxLevel) continue;
    const indent = "  ".repeat(Math.max(0, n.level - 1));
    const summary =
      n.summary && summaryLen > 0
        ? ` — ${n.summary.slice(0, summaryLen)}${n.summary.length > summaryLen ? "…" : ""}`
        : "";
    lines.push(`${indent}- \`${n.slug}\`${summary}`);
  }
  return lines.join("\n");
}

export type SectionResult = {
  ok: true;
  slug: string;
  title: string;
  page_slug: string;
  phase_id: string;
  level: number;
  line_start: number;
  line_end: number;
  word_count: number;
  content: string;
};

export type SectionError = {
  ok: false;
  error: "not_found";
  slug_attempted: string;
  did_you_mean: Array<{ slug: string; title: string; reason: string }>;
};

export function getSection(slug: string): SectionResult | SectionError {
  const node = getDb()
    .prepare("SELECT * FROM corpus_node WHERE slug = ?")
    .get(slug) as CorpusNodeRow | undefined;

  if (!node) {
    return {
      ok: false,
      error: "not_found",
      slug_attempted: slug,
      did_you_mean: suggestSlugs(slug, 5),
    };
  }

  const abs = path.join(CONTENT_DIR, node.file);
  if (!fs.existsSync(abs)) {
    return {
      ok: false,
      error: "not_found",
      slug_attempted: slug,
      did_you_mean: [],
    };
  }
  const fileText = fs.readFileSync(abs, "utf8");
  const lines = fileText.split(/\r?\n/);
  const sliced = lines.slice(node.line_start - 1, node.line_end).join("\n");

  return {
    ok: true,
    slug: node.slug,
    title: node.title,
    page_slug: node.page_slug,
    phase_id: node.phase_id,
    level: node.level,
    line_start: node.line_start,
    line_end: node.line_end,
    word_count: node.word_count,
    content: sliced,
  };
}

export function suggestSlugs(slug: string, limit = 5): Array<{ slug: string; title: string; reason: string }> {
  const needle = slug.toLowerCase();
  const tokens = needle
    .split(/[/#\-_]+/)
    .filter((t) => t.length > 2);
  if (tokens.length === 0) return [];

  const all = getDb()
    .prepare("SELECT slug, title FROM corpus_node")
    .all() as Array<{ slug: string; title: string }>;

  const scored = all
    .map((row) => {
      const hay = `${row.slug.toLowerCase()} ${row.title.toLowerCase()}`;
      const hits = tokens.filter((t) => hay.includes(t)).length;
      return { ...row, score: hits };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((r) => ({
    slug: r.slug,
    title: r.title,
    reason: `${r.score} of ${tokens.length} query tokens matched`,
  }));
}

export type SearchHit = {
  slug: string;
  title: string;
  page_slug: string;
  phase_id: string;
  level: number;
  summary: string | null;
  score: number;
};

/**
 * Sanitize an arbitrary user query for FTS5 MATCH. We split on whitespace,
 * drop punctuation/operators (so a stray `-` or `(` doesn't break parsing),
 * quote each remaining token to force a phrase-literal match, and OR-join
 * them. Tokens shorter than 2 chars are dropped.
 */
function toFtsQuery(raw: string): string {
  const tokens = raw
    .toLowerCase()
    .split(/[^\p{Letter}\p{Number}]+/u)
    .filter((t) => t.length >= 2);
  if (tokens.length === 0) return "";
  return tokens.map((t) => `"${t.replace(/"/g, "")}"`).join(" OR ");
}

/**
 * FTS5-backed search across node titles, summaries, and verbatim section
 * text. Ranked by bm25 (lower = better; we negate to expose `score` where
 * higher = better, matching the prior contract). Falls back to a tiny
 * substring scan if the FTS query is empty (e.g., all-stopwords) or if the
 * virtual table happens to be missing for some reason.
 */
export function searchCorpus(query: string, limit = 8): SearchHit[] {
  const q = query.trim();
  if (!q) return [];
  const fts = toFtsQuery(q);
  if (!fts) return [];

  const db = getDb();
  try {
    const rows = db
      .prepare(
        `SELECT n.slug,
                n.title,
                n.page_slug,
                n.phase_id,
                n.level,
                n.summary,
                bm25(corpus_fts, 8.0, 4.0, 1.0) AS bm25_score
           FROM corpus_fts
           JOIN corpus_node n ON n.slug = corpus_fts.slug
           WHERE corpus_fts MATCH ?
           ORDER BY bm25_score ASC
           LIMIT ?`,
      )
      .all(fts, limit) as Array<{
      slug: string;
      title: string;
      page_slug: string;
      phase_id: string;
      level: number;
      summary: string | null;
      bm25_score: number;
    }>;

    return rows.map((r) => {
      const { bm25_score, ...rest } = r;
      // Normalize: bm25 is unbounded negative-ish for good matches. Expose
      // a positive `score` so callers can keep "higher = better".
      const score = Math.round((10 + -1 * bm25_score) * 100) / 100;
      return { ...rest, score };
    });
  } catch {
    // Last-resort fallback: substring scan. Should not happen in practice.
    const tokens = Array.from(
      new Set(q.toLowerCase().split(/\s+/).filter((t) => t.length >= 3)),
    );
    const all = db
      .prepare(
        `SELECT slug, title, page_slug, phase_id, level, summary FROM corpus_node`,
      )
      .all() as Array<{
      slug: string;
      title: string;
      page_slug: string;
      phase_id: string;
      level: number;
      summary: string | null;
    }>;
    return all
      .map((r) => {
        const hay = `${r.title} ${r.summary ?? ""}`.toLowerCase();
        let score = 0;
        if (hay.includes(q.toLowerCase())) score += 5;
        for (const t of tokens) if (hay.includes(t)) score += 1;
        return { ...r, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}

/**
 * Extracts the unique top-level page slugs from the corpus, in reading order.
 */
export function listPageSlugs(): string[] {
  return (
    getDb()
      .prepare(
        "SELECT slug FROM corpus_node WHERE level = 1 ORDER BY sort_order ASC",
      )
      .all() as Array<{ slug: string }>
  ).map((r) => r.slug);
}
