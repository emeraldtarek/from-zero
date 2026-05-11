"use client";

import { useEffect, useState } from "react";
import {
  clearStoredAuth,
  detectKind,
  getStoredAuth,
  setStoredAuth,
  type ClaudeAuthKind,
} from "@/lib/client-auth";

function maskToken(t: string): string {
  if (t.length < 16) return "***";
  return `${t.slice(0, 14)}…${t.slice(-4)}`;
}

export default function CredentialsForm() {
  const [hasStored, setHasStored] = useState(false);
  const [maskedExisting, setMaskedExisting] = useState<string>("");
  const [kindExisting, setKindExisting] = useState<ClaudeAuthKind | null>(null);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const auth = getStoredAuth();
    setHasStored(!!auth);
    if (auth) {
      setMaskedExisting(maskToken(auth.token));
      setKindExisting(auth.kind);
    }
  }, []);

  function save() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setStoredAuth(trimmed);
    setHasStored(true);
    setMaskedExisting(maskToken(trimmed));
    setKindExisting(detectKind(trimmed));
    setInput("");
    setEditing(false);
    setStatus("Saved. Open a reading page to use chat.");
    setTimeout(() => setStatus(null), 4000);
  }

  function clear() {
    if (!confirm("Remove your Claude credentials from this browser?")) return;
    clearStoredAuth();
    setHasStored(false);
    setMaskedExisting("");
    setKindExisting(null);
    setStatus("Cleared. Chat and section glossary extraction will be disabled until you paste a new token.");
    setTimeout(() => setStatus(null), 5000);
  }

  return (
    <div className="font-sans text-sm">
      <p className="text-[var(--color-muted)] mb-3">
        Anthropic credentials are stored in <code>localStorage</code> in this
        browser and sent with each chat / mark-complete request as the{" "}
        <code>x-claude-auth</code> header. The server only uses your token
        for that single request — nothing is stored server-side.
      </p>

      {hasStored && !editing ? (
        <div className="flex items-center gap-3 mb-3">
          <code className="text-[0.85rem] bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded px-2 py-1">
            {maskedExisting}
          </code>
          <span className="text-[var(--color-muted)] text-[0.78rem]">
            ({kindExisting === "oauth" ? "Claude Code OAuth token" : "Anthropic API key"})
          </span>
          <button
            onClick={() => setEditing(true)}
            className="text-[0.78rem] underline"
          >
            replace
          </button>
          <button
            onClick={clear}
            className="text-[0.78rem] underline text-[var(--color-danger)]"
          >
            clear
          </button>
        </div>
      ) : (
        <div className="space-y-2 mb-3">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            placeholder="sk-ant-api03-… or sk-ant-oat01-…"
            className="w-full font-mono text-[0.85rem] border border-[var(--color-rule)] rounded px-2 py-1 bg-white"
          />
          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={!input.trim()}
              className="px-3 py-1 text-sm rounded bg-[var(--color-ink)] text-[var(--color-paper)] disabled:opacity-40"
            >
              Save in this browser
            </button>
            {editing && (
              <button
                onClick={() => {
                  setEditing(false);
                  setInput("");
                }}
                className="px-3 py-1 text-sm rounded border border-[var(--color-rule)] bg-white"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      <details className="text-[0.85rem]">
        <summary className="cursor-pointer text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          How do I get a token?
        </summary>
        <ul className="mt-2 list-disc list-inside text-[var(--color-muted)] space-y-1">
          <li>
            <strong>Anthropic API key</strong> (any Anthropic account):{" "}
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              console.anthropic.com/settings/keys
            </a>{" "}
            → Create Key → starts with <code>sk-ant-api03-</code>. Billed per
            token.
          </li>
          <li>
            <strong>Claude Code OAuth token</strong> (uses your Claude Code Max
            subscription, no per-token billing): run{" "}
            <code>claude setup-token</code> in a terminal → copy the{" "}
            <code>sk-ant-oat01-…</code> string.
          </li>
        </ul>
      </details>

      {status && (
        <div className="mt-3 text-[0.85rem] text-[var(--color-good)]">
          {status}
        </div>
      )}
    </div>
  );
}
