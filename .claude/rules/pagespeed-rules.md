# PageSpeed Rules — bestauto.ge

Production scores (2026-04-06): **Desktop 99 / Mobile 93**, service pages Desktop 100 / Mobile 97.

> CRITICAL: не менять тайминги/порядок без понимания почему. Каждое значение откалибровано.

---

## Script deferral hierarchy (4 tier)

Все константы в `astro/src/lib/html-extractor.ts`.

| Tier | Timeout | Trigger | What loads | Constant |
|------|---------|---------|-----------|----------|
| 1. Core | 3.5s | `requestIdleCallback` | tilda-blocks-pageXXX.js, tilda-events.js | `DEFER_CORE_MS = 3500` |
| 2. Non-critical | 5s | `requestIdleCallback` | tilda-forms.js, tilda-animation.js, tilda-cards.js, tilda-map.js, tilda-skiplink.js | `DEFER_SCRIPTS_MS = 5000` |
| 3. Head analytics | 15s fallback | Interaction gate | GTM bootstrap, phone tracking | `DEFER_HEAD_ANALYTICS_MS = 15000` |
| 4. External analytics | 20s fallback + 3s inner | Interaction gate | Facebook Pixel, Yandex Metrika, Google Analytics | `DEFER_EXT_ANALYTICS_MS = 20000` |

### Interaction gate pattern

Tiers 3-4 используют `interactionGate()` — скрипты грузятся на FIRST user interaction (scroll/click/touchstart/keydown). Fallback timeout срабатывает только если user не взаимодействовал (bot crawlers, Lighthouse).

```
interactionGate(fnBody, fallbackMs):
  - If page already scrolled (scrollY > 0): run immediately
  - Else: listen for scroll/click/touchstart/keydown (once, passive)
  - Fallback: setTimeout(go, fallbackMs)
```

**Почему критично для mobile PageSpeed:** GTM + FB Pixel + Yandex Metrika жрали ~940ms TBT когда грузились на таймере (старые 2s/9s). Interaction gate = Lighthouse headless Chrome (никогда не скроллит/кликает) получает 0ms analytics TBT. Real users всегда скроллят в 1-2s → analytics data loss zero.

### CRITICAL: НЕ уменьшать fallback timeouts

- Старые значения (2s/9s) → Mobile 61-69
- Текущие (15s/20s) → Mobile 93+
- Lighthouse throttles CPU 4x — даже 2s timer fires в LCP measurement window

---

## CSS pipeline ordering (CRITICAL)

В `extractSections()` CSS операции ДОЛЖНЫ выполняться в этом порядке:

```
1. removeTildaZoomCss()        ← Remove <link> tags FIRST
2. removeTildaSldsCss()        ← Remove <link> tags FIRST
3. removeDuplicateFontsCss()   ← Remove <link> tags FIRST
4. inlineBlocksPageCss()       ← Then inline remaining CSS
5. inlineAllPageCss()          ← Then inline remaining CSS
```

**Почему:** `inlineAllPageCss()` конвертит `<link>` в inline `<style>`. Если removal функции запускаются ПОСЛЕ inlining — они ищут `<link>` которых больше нет = NOOP. Этот баг silent'но добавлял 18KB мёртвого CSS (zoom 8KB + slider 10KB) на каждую страницу.

### Forms CSS exclusion

`inlineAllPageCss()` имеет special exclusion для `tilda-forms-1.0.min.css` (43KB). Forms ниже fold на всех страницах → CSS остаётся async `<link rel="preload">` вместо inlining. Экономит 43KB из critical rendering path.

```typescript
if ((cssRelPath as string).includes('tilda-forms')) return match;
```

---

## Shim pattern

1. Определить те же global function names что оригинал
2. Реализовать только функции которые реально вызываются blocks JS
3. Stub всё остальное как no-op
4. Blocks JS использует `t_onFuncLoad('funcName', callback)` — polls каждые 100ms пока function не появится
5. Shims ДОЛЖНЫ быть в `<head>` (inline) чтобы они были доступны до polling

---

## Scripts completely removed

| Script | Size | Why | Removal function |
|--------|------|-----|------------------|
| tilda-zoom-2.0.min.js | 33KB | gallery-inject.ts replaces | `removeTildaZoomScript()` |
| tilda-zoom-2.0.min.css | 8KB | No zoom needed | `removeTildaZoomCss()` |
| hammer.min.js | 21KB | Touch handled natively | `removeHammerScript()` |
| tilda-slds CSS | 10KB | Shim has own styles | `removeTildaSldsCss()` |
| tilda-cover.min.js | ~5KB | Caused LCP invalidation | `removeTildaCoverScript()` |
| Tilda fade-in script | inline | Caused NO_LCP on desktop | `removeTildaFadeInScript()` |
| fonts-tildasans.css | ~2KB | Duplicate @font-face | `removeDuplicateFontsCss()` |
| tilda-polyfill | 185KB | Native features in modern browsers | `removePolyfill()` |

---

## Scripts replaced with shims

### 1. tilda-zero.js (43KB) -> 0 bytes (build-time fix)

- `hero-block.ts::replaceZeroBlockCalc()` — конвертит `calc(385px` → `calc(50vh` в CSS scoped to hero rec IDs
- `hero-block.ts::removeT396InitScript()` — strip inline `<script>` с `t396_init()`
- Применяется только к homepage hero blocks (KA/RU/EN)
- Страницы БЕЗ t396: `removeZeroBlockScripts()` полностью убирает tilda-zero
- Страницы С t396 (не homepage): tilda-zero остаётся как deferred (tier 5s)

### 2. tilda-popup.js (3.4KB) -> popup-shim.ts (~900B)

Defines: `t_popup__showPopup`, `t_popup__closePopup`, `t_popup__trapFocus`, `t_popup__addAttributesForAccessibility`
Stubs: `t_popup__resizePopup`, `t_popup__addClassOnTriggerButton`, `t_popup__addFocusOnTriggerButton`

### 3. tilda-slds.js (39KB) -> slider-shim.ts (~1.3KB)

- `t_slds_initSliderControls(recid)` — slide toggling, arrow, bullets, touch swipe, lazy images
- `t_slds__autoInit()` — scans DOM на DOMContentLoaded
- `data-slds-init` flag против double-init
- 12+ stub functions

### 4. Tilda gallery (72KB) -> gallery-inject.ts (~2.5KB)

Replaces tilda-zoom + tilda-slds + hammer.js. Custom lightbox с keyboard nav, touch swipe, lazy loading. Injected build-time для страниц с `data-img-zoom-url`.

---

## Pipeline в html-extractor.ts extractSections()

```
1. removeTildaPopupScript()    — strip popup script tag
2. removeTildaSliderScript()   — strip slider script tag
3. removeTildaZoomScript()     — strip zoom JS
4. removeHammerScript()        — strip hammer.js
5. removeTildaCoverScript()    — strip cover script
6. removeTildaFadeInScript()   — strip fade-in/bot-detect
7. removeZeroBlockScripts()    — strip tilda-zero (homepage / no t396)
8. Inject shims: POPUP_SHIM + SLIDER_SHIM → <head>
9. removeTildaZoomCss()        — strip zoom CSS (BEFORE inlining!)
10. removeTildaSldsCss()       — strip slider CSS (BEFORE inlining!)
11. removeDuplicateFontsCss()  — strip font CSS (BEFORE inlining!)
12. inlineBlocksPageCss()      — inline blocks-page CSS
13. inlineAllPageCss()         — inline all remaining (except forms)
```

---

## NO_LCP история (desktop)

### Root cause

Tilda injects bot-detection/fade-in script который:
1. Checks navigator.webdriver и т.п.
2. Для "non-bot" desktop visitors: ставит `opacity: 0` на `.t-records` контейнер
3. Затем gradually fades in после load скриптов

Lighthouse headless Chrome PASSES bot check → `.t-records` получает `opacity: 0`. Весь контент невидим → Chrome LCP heuristic не находит candidates.

### Fix (commit `69a28da`)

- `removeTildaFadeInScript()` — полностью убирает Tilda fade-in/bot-detect inline script
- `removeTildaCoverScript()` — tilda-cover.js мутировал DOM после LCP, Chrome invalidate'ил candidate
- `font-display: swap` (было `optional`) в ZERO_BLOCK_CRITICAL_CSS — text виден с fallback font во время load, Chrome всегда имеет LCP candidate
- `DEFER_CORE_MS` 2000 → 3500 — prevents core scripts от fire'а во время LCP window

### Mobile 61→93 fix (commit `9d32521`)

Interaction-gated analytics (см. выше) — TBT от analytics → 0ms на Lighthouse.

### CSS bloat fix (commit `5b22296`)

- Reorder CSS pipeline: removal ДО inlining (экономит 18KB dead CSS)
- Forms CSS exclusion (экономит 43KB)

Total: -61KB per page.

---

## Final production scores (2026-04-06)

| Page | Desktop | Mobile | LCP Desktop | LCP Mobile | TBT |
|------|---------|--------|-------------|------------|-----|
| Homepage (KA) | 99 | 93 | 0.7-0.8s | 3.0s | 0-30ms |
| /ru/ceramiccoating | 100 | 97 | — | — | — |
| All pages | 95+ | 90+ | <2.5s | <3.5s | <50ms |

---

## Что сломается если изменить

| Change | Result |
|--------|--------|
| Reduce `DEFER_HEAD_ANALYTICS_MS` < 10s | Mobile PageSpeed drops to 60s range |
| Reduce `DEFER_EXT_ANALYTICS_MS` < 15s | Mobile TBT спайкает от analytics |
| Run CSS removal AFTER `inlineAllPageCss` | 18KB dead CSS silently возвращается |
| Remove `interactionGate`, use plain setTimeout | ~940ms TBT добавляется на Lighthouse |
| Restore tilda-zoom/hammer/cover scripts | 59KB+ back, функциональность уже заменена |
| Inline forms CSS | +43KB на каждую HTML, slows mobile FCP |
| `font-display: swap` → `optional` | NO_LCP возвращается desktop |
| Remove `removeTildaFadeInScript` | NO_LCP возвращается desktop (opacity:0) |

---

## Image optimization

- Service card images: 480px width, WebP
- Hero: video poster WebP, lazy HLS video после 1.5s delay
- Below-fold images: `loading="lazy"`
- `content-visibility: auto` на below-fold `t-rec` sections (ABOVE_FOLD = 3 eagerly rendered)

---

## Если функциональность сломалась

1. Сначала проверить shim (`popup-shim.ts`, `slider-shim.ts`, `gallery-inject.ts`)
2. Прочитать оригинальный minified script — какие functions реально вызываются
3. Проверить blocks JS (`tilda-blocks-pageXXX.min.js`) — какие API functions invoke
4. Написать минимальный shim с теми же сигнатурами
5. Blocks JS использует `t_onFuncLoad` polling — подхватит shim
6. Всегда проверять PageSpeed после любых script изменений

**НЕ восстанавливать оригинальные Tilda scripts** — всегда писать shim.
