---
slug: article-slug-in-kebab-case
cluster: INT                          # POL / CER / PPF / VIN / TIN / WIN / WSH / INT / GEN
target_service: /interior-cleaning    # пиллар для CTA и internal link
priority: P1                          # P1 / P2 / P3
gsc_signal: "KA `...` NNNN imp / N cl; RU `...` NNN imp / N cl"
primary_hf_ru: "первый HF, второй HF"
primary_hf_ka: "მთავარი HF, მეორე HF"
primary_hf_en: "primary HF, secondary HF"
secondary_links: []                   # напр. ["/ppf-shield-wrapping"] — soft PPF upsell для POL/CER/CW/GEN
status: drafted                       # drafted / reviewed / ready / published
sources:
  - roadmap: "docs/content-roadmap.md#NN"
  - competitor: "https://..."
  - gsc: "Downloads/gsc_16months.csv"
---

<!--
  Как пользоваться шаблоном:

  1. Frontmatter — единый блок для всех трёх языков (slug общий, HF per-lang)
  2. Ниже идут 3 секции с разделителями `---`: ## RU, ## KA, ## EN
  3. Каждая секция имеет одинаковую структуру:
     - **Meta title** (50-65 chars) — НЕ коммерческий, без «BESTAUTO», без «цены от X ₾»;
       информационный/образовательный, чтобы не конфликтовать с meta сервисной страницы
     - **Meta description** (140-160 chars) — образовательный angle («как работает», «этапы», «когда нужно»)
     - **Hero title** — заголовок для Tilda hero-блока (обычно совпадает с H1)
     - **Hero subtitle** — лид/подзаголовок под hero title, 120-160 chars, расширяет обещание
     - `# H1` в теле (совпадает с Hero title)
     - Intro (100-150 слов): проблема → обещание → для кого
     - Оглавление (для статей 1500+ слов) — опционально
     - 5-7 × `## H2` секций (200-350 слов каждая, primary HF минимум в одной)
     - `## FAQ` с 5 × `### Вопрос?` + ответ (60-100 слов)
     - `## Заключение` (100-150 слов) + bullet-список ключевых выводов
     - `## CTA` — упоминать ОБЕ студии (Гурамишвили + Политковская) и оба телефона,
       ссылка ведёт на сервис-страницу `/{target_service}`, НЕ на /prices
  4. Язык: сначала RU (смысловая рамка), потом KA (пересказ, не машинный), потом EN
  5. Длины: RU 1300-2200, KA +10-20% (чаще по символам), EN −10-15%
  6. Primary HF — в meta title, hero title, H1, intro (первые 100 слов), ≥1 H2, meta description. Плотность 3-6 на 1000.
  7. Бренды — только whitelist из §8a.3 guidelines
  8. Цены — только «от X ₾», сверять с /prices; ССЫЛКА ВЕДЁТ на сервис-страницу, НЕ на /prices (!)
     Формулировка: «блок с ценами по всем категориям — на странице услуги [anchor](/{service})»
  9. Soft PPF upsell (1 internal link) — ТОЛЬКО для кластеров POL / CER / CW / GEN
  10. Удалить этот HTML-комментарий перед финализацией
-->

## RU

**Meta title:** Тема в Тбилиси: этапы, сроки, ключевой аспект

**Meta description:** Как устроен процесс / что важно знать / когда нужна услуга — образовательный angle, без цен и без «BESTAUTO».

**Hero title:** Короткий заголовок с primary HF, 40-60 chars

**Hero subtitle:** Развёрнутая подводка: что читатель узнает из статьи, 120-160 chars.

---

# H1 с primary HF — совпадает с Hero title

Intro на 100-150 слов: конкретная проблема читателя → что он получит из статьи → для кого написано. Primary HF в первых 100 словах, но естественно. Без AI-клише типа «давайте разберёмся» или «в этой статье».

## H2 с первым HF-вариантом

Содержательная секция на 200-350 слов. Конкретные цифры, локальный контекст (Тбилиси), без воды. Короткие абзацы 3-5 строк.

## H2 про конкретный аспект

Содержательно. Списки и таблицы там, где это структурированная информация.

## H2 с вариацией HF

Продолжение логики. Внутренние ссылки на сервисные страницы через editorial механизм.

## H2 про цены

Все цифры — из `/prices` snapshot в guidelines §8a.1. Формат «от X ₾».
Ссылка с ценами ведёт на сервис-страницу: «блок с ценами — на [странице услуги](/{target_service})», НЕ на /prices.

## H2 про практику

Кейс или сравнение. Никаких вымышленных статистик.

## FAQ

### Вопрос с long-tail HF?

Ответ на 60-100 слов. Конкретный, actionable.

### Второй вопрос?

Ответ 60-100 слов.

### Третий вопрос?

Ответ 60-100 слов.

### Четвёртый вопрос?

Ответ 60-100 слов.

### Пятый вопрос?

Ответ 60-100 слов.

## Заключение

100-150 слов — подытоживаем статью и даём читателю следующий шаг.

**Ключевые выводы:**

- Пункт 1 — короткий и конкретный
- Пункт 2
- Пункт 3
- Пункт 4 (опционально)
- Пункт 5 (опционально)

## CTA

Записать авто на [услугу](/{target_service}) в BESTAUTO можно через форму на странице услуги или звонком в удобную вам студию:

- **BESTAUTO на Гурамишвили** — пр. Гурамишвили 78, тел. +995 550 000 299
- **BESTAUTO на Политковской** — ул. Анна Политковская 51, тел. +995 550 000 199

Обе студии работают с понедельника по субботу, 10:00–20:00. Перед процедурой — бесплатный очный осмотр.

---

## KA

**Meta title:** თემა თბილისში: ეტაპები, ვადები, მთავარი ასპექტი

**Meta description:** როგორ მიმდინარეობს / რა უნდა იცოდე / როდის გჭირდება — საგანმანათლებლო, ფასებისა და „BESTAUTO"-ს გარეშე.

**Hero title:** მოკლე სათაური primary HF-ით

**Hero subtitle:** გაფართოებული შესავალი — რას გაიგებს მკითხველი, 120-160 სიმბოლო.

---

# H1 ქართულად, primary HF-ით — Hero title-ის იდენტური

Intro 110-180 სიტყვა (KA +10-20% RU-ზე). Primary HF პირველ 100 სიტყვაში. ბუნებრივი ქართული — არა მანქანური თარგმანი.

## H2 პირველი

Შინაარსიანი სექცია. ცხრილები, სიები, კონკრეტული ციფრები.

## H2 მეორე

...

## H2 მესამე

...

## H2 ფასები

Ფასების ბლოკი — სერვის გვერდზე [anchor](/{target_service}), NOT /prices.

## H2 პრაქტიკა

...

## FAQ

### პირველი კითხვა?

Პასუხი 60-100 სიტყვა.

### მეორე კითხვა?

...

### მესამე კითხვა?

...

### მეოთხე კითხვა?

...

### მეხუთე კითხვა?

...

## დასკვნა

110-180 სიტყვა.

**ძირითადი დასკვნები:**

- პუნქტი 1
- პუნქტი 2
- პუნქტი 3

## CTA

დაჯავშნეთ [სერვისი](/{target_service}) BESTAUTO-ში სერვის გვერდზე განთავსებული ფორმით ან ზარით მოსახერხებელ სტუდიაში:

- **BESTAUTO გურამიშვილზე** — გურამიშვილის გამზ. 78, ტელ. +995 550 000 299
- **BESTAUTO პოლიტკოვსკაიაზე** — ანა პოლიტკოვსკაიას ქ. 51, ტელ. +995 550 000 199

ორივე სტუდია მუშაობს ორშაბათიდან შაბათამდე, 10:00–20:00. წინასწარი უფასო დათვალიერება.

---

## EN

**Meta title:** Topic in Tbilisi: process, timelines, key angle

**Meta description:** How the process works / what to know / when the service is needed — educational, no pricing, no "BESTAUTO".

**Hero title:** Short catchy headline with primary HF, 40-60 chars

**Hero subtitle:** Extended lead: what the reader will learn, 120-160 chars.

---

# H1 with primary HF — matches Hero title

Intro 85-125 words (EN −10-15% from RU). Primary HF in first 100 words. Geo-qualifier: "in Tbilisi, Georgia".

## H2 first

Substantive section, 170-300 words.

## H2 second

...

## H2 third

...

## H2 pricing

Full pricing block is on the [service page](/en/{target_service_slug}), NOT /prices.

## H2 practice

...

## FAQ

### First question?

Answer 60-100 words.

### Second question?

...

### Third question?

...

### Fourth question?

...

### Fifth question?

...

## Conclusion

85-125 words.

**Key takeaways:**

- Point 1
- Point 2
- Point 3

## CTA

Book a [service](/en/{target_service_slug}) at BESTAUTO via the form on the service page, or call whichever studio is more convenient:

- **BESTAUTO Guramishvili** — Guramishvili Ave. 78, tel. +995 550 000 299
- **BESTAUTO Politkovskaya** — Anna Politkovskaya St. 51, tel. +995 550 000 199

Both studios operate Monday to Saturday, 10:00–20:00. A free in-person inspection comes first.
