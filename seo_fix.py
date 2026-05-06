#!/usr/bin/env python3
"""
SEO improvements for problabtools.es:
1. Add FAQPage JSON-LD schema to all pages with "Preguntas frecuentes" sections
2. Fix 2-level breadcrumbs on distribution and table pages → 3-level with category
3. Add og:locale where missing
4. Add BreadcrumbList + WebPage schema to tabla pages (they have none)
"""

import os
import re
import json
import html as html_module

BASE = '/home/user/simprobs'
BASE_URL = 'https://problabtools.es'

# Distribution pages: breadcrumb needs intermediate "Distribuciones" level
DISTRIBUTION_PAGES = {
    'bernoulli.html', 'beta.html', 'binomial.html', 'centralf.html',
    'chisquare.html', 'exponential.html', 'gamma.html', 'geometric.html',
    'hypergeometric.html', 'lognormal.html', 'negbin.html', 'normal.html',
    'poisson.html', 'studentt.html', 'uniform.html', 'weibull.html',
}

# Tabla pages: no schema at all, need full breadcrumb + WebPage schema
TABLA_PAGES = {
    'tabla-beta.html', 'tabla-binomial.html', 'tabla-chi-cuadrado.html',
    'tabla-f-snedecor.html', 'tabla-gamma.html', 'tabla-normal.html',
    'tabla-poisson.html', 'tabla-t-student.html',
}

# Human-readable names for tabla pages (position 3 breadcrumb)
TABLA_NAMES = {
    'tabla-beta.html':          'Tabla Beta',
    'tabla-binomial.html':      'Tabla Binomial',
    'tabla-chi-cuadrado.html':  'Tabla Chi-cuadrado',
    'tabla-f-snedecor.html':    'Tabla F de Snedecor',
    'tabla-gamma.html':         'Tabla Gamma',
    'tabla-normal.html':        'Tabla Normal estándar',
    'tabla-poisson.html':       'Tabla Poisson',
    'tabla-t-student.html':     'Tabla t de Student',
}


def extract_faq_items(content):
    """Parse <li><strong>Question?</strong> Answer.</li> inside FAQ <ul>."""
    faq_section = re.search(
        r'<h2[^>]*>\s*Preguntas frecuentes\s*</h2>\s*<ul[^>]*>(.*?)</ul>',
        content, re.DOTALL | re.IGNORECASE
    )
    if not faq_section:
        return []

    ul = faq_section.group(1)
    items = re.findall(r'<li[^>]*><strong>(.*?)</strong>(.*?)</li>', ul, re.DOTALL)

    result = []
    for raw_q, raw_a in items:
        q = html_module.unescape(re.sub(r'<[^>]+>', '', raw_q)).strip()
        a = html_module.unescape(re.sub(r'<[^>]+>', '', raw_a)).strip()
        # Remove MathJax delimiters \( \) \[ \] but keep the expression text
        for pat in (r'\\\(', r'\\\)', r'\\\[', r'\\\]'):
            q = re.sub(pat, '', q)
            a = re.sub(pat, '', a)
        q = q.strip()
        a = a.strip()
        if q and a:
            result.append({'q': q, 'a': a})
    return result


def faq_schema_tag(faqs):
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": f['q'],
                "acceptedAnswer": {"@type": "Answer", "text": f['a']}
            }
            for f in faqs
        ]
    }
    body = json.dumps(schema, ensure_ascii=False, indent=2)
    return f'    <script type="application/ld+json">\n{body}\n    </script>'


def breadcrumb_3level(cat_name, cat_url, page_name, page_url, indent='            '):
    """Return the three ListItem JSON lines (without surrounding array brackets)."""
    i1 = f'{indent}{{"@type": "ListItem", "position": 1, "name": "Inicio", "item": "{BASE_URL}/"}}'
    i2 = f'{indent}{{"@type": "ListItem", "position": 2, "name": "{cat_name}", "item": "{BASE_URL}/{cat_url}"}}'
    i3 = f'{indent}{{"@type": "ListItem", "position": 3, "name": "{page_name}", "item": "{BASE_URL}/{page_url}"}}'
    return i1, i2, i3


def make_tabla_schema(filename, title, description):
    """Full JSON-LD block for tabla pages (they currently have none)."""
    page_url = f'{BASE_URL}/{filename}'
    cat_url = f'{BASE_URL}/tablas-estadisticas/'
    page_name = TABLA_NAMES[filename]

    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{BASE_URL}/"},
                    {"@type": "ListItem", "position": 2, "name": "Tablas estadísticas", "item": cat_url},
                    {"@type": "ListItem", "position": 3, "name": page_name, "item": page_url},
                ]
            },
            {
                "@type": "WebPage",
                "name": title,
                "url": page_url,
                "description": description,
                "inLanguage": "es",
                "isPartOf": {"@type": "WebSite", "name": "ProbLab", "url": f"{BASE_URL}/"}
            }
        ]
    }
    body = json.dumps(schema, ensure_ascii=False, indent=2)
    return f'    <script type="application/ld+json">\n{body}\n    </script>'


def process(filename, content):
    """Apply all SEO fixes to the file content. Returns (new_content, list_of_changes)."""
    changes = []

    # ── 1. FAQPage schema ──────────────────────────────────────────────────────
    if 'Preguntas frecuentes' in content and '"FAQPage"' not in content:
        faqs = extract_faq_items(content)
        if faqs:
            tag = faq_schema_tag(faqs)
            content = content.replace('</head>', tag + '\n</head>', 1)
            changes.append(f'FAQPage schema ({len(faqs)} Q&As)')

    # ── 2. Fix 2-level breadcrumb on distribution pages ────────────────────────
    if filename in DISTRIBUTION_PAGES:
        # Match the existing two-item breadcrumb (single position-2 pointing at this page)
        pat = re.compile(
            r'(\s*)\{"@type": "ListItem", "position": 1, "name": "Inicio", "item": "' +
            re.escape(BASE_URL) + r'/"\},' +
            r'\s*\{"@type": "ListItem", "position": 2, "name": "([^"]+)", "item": "' +
            re.escape(BASE_URL) + r'/' + re.escape(filename) + r'"\}'
        )
        m = pat.search(content)
        if m:
            indent = '            '  # 12 spaces used in these files
            page_name = m.group(2)
            i1, i2, i3 = breadcrumb_3level(
                'Distribuciones de probabilidad', 'distribuciones/',
                page_name, filename, indent
            )
            replacement = f'\n{i1},\n{i2},\n{i3}'
            content = pat.sub(replacement, content, count=1)
            changes.append('breadcrumb 2→3 levels (distribuciones)')

    # ── 3. Add full schema to tabla pages ─────────────────────────────────────
    if filename in TABLA_PAGES and 'application/ld+json' not in content:
        title_m = re.search(r'<title>(.*?)</title>', content)
        desc_m = re.search(r'<meta name="description" content="([^"]*)"', content)
        title = html_module.unescape(title_m.group(1)) if title_m else filename
        description = html_module.unescape(desc_m.group(1)) if desc_m else ''
        tag = make_tabla_schema(filename, title, description)
        # Insert right before </head>
        content = content.replace('</head>', tag + '\n</head>', 1)
        changes.append('added BreadcrumbList+WebPage schema (tabla page)')

    # ── 4. Add og:locale where missing ────────────────────────────────────────
    if 'og:locale' not in content and '<meta property="og:type"' in content:
        content = content.replace(
            '<meta property="og:type"',
            '<meta property="og:locale" content="es_ES">\n    <meta property="og:type"',
            1
        )
        changes.append('added og:locale')

    return content, changes


def main():
    updated = []
    for filename in sorted(os.listdir(BASE)):
        if not filename.endswith('.html'):
            continue
        filepath = os.path.join(BASE, filename)
        with open(filepath, encoding='utf-8') as f:
            original = f.read()

        new_content, changes = process(filename, original)

        if changes:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated.append((filename, changes))
            print(f'  ✓ {filename}: {", ".join(changes)}')

    print(f'\nDone. {len(updated)} files updated.')


if __name__ == '__main__':
    main()
