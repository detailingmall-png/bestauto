# SEO Guide — bestauto.ge

> ОБЯЗАТЕЛЬНО: перед любым изменением на сайте (новая страница, новый блок, редактирование контента) — сверяться с этим гайдом.

---

## 1. Архитектура SEO-пайплайна

Все SEO-данные генерируются при сборке (build-time) в Astro SSG.

### Ключевые файлы

| Файл | Назначение |
|------|-----------|
| `astro/src/lib/seo.ts` | Генерация всех JSON-LD schema + hreflang + canonical |
| `astro/src/lib/html-extractor.ts` | Обработка head: sanitize meta, Twitter Cards, meta overrides |
| `astro/src/data/meta-overrides.ts` | Переопределения title/description по ключу `lang/slug` |
| `astro/src/data/service-faqs.ts` | FAQ данные для 10 услуг на 3 языках (FAQPage schema) |
| `astro/src/lib/faq-section.ts` | FAQ для главной страницы (отдельный генератор) |
| `astro/src/pages/[...slug].astro` | Catch-all route, собирает seoHead из всех генераторов |
| `astro/src/lib/page-map.json` | Карта slug -> lang для hreflang |

### Пайплайн обработки head в extractSections()

```
Raw Tilda HTML head
  -> removeClientSeoScripts()     // убирает JS-based hreflang из Tilda
  -> deferNonCriticalScripts()    // defer скрипты
  -> sanitizeMetaTags()           // strip HTML из <title> и meta description
  -> completeTwitterCards()       // дублирует OG -> Twitter если нет
  -> applyMetaOverrides(lang, slug) // применяет переопределения из meta-overrides.ts
```

### Сборка seoHead в [...slug].astro

```
seoHead = hreflang + canonical
        + BreadcrumbList
        + Service (если услуга)
        + LocalBusiness с AggregateRating (reviews)
        + WebSite
        + Organization
        + FAQPage (service-faqs для услуг)
        + Article (для blog/*)
        + FAQPage (homepage FAQ, только baseSlug === '')
```

---

## 2. Чеклист при добавлении НОВОЙ СТРАНИЦЫ

- [ ] Добавить slug во все 3 языка в page-map.json (hreflang не будет работать без этого)
- [ ] Проверить что `<title>` <= 60 символов, содержит ключевое слово + локацию + бренд
- [ ] Проверить что `<meta description>` 120-160 символов, содержит CTA ("Записаться", "Book online")
- [ ] Проверить что OG-теги (og:title, og:description, og:image) заполнены в Tilda HTML
- [ ] Twitter Cards автодополнятся из OG (completeTwitterCards), но убедиться что OG есть
- [ ] Если title/description неоптимальны — добавить переопределение в `meta-overrides.ts`
- [ ] Если страница услуги — добавить в SERVICES в `seo.ts` (Service schema) и в `service-faqs.ts` (FAQPage)
- [ ] Если блог-пост — Article schema сгенерируется автоматически для любого `blog/*`
- [ ] Проверить build: `npm run build` и посмотреть dist-файл на наличие всех schema

---

## 3. Чеклист при РЕДАКТИРОВАНИИ существующей страницы

- [ ] Не ломать `<title>` — не вставлять HTML-теги (sanitizeMetaTags подстрахует, но лучше не допускать)
- [ ] При изменении заголовка H1 — проверить что title и og:title тоже обновлены
- [ ] Не удалять meta description — Google возьмёт случайный текст со страницы
- [ ] Проверить что hreflang-пара существует на всех 3 языках

---

## 4. Оптимальная структура мета-тегов

### Title (<title>)

| Правило | Пример |
|---------|--------|
| 50-60 символов (max 60, Google обрезает) | "Полировка авто в Тбилиси — цены от 590 лари \| BESTAUTO" |
| Ключевое слово в начале | "Керамическое покрытие авто..." а не "BESTAUTO — керамика..." |
| Локация (Тбилиси / Tbilisi) | Обязательно для local SEO |
| Бренд в конце после разделителя | "... \| BESTAUTO" или "... — BESTAUTO" |
| Цифры привлекают внимание | "от 400 лари", "4.9 рейтинг", "гарантия 5 лет" |

### Meta Description

| Правило | Пример |
|---------|--------|
| 120-160 символов | Не короче 120, не длиннее 160 |
| Содержит CTA | "Записаться на бесплатный осмотр", "Book online!" |
| Уникальное для каждой страницы | Не копировать description между страницами |
| Содержит USP | "гарантия", "премиум материалы", "4.9 рейтинг Google" |

### Open Graph

- `og:title` — может отличаться от title (без " \| BESTAUTO" суффикса)
- `og:description` — может быть длиннее meta description
- `og:image` — 1200x630px, обязательно на каждой странице
- `og:type` — "website" для страниц, "article" для блогов

---

## 5. JSON-LD Schema

| Schema | Генератор | Когда |
|--------|-----------|-------|
| Hreflang + Canonical | `generateHreflangTags()` | Все страницы |
| BreadcrumbList | `generateBreadcrumbSchema()` | Все кроме главной |
| Service | `generateServiceSchema()` | Страницы из SERVICES (10 услуг) |
| LocalBusiness + AggregateRating | `generateReviewSchema()` | Все страницы |
| WebSite + SearchAction | `generateWebSiteSchema()` | Все страницы |
| Organization | `generateOrganizationSchema()` | Все страницы |
| FAQPage (услуги) | `generateServiceFaqSchema()` | Услуги из SERVICE_FAQS |
| FAQPage (главная) | `generateFaqSchema()` | Только главная (baseSlug === '') |
| Article | `generateArticleSchema()` | Все blog/* кроме blog index |

### При добавлении новой услуги — обновить 3 места:

1. **`seo.ts` → SERVICES** — name на 3 языках + minPrice (для Service schema)
2. **`service-faqs.ts` → SERVICE_FAQS** — 2-5 FAQ на 3 языках (для FAQPage schema)
3. **`page-map.json`** — slug на 3 языках (для hreflang)

---

## 6. Правила контента для CTR

### Title: формула высокого CTR

```
[Ключевое слово] в [Локация] — [USP/цена] | BESTAUTO
```

Примеры:
- "Полировка авто в Тбилиси — цены от 590 лари | BESTAUTO"
- "PPF пленка в Тбилиси — защита кузова, гарантия 10 лет | BESTAUTO"

### Power words

- RU: "бесплатный", "цены", "гарантия", "лучший", "рейтинг", "отзывы", "от ... лари"
- EN: "free", "prices", "warranty", "best", "rated", "reviews", "from ... GEL"
- KA: "უფასო", "ფასები", "გარანტია", "საუკეთესო"

### ЗАПРЕЩЕНО в title/description:

- HTML-теги
- Keyword stuffing (повтор ключа > 2 раз)
- ALL CAPS кроме бренда BESTAUTO
- Пустые или дублирующиеся meta description

---

## 7. Мультиязычность SEO

- Каждая страница на всех 3 языках (ka, ru, en)
- Hreflang автоматически из page-map.json
- x-default указывает на ka (грузинский)
- Canonical на текущую языковую версию
- Если страница только на 1 языке — hreflang неполный (нормально, но лучше все 3)
- Грузинский на 10-20% длиннее — проверять 60 символов для KA

---

## 8. Результаты внедрения (2026-04-03, коммит 1057c67)

| Улучшение | CTR прирост |
|-----------|-------------|
| Исправлен HTML в title vinyl-wrapping | Восстановление CTR |
| Title RU главной: 78 -> 57 символов | +5-10% |
| Meta description EN с CTA "Book online" | +3-5% |
| FAQPage schema на 10 услугах × 3 языка | +5-15% (AI Overviews) |
| Article schema на 166 блог-постах | +5-10% (карусель статей) |
| Organization schema (Knowledge Graph) | Долгосрочная видимость |
| Twitter Cards автодополнение | Улучшение шеринга |

---

## 9. Верификация после деплоя

1. `npm run build` — сборка без ошибок
2. Проверить dist HTML: `grep -l 'application/ld+json' dist/[slug]/index.html`
3. После деплоя — проверить в Chrome: title, meta, schemas на живом сайте
4. Google Rich Results Test: https://search.google.com/test/rich-results
5. Schema.org validator для JSON-LD
6. Мониторить CTR в Google Search Console 2-4 недели

---

## 10. Companion: SEO service-keyword dictionary

File: `astro/src/data/seo-service-keywords.ts`
Doc: `docs/semantic-core.md`

Canonical dict HF (high-frequency) search keywords per service × language. 8 services × 3 langs. Top 5-8 keywords на slot, ordered by:

1. **GSC** clicks/impressions (16 месяцев, `Downloads/gsc_service_pages_16months.csv`)
2. **Competitor scan** (performance.ge, adetailing.ge, detailing-ge.com, servisebi.ge, nam.ge, fixup.ge, priala.ge, cleancar.ge, qimwmenda.ge)
3. **SERP intent check** — commercial only, not informational
4. **KA disambiguation** — manual review

### Current usage

- `lib/blog-links-inject.ts` вызывает `isKnownServiceKeyword(target, anchor, lang)` — unknown = warning + skip

### Planned usage

- Meta title/description rewrites
- Schema.org Service.name / alternateName
- Build-time H2/FAQ keyword coverage audit
- Paid ad campaign targeting

### Key disambiguation rules

- **KA `მანქანის ფირი`** — ambiguous PPF/vinyl → routed ТОЛЬКО на `/ppf-shield-wrapping`. Для `/vinyl-wrapping` — `ფირის გადაკვრა` или `ფერადი ფირის გადაკვრა`
- **KA `შუშის აღდგენა`** — too generic, excluded. Competitors qualify с `საქარე` (windshield)
- **EN "windshield repair" и т.п.** — pull US Georgia SERP без geo qualifier. Prefer `+ Tbilisi`
- **`ფირის გადაკვრა`** — intentionally listed для BOTH `/ppf` и `/vinyl` — rule решает target через explicit href в `blog-links.ts`

### Refresh cadence (quarterly)

```bash
cd "$HOME/Documents/Projects CODE/bestauto-content" && python3 scripts/gsc_export_2y.py
# Then update SERVICE_KEYWORDS_* arrays in seo-service-keywords.ts
# Add `// GSC: N clicks` или `// ALT: <competitor>` comments
```
