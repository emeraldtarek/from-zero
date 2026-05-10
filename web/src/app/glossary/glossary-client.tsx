"use client";
import { useEffect, useMemo, useState } from "react";
import type { GlossaryRow } from "@/lib/db";

export default function GlossaryClient({ initial }: { initial: GlossaryRow[] }) {
  const [entries, setEntries] = useState<GlossaryRow[]>(initial);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Partial<GlossaryRow> | null>(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return entries;
    return entries.filter(
      (e) =>
        e.term.toLowerCase().includes(needle) ||
        e.definition.toLowerCase().includes(needle) ||
        (e.symbol ?? "").toLowerCase().includes(needle),
    );
  }, [entries, q]);

  async function refresh() {
    const r = await fetch("/api/glossary");
    const j = await r.json();
    setEntries(j.entries);
  }

  useEffect(() => {
    setEntries(initial);
  }, [initial]);

  async function save() {
    if (!editing?.term || !editing?.definition) return;
    setSaving(true);
    try {
      await fetch("/api/glossary", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(editing),
      });
      setEditing(null);
      await refresh();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    await fetch(`/api/glossary?id=${id}`, { method: "DELETE" });
    await refresh();
  }

  return (
    <div className="font-sans">
      <div className="flex gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`search ${entries.length} term${entries.length === 1 ? "" : "s"}…`}
          className="flex-1 border border-[var(--color-rule)] rounded px-2 py-1 text-sm bg-white"
        />
        <button
          onClick={() => setEditing({ term: "", definition: "" })}
          className="px-3 py-1 text-sm bg-[var(--color-ink)] text-[var(--color-paper)] rounded"
        >
          + Add term
        </button>
      </div>

      {editing && (
        <div className="border border-[var(--color-rule)] rounded p-3 mb-3 bg-white/70">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              value={editing.term ?? ""}
              onChange={(e) => setEditing({ ...editing, term: e.target.value })}
              placeholder="Term (e.g., Avogadro's number)"
              className="border border-[var(--color-rule)] rounded px-2 py-1 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={editing.symbol ?? ""}
                onChange={(e) => setEditing({ ...editing, symbol: e.target.value })}
                placeholder="Symbol (Nₐ)"
                className="border border-[var(--color-rule)] rounded px-2 py-1 text-sm"
              />
              <input
                value={editing.units ?? ""}
                onChange={(e) => setEditing({ ...editing, units: e.target.value })}
                placeholder="Units (mol⁻¹)"
                className="border border-[var(--color-rule)] rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
          <textarea
            value={editing.definition ?? ""}
            onChange={(e) => setEditing({ ...editing, definition: e.target.value })}
            placeholder="Definition"
            rows={3}
            className="w-full border border-[var(--color-rule)] rounded px-2 py-1 text-sm mb-2 resize-y"
          />
          <input
            value={editing.see_also ?? ""}
            onChange={(e) => setEditing({ ...editing, see_also: e.target.value })}
            placeholder="See also (comma-separated)"
            className="w-full border border-[var(--color-rule)] rounded px-2 py-1 text-sm mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={saving || !editing.term || !editing.definition}
              className="px-3 py-1 text-sm bg-[var(--color-ink)] text-[var(--color-paper)] rounded disabled:opacity-40"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-3 py-1 text-sm border border-[var(--color-rule)] rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="w-full text-[0.9rem] border border-[var(--color-rule)] rounded overflow-hidden bg-white/70">
        <thead className="bg-[var(--color-paper-2)]">
          <tr>
            <th className="text-left px-3 py-2 w-44">Term</th>
            <th className="text-left px-3 py-2 w-16">Symbol</th>
            <th className="text-left px-3 py-2 w-20">Units</th>
            <th className="text-left px-3 py-2">Definition</th>
            <th className="text-left px-3 py-2 w-24"></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-3 py-6 text-center text-[var(--color-muted)]">
                No terms{q ? " match your search" : " yet — Claude will add them as it explains things"}.
              </td>
            </tr>
          ) : (
            filtered.map((e) => (
              <tr key={e.id} className="border-t border-[var(--color-rule)]">
                <td className="px-3 py-2 font-semibold align-top">{e.term}</td>
                <td className="px-3 py-2 align-top font-mono text-[0.85rem]">{e.symbol ?? ""}</td>
                <td className="px-3 py-2 align-top font-mono text-[0.85rem]">{e.units ?? ""}</td>
                <td className="px-3 py-2 align-top">
                  <div className="whitespace-pre-wrap leading-snug">{e.definition}</div>
                  {e.see_also && (
                    <div className="text-[0.78rem] text-[var(--color-muted)] mt-1">
                      see also: {e.see_also}
                    </div>
                  )}
                </td>
                <td className="px-3 py-2 align-top text-right whitespace-nowrap">
                  <button
                    onClick={() => setEditing(e)}
                    className="text-[0.78rem] underline mr-2"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => remove(e.id)}
                    className="text-[0.78rem] underline text-[var(--color-danger)]"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
