# Publication Agent — Session Brief

Этот файл — **single source of truth** для агента, публикующего статьи блога по расписанию. Его задача: открыть новую Claude сессию, скопировать всё из раздела «Copy-paste для нового агента» ниже, и запустить.

---

## Что делает агент

Публикует 100 готовых markdown-драфтов из `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/drafts/blog/` на продакшен сайт bestauto.ge через Tilda CMS с каденцией **2-3 статьи в неделю** в порядке приоритета P1 → P2 → P3.

**Total pipeline**:
- 32 статьи P1 (топ ROI по GSC)
- 49 статей P2 (средний трафик + commercial intent)
- 19 статей P3 (long-tail, seasonal, niche)
- = 100 публикаций ≈ **5 месяцев** при 5/неделю (~20 статей/мес)

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

**Fully automated pipeline** — user только approve'ит перед коммитом. Tilda admin UI НЕ используется. Агент создаёт HTML файлы из существующих Tilda-export template'ов (программный patch):

```
┌─────────────────────────────────────────┐
│ 1. Photo prep (agent)                    │  Pexels API → cwebp optimization
│    → tilda-export/.../images/{slug}-*    │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 2. HTML generation (agent)              │  Clone template HTML, patch content
│    • Read template page129335723.html    │  title, meta, hero, body, images
│    • Patch with article content          │  Save as page{NEW_ID}.html per lang
│    • Generate new unique page ID         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 3. Blog index patch (agent)              │  Parse t404 block in page37357691/…
│    Add new preview card at top           │  Insert t404__col HTML, save back
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 4. Registry & build (agent)              │
│    • page-map.json — add 3 entries       │
│    • live_urls.txt — add 3 URLs          │
│    • blog-links.ts — add editorial rules │
│    • bun run build (validate)            │
│    • status: published в frontmatter    │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 5. USER APPROVE (diff review)            │  ← ЕДИНСТВЕННЫЙ human step
│    Agent показывает diff, user:          │  Если OK — «push»
│    — одобряет → commit + push           │  Если нет — «поправь X» → agent патчит
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 6. Deploy & index (agent)                │
│    • git push origin main                │
│    • Wait Cloudflare deploy              │
│    • python request_indexing.py (GSC)    │
│    • Verify live URLs                    │
└─────────────────────────────────────────┘
```

**Time budget**: ~20 мин agent wallclock per 1 статья × 3 языка (photo gen + HTML gen + index patch + build + push). User time: ~5 мин (approve).

---

## Scheduling

**Cadence**: 5 статей/неделю.
**Расписание**: **Сб / Вс / Пн / Ср / Чт в 10:00 Тбилиси** (`0 10 * * SAT,SUN,MON,WED,THU`).

Настройка через `/schedule` skill или `CronCreate`:

```
/schedule create "Publish next blog article from queue" 0 10 * * SAT,SUN,MON,WED,THU Asia/Tbilisi
```

Или просто `/loop` с интервалом если хочешь self-paced.

**Почему эти дни**: Вт и Пт оставлены как buffer-дни для догона пропущенных слотов, правок и отгулов. Выходные включены (weekend traffic на automotive-контенте часто выше — люди ищут решения когда не на работе).

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

**2a. Pexels** — default. Бесплатная лицензия, реальные фото, выглядят профессионально:
```python
# Поиск через Pexels API (бесплатный ключ: https://www.pexels.com/api/)
# PEXELS_API_KEY хранить в ~/.zshrc: export PEXELS_API_KEY=...
import urllib.request, json, os

def pexels_search(query, per_page=5):
    url = f"https://api.pexels.com/v1/search?query={urllib.parse.quote(query)}&per_page={per_page}&orientation=landscape"
    req = urllib.request.Request(url, headers={"Authorization": os.environ["PEXELS_API_KEY"]})
    with urllib.request.urlopen(req) as r:
        data = json.load(r)
    return [(p["id"], p["src"]["original"], p["url"]) for p in data["photos"]]

# Пример запросов по кластеру:
# PPF/VIN: "vinyl wrap car", "car wrapping studio"
# CER/POL: "car detailing", "car polishing", "ceramic coating car"
# TIN:     "window tinting car", "car tint film"
# WIN:     "windshield repair", "auto glass"
# INT:     "car interior cleaning", "auto detailing interior"
# WSH:     "car wash detailing", "car washing studio"

# Скачать оригинал
results = pexels_search("vinyl wrap car")
# Показать user'у список URL (p["url"]) → user выбирает → скачать выбранный
photo_url = results[0][1]  # original src
urllib.request.urlretrieve(photo_url, "/tmp/hero-raw.jpg")
```

> **⚠ НЕТ inline-изображений в body статьи** — только hero. Подтверждено на what-is-ppf-explainer.

**Workflow с Pexels**:
1. Агент делает поиск по cluster-specific query (см. выше)
2. Показывает user'у топ-5 результатов (ссылки на pexels.com)
3. User выбирает одно → агент скачивает → конвертирует в WebP (Step 2.5)
4. Если API key недоступен или возвращает 403 — ключ устарел; попросить user обновить на pexels.com/api. Временный fallback: скачать вручную с pexels.com → `/tmp/hero-raw.jpg`

**2b. BESTAUTO архив** (приоритет если есть):
- Путь: `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/archive/bestauto-photos/`
- Проверяй эту папку **до** генерации AI — если есть подходящий кадр под тему/кластер, используй его.

### Step 2.5: Photo optimization (ОБЯЗАТЕЛЬНО)

AI-generated PNG или JPEG из архива **не загружать в Tilda напрямую** — они слишком тяжёлые и убивают PageSpeed. Оптимизируй:

```bash
# Установка cwebp (один раз, если нет): brew install webp
# Для resize: brew install imagemagick

# Hero: 1920×1080, quality 80 (баланс качество/размер)
cwebp -q 80 -resize 1920 1080 drafts/blog-images/{slug}/hero-raw.png -o drafts/blog-images/{slug}/hero.webp

# Inline: 1200×800, quality 75
cwebp -q 75 -resize 1200 800 drafts/blog-images/{slug}/inline-1-raw.png -o drafts/blog-images/{slug}/inline-1.webp

# Проверка размера
ls -lh drafts/blog-images/{slug}/*.webp
# Hero target: < 300 KB (если больше — уменьшай quality до 70)
# Inline target: < 150 KB
```

**Target values**:
| Тип | Dimensions | Quality | Max size |
|---|---|---|---|
| Hero | 1920×1080 | 80 | 300 KB |
| Inline | 1200×800 | 75 | 150 KB |
| Mobile hero (опц.) | 1200×675 | 80 | 180 KB |

**Если cwebp недоступен** — fallback на Python:
```python
from PIL import Image
img = Image.open('hero-raw.png')
img.thumbnail((1920, 1080), Image.LANCZOS)
img.save('hero.webp', 'webp', quality=80, method=6)
```

**Удалить -raw.png файлы** после конвертации (не нужны, занимают место):
```bash
rm drafts/blog-images/{slug}/*-raw.png
```

**Зачем это важно**:
- PageSpeed Insights страдает от картинок >500KB — LCP растёт, Core Web Vitals падают
- Tilda НЕ оптимизирует загружаемые картинки автоматически для blog-статей — если загрузишь 5MB PNG, он таким и останется на CDN
- Hero-картинка = LCP element, прямо влияет на ранжирование
- При 5 статей/неделю за год это 780 картинок — разница 300KB vs 3MB = 2+ GB в bandwidth

### Step 3 — AGENT: Generate article HTML via template cloning

Tilda admin УЖЕ НЕ ИСПОЛЬЗУЕТСЯ. Agent сам создаёт HTML файлы на основе существующих экспортов.

**ВАЖНО — per-language templates** (чтобы футер/nav/hreflang/og:locale не смешивали языки):

Template page ID выбирается по **(cluster, lang)** паре. Если нужного нет в tilda-export/ — fallback на ближайший кластер в том же языке. Если и этого нет — curl live HTML → save as template → use.

### Primary template map (page IDs в `tilda-export/project6825691/page{ID}.html`)

| Cluster | RU | KA | EN | Source slug |
|---|---|---|---|---|
| **POL** | `129649363` | `129683983` | `129692483` | polishing-cost-tbilisi |
| **CER** | `129649683` | `129684103` | `129692573` | cost-tbilisi RU, tbilisi KA/EN |
| **GEN** | `129335723` | `129335883` | `129336113` | car-detailing-guide |

### Fallback map (для новых кластеров без existing templates)

Для первой статьи в кластере: **clone из structurally nearest cluster того же языка**. После публикации первой статьи кластера — она становится его template для остальных.

| Target cluster | RU fallback | KA fallback | EN fallback | Why |
|---|---|---|---|---|
| **PPF** | 129649683 (CER RU) | 129684103 (CER KA) | 129692573 (CER EN) | protective coating structure |
| **VIN** | 129649683 (CER RU) | 129684103 (CER KA) | 129692573 (CER EN) | service-focus structure |
| **TIN** | 129649683 (CER RU) | 129684103 (CER KA) | 129692573 (CER EN) | single-service structure |
| **WIN** | 129649363 (POL RU) | 129683983 (POL KA) | 129692483 (POL EN) | technical-process structure |
| **WSH** | 129335723 (GEN RU) | 129335883 (GEN KA) | 129336113 (GEN EN) | umbrella-service structure |
| **INT** | 129649683 (CER RU) | 129684103 (CER KA) | 129692573 (CER EN) | detail-service structure |

### Lookup logic для обновления map

```python
import json
pm = json.load(open('page-map.json'))

def get_template_id(cluster, lang):
    """Get page ID for (cluster, lang) template.
    Uses primary map → fallback map → live curl fetch."""
    
    PRIMARY = {
        'POL': {'ru':'129649363','ka':'129683983','en':'129692483'},
        'CER': {'ru':'129649683','ka':'129684103','en':'129692573'},
        'GEN': {'ru':'129335723','ka':'129335883','en':'129336113'},
    }
    FALLBACK = {
        'PPF': 'CER', 'VIN': 'CER', 'TIN': 'CER', 'INT': 'CER',
        'WIN': 'POL', 'WSH': 'GEN',
    }
    
    if cluster in PRIMARY:
        return PRIMARY[cluster][lang]
    fallback_cluster = FALLBACK[cluster]
    return PRIMARY[fallback_cluster][lang]

# Пример для первой PPF статьи на RU:
template_id = get_template_id('PPF', 'ru')  # → '129649683' (CER RU)
template_file = f'tilda-export/project6825691/page{template_id}.html'
```

### После первой публикации в кластере

Как только агент опубликует первую PPF/VIN/TIN/WIN/WSH/INT статью — обнови PRIMARY map в самом скрипте (или в persistent state file `.publication-state.json`), чтобы следующие статьи того же кластера клонировались из неё, а не из fallback:

```python
# .publication-state.json
{
  "cluster_templates": {
    "PPF": {
      "ru": "920260420001",  # first PPF article RU page ID
      "ka": "920260420002",
      "en": "920260420003"
    }
  }
}
```

### Альтернатива: curl live HTML если template файла нет

Если `tilda-export/project6825691/page{ID}.html` не существует на диске, но URL есть в live_urls.txt:

```bash
curl -s "https://bestauto.ge/ru/blog/{slug}" \
  > tilda-export/project6825691/page{NEW_TEMPLATE_ID}.html
# Потом использовать как template для patching
```

Полезно для кластеров где Tilda-hosted статьи существуют но не были ранее экспортированы (всего ~48 live slugs, но только 15 в tilda-export).

### Структурная совместимость

Все Tilda blog articles собраны из одного master-template (classes `t182`, `t004`, `t030`, `t404` и т.д.) — структурно идентичны на 90%. Различаются только content blocks. **Per-language критично** — footer/nav/metadata другой текст; per-cluster желательно для content structure consistency, но не критично.

**Генерация unique page ID**:
- Существующий max page ID ≈ 130,000,000 (динамическое)
- Используй схему: **`9{YYYYMMDD}{idx}`** (9 + 8 цифр дата + 2 цифры счётчика)
  - Например, `920260420001` для первой статьи 2026-04-20
  - Не конфликтует с Tilda-generated IDs (Tilda < 200M)
  - Sortable by date
- Или увеличить max existing ID на 100,000: `max_id + 100_000 + lang_offset`

**HTML patch steps**:

1. **Clone template**:
   ```bash
   cp tilda-export/project6825691/page129335723.html tilda-export/project6825691/page{NEW_ID}.html
   ```

2. **Patch HTML** через Python с BeautifulSoup (регексы слишком хрупкие):
   ```python
   from bs4 import BeautifulSoup
   with open('tilda-export/project6825691/page{NEW_ID}.html', 'r', encoding='utf-8') as f:
       soup = BeautifulSoup(f.read(), 'html.parser')
   
   # 1. Meta tags
   soup.find('title').string = meta_title
   soup.find('meta', attrs={'name':'description'})['content'] = meta_description
   soup.find('meta', attrs={'property':'og:title'})['content'] = meta_title
   soup.find('meta', attrs={'property':'og:description'})['content'] = meta_description
   soup.find('meta', attrs={'property':'og:url'})['content'] = f'https://bestauto.ge/ru/blog/{slug}'
   soup.find('link', attrs={'rel':'canonical'})['href'] = f'https://bestauto.ge/ru/blog/{slug}'
   # og:image — hero photo
   soup.find('meta', attrs={'property':'og:image'})['content'] = f'https://bestauto.ge/tilda-export/project6825691/images/{slug}-hero.webp'
   
   # 2. Hero block (обычно class t182 или tn-atom на Tilda Zero Block)
   # Найди heading по контексту, замени innerText
   hero_title_el = soup.find(class_='t182__title') or soup.find('h1', class_='t-title')
   hero_title_el.string = hero_title
   hero_subtitle_el = soup.find(class_='t182__descr') or soup.find(class_='t-descr')
   hero_subtitle_el.string = hero_subtitle
   # Hero background image
   hero_img = soup.find(class_='t182__bgimg') or soup.find(class_='t-bgimg', recursive=True)
   if hero_img:
       hero_img['style'] = f"background-image: url('images/{slug}-hero.webp');"
   
   # 3. Body block (TextPlus) — replace full inner HTML
   body_el = soup.find(class_='t004') or soup.find(class_='t040') or soup.find(class_='t030')
   body_el.clear()
   body_el.append(BeautifulSoup(body_html, 'html.parser'))
   
   # 4. Breadcrumbs / navigation — если есть slug references, обновить
   # (обычно template содержит ссылку "Блог > car-detailing-guide" — замени на {hero_title[:50]})
   
   # 5. Save
   with open(f'tilda-export/project6825691/page{NEW_ID}.html', 'w', encoding='utf-8') as f:
       f.write(str(soup))
   ```

3. **Body HTML** — agent конвертирует markdown body в HTML. Простая разметка:
   - `# H1` → `<h1 class="t-heading">...</h1>`
   - `## H2` → `<h2 class="t-heading t-heading_sm">...</h2>`
   - `### H3` → `<h3 class="t-heading t-heading_xs">...</h3>`
   - абзацы → `<p class="t-text t-text_md">...</p>`
   - bullet list `- ...` → `<ul class="t-list"><li class="t-list__item">...</li></ul>`
   - **bold** → `<strong>...</strong>`
   - `[link](url)` → `<a href="url">...</a>`
   - Inline фото между H2 → `<img src="images/{slug}-inline-N.webp" alt="..." class="t-img" loading="lazy">`

Можно использовать Python `markdown` library с custom renderer:
```python
import markdown
body_html = markdown.markdown(body_md, extensions=['extra', 'nl2br'])
# Затем post-process: add t-* классы, конвертировать img в Tilda format
```

4. **Упаковка images в tilda-export**:
   ```bash
   cp drafts/blog-images/{slug}/hero.webp tilda-export/project6825691/images/{slug}-hero.webp
   # КРИТИЧНО: tilda-export/images/ находится в .gitignore и НЕ деплоится!
   # Обязательно скопировать также в astro/public/images/ — только этот путь коммитится и достигает Cloudflare Pages
   cp drafts/blog-images/{slug}/hero.webp astro/public/images/{slug}-hero.webp
   ```

**Orphaned blocks** (multi-rec style, ОБЯЗАТЕЛЬНО):

Источники (page129xxx) всегда содержат один dt=131 блок с `ba-blog-content` — это контент предыдущей статьи, который НЕ совпадает с regex для удаления body-рекордов (например `rec1296496\d+`). После удаления старых body-рекордов по ID-паттерну — явно удалить все оставшиеся orphaned блоки:

```python
orphaned = [
    r for r in soup.find_all('div', attrs={'data-record-type': '131'})
    if r.find('div', class_='ba-blog-content')
]
for r in orphaned:
    r.decompose()
```

**Reference implementation**: `/tmp/patch_ppf.py` функция `patch_template()` — полная реализация pipeline (metatextblock, hero patch, multi/single body, orphaned removal).

**Repeat per language**: если публикуешь все 3 языка за слот → 3 новых HTML файла (разные page ID) + hero image reuse (языконезависимо).

### Step 4 — AGENT: Patch blog index page (preview card)

**Критически важно**. Blog index пополняется агентом автоматически — добавляется новая t404 card в начало списка.

**Index page paths**:
- `tilda-export/project6825691/page37357691.html` — RU (/ru/blog)
- `tilda-export/project6825691/page37416946.html` — EN (/en/blog)
- `tilda-export/project6825691/page37602384.html` — KA (/blog)

**Patch script (Python) — ТОЛЬКО regex injection, НЕ BeautifulSoup:**

> ⚠ BeautifulSoup НЕ использовать для index pages — BS4 реформатирует 38-104 строки per файл (всё что внутри блока), git diff становится нечитаемым. Используй plain string injection.

```python
def build_card(href, img, date, title, descr):
    return (
        '<div class="t404__col t-col t-col_6 t-align_left"> '
        f'<a class="t404__link" href="{href}"> '
        '<div class="t404__imgbox"> '
        f'<div class="t404__img t-bgimg" data-original="{img}" style="background-image: url(\'{img}\');"></div> '
        '<div class="t404__separator"></div> '
        '</div> '
        '<div class="t404__textwrapper"> '
        '<div class="t404__uptitle t-uptitle"> '
        f'<span class="t404__date">{date}</span> '
        '</div> '
        f'<div class="t404__title t-heading t-heading_xs">{title}</div> '
        f'<div class="t404__descr t-descr t-descr_xs">{descr}</div> '
        '</div> '
        '</a> '
        '</div>'
    )

def patch_index(path, href, img, date, title, descr):
    html = path.read_text()
    if href in html:  # idempotency check
        return
    # Маркер — первая t404 карточка. Trailing space внутри кавычек обязателен!
    marker = '<div class="t404__col t-col t-col_6 t-align_left '
    idx = html.find(marker)
    assert idx != -1, f'marker not found in {path.name}'
    card = build_card(href, img, date, title, descr)
    path.write_text(html[:idx] + card + ' ' + html[idx:])
```

**Reference implementation**: `/tmp/patch_blog_index_regex.py` (what-is-ppf-explainer сессия).

**Применить per language**: 3 index файла патчатся отдельно (разные title/descr/href для RU/KA/EN).

### Step 5 — AGENT: page-map.json update

```python
import json
# КРИТИЧНО: редактировать astro/src/lib/page-map.json
# Верхнеуровневый page-map.json — это orphan/deprecated файл, НЕ используется сайтом
pm = json.load(open('astro/src/lib/page-map.json'))

# Add entry per language
for lang, lang_prefix in [('ru', '/ru/'), ('ka', '/'), ('en', '/en/')]:
    new_id = str(generate_new_page_id(lang))  # из Step 3
    pm[new_id] = {
        "file": f"page{new_id}.html",
        "url": f"https://bestauto.ge{lang_prefix}blog/{slug}",
        "path": f"{lang_prefix}blog/{slug}",
        "title": meta_title_by_lang[lang],
        "lang": lang,
        "slug": f"blog/{slug}"
    }

json.dump(pm, open('astro/src/lib/page-map.json','w'), ensure_ascii=False, indent=2)
```

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
cd /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/astro && bun run build
# Verify dist/{lang}/blog/{slug}/index.html exists
```

Если build fails → stop, report error, **не пушить**.

### Step 8 — AGENT: Editorial blog-links update (КРИТИЧЕСКИ ВАЖНО для SEO)

Механизм описан в `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/docs/blog-internal-links.md` — прочитай перед первым использованием.

**Зачем**: каждая новая статья должна содержать 2-3 анкорные ссылки на pillar-сервисные страницы (`/polishing`, `/ceramiccoating`, `/ppf-shield-wrapping` и т.д.). Это поднимает сервисные страницы в Google через внутренний анкор-сигнал. Без этого шага — статья опубликована, но SEO-эффект на service pages НЕ реализуется.

**Архитектура**:
```
astro/src/data/blog-links.ts  →  BLOG_LINKS_RU / _KA / _EN arrays
astro/src/lib/blog-links-inject.ts  →  инжектор на build-time
astro/src/data/seo-service-keywords.ts  →  whitelist HF-анкоров (validation)
```

**Формат правила** в `blog-links.ts`:
```typescript
{
  article: 'what-is-ppf-explainer',  // slug без языкового префикса
  links: [
    {
      role: 'pillar',                          // pillar | cross-blog | cross-service
      target: '/polishing',                    // куда ссылка (без lang-prefix)
      anchor: 'полировка машины',              // HF-запрос из seo-service-keywords.ts
      originalPhrase: 'полировка',             // что заменяем в тексте статьи
      contextQuote: 'после нанесения PPF полировка уже не нужна в первые 2 года',
                                                // уникальный фрагмент где найти originalPhrase
    },
    // ещё 1-2 link'а на другие сервисы
  ]
}
```

**4 validation checks** (применяются при build-time, нарушение = warning, ссылка не инжектируется):
1. `anchor` — должен быть в `seo-service-keywords.ts` для target+lang (case-insensitive)
2. `contextQuote` — уникален в HTML статьи (ровно 1 match)
3. `originalPhrase` — substring от contextQuote (валидность замены)
4. Нет duplicate-stem (не добавлять ссылку с анкором однокоренным к уже существующей в той же секции)

### Step 8 — AGENT workflow:

**1. Прочитай статью** (RU секцию файла `drafts/blog/{slug}.md`):
- Определи 2-3 упоминания сервисов, которые можно сделать анкорными ссылками
- Для PPF-статьи это могут быть ссылки на `/ceramiccoating`, `/polishing`, `/vinyl-wrapping` (cross-cluster context)
- Для POL-статьи — `/ceramiccoating` (natural follow-up), `/ppf-shield-wrapping` (upsell)

**2. Подбери anchor из HF-словаря**:
- Открой `astro/src/data/seo-service-keywords.ts`
- Найди секцию `SERVICE_KEYWORDS_RU[target]` — там массив HF-запросов
- Выбери один, который читается естественно в контексте статьи
- Для KA/EN секций — аналогично из `SERVICE_KEYWORDS_KA`/`_EN`

**3. Найди originalPhrase + contextQuote**:
- `originalPhrase` — короткое слово/фраза в статье, которую заменим на анкор (например "полировка")
- `contextQuote` — окружающий текст 30-80 chars с уникальным контекстом (чтобы инжектор нашёл правильное место, не любое вхождение слова "полировка")

**4. Добавь правила в `blog-links.ts`**:
```typescript
// В файле astro/src/data/blog-links.ts
export const BLOG_LINKS_RU: BlogLinkRule[] = [
  // ...существующие правила...
  {
    article: 'what-is-ppf-explainer',
    links: [
      {
        role: 'cross-service',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'керамика',
        contextQuote: 'PPF работает с керамикой поверх — двойная защита',
      },
      {
        role: 'cross-service',
        target: '/polishing',
        anchor: 'полировка кузова',
        originalPhrase: 'полировка',
        contextQuote: 'перед нанесением PPF часто нужна полировка лака',
      },
    ],
  },
];

// Аналогично добавить правила в BLOG_LINKS_KA и BLOG_LINKS_EN
```

**5. Верификация**:
```bash
cd /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/astro && bun run build
# Смотри лог: `[blog-links] what-is-ppf-explainer (ru): applied=2 missed=0 ambiguous=0 unknown=0`
```

Ожидаемый результат:
- `applied=2-3` (сколько правил успешно инжектировалось)
- `missed=0`, `ambiguous=0`, `unknown=0` (нет warning'ов)

**Если есть warning'и** — читай логи, исправляй contextQuote или anchor, пересобирай. НЕ пушить с warning'ами.

**Per-language**: правила добавляются ОТДЕЛЬНО для каждого языка (разные HF-анкоры на RU/KA/EN). Если публикуешь все 3 языка за один слот — добавь 3 набора правил (BLOG_LINKS_RU + _KA + _EN).

**Anti-pattern** (не делать):
- ❌ Использовать не-HF анкоры (например «услугу полировки» — это НЕ запрос, его нет в словаре)
- ❌ Одинаковые анкоры на 3 языках (натурально разные формулировки)
- ❌ Более 3 ссылок в одной статье (выглядит спамно)
- ❌ Ссылки на ту же услугу 2 раза в одной статье (duplicate-stem)

### Step 8b — AGENT: BLOG_SERVICE_MAP (ОБЯЗАТЕЛЬНО — ссылка "Цены" в шапке)

Добавь запись в `astro/src/lib/related-services.ts` в массив `BLOG_SERVICE_MAP`:

```typescript
'blog/{slug}': '{parent-service-slug}',
```

**Маппинг кластеров → parent service slug**:
| Кластер | parent-service-slug |
|---------|---------------------|
| PPF | `ppf-shield-wrapping` |
| CER | `ceramiccoating` |
| POL | `polishing` |
| VIN | `vinyl-wrapping` |
| TINT | `auto-glass-tinting` |
| WASH | `carwash` |
| INT | `interior-cleaning` |
| WIN | `windshield-repair` |

**Зачем это важно**: этот маппинг управляет ссылкой "Цены" в навигации на странице блог-статьи. Без него ссылка ведёт на `/ru/prices` (общий прайс), а не на страницу конкретного сервиса с якорем `#prices` (`/ru/ppf-shield-wrapping#prices`). Без этого шага nav на статье сломан.

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
Blog index updated: ✓ (card visible on https://bestauto.ge/{lang_prefix}blog)
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
- [ ] Hero фото есть **и конвертирован в WebP** (проверить file на диске, размер < 300 KB)
- [ ] Inline фото есть **в WebP** (минимум 1 для P1/P2, размер < 150 KB каждый)
- [ ] RU секция длиной в range (1300-2200 слов через `wc -w`)
- [ ] Цены только из §8a.1 (Python check)
- [ ] Бренды только whitelist (Python check)
- [ ] Нет Глдани/Сабуртало/Лило (Python check)
- [ ] Editorial anchors в `blog-links.ts` спроектированы (2-3 per lang) и HF-анкоры в словаре

### Post-publish (agent after Step 11)
- [ ] `bun run build` в astro/ прошёл без ошибок
- [ ] `blog-links` warnings = 0
- [ ] URL статьи живой (curl HEAD 200)
- [ ] **URL blog index содержит новую карточку** — `curl https://bestauto.ge/ru/blog | grep "{slug}"` должно найти
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
| Фото не найдено в Pexels/Unsplash | Публикуй без hero, сообщи user. Для P1 — обязательно запросить у user фото вручную перед публикацией. |
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
1. `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/drafts/blog/README.md` — workflow + navigation + photo guidance
2. `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/drafts/blog/PUBLICATION-AGENT-BRIEF.md` — этот файл
3. `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/docs/blog-article-guidelines.md` — §8a.1 цены snapshot, §8a.3 brand whitelist

**По запросу**:
4. `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/docs/content-roadmap.md` — полный slug-список с GSC
5. `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/astro/src/data/seo-service-keywords.ts` — HF dict
6. `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/astro/src/data/blog-links.ts` — existing anchors

---

## Required tools/skills/MCP

Все через Claude Code skill system:

| Задача | Инструмент |
|---|---|
| Photo selection | Pexels API (PEXELS_API_KEY) → Unsplash (ручной поиск) |
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
Я веду публикацию блога bestauto.ge. Все 100 статей написаны и лежат в /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/drafts/blog/ (markdown-драфты на 3 языках каждый).

Твоя задача — публиковать их на продакшен Tilda по 5/неделю, начиная с P1 топ-ROI. Полный brief — в файле:
/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/drafts/blog/PUBLICATION-AGENT-BRIEF.md

Прочитай его, потом прочитай:
- /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/drafts/blog/README.md (workflow + photo guidance)
- /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/docs/blog-article-guidelines.md §8a (бизнес-правила)

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
| Tilda **article** page create | 0 | 10 мин |
| Tilda **blog index** card add | 0 | 3 мин |
| Tilda export (article + index) | 0 | 2 мин |
| page-map + build + push + GSC | 5 мин | 0 |
| **Total per language** | **~10 мин** | **~15 мин** |
| **Total per article × 3 lang** | **~30 мин** | **~45 мин** |

Реально оба в параллели (agent генерит фото пока user создаёт page) — wallclock ~30-35 мин per article на все 3 языка.

---

## Приблизительная timeline

При 5 статей/неделю (по 1 статье × 3 языка за слот, 5 слотов/неделя):

- P1 публикация: 32 статьи × ~1.5 недели из 5/неделю = ~**6-7 недель** (~1.5 месяца)
- P2 публикация: 49 статей = ~**10 недель** (~2.5 месяца)
- P3 публикация: 19 статей = ~**4 недели** (~1 месяц)
- **Всего ~5 месяцев** до полной публикации всех 100 тем.

User time budget при 5/неделю: ~15 часов/месяц (примерно 45 минут на статью × ~20 публикаций).

Можно ускорить до 7/неделю (daily) когда агент и user сработаются — тогда 3.5 месяца total при ~22 ч/месяц user time.

---

## Настройки (ответы user, 2026-04-18)

Конфиг для агента, все вопросы закрыты:

### 1. Архив BESTAUTO фото
**Папка**: `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/archive/bestauto-photos/` (создана, в .gitignore)
- Пуста на момент настройки. Фотки будешь добавлять туда сам по мере получения от студии.
- Агент проверяет эту папку первой при выборе hero/inline фото.
- Если пусто или нет подходящего — fallback на AI-генерацию (см. п. 5).

### 2. Tilda автоматизация
**НЕТ**. Агент НЕ автоматизирует Tilda admin UI. Страницы создаёт user вручную.
- Agent готовит copy-paste блок (hero title + subtitle + meta + body + список inline фото).
- User копирует в Tilda, создаёт страницу, сообщает page ID + экспортирует HTML.
- Agent продолжает с page-map.json / build / push / GSC.

### 3. GSC API — ГОТОВО
Service account credentials + готовый скрипт уже настроены:
- **Credentials**: `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-content/data/google_credentials.json`
- **Скрипт**: `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-content/scripts/request_indexing.py`
- **URL list**: `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-content/data/live_urls.txt` (191 URL на сейчас)
- **State tracking**: `/Users/fedorzubrickij/Documents/Projects CODE/bestauto-content/data/indexing_state.json`
- **Daily limit**: 200 URL (квота Google Indexing API)

**Workflow для агента после публикации**:
```bash
# 1. Добавить новые URL в live_urls.txt
echo "https://bestauto.ge/ru/blog/{slug}" >> /Users/fedorzubrickij/Documents/Projects CODE/bestauto-content/data/live_urls.txt
echo "https://bestauto.ge/blog/{slug}" >> /Users/fedorzubrickij/Documents/Projects CODE/bestauto-content/data/live_urls.txt  # KA
echo "https://bestauto.ge/en/blog/{slug}" >> /Users/fedorzubrickij/Documents/Projects CODE/bestauto-content/data/live_urls.txt  # EN

# 2. Запустить indexing request
cd /Users/fedorzubrickij/Documents/Projects CODE/bestauto-content && python scripts/request_indexing.py

# 3. Проверить статус
python scripts/request_indexing.py --status
```

Скрипт сам читает state, пропускает уже отправленные URL, поддерживает rate limits.

### 4. Уведомления об ошибках
**В сессии**. Агент пишет errors прямо в conversation, без Telegram/Slack/email hooks.
- Чтобы ошибка была замечена — писать в начале своего ответа жирным: `⚠ ERROR: ...`
- Формат weekly digest остаётся прежним (в conversation).

### 5. Фото для hero (источники по приоритету)

**Primary: Pexels** — реальные фото, бесплатная коммерческая лицензия, выглядят профессионально.
- API key: бесплатно на https://www.pexels.com/api/ → хранить в `PEXELS_API_KEY` env
- Поиск через API (см. Step 2a выше)
- Cluster queries: vinyl→"vinyl wrap car", cer/pol→"car detailing polishing", tin→"window tint car", win→"windshield repair", int→"car interior detailing", wsh→"car wash studio"
- Workflow: агент ищет топ-5 → показывает user'у ссылки → user выбирает → агент скачивает

**Fallback: Unsplash** — аналогично Pexels, бесплатная лицензия.
- https://unsplash.com/s/photos/car-wrap — ручной поиск
- Скачать максимальный размер → `/tmp/hero-raw.jpg`

**Если ничего не подходит в Pexels/Unsplash** — публикуй без hero, сообщи user чтобы загрузил вручную. Для P1 статей — обязательно уведомить, не публиковать без hero.

### 6. Multi-language strategy
**Без разницы user'у — default Вариант A**: публикуй 3 языка одной статьи в один слот расписания (3 Tilda страницы подряд).
- Плюсы: hreflang полные сразу, SEO-связка работает с первого дня
- Time cost за слот: ~30 мин агент + ~33 мин user (параллельно → 25 мин wallclock)
- Альтернатива (если user захочет позже переключиться): 1-lang-first для всех статей, потом остальные языки — просто меняется порядок в queue.

---

## Известные баги (исправлены в коде, важно знать)

### blog-grid.ts: extractOgMeta — порядок атрибутов BS4

**Симптом**: карточка статьи в блог-индексе показывает пустое изображение (`data-original="/images/"`).

**Причина**: BeautifulSoup сортирует атрибуты алфавитно: `content=` оказывается ДО `property=`. Старый regex `property="og:image"\s+content=` не матчил.

**Исправлено** в `astro/src/lib/blog-grid.ts` (commit `7ebe63f`): двухшаговая экстракция — сначала находим весь `<meta>` тег, потом из него извлекаем `content=`. 

**Для патч-скриптов**: несмотря на исправление в коде, в шаблоне `og:image content=` всегда писать как `content` ДО `property` невозможно при использовании BS4 — BS4 всё равно переставит. Это нормально, код уже учитывает это.

---

## Конкретизированный Copy-paste для нового агента (с учётом ответов)

**Замени прежний «Copy-paste для нового агента» на этот (он короче и с уже заполненными настройками)**:

```
Я веду публикацию блога bestauto.ge. Все 100 статей написаны и лежат в /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/drafts/blog/ (markdown-драфты на 3 языках).

Твоя задача — публиковать их на продакшен Tilda по 5/неделю, начиная с P1 топ-ROI.

Полный brief с настройками: /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/drafts/blog/PUBLICATION-AGENT-BRIEF.md
Workflow + photo guidance: /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/drafts/blog/README.md
Бизнес-правила: /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/docs/blog-article-guidelines.md

Ключевые настройки:
1. Photo archive: /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/archive/bestauto-photos/ (пуста, fallback на Pexels API — PEXELS_API_KEY в env, затем Unsplash ручной поиск, затем публикация без hero с уведомлением user)
2. **Tilda admin НЕ используется**. Агент сам создаёт HTML файлы клонируя existing templates.
   **ВАЖНО: per-language, per-cluster** (иначе футер/hreflang/og:locale смешиваются):
   - **POL RU**: page129649363 | **POL KA**: 129683983 | **POL EN**: 129692483 (polishing-cost-tbilisi)
   - **CER RU**: 129649683 | **CER KA**: 129684103 | **CER EN**: 129692573
   - **GEN RU**: 129335723 | **GEN KA**: 129335883 | **GEN EN**: 129336113 (car-detailing-guide)
   - **PPF/VIN/TIN/INT** (пока нет templates в tilda-export) → fallback на CER того же языка
   - **WIN** → fallback на POL того же языка
   - **WSH** → fallback на GEN того же языка
   - После первой публикации в новом кластере — обнови `.publication-state.json`, следующие статьи кластера используют её как template
   - Full cluster→template map в BRIEF разделе Step 3
   - Unique page ID для новых статей: схема `9{YYYYMMDD}{idx}` (e.g. `920260420001`)
3. **Blog index patch** (автоматически): агент добавляет t404 card в начало списков на page37357691 (RU) / page37602384 (KA) / page37416946 (EN)
4. **Photos** хостятся в tilda-export/project6825691/images/ (коммитятся в repo, деплоятся через Cloudflare Pages)
5. **Conversion PNG → WebP**: `cwebp -q 80 -resize 1920 1080 ... -o hero.webp` (hero <300KB, inline <150KB)
6. Editorial links: после создания HTML → добавь 2-3 правила в astro/src/data/blog-links.ts (см. docs/blog-internal-links.md), 4 validation checks, анкоры из seo-service-keywords.ts
7. GSC indexing: `cd /Users/fedorzubrickij/Documents/Projects CODE/bestauto-content && python scripts/request_indexing.py`
8. Ошибки пиши в сессии с префиксом «⚠ ERROR:»
9. Фото: Pexels API (PEXELS_API_KEY) → Unsplash (ручной поиск) → без hero (сообщи user, для P1 — обязательно получить фото от user)
10. Languages: все 3 (RU/KA/EN) в один слот (Вариант A)

Прочитай brief + README + guidelines §8a + docs/blog-internal-links.md, потом:
1. Настрой расписание через /schedule: `0 10 * * SAT,SUN,MON,WED,THU` Asia/Tbilisi (5/неделю, Сб-Вс-Пн-Ср-Чт)
2. Сделай dry-run первой статьи (пропусти #1 chem-cleaning — pilot в продукте; начни с #2 what-is-ppf-explainer):
   - Найди hero через Pexels API (PEXELS_API_KEY), покажи топ-5, дождись выбора user'а, скачай, конвертируй в WebP (cwebp)
   - Clone RU template page129335723.html, patch meta/hero/body через BeautifulSoup
   - Clone KA template page129335883.html, patch аналогично
   - Clone EN template (найди в page-map.json), patch
   - Patch blog index pages (37357691 RU + 37602384 KA + 37416946 EN): add t404 card
   - Update page-map.json (3 новых entries)
   - Update blog-links.ts (2-3 editorial anchors per lang)
   - Run `bun run build` — проверь 0 warnings
   - Покажи мне diff (git status + git diff summary)
3. Я approve'ю изменения (или попрошу корректировки). После OK:
   - git commit + push origin main
   - Wait Cloudflare deploy (gh run list)
   - Verify live URLs (curl https://bestauto.ge/ru/blog/what-is-ppf-explainer | grep hero_title)
   - Add 3 URLs в live_urls.txt, run python scripts/request_indexing.py
   - Update status: published в frontmatter
   - Отчёт по Step 14 format

Ответь коротко: "готов, прочитал брифы" — и начинай с dry-run.
```

Скопируй этот блок в новую Claude Code сессию — агент стартует сразу с правильным контекстом.
