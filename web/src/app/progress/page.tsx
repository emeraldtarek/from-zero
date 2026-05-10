import { ensureSeeded } from "@/lib/content-loader";
import { listConceptsByPhase, listProgressLogs } from "@/lib/repos";
import { PHASE_DIRS } from "@/lib/paths";
import ConceptToggle from "@/components/concept-toggle";
import AddProgressLog from "./add-progress-log";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  ensureSeeded();
  const concepts = listConceptsByPhase();
  const logs = listProgressLogs();

  const byPhase = new Map<string, typeof concepts>();
  for (const c of concepts) {
    const arr = byPhase.get(c.phase_id) ?? [];
    arr.push(c);
    byPhase.set(c.phase_id, arr);
  }

  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-[var(--color-muted)] mt-1 text-[0.95rem]">
          Toggle each concept's confidence as you progress. Promotions sync to{" "}
          <code>04-learning/knowledge-tracker.md</code> and inform Claude's tutoring.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <section>
          <h2 className="text-lg font-semibold mb-3">Concepts by phase</h2>
          {PHASE_DIRS.map((phase) => {
            const arr = byPhase.get(phase.id);
            if (!arr || arr.length === 0) return null;
            const sectionMap = new Map<string, typeof arr>();
            for (const c of arr) {
              const sec = c.section ?? "General";
              if (!sectionMap.has(sec)) sectionMap.set(sec, []);
              sectionMap.get(sec)!.push(c);
            }
            return (
              <div key={phase.id} className="mb-4 border border-[var(--color-rule)] rounded-md p-3 bg-white/60">
                <div className="font-semibold mb-2">
                  {phase.number}. {phase.title}
                </div>
                <div className="space-y-3">
                  {[...sectionMap.entries()].map(([sec, items]) => (
                    <div key={sec}>
                      <div className="text-[0.75rem] uppercase tracking-widest text-[var(--color-muted)] mb-1">
                        {sec}
                      </div>
                      <div className="space-y-1">
                        {items.map((c) => (
                          <div
                            key={c.slug}
                            className="flex items-start gap-2 text-[0.9rem] py-0.5 border-b border-[var(--color-rule)]/50 last:border-0"
                          >
                            <div className="flex-1 leading-snug">{c.label}</div>
                            <ConceptToggle slug={c.slug} status={c.status} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Session log</h2>
          <AddProgressLog />
          <div className="mt-4 space-y-3">
            {logs.length === 0 ? (
              <div className="text-[var(--color-muted)] text-sm">
                No sessions yet. Sessions are added either via the chat (when
                Claude calls <code>append_progress_log</code>) or by hand using the
                form above.
              </div>
            ) : (
              logs.map((l) => (
                <div
                  key={l.id}
                  className="border border-[var(--color-rule)] rounded-md p-3 bg-white/60"
                >
                  <div className="text-[0.78rem] uppercase tracking-widest text-[var(--color-muted)]">
                    {l.log_date}
                    {l.promoted_concepts && (
                      <span> · promoted: {l.promoted_concepts}</span>
                    )}
                  </div>
                  <div className="font-semibold mt-1">{l.summary}</div>
                  {l.details && (
                    <div className="text-[0.9rem] text-[var(--color-muted)] mt-1 whitespace-pre-wrap">
                      {l.details}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
