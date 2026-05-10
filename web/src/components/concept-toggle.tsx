"use client";
import { useState, useTransition } from "react";

const STATUSES = [
  { value: "todo", label: "⏳ To do", cls: "todo" },
  { value: "exposed", label: "🔴 Exposed", cls: "exposed" },
  { value: "comfortable", label: "🟡 Comfortable", cls: "comfortable" },
  { value: "solid", label: "✅ Solid", cls: "solid" },
] as const;

type Status = (typeof STATUSES)[number]["value"];

export default function ConceptToggle({
  slug,
  status: initialStatus,
  label,
}: {
  slug: string;
  status: Status;
  label?: string;
}) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [pending, startTransition] = useTransition();

  function update(next: Status) {
    setStatus(next);
    startTransition(async () => {
      await fetch("/api/concepts", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, status: next }),
      });
    });
  }

  return (
    <div className="inline-flex gap-1 items-center">
      {label && (
        <span className="text-[0.85rem] mr-2 leading-snug">{label}</span>
      )}
      <select
        value={status}
        disabled={pending}
        onChange={(e) => update(e.target.value as Status)}
        className={`pill ${STATUSES.find((s) => s.value === status)?.cls ?? ""}`}
        style={{ cursor: "pointer" }}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
