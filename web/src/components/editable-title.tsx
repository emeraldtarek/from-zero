"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Inline-edit title widget. Click the text to edit, Enter or blur to save,
 * Esc to cancel. PATCHes the configured endpoint with { id, title } and
 * refreshes the route on success.
 */
export default function EditableTitle({
  id,
  initial,
  endpoint = "/api/sessions",
  className = "text-xl font-semibold",
}: {
  id: number;
  initial: string;
  endpoint?: string;
  className?: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  async function save() {
    const next = value.trim();
    if (!next || next === initial) {
      setValue(initial);
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      const r = await fetch(endpoint, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, title: next }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setEditing(false);
      router.refresh();
    } catch {
      setValue(initial);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className={`${className} text-left hover:underline decoration-dotted underline-offset-4 cursor-text`}
        title="Click to rename"
      >
        {value}
      </button>
    );
  }

  return (
    <input
      ref={inputRef}
      autoFocus
      value={value}
      disabled={saving}
      onChange={(e) => setValue(e.target.value)}
      onBlur={save}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          save();
        } else if (e.key === "Escape") {
          e.preventDefault();
          setValue(initial);
          setEditing(false);
        }
      }}
      className={`${className} bg-transparent border-b border-[var(--color-rule)] focus:border-[var(--color-ink)] outline-none px-0`}
    />
  );
}
