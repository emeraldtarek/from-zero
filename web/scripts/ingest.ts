import { syncPagesToDb, syncConceptsToDb } from "../src/lib/content-loader";
import { regenerateGlossaryFile, regenerateKnowledgeTrackerFile } from "../src/lib/markdown-sync";

async function main() {
  console.log("[ingest] syncing pages…");
  const pages = syncPagesToDb();
  console.log("[ingest] pages:", pages);

  console.log("[ingest] syncing concepts…");
  const concepts = syncConceptsToDb();
  console.log("[ingest] concepts:", concepts);

  console.log("[ingest] regenerating glossary file…");
  regenerateGlossaryFile();

  console.log("[ingest] regenerating knowledge tracker file…");
  regenerateKnowledgeTrackerFile();

  console.log("[ingest] done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
