"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MarkdownView from "./markdown-view";
import { withAuthHeader } from "@/lib/client-auth";

type Role = "user" | "assistant";
type Msg = {
  role: Role;
  content: string;
  tool_events?: Array<{ name: string; input: unknown; result?: unknown }>;
};

type ToolEvent = { name: string; input: unknown; result?: unknown };

export default function ChatPanel({
  pageSlug,
  pageTitle,
  conceptSlug,
  initialSessionId,
  initialMessages,
  variant = "side",
}: {
  pageSlug?: string | null;
  pageTitle?: string | null;
  conceptSlug?: string | null;
  initialSessionId?: number | null;
  initialMessages?: Msg[];
  variant?: "side" | "full";
}) {
  const [messages, setMessages] = useState<Msg[]>(initialMessages ?? []);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(initialSessionId ?? null);
  const router = useRouter();
  // True when this panel was opened without a session (i.e. /chat/new). On
  // the first session event we'll swap the URL to /chat/<id> so the user can
  // bookmark / share / reload cleanly.
  const navigateOnSession = (initialSessionId ?? null) == null;
  const [err, setErr] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;
    setErr(null);
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    let assistantText = "";
    const toolEvents: ToolEvent[] = [];
    setMessages((m) => [...m, userMsg, { role: "assistant", content: "", tool_events: [] }]);
    setStreaming(true);

    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const res = await fetch(
        "/api/chat",
        withAuthHeader({
          method: "POST",
          headers: { "content-type": "application/json" },
          signal: ac.signal,
          body: JSON.stringify({
            message: text,
            page_slug: pageSlug ?? null,
            concept_slug: conceptSlug ?? null,
            session_id: sessionId,
          }),
        }),
      );
      if (!res.ok || !res.body) throw new Error(`chat failed: ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const ev = JSON.parse(line);
            if (ev.type === "session") {
              if (sessionId == null && navigateOnSession && typeof ev.session_id === "number") {
                router.replace(`/chat/${ev.session_id}`);
              }
              setSessionId(ev.session_id);
            } else if (ev.type === "delta") {
              assistantText += ev.text;
              setMessages((m) => {
                const next = m.slice();
                next[next.length - 1] = {
                  role: "assistant",
                  content: assistantText,
                  tool_events: toolEvents,
                };
                return next;
              });
            } else if (ev.type === "tool_call") {
              toolEvents.push({ name: ev.name, input: ev.input, result: ev.result });
              setMessages((m) => {
                const next = m.slice();
                next[next.length - 1] = {
                  role: "assistant",
                  content: assistantText,
                  tool_events: [...toolEvents],
                };
                return next;
              });
            } else if (ev.type === "error") {
              setErr(ev.message);
            }
          } catch {
            // partial; ignore
          }
        }
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setErr(String(e));
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function stop() {
    abortRef.current?.abort();
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {pageTitle && (
        <div className="px-3 py-2 border-b border-[var(--color-rule)] text-[0.78rem] text-[var(--color-muted)] font-sans flex items-center gap-2">
          <span className="font-semibold">Context</span>
          <span className="truncate">{pageTitle}</span>
        </div>
      )}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-3 font-sans">
        {messages.length === 0 && (
          <div className="text-[var(--color-muted)] text-sm space-y-2">
            <p>
              Ask anything about the page you're reading. The model has the full
              page in context.
            </p>
            <ul className="list-disc list-inside text-[0.85rem]">
              <li>"Explain why atoms are mostly empty space."</li>
              <li>"Quiz me on Avogadro's number."</li>
              <li>"Mark 'isotopes — definition' as comfortable."</li>
            </ul>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className="flex">
            {m.role === "user" ? (
              <div className="chat-bubble-user whitespace-pre-wrap">{m.content}</div>
            ) : (
              <div className="chat-bubble-assistant w-full">
                {m.content ? (
                  <MarkdownView source={m.content} />
                ) : streaming && i === messages.length - 1 ? (
                  <div className="text-[var(--color-muted)] text-sm">…thinking</div>
                ) : (
                  <div className="text-[var(--color-muted)] text-sm">(empty)</div>
                )}
                {m.tool_events && m.tool_events.length > 0 && (
                  <div className="mt-2 text-[0.78rem] text-[var(--color-muted)] border-t border-[var(--color-rule)] pt-2">
                    {m.tool_events.map((te, j) => (
                      <div key={j} className="font-mono break-words">
                        ⚙ <span className="font-semibold">{te.name}</span>
                        {": "}
                        <span>{summariseToolEvent(te)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {err && (
          <div className="text-[0.85rem] border border-[var(--color-danger)]/30 bg-red-50 text-[var(--color-danger)] px-3 py-2 rounded whitespace-pre-wrap font-sans">
            <div className="font-semibold mb-1">Chat unavailable</div>
            {err}
          </div>
        )}
      </div>
      <div className="border-t border-[var(--color-rule)] p-2 font-sans">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                send();
              }
            }}
            rows={2}
            placeholder="Ask Claude anything about this page… (⌘/Ctrl+Enter to send)"
            className="flex-1 resize-none border border-[var(--color-rule)] rounded-md px-2 py-1 text-sm bg-white outline-none focus:border-[var(--color-ink)]"
          />
          {streaming ? (
            <button
              onClick={stop}
              className="px-3 py-1 text-sm border border-[var(--color-rule)] rounded-md bg-white"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={send}
              disabled={!input.trim()}
              className="px-3 py-1 text-sm rounded-md bg-[var(--color-ink)] text-[var(--color-paper)] disabled:opacity-40"
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function summariseToolEvent(te: ToolEvent): string {
  const i = te.input as Record<string, unknown>;
  switch (te.name) {
    case "add_glossary_term":
      return `added "${i.term}"`;
    case "append_qa":
      return `logged Q&A: ${(i.question as string ?? "").slice(0, 60)}…`;
    case "mark_concept_status":
      return `${i.concept_slug} → ${i.status}`;
    case "append_progress_log":
      return `progress entry ${i.log_date}`;
    default:
      return JSON.stringify(i).slice(0, 100);
  }
}
