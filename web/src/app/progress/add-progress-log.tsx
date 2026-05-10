"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function AddProgressLog() {
  const router = useRouter();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [promoted, setPromoted] = useState("");
  const [pending, startTransition] = useTransition();

  function submit() {
    if (!summary.trim()) return;
    startTransition(async () => {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          log_date: date,
          summary,
          details: details || null,
          promoted_concepts: promoted || null,
        }),
      });
      setSummary("");
      setDetails("");
      setPromoted("");
      router.refresh();
    });
  }

  return (
    <div className="border border-[var(--color-rule)] rounded-md p-3 bg-white/60 font-sans">
      <div className="text-[0.78rem] uppercase tracking-widest text-[var(--color-muted)] mb-2">
        Add session entry
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-[var(--color-rule)] rounded px-2 py-1 text-sm"
        />
        <input
          value={summary}
          placeholder="What did you cover?"
          onChange={(e) => setSummary(e.target.value)}
          className="flex-1 border border-[var(--color-rule)] rounded px-2 py-1 text-sm"
        />
      </div>
      <textarea
        value={details}
        placeholder="Details (optional, multi-line)"
        onChange={(e) => setDetails(e.target.value)}
        rows={2}
        className="w-full border border-[var(--color-rule)] rounded px-2 py-1 text-sm mb-2 resize-y"
      />
      <input
        value={promoted}
        placeholder="Promoted concepts (slug-1, slug-2)"
        onChange={(e) => setPromoted(e.target.value)}
        className="w-full border border-[var(--color-rule)] rounded px-2 py-1 text-sm mb-2"
      />
      <button
        onClick={submit}
        disabled={pending || !summary.trim()}
        className="px-3 py-1 text-sm bg-[var(--color-ink)] text-[var(--color-paper)] rounded disabled:opacity-40"
      >
        Save entry
      </button>
    </div>
  );
}
