import { syncConceptsToDb, syncPagesToDb } from "@/lib/content-loader";
import { buildCorpusIndex } from "@/lib/corpus-builder";
import {
  regenerateGlossaryFile,
  regenerateKnowledgeTrackerFile,
  regenerateQAFile,
} from "@/lib/markdown-sync";

export const runtime = "nodejs";

export async function POST() {
  const pages = syncPagesToDb();
  const concepts = syncConceptsToDb();
  const corpus = buildCorpusIndex();
  regenerateGlossaryFile();
  regenerateKnowledgeTrackerFile();
  regenerateQAFile();
  return Response.json({ pages, concepts, corpus });
}
