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
Render a Lithium-Learning-Project-branded markdown document to HTML + PDF.

Adapted from the write-adadvisor-pdf skill: lithium-themed colors, CSS-rendered
"Li" mark instead of an external logo image, project-appropriate defaults.

Frontmatter fields (all optional; sensible defaults provided):
  title          Big title on the cover (defaults to first H1 in body)
  subtitle       Smaller line under the title
  eyebrow        Small uppercase line above the title
  brand_name     Header brand name (default "Zero -> Lithium")
  brand_tag      Tagline (default below)
  document_kind  Header label (default "Document")
  meta           List of {label, value} for the cover key/value grid
  footer_note    Cover footer line
  no_cover       If true, skip the cover page entirely

Usage:
  uv run zero/_pdf-tooling/render.py path/to/input.md
  uv run zero/_pdf-tooling/render.py path/to/input.md -o out/
"""
from __future__ import annotations

import argparse
import base64
import datetime as dt
import html
import re
import sys
from pathlib import Path
from typing import Any

import markdown
import weasyprint
import yaml

SCRIPT_DIR = Path(__file__).resolve().parent
CSS_PATH = SCRIPT_DIR / "style.css"
LOGO_PATH = SCRIPT_DIR / "lithium-logo.jpg"


def encode_logo() -> str:
    if not LOGO_PATH.exists():
        return ""
    data = base64.b64encode(LOGO_PATH.read_bytes()).decode("ascii")
    suffix = LOGO_PATH.suffix.lower().lstrip(".")
    mime = "jpeg" if suffix in {"jpg", "jpeg"} else suffix
    return f"data:image/{mime};base64,{data}"


def split_frontmatter(text: str) -> tuple[dict[str, Any], str]:
    if not text.startswith("---"):
        return {}, text
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?", text, re.DOTALL)
    if not m:
        return {}, text
    try:
        data = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError:
        data = {}
    return data, text[m.end():]


def extract_first_h1(md_body: str) -> str | None:
    m = re.search(r"^#\s+(.+?)\s*$", md_body, re.MULTILINE)
    return m.group(1).strip() if m else None


# --- Math handling -----------------------------------------------------------
# WeasyPrint's MathML renderer puts superscripts at the wrong baseline
# (10^22 ends up looking like 1022). So we use HTML <sup>/<sub> + Unicode
# instead. Reliable in any rendering engine.
#
# We pre-extract $...$ and $$...$$ before markdown, convert each to HTML,
# and swap back in via placeholders so markdown doesn't escape the tags.

GREEK_LOWER = {
    "alpha": "α", "beta": "β", "gamma": "γ", "delta": "δ",
    "epsilon": "ε", "varepsilon": "ε", "zeta": "ζ", "eta": "η",
    "theta": "θ", "vartheta": "ϑ", "iota": "ι", "kappa": "κ",
    "lambda": "λ", "mu": "μ", "nu": "ν", "xi": "ξ", "omicron": "ο",
    "pi": "π", "varpi": "ϖ", "rho": "ρ", "varrho": "ϱ",
    "sigma": "σ", "varsigma": "ς", "tau": "τ", "upsilon": "υ",
    "phi": "φ", "varphi": "ϕ", "chi": "χ", "psi": "ψ", "omega": "ω",
}
GREEK_UPPER = {
    "Alpha": "Α", "Beta": "Β", "Gamma": "Γ", "Delta": "Δ",
    "Epsilon": "Ε", "Zeta": "Ζ", "Eta": "Η", "Theta": "Θ",
    "Iota": "Ι", "Kappa": "Κ", "Lambda": "Λ", "Mu": "Μ",
    "Nu": "Ν", "Xi": "Ξ", "Pi": "Π", "Rho": "Ρ",
    "Sigma": "Σ", "Tau": "Τ", "Upsilon": "Υ", "Phi": "Φ",
    "Chi": "Χ", "Psi": "Ψ", "Omega": "Ω",
}
LATEX_SYMBOLS = {
    "times": "×", "cdot": "·", "cdots": "⋯", "ldots": "…", "vdots": "⋮",
    "pm": "±", "mp": "∓", "div": "÷",
    "approx": "≈", "sim": "∼", "simeq": "≃", "cong": "≅",
    "equiv": "≡", "propto": "∝", "neq": "≠", "ne": "≠",
    "leq": "≤", "le": "≤", "geq": "≥", "ge": "≥",
    "ll": "≪", "gg": "≫",
    "rightarrow": "→", "to": "→", "leftarrow": "←", "gets": "←",
    "leftrightarrow": "↔", "mapsto": "↦",
    "Rightarrow": "⇒", "Leftarrow": "⇐", "Leftrightarrow": "⇔",
    "iff": "⇔", "implies": "⇒",
    "infty": "∞", "partial": "∂", "nabla": "∇",
    "forall": "∀", "exists": "∃", "in": "∈", "notin": "∉",
    "subset": "⊂", "supset": "⊃", "cup": "∪", "cap": "∩",
    "int": "∫", "iint": "∬", "iiint": "∭",
    "sum": "∑", "prod": "∏",
    "angle": "∠", "perp": "⊥", "parallel": "∥",
    "circ": "°", "degree": "°",
    "hbar": "ℏ", "ell": "ℓ", "Re": "ℜ", "Im": "ℑ",
    "AA": "Å", "angstrom": "Å",
    "lbrace": "{", "rbrace": "}", "langle": "⟨", "rangle": "⟩",
    "lfloor": "⌊", "rfloor": "⌋", "lceil": "⌈", "rceil": "⌉",
    "dagger": "†", "ddagger": "‡", "ast": "∗",
    "left": "", "right": "",   # delimiters — drop the marker, keep the bracket
    "displaystyle": "", "textstyle": "", "scriptstyle": "",
    "%": "%",
}

# Operator names typeset upright in LaTeX (e.g., \exp, \ln, \sin)
LATEX_TEXT_OPS = {
    "exp", "ln", "log", "sin", "cos", "tan", "sec", "csc", "cot",
    "sinh", "cosh", "tanh", "lim", "sup", "inf", "max", "min",
    "arg", "det", "dim", "ker", "mod", "gcd",
}


def _replace_text_blocks(s: str) -> str:
    """Strip \\text{...} and \\mathrm{...} — keep the literal content."""
    while True:
        m = re.search(r"\\(?:text|mathrm|operatorname)\s*\{([^{}]*)\}", s)
        if not m:
            return s
        s = s[: m.start()] + m.group(1) + s[m.end():]


def _replace_fractions(s: str, display: bool) -> str:
    """Render \\frac{a}{b}. In display mode, stack via CSS; inline, use (a)/(b)."""
    while True:
        m = re.search(r"\\(?:frac|tfrac|dfrac)\s*\{([^{}]+)\}\s*\{([^{}]+)\}", s)
        if not m:
            return s
        num, den = m.group(1), m.group(2)
        if display:
            repl = (f'<span class="frac"><span class="num">{num}</span>'
                    f'<span class="den">{den}</span></span>')
        else:
            repl = f"({num})/({den})"
        s = s[: m.start()] + repl + s[m.end():]


def _replace_sqrt(s: str) -> str:
    while True:
        m = re.search(r"\\sqrt\s*\{([^{}]+)\}", s)
        if not m:
            return s
        repl = f'<span class="sqrt">√<span class="rooted">{m.group(1)}</span></span>'
        s = s[: m.start()] + repl + s[m.end():]


def _replace_commands(s: str) -> str:
    """Replace \\cmd with Unicode (Greek, symbols) or upright text (operators)."""
    def sub(m: re.Match) -> str:
        name = m.group(1)
        if name in GREEK_LOWER:
            return GREEK_LOWER[name]
        if name in GREEK_UPPER:
            return GREEK_UPPER[name]
        if name in LATEX_SYMBOLS:
            return LATEX_SYMBOLS[name]
        if name in LATEX_TEXT_OPS:
            return f'<span class="op">{name}</span>'
        return name  # unknown command — strip the backslash, keep the name
    return re.sub(r"\\([a-zA-Z]+)", sub, s)


def _replace_sup_sub(s: str) -> str:
    # Braced versions first
    s = re.sub(r"\^\{([^{}]+)\}", r"<sup>\1</sup>", s)
    s = re.sub(r"_\{([^{}]+)\}", r"<sub>\1</sub>", s)
    # Single-character versions; allow optional minus and one alphanumeric or unicode
    s = re.sub(r"\^(-?[\w-￿])", r"<sup>\1</sup>", s)
    s = re.sub(r"_(-?[\w-￿])", r"<sub>\1</sub>", s)
    return s


def latex_to_html(latex: str, display: bool = False) -> str:
    """Best-effort LaTeX → HTML+Unicode for the kinds of math in this curriculum."""
    s = latex.strip()
    s = _replace_text_blocks(s)
    s = _replace_fractions(s, display)
    s = _replace_sqrt(s)
    # Spacing macros
    s = re.sub(r"\\[,:;!]", " ", s)
    s = re.sub(r"\\quad\b", "  ", s)
    s = re.sub(r"\\qquad\b", "    ", s)
    s = _replace_commands(s)
    s = _replace_sup_sub(s)
    # Strip leftover {} (groupings)
    s = s.replace("{", "").replace("}", "")
    # Strip orphan backslashes
    s = s.replace("\\", "")
    return s


_MATH_MARKERS = re.compile(r"[\\^_{}]")
_GREEK_OR_VAR = re.compile(r"^[A-Za-z]\w?$")
_LETTER_OP_LETTER = re.compile(r"[A-Za-z]\s*[+\-*/×]\s*[A-Za-z0-9]")
_CURRENCY_LIKE = re.compile(r"\d{1,3}(,\d{3})+|^\d+(\.\d+)?\s*(/|\s)\s*[a-zA-Z]+\s*$")


def _is_likely_math(content: str) -> bool:
    s = content.strip()
    if not s:
        return False
    if _CURRENCY_LIKE.search(s):
        return False
    if _MATH_MARKERS.search(s):
        return True
    if "=" in s:
        return True
    if any(ch in s for ch in "×÷±∑∏∫√∞≈≠≤≥"):
        return True
    if _LETTER_OP_LETTER.search(s):
        return True
    if len(s) <= 3 and _GREEK_OR_VAR.match(s):
        return True
    return False


_DISPLAY_RE = re.compile(r"\$\$(.+?)\$\$", re.DOTALL)
_INLINE_RE = re.compile(
    r"(?<![\w\\])"
    r"\$"
    r"([^\$\n]{1,400}?)"
    r"\$"
    r"(?!\d)"
)


def _wrap_math(latex: str, display: bool) -> str:
    inner = latex_to_html(latex, display=display)
    cls = "math-display" if display else "math-inline"
    tag = "div" if display else "span"
    return f'<{tag} class="{cls}">{inner}</{tag}>'


def _extract_math(md_body: str) -> tuple[str, dict[str, str]]:
    placeholders: dict[str, str] = {}
    counter = [0]

    def store(html_snippet: str) -> str:
        # Zero-width-space wrapped marker that markdown won't touch
        key = f"​MATHHTML{counter[0]}​"
        counter[0] += 1
        placeholders[key] = html_snippet
        return key

    def display_sub(m: re.Match) -> str:
        return store(_wrap_math(m.group(1), display=True))

    def inline_sub(m: re.Match) -> str:
        content = m.group(1)
        if not _is_likely_math(content):
            return m.group(0)
        return store(_wrap_math(content, display=False))

    md_body = _DISPLAY_RE.sub(display_sub, md_body)
    md_body = _INLINE_RE.sub(inline_sub, md_body)
    return md_body, placeholders


def render_body(md_body: str) -> str:
    pre_md, placeholders = _extract_math(md_body)
    md = markdown.Markdown(
        extensions=[
            "extra",
            "sane_lists",
            "smarty",
            "toc",
        ],
        output_format="html5",
    )
    html_out = md.convert(pre_md)
    for key, snippet in placeholders.items():
        html_out = html_out.replace(key, snippet)
    return html_out


def render_meta_grid(meta: list[dict[str, Any]]) -> str:
    if not meta:
        return ""
    fields = []
    for item in meta:
        label = html.escape(str(item.get("label", "")))
        value = html.escape(str(item.get("value", "")))
        fields.append(
            f'<div class="field"><div class="label">{label}</div>'
            f'<div class="value">{value}</div></div>'
        )
    return f'<div class="meta">{"".join(fields)}</div>'


def render_cover(fm: dict[str, Any], md_body: str, logo_uri: str) -> tuple[str, str]:
    title = fm.get("title") or extract_first_h1(md_body) or "Untitled"
    subtitle = fm.get("subtitle", "")
    eyebrow = fm.get("eyebrow", "Lithium Learning Project")
    brand_name = fm.get("brand_name", "Zero -> Lithium")
    brand_tag = fm.get("brand_tag", "From Atoms to Isotope Separation")
    today = dt.date.today().strftime("%B %d, %Y")
    footer_note = fm.get(
        "footer_note",
        f"Lithium Learning Project · Compiled {today}",
    )
    meta_html = render_meta_grid(fm.get("meta") or [])
    logo_html = (
        f'<img class="logo" src="{logo_uri}" alt="Lithium element symbol">'
        if logo_uri else '<div class="logo"></div>'
    )

    cover_html = f"""
<section class="cover">
  <div class="top">
    {logo_html}
    <div class="brand">
      <div class="name">{html.escape(brand_name)}</div>
      <div class="tag">{html.escape(brand_tag)}</div>
    </div>
  </div>

  <div class="middle">
    <div class="eyebrow">{html.escape(eyebrow)}</div>
    <h1><span class="accent-bar"></span>{html.escape(title)}</h1>
    {f'<h2 class="subtitle">{html.escape(subtitle)}</h2>' if subtitle else ''}
    {meta_html}
  </div>

  <div class="bottom">
    <div class="stripe"></div>
    {html.escape(footer_note)}
  </div>
</section>
""".strip()
    return cover_html, title


def build_html(md_text: str, css: str) -> tuple[str, str]:
    fm, md_body = split_frontmatter(md_text)
    body_html = render_body(md_body)

    no_cover = bool(fm.get("no_cover"))
    document_kind = html.escape(str(fm.get("document_kind", "Document")))
    brand_name = html.escape(str(fm.get("brand_name", "Zero -> Lithium")))
    logo_uri = encode_logo()

    if no_cover:
        cover_html = ""
        title = fm.get("title") or extract_first_h1(md_body) or "Document"
    else:
        cover_html, title = render_cover(fm, md_body, logo_uri)

    header_logo = (
        f'<img src="{logo_uri}" alt="">' if logo_uri else '<span class="nuclei"></span>'
    )
    page_header = f"""
<div class="page-header">
  <div class="left">
    {header_logo}
    <span><strong>{brand_name}</strong> &nbsp;·&nbsp; {document_kind}</span>
  </div>
</div>
""".strip()

    page_footer = f"""
<div class="page-footer">
  <div><span class="accent"></span>Lithium Learning Project</div>
  <div>Page <span class="pageno"></span></div>
</div>
""".strip()

    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{html.escape(title)}</title>
<style>{css}</style>
</head>
<body>
{page_header}
{page_footer}
{cover_html}
<section class="body">
{body_html}
</section>
</body>
</html>
"""
    return full_html, title


def render_md_to_pdf(md_text: str, out_html: Path, out_pdf: Path) -> None:
    css = CSS_PATH.read_text(encoding="utf-8")
    full_html, _ = build_html(md_text, css)
    out_html.parent.mkdir(parents=True, exist_ok=True)
    out_html.write_text(full_html, encoding="utf-8")
    weasyprint.HTML(string=full_html, base_url=str(out_html.parent)).write_pdf(str(out_pdf))


def main() -> int:
    ap = argparse.ArgumentParser(description="Render a lithium-themed markdown doc to HTML+PDF.")
    ap.add_argument("input", help="Path to markdown file")
    ap.add_argument("-o", "--out-dir", help="Output directory (default: alongside input)")
    args = ap.parse_args()

    in_path = Path(args.input).expanduser().resolve()
    if not in_path.exists():
        print(f"error: {in_path} not found", file=sys.stderr)
        return 1

    out_dir = Path(args.out_dir).expanduser().resolve() if args.out_dir else in_path.parent
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = in_path.stem
    html_path = out_dir / f"{stem}.html"
    pdf_path = out_dir / f"{stem}.pdf"

    md_text = in_path.read_text(encoding="utf-8")
    render_md_to_pdf(md_text, html_path, pdf_path)

    print(f"wrote {html_path}")
    print(f"wrote {pdf_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
