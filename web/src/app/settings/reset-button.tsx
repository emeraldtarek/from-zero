"use client";

import { useState } from "react";

type State =
  | { kind: "idle" }
  | { kind: "confirming" }
  | { kind: "running" }
  | { kind: "done"; result: ResetResult }
  | { kind: "error"; message: string };

type ResetResult = {
  wiped: {
    chat_messages: number;
    chat_sessions: number;
    qa: number;
    progress_logs: number;
    glossary: number;
    concepts_demoted: number;
  };
  files_removed: number;
  files_bootstrapped: number;
};

export default function ResetButton() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function run() {
    setState({ kind: "running" });
    try {
      const res = await fetch("/api/reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ confirm: "RESET" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setState({ kind: "done", result: json });
      // Give the user a moment to read the summary, then reload so every
      // server-rendered page reflects the wiped state.
      setTimeout(() => window.location.reload(), 1800);
    } catch (err) {
      setState({ kind: "error", message: String(err) });
    }
  }

  if (state.kind === "idle") {
    return (
      <button
        onClick={() => setState({ kind: "confirming" })}
        className="px-3 py-1.5 text-sm rounded font-sans border border-[var(--color-danger)] text-[var(--color-danger)] bg-white hover:bg-red-50"
      >
        Reset all learner state…
      </button>
    );
  }

  if (state.kind === "confirming") {
    return (
      <div className="font-sans text-sm space-y-3">
        <div className="text-[var(--color-ink)]">
          This will permanently delete:
        </div>
        <ul className="list-disc list-inside text-[var(--color-muted)] ml-2">
          <li>all glossary entries</li>
          <li>all Q&A log entries</li>
          <li>all progress-log entries</li>
          <li>all chat sessions and messages</li>
          <li>concept promotions (everything reverts to ⏳ to do)</li>
        </ul>
        <div className="text-[var(--color-muted)]">
          The curriculum, the navigation index, and the Haiku-written summaries
          are <strong>preserved</strong>. This cannot be undone.
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={run}
            className="px-3 py-1.5 text-sm rounded bg-[var(--color-danger)] text-white hover:opacity-90"
          >
            Yes — reset everything
          </button>
          <button
            onClick={() => setState({ kind: "idle" })}
            className="px-3 py-1.5 text-sm rounded border border-[var(--color-rule)] bg-white"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (state.kind === "running") {
    return (
      <div className="font-sans text-sm text-[var(--color-muted)]">
        Resetting…
      </div>
    );
  }

  if (state.kind === "done") {
    const w = state.result.wiped;
    return (
      <div className="font-sans text-sm space-y-1">
        <div className="text-[var(--color-good)] font-semibold">
          ✅ Reset complete. Reloading…
        </div>
        <div className="text-[var(--color-muted)]">
          Wiped: {w.glossary} glossary · {w.qa} Q&A · {w.progress_logs}{" "}
          progress · {w.chat_sessions} chats ({w.chat_messages} msgs) ·{" "}
          {w.concepts_demoted} concepts demoted.
        </div>
        <div className="text-[var(--color-muted)]">
          Bootstrapped {state.result.files_bootstrapped} mirror file
          {state.result.files_bootstrapped === 1 ? "" : "s"} from templates.
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-sm space-y-2">
      <div className="text-[var(--color-danger)]">
        Reset failed: {state.message}
      </div>
      <button
        onClick={() => setState({ kind: "idle" })}
        className="px-3 py-1.5 text-sm rounded border border-[var(--color-rule)] bg-white"
      >
        Back
      </button>
    </div>
  );
}
