---
name: PageSpeed optimization rules (April 2026)
description: Script deferral hierarchy, interaction-gated analytics, CSS pipeline ordering, shim patterns. CRITICAL — do not change timings or ordering without understanding why.
type: project
---

Production scores as of 2026-04-06: Desktop 99, Mobile 93, Service pages Desktop 100 / Mobile 97.

**Why:** Tilda-exported HTML ships ~16 JS files and ~10 CSS files. Aggressive build-time optimization is needed for mobile PageSpeed (4x CPU throttle in Lighthouse).

---

## Script deferral hierarchy (4 tiers)

All timings are in `html-extractor.ts` as constants. DO NOT reduce fallback timeouts — they are calibrated to avoid main thread contention on throttled mobile CPU.

| Tier | Timeout | Trigger | What loads | Constant |
|------|---------|---------|-----------|----------|
| 1. Core | 3.5s | `requestIdleCallback` | tilda-blocks-pageXXX.js, tilda-events.js | `DEFER_CORE_MS = 3500` |
| 2. Non-critical | 5s | `requestIdleCallback` | tilda-forms.js, tilda-animation.js, tilda-cards.js, tilda-map.js, tilda-skiplink.js | `DEFER_SCRIPTS_MS = 5000` |
| 3. Head analytics | 15s fallback | **Interaction gate** (scroll/click/touch/keydown) | GTM bootstrap, phone tracking | `DEFER_HEAD_ANALYTICS_MS = 15000` |
| 4. External analytics | 20s fallback | **Interaction gate** + 3s inner delay | Facebook Pixel, Yandex Metrika, Google Analytics | `DEFER_EXT_ANALYTICS_MS = 20000` |

### Interaction gate pattern

Tiers 3-4 use `interactionGate()` helper — scripts load on FIRST user interaction (scroll, click, touchstart, keydown). The fallback timeout (15s/20s) fires only if user never interacts (bot crawlers, Lighthouse).

```
interactionGate(fnBody, fallbackMs):
  - If page already scrolled (scrollY > 0): run immediately
  - Else: listen for scroll/click/touchstart/keydown (once, passive)
  - Fallback: setTimeout(go, fallbackMs)
```

**Why this matters for mobile PageSpeed:** GTM + FB Pixel + Yandex Metrika were consuming ~940ms TBT when loaded on timer (old 2s/9s). Interaction gate means Lighthouse headless Chrome (which never scrolls/clicks) gets 0ms analytics TBT. Real users always scroll within 1-2s, so analytics data loss is zero.

### CRITICAL: Do NOT reduce analytics fallback timeouts

- Old values (2s head / 9s external) caused Mobile PageSpeed 61-69
- Current values (15s/20s) give Mobile 93+
- Lighthouse throttles CPU 4x — even a 2s timer fires during LCP measurement window
- The interaction gate handles real users; the timeout is ONLY for bots

---

## CSS pipeline ordering (CRITICAL)

In `extractSections()`, CSS operations MUST execute in this exact order:

```
1. removeTildaZoomCss()        ← Remove <link> tags FIRST
2. removeTildaSldsCss()        ← Remove <link> tags FIRST
3. removeDuplicateFontsCss()   ← Remove <link> tags FIRST
4. inlineBlocksPageCss()       ← Then inline remaining CSS
5. inlineAllPageCss()          ← Then inline remaining CSS
```

**Why this order is critical:** `inlineAllPageCss()` converts `<link>` tags to inline `<style>` blocks. If removal functions run AFTER inlining, they search for `<link>` tags that no longer exist = NOOP. This bug silently added 18KB of dead CSS (zoom 8KB + slider 10KB) to every page.

### Forms CSS exclusion

`inlineAllPageCss()` has a special exclusion for `tilda-forms-1.0.min.css` (43KB). Forms are below-fold on all pages, so this CSS stays as async `<link rel="preload">` instead of being inlined. This saves 43KB from the critical rendering path.

```typescript
// In inlineAllPageCss():
if ((cssRelPath as string).includes('tilda-forms')) return match;
```

---

## Shim pattern (unchanged)

1. Define same global function names as original Tilda script
2. Implement only functions actually called by blocks JS
3. Stub everything else as no-op
4. Blocks JS uses `t_onFuncLoad('funcName', callback)` — polls every 100ms until function exists
5. Shims MUST be in `<head>` (inline) so they're available before polling starts

---

## Scripts completely removed (not deferred)

These scripts are stripped from HTML at build time — they have NO functional replacement needed:

| Script | Size | Why removed | Removal function |
|--------|------|------------|-----------------|
| tilda-zoom-2.0.min.js | 33KB | gallery-inject.ts replaces all galleries | `removeTildaZoomScript()` |
| tilda-zoom-2.0.min.css | 8KB | No zoom functionality needed | `removeTildaZoomCss()` |
| hammer.min.js | 21KB | Touch handled natively by shims | `removeHammerScript()` |
| tilda-slds CSS | 10KB | Slider shim has own styles | `removeTildaSldsCss()` |
| tilda-cover.min.js | ~5KB | Caused LCP invalidation via DOM mutation | `removeTildaCoverScript()` |
| Tilda fade-in script | inline | Caused NO_LCP on desktop — see project_nolcp_fix.md | `removeTildaFadeInScript()` |
| fonts-tildasans.css | ~2KB | Duplicate — @font-face already in ZERO_BLOCK_CRITICAL_CSS | `removeDuplicateFontsCss()` |

---

## Image optimization

- Service card images: resized to 480px width, WebP format
- Hero: video poster WebP, lazy HLS video after 1.5s delay
- All below-fold images: `loading="lazy"`
- `content-visibility: auto` on below-fold `t-rec` sections (ABOVE_FOLD = 3 eagerly rendered)

---

## What breaks if you change things

| Change | Result |
|--------|--------|
| Reduce DEFER_HEAD_ANALYTICS_MS below 10s | Mobile PageSpeed drops to 60s range |
| Reduce DEFER_EXT_ANALYTICS_MS below 15s | Mobile TBT spikes from analytics |
| Run CSS removal AFTER inlineAllPageCss | 18KB dead CSS silently re-appears |
| Remove interactionGate, use plain setTimeout | ~940ms TBT added to Lighthouse run |
| Restore tilda-zoom/hammer/cover scripts | 59KB+ added back, functionality already replaced |
| Inline forms CSS | +43KB to every page HTML, slows mobile FCP |
| Change font-display from swap to optional | NO_LCP returns on desktop (text invisible during font load) |
| Remove removeTildaFadeInScript | NO_LCP returns on desktop (opacity:0 on .t-records) |
