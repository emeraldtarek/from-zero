/**
 * Fuzzy map: which knowledge-tracker concept section corresponds to which
 * curriculum page?
 *
 * Concepts in `concepts` table are tagged with a `section` (e.g.
 * "Matter & atoms"). Curriculum pages have a `title` (e.g.
 * "01 — Matter and Atoms"). Both come from human writing so they don't
 * match verbatim. We normalize both to a token set and rank by Jaccard
 * overlap.
 *
 * Result is cached per-process — page+concept rows don't change at
 * runtime; an explicit rebuild happens on ingest.
 */
import { getDb, type ConceptRow, type PageRow } from "./db";

function normalize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => !["the", "a", "an", "and", "of", "in", "for", "on"].includes(t))
    // Strip leading order prefix tokens like "01"
    .filter((t) => !/^\d+$/.test(t));
}

function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const sa = new Set(a);
  const sb = new Set(b);
  let intersect = 0;
  for (const t of sa) if (sb.has(t)) intersect++;
  return intersect / new Set([...sa, ...sb]).size;
}

let _cache: Map<string, string[]> | null = null;

/** page_slug → set of concept slugs that belong to that page. */
export function getPageConceptMap(): Map<string, string[]> {
  if (_cache) return _cache;
  const db = getDb();
  const pages = db.prepare("SELECT * FROM pages").all() as PageRow[];
  const concepts = db.prepare("SELECT * FROM concepts").all() as ConceptRow[];

  // Group pages and concepts by phase.
  const pagesByPhase = new Map<string, PageRow[]>();
  for (const p of pages) {
    if (!pagesByPhase.has(p.phase_id)) pagesByPhase.set(p.phase_id, []);
    pagesByPhase.get(p.phase_id)!.push(p);
  }

  const conceptsBySection = new Map<string, ConceptRow[]>();
  for (const c of concepts) {
    const key = `${c.phase_id}::${c.section ?? ""}`;
    if (!conceptsBySection.has(key)) conceptsBySection.set(key, []);
    conceptsBySection.get(key)!.push(c);
  }

  const result = new Map<string, string[]>();

  for (const [phase_id, phasePages] of pagesByPhase) {
    // Sections in this phase
    const phaseSections: string[] = Array.from(
      new Set(
        concepts.filter((c) => c.phase_id === phase_id).map((c) => c.section ?? ""),
      ),
    ).filter(Boolean);

    for (const page of phasePages) {
      const pageTokens = normalize(page.title);
      let bestSection: string | null = null;
      let bestScore = 0;
      for (const sec of phaseSections) {
        const score = jaccard(pageTokens, normalize(sec));
        if (score > bestScore) {
          bestScore = score;
          bestSection = sec;
        }
      }
      // Require a meaningful overlap; below that we say "no concepts on
      // this page" (e.g., README pages or research notes that aren't
      // tied to the knowledge tracker).
      if (bestSection && bestScore >= 0.34) {
        const conceptSlugs = (conceptsBySection.get(`${phase_id}::${bestSection}`) ?? []).map(
          (c) => c.slug,
        );
        result.set(page.slug, conceptSlugs);
      } else {
        result.set(page.slug, []);
      }
    }
  }

  _cache = result;
  return result;
}

export function getConceptsForPage(page_slug: string): ConceptRow[] {
  const map = getPageConceptMap();
  const slugs = map.get(page_slug) ?? [];
  if (slugs.length === 0) return [];
  const db = getDb();
  const placeholders = slugs.map(() => "?").join(",");
  return db
    .prepare(
      `SELECT * FROM concepts WHERE slug IN (${placeholders}) ORDER BY sort_order ASC`,
    )
    .all(...slugs) as ConceptRow[];
}

export function invalidatePageConceptCache() {
  _cache = null;
}
