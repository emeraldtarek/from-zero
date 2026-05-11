import { ensureSeeded } from "@/lib/content-loader";
import { authConfigured, detectProvider, DEFAULT_MODEL } from "@/lib/llm";
import SyncButton from "./sync-button";
import ResetButton from "./reset-button";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  ensureSeeded();
  const provider = detectProvider();
  const model = DEFAULT_MODEL;
  const auth = authConfigured();
  const oauthSet = !!process.env.CLAUDE_CODE_OAUTH_TOKEN;
  const apiKeySet = !!process.env.ANTHROPIC_API_KEY;
  return (
    <div className="px-8 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-[var(--color-muted)] mb-6 text-[0.95rem]">
        Diagnostics for the local environment.
      </p>

      <section className="border border-[var(--color-rule)] rounded-md p-4 bg-white/70 mb-4 font-sans">
        <h2 className="font-semibold mb-2">Chat provider</h2>
        <div className="text-sm">
          <div>
            <span className="text-[var(--color-muted)]">Mode: </span>
            <code>{provider}</code>
          </div>
          <div>
            <span className="text-[var(--color-muted)]">Model: </span>
            <code>{model}</code>
          </div>
          <div>
            <span className="text-[var(--color-muted)]">ANTHROPIC_API_KEY: </span>
            <code>{apiKeySet ? "set" : "—"}</code>
          </div>
          <div>
            <span className="text-[var(--color-muted)]">CLAUDE_CODE_OAUTH_TOKEN: </span>
            <code>{oauthSet ? "set" : "—"}</code>
          </div>
          <div>
            <span className="text-[var(--color-muted)]">Status: </span>
            <code>{auth ? "ready" : "not configured"}</code>
          </div>
          <p className="mt-2 text-[var(--color-muted)] text-[0.9rem]">
            {provider === "anthropic-api"
              ? "Using direct Anthropic API. Tool use (auto-glossary, auto-Q&A, auto-promotion, auto-progress-log) is enabled."
              : "Using @anthropic-ai/claude-agent-sdk against your Claude Code Max subscription via in-process MCP. Auto-glossary / Q&A / promotion / progress-log tools are wired and will fire as the model decides to call them."}
          </p>
        </div>
      </section>

      <section className="border border-[var(--color-rule)] rounded-md p-4 bg-white/70 mb-4 font-sans">
        <h2 className="font-semibold mb-2">Content sync</h2>
        <p className="text-sm text-[var(--color-muted)] mb-3">
          Re-read all curriculum Markdown from the <code>zero/</code> folder
          and re-seed the database. Safe to run any time.
        </p>
        <SyncButton />
      </section>

      <section className="border border-[var(--color-rule)] rounded-md p-4 bg-white/70 mb-4 font-sans">
        <h2 className="font-semibold mb-2">Persisted artifacts</h2>
        <ul className="text-sm space-y-1 list-disc list-inside text-[var(--color-muted)]">
          <li>
            <code>zero/04-learning/knowledge-tracker.md</code> — regenerated when
            concept statuses change.
          </li>
          <li>
            <code>zero/04-learning/questions-and-answers.md</code> — appended on
            every Q&A capture.
          </li>
          <li>
            <code>zero/04-learning/glossary.md</code> — regenerated on every
            glossary edit.
          </li>
          <li>
            <code>zero/05-meta/progress-log.md</code> — appended on every
            session entry.
          </li>
        </ul>
      </section>

      <section className="border border-[var(--color-danger)]/30 rounded-md p-4 bg-red-50/40 font-sans">
        <h2 className="font-semibold mb-2 text-[var(--color-danger)]">
          Danger zone
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-3">
          Wipe all learner-tracking state (glossary, Q&A, progress logs,
          chat history, concept promotions) and reset the live Markdown
          mirrors back to their seed templates. The curriculum, the
          navigation index, and the Haiku-written summaries are
          preserved. <strong>This cannot be undone.</strong>
        </p>
        <ResetButton />
      </section>
    </div>
  );
}
