import { notFound } from "next/navigation";
import { ensureSeeded, getPageBySlug } from "@/lib/content-loader";
import { getChatSession, listChatMessages } from "@/lib/repos";
import ChatPanel from "@/components/chat-panel";
import EditableTitle from "@/components/editable-title";

export const dynamic = "force-dynamic";

export default async function ChatSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  ensureSeeded();
  const { id } = await params;
  const sid = Number(id);
  if (!Number.isFinite(sid)) notFound();
  const session = getChatSession(sid);
  if (!session) notFound();

  const page = session.page_slug ? getPageBySlug(session.page_slug) : null;
  const messages = listChatMessages(session.id).map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
    tool_events: m.tool_calls
      ? (JSON.parse(m.tool_calls) as Array<{ name: string; input: unknown; result?: unknown }>)
      : undefined,
  }));

  return (
    <div className="h-screen flex flex-col px-6 py-4">
      <div className="mb-2 shrink-0">
        <EditableTitle id={session.id} initial={session.title} />
        {page && (
          <div className="text-[var(--color-muted)] text-sm">
            context: {page.title} ({page.phase_id})
          </div>
        )}
      </div>
      <div className="flex-1 min-h-0 border border-[var(--color-rule)] rounded-md bg-white/70 overflow-hidden">
        <ChatPanel
          pageSlug={session.page_slug}
          pageTitle={page?.title ?? null}
          conceptSlug={session.concept_slug}
          initialSessionId={session.id}
          initialMessages={messages}
          variant="full"
        />
      </div>
    </div>
  );
}
