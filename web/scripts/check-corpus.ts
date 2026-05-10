import { renderOutlineMarkdown, searchCorpus, getSection } from "../src/lib/corpus-index";

const compact = renderOutlineMarkdown({ maxLevel: 2, summaryLen: 80 });
const full = renderOutlineMarkdown({ maxLevel: 6, summaryLen: 140 });
console.log("compact:", compact.length, "bytes /", compact.split("\n").length, "lines");
console.log("full:   ", full.length, "bytes /", full.split("\n").length, "lines");

console.log("\n--- FTS5 search: 'crown ether liquid extraction' ---");
for (const h of searchCorpus("crown ether liquid extraction", 6)) {
  console.log(`  [${h.score.toFixed(2)}] ${h.slug}  ::  ${h.title}`);
}
console.log("\n--- FTS5 search: 'mercury amalgam isotope' ---");
for (const h of searchCorpus("mercury amalgam isotope", 6)) {
  console.log(`  [${h.score.toFixed(2)}] ${h.slug}  ::  ${h.title}`);
}
console.log("\n--- FTS5 search: 'fusion blanket tritium' ---");
for (const h of searchCorpus("fusion blanket tritium", 6)) {
  console.log(`  [${h.score.toFixed(2)}] ${h.slug}  ::  ${h.title}`);
}
console.log("\n--- FTS5 search: 'Avogadro Brownian Einstein' ---");
for (const h of searchCorpus("Avogadro Brownian Einstein", 6)) {
  console.log(`  [${h.score.toFixed(2)}] ${h.slug}  ::  ${h.title}`);
}
console.log("\n--- FTS5 stemming check: 'isotopes' vs 'isotopic' ---");
const a = searchCorpus("isotopes", 3);
const b = searchCorpus("isotopic", 3);
console.log("  'isotopes' top:", a.map((h) => h.slug).join(" | "));
console.log("  'isotopic' top:", b.map((h) => h.slug).join(" | "));

const md = compact;
console.log("\n\noutline bytes:", md.length, "lines:", md.split("\n").length);
console.log("first 800 chars:\n" + md.slice(0, 800));
console.log("\n--- search 'crown ether ion exchange' ---");
for (const h of searchCorpus("crown ether ion exchange", 6)) {
  console.log(`  [${h.score}] ${h.slug}  ::  ${h.title}`);
}
console.log("\n--- search 'ion-exchange' ---");
for (const h of searchCorpus("ion-exchange", 6)) {
  console.log(`  [${h.score}] ${h.slug}  ::  ${h.title}`);
}
console.log("\n--- getSection rigorous-statement ---");
const s = getSection(
  "01-chemistry-fundamentals/01-matter-and-atoms#rigorous-statement",
);
if (s.ok) {
  console.log(`got ${s.word_count} words / lines ${s.line_start}-${s.line_end}`);
  console.log(s.content.slice(0, 300));
} else {
  console.log("error:", JSON.stringify(s, null, 2));
}
console.log("\n--- bad slug ---");
const bad = getSection("01-chemistry-fundamentals/atomic-hypothesis");
console.log(JSON.stringify(bad, null, 2));
