import ChatPanel from "@/components/chat-panel";

export const dynamic = "force-dynamic";

export default function NewChatPage() {
  // Renders an empty chat panel with no session_id. The session row is
  // only persisted once the user sends a message — at which point
  // `/api/chat` creates one and the panel `router.replace`s the URL to
  // `/chat/<id>`. Bouncing off this page without typing leaves the DB
  // untouched.
  return (
    <div className="h-screen flex flex-col px-6 py-4">
      <div className="mb-2 shrink-0">
        <h1 className="text-xl font-semibold">New chat</h1>
        <div className="text-[var(--color-muted)] text-sm">
          Start typing — the session is created when you send your first
          message.
        </div>
      </div>
      <div className="flex-1 min-h-0 border border-[var(--color-rule)] rounded-md bg-white/70 overflow-hidden">
        <ChatPanel variant="full" />
      </div>
    </div>
  );
}
