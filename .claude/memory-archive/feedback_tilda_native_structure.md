---
name: Use native Tilda block structure for custom blocks
description: Custom HTML blocks must use exact same HTML structure and CSS classes as native Tilda blocks to render correctly on mobile
type: feedback
---

STRICT RULE: Any new or edited block on bestauto.ge MUST follow native Tilda HTML structure and CSS classes. No exceptions. Do NOT use inline styles for font-size, margins, or dimensions. This applies to ALL work — new blocks, edits to existing blocks, bug fixes.

**Why:** Inline styles prevent mobile browser text autosizing (font boosting) that native Tilda blocks get. This causes visible size differences on real Android devices (both Chrome and Firefox) that do NOT reproduce in DevTools emulation. We spent an entire session debugging this.

**How to apply:**
1. When creating custom content blocks, copy the HTML structure from an existing native Tilda block of the same type
2. Use CSS rules with ID selectors (e.g., `#rec-steps .t-name{font-size:26px}`) instead of inline `style="font-size:26px"`
3. Use all Tilda classes: `t-col_8`, `t-prefix_2`, `t508__bgimg`, `t508__textwrapper`, `t508__descr`, `t508__bottommargin`, etc.
4. Use `margin-top` on items (not `margin-bottom`) — matches Tilda's pattern and its media query overrides
5. Tilda's responsive media queries (960px, 640px) automatically handle icon sizes, margins, and font sizes
6. Only use inline styles for truly custom properties (circle background-color, border-radius)
7. Tilda `data-customstyle="yes"` divs inside titles contain arbitrary inline font-sizes from Tilda editor — these are overridden globally in `bestauto-custom.css` with `!important`. Do NOT trust inline customstyle values; the CSS file is the source of truth for font-sizes
