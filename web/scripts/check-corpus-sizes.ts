import { renderOutlineMarkdown } from "../src/lib/corpus-index";

const variants = [
  { name: "H1 only, 80 char", opts: { maxLevel: 1, summaryLen: 80 } },
  { name: "H1 only, 140 char", opts: { maxLevel: 1, summaryLen: 140 } },
  { name: "H1+H2, no summary", opts: { maxLevel: 2, summaryLen: 0 } },
  { name: "H1+H2, 60 char", opts: { maxLevel: 2, summaryLen: 60 } },
  { name: "H1+H2, 80 char", opts: { maxLevel: 2, summaryLen: 80 } },
  { name: "H1+H2+H3, no summary", opts: { maxLevel: 3, summaryLen: 0 } },
  { name: "H1+H2+H3, 60 char", opts: { maxLevel: 3, summaryLen: 60 } },
];
for (const v of variants) {
  const txt = renderOutlineMarkdown(v.opts);
  const lines = txt.split("\n").length;
  console.log(
    `${v.name.padEnd(28)} ${String(txt.length).padStart(6)} bytes / ${String(lines).padStart(4)} lines`,
  );
}
