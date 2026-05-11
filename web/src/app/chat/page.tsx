import Link from "next/link";
import { ensureSeeded } from "@/lib/content-loader";
import { listChatSessions } from "@/lib/repos";
import { getDb } from "@/lib/db";
import ChatSessionRow from "./chat-session-row";

export const dynamic = "force-dynamic";

export default async function ChatIndexPage() {
  ensureSeeded();
  const sessions = listChatSessions({ only_with_messages: true });

  // One round-trip for all message counts.
  const counts = new Map<number, number>();
  if (sessions.length) {
    const ids = sessions.map((s) => s.id);
    const placeholders = ids.map(() => "?").join(",");
    const rows = getDb()
      .prepare(
        `SELECT session_id, COUNT(*) AS n FROM chat_messages
           WHERE session_id IN (${placeholders})
           GROUP BY session_id`,
      )
      .all(...ids) as Array<{ session_id: number; n: number }>;
    for (const r of rows) counts.set(r.session_id, r.n);
  }

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat sessions</h1>
          <p className="text-[var(--color-muted)] mt-1 text-[0.95rem]">
            Each curriculum page has its own persistent chat. Click a title to
            rename. Empty sessions aren't shown — they're discarded if no
            message is ever sent.
          </p>
        </div>
        <Link
          href="/chat/new"
          className="px-3 py-2 text-sm bg-[var(--color-ink)] text-[var(--color-paper)] rounded font-sans"
        >
          + New chat
        </Link>
      </div>
      {sessions.length === 0 ? (
        <div className="text-[var(--color-muted)] text-sm">
          No chats yet. Open any curriculum page and start typing in the
          right-hand chat — a session is created on your first message.
        </div>
      ) : (
        <ul className="space-y-2">
          {sessions.map((s) => (
            <ChatSessionRow
              key={s.id}
              id={s.id}
              title={s.title}
              page_slug={s.page_slug}
              updated_at={s.updated_at}
              message_count={counts.get(s.id) ?? 0}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
