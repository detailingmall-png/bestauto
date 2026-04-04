#!/usr/bin/env python3
"""
Blog audit KA v3 + EN — Source HTML fixes (2026-04-04)

Phase 1A: Fix broken H1 <br /> in 25 active files
Phase 1B: Fix EN title/og:title in source HTML
Phase 1C: Fix KA title duplicate in source HTML
Phase 1D: Rewrite EN og:description for 48 articles
Phase 1E: Fix KA og:description for 2 articles
"""

import re
import os
import sys

TILDA_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'tilda-export', 'project6825691')

stats = {'h1_fixed': 0, 'title_fixed': 0, 'ogdesc_fixed': 0, 'errors': 0}


def read_file(filename):
    path = os.path.join(TILDA_DIR, filename)
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()


def write_file(filename, content):
    path = os.path.join(TILDA_DIR, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)


def fix_broken_h1(content, filename):
    """Remove <br /> inside <h1 field="title">."""
    original = content
    content = re.sub(
        r'(field="title">)\s*<br\s*/?>',
        r'\1',
        content
    )
    if content != original:
        stats['h1_fixed'] += 1
        print(f'  [H1] {filename}: removed <br />')
    return content


def replace_title(content, old_title, new_title, filename):
    """Replace <title> tag content."""
    original = content
    content = content.replace(f'<title>{old_title}</title>', f'<title>{new_title}</title>')
    if content != original:
        stats['title_fixed'] += 1
        print(f'  [TITLE] {filename}: fixed')
    else:
        print(f'  [TITLE] {filename}: NOT FOUND - "{old_title[:60]}..."')
        stats['errors'] += 1
    return content


def replace_og_title(content, old_val, new_val, filename):
    """Replace og:title content attribute."""
    original = content
    content = content.replace(
        f'property="og:title" content="{old_val}"',
        f'property="og:title" content="{new_val}"'
    )
    if content == original:
        # Try with HTML entities
        content = content.replace(
            f"property=\"og:title\" content=\"{old_val}\"",
            f"property=\"og:title\" content=\"{new_val}\""
        )
    if content != original:
        print(f'  [OG:TITLE] {filename}: fixed')
    else:
        print(f'  [OG:TITLE] {filename}: NOT FOUND')
        stats['errors'] += 1
    return content


def replace_og_description(content, new_desc, filename):
    """Replace og:description and name=description content attributes."""
    original = content
    # Replace og:description
    content = re.sub(
        r'(<meta\s+property="og:description"\s+content=")[^"]*(")',
        lambda m: m.group(1) + new_desc + m.group(2),
        content
    )
    # Replace name="description"
    content = re.sub(
        r'(<meta\s+name="description"\s+content=")[^"]*(")',
        lambda m: m.group(1) + new_desc + m.group(2),
        content
    )
    if content != original:
        stats['ogdesc_fixed'] += 1
        print(f'  [OG:DESC] {filename}: updated')
    else:
        print(f'  [OG:DESC] {filename}: NOT FOUND')
        stats['errors'] += 1
    return content


# ============================================================
# PHASE 1A: Broken H1 <br /> removal (25 files)
# ============================================================

H1_BR_FILES = [
    # KA (10)
    'page37740011.html', 'page37880662.html', 'page37935565.html',
    'page38099239.html', 'page38206488.html', 'page38262094.html',
    'page38371405.html', 'page38474961.html', 'page38584976.html',
    'page45834011.html',
    # RU (10)
    'page37739342.html', 'page37880280.html', 'page37935297.html',
    'page38099075.html', 'page38206312.html', 'page38261911.html',
    'page38371077.html', 'page45762695.html', 'page50854645.html',
    'page61547409.html',
    # EN (5)
    'page37739916.html', 'page38126059.html', 'page38289536.html',
    'page45833009.html', 'page51383339.html',
]

# ============================================================
# PHASE 1D: EN og:description rewrites (48 files)
# ============================================================

EN_OG_DESCRIPTIONS = {
    'page37596602.html': 'When and why paint correction is needed after body repair: what defects it removes, how the process works, and what to expect.',
    'page37666480.html': "How ceramic coating protects your car in Georgia: UV, chemicals, minor scratches. What it does, what it doesn't, and how long it lasts.",
    'page37739916.html': "Professional interior cleaning explained: what's included, how it differs from regular washing, and when to book a session in Tbilisi.",
    'page37906831.html': 'How PPF protects your car from chips and scratches: installation process, zone selection, and real results in Tbilisi conditions.',
    'page37961709.html': 'Why wrap your car in vinyl: protection for the original paint, available textures, and key considerations for Georgia.',
    'page38126059.html': 'When a windshield chip can be repaired vs. when replacement is needed: size criteria, location, and safety considerations.',
    'page38233424.html': "11 practical reasons to tint your car windows: from interior protection to driving comfort in Georgia's hot climate.",
    'page38289536.html': 'Why car soundproofing matters: how noise affects comfort, common noise sources, and what changes after professional treatment.',
    'page38396538.html': 'What a car diagnostic test reveals, when to schedule one, and what issues it catches before they become critical.',
    'page38475291.html': 'Why headlights get cloudy, available polishing methods, and when restoration is cheaper than replacement: examples from Tbilisi.',
    'page38610424.html': "How ceramic glass coating improves visibility, simplifies cleaning, and performs in Georgia's rainy conditions.",
    'page38713458.html': "Why clean your engine bay, how often to do it, and what to avoid so you don't damage electronics.",
    'page38875167.html': 'Key advantages of PPF film: what it protects against, how long it lasts, and when the investment pays off.',
    'page38927014.html': 'How vinyl wrap shields paint from UV rays and minor scratches: compared with other protection methods.',
    'page39088372.html': 'Advantages of chip repair over windshield replacement: cost savings, speed, and preserving factory seal integrity.',
    'page39359014.html': 'Main window tinting techniques: film types, application methods, and what to consider when choosing in Georgia.',
    'page39385525.html': 'Where cabin noise comes from, which zones to treat first, and what results to expect after soundproofing.',
    'page39706610.html': 'Car diagnostic stages explained: from scanner connection to fault code interpretation. What equipment is used.',
    'page39764679.html': 'How interior detailing improves plastic, leather, and decorative trim: and when your car actually needs it.',
    'page39854717.html': "Ceramic coating for car interiors: which surfaces it protects, how long it lasts, and when it's worth applying.",
    'page40004952.html': 'Car interior ozone treatment to eliminate odors and disinfect from bacteria and viruses. How it works and when your car needs it.',
    'page40281359.html': 'How to properly wash and maintain a PPF-wrapped car to preserve its protective properties for the full service life.',
    'page40312672.html': 'Care tips for vinyl-wrapped cars: washing, storage, damage prevention, and when the film needs replacing.',
    'page40521740.html': 'Which windshield chips and cracks can be repaired and which cannot: size, location, and realistic expectations.',
    'page40635194.html': 'How to care for tinted windows: proper cleaning, what to avoid, and how to extend the lifespan of your tint.',
    'page40731374.html': 'How car soundproofing is done step by step: disassembly, material installation, reassembly, and result verification.',
    'page40839462.html': 'What a diagnostic scan detects: engine, transmission, electronics, sensor, and safety system faults explained.',
    'page40938499.html': 'How professional paint correction removes scratches, swirl marks, and oxidation: restoring depth and gloss.',
    'page41490922.html': 'How ceramic coating works at the molecular level: composition, bonding process, and professional application steps.',
    'page41699535.html': 'Main stages of car interior detailing: vacuuming, fabric and leather cleaning, plastic treatment: what the process includes.',
    'page42127917.html': "How long PPF lasts on a car, what factors affect its lifespan, and when it's time to replace: real data from Georgia.",
    'page45833009.html': "How vinyl wrap changes your car's appearance without repainting: available options, cost impact, and reversibility.",
    'page51383339.html': 'Current window tinting rules in Georgia: permitted VLT levels by glass type, fines for violations, and legal requirements.',
    'page129336113.html': 'What car detailing includes: services, costs in Tbilisi, and why your vehicle needs professional care.',
    'page129520323.html': 'Which protection to apply to a new car first: service order, timing, and where not to cut corners.',
    'page129692233.html': '7 criteria for choosing a detailing studio: what to look for, questions to ask, and how to evaluate work quality.',
    'page129692333.html': 'Ranking paint protection methods in Georgia: PPF, ceramic, vinyl, wax: compared by price, durability, and effectiveness.',
    'page129692443.html': 'Summer car care checklist for Georgia: protecting paint, interior, and glass from heat, dust, and mountain roads.',
    'page129692453.html': 'Detailing costs in Tbilisi: polishing, ceramic, PPF, tinting: prices and optimal service combinations for 2026.',
    'page129692473.html': "10 common mistakes that damage car paint: and how to avoid them in Georgia's climate and road conditions.",
    'page129692483.html': 'Car polishing prices in Tbilisi: soft and abrasive polishing costs, and when combining with PPF saves money.',
    'page129692513.html': 'Soft vs. deep polishing: differences, how much clear coat each removes, and which option suits your car.',
    'page129692523.html': 'How often to polish your car: with PPF, with ceramic coating, and without protection: three maintenance scenarios.',
    'page129692543.html': 'Before and after polishing: real examples from BESTAUTO: scratches, swirl marks, oxidation, and the results.',
    'page129692553.html': "Is polishing needed before ceramic coating: when it's essential, when you can skip it, and how it affects the result.",
    'page129692573.html': 'Ceramic coating prices in Tbilisi: brands, price ranges, and what factors affect the final cost.',
    'page129692633.html': 'How long ceramic coating really lasts in Georgia: 2-5 year range, what affects durability, and how to extend it.',
    'page129692653.html': 'How to maintain a ceramic-coated car: washing products, techniques, and maintenance schedule.',
}

# ============================================================
# PHASE 1E: KA og:description fixes (2 files)
# ============================================================

KA_OG_DESCRIPTIONS = {
    'page129683743.html': '\u10d3\u10d4\u10e2\u10d4\u10d8\u10da\u10d8\u10dc\u10d2 \u10e1\u10e2\u10e3\u10d3\u10d8\u10d8\u10e1 \u10d0\u10e0\u10e9\u10d4\u10d5\u10d8\u10e1 7 \u10d9\u10e0\u10d8\u10e2\u10d4\u10e0\u10d8\u10e3\u10db\u10d8: \u10d2\u10d0\u10db\u10dd\u10ea\u10d3\u10d8\u10da\u10d4\u10d1\u10d0, \u10db\u10d0\u10e1\u10d0\u10da\u10d4\u10d1\u10d8, \u10d2\u10d0\u10e0\u10d0\u10dc\u10e2\u10d8\u10d0, \u10de\u10dd\u10e0\u10e2\u10e4\u10dd\u10da\u10d8\u10dd, \u10de\u10e0\u10dd\u10ea\u10d4\u10e1\u10d8\u10e1 \u10d2\u10d0\u10db\u10ed\u10d5\u10d8\u10e0\u10d5\u10d0\u10da\u10dd\u10d1\u10d0 \u10d3\u10d0 \u10e0\u10d4\u10d0\u10da\u10e3\u10e0\u10d8 \u10ee\u10d0\u10e0\u10d8\u10e1\u10ee\u10d8\u10e1 \u10dc\u10d8\u10e8\u10dc\u10d4\u10d1\u10d8.',
    'page39854319.html': '\u10e1\u10d0\u10da\u10dd\u10dc\u10d8\u10e1 \u10d9\u10d4\u10e0\u10d0\u10db\u10d8\u10d9\u10e3\u10da\u10d8 \u10e1\u10d0\u10e4\u10d0\u10e0\u10d8: \u10e0\u10dd\u10db\u10d4\u10da \u10d6\u10d4\u10d3\u10d0\u10de\u10d8\u10e0\u10d4\u10d1\u10e1 \u10d8\u10ea\u10d0\u10d5\u10e1, \u10e0\u10d0\u10db\u10d3\u10d4\u10dc \u10ee\u10d0\u10dc\u10e1 \u10eb\u10da\u10d4\u10d1\u10e1 \u10d3\u10d0 \u10e0\u10dd\u10d3\u10d8\u10e1 \u10e6\u10d8\u10e0\u10e1 \u10d2\u10d0\u10db\u10dd\u10e7\u10d4\u10dc\u10d4\u10d1\u10d0.',
}


def main():
    print('=' * 60)
    print('Blog audit KA v3 + EN: Source HTML fixes')
    print('=' * 60)

    # Track all files to process (filename -> content)
    file_cache = {}

    def get_content(filename):
        if filename not in file_cache:
            file_cache[filename] = read_file(filename)
        return file_cache[filename]

    def set_content(filename, content):
        file_cache[filename] = content

    # ── PHASE 1A: Broken H1 ──
    print('\n--- Phase 1A: Fix broken H1 <br /> ---')
    for filename in H1_BR_FILES:
        content = get_content(filename)
        content = fix_broken_h1(content, filename)
        set_content(filename, content)

    # ── PHASE 1B: EN title/og:title fixes ──
    print('\n--- Phase 1B: EN title/og:title fixes ---')

    # 1B-1: why-use-car-diagnostic-test — Georgian title → English
    f = 'page38396538.html'
    content = get_content(f)
    old_ka_title = '\u10d9\u10dd\u10db\u10de\u10d8\u10e3\u10e2\u10d4\u10e0\u10e3\u10da\u10d8 \u10d3\u10d8\u10d0\u10d2\u10dc\u10dd\u10e1\u10e2\u10d8\u10d9\u10d0: \u10eb\u10d8\u10e0\u10d8\u10d7\u10d0\u10d3\u10d8 \u10d4\u10e2\u10d0\u10de\u10d4\u10d1\u10d8 \u10d3\u10d0 \u10db\u10d4\u10d7\u10dd\u10d3\u10d4\u10d1\u10d8'
    new_en_title = 'Car Diagnostic Test: Importance and Benefits'
    content = replace_title(content, old_ka_title, new_en_title, f)
    content = replace_og_title(content, old_ka_title, new_en_title, f)
    set_content(f, content)

    # 1B-2: car-diagnostic-test-stages-and-methods — fix grammar + leading space
    f = 'page39706610.html'
    content = get_content(f)
    content = replace_title(content, ' How Car Diagnostic Test Work: Key Stages and Methods',
                           'How Car Diagnostic Tests Work: Key Stages and Methods', f)
    content = replace_og_title(content, ' How Car Diagnostic Test Work: Key Stages and Methods',
                              'How Car Diagnostic Tests Work: Key Stages and Methods', f)
    set_content(f, content)

    # 1B-3: car-interior-detailing-basics — Salon → Interior
    f = 'page41699535.html'
    content = get_content(f)
    content = replace_title(content, 'Key Stages of Salon Detailing: From Dust Removal to Fabric Cleaning',
                           'Key Stages of Interior Detailing: From Dust Removal to Fabric Cleaning', f)
    content = replace_og_title(content, 'Key Stages of Salon Detailing: From Dust Removal to Fabric Cleaning',
                              'Key Stages of Interior Detailing: From Dust Removal to Fabric Cleaning', f)
    set_content(f, content)

    # ── PHASE 1C: KA title fix ──
    print('\n--- Phase 1C: KA title fix ---')

    f = 'page41490637.html'
    content = get_content(f)
    old_dup = '\u10e0\u10dd\u10d2\u10dd\u10e0 \u10db\u10e3\u10e8\u10d0\u10dd\u10d1\u10e1 \u10d9\u10d4\u10e0\u10d0\u10db\u10d8\u10d9\u10e3\u10da\u10d8 \u10e1\u10d0\u10e4\u10d0\u10e0\u10d8: \u10e0\u10dd\u10d2\u10dd\u10e0 \u10db\u10e3\u10e8\u10d0\u10dd\u10d1\u10e1 \u10d9\u10d4\u10e0\u10d0\u10db\u10d8\u10d9\u10e3\u10da\u10d8 \u10e1\u10d0\u10e4\u10d0\u10e0\u10d8 \u10d3\u10d0 \u10e0\u10dd\u10d2\u10dd\u10e0 \u10ee\u10d3\u10d4\u10d1\u10d0 \u10dc\u10d0\u10dc\u10d4\u10e1\u10d4\u10d1\u10d0 \u10d0\u10d5\u10e2\u10dd\u10db\u10dd\u10d1\u10d8\u10da\u10d6\u10d4'
    new_title = '\u10e0\u10dd\u10d2\u10dd\u10e0 \u10db\u10e3\u10e8\u10d0\u10dd\u10d1\u10e1 \u10d9\u10d4\u10e0\u10d0\u10db\u10d8\u10d9\u10e3\u10da\u10d8 \u10e1\u10d0\u10e4\u10d0\u10e0\u10d8: \u10e2\u10d4\u10e5\u10dc\u10dd\u10da\u10dd\u10d2\u10d8\u10d0 \u10d3\u10d0 \u10d2\u10d0\u10db\u10dd\u10e7\u10d4\u10dc\u10d4\u10d1\u10d8\u10e1 \u10de\u10e0\u10dd\u10ea\u10d4\u10e1\u10d8'
    content = replace_title(content, old_dup, new_title, f)
    content = replace_og_title(content, old_dup, new_title, f)
    set_content(f, content)

    # ── PHASE 1D: EN og:description rewrites ──
    print('\n--- Phase 1D: EN og:description rewrites ---')
    for filename, new_desc in EN_OG_DESCRIPTIONS.items():
        content = get_content(filename)
        content = replace_og_description(content, new_desc, filename)
        set_content(filename, content)

    # ── PHASE 1E: KA og:description fixes ──
    print('\n--- Phase 1E: KA og:description fixes ---')
    for filename, new_desc in KA_OG_DESCRIPTIONS.items():
        content = get_content(filename)
        content = replace_og_description(content, new_desc, filename)
        set_content(filename, content)

    # ── Write all modified files ──
    print('\n--- Writing files ---')
    written = 0
    for filename, content in file_cache.items():
        original = read_file(filename)
        if content != original:
            write_file(filename, content)
            written += 1

    print(f'\n{"=" * 60}')
    print(f'SUMMARY:')
    print(f'  H1 <br /> fixed: {stats["h1_fixed"]}')
    print(f'  Titles fixed: {stats["title_fixed"]}')
    print(f'  og:descriptions updated: {stats["ogdesc_fixed"]}')
    print(f'  Files written: {written}')
    print(f'  Errors: {stats["errors"]}')
    print(f'{"=" * 60}')

    if stats['errors'] > 0:
        print('\nWARNING: Some replacements were not found. Check output above.')
        sys.exit(1)


if __name__ == '__main__':
    main()
