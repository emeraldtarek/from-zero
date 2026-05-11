import Link from "next/link";
import { notFound } from "next/navigation";
import { ensureSeeded, getPageBySlug, listPages } from "@/lib/content-loader";
import { listChatMessages, listConceptsByPhase, getOrCreateChatSession } from "@/lib/repos";
import MarkdownView from "@/components/markdown-view";
import ChatPanel from "@/components/chat-panel";
import ConceptToggle from "@/components/concept-toggle";
import PageToc from "@/components/page-toc";

export const dynamic = "force-dynamic";

type Params = { slug: string[] };

export default async function ReadPage({ params }: { params: Promise<Params> }) {
  ensureSeeded();
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
  const page = getPageBySlug(slug);
  if (!page) notFound();

  const allPages = listPages();
  const idx = allPages.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? allPages[idx - 1] : null;
  const next = idx < allPages.length - 1 ? allPages[idx + 1] : null;

  const phaseConcepts = listConceptsByPhase(page.phase_id);

  // Get or create the chat session for this page so the user can resume.
  const session = getOrCreateChatSession({
    page_slug: slug,
    fallback_title: page.title,
  });
  const initialMessages = listChatMessages(session.id).map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
    tool_events: m.tool_calls
      ? (JSON.parse(m.tool_calls) as Array<{ name: string; input: unknown; result?: unknown }>)
      : undefined,
  }));

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_360px] min-h-screen">
      <div className="px-8 py-6 max-w-3xl">
        <div className="text-[0.72rem] uppercase tracking-widest text-[var(--color-muted)] mb-1">
          Phase {page.phase_number} · <span className="capitalize">{page.phase_id.replace(/^\d+-/, "").replace(/-/g, " ")}</span>
        </div>
        <MarkdownView source={page.content} />

        <div className="flex items-center justify-between mt-10 pt-4 border-t border-[var(--color-rule)] font-sans text-sm">
          {prev ? (
            <Link href={`/read/${prev.slug}`} className="underline">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/read/${next.slug}`} className="underline">
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

      <aside className="border-l border-[var(--color-rule)] bg-[var(--color-paper-2)]/50 sticky top-0 h-screen flex flex-col">
        <PageToc />

        <details className="px-3 pt-2 pb-2 border-b border-[var(--color-rule)] font-sans text-[0.85rem]">
          <summary className="cursor-pointer text-[0.72rem] uppercase tracking-widest text-[var(--color-muted)] mb-1 list-none flex items-center justify-between">
            <span>Concepts on this phase</span>
            <span className="text-[var(--color-muted)] font-mono text-[0.7rem]">
              {phaseConcepts.length}
            </span>
          </summary>
          <div className="space-y-1 max-h-44 overflow-y-auto pr-1 mt-1">
            {phaseConcepts.map((c) => (
              <div
                key={c.slug}
                className="flex items-start gap-2 py-0.5 border-b border-[var(--color-rule)]/50 last:border-0"
              >
                <div className="flex-1 leading-snug text-[0.82rem]">
                  <div className="text-[var(--color-muted)] text-[0.7rem]">
                    {c.section ?? "—"}
                  </div>
                  <div>{c.label}</div>
                </div>
                <ConceptToggle slug={c.slug} status={c.status} />
              </div>
            ))}
          </div>
        </details>

        <div className="flex-1 min-h-0">
          <ChatPanel
            pageSlug={page.slug}
            pageTitle={page.title}
            initialSessionId={session.id}
            initialMessages={initialMessages}
            variant="side"
          />
        </div>
      </aside>
    </div>
  );
}
