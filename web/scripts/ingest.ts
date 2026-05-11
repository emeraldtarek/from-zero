import {
  bootstrapUserData,
  syncPagesToDb,
  syncConceptsToDb,
} from "../src/lib/content-loader";
import { buildCorpusIndex } from "../src/lib/corpus-builder";
import {
  regenerateGlossaryFile,
  regenerateKnowledgeTrackerFile,
  regenerateQAFile,
} from "../src/lib/markdown-sync";

async function main() {
  console.log("[ingest] bootstrapping user-data files from .example.md…");
  const boot = bootstrapUserData();
  console.log("[ingest] bootstrap:", { created: boot.created.length });

  console.log("[ingest] syncing pages…");
  const pages = syncPagesToDb();
  console.log("[ingest] pages:", pages);

  console.log("[ingest] syncing concepts…");
  const concepts = syncConceptsToDb();
  console.log("[ingest] concepts:", concepts);

  console.log("[ingest] building corpus tree (PageIndex)…");
  const corpus = buildCorpusIndex();
  console.log("[ingest] corpus:", corpus);

  console.log("[ingest] regenerating live mirror files…");
  regenerateGlossaryFile();
  regenerateKnowledgeTrackerFile();
  regenerateQAFile();

  console.log("[ingest] done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
