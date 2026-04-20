"""Audit all replaceAll rules in ka/ru/en-seo-changes.ts against rendered HTML.

For each rule, classify:
  applied     — from missing from HTML, to present → old run already applied
  pending     — from present in HTML → rule will apply on next build
  broken      — neither from nor to in HTML → stale rule, needs fix/delete
  deletion_ok — from missing, to is empty '' → deletion already done
  deletion_pending — from present, to is empty → deletion will apply

Output per file:
  Summary table
  List of broken rules (with page + from/to preview) for manual fix
"""
import re, os, sys
from collections import defaultdict

FILES = {
    # KA home: astro/dist/index.html; RU/EN home: astro/dist/{lang}.html
    'ka': ('astro/src/data/ka-seo-changes.ts', ('astro/dist/index.html', 'astro/dist/{slug}.html')),
    'ru': ('astro/src/data/ru-seo-changes.ts', ('astro/dist/ru.html', 'astro/dist/ru/{slug}.html')),
    'en': ('astro/src/data/en-seo-changes.ts', ('astro/dist/en.html', 'astro/dist/en/{slug}.html')),
}

def parse_rules(ts: str):
    """Parse top-level page blocks and extract {from, to} pairs per page."""
    # Split by "  'slug': {" at indent level 2
    page_splits = re.split(r"^\s*'([a-z-]*)':\s*\{", ts, flags=re.MULTILINE)
    # page_splits[0] = preamble; then alternating slug, block, slug, block, ...
    results = []
    for i in range(1, len(page_splits), 2):
        slug = page_splits[i]
        block = page_splits[i+1] if i+1 < len(page_splits) else ''
        # Stop block at next top-level "},\n\n" or EOF — but since block may contain nested, just use regex for pairs
        # Extract {from: '...', to: '...' or `...`} pairs
        # Using non-greedy matcher per pair
        for m in re.finditer(
            r"\{\s*from:\s*'((?:[^'\\]|\\.)*)',\s*to:\s*(?:"
            r"`((?:[^`\\]|\\.)*?)`|'((?:[^'\\]|\\.)*)'"
            r")\s*,?\s*\}",
            block,
        ):
            f_str = m.group(1).replace("\\'", "'").replace('\\\\', '\\')
            t_raw = m.group(2) if m.group(2) is not None else m.group(3)
            t_str = t_raw.replace("\\'", "'").replace('\\`', '`').replace('\\\\', '\\')
            results.append({
                'slug': slug,
                'from': f_str,
                'to': t_str,
                'pos': m.start(),
            })
    return results

def load_html(home_and_template, slug):
    home_path, template = home_and_template
    p = home_path if slug == '' else template.format(slug=slug)
    if not os.path.exists(p):
        return None
    with open(p) as f:
        return f.read()

def classify(rule, html):
    if html is None:
        return 'missing_page'
    f_in = rule['from'] in html
    t_empty = rule['to'] == ''
    t_in = rule['to'] in html if not t_empty else None
    if t_empty:
        return 'deletion_pending' if f_in else 'deletion_ok'
    if f_in:
        return 'pending'
    if t_in:
        return 'applied'
    # Check for template variable in to (reviewsSubtitle etc)
    if '${' in rule['to']:
        # can't check containment for template — flag as applied-maybe
        # Take literal prefix before ${
        prefix = rule['to'].split('${', 1)[0]
        if prefix and prefix in html:
            return 'applied'
    return 'broken'

def audit_file(lang, ts_path, html_template):
    with open(ts_path) as f:
        ts = f.read()
    rules = parse_rules(ts)
    cats = defaultdict(list)
    page_cache = {}
    for r in rules:
        slug = r['slug']
        if slug not in page_cache:
            page_cache[slug] = load_html(html_template, slug)
        html = page_cache[slug]
        cat = classify(r, html)
        r['category'] = cat
        cats[cat].append(r)
    return rules, cats

def main():
    for lang, (ts_path, html_template) in FILES.items():
        rules, cats = audit_file(lang, ts_path, html_template)
        total = len(rules)
        print(f'\n\n========== {lang.upper()} — {total} rules ==========')
        order = ['applied', 'pending', 'broken', 'deletion_ok', 'deletion_pending', 'missing_page']
        for cat in order:
            items = cats.get(cat, [])
            print(f'  {cat}: {len(items)}')
        # List broken and missing_page
        for cat in ['broken', 'missing_page']:
            items = cats.get(cat, [])
            if not items: continue
            print(f'\n  === {cat.upper()} ===')
            for r in items[:50]:
                f_str = r['from'][:70].replace('\n', ' ')
                t_str = r['to'][:70].replace('\n', ' ') if not '${' in r['to'] else '[template]'
                print(f'    /{r["slug"] or "(home)"}')
                print(f'      from: {f_str}')
                print(f'      to:   {t_str}')

if __name__ == '__main__':
    os.chdir('/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site')
    main()
