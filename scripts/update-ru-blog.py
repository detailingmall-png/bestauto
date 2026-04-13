#!/usr/bin/env python3
"""
Update RU blog articles in Tilda HTML export files with new content from markdown.
Updates: meta tags, H1, hero description, body content blocks, page-map.json titles.
"""

import re
import json
import os
import sys
import html as html_mod
from pathlib import Path
from typing import Optional

# ──────────────────────────────────────────────
# Paths
# ──────────────────────────────────────────────
ARTICLES_DIR = Path("/Users/fedorzubrickij/Downloads/seo blog/Ru/all_articles")
PROJECT_DIR = Path("/Users/fedorzubrickij/bestauto-site")
TILDA_DIR = PROJECT_DIR / "tilda-export" / "project6825691"
PAGE_MAP_PATH = PROJECT_DIR / "astro" / "src" / "lib" / "page-map.json"

# Slug overrides: md slug → page-map slug (for mismatched names)
SLUG_OVERRIDES = {
    "ceramic-coating-tbilisi": "ceramic-coating-cost-tbilisi",
    "ceramic-coating-durability": "how-long-ceramic-coating-lasts",
    "ceramic-coating-care": "ceramic-coating-maintenance",
}

# Promotional block types that signal end of article content
PROMO_BLOCK_TYPES = {"847", "502", "215", "396", "125", "943", "121"}

# Block types that contain article content
CONTENT_BLOCK_TYPES = {"106", "255"}


# ──────────────────────────────────────────────
# Parsing markdown articles
# ──────────────────────────────────────────────

def parse_md_file(filepath: Path) -> dict:
    """Parse a markdown article file and extract metadata + body."""
    content = filepath.read_text(encoding="utf-8")

    # Extract slug from URL
    url_match = re.search(r"bestauto\.ge/ru/blog/([^\s/]+)", content)
    slug = url_match.group(1).strip() if url_match else None

    # Extract meta title (multiple format variants)
    meta_title = _extract_field(content, r"Meta Title[:\s]*\n(.+)")
    if not meta_title:
        meta_title = _extract_field(content, r"Meta Title:\s*(.+)")

    # Extract meta description
    meta_desc = _extract_field(content, r"Meta Description[:\s]*\n(.+)")
    if not meta_desc:
        meta_desc = _extract_field(content, r"Meta Description:\s*(.+)")

    # Extract H1 (multiple format variants)
    h1 = _extract_field(content, r"(?:Заголовок\s*/\s*H1|H1)[:\s]*\n(.+)")
    if not h1:
        h1 = _extract_field(content, r"(?:Заголовок\s*/\s*H1|H1):\s*(.+)")

    # Extract description/intro
    description = _extract_field(
        content,
        r"(?:Description|Описание)[:\s]*\n(.+?)(?=\n\n|\n[А-ЯA-Z#])",
        flags=re.DOTALL,
    )

    # Extract body: everything after the metadata header
    # The body starts after the description paragraph and first blank line
    body = _extract_body(content)

    return {
        "slug": slug,
        "meta_title": meta_title,
        "meta_desc": meta_desc,
        "h1": h1,
        "description": description,
        "body": body,
        "file": filepath.name,
    }


def _extract_field(content: str, pattern: str, flags: int = 0) -> Optional[str]:
    m = re.search(pattern, content, flags)
    return m.group(1).strip() if m else None


def _extract_body(content: str) -> str:
    """Extract the article body text (after all metadata fields)."""
    # Find the end of metadata section
    # Metadata ends after Description/Описание field + its content + blank line
    # Body is marked by the start of actual content (paragraph or heading)

    # Split into lines and find where body starts
    lines = content.split("\n")
    in_meta = True
    body_start = 0
    found_desc = False

    for i, line in enumerate(lines):
        stripped = line.strip()
        # Track when we've seen the description field
        if re.match(r"^(Description|Описание)", stripped):
            found_desc = True
            continue
        # After description field, skip the description text, then look for blank line
        if found_desc and stripped == "":
            # Next non-empty line is the start of body
            for j in range(i + 1, len(lines)):
                if lines[j].strip():
                    body_start = j
                    break
            break

    body = "\n".join(lines[body_start:]).strip()

    # Remove leading # H1 if it duplicates the meta H1
    body = re.sub(r"^#\s+.+\n\n?", "", body)

    return body


# ──────────────────────────────────────────────
# Markdown → Tilda HTML blocks conversion
# ──────────────────────────────────────────────

def md_to_tilda_blocks(body: str, start_id: int = 900000001) -> str:
    """Convert markdown body to sequence of Tilda HTML blocks (types 255 + 106).

    Padding rules (context-aware):
      H2 heading:          pt=45
      H3 heading:          pt=30
      Text after heading:  pt=15
      Intro text (first):  pt=30
      Text after text:     pt=30
    """
    if not body.strip():
        return ""

    blocks = []
    rec_id = start_id
    sections = _split_into_sections(body)
    prev_type = None

    for section in sections:
        if section["type"] == "heading":
            blocks.append(_make_heading_block(rec_id, section["text"], section["level"]))
            rec_id += 1
            prev_type = "heading"
        elif section["type"] == "text":
            html_content = _paragraphs_to_html(section["text"])
            if html_content.strip():
                if prev_type == "heading":
                    pt = 15
                else:
                    pt = 30  # intro text or text-after-text
                blocks.append(_make_text_block(rec_id, html_content, pt))
                rec_id += 1
                prev_type = "text"

    return " ".join(blocks)


def _split_into_sections(body: str) -> list:
    """Split markdown body into heading and text sections."""
    sections = []
    lines = body.split("\n")
    current_text_lines = []

    for line in lines:
        heading_match = re.match(r"^(#{2,3})\s+(.+)", line)
        if heading_match:
            # Flush accumulated text
            if current_text_lines:
                text = "\n".join(current_text_lines).strip()
                if text:
                    sections.append({"type": "text", "text": text})
                current_text_lines = []
            # Add heading
            level = len(heading_match.group(1))
            sections.append({
                "type": "heading",
                "text": heading_match.group(2).strip(),
                "level": level,
            })
        else:
            current_text_lines.append(line)

    # Flush remaining text
    if current_text_lines:
        text = "\n".join(current_text_lines).strip()
        if text:
            sections.append({"type": "text", "text": text})

    return sections


def _paragraphs_to_html(text: str) -> str:
    """Convert text with paragraphs, lists and tables to HTML for a Tilda 106 block.

    Wraps text paragraphs in <p> tags for natural spacing via CSS margins.
    Lists and tables render as block elements without extra wrappers.
    """
    paragraphs = re.split(r"\n\n+", text.strip())
    html_parts = []

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        lines = para.split("\n")

        # Check if this is a markdown table (lines starting with |)
        if _is_table(lines):
            html_parts.append(_table_to_html(lines))
        # Check if this is an unordered list (- or * items)
        elif all(re.match(r"^\s*[-*]\s+", l) for l in lines if l.strip()):
            items = []
            for l in lines:
                l = l.strip()
                if l:
                    item_text = re.sub(r"^[-*]\s+", "", l)
                    items.append(f"<li>{_format_inline(item_text)}</li>")
            html_parts.append("<ul>" + "".join(items) + "</ul>")
        # Check if this is an ordered list (1. 2. 3. items)
        elif _is_ordered_list(lines):
            items = []
            for l in lines:
                l = l.strip()
                if l:
                    item_text = re.sub(r"^\d+\.\s+", "", l)
                    items.append(f"<li>{_format_inline(item_text)}</li>")
            html_parts.append("<ol>" + "".join(items) + "</ol>")
        else:
            # Regular paragraph - wrap in <p> for CSS-controlled spacing
            joined = " ".join(l.strip() for l in lines if l.strip())
            html_parts.append(f"<p>{_format_inline(joined)}</p>")

    return "".join(html_parts)


def _is_ordered_list(lines: list) -> bool:
    """Check if lines form an ordered list (1. item, 2. item, ...)."""
    content_lines = [l for l in lines if l.strip()]
    if len(content_lines) < 2:
        return False
    return all(re.match(r"^\s*\d+\.\s+", l) for l in content_lines)


def _is_table(lines: list) -> bool:
    """Check if lines form a markdown table."""
    content_lines = [l for l in lines if l.strip()]
    if len(content_lines) < 2:
        return False
    # Need header row + separator row minimum
    has_pipes = all("|" in l for l in content_lines)
    has_separator = any(re.match(r"^\|?\s*[-:]+\s*\|", l) for l in content_lines)
    return has_pipes and has_separator


def _table_to_html(lines: list) -> str:
    """Convert markdown table lines to HTML <table>."""
    content_lines = [l.strip() for l in lines if l.strip()]
    rows = []
    for line in content_lines:
        # Skip separator row (|---|---|)
        if re.match(r"^\|?\s*[-:|\s]+$", line):
            continue
        # Split cells by |, strip outer pipes
        cells = [c.strip() for c in line.split("|")]
        # Remove empty first/last from leading/trailing pipes
        if cells and not cells[0]:
            cells = cells[1:]
        if cells and not cells[-1]:
            cells = cells[:-1]
        if cells:
            rows.append(cells)

    if not rows:
        return ""

    html = '<table class="ba-blog-table">'
    # First row is header
    html += "<thead><tr>"
    for cell in rows[0]:
        html += f"<th>{_format_inline(cell)}</th>"
    html += "</tr></thead>"
    # Remaining rows are body
    if len(rows) > 1:
        html += "<tbody>"
        for row in rows[1:]:
            html += "<tr>"
            for cell in row:
                html += f"<td>{_format_inline(cell)}</td>"
            html += "</tr>"
        html += "</tbody>"
    html += "</table>"
    return html


def _format_inline(text: str) -> str:
    """Convert markdown inline formatting to HTML."""
    # Bold **text**
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    # Italic *text* (but not inside already processed bold)
    text = re.sub(r"(?<!\*)\*([^*]+?)\*(?!\*)", r"<em>\1</em>", text)
    # Links [text](url)
    text = re.sub(r"\[(.+?)\]\((.+?)\)", r'<a href="\2">\1</a>', text)
    return text


def _make_heading_block(rec_id: int, text: str, level: int = 2) -> str:
    """Generate a Tilda type 255 heading block."""
    pt = 45 if level == 2 else 30
    font_size = 30 if level == 2 else 22
    extra_cls = " ba-h3" if level == 3 else ""
    esc = html_mod.escape(text)
    return (
        f'<div id="rec{rec_id}" class="r t-rec t-rec_pt_{pt} t-rec_pb_0{extra_cls}" '
        f'style="padding-top:{pt}px;padding-bottom:0px; " data-record-type="255"> '
        f'<!-- T225 --> <div class="t225"> <div class="t-container t-align_left"> '
        f'<div class="t-col t-col_8 t-prefix_2"> '
        f'<div class="t225__title t-title t-title_md" field="title">'
        f'<div style="font-size: {font_size}px;" data-customstyle="yes">'
        f"<strong>{esc}</strong></div></div> "
        f"</div> </div> </div> </div> "
    )


def _make_text_block(rec_id: int, html_content: str, pt: int = 45) -> str:
    """Generate a Tilda type 106 text block."""
    return (
        f'<div id="rec{rec_id}" class="r t-rec t-rec_pt_{pt} t-rec_pb_0" '
        f'style="padding-top:{pt}px;padding-bottom:0px; " data-record-type="106"> '
        f'<!-- T004 --> <div class="t004"> <div class="t-container "> '
        f'<div class="t-col t-col_8 t-prefix_2"> '
        f'<div field="text" class="t-text t-text_md ">{html_content}</div> '
        f"</div> </div> </div> </div> "
    )


# ──────────────────────────────────────────────
# HTML file updating
# ──────────────────────────────────────────────

def update_html_file(html_path: Path, article: dict, page_id: str) -> bool:
    """Update a Tilda HTML file with new article content. Returns True if modified."""
    html = html_path.read_text(encoding="utf-8")
    original = html

    # 1. Update <title>
    if article["meta_title"]:
        html = re.sub(
            r"<title>[^<]*</title>",
            f'<title>{html_mod.escape(article["meta_title"])}</title>',
            html,
            count=1,
        )

    # 2. Update <meta name="description">
    if article["meta_desc"]:
        html = re.sub(
            r'<meta\s+name="description"\s+content="[^"]*"',
            f'<meta name="description" content="{html_mod.escape(article["meta_desc"])}"',
            html,
            count=1,
        )

    # 3. Update <meta property="og:title">
    if article["meta_title"]:
        html = re.sub(
            r'<meta\s+property="og:title"\s+content="[^"]*"',
            f'<meta property="og:title" content="{html_mod.escape(article["meta_title"])}"',
            html,
            count=1,
        )

    # 4. Update <meta property="og:description">
    if article["meta_desc"]:
        html = re.sub(
            r'<meta\s+property="og:description"\s+content="[^"]*"',
            f'<meta property="og:description" content="{html_mod.escape(article["meta_desc"])}"',
            html,
            count=1,
        )

    # 5. Update H1 in hero block (t001__title)
    if article["h1"]:
        html = re.sub(
            r'(class="t001__title[^"]*"[^>]*>)\s*(<[^>]*>)?\s*[^<]*\s*(</[^>]*>)?\s*(</h1>)',
            lambda m: f'{m.group(1)}<strong>{html_mod.escape(article["h1"])}</strong>{m.group(4)}',
            html,
            count=1,
        )

    # 6. Update hero description (t001__descr)
    if article["description"]:
        html = re.sub(
            r'(class="t001__descr[^"]*"[^>]*>)[^<]*(</div>)',
            lambda m: f'{m.group(1)}{html_mod.escape(article["description"])}{m.group(2)}',
            html,
            count=1,
        )

    # 7. Replace article body content blocks
    if article["body"]:
        html = _replace_content_blocks(html, article, page_id)

    if html != original:
        html_path.write_text(html, encoding="utf-8")
        return True
    return False


def _replace_content_blocks(html: str, article: dict, page_id: str) -> str:
    """Find and replace content blocks between hero and promotional sections."""
    # Find all block positions: id="recNNNN" ... data-record-type="NNN"
    block_pattern = re.compile(
        r'<div\s+id="rec(\d+)"[^>]*data-record-type="(\d+)"'
    )

    blocks = []
    for m in block_pattern.finditer(html):
        blocks.append({
            "rec_id": m.group(1),
            "type": m.group(2),
            "start": m.start(),
        })

    if not blocks:
        return html

    # Find hero block (type 18)
    hero_idx = None
    for i, b in enumerate(blocks):
        if b["type"] == "18":
            hero_idx = i
            break

    if hero_idx is None:
        return html

    # Find content blocks: consecutive 106/255 blocks after hero
    content_start_idx = None
    content_end_idx = None

    for i in range(hero_idx + 1, len(blocks)):
        if blocks[i]["type"] in CONTENT_BLOCK_TYPES:
            if content_start_idx is None:
                content_start_idx = i
            content_end_idx = i
        else:
            # First non-content block after hero - stop
            if content_start_idx is not None:
                break
            # If we hit a non-content block before finding any content,
            # there's no existing content to replace.
            # We'll insert new content before this block.
            break

    # Generate new content blocks
    base_id = int(page_id) * 10 + 1
    new_blocks_html = md_to_tilda_blocks(article["body"], start_id=base_id)

    if not new_blocks_html:
        return html

    if content_start_idx is not None and content_end_idx is not None:
        # REPLACE existing content blocks
        # Find the start position of first content block
        start_pos = blocks[content_start_idx]["start"]

        # Find the end position of last content block
        # End is at the start of the next block after content
        if content_end_idx + 1 < len(blocks):
            end_pos = blocks[content_end_idx + 1]["start"]
        else:
            # Last block in document - find end of last content block
            # This shouldn't normally happen
            end_pos = len(html)

        html = html[:start_pos] + new_blocks_html + " " + html[end_pos:]
    else:
        # INSERT new content (no existing content blocks)
        # Insert right after the hero block (before next block)
        insert_idx = hero_idx + 1
        if insert_idx < len(blocks):
            insert_pos = blocks[insert_idx]["start"]
            html = html[:insert_pos] + new_blocks_html + " " + html[insert_pos:]

    return html


# ──────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────

def main():
    # Load page map
    with open(PAGE_MAP_PATH) as f:
        page_map = json.load(f)

    # Build slug → (page_id, html_file) mapping for RU blog pages
    slug_to_page = {}
    for pid, data in page_map.items():
        if data.get("lang") == "ru" and data.get("slug", "").startswith("blog/"):
            slug_name = data["slug"].replace("blog/", "")
            slug_to_page[slug_name] = {
                "id": pid,
                "file": data["file"],
                "title": data["title"],
            }

    # Process all MD files
    md_files = sorted(ARTICLES_DIR.glob("*.md"))
    print(f"Found {len(md_files)} article files")
    print(f"Found {len(slug_to_page)} RU blog pages in page-map.json\n")

    updated = 0
    skipped = 0
    errors = []
    page_map_updates = {}

    for md_path in md_files:
        if md_path.name == "x.txt":
            continue

        article = parse_md_file(md_path)

        if not article["slug"]:
            errors.append(f"  {md_path.name}: could not extract slug")
            continue

        # Apply slug overrides
        mapped_slug = SLUG_OVERRIDES.get(article["slug"], article["slug"])

        if mapped_slug not in slug_to_page:
            errors.append(f"  {md_path.name}: slug '{mapped_slug}' not found in page-map")
            continue

        page_info = slug_to_page[mapped_slug]
        html_file = TILDA_DIR / page_info["file"]

        if not html_file.exists():
            errors.append(f"  {md_path.name}: HTML file {page_info['file']} not found")
            continue

        # Validate required fields
        missing = []
        if not article["meta_title"]:
            missing.append("meta_title")
        if not article["meta_desc"]:
            missing.append("meta_desc")
        if not article["h1"]:
            missing.append("h1")
        if not article["body"]:
            missing.append("body")

        if missing:
            errors.append(f"  {md_path.name}: missing fields: {', '.join(missing)}")
            continue

        # Update HTML file
        try:
            changed = update_html_file(html_file, article, page_info["id"])
            if changed:
                updated += 1
                print(f"  OK  {md_path.name} -> {page_info['file']} ({mapped_slug})")
                # Track page-map title update
                page_map_updates[page_info["id"]] = article["meta_title"]
            else:
                skipped += 1
                print(f"  --  {md_path.name} (no changes)")
        except Exception as e:
            errors.append(f"  {md_path.name}: {e}")

    # Update page-map.json titles
    if page_map_updates:
        for pid, new_title in page_map_updates.items():
            page_map[pid]["title"] = new_title
        with open(PAGE_MAP_PATH, "w", encoding="utf-8") as f:
            json.dump(page_map, f, ensure_ascii=False, indent=2)
        print(f"\nUpdated {len(page_map_updates)} titles in page-map.json")

    print(f"\n{'='*50}")
    print(f"Results: {updated} updated, {skipped} unchanged, {len(errors)} errors")
    if errors:
        print("\nErrors:")
        for e in errors:
            print(e)


if __name__ == "__main__":
    main()
