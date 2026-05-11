import { ensureSeeded } from "@/lib/content-loader";
import { DEFAULT_MODEL } from "@/lib/llm";
import SyncButton from "./sync-button";
import ResetButton from "./reset-button";
import CredentialsForm from "./credentials-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  ensureSeeded();
  const model = DEFAULT_MODEL;
  const requireClientAuth = process.env.LITHIUM_REQUIRE_CLIENT_AUTH === "1";
  const oauthSet = !!process.env.CLAUDE_CODE_OAUTH_TOKEN;
  const apiKeySet = !!process.env.ANTHROPIC_API_KEY;
  return (
    <div className="px-8 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-[var(--color-muted)] mb-6 text-[0.95rem]">
        Diagnostics for the local environment.
      </p>

      <section className="border border-[var(--color-rule)] rounded-md p-4 bg-white/70 mb-4 font-sans">
        <h2 className="font-semibold mb-2">Chat credentials (this browser)</h2>
        <CredentialsForm />
      </section>

      <section className="border border-[var(--color-rule)] rounded-md p-4 bg-white/70 mb-4 font-sans">
        <h2 className="font-semibold mb-2">Server diagnostics</h2>
        <div className="text-sm">
          <div>
            <span className="text-[var(--color-muted)]">Model: </span>
            <code>{model}</code>
          </div>
          <div>
            <span className="text-[var(--color-muted)]">Server ANTHROPIC_API_KEY: </span>
            <code>{apiKeySet ? "set" : "—"}</code>
          </div>
          <div>
            <span className="text-[var(--color-muted)]">Server CLAUDE_CODE_OAUTH_TOKEN: </span>
            <code>{oauthSet ? "set" : "—"}</code>
          </div>
          <div>
            <span className="text-[var(--color-muted)]">LITHIUM_REQUIRE_CLIENT_AUTH: </span>
            <code>{requireClientAuth ? "on" : "off"}</code>
          </div>
          <p className="mt-2 text-[var(--color-muted)] text-[0.9rem]">
            {requireClientAuth
              ? "Server env credentials are ignored. Every chat / mark-complete request must include x-claude-auth from the browser."
              : apiKeySet || oauthSet
                ? "Server has credentials available as a fallback when the browser doesn't send x-claude-auth (local dev convenience)."
                : "No server credentials configured. Browser must provide a token."}
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
