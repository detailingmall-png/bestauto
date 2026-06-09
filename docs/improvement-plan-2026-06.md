# План улучшений bestauto.ge — perf + SEO (июнь 2026)

> Источник: аудит 2026-06-10 (Search Console CWV export 2026-06-06 + аудит кода).
> Этот файл — рабочий план. Статус каждого этапа обновлять по ходу.
> Выполнять строго по порядку. Следующий этап — только после verify предыдущего.

## Базовые факты (зафиксировано аудитом)

- Lighthouse prod: Desktop 99 / Mobile 93. LCP field: чистый. Desktop CWV: 123 good / 0 issues.
- **Проблема №1: mobile INP > 200ms на 57 URL** (скачок 12→57 на 2026-06-05, в день
  восстановления PDR/interior-restoration; код пайплайна в тот день не менялся —
  значит дефект системный, новые страницы лишь добавили URL).
- Картинки уже лёгкие (webp 8-31KB, LCP preload + fetchpriority=high). srcset НЕ делаем — не окупится.
- Sitemap: есть hreflang-аннотации, НЕТ lastmod.
- Article schema: вызывается БЕЗ meta → дат (datePublished/dateModified) в блоге нет вообще
  (`astro/src/pages/[...slug].astro:551`, поля в `ArticleMeta` есть — не используются).
- Перелинковка blog→service есть (editor-picked), service→blog НЕТ.
- og:image на услугах — JPG (рядом лежит тот же кадр в webp).

## Правила выполнения (из CLAUDE.md + memory, НЕ нарушать)

1. Каждый этап — отдельная feature branch. **Push в main только после явного approve юзера.**
2. Commit messages — ASCII only (Cloudflare отклоняет кириллицу).
3. После push в main: `gh run list --limit 1` → ждать `completed success` → live-проверка на bestauto.ge.
4. Если правится `astro/public/css/bestauto-custom.css` — в том же коммите bump `?v=N`
   в `astro/src/layouts/TildaPageLayout.astro`.
5. Fallback-таймеры дефера (15s/20s) НЕ менять — ломает Lighthouse Mobile (было 61-69).
6. Любое изменение тайминга скриптов — Lighthouse до/после (медиана 3 прогонов, mobile).
7. Перед UI-вёрсткой (этап 3) — прочитать `.claude/rules/ui-ux-guide.md`.

---

## Этап 1 — INP-фиксы в interaction gate

**Цель:** убрать длинный таск выполнения analytics из первого взаимодействия пользователя.
Ожидание: 57 INP-URL → green за 2-4 недели (CrUX — окно 28 дней). Lighthouse Mobile ≥ 93.

**Корневая причина:** `interactionGate()` (`astro/src/lib/html-extractor.ts:36-47`) по первому
tap/scroll через `setTimeout(go,0)` синхронно исполняет ВЕСЬ пакет analytics (GTM bootstrap +
Metrika + Pixel через `new Function()`, ~30KB+ JS) одним таском → input delay 60-150ms.

**Изменения (все — без касания fallback-таймеров):**

1. `html-extractor.ts:41` — `goAsync`: добавить idle-yield после setTimeout(0), чтобы браузер
   успел обработать взаимодействие и paint:
   ```js
   // было: function goAsync(){setTimeout(go,0)}
   // станет:
   function goAsync(){setTimeout(function(){
     if(typeof requestIdleCallback!=='undefined'){requestIdleCallback(go,{timeout:1000})}
     else{setTimeout(go,250)}
   },0)}
   ```
2. `delayHeadAnalytics()` (`html-extractor.ts:~588-612`) — fnBody исполняет скрипты одним
   `forEach`. Разбить: каждый скрипт в своём макротаске (рекурсивный `run(i)` +
   `setTimeout(run,0,i+1)` между ними).
3. `delayAnalytics()` (`html-extractor.ts:~689`) — inner delay `3000` → `5000`
   (разводит head- и external-пакеты по времени; fallback 20s не трогаем).
4. `slider-shim.ts:40-42` — `go()` на touchend обернуть в `requestAnimationFrame`.

**Верификация (proof):**
- Baseline ДО изменений: `npm run build` + `npm run preview` (port 4322) +
  `npx lighthouse http://localhost:4322/ --preset=perf --form-factor=mobile --screenEmulation.mobile --quiet` ×3.
- После изменений: тот же замер ×3, медиана не ниже baseline.
- Grep dist: новый код гейта присутствует на страницах.
- После деплоя live: первое взаимодействие → запросы gtm/metrika/pixel уходят (Network),
  попапы и слайдеры работают.
- Мониторинг: Search Console → CWV mobile, ждать спад 57 → <12 (проверить через 2-3 недели).

**Риски:** requestIdleCallback может не сработать до ухода со страницы → mitigated `timeout:1000`.
**Rollback:** revert commit.
**Branch:** `feat/inp-yield-analytics`. Commit: `perf: yield analytics execution off interaction tasks to improve INP`.

**Статус:** [x] DONE 2026-06-10. Commit 3bafb39, merge 54a34a6, deploy run 27233878885 success.
Lighthouse mobile (медиана 3 прогонов, local preview): home 93/93 (до/после), PDR 96/96.
Live: код гейта на всех страницах, TBT 14-31ms. Функционально: analytics стартует после
первого взаимодействия (dataLayer/gtag/ym/fbq + GTM/Metrika/FB скрипты), console errors: 0.
ОСТАЛОСЬ: проверить CrUX mobile INP в Search Console после ~2026-06-24 (ожидание 57 → <12).

---

## Этап 2 — lastmod в sitemap

**Цель:** `<lastmod>` у всех URL sitemap — быстрее переобход обновлённого контента (~855 blog-записей).

**Источник дат:** git-дата последнего коммита исходника страницы
(`tilda-export/project6825691/<file>`; маппинг path→file есть в `astro/src/lib/page-map.json` —
формат `{id: {file, path, lang, slug, ...}}`, 332 записи).

**Изменения:**
1. `.github/workflows/deploy.yml:13` — `actions/checkout@v4` сейчас shallow (depth=1), git-дат
   в CI НЕ будет. Добавить `with: fetch-depth: 0`. БЕЗ ЭТОГО ЭТАП НЕ РАБОТАЕТ.
2. `astro/astro.config.mjs` — у `sitemap()` добавить `serialize(item)`:
   - один проход `git log --format=%cI --name-only` (execSync на старте конфига) →
     Map file→ISO-дата;
   - item.url → path → page-map entry → file → lastmod;
   - нет матча → вернуть item без lastmod (не выдумывать даты).
3. Этап 4 потом переиспользует этот же механизм (явные даты статей приоритетнее git-дат).

**Верификация:** локальный build → `dist/sitemap-0.xml` содержит lastmod, даты различаются
(не все = сегодня); после деплоя `curl -s https://bestauto.ge/sitemap-0.xml | grep -c lastmod`.

**Branch:** `feat/sitemap-lastmod`. Commit: `feat: add lastmod to sitemap from git history`.

**Статус:** [ ] not started

---

## Этап 3 — блок «Статьи по теме» на страницах услуг (service→blog)

**Цель:** обратная перелинковка. На каждой из 12 услуг — 3-4 карточки blog-статей кластера.

**Данные:**
- Инверсия `BLOG_LINKS_RU/KA/EN` из `astro/src/data/blog-links.ts` (`article → target` даёт
  `service → [articles]`).
- Дозаполнить вручную для услуг, где мало правил (кластеры перечислены в CLAUDE.md:
  PDR: pdr-method, pdr-after-hail, pdr-guidelines-and-techniques; restoration: 4 статьи; и т.д.).
- Заголовки статей per lang — из `page-map.json` (title).

**Реализация:**
- Новый `astro/src/lib/related-articles.ts` — build-time генератор HTML-блока:
  - Tilda-native структура (t-col классы, БЕЗ inline font-size — правило font boosting!);
  - стили в `<style>` внутри блока генератора, 3 breakpoints (base/960/640) по ui-ux-guide;
  - заголовок: KA «სტატიები ბლოგიდან», RU «Статьи по теме», EN «Related articles»;
  - build-time валидация: каждый slug существует в page-map для данного lang, иначе warning
    и skip (паттерн как в `blog-links-inject.ts`).
- Вставка в `[...slug].astro` только для service-страниц, перед footer
  (паттерны вставки: `seo-blocks.ts:200 injectAfterHero / :236 injectAfterBenefits`, сделать
  аналогичный injectBeforeFooter).
- Это НОВЫЙ КОМПОНЕНТ → только feature branch, явный approve до merge.

**Верификация:** build; preview: визуально 375px и desktop (2-3 услуги × 3 языка);
все ссылки 200 на preview; Lighthouse не упал (блок статический, JS нет).

**Branch:** `feat/related-articles-block`. Commit: `feat: add related blog articles block to service pages`.

**Статус:** [ ] not started

---

## Этап 4 — datePublished/dateModified для блога

**Цель:** даты в Article JSON-LD (сейчас их НЕТ совсем) + freshness-сигнал.

**Изменения:**
1. Новый `astro/src/data/article-dates.ts`:
   `Record<slug, { published: string; modified?: string }>` (slug без lang — даты общие).
   Сгенерировать one-off скриптом из git: published = дата первого коммита tilda-export
   файла статьи, modified = дата последнего (если > published). Дальше поддерживать руками
   при обновлении статей.
2. `[...slug].astro:551` — `generateArticleSchema(baseSlug, lang, pageTitle)` →
   передать meta из article-dates.
3. Sitemap (этап 2): для blog-URL явная дата из article-dates приоритетнее git-даты.

**Верификация:** dist HTML любой blog-статьи содержит datePublished/dateModified в JSON-LD;
Google Rich Results Test на 1-2 live URL после деплоя.

**Branch:** `feat/article-dates`. Commit: `feat: add datePublished/dateModified to blog article schema`.

**Статус:** [ ] not started

---

## Этап 5 — косметика (мелкие SEO-полировки)

Одна ветка `feat/seo-polish`, отдельные мелкие коммиты:

1. **og:image услуг → webp.** Проверить, поддерживает ли meta-pipeline override og:image
   (в `MetaOverride` интерфейсе поля нет — добавить `ogImage?`). Для каждой услуги взять
   существующий webp-аналог JPG-кадра (пример polishing:
   `tild6134-...__shutterstock_1703968.webp` 25KB vs JPG 43KB).
2. **Service.alternateName** — синонимы из `seo-service-keywords.ts` (top 2-3 на язык)
   в `generateServiceSchema()`.
3. **Article.image** — прокинуть первую контентную картинку статьи в Article schema
   (источник: первый webp из HTML при build; нет картинки — не добавлять).
4. **priceRange** в LocalBusiness (`seo.ts:380`, сейчас `"$$"`) — заменить на реальный
   диапазон вида `"GEL 50-3500"` (по прайсу) или оставить — LOW, решить по месту.

**Верификация:** dist grep по каждому пункту; Facebook Sharing Debugger / Twitter validator
на 1 URL (og:image); Rich Results Test (schema).

**Статус:** [ ] not started

---

## Мониторинг после всех этапов

- Search Console → Core Web Vitals (mobile): 57 → ожидаем <12 к ~2026-06-24/07-01.
- Search Console → Покрытие/Sitemaps: lastmod подхвачен, ошибок нет.
- PageSpeed Insights (field+lab) на 2-3 ключевых URL раз в неделю.
- Позиции/CTR блога и услуг — через 3-4 недели после этапов 3-4.
