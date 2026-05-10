import Link from "next/link";
import { ensureSeeded, listPages } from "@/lib/content-loader";
import { listConceptsByPhase, listProgressLogs, listQA } from "@/lib/repos";
import { PHASE_DIRS } from "@/lib/paths";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  todo: "⏳ to do",
  exposed: "🔴 exposed",
  comfortable: "🟡 comfortable",
  solid: "✅ solid",
};

export default async function HomePage() {
  ensureSeeded();
  const concepts = listConceptsByPhase();
  const pages = listPages();
  const logs = listProgressLogs();
  const recentQA = listQA().slice(0, 5);

  const phaseStats = new Map<string, Record<string, number>>();
  for (const c of concepts) {
    const s = phaseStats.get(c.phase_id) ?? { todo: 0, exposed: 0, comfortable: 0, solid: 0, total: 0 };
    s[c.status]++;
    s.total++;
    phaseStats.set(c.phase_id, s);
  }

  const totalSolid = concepts.filter((c) => c.status === "solid").length;
  const totalComfortable = concepts.filter((c) => c.status === "comfortable").length;
  const totalExposed = concepts.filter((c) => c.status === "exposed").length;
  const total = concepts.length || 1;
  const progressPct = Math.round(
    ((totalSolid + 0.5 * totalComfortable + 0.15 * totalExposed) / total) * 100,
  );

  // Suggested next: first non-solid concept
  const next = concepts.find((c) => c.status !== "solid");
  const nextPage = next
    ? pages.find((p) => p.phase_id === next.phase_id) ?? null
    : null;

  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="mb-8">
        <div className="text-[0.78rem] uppercase tracking-widest text-[var(--color-muted)]">
          Workbench
        </div>
        <h1 className="text-3xl font-bold mt-1 mb-1">Lithium — From Zero</h1>
        <p className="text-[var(--color-muted)] max-w-2xl text-[0.95rem]">
          A learning workbench grounded in the <code>zero/</code> corpus.
          Read the curriculum, track concepts as you go, and chat with Claude
          using the page you're on as context.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card title="Overall progress" big={`${progressPct}%`}>
          <div className="text-[0.85rem] text-[var(--color-muted)]">
            {totalSolid} solid · {totalComfortable} comfortable ·{" "}
            {totalExposed} exposed · {total - totalSolid - totalComfortable - totalExposed} to do
          </div>
          <div className="mt-2 h-1.5 bg-[var(--color-rule)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-ink)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </Card>
        <Card title="Sessions logged" big={`${logs.length}`}>
          <div className="text-[0.85rem] text-[var(--color-muted)]">
            {logs.length === 0
              ? "no sessions yet — your first one starts when you talk to the chat"
              : `last: ${logs[0]?.log_date}`}
          </div>
        </Card>
        <Card title="Q&A captured" big={`${recentQA.length === 0 ? 0 : (listQA().length)}`}>
          <div className="text-[0.85rem] text-[var(--color-muted)]">
            grounded answers persisted to the Q&A log
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <section>
          <h2 className="text-lg font-semibold mb-3">Curriculum</h2>
          <div className="space-y-3">
            {PHASE_DIRS.map((phase) => {
              const phasePages = pages.filter((p) => p.phase_id === phase.id);
              if (phasePages.length === 0) return null;
              const stats = phaseStats.get(phase.id);
              const pct = stats && stats.total > 0
                ? Math.round(((stats.solid + 0.5 * stats.comfortable) / stats.total) * 100)
                : 0;
              return (
                <div
                  key={phase.id}
                  className="border border-[var(--color-rule)] rounded-md p-3 bg-white/50"
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="font-semibold">
                      {phase.number}. {phase.title}
                    </div>
                    {stats && (
                      <span className="text-[0.78rem] text-[var(--color-muted)] font-mono">
                        {pct}% · {stats.total} concepts
                      </span>
                    )}
                  </div>
                  <div className="text-[0.85rem] flex flex-wrap gap-x-3 gap-y-1">
                    {phasePages.slice(0, 8).map((p) => (
                      <Link
                        key={p.slug}
                        href={`/read/${p.slug}`}
                        className="underline text-[var(--color-accent-2)] hover:no-underline"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Suggested next</h2>
          {next ? (
            <div className="border border-[var(--color-rule)] rounded-md p-3 bg-white/50">
              <div className="text-[0.78rem] uppercase tracking-widest text-[var(--color-muted)]">
                {STATUS_LABEL[next.status] ?? next.status} · {next.section ?? next.phase_id}
              </div>
              <div className="font-semibold mt-1">{next.label}</div>
              {nextPage && (
                <Link
                  href={`/read/${nextPage.slug}`}
                  className="inline-block mt-3 text-[0.85rem] underline"
                >
                  Open {nextPage.title} →
                </Link>
              )}
            </div>
          ) : (
            <div className="border border-[var(--color-rule)] rounded-md p-3 bg-white/50 text-[var(--color-muted)]">
              All concepts solid 🎉 — time to ideate.
            </div>
          )}

          <h2 className="text-lg font-semibold mt-6 mb-3">Recent Q&A</h2>
          {recentQA.length === 0 ? (
            <div className="text-[var(--color-muted)] text-sm">
              No Q&A captured yet. Ask Claude on any page and meaningful exchanges
              will be persisted here.
            </div>
          ) : (
            <ul className="space-y-2">
              {recentQA.map((q) => (
                <li
                  key={q.id}
                  className="border border-[var(--color-rule)] rounded-md p-3 bg-white/50"
                >
                  <div className="text-[0.78rem] uppercase tracking-widest text-[var(--color-muted)]">
                    {q.created_at.slice(0, 10)} · {q.page_slug ?? "—"}
                  </div>
                  <div className="font-semibold mt-1 text-[0.95rem]">
                    {q.question.slice(0, 140)}
                  </div>
                  <div className="text-[0.85rem] text-[var(--color-muted)] line-clamp-2 mt-1">
                    {q.answer.slice(0, 200)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Card({
  title,
  big,
  children,
}: {
  title: string;
  big: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[var(--color-rule)] rounded-md p-4 bg-white/60">
      <div className="text-[0.72rem] uppercase tracking-widest text-[var(--color-muted)]">
        {title}
      </div>
      <div className="text-3xl font-bold tracking-tight my-1 font-sans">{big}</div>
      {children}
    </div>
  );
}
