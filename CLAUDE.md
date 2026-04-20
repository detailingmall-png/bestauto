# BestAuto.ge — Project Instructions

Auto-loaded когда cwd внутри `bestauto-site/`. Этот файл — **source of truth** для всех правил работы с проектом.

---

## Stack

**Hybrid Tilda + Astro SSG** -> Cloudflare Pages. Tilda даёт визуальный дизайн (экспорт HTML), Astro трансформирует/оптимизирует/инжектит данные и выдаёт статический HTML.

- Location: `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/`
- Astro project: `astro/` (Node 22+, Astro 6.1.1)
- Tilda exports: `tilda-export/project6825691/` (227 HTML)
- CMS: Sanity Studio (`studio/`)
- Languages: KA (default, no prefix), RU (`/ru/`), EN (`/en/`)
- Deploy: `git push main` -> GitHub Actions -> Cloudflare Wrangler -> bestauto.ge

## Build / Dev

```bash
cd astro
npm run dev        # hot reload
npm run build      # static build -> dist/
npm run preview    # preview port 4322
```

---

## КРИТИЧЕСКИЕ правила (не нарушать)

### Deploy

- **Tilda fixes** (CSS, HTML injection, tweaks существующих страниц): push в main напрямую, не спрашивать.
- **Новая архитектура / pilot / компоненты**: ТОЛЬКО feature branch. Никогда не пушить в main без явного approval. Был случай revert'а production push пилотной страницы.
- **Commit messages — ASCII only.** Cloudflare Pages API отклоняет коммиты с кириллицей: `Invalid commit message, it must be a valid UTF-8 string [code: 8000111]`. Писать по-английски.

### После каждого push

1. Подождать ~30с, выполнить `gh run list --limit 1`.
2. Если `in_progress` — подождать и проверить снова.
3. Если `failure` — `gh run view <id> --log-failed`.
4. Только после `completed success` говорить user'у проверять live.

### Verify live, не локально

После любой правки — проверить на **bestauto.ge** (не только локально):

- preview_eval на live URL при mobile viewport (375px)
- Screenshot для визуальных изменений
- Только после успешной live-проверки говорить "готово"

### Cache busting CSS

При любой правке `astro/public/css/bestauto-custom.css` — **в том же коммите** инкрементировать `?v=N` в `astro/src/layouts/TildaPageLayout.astro`:

```html
<link rel="stylesheet" href="/css/bestauto-custom.css?v=11">
```

Cloudflare CDN кэширует статику на 30 дней (`max-age=2592000`). Без bump'а старый CSS продолжит отдаваться с edge cache.

### Changes across pages

Перед любой правкой блока/схемы/виджета — grep по всем страницам. Правка должна быть применена везде где блок существует. Прецедент: Review schema была только на homepage, хотя виджет — на всех service pages. 36 GSC-ошибок.

---

## Tilda native structure (STRICT)

Любой новый/редактируемый блок ДОЛЖЕН следовать native Tilda HTML-структуре и классам. Без исключений.

- **НЕ использовать** inline `style="font-size:..."`, `margin:...`, размеры
- CSS правила через ID-селекторы: `#rec-steps .t-name{font-size:26px}` 
- Использовать Tilda-классы: `t-col_8`, `t-prefix_2`, `t508__bgimg`, `t508__textwrapper`, `t508__descr`, `t508__bottommargin` и т.д.
- `margin-top` на items (не `margin-bottom`) — matches Tilda-pattern и media queries (960px/640px)
- Inline styles только для truly custom (background-color для кружков, border-radius)
- `data-customstyle="yes"` divs внутри title'ов имеют произвольные inline font-size из Tilda editor — overriding globally через `bestauto-custom.css` с `!important`. CSS файл — source of truth для font-sizes

**Почему:** inline styles блокируют mobile text autosizing (font boosting) на реальных Android (Chrome + Firefox). В DevTools emulation НЕ воспроизводится — только на живых устройствах. Баг отжирал целые сессии debug'а.

## Zero Block (t396) mobile width

После любого Tilda-экспорта с t396 — проверять `data-field-width-res-320-value` у всех text элементов.

- Если width < 300px — на 375px phones текст в узкой колонке, 47-85px пустого места
- Если subtitle `data-field-fontsize-res-320-value` < 15px — нарушение UI/UX guide
- Fix: CSS override в `bestauto-custom.css`:
  ```css
  .t396 .tn-elem[data-elem-id="XXXX"] {
    width: 340px !important;
    left: calc(50% - 170px) !important;
  }
  ```

---

## Font architecture (two-layer)

### 1. Tilda-exported блоки (t182/t017/t225/t502/t508/t681/...)

File: `astro/public/css/bestauto-custom.css`

Tilda блоки содержат `data-customstyle="yes"` divs с произвольным `font-size`. Стандартизируем через CSS с `!important`:

```css
.t182__title [data-customstyle] { font-size: 48px !important; }  /* H1 */
.t017__title [data-customstyle] { font-size: 36px !important; }  /* H2 */
.t502__title { font-size: 22px !important; }                      /* H3 */
```

Pattern для новых Tilda-блоков: override в `bestauto-custom.css` с `!important`, все 3 breakpoints (base / 960px / 640px). Bump `?v=N`.

### 2. Custom TS-генераторы (services-grid, reviews-widget, faq-section, ...)

File: `<style>` блок внутри HTML-output каждого генератора (напр., `astro/src/lib/services-grid.ts`)

- Font-sizes через **CSS классы** в `<style>` блоке (НИКОГДА inline `style="font-size:..."`)
- 3 responsive breakpoints: base, `@media (max-width: 960px)`, `@media (max-width: 640px)`
- Values — по таблице в `.claude/rules/ui-ux-guide.md`

---

## PageSpeed (production scores: Desktop 99 / Mobile 93)

Tilda-экспорт отгружает ~16 JS + ~10 CSS. Всё агрессивно оптимизировано build-time'ом. **ЛЮБОЕ изменение тайминга/порядка тестить на Lighthouse — легко сломать.**

### Script deferral (4 tier)

| Tier | Timeout | Trigger | Constant |
|------|---------|---------|----------|
| 1. Core | 3.5s | `requestIdleCallback` | `DEFER_CORE_MS` |
| 2. Non-critical | 5s | `requestIdleCallback` | `DEFER_SCRIPTS_MS` |
| 3. Head analytics | 15s fallback | Interaction gate | `DEFER_HEAD_ANALYTICS_MS` |
| 4. External analytics | 20s fallback + 3s inner | Interaction gate | `DEFER_EXT_ANALYTICS_MS` |

Все в `astro/src/lib/html-extractor.ts`.

### НЕ делать

- Уменьшать fallback'и head/external analytics — старые 2s/9s давали Mobile 61-69, нынешние 15s/20s — 93+
- Переставлять порядок CSS pipeline — removal функции ДОЛЖНЫ идти ДО `inlineAllPageCss()` (иначе 18KB мёртвого CSS)
- Восстанавливать heavy Tilda scripts (zoom/hammer/cover/polyfill/fade-in) — заменены на shims (~200KB savings)
- Менять `font-display: swap` на `optional` (NO_LCP на desktop)
- Удалять `removeTildaFadeInScript()` (NO_LCP на desktop — `.t-records` opacity:0)
- Inline-ить `tilda-forms-1.0.min.css` (43KB, stays as preload)

### Если функциональность сломалась

Сначала проверить shim (`astro/src/lib/popup-shim.ts`, `slider-shim.ts`, `gallery-inject.ts`). Только потом думать о восстановлении оригинала — и тогда **писать lightweight shim**, не восстанавливать оригинал.

Полные детали: `.claude/rules/pagespeed-rules.md`

---

## SEO

### MANDATORY pre-flight

Перед ЛЮБОЙ правкой (новая страница, редактирование, блок, meta) — сверяться с `.claude/rules/seo-guide.md`.

### Новая услуга — обновить 3 файла

1. `astro/src/lib/seo.ts` -> `SERVICES` (name на 3 языках + minPrice для Service schema)
2. `astro/src/data/service-faqs.ts` -> `SERVICE_FAQS` (2-5 FAQ на 3 языках)
3. `astro/src/lib/page-map.json` -> slug на 3 языках (для hreflang)

### Title / meta правила

- Title: 50-60 символов, ключевое слово в начале, локация, бренд в конце: `"[Keyword] в Тбилиси — [USP/цена] | BESTAUTO"`
- Meta description: 120-160 символов, с CTA ("Записаться" / "Book online")
- Все 3 языка должны существовать (грузинский на 10-20% длиннее — следить за 60 символов)

Полные checklists: `.claude/rules/seo-guide.md`

---

## Blog -> Service internal linking

**Editor-picked** rules (Variant A). НЕ auto keyword matcher.

- Editor file: `astro/src/data/blog-links.ts` (`{contextQuote, originalPhrase, anchor, target, role}`)
- Injector: `astro/src/lib/blog-links-inject.ts` (build-time, 4 validation checks)
- HF keywords dict: `astro/src/data/seo-service-keywords.ts`
- Docs: `docs/blog-internal-links.md`
- Wired: `astro/src/pages/[...slug].astro:528`

### Rules

- **Anchor MUST be real search query**, не descriptive sentence fragment. "полировка перед керамикой" — OK. "Полировка усиливает глубину цвета" — reject.
- Anchor diversity per article: 60% long-tail / 30% mid-frequency / 10% generic/branded. Никогда 3× short exact-match (Penguin penalty).
- Валидация anchor'а: `isKnownServiceKeyword(target, anchor, lang)` — unknown triggers warning.
- contextQuote должен быть уникальным в article HTML (ровно 1 вхождение).

### НЕ делать

- Re-enable `injectBlogInternalLinks` (auto keyword matcher) в `[...slug].astro:523`. Закомментирован намеренно. `blog-internal-links.ts` оставляется как dead-code reference.

---

## Discontinued services

НЕ линковать и НЕ воссоздавать:

- `interior-restoration` (removed 2026-04-17, branch `chore/remove-interior-restoration`)
- `paintless-dent-repair` (PDR, removed earlier)

**Live services (10):** polishing, ceramiccoating, ppf-shield-wrapping, vinyl-wrapping, interior-cleaning, carwash, auto-glass-tinting, windshield-repair, car-soundproofing, computer-diagnostics.

Orphan blog articles (фильтруются из grid + sitemap через `DISCONTINUED_BLOG_SLUGS` в `blog-grid.ts`):

- Restoration: `blog/plastic-elements-restoration`, `blog/restoring-car-seats`, `blog/steering-wheel-restoration`, `blog/why-restore-interior-elements`
- PDR: `blog/pdr-method`, `blog/pdr-after-hail`, `blog/pdr-guidelines-and-techniques`

Cloudflare `_redirects` делает 301 со старых URL на `/interior-cleaning`. **НЕ удалять 301-правила.** 23 Tilda HTML страницы всё ещё содержат `/interior-restoration` в меню — 301'ится, cleanup source links — optional future work.

---

## UI / Design work

Перед ЛЮБОЙ UI/дизайн работой — прочитать `.claude/rules/ui-ux-guide.md` и выполнить pre-commit checklist.

Плюс вызвать skills:

1. `/ui-ux-pro-max` — design intelligence (styles, palettes, fonts, UX)
2. `/interface-design-init` — craft consistency

---

## Ключевые directories & files

```
astro/src/lib/
├── html-extractor.ts          # главный pipeline: head/body extract, defer, inline CSS, remove scripts, shims
├── shared-blocks.ts           # header, footer, WhatsApp
├── pages.ts                   # route helpers, page-map.json loader
├── page-map.json              # ACTUAL page metadata (не root page-map.json!)
├── popup-shim.ts              # tilda-popup replacement (~900B)
├── slider-shim.ts             # tilda-slds replacement (~1.3KB)
├── gallery-inject.ts          # tilda-zoom + slds + hammer replacement (~2.5KB)
├── seo.ts                     # hreflang + все JSON-LD schema
├── blog-links-inject.ts       # editor-picked blog->service links
├── services-grid.ts, reviews-widget.ts, faq-section.ts, video-gallery.ts, ...
└── sanity.ts, sanity-inject.ts

astro/src/data/
├── service-faqs.ts            # FAQ для 10 услуг × 3 языка
├── meta-overrides.ts          # OG meta overrides per page
├── reviews.json               # Google Reviews (auto-updated daily via .github/workflows/fetch-reviews.yml)
├── blog-links.ts              # editor-picked blog anchors
├── seo-service-keywords.ts    # HF keywords per service × lang
└── location-data.ts

astro/public/css/
├── bestauto-custom.css        # design tokens + Tilda font-size overrides (SOURCE OF TRUTH)
└── [226 Tilda CSS files]

astro/src/layouts/TildaPageLayout.astro  # единый layout для всех страниц (cache bust ?v=N тут)
astro/src/pages/[...slug].astro          # catch-all route, 210+ pages
```

---

## Command cheatsheet

```bash
# Dev/build
cd astro && npm run dev
cd astro && npm run build

# Deploy check
gh run list --limit 1
gh run view <id> --log-failed

# Search across Tilda exports
grep -l "pattern" tilda-export/project6825691/*.html

# After CSS edit
# 1. Edit astro/public/css/bestauto-custom.css
# 2. Bump ?v=N in astro/src/layouts/TildaPageLayout.astro
# 3. Commit both in same commit

# Find broken widths in t396
grep -E 'data-field-width-res-320-value="(1[0-9]{2}|2[0-9]{2})"' tilda-export/project6825691/pageXXX.html
```

---

## Deep-dive references (в `.claude/rules/`)

- `ui-ux-guide.md` — master design tokens, typography, spacing, colors, pre-commit checklist
- `seo-guide.md` — полный SEO pipeline, checklists, schema map, meta rules
- `pagespeed-rules.md` — полные правила performance, что сломается если что изменить
