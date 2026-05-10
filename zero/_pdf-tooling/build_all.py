#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "markdown>=3.5",
#   "weasyprint>=60",
#   "pyyaml>=6",
#   "pymdown-extensions>=10",
# ]
# ///
"""
Walk zero/, find every .md file, generate a project-appropriate frontmatter
based on file path, and render to HTML + PDF in zero/_pdf-output/ mirroring
the source folder structure.

Run:  uv run zero/_pdf-tooling/build_all.py
"""
from __future__ import annotations

import datetime as dt
import sys
import time
from pathlib import Path

# Import the local render module
sys.path.insert(0, str(Path(__file__).resolve().parent))
from render import build_html, CSS_PATH  # type: ignore

import weasyprint  # noqa

ZERO_DIR = Path(__file__).resolve().parent.parent  # zero/
OUTPUT_DIR = ZERO_DIR / "_pdf-output"
EXCLUDE_DIRS = {"_pdf-tooling", "_pdf-output"}

# Folder → (eyebrow, document_kind, subtitle prefix)
FOLDER_META = {
    ".":                          ("Project Master",        "Master Document",        "Lithium learning project"),
    "00-context":                 ("Project Context",        "Context",                "What, why, how"),
    "01-chemistry-fundamentals":  ("Chemistry Fundamentals", "Chemistry",              "Building from atoms upward"),
    "02-water-treatment":         ("Water Treatment",        "Engineering",            "Unit operations and ion handling"),
    "03-lithium-isotope-separation": ("Lithium Isotope Separation", "Lithium",         "Li-6 vs Li-7"),
    "04-learning":                ("Learning",               "Learning Tracker",       "Knowledge progression"),
    "05-meta":                    ("Project Meta",           "Meta",                   "Process, progress, synthesis"),
    "05-meta/research-notes":     ("Research Notes",         "Research Notes",         "Doctorate-level source material"),
}


def folder_key(rel_dir: Path) -> str:
    parts = rel_dir.parts
    if not parts or parts == (".",):
        return "."
    # try the deepest match first
    for n in range(len(parts), 0, -1):
        key = "/".join(parts[:n])
        if key in FOLDER_META:
            return key
    return "."


def first_h1(text: str) -> str | None:
    for line in text.splitlines():
        line = line.lstrip()
        if line.startswith("# ") and not line.startswith("## "):
            return line[2:].strip()
    return None


def make_frontmatter(md_path: Path, rel: Path) -> str:
    text = md_path.read_text(encoding="utf-8")
    if text.startswith("---"):
        # Already has frontmatter; pass through as-is
        return text

    title = first_h1(text) or md_path.stem.replace("-", " ").title()
    rel_dir = rel.parent
    key = folder_key(rel_dir)
    eyebrow, document_kind, subtitle_default = FOLDER_META[key]

    # Per-file overrides: README files get a different subtitle
    if md_path.stem == "README":
        subtitle = f"{subtitle_default}: index and reading order"
    elif md_path.name == "CLAUDE.md":
        subtitle = "Master entry point — read first on session resume"
    else:
        subtitle = subtitle_default

    today = dt.date.today().strftime("%B %d, %Y")
    fm = (
        "---\n"
        f"title: {yaml_escape(title)}\n"
        f"subtitle: {yaml_escape(subtitle)}\n"
        f"eyebrow: {yaml_escape(eyebrow)}\n"
        f"document_kind: {yaml_escape(document_kind)}\n"
        f'brand_name: "Zero -> Lithium"\n'
        f'brand_tag: "From Atoms to Isotope Separation"\n'
        "meta:\n"
        f'  - label: Section\n    value: {yaml_escape(eyebrow)}\n'
        f'  - label: Source\n    value: {yaml_escape(str(rel))}\n'
        f'  - label: Compiled\n    value: {yaml_escape(today)}\n'
        f'  - label: Status\n    value: {yaml_escape("Curriculum draft")}\n'
        f"footer_note: Lithium Learning Project · Compiled {today}\n"
        "---\n\n"
    )
    return fm + text


def yaml_escape(s: str) -> str:
    """Quote the YAML string when special chars present."""
    needs_quote = any(c in s for c in ":#&*!|>'\"%@`{}[],")
    if needs_quote:
        # use double quotes, escape internal double quotes
        return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'
    return s


def render_one(md_path: Path) -> tuple[Path, Path, float]:
    rel = md_path.relative_to(ZERO_DIR)
    md_text = make_frontmatter(md_path, rel)
    css = CSS_PATH.read_text(encoding="utf-8")
    full_html, _ = build_html(md_text, css)

    out_dir = OUTPUT_DIR / rel.parent
    out_dir.mkdir(parents=True, exist_ok=True)
    html_path = out_dir / f"{md_path.stem}.html"
    pdf_path = out_dir / f"{md_path.stem}.pdf"

    html_path.write_text(full_html, encoding="utf-8")

    t0 = time.perf_counter()
    weasyprint.HTML(string=full_html, base_url=str(out_dir)).write_pdf(str(pdf_path))
    elapsed = time.perf_counter() - t0
    return html_path, pdf_path, elapsed


def collect_md_files() -> list[Path]:
    files: list[Path] = []
    for p in ZERO_DIR.rglob("*.md"):
        rel = p.relative_to(ZERO_DIR)
        if any(part in EXCLUDE_DIRS for part in rel.parts):
            continue
        files.append(p)
    return sorted(files)


def main() -> int:
    files = collect_md_files()
    print(f"Found {len(files)} markdown files to render")
    print(f"Output → {OUTPUT_DIR}")
    print("-" * 60)

    total_t0 = time.perf_counter()
    failures: list[tuple[Path, Exception]] = []
    successes: list[Path] = []

    for i, md in enumerate(files, 1):
        rel = md.relative_to(ZERO_DIR)
        try:
            _, pdf_path, elapsed = render_one(md)
            print(f"[{i:2d}/{len(files)}] {elapsed:5.2f}s  {rel} → {pdf_path.relative_to(ZERO_DIR)}")
            successes.append(pdf_path)
        except Exception as e:
            print(f"[{i:2d}/{len(files)}] FAILED  {rel}: {e}")
            failures.append((md, e))

    total_elapsed = time.perf_counter() - total_t0
    print("-" * 60)
    print(f"Done. {len(successes)} succeeded, {len(failures)} failed in {total_elapsed:.1f}s")
    if failures:
        print("Failures:")
        for md, e in failures:
            print(f"  {md.relative_to(ZERO_DIR)}: {e}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
