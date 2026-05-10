import Link from "next/link";
import { ensureSeeded, listPages } from "@/lib/content-loader";
import { listConceptsByPhase } from "@/lib/repos";
import { PHASE_DIRS } from "@/lib/paths";
import SidebarLink from "./sidebar-link";

export default function Sidebar() {
  ensureSeeded();
  const pages = listPages();
  const concepts = listConceptsByPhase();

  // Compute progress per phase
  const phaseStats = new Map<string, { solid: number; comfortable: number; total: number }>();
  for (const c of concepts) {
    const s = phaseStats.get(c.phase_id) ?? { solid: 0, comfortable: 0, total: 0 };
    s.total++;
    if (c.status === "solid") s.solid++;
    else if (c.status === "comfortable") s.comfortable++;
    phaseStats.set(c.phase_id, s);
  }

  return (
    <aside className="border-r border-[var(--color-rule)] bg-[var(--color-paper-2)]/40 px-3 py-4 sticky top-0 h-screen overflow-y-auto">
      <Link href="/" className="block px-2 mb-3">
        <div className="text-[1.1rem] font-bold tracking-tight">Lithium</div>
        <div className="text-[0.72rem] text-[var(--color-muted)] uppercase tracking-widest">
          From Zero
        </div>
      </Link>

      <nav className="text-sm">
        <div className="mt-2 mb-1 px-2 text-[0.7rem] uppercase tracking-widest text-[var(--color-muted)]">
          Workbench
        </div>
        <SidebarLink href="/" label="Dashboard" />
        <SidebarLink href="/progress" label="Progress" />
        <SidebarLink href="/glossary" label="Glossary" />
        <SidebarLink href="/qa" label="Q&A log" />
        <SidebarLink href="/chat" label="Chat sessions" />

        <div className="mt-4 mb-1 px-2 text-[0.7rem] uppercase tracking-widest text-[var(--color-muted)]">
          Curriculum
        </div>
        {PHASE_DIRS.map((phase) => {
          const stats = phaseStats.get(phase.id);
          const phasePages = pages.filter((p) => p.phase_id === phase.id);
          if (phasePages.length === 0) return null;
          const pct = stats && stats.total > 0
            ? Math.round(((stats.solid + 0.5 * stats.comfortable) / stats.total) * 100)
            : null;
          return (
            <div key={phase.id} className="mb-2">
              <div className="px-2 mt-2 mb-1 flex items-center justify-between">
                <div className="font-semibold text-[0.78rem] uppercase tracking-wide text-[var(--color-ink)]">
                  {phase.number}. {phase.title}
                </div>
                {pct != null && (
                  <span className="text-[0.7rem] text-[var(--color-muted)] font-mono">
                    {pct}%
                  </span>
                )}
              </div>
              {phasePages.map((p) => (
                <SidebarLink
                  key={p.slug}
                  href={`/read/${p.slug}`}
                  label={p.title}
                  small
                />
              ))}
            </div>
          );
        })}
      </nav>

      <div className="mt-6 px-2 text-[0.7rem] text-[var(--color-muted)]">
        <Link href="/settings" className="underline">
          Settings & sync
        </Link>
      </div>
    </aside>
  );
}
