"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { withAuthHeader } from "@/lib/client-auth";

type State =
  | { kind: "idle" }
  | { kind: "marking" }
  | { kind: "done"; glossary_added: number; concepts_promoted: number; already: boolean }
  | { kind: "error"; message: string };

/**
 * Inline "Mark complete" pill rendered next to each h2/h3 heading and a
 * "Mark page complete" button at the top of the page. One-way — once
 * marked, the button becomes a static ✓ Completed pill.
 */
export default function SectionMark({
  pageSlug,
  sectionAnchor,
  initialCompleted,
  variant = "section",
}: {
  pageSlug: string;
  sectionAnchor: string | null;
  initialCompleted: boolean;
  variant?: "section" | "page";
}) {
  const router = useRouter();
  const [state, setState] = useState<State>(
    initialCompleted ? { kind: "done", glossary_added: 0, concepts_promoted: 0, already: true } : { kind: "idle" },
  );

  async function run() {
    setState({ kind: "marking" });
    try {
      const r = await fetch(
        "/api/section/complete",
        withAuthHeader({
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            page_slug: pageSlug,
            section_anchor: sectionAnchor,
          }),
        }),
      );
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
      setState({
        kind: "done",
        glossary_added: j.glossary_added ?? 0,
        concepts_promoted: j.concepts_promoted ?? 0,
        already: j.already === true,
      });
      router.refresh();
    } catch (err) {
      setState({ kind: "error", message: String(err).slice(0, 200) });
    }
  }

  if (state.kind === "done") {
    if (variant === "page") {
      return (
        <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-sans px-2 py-1 rounded-md bg-[var(--color-good)]/10 text-[var(--color-good)] border border-[var(--color-good)]/30">
          ✓ Page completed
          {state.glossary_added > 0 && (
            <span className="text-[var(--color-muted)]">
              · {state.glossary_added} terms · {state.concepts_promoted} concepts
            </span>
          )}
        </span>
      );
    }
    return (
      <span
        className="inline-flex items-center gap-1 text-[0.7rem] font-sans px-1.5 py-0.5 rounded bg-[var(--color-good)]/10 text-[var(--color-good)] border border-[var(--color-good)]/30 align-middle"
        title={
          state.glossary_added > 0
            ? `${state.glossary_added} glossary terms added`
            : "Completed"
        }
      >
        ✓
      </span>
    );
  }

  if (state.kind === "marking") {
    return (
      <span className="inline-flex items-center gap-1 text-[0.7rem] font-sans px-1.5 py-0.5 rounded bg-[var(--color-paper-2)] text-[var(--color-muted)] border border-[var(--color-rule)] align-middle">
        …
      </span>
    );
  }

  if (state.kind === "error") {
    return (
      <button
        onClick={run}
        title={state.message}
        className="inline-flex items-center gap-1 text-[0.7rem] font-sans px-1.5 py-0.5 rounded text-[var(--color-danger)] border border-[var(--color-danger)]/30 align-middle"
      >
        retry
      </button>
    );
  }

  if (variant === "page") {
    return (
      <button
        onClick={run}
        className="inline-flex items-center gap-1.5 text-[0.78rem] font-sans px-2 py-1 rounded-md bg-[var(--color-ink)] text-[var(--color-paper)] hover:opacity-90"
      >
        Mark page complete
      </button>
    );
  }
  return (
    <button
      onClick={run}
      title="Mark this section complete (adds glossary terms, updates progress)"
      className="inline-flex items-center gap-1 text-[0.7rem] font-sans px-1.5 py-0.5 rounded text-[var(--color-muted)] hover:text-[var(--color-ink)] border border-[var(--color-rule)] hover:border-[var(--color-ink)] align-middle"
    >
      mark completed
    </button>
  );
}
