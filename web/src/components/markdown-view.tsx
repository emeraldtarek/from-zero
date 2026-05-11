"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import SectionMark from "./section-mark";

export default function MarkdownView({
  source,
  pageSlug,
  completedAnchors,
}: {
  source: string;
  pageSlug?: string;
  completedAnchors?: Set<string>;
}) {
  // Heading components only render the inline mark button when a pageSlug
  // is passed (i.e., reader pages). Glossary/Q&A pages render markdown
  // without the per-heading completion UI.
  const withMark = !!pageSlug;
  return (
    <div className="prose-reader">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeKatex,
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeExternalLinks,
            { target: "_blank", rel: ["noopener", "noreferrer"] },
          ],
        ]}
        components={
          withMark
            ? {
                h2: (props) => (
                  <h2 {...props} className="group flex items-center gap-3">
                    <span>{props.children}</span>
                    <SectionMark
                      pageSlug={pageSlug as string}
                      sectionAnchor={
                        (props as { id?: string }).id ?? null
                      }
                      initialCompleted={
                        (completedAnchors?.has(
                          (props as { id?: string }).id ?? "",
                        )) ?? false
                      }
                    />
                  </h2>
                ),
                h3: (props) => (
                  <h3 {...props} className="group flex items-center gap-3">
                    <span>{props.children}</span>
                    <SectionMark
                      pageSlug={pageSlug as string}
                      sectionAnchor={
                        (props as { id?: string }).id ?? null
                      }
                      initialCompleted={
                        (completedAnchors?.has(
                          (props as { id?: string }).id ?? "",
                        )) ?? false
                      }
                    />
                  </h3>
                ),
              }
            : undefined
        }
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
