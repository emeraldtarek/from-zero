"use client";

import { useEffect, useRef, useState } from "react";

type Heading = { id: string; text: string; level: number };

/**
 * Mintlify-style "On this page" panel. Scans the .prose-reader subtree for
 * h2/h3 elements with ids (added by rehype-slug), renders them as a
 * click-to-scroll list, and tracks which heading is currently in view via
 * IntersectionObserver. Collapsible.
 */
export default function PageToc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const prose = document.querySelector(".prose-reader");
    if (!prose) return;
    const nodes = prose.querySelectorAll<HTMLHeadingElement>(
      "h2[id], h3[id]",
    );
    const found: Heading[] = [];
    for (const n of nodes) {
      const id = n.id;
      const text = n.textContent ?? "";
      const level = n.tagName === "H3" ? 3 : 2;
      if (id && text) found.push({ id, text, level });
    }
    setHeadings(found);

    if (found.length === 0) return;

    // Re-create the observer for the discovered headings.
    observerRef.current?.disconnect();
    const visible = new Set<string>();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // Pick the earliest visible heading in document order so the active
        // marker stays on the section the user is reading (not the last one
        // that scrolled past).
        if (visible.size > 0) {
          const first = found.find((h) => visible.has(h.id));
          if (first) setActiveId(first.id);
        } else if (!activeId) {
          // Edge case: page loaded scrolled past everything; default to first.
          setActiveId(found[0]?.id ?? null);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );
    for (const n of nodes) observerRef.current.observe(n);
    // Initialize active to first heading.
    if (!activeId) setActiveId(found[0]?.id ?? null);

    return () => observerRef.current?.disconnect();
    // The discovered headings change per page; rerun if path-driven content
    // remounts the component (Next does this on /read/[...slug] navigation).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (headings.length === 0) return null;

  function jump(id: string, e: React.MouseEvent) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    // Account for any fixed header — none here, but keep 8px breathing room.
    const top = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="px-3 pt-3 pb-2 border-b border-[var(--color-rule)] font-sans text-[0.85rem]"
    >
      <summary className="cursor-pointer text-[0.72rem] uppercase tracking-widest text-[var(--color-muted)] mb-2 list-none flex items-center justify-between">
        <span>On this page</span>
        <span className="text-[var(--color-muted)] font-mono text-[0.7rem]">
          {open ? "−" : "+"}
        </span>
      </summary>
      <ul className="space-y-0.5 max-h-72 overflow-y-auto pr-1">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => jump(h.id, e)}
                className={[
                  "block py-0.5 leading-snug rounded transition-colors",
                  h.level === 3 ? "pl-4 text-[0.8rem]" : "pl-2",
                  active
                    ? "text-[var(--color-accent)] font-semibold"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                ].join(" ")}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
