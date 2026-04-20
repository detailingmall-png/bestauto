---
name: Font-size architecture on bestauto.ge
description: Two-layer system for font-sizes — bestauto-custom.css for Tilda blocks, inline <style> for TS generators; pattern for adding new blocks
type: project
---

Font-sizes on bestauto.ge live in two places depending on block origin:

## 1. Tilda-exported blocks (t182, t017, t225, t502, t508, t681...)

**Where:** `astro/public/css/bestauto-custom.css`

Tilda blocks contain inline `data-customstyle="yes"` divs with arbitrary `font-size` set manually in Tilda's editor. These vary between pages and break consistency. CSS overrides with `!important` standardize them:

```css
.t182__title [data-customstyle] { font-size: 48px !important; }  /* H1 */
.t017__title [data-customstyle] { font-size: 36px !important; }  /* H2 */
.t502__title { font-size: 22px !important; }                      /* H3 */
```

**Pattern for new Tilda blocks:** Add override rules to `bestauto-custom.css` with `!important`, all 3 breakpoints (base, 960px, 640px). Bump `?v=N` in TildaPageLayout.astro after every change.

## 2. Custom TypeScript generators (services-grid, reviews-widget, faq-section, etc.)

**Where:** `<style>` block inside each generator's output HTML (e.g., `astro/src/lib/services-grid.ts`)

All 8 generators follow the same pattern:
- Font-sizes defined via **CSS classes** in a `<style>` block (NEVER inline `style="font-size:..."`)
- **3 responsive breakpoints**: base (desktop >960px), `@media (max-width: 960px)`, `@media (max-width: 640px)`
- Values follow the component table in `ui-ux-guide.md`

**Pattern for new TS generators:** Copy the `<style>` structure from an existing generator. Define all font-sizes as CSS classes with 3 breakpoints. Never use inline font-size.

## Why this matters

- Inline `font-size` breaks mobile text autosizing (font boosting) on real Android devices
- Tilda's `data-customstyle` values are set per-page in Tilda editor and differ randomly between pages
- Without CSS overrides, the same block type (e.g., t502) renders at 18px on one page and 26px on another

**How to apply:** When creating or editing ANY block on bestauto.ge, check which category it falls into (Tilda-exported or TS-generated) and follow the corresponding pattern above.
