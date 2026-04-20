---
name: Tilda script replacement system (updated April 2026)
description: How heavy Tilda scripts were replaced with lightweight shims or removed entirely. Total savings ~200KB from critical path.
type: project
---

Heavy Tilda runtime scripts replaced with lightweight alternatives or removed entirely. Total savings ~200KB.

**Why:** Restoring original scripts fixes functionality but kills PageSpeed scores. Inline shims provide identical API surface at ~3KB total. Scripts with no remaining functionality are simply removed.

---

## REPLACED with inline shims

### 1. tilda-zero.js (43KB) -> 0 bytes (build-time fix)
- `hero-block.ts`: `replaceZeroBlockCalc()` converts `calc(385px` to `calc(50vh` in CSS scoped to hero rec IDs
- `hero-block.ts`: `removeT396InitScript()` strips inline `<script>` calling `t396_init()`
- Applied only to homepage hero blocks (KA/RU/EN)
- Pages WITHOUT t396 blocks: `removeZeroBlockScripts()` strips tilda-zero entirely
- Pages WITH t396 (non-homepage): tilda-zero kept as deferred script (5s tier)

### 2. tilda-popup.js (3.4KB) -> popup-shim.ts (~900 bytes)
- Defines: `t_popup__showPopup`, `t_popup__closePopup`, `t_popup__trapFocus`, `t_popup__addAttributesForAccessibility`
- Stubs: `t_popup__resizePopup`, `t_popup__addClassOnTriggerButton`, `t_popup__addFocusOnTriggerButton`
- Injected inline in `<head>` by `html-extractor.ts`

### 3. tilda-slds.js (39KB) -> slider-shim.ts (~1.3KB)
- `t_slds_initSliderControls(recid)`: slide toggling, arrow click, bullet dots, touch swipe, lazy images
- `t_slds__autoInit()`: scans DOM for `.t-slds__items-wrapper` on DOMContentLoaded
- `data-slds-init` flag prevents double-initialization
- 12+ stub functions for blocks JS compatibility
- Injected inline in `<head>` by `html-extractor.ts`

### 4. Tilda gallery (72KB) -> gallery-inject.ts (~2.5KB)
- Replaces tilda-zoom + tilda-slds + hammer.js for image galleries
- Custom lightbox with keyboard nav, touch swipe, lazy loading
- Injected at build time for pages with `data-img-zoom-url`

---

## REMOVED entirely (no replacement needed)

| Script | Size | Why removed | Function in html-extractor.ts |
|--------|------|------------|-------------------------------|
| tilda-zoom-2.0.min.js | 33KB | gallery-inject.ts replaces all galleries | `removeTildaZoomScript()` |
| tilda-zoom-2.0.min.css | 8KB | No zoom functionality needed | `removeTildaZoomCss()` |
| hammer.min.js | 21KB | Touch handled natively by shims/gallery | `removeHammerScript()` |
| tilda-slds CSS | 10KB | Slider shim has own minimal styles | `removeTildaSldsCss()` |
| tilda-cover.min.js | ~5KB | Caused LCP invalidation via DOM mutation | `removeTildaCoverScript()` |
| Tilda fade-in script | inline | Caused NO_LCP on desktop (opacity:0 on .t-records) | `removeTildaFadeInScript()` |
| fonts-tildasans.css | ~2KB | Duplicate — @font-face already in ZERO_BLOCK_CRITICAL_CSS | `removeDuplicateFontsCss()` |
| tilda-polyfill | 185KB | All features are native in modern browsers | `removePolyfill()` |

---

## Pipeline in html-extractor.ts extractSections()

Order matters! See project_pagespeed_optimization_rules.md for why.

```
1. removeTildaPopupScript()    — strip popup script tag
2. removeTildaSliderScript()   — strip slider script tag
3. removeTildaZoomScript()     — strip zoom JS
4. removeHammerScript()        — strip hammer.js
5. removeTildaCoverScript()    — strip cover script
6. removeTildaFadeInScript()   — strip fade-in/bot-detect script
7. removeZeroBlockScripts()    — strip tilda-zero (homepage / pages without t396)
8. Inject shims: POPUP_SHIM + SLIDER_SHIM → <head>
9. removeTildaZoomCss()        — strip zoom CSS (BEFORE inlining!)
10. removeTildaSldsCss()       — strip slider CSS (BEFORE inlining!)
11. removeDuplicateFontsCss()  — strip font CSS (BEFORE inlining!)
12. inlineBlocksPageCss()      — inline blocks-page CSS
13. inlineAllPageCss()         — inline all remaining CSS (except forms)
```

---

## NEVER restore these scripts

Restoring any removed script will:
- Add 5-185KB to every page
- Provide zero new functionality (all replaced)
- Tank mobile PageSpeed by 10-30 points
- Potentially re-introduce NO_LCP bug (fade-in, cover)

If functionality appears broken, check the shim/replacement FIRST before considering restoring originals.
