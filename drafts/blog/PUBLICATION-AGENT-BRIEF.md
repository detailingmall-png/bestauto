# Publication Agent — Session Brief

Этот файл — **single source of truth** для агента, публикующего статьи блога по расписанию. Его задача: открыть новую Claude сессию, скопировать всё из раздела «Copy-paste для нового агента» ниже, и запустить.

---

## Что делает агент

Публикует 100 готовых markdown-драфтов из `/Users/fedorzubrickij/bestauto-site/drafts/blog/` на продакшен сайт bestauto.ge через Tilda CMS с каденцией **2-3 статьи в неделю** в порядке приоритета P1 → P2 → P3.

**Total pipeline**:
- 32 статьи P1 (топ ROI по GSC)
- 49 статей P2 (средний трафик + commercial intent)
- 19 статей P3 (long-tail, seasonal, niche)
- = 100 публикаций ≈ 11 месяцев при 2-3/неделю

---

## Что агент НЕ делает

**Автоматика не покрывает** (требуется human-in-loop):
- Создание новой страницы в Tilda admin UI — ручная работа, Tilda не имеет public API
- Ручное размещение hero/inline фото в Tilda blocks (drag & drop)
- Export HTML из Tilda (кнопка в admin)

**Агент НЕ должен**:
- Изменять текст статей — все 100 драфтов финальные, одобрены
- Изменять цены — только из `§8a.1` в `docs/blog-article-guidelines.md`
- Добавлять не-whitelist бренды (XPEL/Stek/3M/Hexis и т.д.)
- Упоминать районы Глдани/Сабуртало/Лило в любой форме
- Пушить в main без прохождения quality gates
- Публиковать статьи вне порядка priority (P1 → P2 → P3)

---

## Архитектура автоматизации

**Semi-automated pipeline** с 3 ручными шагами:

```
┌────────────────────────────┐
│ 1. Photo prep (agent)      │  ← fal.ai Flux или архив BESTAUTO
│    → drafts/blog-images/   │
└────────────────────────────┘
              ↓
┌────────────────────────────┐
│ 2. Tilda page create       │  ← ЧЕЛОВЕК (user) + agent helper prompt
│    (user's 10 min)         │
└────────────────────────────┘
              ↓
┌────────────────────────────┐
│ 3. Tilda export HTML       │  ← ЧЕЛОВЕК (user кликает Export)
│    (user's 1 min)          │
└────────────────────────────┘
              ↓
┌────────────────────────────┐
│ 4. page-map.json update    │  ← AGENT
│    Astro build              │
│    Git commit + push        │
│    GSC request indexing     │
│    blog-links.ts update     │
│    Roadmap status update    │
│                              │
│    (agent's 5 min)          │
└────────────────────────────┘
```

---

## Scheduling

**Cadence**: 2-3 статьи/неделю.
**Рекомендованное расписание**: Пн / Ср / Пт в 10:00 Тбилиси (`0 10 * * MON,WED,FRI`).

Настройка через `/schedule` skill или `CronCreate`:

```
/schedule create "Publish next blog article from queue" 0 10 * * MON,WED,FRI Asia/Tbilisi
```

Или просто `/loop` с интервалом если хочешь self-paced.

---

## Priority queue

Публикация в строгом порядке по GSC-потенциалу. Первая волна (топ-15 по ROI):

| # | Slug | Cluster | GSC (impressions) | Why first |
|---|---|---|---|---|
| 1 | `chem-cleaning-tbilisi-prices` | INT | KA 1331 + RU 538 | Approved pilot |
| 2 | `what-is-ppf-explainer` | PPF | 2300+ combined | Flagship educational |
| 3 | `polish-cream-diy-vs-studio` | POL | KA 1424/0 | Zero-click gap |
| 4 | `chip-repair-process-step-by-step` | WIN | RU 1106/0 | Huge zero-click |
| 5 | `ppf-full-body-wrapping-guide` | PPF | RU 705 + EN 1104 | Top commercial |
| 6 | `detailing-center-tbilisi` | GEN | RU 749/0 | Umbrella authority |
| 7 | `tint-percentage-explained` | TIN | RU 805/0 | Zero-click gap |
| 8 | `ceramic-polishing-combo` | CER | KA 1077/39 | Top CER signal |
| 9 | `detailing-wash-explained` | WSH | RU 553/5 | New cluster |
| 10 | `salon-detailing-explained` | INT | RU 631/0 | Zero-click gap |
| 11 | `tint-60-percent-legal-georgia` | TIN | KA 325 + RU 147 | Legal authority |
| 12 | `ppf-vs-ceramic-vs-vinyl` | PPF | Competitor synth | Comparison authority |
| 13 | `car-body-wrap-cost-guide` | VIN | RU 470/0 | Pricing intent |
| 14 | `interior-disinfection-ozone` | INT | RU 250/0 | Commercial |
| 15 | `2-phase-vs-3-phase-wash` | WSH | Service-specific | New cluster depth |

**После топ-15** — оставшиеся P1 (17 статей), потом P2 (49), потом P3 (19). Порядок внутри priority tier — по убыванию GSC impressions. Полный список с импрешнами — в `docs/content-roadmap.md`.

**State tracking**: статус каждой статьи в frontmatter файла (`status: drafted | published`). После публикации — обновлять на `published: YYYY-MM-DD`.

---

## Полный workflow per article (detailed)

### Step 1: Select next article from queue

```python
# Agent parses all .md files in drafts/blog/, filters status == 'drafted',
# sorts by priority (P1 > P2 > P3) then by GSC impressions descending.
# Picks first one.
```

Если есть хардкод порядок (top-15 выше) — использовать его first, потом переключиться на dynamic sort.

### Step 2: Prepare photos

Читаем file → извлекаем cluster → выбираем шот-guidance из `drafts/blog/README.md` (раздел «Фото для статьи»).

**Варианты** (decision tree):

**2a. AI-генерация (Flux через fal.ai skill)** — default для быстрых публикаций:
- Используй skill `fal-ai-media`
- Модель: `flux/dev` (быстро) или `flux-pro/v1.1-ultra` (качество)
- Промпт: адаптируй `drafts/blog/README.md` cluster-specific template
- Генерируй hero (1920×1080) + 2 inline (1200×800)
- Сохраняй в `drafts/blog-images/{slug}/{shot}.webp`

**2b. BESTAUTO архив** — если user даст доступ к папке студии.
- Просмотр папки архива, выбор подходящего кадра, copy to `drafts/blog-images/{slug}/`

### Step 3: Prepare content for Tilda paste

Открыть `drafts/blog/{slug}.md`, извлечь нужную языковую секцию (RU первой, KA и EN в следующих раундах), подготовить:

```
HERO TITLE: [hero_title]
HERO SUBTITLE: [hero_subtitle]

META TITLE: [meta_title]
META DESCRIPTION: [meta_description]

BODY:
[H1]

[intro paragraph]

## [H2 #1]
...

## FAQ
...

## Заключение
...

## CTA
...
```

Сформировать как text file или прямо в stdout агента → user копирует в Tilda.

### Step 4 — HUMAN: Create Tilda page

User (или junior + agent assist):
1. Tilda admin → Pages → **Create page**
2. Template: использовать existing blog article template (page ID = XXXXXXX; посмотри существующие статьи как образец)
3. Paste: hero title + subtitle в block 1
4. Upload hero image в block 2
5. Paste body в TextPlus / Zero block
6. Upload inline images между H2
7. Settings → SEO → paste Meta title + description
8. Save → **получить numeric page ID** из URL admin страницы
9. Сообщить ID агенту: «page ID: 658XXXXX»

### Step 5 — HUMAN: Export HTML

User:
1. В Tilda admin: Settings → Export → Static HTML
2. Download zip → unzip → найти `page{ID}.html`
3. Move to `/Users/fedorzubrickij/bestauto-site/tilda-export/project6825691/page{ID}.html`
4. Сообщить агенту: «exported»

### Step 6 — AGENT: page-map.json update

```python
import json
page_map = json.load(open('page-map.json'))
new_entry = {
    "pageId": "658XXXXX",
    "url": f"https://bestauto.ge/{lang_prefix}blog/{slug}",
    "path": f"/{lang_prefix}blog/{slug}",
    "title": "...",
    "lang": lang,
    "slug": f"blog/{slug}"
}
page_map.append(new_entry)
json.dump(page_map, open('page-map.json','w'), ensure_ascii=False, indent=2)
```

(lang_prefix: `ru/` для RU, `` для KA, `en/` для EN)

### Step 7 — AGENT: Astro build + verify

```bash
cd /Users/fedorzubrickij/bestauto-site/astro && bun run build
# Verify dist/{lang}/blog/{slug}/index.html exists
```

Если build fails → stop, report error, **не пушить**.

### Step 8 — AGENT: blog-links update

Добавить 2-3 editorial anchors blog→service в `astro/src/data/blog-links.ts`. Использовать `/blog-links` slash command (если доступна) или вручную:

```typescript
{
  slug: '{slug}',
  anchors: [
    { term: 'полировка машины', target: '/polishing', contextQuote: 'первый релевантный абзац' },
    ...
  ]
}
```

Запустить ещё раз `bun run build`, проверить лог `[blog-links] applied=N, 0 warnings`.

### Step 9 — AGENT: Status update

**В `drafts/blog/{slug}.md`**:
```yaml
---
status: published
published_at: 2026-04-20
published_pageids:
  ru: "658XXXXX"
  ka: ""
  en: ""
---
```

**В `docs/content-roadmap.md`**: добавить колонку Status или отметить чекбоксом.

### Step 10 — AGENT: Git commit + push

```bash
git add page-map.json tilda-export/project6825691/page*.html astro/src/data/blog-links.ts drafts/blog/{slug}.md docs/content-roadmap.md
git commit -m "publish: {slug} ({lang})"
git push origin main
```

Memory rule: **ok to push main for published blog articles** (не pilot/prototype work).

### Step 11 — AGENT: Wait for Cloudflare deploy

```bash
gh run list --limit 3
# Wait for the latest build status = completed / success
```

### Step 12 — AGENT: Verify live

```bash
curl -s "https://bestauto.ge/ru/blog/{slug}" | grep -i "{hero_title_fragment}"
# Если находит — статья живая
```

### Step 13 — AGENT: GSC request indexing

Через Google Search Console (если API-доступ есть) или в UI:
- Tell user: «Зайди в GSC → Request indexing → paste URL»
- Или если есть ключ `GSC_API_KEY` → скрипт автоматически

### Step 14 — AGENT: Report to user

```
✅ Published: {slug} ({lang})
URL: https://bestauto.ge/{lang_prefix}blog/{slug}
Page ID: 658XXXXX
Commit: abc1234
GSC: requested indexing (or: «нужен ручной click в GSC»)
Next scheduled: [next slug + when]
```

---

## Multi-language strategy

**Вариант A (рекомендован)**: публиковать сразу 3 языка (RU/KA/EN) одной статьи подряд (3 отдельные страницы Tilda), потом следующая статья.
- Плюсы: hreflang полные, SEO-связка сразу
- Минусы: 3× работы на слот

**Вариант B**: публиковать сначала RU для всех, потом KA, потом EN.
- Плюсы: можно прогнать весь RU-набор быстрее
- Минусы: пока нет KA/EN — hreflang неполные, meta:alternate не рендерится

Default: **Вариант A** — 1 слот расписания = 1 статья × 3 языка.

---

## Quality gates

### Pre-publish (agent before Step 4)
- [ ] `status: drafted` в frontmatter (не уже published)
- [ ] Hero фото есть (проверить file на диске)
- [ ] Inline фото есть (минимум 1 для P1/P2)
- [ ] RU секция длиной в range (1300-2200 слов через `wc -w`)
- [ ] Цены только из §8a.1 (Python check)
- [ ] Бренды только whitelist (Python check)
- [ ] Нет Глдани/Сабуртало/Лило (Python check)

### Post-publish (agent after Step 11)
- [ ] `bun run build` в astro/ прошёл без ошибок
- [ ] `blog-links` warnings = 0
- [ ] URL живой (curl HEAD 200)
- [ ] Hero рендерится
- [ ] hreflang теги есть
- [ ] Meta title/description в HTML source

### Rollback (если post-publish fails)
```bash
git revert HEAD
git push origin main
# + убрать строку из page-map.json
# + переместить HTML export в .trash/
# + Tilda admin → Unpublish page
```

---

## Failure handling

| Failure | Action |
|---|---|
| Tilda page create не удалось (user не может) | Skip, next slot |
| Photo gen failure (fal.ai down) | Fallback: AI-gen через DALL-E / SDXL локально. Если всё фейлит — skip фото, публикация без hero (acceptable for P2/P3, NOT для P1) |
| Astro build fail | Stop. Report error. Не пушить. User debug ответственен. |
| Git push rejected (conflict) | Pull rebase, retry. Если persistent — escalate. |
| Cloudflare deploy fail | Monitor `gh run list`. Если fail — rollback. |
| GSC indexing fail | Log warning, попросить user кликнуть вручную. Not a blocker. |

**Escalation**: stop and message user если:
- 3+ consecutive failures
- Any violation of quality gate (prices, brands, districts)
- Git push to main rejected
- Critical file corruption (drafts/blog/, page-map.json)

---

## Context files (агент должен прочитать в начале)

**Обязательно**:
1. `/Users/fedorzubrickij/bestauto-site/drafts/blog/README.md` — workflow + navigation + photo guidance
2. `/Users/fedorzubrickij/bestauto-site/drafts/blog/PUBLICATION-AGENT-BRIEF.md` — этот файл
3. `/Users/fedorzubrickij/bestauto-site/docs/blog-article-guidelines.md` — §8a.1 цены snapshot, §8a.3 brand whitelist

**По запросу**:
4. `/Users/fedorzubrickij/bestauto-site/docs/content-roadmap.md` — полный slug-список с GSC
5. `/Users/fedorzubrickij/bestauto-site/astro/src/data/seo-service-keywords.ts` — HF dict
6. `/Users/fedorzubrickij/bestauto-site/astro/src/data/blog-links.ts` — existing anchors

---

## Required tools/skills/MCP

Все через Claude Code skill system:

| Задача | Инструмент |
|---|---|
| Photo generation | `fal-ai-media` skill (Flux/SDXL) |
| Schedule setup | `schedule` skill (CronCreate) или `loop` |
| Browser automation (Tilda admin) | `agent-browser` или `Claude_in_Chrome` MCP (если user настроил) |
| Git operations | Bash (native) |
| Build/deploy monitor | Bash → `bun run build`, `gh run list` |
| GSC indexing | WebFetch или gh CLI (если есть Google API access) |
| Status tracking | Edit + Read на markdown frontmatter |

Если какого-то инструмента нет — агент **спрашивает user** перед использованием fallback.

---

## Copy-paste для нового агента

**Первое сообщение в новой Claude Code сессии** (скопировать целиком):

```
Я веду публикацию блога bestauto.ge. Все 100 статей написаны и лежат в /Users/fedorzubrickij/bestauto-site/drafts/blog/ (markdown-драфты на 3 языках каждый).

Твоя задача — публиковать их на продакшен Tilda по 2-3/неделю, начиная с P1 топ-ROI. Полный brief — в файле:
/Users/fedorzubrickij/bestauto-site/drafts/blog/PUBLICATION-AGENT-BRIEF.md

Прочитай его, потом прочитай:
- /Users/fedorzubrickij/bestauto-site/drafts/blog/README.md (workflow + photo guidance)
- /Users/fedorzubrickij/bestauto-site/docs/blog-article-guidelines.md §8a (бизнес-правила)

После прочтения сделай три вещи:
1. Настрой расписание публикации (Пн/Ср/Пт 10:00 Tbilisi) через /schedule или /loop skill
2. Сделай dry-run первой статьи из очереди (топ-15, начни с #2 what-is-ppf-explainer — chem-cleaning-tbilisi-prices уже опубликован пилотом): подготовь текст для копирования в Tilda + сгенерируй hero-фото через fal.ai, покажи мне результат, я одобрю или дам корректировки
3. После моего одобрения — первая реальная публикация, полный цикл включая page-map, build, push, GSC

Ответь коротко: «готов, прочитал брифы» — и начинай.
```

---

## Что проверять user раз в неделю

- Опубликованные статьи в GSC: показы/клики растут?
- Статус queue: сколько статей осталось, на каком этапе
- Ошибки build / deploy?
- Blog-links правильно расставлены (editorial injections работают)?

Агент должен присылать weekly digest в виде:
```
Weekly digest (week of YYYY-MM-DD):
- Published: 3 articles (URLs)
- GSC requested: 3
- Errors: 0
- Next week queue: [3 slugs]
- Issues: [any blockers]
```

---

## Бюджет времени на статью

| Этап | Agent time | User time |
|---|---|---|
| Photo gen + prep | 5 мин | 0 |
| Tilda page create | 0 | 10 мин |
| Tilda export | 0 | 1 мин |
| page-map + build + push + GSC | 5 мин | 0 |
| **Total per language** | **~10 мин** | **~11 мин** |
| **Total per article × 3 lang** | **~30 мин** | **~33 мин** |

Реально оба в параллели (agent генерит фото пока user создаёт page) — wallclock ~20-25 мин.

---

## Приблизительная timeline

- P1 публикация: 32 статьи × 3 язык × 2-3/неделю = ~**12-15 недель** (3-4 месяца)
- P2 публикация: 49 статей × 3 язык × 2-3/неделю = ~**18-22 недели** (5-6 месяцев)
- P3 публикация: 19 статей × 3 язык × 2-3/неделю = ~**7-9 недель** (2 месяца)
- **Всего ~11 месяцев** до полной публикации всех 100 тем.

Можно ускорить до 4-6/неделю когда агент и user сработаются — тогда 5-6 месяцев total.

---

## Мои открытые вопросы к user

Перед стартом стоит уточнить:

1. **Доступ к архиву BESTAUTO фото** — есть ли папка с кадрами студии на диске / Google Drive / Dropbox?
2. **Tilda admin credentials** — если агент использует browser automation, понадобится login (через `Claude_in_Chrome` MCP с persistent session)
3. **GSC API access** — есть ли key для автоматического request indexing, или каждый раз user кликает вручную?
4. **Кого уведомлять при ошибках** — Telegram/WhatsApp/email hook?
5. **Preferred AI модель** — Flux Dev (быстро, дешевле) или Flux Pro Ultra (качество)?
6. **Ratio публикаций 1-lang vs 3-lang** — RU first for all, then KA/EN? Или all-3-langs параллельно?
