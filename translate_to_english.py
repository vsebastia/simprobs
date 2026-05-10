#!/usr/bin/env python3
"""
translate_to_english.py

Generates an English version of ProbLab under /en/ by:
  1. Translating every HTML file via the Anthropic API
  2. Writing translated files to en/<same-relative-path>
  3. Fixing static-asset paths (CSS/JS) to absolute in /en/ files
  4. Adding hreflang alternate links to both ES and EN versions
  5. Appending /en/ entries to sitemap.xml

Usage:
    ANTHROPIC_API_KEY=sk-... python3 translate_to_english.py
    python3 translate_to_english.py --dry-run        # preview, no writes
    python3 translate_to_english.py --file normal.html  # single file
"""

import os
import re
import sys
import time
import argparse
from pathlib import Path
from bs4 import BeautifulSoup

BASE_DIR = Path(__file__).parent.resolve()
EN_DIR = BASE_DIR / "en"
BASE_URL = "https://problabtools.es"
TODAY = "2026-05-10"

# Legal/cookie pages offer little SEO value in English; skip them
SKIP_FILES = {"legal.html", "aviso-legal.html", "privacidad.html", "cookies.html"}

# Static asset extensions that need absolute-path conversion in /en/ files
ASSET_EXTENSIONS = {".css", ".js", ".png", ".svg", ".jpg", ".jpeg", ".webp", ".ico", ".xml"}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def get_all_html_files():
    """Return sorted list of (abs_path, rel_path) for every Spanish HTML file."""
    result = []
    for p in sorted(BASE_DIR.rglob("*.html")):
        rel = p.relative_to(BASE_DIR)
        if rel.parts[0] == "en":
            continue
        if p.name in SKIP_FILES:
            continue
        result.append((p, rel))
    return result


def es_url(rel: Path) -> str:
    return f"{BASE_URL}/{rel.as_posix()}"


def en_url(rel: Path) -> str:
    return f"{BASE_URL}/en/{rel.as_posix()}"


# ---------------------------------------------------------------------------
# Translation via Anthropic API
# ---------------------------------------------------------------------------

TRANSLATION_PROMPT = """\
You are translating a Spanish statistics education website (ProbLab) to English.

Translate the HTML below from Spanish to English following these rules strictly:

TRANSLATE:
- All visible text in the body (headings, paragraphs, list items, button labels, option text, footer links text)
- <title> tag content
- meta name="description" content attribute
- meta name="keywords" content attribute
- og:title, og:description, og:image:alt content attributes
- twitter:title, twitter:description, twitter:image:alt content attributes
- JSON-LD string values for keys: "name", "description", "text", "acceptedAnswer/text"
- alt attributes on <img> tags
- aria-label attributes

DO NOT CHANGE:
- Any URL (href, src, action, canonical, og:url, og:image)
- Class names, IDs, data-* attributes
- JavaScript code (inside <script> tags that are NOT application/ld+json)
- CSS (inside <style> tags)
- Mathematical formulas (LaTeX/MathJax: \\( ... \\), $ ... $, \\[ ... \\])
- The brand name "ProbLab"
- Proper names: MathJax, Chart.js, jStat, Vicente Castellar
- HTML tag names and non-content attributes

SPECIFIC CHANGES:
- Change <html lang="es"> to <html lang="en">
- Change og:locale content from "es_ES" to "en_US"
- In JSON-LD: change "inLanguage": "es" to "inLanguage": "en"

STATISTICAL TERMS (use these standard English equivalents):
- distribución normal → normal distribution
- distribución binomial → binomial distribution
- distribución de Poisson → Poisson distribution
- t de Student → Student's t
- chi-cuadrado → chi-square
- F de Snedecor → Snedecor's F
- distribución exponencial → exponential distribution
- distribución geométrica → geometric distribution
- distribución uniforme → uniform distribution
- distribución gamma → gamma distribution
- distribución beta → beta distribution
- distribución log-normal → log-normal distribution
- distribución hipergeométrica → hypergeometric distribution
- distribución de Bernoulli → Bernoulli distribution
- binomial negativa → negative binomial
- tamaño muestral → sample size
- intervalo de confianza → confidence interval
- contraste de hipótesis → hypothesis test
- nivel de significación → significance level
- potencia del contraste → test power
- región de rechazo → rejection region
- valor p / p-valor → p-value
- estadístico de contraste → test statistic
- probabilidad acumulada → cumulative probability
- cola izquierda → left tail
- cola derecha → right tail
- percentil / cuantil → percentile / quantile
- función de densidad → probability density function
- función de probabilidad → probability mass function
- Inicio → Home
- Distribuciones → Distributions
- Tablas → Tables
- Intervalos de confianza → Confidence Intervals
- Tamaño muestral → Sample Size
- Contrastes → Hypothesis Tests
- Aviso legal → Legal Notice
- Privacidad → Privacy
- Cookies → Cookies
- Contacto → Contact
- Calculadora → Calculator
- Configuración → Settings
- Resultado y visualización → Results & visualization
- Resultado pendiente → Result pending
- Calcular → Calculate
- Ver todas las distribuciones → View all distributions
- Tipo de cálculo → Calculation type
- Función de densidad / probabilidad → Density / probability function
- Probabilidad acumulada → Cumulative probability
- Percentil / cuantil → Percentile / quantile
- Tipo de probabilidad acumulada → Cumulative probability type
- valor de x → value of x
- valor de b → value of b
- Calculadoras relacionadas → Related calculators
- Preguntas frecuentes → Frequently asked questions
- Referencia → Reference
- Parámetros → Parameters
- Fórmula → Formula
- Ejemplo resuelto → Worked example
- Explicación breve → Brief explanation
- Calculadora enfocada en esta distribución → Calculator focused on this distribution

Output ONLY the translated HTML with no explanation or markdown fences.

FILE: {rel_path}

HTML:
{html}
"""


def translate_html(html: str, rel_path: Path, client) -> str:
    prompt = TRANSLATION_PROMPT.format(rel_path=rel_path, html=html)
    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=16000,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text.strip()


# ---------------------------------------------------------------------------
# Post-processing
# ---------------------------------------------------------------------------

def fix_asset_paths(html: str, rel_path: Path) -> str:
    """
    Convert relative static-asset references to absolute /paths in English files.
    E.g. "style_new.css" → "/style_new.css", "../script.js" → "/script.js"
    This is needed because /en/ files are one level deeper than the assets.
    """
    soup = BeautifulSoup(html, "lxml")

    def make_absolute(url: str) -> str:
        if not url or url.startswith(("http", "//", "data:", "#", "mailto:", "tel:")):
            return url
        path = Path(url.split("?")[0].split("#")[0])
        if path.suffix.lower() in ASSET_EXTENSIONS:
            # Resolve relative to the file's location then make absolute
            resolved = (Path("/") / rel_path.parent / url).resolve()
            # Strip the leading /en/ that resolve() won't add
            clean = "/" + str(resolved).lstrip("/")
            # Preserve query string
            qs = url[len(url.split("?")[0]):]
            return clean + qs
        return url

    for tag in soup.find_all(True):
        for attr in ("href", "src"):
            val = tag.get(attr)
            if val:
                tag[attr] = make_absolute(val)

    return str(soup)


def add_hreflang(html: str, rel_path: Path, is_english: bool) -> str:
    """Insert/replace hreflang alternate links and update canonical."""
    soup = BeautifulSoup(html, "lxml")
    head = soup.find("head")
    if not head:
        return html

    # Remove existing alternates (we'll re-add them correctly)
    for tag in head.find_all("link", rel="alternate"):
        tag.decompose()

    es_href = es_url(rel_path)
    en_href = en_url(rel_path)

    # Update canonical
    canonical = head.find("link", rel="canonical")
    if canonical:
        canonical["href"] = en_href if is_english else es_href

    def new_alternate(hreflang, href):
        t = soup.new_tag("link", rel="alternate")
        t["hreflang"] = hreflang
        t["href"] = href
        return t

    # Insert after canonical (or at end of head)
    anchor = canonical or head
    after = anchor

    for hreflang, href in [
        ("x-default", es_href),
        ("es", es_href),
        ("en", en_href),
    ]:
        tag = new_alternate(hreflang, href)
        if canonical:
            after.insert_after(tag)
            after = tag
        else:
            head.append(tag)

    return str(soup)


def fix_og_url(html: str, rel_path: Path, is_english: bool) -> str:
    """Update og:url to the correct version URL."""
    soup = BeautifulSoup(html, "lxml")
    target_url = en_url(rel_path) if is_english else es_url(rel_path)
    for prop in ("og:url",):
        tag = soup.find("meta", property=prop)
        if tag:
            tag["content"] = target_url
    for name in ("twitter:url",):
        tag = soup.find("meta", attrs={"name": name})
        if tag:
            tag["content"] = target_url
    return str(soup)


def add_lang_switcher(html: str, rel_path: Path, is_english: bool) -> str:
    """Inject a language toggle link into the nav bar."""
    soup = BeautifulSoup(html, "lxml")
    inner = soup.find(class_="site-nav-inner")
    if not inner:
        return html

    # Avoid duplicates
    if inner.find("a", class_="lang-switcher"):
        return html

    if is_english:
        href = f"/{rel_path.as_posix()}"
        label = "ES"
    else:
        href = f"/en/{rel_path.as_posix()}"
        label = "EN"

    a = soup.new_tag("a", href=href)
    a["class"] = "lang-switcher"
    a.string = label
    inner.append(a)
    return str(soup)


# ---------------------------------------------------------------------------
# CSS for lang switcher
# ---------------------------------------------------------------------------

LANG_SWITCHER_CSS = """
/* Language switcher (/en/ toggle) */
.lang-switcher {
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.18rem 0.55rem;
  border: 1.5px solid currentColor;
  border-radius: 4px;
  margin-left: auto;
  text-decoration: none;
  opacity: 0.65;
  letter-spacing: 0.04em;
}
.lang-switcher:hover { opacity: 1; }
"""


def add_lang_switcher_css():
    css_path = BASE_DIR / "style_new.css"
    content = css_path.read_text(encoding="utf-8")
    if ".lang-switcher" not in content:
        css_path.write_text(content + LANG_SWITCHER_CSS, encoding="utf-8")
        print("  Added .lang-switcher CSS.")


# ---------------------------------------------------------------------------
# Sitemap
# ---------------------------------------------------------------------------

def update_sitemap(files):
    sitemap_path = BASE_DIR / "sitemap.xml"
    content = sitemap_path.read_text(encoding="utf-8")

    # Avoid duplicates
    if "/en/" in content:
        print("  Sitemap already contains /en/ entries, skipping.")
        return

    entries = []
    for _, rel in files:
        url = en_url(rel)
        entries.append(
            f"  <url>\n"
            f"    <loc>{url}</loc>\n"
            f"    <lastmod>{TODAY}</lastmod>\n"
            f"    <changefreq>monthly</changefreq>\n"
            f"    <priority>0.8</priority>\n"
            f"  </url>"
        )

    block = "\n".join(entries)
    content = content.replace("</urlset>", f"\n{block}\n</urlset>")
    sitemap_path.write_text(content, encoding="utf-8")
    print(f"  Sitemap: added {len(files)} /en/ entries.")


# ---------------------------------------------------------------------------
# Per-file processing
# ---------------------------------------------------------------------------

def process_file(abs_path: Path, rel_path: Path, client, dry_run: bool):
    print(f"  → {rel_path}", end=" ", flush=True)
    original = abs_path.read_text(encoding="utf-8")

    if dry_run:
        print("[dry-run]")
        return

    # 1. Translate
    try:
        translated = translate_html(original, rel_path, client)
    except Exception as exc:
        print(f"[ERROR: {exc}]")
        return

    # 2. Post-process English file
    translated = fix_asset_paths(translated, rel_path)
    translated = add_hreflang(translated, rel_path, is_english=True)
    translated = fix_og_url(translated, rel_path, is_english=True)
    translated = add_lang_switcher(translated, rel_path, is_english=True)

    # 3. Write English file
    out = EN_DIR / rel_path
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(translated, encoding="utf-8")

    # 4. Update Spanish original: add hreflang + lang switcher
    updated_es = add_hreflang(original, rel_path, is_english=False)
    updated_es = add_lang_switcher(updated_es, rel_path, is_english=False)
    abs_path.write_text(updated_es, encoding="utf-8")

    print("[ok]")
    time.sleep(0.5)  # gentle rate limiting


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Translate ProbLab to /en/")
    parser.add_argument("--dry-run", action="store_true", help="No file writes")
    parser.add_argument(
        "--file",
        metavar="REL_PATH",
        help="Translate a single file (e.g. normal.html)",
    )
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key and not args.dry_run:
        sys.exit("ERROR: ANTHROPIC_API_KEY is not set.\n"
                 "Export it before running:\n"
                 "  export ANTHROPIC_API_KEY=sk-ant-...")

    client = None
    if not args.dry_run:
        import anthropic as _anthropic
        client = _anthropic.Anthropic(api_key=api_key)

    files = get_all_html_files()
    if args.file:
        target = Path(args.file)
        files = [(BASE_DIR / target, target)]

    print(f"ProbLab → English translation")
    print(f"Files to process: {len(files)}")
    print(f"Output directory: {EN_DIR}")
    print()

    if not args.dry_run:
        EN_DIR.mkdir(exist_ok=True)
        add_lang_switcher_css()

    for abs_path, rel_path in files:
        process_file(abs_path, rel_path, client, args.dry_run)

    if not args.dry_run:
        print()
        print("Updating sitemap...")
        update_sitemap(files)

    print()
    print("Done.")


if __name__ == "__main__":
    main()
