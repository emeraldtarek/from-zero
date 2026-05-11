"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import EditableTitle from "@/components/editable-title";

export default function ChatSessionRow({
  id,
  title,
  page_slug,
  updated_at,
  message_count,
}: {
  id: number;
  title: string;
  page_slug: string | null;
  updated_at: string;
  message_count: number;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [removing, setRemoving] = useState(false);

  function remove() {
    if (removing) return;
    if (!confirm("Delete this chat session and all its messages?")) return;
    setRemoving(true);
    startTransition(async () => {
      await fetch(`/api/sessions?id=${id}`, { method: "DELETE" });
      router.refresh();
    });
  }

  return (
    <li className="border border-[var(--color-rule)] rounded-md p-3 bg-white/70 group">
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2 min-w-0 flex-1">
          <EditableTitle
            id={id}
            initial={title || `Session ${id}`}
            className="font-semibold text-[0.95rem] truncate"
          />
          <Link
            href={`/chat/${id}`}
            className="text-[0.78rem] text-[var(--color-accent-2)] underline shrink-0"
          >
            open →
          </Link>
        </div>
        <div className="text-[0.78rem] text-[var(--color-muted)] shrink-0 flex items-center gap-2">
          <span>{message_count} msg{message_count === 1 ? "" : "s"}</span>
          <span>·</span>
          <span>{updated_at.slice(0, 16).replace("T", " ")}</span>
          <button
            onClick={remove}
            disabled={removing}
            title="Delete session"
            className="opacity-0 group-hover:opacity-100 transition text-[var(--color-danger)] hover:underline disabled:opacity-40"
          >
            delete
          </button>
        </div>
      </div>
      {page_slug && (
        <div className="text-[0.78rem] text-[var(--color-muted)] mt-1">
          context: {page_slug}
        </div>
      )}
    </li>
  );
}
