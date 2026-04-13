#!/usr/bin/env python3
"""Fix heading hierarchy and block padding in KA blog articles.

KA articles were previously inserted with:
  - All content headings at font-size: 30px (no H2/H3 distinction)
  - H2 padding-top: 75px (too much)
  - H3 padding-top: 0px (too little)
  - Text-after-heading padding: 30px (should be 15px)

This script fixes content blocks between the hero and promotional sections.
Only targets articles with 5+ heading blocks (generated content).
"""

import json
import re
from pathlib import Path
from typing import Optional, Tuple, List

TILDA_DIR = Path(__file__).resolve().parent.parent / "tilda-export" / "project6825691"
PAGE_MAP = Path(__file__).resolve().parent.parent / "astro" / "src" / "lib" / "page-map.json"

# Only fix articles with multiple content blocks (generated content)
MIN_CONTENT_HEADINGS = 3


def find_ka_blog_articles() -> list:
    """Find KA blog articles with generated content blocks."""
    with open(PAGE_MAP, encoding="utf-8") as f:
        pm = json.load(f)

    targets = []
    for pid, info in pm.items():
        if info.get("lang", "ka") != "ka":
            continue
        slug = info.get("slug", "")
        if "blog/" not in slug or slug == "blog":
            continue

        html_path = TILDA_DIR / f"page{pid}.html"
        if not html_path.exists():
            continue

        html = html_path.read_text(encoding="utf-8")
        # Count content heading blocks (font-size: 30px, NOT 46px promotional ones)
        content_headings = len(re.findall(
            r'data-record-type="255".*?font-size:\s*30px',
            html,
        ))
        if content_headings >= MIN_CONTENT_HEADINGS:
            targets.append((pid, slug, html_path))

    return targets


def classify_heading(pt: int) -> str:
    """Classify heading level based on original padding pattern.

    Original KA insert script used:
      pt=75 → H2 headings
      pt=0 or pt=45 → H3 headings
    """
    if pt >= 45:
        return "h2"
    return "h3"


def fix_content_blocks(html: str) -> str:
    """Fix heading font-sizes and padding in content blocks."""
    # Strategy: find all type-255 blocks with font-size: 30px (content headings)
    # and all type-106 blocks, then fix their padding values.
    # Skip promotional headings (font-size: 46px, pt: 105px).

    # Pass 1: Fix heading blocks (type 255, font-size 30px)
    def fix_heading_block(match: re.Match) -> str:
        block = match.group(0)
        pt_match = re.search(r'padding-top:(\d+)px', block)
        if not pt_match:
            return block

        old_pt = int(pt_match.group(1))

        # Skip promotional headings (pt=105, font-size 46px)
        if old_pt >= 100:
            return block

        level = classify_heading(old_pt)
        new_pt = 45 if level == "h2" else 30
        new_fs = 30 if level == "h2" else 22

        # Add ba-h3 class for H3 headings (CSS uses this for font-size)
        if level == "h3" and "ba-h3" not in block:
            block = block.replace('class="r t-rec', 'class="r t-rec ba-h3', 1)

        # Replace padding-top in style attribute
        block = re.sub(
            r'padding-top:\d+px',
            f'padding-top:{new_pt}px',
            block,
        )
        # Replace t-rec_pt_XX class
        block = re.sub(
            r't-rec_pt_\d+',
            f't-rec_pt_{new_pt}',
            block,
        )
        # Replace font-size
        block = re.sub(
            r'font-size:\s*30px',
            f'font-size: {new_fs}px',
            block,
        )
        return block

    # Match entire heading block divs (type 255 with font-size: 30px)
    html = re.sub(
        r'<div\s+id="rec\d+"[^>]*data-record-type="255"[^>]*>.*?</div>\s*</div>\s*</div>\s*</div>',
        fix_heading_block,
        html,
    )

    # Pass 2: Fix text block padding based on context
    # Find all content blocks in sequence and fix text-after-heading padding
    block_pattern = re.compile(
        r'(<div\s+id="rec(\d+)"[^>]*class="[^"]*t-rec_pt_(\d+)[^"]*"'
        r'[^>]*style="padding-top:(\d+)px[^"]*"'
        r'[^>]*data-record-type="(255|106)"[^>]*>)',
    )

    matches = list(block_pattern.finditer(html))
    prev_type = None
    is_first_text = True

    for i, m in enumerate(matches):
        rec_id = m.group(2)
        old_pt_class = m.group(3)
        old_pt_style = m.group(4)
        block_type = m.group(5)

        # Skip promotional blocks (pt >= 100)
        if int(old_pt_style) >= 100:
            prev_type = None
            continue

        if block_type == "255":
            prev_type = "heading"
            continue

        if block_type == "106":
            if prev_type == "heading":
                new_pt = 15
            elif is_first_text:
                new_pt = 30
            else:
                new_pt = 30  # text-after-text
            is_first_text = False
            prev_type = "text"

            if str(new_pt) != old_pt_style:
                old_tag = m.group(0)
                new_tag = old_tag.replace(
                    f't-rec_pt_{old_pt_class}',
                    f't-rec_pt_{new_pt}',
                )
                new_tag = new_tag.replace(
                    f'padding-top:{old_pt_style}px',
                    f'padding-top:{new_pt}px',
                )
                html = html.replace(old_tag, new_tag, 1)

    return html


def main() -> None:
    targets = find_ka_blog_articles()
    print(f"Found {len(targets)} KA blog articles with content blocks to fix\n")

    updated = 0
    for pid, slug, html_path in sorted(targets, key=lambda x: int(x[0])):
        html = html_path.read_text(encoding="utf-8")
        original = html

        html = fix_content_blocks(html)

        if html != original:
            html_path.write_text(html, encoding="utf-8")
            print(f"  OK  {slug} (page{pid})")
            updated += 1
        else:
            print(f"  --  {slug} (no changes)")

    print(f"\n{'=' * 50}")
    print(f"Results: {updated} updated, {len(targets) - updated} unchanged")


if __name__ == "__main__":
    main()
