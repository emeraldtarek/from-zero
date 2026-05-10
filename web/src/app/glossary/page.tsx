import { ensureSeeded } from "@/lib/content-loader";
import { listGlossary } from "@/lib/repos";
import GlossaryClient from "./glossary-client";

export const dynamic = "force-dynamic";

export default async function GlossaryPage() {
  ensureSeeded();
  const entries = listGlossary();
  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Glossary</h1>
        <p className="text-[var(--color-muted)] mt-1 text-[0.95rem]">
          Living term reference. Most entries are added automatically by Claude
          during chat (it picks up symbols, constants, and named effects). You can
          also add or edit terms manually below.
        </p>
      </div>
      <GlossaryClient initial={entries} />
    </div>
  );
}
