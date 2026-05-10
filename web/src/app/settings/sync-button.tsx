"use client";
import { useState, useTransition } from "react";

export default function SyncButton() {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  return (
    <div>
      <button
        disabled={pending}
        onClick={() => {
          start(async () => {
            const r = await fetch("/api/sync", { method: "POST" });
            const j = await r.json();
            setResult(JSON.stringify(j, null, 2));
          });
        }}
        className="px-3 py-1.5 text-sm bg-[var(--color-ink)] text-[var(--color-paper)] rounded"
      >
        {pending ? "Syncing…" : "Re-sync from zero/"}
      </button>
      {result && (
        <pre className="mt-3 text-[0.78rem] bg-[var(--color-paper-2)] border border-[var(--color-rule)] p-2 rounded whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </div>
  );
}
