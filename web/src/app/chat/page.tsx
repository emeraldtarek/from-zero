import Link from "next/link";
import { ensureSeeded } from "@/lib/content-loader";
import { listChatSessions } from "@/lib/repos";

export const dynamic = "force-dynamic";

export default async function ChatIndexPage() {
  ensureSeeded();
  const sessions = listChatSessions();
  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat sessions</h1>
          <p className="text-[var(--color-muted)] mt-1 text-[0.95rem]">
            Each curriculum page has its own persistent chat. You can also start
            an unscoped session below.
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
          right-hand chat — a session is created automatically.
        </div>
      ) : (
        <ul className="space-y-2">
          {sessions.map((s) => (
            <li key={s.id} className="border border-[var(--color-rule)] rounded-md p-3 bg-white/70">
              <div className="flex items-baseline justify-between">
                <Link
                  href={`/chat/${s.id}`}
                  className="font-semibold underline"
                >
                  {s.title || `Session ${s.id}`}
                </Link>
                <div className="text-[0.78rem] text-[var(--color-muted)]">
                  {s.updated_at.slice(0, 16).replace("T", " ")}
                </div>
              </div>
              {s.page_slug && (
                <div className="text-[0.78rem] text-[var(--color-muted)]">
                  context: {s.page_slug}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
