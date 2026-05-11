import { syncPagesToDb } from "../src/lib/content-loader";
import { buildCorpusIndex } from "../src/lib/corpus-builder";

function main() {
  console.log("[build-corpus-index] syncing pages…");
  const pages = syncPagesToDb();
  console.log("[build-corpus-index] pages:", pages);

  console.log("[build-corpus-index] building corpus tree…");
  const result = buildCorpusIndex();
  console.log("[build-corpus-index] result:", result);
}

main();
