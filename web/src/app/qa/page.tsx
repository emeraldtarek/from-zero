import Link from "next/link";
import { ensureSeeded } from "@/lib/content-loader";
import { listQA } from "@/lib/repos";
import MarkdownView from "@/components/markdown-view";

export const dynamic = "force-dynamic";

export default async function QAPage() {
  ensureSeeded();
  const items = listQA();
  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Q&A log</h1>
        <p className="text-[var(--color-muted)] mt-1 text-[0.95rem]">
          Persisted to <code>04-learning/questions-and-answers.md</code>. Substantive
          questions (and Claude's answers) land here automatically when Claude
          decides the exchange is durable enough to log.
        </p>
      </div>
      {items.length === 0 ? (
        <div className="text-[var(--color-muted)] text-sm">
          No Q&A yet. Open a page and ask Claude something — meaningful exchanges
          will be persisted here.
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((q) => (
            <article
              key={q.id}
              className="border border-[var(--color-rule)] rounded-md p-4 bg-white/70"
            >
              <div className="text-[0.78rem] uppercase tracking-widest text-[var(--color-muted)] mb-1 flex flex-wrap gap-2">
                <span>Q-{String(q.id).padStart(3, "0")}</span>
                <span>· {q.created_at.slice(0, 10)}</span>
                {q.page_slug && (
                  <Link className="underline" href={`/read/${q.page_slug}`}>
                    {q.page_slug}
                  </Link>
                )}
                {q.concept_slug && <span>· {q.concept_slug}</span>}
              </div>
              <h3 className="font-semibold text-[1.05rem] mb-2">{q.question}</h3>
              <MarkdownView source={q.answer} />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
