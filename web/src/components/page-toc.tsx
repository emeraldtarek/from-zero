"use client";

import { useEffect, useRef, useState } from "react";

type Heading = { id: string; text: string; level: number };

/**
 * Mintlify-style "On this page" panel. Scans the .prose-reader subtree for
 * h2/h3 elements with ids (added by rehype-slug), renders them as a
 * click-to-scroll list, and tracks the currently-read section by scroll
 * position.
 *
 * Why scroll-position instead of IntersectionObserver: IO with a narrow
 * rootMargin loses the active state in the "between two headings" gap
 * (no heading visible → observer empty → fallback fires → wrong section
 * highlighted). The scroll-position model picks "the last heading whose
 * top is at or above the activation line" — always defined, always
 * correct.
 */
const ACTIVATION_OFFSET_PX = 120;

export default function PageToc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Whenever the active section changes, scroll the TOC's inner scroller
  // (the <ul>) so the active item stays in view. `block: "nearest"` is a
  // no-op when the item is already visible, so this only fires when the
  // active item just scrolled off the TOC's viewport.
  useEffect(() => {
    if (!activeId) return;
    const el = itemRefs.current.get(activeId);
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeId]);

  useEffect(() => {
    const prose = document.querySelector(".prose-reader");
    if (!prose) return;
    const nodes = prose.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]");
    const found: Heading[] = [];
    for (const n of nodes) {
      const id = n.id;
      const text = n.textContent ?? "";
      const level = n.tagName === "H3" ? 3 : 2;
      if (id && text) found.push({ id, text, level });
    }
    setHeadings(found);
    if (found.length === 0) return;

    let raf: number | null = null;
    function update() {
      raf = null;
      let next: string | null = found[0]?.id ?? null;
      for (const h of found) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= ACTIVATION_OFFSET_PX) {
          next = h.id;
        } else {
          break; // headings are in document order; first one below the line wins
        }
      }
      setActiveId((prev) => (prev === next ? prev : next));
    }
    function onScroll() {
      if (raf != null) return;
      raf = requestAnimationFrame(update);
    }

    // Initial sync — handles fresh page loads at a #hash anchor.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (headings.length === 0) return null;

  function jump(id: string, e: React.MouseEvent) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Set active immediately for snappy UI; the scroll handler will keep
    // it accurate as the smooth-scroll completes.
    setActiveId(id);
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
                ref={(node) => {
                  if (node) itemRefs.current.set(h.id, node);
                  else itemRefs.current.delete(h.id);
                }}
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
