# Content roadmap — 100 new blog topics for bestauto.ge

> Составлен 2026-04-17. Источники:
> - **GSC** (16 мес, 197k строк): `Downloads/gsc_16months.csv` — реальные запросы с показами
> - **Конкурент-аудит**: autoqimwmenda.ge (21 статья), priala.ge (~25 статей) — единственные грузинские detailing-блоги с реальным контентом (performance.ge, adetailing.ge, detailing-ge.com — блоги пустые)
> - **ВЧ-словарь**: `astro/src/data/seo-service-keywords.ts`
> - **Семантический core**: `docs/semantic-core.md`
>
> Исключены 41 существующая статья (см. `astro/src/data/blog-links.ts` как источник правды).
>
> Приоритеты:
> - **P1** — высокие показы GSC (500+) + низкие клики (0-3) = явный пробел
> - **P2** — средние показы (100-500) + пробел + конкурент покрывает
> - **P3** — long-tail, сезонное, нишевое

## Методология выбора слагов и ключей

- Один слаг = одна тема, пишется на всех 3 языках (KA/RU/EN)
- Primary HF — ровно тот поисковый запрос, под который оптимизируется H1/title
- Все primary keys прошли через `seo-service-keywords.ts` dictionary (или будут добавлены при утверждении)
- Target service — пиллар, на который статья будет линковать через editorial internal links

---

## Сводка по кластерам

| Кластер | Существ. | Новых | После | Приоритет раскатки |
|---|---|---|---|---|
| /interior-cleaning | 5 | 14 | 19 | **P1** — top RU-трафик (`химчистка тбилиси` 538 imp / 3 cl) + GSC отрыв от KA (1331 imp на `ქიმწმენდა თბილისში`) |
| /polishing | 8 | 14 | 22 | **P1** — `мანქანის პოლირების კრემი` 1424 imp / 0 cl (полный gap) |
| /auto-glass-tinting | 3 | 12 | 15 | **P1** — top KA-трафик (801 cl на `მინების დაბურვა`); VLT-законы, seasonal |
| /ceramiccoating | 7 | 11 | 18 | **P2** — хорошо покрыто, нужны depth-angles |
| /ppf-shield-wrapping | 6 | 13 | 19 | **P1** — `обтяжка PPF плёнкой` 705 imp / 0 cl + `что такое PPF` (educational gap) |
| /vinyl-wrapping | 3 | 10 | 13 | **P2** — `оклейка кузова` 470 imp / 0 cl |
| /windshield-repair | 3 | 10 | 13 | **P1** — `ремонт сколов` 1106 imp / 0 cl (!) |
| /carwash | 0 | 8 | 8 | **P1** — 0 статей в кластере сейчас! `детейлинг мойка` 553 imp / 5 cl |
| General/umbrella | 7 | 8 | 15 | **P2** — `детейлинг центр` 749 imp / 0 cl + `детейлинг услуги` 469 imp / 0 cl |
| **ИТОГО** | **41** (+5 orphan) | **100** | **146** | |

**Критическая находка:** `/carwash` — 0 существующих blog-статей, но огромные GSC-пробелы. Нужен собственный кластер с нуля.

---

## /polishing (14 новых)

Pillar keyword: `მანქანის პოლირება` / `полировка машины` / `car polishing`.

| # | Slug | Title (KA) | Title (RU) | Title (EN) | Primary HF (RU) | GSC signal | Priority |
|---|---|---|---|---|---|---|---|
| 1 | `polish-cream-diy-vs-studio` | მანქანის პოლირების კრემი — მუშაობს თუ არა? | Полироль для автомобиля — работает ли самостоятельно или нужна студия | Car polish cream — DIY vs professional studio | полировка салона авто, полироль | KA `მანქანის პოლირების კრემი` 1424 imp / 0 cl | **P1** |
| 2 | `interior-plastic-polish` | სალონის პლასტმასის პოლირება — მატი თუ გლოსი? | Полировка пластика салона автомобиля — гайд | Car interior plastic polish guide | полировка пластика салона автомобиля | RU 550 imp / 0 cl | **P1** |
| 3 | `salon-polish-interior-detail` | სალონის გაპრიალება BESTAUTO-ში | Полировка салона авто — что входит в услугу | Car interior polishing — what's included | полировка салона авто | RU 765 imp / 2 cl | **P1** |
| 4 | `steam-headlight-polishing` | ფარების პოლირება ორთქლით vs აბრაზიული | Полировка фар паром vs абразивная | Steam headlight polishing vs abrasive | полировка фар автомобиля | RU 648 imp / 0 cl; competitor autoqimwmenda.ge | **P1** |
| 5 | `polishing-after-body-repair-guide` | პოლირება სხეულის შეკეთების შემდეგ — სრული გზამკვლევი | Полировка после кузовного ремонта — как правильно | How to polish a car after body repair | полировка после ремонта | EN `how to polish a car after body repair` 412 imp / 0 cl | **P1** |
| 6 | `polishing-old-cars-worth-it` | ღირს თუ არა ძველი მანქანის პოლირება? | Стоит ли полировать старый автомобиль? | Is polishing an old car worth it? | полировка кузова автомобиля | competitor autoqimwmenda.ge | **P2** |
| 7 | `pre-sale-polishing-resale-value` | პოლირება გაყიდვისთვის — მეტი ფული | Полировка перед продажей — как повышает цену | Pre-sale car polishing for resale value | полировка авто цена | competitor priala.ge; semantic core #18 | **P2** |
| 8 | `abrasive-polishing-deep-dive` | აბრაზიული პოლირება — როდის აუცილებელი და რა რისკებია | Абразивная полировка — что это и когда нужна | Abrasive polishing — when it's needed and risks | абразивная полировка | dict HF, low volume but commercial | **P2** |
| 9 | `polish-vs-wax-vs-ceramic-beginners` | ვოსკი, პოლირება თუ კერამიკა — ახალმოსულთათვის | Воск, полировка или керамика — для новичков | Wax vs polish vs ceramic — beginner's guide | полировка авто, керамическое покрытие | general educational gap | **P2** |
| 10 | `mountain-trip-polish-check` | მთაში მგზავრობის შემდეგ პოლირება (ყაზბეგი, სვანეთი) | После горной поездки — полировка и проверка кузова | Mountain trip polishing — after Kazbegi/Svaneti | полировка кузова после царапин | market-specific; geo | **P3** |
| 11 | `polish-finish-types-matt-gloss-satin` | მატი vs გლოსი vs სატინ — რომელი გინდა? | Матовая, глянцевая или сатиновая полировка | Matt vs gloss vs satin polish finishes | полировка лкп | dict HF expansion | **P3** |
| 12 | `polishing-how-often-myth-bust` | რამდენად ხშირად ღირს პოლირება — მითების დემონტაჟი | Как часто полировать машину — разбор мифов | How often to polish a car — myths debunked | как часто полировать машину | NOTE: existing `how-often-polish-car` covers basics; this is depth follow-up | **P3** |
| 13 | `headlight-polish-vs-replace` | ფარების პოლირება თუ შეცვლა? | Полировка фар или замена? | Headlight polishing vs replacement | полировка фар | RU 233 imp /0 cl | **P2** |
| 14 | `scratch-polish-guide` | კორპუსის ნაკაწრების პოლირება — რა მუშაობს | Как убрать царапины полировкой — по глубине | Scratch removal with polishing — by depth | полировка кузова автомобиля, царапины | semantic-core depth topic | **P2** |

---

## /ceramiccoating (11 новых)

Pillar keyword: `მანქანის კერამიკა` / `керамическое покрытие авто` / `ceramic coating`.

| # | Slug | Title (KA) | Title (RU) | Title (EN) | Primary HF | GSC signal | Priority |
|---|---|---|---|---|---|---|---|
| 15 | `ceramic-polishing-combo` | კერამიკული პოლირება + საფარი — რატომ ერთად? | Керамическая полировка + покрытие — пакетная услуга | Ceramic polish + coating combo package | კერამიკული პოლირება 39 cl / 1077 imp; competitor autoqimwmenda.ge | **P1** |
| 16 | `interior-ceramic-detail` | სალონის კერამიკული დაცვა — ტყავი, პლასტიკი, ქსოვილი | Керамика салона — кожа, пластик, ткань | Interior ceramic protection — leather, plastic, fabric | керамика салона, дезинфекция салона авто | RU 172 imp / 0 cl | **P1** |
| 17 | `hydrophobic-windshield-coating` | ანტი-წვიმის საფარი საქარე მინაზე | Антидождь на лобовом стекле — керамика | Hydrophobic windshield coating (anti-rain) | керамика на лобовое стекло | detailing-ge.com FAQ; aspect of ceramic-for-car-glass | **P2** |
| 18 | `ceramic-application-cost-breakdown` | კერამიკული საფარის გამოყენების ღირებულება — 4 ფაქტორი | Из чего складывается цена керамического покрытия — 4 фактора | Ceramic coating cost breakdown — 4 price drivers | нанесение керамики, керамическое покрытие цена | RU 120 imp / 0 cl | **P2** |
| 19 | `ceramic-prep-paint-correction` | კერამიკის მომზადება — პოლირებით vs ცივად გასწორებით | Подготовка под керамику — полировка vs выправление | Ceramic prep — polishing vs paint correction | подготовка кузова под керамику | educational gap | **P2** |
| 20 | `ceramic-over-ppf-layered` | კერამიკა PPF-ზე — ორმაგი დაცვა | Керамика поверх PPF — двойная защита | Ceramic over PPF — layered protection | competitor synthesis | **P2** |
| 21 | `ceramic-product-lines-compared` | კერამიკული ხაზების შედარება (9H, SiO2, SiC) | Сравнение линеек керамики — 9H, SiO2, SiC | Ceramic product lines compared (9H, SiO2, SiC) | техническое сравнение | competitor autoqimwmenda.ge angle | **P3** |
| 22 | `ceramic-tbilisi-climate` | კერამიკა თბილისის კლიმატში — ზაფხული/ზამთარი | Керамика в тбилисском климате — лето и зима | Ceramic coating in Tbilisi climate — seasons | керамическое покрытие, погода | seasonal gap | **P3** |
| 23 | `ceramic-5-year-tco` | კერამიკა — 5 წლის ხარჯების ანალიზი | Керамика — стоимость владения 5 лет | Ceramic coating 5-year TCO | ceramic coating cost | TCO/commercial | **P3** |
| 24 | `maintenance-wash-ceramic` | როგორ ვრეცხოთ კერამიკული საფარიანი ავტომობილი | Как правильно мыть машину с керамикой | How to wash a ceramic-coated car | мойка авто с керамикой | existing `ceramic-coating-maintenance` covers basics; this = service-specific | **P2** |
| 25 | `ceramic-vs-wax-vs-sealant` | კერამიკა vs ცვილი vs სინთ. სილანტი | Керамика, воск или синтетический силант | Ceramic vs wax vs synthetic sealant | защита кузова | umbrella comparison | **P2** |

---

## /ppf-shield-wrapping (13 новых)

Pillar keyword: `მანქანის დამცავი ფირი` / `защитная плёнка на авто` / `paint protection film` или `ppf wrap`.

| # | Slug | Title (KA) | Title (RU) | Title (EN) | Primary HF | GSC signal | Priority |
|---|---|---|---|---|---|---|---|
| 26 | `what-is-ppf-explainer` | რა არის PPF — სრული ახსნა | Что такое PPF плёнка — подробный гайд | What is PPF — complete explainer | ppf это, ppf плёнка | RU `что такое PPF` 368 imp / 4 cl; `ппф это` 658 imp / 1 cl; `ppf это` 1268 imp / 2 cl | **P1** |
| 27 | `ppf-full-body-wrapping-guide` | სრული ძარის PPF გადაკვრა — რისი მოლოდინი | Полная оклейка кузова PPF плёнкой — гайд | Full body PPF wrapping — what to expect | обтяжка ppf плёнкой, ppf wrapping | RU `обтяжка PPF плёнкой` 705 imp / 0 cl; EN `ppf wrapping` 1104 imp / 0 cl | **P1** |
| 28 | `ppf-vs-ceramic-vs-vinyl` | PPF vs კერამიკა vs ვინილი — სამმხრივი შედარება | PPF, керамика или винил — тройное сравнение | PPF vs ceramic vs vinyl — 3-way comparison | ppf или керамика | competitor synthesis; covered by existing `top-5-car-paint-protection` partially | **P1** |
| 29 | `ppf-protection-levels-partial-full` | PPF პაკეტები — წინა, ძარის ნაწილი, სრული | Варианты PPF — капот, полкорпуса, полный | PPF packages — hood / half / full | оклейка защитной пленкой авто | RU 329 imp / 0 cl | **P1** |
| 30 | `ppf-self-healing-explained` | თვით-აღდგენადი PPF — როგორ მუშაობს UV-ზე | Самовосстанавливающееся PPF — физика эффекта | PPF self-healing — how it works under UV | самовосстановление pleнки | technical gap | **P2** |
| 31 | `ppf-for-new-cars-checklist` | ახალი მანქანისთვის PPF — საიდან დაიწყო | Для новой машины — какой PPF выбрать | New-car PPF installation checklist | ppf для новой машины | existing `new-car-detailing` is umbrella; this = PPF-specific | **P2** |
| 32 | `ppf-matte-satin-finish-options` | მატი და სატინ PPF — ფერის შეცვლის გარეშე ვიზუალი | Матовая и сатиновая PPF — визуал без оклейки цветом | Matte & satin PPF finishes | матовая плёнка | dict HF long-tail | **P2** |
| 33 | `ppf-edge-peeling-troubleshoot` | PPF კიდეების აქერცვლა — მიზეზები და ხელახალი დაყენება | Края PPF отслаиваются — причины и что делать | PPF edge peeling — causes and fix | PPF гарантия | service-depth | **P2** |
| 34 | `ppf-pricing-georgia-2026` | PPF ფასი საქართველოში 2026 — ზომები, ბრენდები | Цена PPF в Грузии 2026 — по размерам и брендам | PPF pricing Georgia 2026 — by size and brand | оклейка pleнкой цена | ppf pricing intent | **P1** |
| 35 | `ppf-brand-comparison-llumar-stek` | LLumar, Stek, XPEL, Quantum — PPF ბრენდების შედარება | Сравнение брендов PPF — LLumar, Stek, XPEL, Quantum | PPF brand comparison — LLumar, Stek, XPEL, Quantum | бренды PPF | authoritative content | **P2** |
| 36 | `ppf-anti-gravel-focused` | ანტიქვა PPF — კაპოტი, ფრთა, ბამპერი | Антигравийная плёнка — капот, бампер, крылья | Anti-gravel PPF — hood, fenders, bumper | антигравийная плёнка | HF dict | **P2** |
| 37 | `ppf-hood-only-partial-wrap` | მხოლოდ კაპოტის PPF — როდის საკმარისია | Только капот PPF — когда хватает | Hood-only PPF — when it's enough | защита капота пленкой | common question | **P3** |
| 38 | `ppf-removal-how-to` | PPF-ის მოხსნა — პროცესი და რისკები | Снятие PPF плёнки — процесс и риски для лкп | PPF removal — process and paint risks | снятие PPF | service-depth | **P3** |

---

## /vinyl-wrapping (10 новых)

Pillar keyword: `ფირის გადაკვრა` / `оклейка авто плёнкой` / `car wrap`.

| # | Slug | Title (KA) | Title (RU) | Title (EN) | Primary HF | GSC signal | Priority |
|---|---|---|---|---|---|---|---|
| 39 | `car-body-wrap-cost-guide` | ძარის გადაკვრა — ფასი ზომის მიხედვით | Оклейка кузова плёнкой — цена по размерам | Car body wrap pricing guide | оклейка кузова | RU 470 imp / 0 cl | **P1** |
| 40 | `black-gloss-wrap-popular-choice` | შავი გლოსი ფირით გადაკვრა — პოპულარული არჩევანი | Оклейка чёрной глянцевой плёнкой — топ выбор | Black gloss vinyl wrap — popular choice | оклейка авто чёрной глянцевой плёнкой | RU 155 imp / 1 cl | **P2** |
| 41 | `wrap-color-options-finishes` | ფერის არჩევა — 50+ ვარიანტი ფირისთვის | 50+ цветов винила — как выбрать | 50+ vinyl wrap colors — how to choose | цвета виниловой плёнки | variant expansion | **P2** |
| 42 | `carbon-fiber-vinyl-wrap` | კარბონის ფირი — რა არის და სად გამოყენება | Карбоновая плёнка — что это и куда наносить | Carbon fiber vinyl — what and where | карбоновая пленка | competitor autoqimwmenda.ge | **P2** |
| 43 | `wrap-vs-paint-cost-lifetime` | ფირი vs საღებავი — ღირებულება, ვადა | Плёнка или перекраска — цена, срок, реверсивность | Wrap vs repaint — cost, lifetime, reversibility | оклейка вместо покраски | business-decision | **P1** |
| 44 | `interior-decor-vinyl-film` | ინტერიერის დეკორატიული ფირი — DIY თუ სტუდიო | Декоративная плёнка для салона — DIY или студия | Interior decor vinyl — DIY or studio | плёнка салона, декор | competitor autoqimwmenda.ge | **P3** |
| 45 | `chrome-delete-vinyl` | ქრომის მოცილება ფირით — მარტივი სტილი | Удаление хрома плёнкой (chrome delete) | Chrome delete with vinyl wrap | антихром, chrome delete | service-specific | **P2** |
| 46 | `vinyl-wrap-care-maintenance` | ვინილის ფირის მოვლა — რეცხვა, ქიმია | Уход за виниловой плёнкой — мойка, химия | Vinyl wrap care — wash, chemicals | уход за плёнкой | complements existing `hints-for-vinyl-wrapped-cars` with specifics | **P2** |
| 47 | `wrap-removal-residue` | ფირის მოხსნა — ნარჩენების გარეშე | Снятие плёнки без следов — как правильно | Vinyl wrap removal without residue | снятие виниловой плёнки | service-depth | **P3** |
| 48 | `wedding-photoshoot-wrap` | ქორწინების/ფოტოსესიის ავტოს გამოწერა | Свадьба/фотосессия — временная смена цвета | Wedding / photoshoot temporary wrap | аренда для фотосессии | unique angle; priala.ge | **P3** |

---

## /auto-glass-tinting (12 новых)

Pillar keyword: `მინების დაბურვა` / `тонировка стёкол` / `car window tint`.

| # | Slug | Title (KA) | Title (RU) | Title (EN) | Primary HF | GSC signal | Priority |
|---|---|---|---|---|---|---|---|
| 49 | `tint-60-percent-legal-georgia` | 60% დაბურვა — ნებადართული საქართველოში? | 60% тонировка — разрешена в Грузии? 2026 | Is 60% window tint legal in Georgia 2026? | тонировка 60 процентов, разрешенный процент тонировки | RU 147 imp / 2 cl; KA `მინების დამუქება კანონი 2024` 325 imp / 4 cl | **P1** |
| 50 | `tint-percentage-explained` | დაბურვის პროცენტები — 20/35/50/60% სხვაობა | Процент тонировки — 20, 35, 50, 60% разница | Tint percentages explained — 20 / 35 / 50 / 60 | тонировка стекол | RU 805 imp / 0 cl | **P1** |
| 51 | `reflective-vs-dark-tint-heat` | ამრეკლი vs მუქი ფირი — სიცხის ტესტი | Атермалка vs чёрная тонировка — тест на жару | Reflective vs black tint — heat performance test | атермальная тонировка | competitor autoqimwmenda.ge | **P1** |
| 52 | `front-windshield-tint-rules` | წინა საქარე მინის დაბურვა — წესები | Тонировка лобового стекла — что можно в Грузии | Front windshield tint rules in Georgia | разрешенный процент тонировки на передние стекла | RU 129 imp / 0 cl | **P1** |
| 53 | `tint-ceramic-vs-atermal-vs-dyed` | კერამიკული vs ატერმალური vs ნაღებავი ფირი | Керамика, атермалка или крашеная — 3 типа тонировки | Ceramic vs athermal vs dyed tint films | типы тонировочных плёнок | type comparison | **P1** |
| 54 | `window-tint-process-detailed` | დაბურვის პროცესი ეტაპობრივად | Процесс тонировки — от подготовки до сушки | Window tinting process step-by-step | как делается тонировка | competitor autoqimwmenda.ge | **P2** |
| 55 | `anti-uv-anti-rust-tint` | ანტი-UV ფირი | УФ-защитная тонировка | Anti-UV / anti-rust tint film | UV защита тонировкой | competitor autoqimwmenda.ge | **P2** |
| 56 | `tint-removal-bubbles` | ძველი დაბურვის მოხსნა — ბუშტუკები, აქერცვლა | Снятие старой тонировки — пузыри, отслоение | Old tint removal — bubbles, peeling | снятие тонировки | service-depth | **P2** |
| 57 | `tint-care-fresh-install` | ახალი დაბურვის შემდეგ — 5 დღე მოვლა | Уход за свежей тонировкой — первые 5 дней | Fresh tint aftercare — first 5 days | уход за тонировкой | complement to existing `window-tinting-care` with specifics | **P2** |
| 58 | `mobile-tinting-on-location` | ადგილზე მისვლით დაბურვა — რა ეცოდინო | Тонировка с выездом — плюсы и минусы | Mobile window tinting — pros and cons | тонировка на дому, выезд | dict HF `ადგილზე მისვლით` | **P2** |
| 59 | `how-to-choose-tint-film` | ფირის არჩევა — ფერი, პროცენტი, ბრენდი | Как выбрать тонировочную плёнку — цвет, %, бренд | How to choose window tint film | выбор тонировочной плёнки | competitor autoqimwmenda.ge | **P2** |
| 60 | `windshield-tint-strip-header` | წინა შუშის ანტი-მზის ფერი — ზედა ზოლი | Солнцезащитная полоса на лобовом стекле | Windshield sun strip (anti-sun header) | сонцезащитная полоса | niche product | **P3** |

---

## /windshield-repair (10 новых)

Pillar keyword: `საქარე მინის აღდგენა` / `ремонт лобового стекла` / `windshield repair`.

| # | Slug | Title (KA) | Title (RU) | Title (EN) | Primary HF | GSC signal | Priority |
|---|---|---|---|---|---|---|---|
| 61 | `chip-repair-process-step-by-step` | ნაკენჭარის შეკეთების პროცესი ეტაპებზე | Ремонт скола на лобовом стекле — пошагово | Windshield chip repair process — step by step | ремонт сколов, скол на лобовом стекле | RU `ремонт сколов` 1106 imp / 0 cl; `скол на лобовом стекле` 423 imp / 5 cl | **P1** |
| 62 | `windshield-crack-repair-size-limit` | საქარე მინის ბზარის შეკეთება — ზომის ლიმიტი | Трещина на лобовом — до какой длины ремонтируют | Windshield crack repair — size limits | ремонт трещин лобового стекла | HF dict #1 | **P1** |
| 63 | `windshield-repair-vs-replacement` | შეკეთება თუ შეცვლა — გადაწყვეტა (დეტალური) | Ремонт или замена лобового — как выбирать | Windshield repair vs replacement — deep dive | ремонт стекол авто | existing `replace-or-repair` is umbrella; this = decision tree | **P2** |
| 64 | `mobile-windshield-repair-on-site` | საქარე მინის აღდგენა გამოძახებით | Ремонт лобового с выездом в Тбилиси | Mobile windshield repair on-site | ремонт с выездом | KA `საქარე მინის შეცვლა გამოძახებით` 131 imp / 2 cl | **P2** |
| 65 | `windshield-polishing-micro-scratch` | საქარე მინის პოლირება — მიკროხაზების მოცილება | Полировка лобового стекла — убираем микроцарапины | Windshield glass polishing — micro-scratch removal | полировка лобового стекла | competitor autoqimwmenda.ge; specific angle | **P2** |
| 66 | `modern-windshields-sensors-cameras` | თანამედროვე საქარე მინები — სენსორები, კამერები | Современные стёкла с сенсорами и камерами — нюансы ремонта | Modern windshields with sensors & cameras | камеры на лобовом, обогрев | technical gap | **P2** |
| 67 | `windshield-night-visibility-issues` | ღამის ხილვადობა საქარე მინაზე — მიზეზები | Плохая видимость ночью через стекло — причины | Poor night visibility through windshield | потеря видимости лобового | commercial intent | **P2** |
| 68 | `winter-windshield-care-cracks-prevention` | ზამთრის მოვლა — ბზარის თავიდან აცილება | Зимний уход — как избежать трещин лобового | Winter windshield care — crack prevention | зимний уход | seasonal | **P3** |
| 69 | `deep-crack-rescue-last-chance` | ღრმა ბზარი — შეგიძლიათ გადაარჩინოთ? | Глубокая трещина — последний шанс спасти | Deep crack rescue — last chance | глубокая трещина лобовое | urgent-intent | **P3** |
| 70 | `insurance-windshield-claim-georgia` | დაზღვევა საქართველოში — საქარე მინის დაფარვა | Страховка Грузия — покрытие лобового стекла | Windshield insurance coverage in Georgia | страховка стекло | commercial angle | **P3** |

---

## /carwash (8 новых — **новый кластер с 0 статей**)

Pillar keyword: `მანქანის რეცხვა` / `автомойка тбилиси` / `car wash`.

| # | Slug | Title (KA) | Title (RU) | Title (EN) | Primary HF | GSC signal | Priority |
|---|---|---|---|---|---|---|---|
| 71 | `detailing-wash-explained` | დეტეილინგ რეცხვა — რა განსხვავება ჩვეულებრივისგან? | Детейлинг-мойка — чем отличается от обычной | What is detailing wash — how it differs | детейлинг мойка, детейлинг мойка что это | RU `детейлинг мойка` 553 imp / 5 cl; `детейлинг мойка что это` 133 imp / 0 cl | **P1** |
| 72 | `2-phase-vs-3-phase-wash` | 2-ფაზიანი vs 3-ფაზიანი რეცხვა — სხვაობა | 2-фазная vs 3-фазная мойка — разница | 2-phase vs 3-phase car wash explained | 2 фазная мойка | service-specific | **P1** |
| 73 | `contactless-wash-vs-hand` | უკონტაქტო vs ხელით რეცხვა — რისკები ლაქისთვის | Бесконтактная vs ручная мойка — риски для лкп | Contactless vs hand wash — paint risks | бесконтактная мойка, безопасная мойка | dict HF `ბესконтактная мойка` | **P1** |
| 74 | `wash-schedule-tbilisi-weather` | რეცხვის გრაფიკი თბილისში — ზაფხული/ზამთარი | График мойки в Тбилиси — как часто по сезонам | Car wash schedule by Tbilisi season | мойка по сезонам | seasonal; general intent | **P2** |
| 75 | `wash-with-ceramic-ppf-care` | რეცხვა კერამიკით/PPF-ით — უსაფრთხო ქიმია | Мойка авто с керамикой и PPF — какая химия | Washing cars with ceramic or PPF — safe chemistry | мойка авто с керамикой | cross-link to ceramic/PPF clusters | **P1** |
| 76 | `pressure-washer-diy-danger` | PPF-ი და კერამიკა vs მაღალი წნევის | Мойка мойкой высокого давления — чего избегать | Pressure washer at home — what to avoid | мойка высокого давления | technical warning | **P2** |
| 77 | `engine-bay-wash-safety` | ძრავის განყოფილების რეცხვა — უსაფრთხო? | Мойка подкапотки — безопасно или нет | Engine-bay wash — is it safe? | мойка моторного отсека | cross-sell angle | **P2** |
| 78 | `wash-subscription-pass` | რეცხვის აბონემენტი — ღირს თუ არა | Абонемент мойки — выгода, варианты | Monthly wash subscription — worth it? | абонемент мойки | business model | **P3** |

---

## /interior-cleaning (14 новых)

Pillar keyword: `მანქანის ქიმწმენდა` / `химчистка авто тбилиси` / `car interior cleaning`.

| # | Slug | Title (KA) | Title (RU) | Title (EN) | Primary HF | GSC signal | Priority |
|---|---|---|---|---|---|---|---|
| 79 | `chem-cleaning-tbilisi-prices` | ქიმწმენდა თბილისში — სრული გზამკვლევი | Химчистка Тбилиси — цены и студии | Chemical cleaning Tbilisi — full guide | ქიმწმენდა თბილისში, химчистка тбилиси | KA 1331 imp / 3 cl; RU 538 imp / 3 cl (обе #1 signals) | **P1** |
| 80 | `salon-detailing-explained` | სალონის დეტეილინგი — რა შედის? | Детейлинг салона — что входит | Interior salon detailing — what's included | детейлинг салона авто | RU 631 imp / 0 cl (huge gap) | **P1** |
| 81 | `interior-disinfection-ozone` | სალონის ოზონოთერაპია — დეზინფექცია | Дезинфекция салона озоном — как работает | Cabin ozone disinfection explained | дезинфекция салона автомобиля | RU 250 imp / 0 cl | **P1** |
| 82 | `smoker-cabin-nicotine-removal` | მწეველის მანქანის ქიმწმენდა — ნიკოტინი, სუნი | Химчистка машины курильщика — никотин, запах | Cabin chem-clean for smokers — nicotine & odor | химчистка салона курильщика | competitor autoqimwmenda.ge | **P1** |
| 83 | `pet-hair-cabin-removal` | ცხოველების ბეწვის ამოღება სალონიდან | Удаление шерсти животных из салона | Pet hair removal from car interior | шерсть от животных салон | priala.ge category | **P2** |
| 84 | `leather-seat-restoration` | ტყავის სავარძლების აღდგენა — ბზარები, ფერი | Восстановление кожаных сидений — трещины, цвет | Leather seat restoration — cracks and colour | восстановление кожи салона | priala.ge, competitor | **P1** |
| 85 | `fabric-seat-stain-guide` | ქსოვილის სავარძლების ლაქების მოცილება | Пятна на тканевых сиденьях — чем выводить | Fabric seat stain removal guide | пятна на сиденьях | common search | **P2** |
| 86 | `wrong-chemicals-damage-plastic` | არასწორი ქიმია — პლასტიკის დაზიანება | Неправильная химия портит пластик салона — как избежать | Wrong chemicals that damage interior plastic | уход за пластиком салона | competitor autoqimwmenda.ge | **P2** |
| 87 | `headliner-cleaning-dangers` | ჭერის წმენდა — რატომ ძნელი | Химчистка потолка авто — тонкости | Headliner cleaning — why it's tricky | химчистка потолка салона | niche but commercial | **P2** |
| 88 | `mold-mildew-cabin-flood` | ობობა/ობი სალონში — წყლის შემდეგ | Плесень в салоне после протечки — как вывести | Mold/mildew after cabin water damage | плесень в салоне | urgent-intent | **P2** |
| 89 | `interior-ceramic-after-cleaning` | ქიმწმენდის შემდეგ — კერამიკული დაცვა | После химчистки — керамика салона для защиты | Post-cleaning interior ceramic protection | защита салона после химчистки | cross-link to ceramic | **P2** |
| 90 | `salon-vacuum-vs-dry-clean` | მტვერსასრუტი vs ქიმწმენდა — სხვაობა | Пылесос vs химчистка — в чём разница | Vacuum vs dry-cleaning — what's the difference | пылесос против химчистки | educational | **P3** |
| 91 | `bolt-yandex-driver-detailing` | Bolt/Yandex მძღოლისთვის — სალონის გრაფიკი | Bolt/Yandex-водителю — график химчистки салона | Bolt/Yandex drivers — cabin detail schedule | химчистка для такси | market-specific; high-usage profile | **P2** |
| 92 | `post-interior-cleaning-mistakes` | ქიმწმენდის შემდეგ — top 5 შეცდომა | После химчистки — 5 главных ошибок владельца | Top 5 mistakes after interior cleaning | ошибки после химчистки | competitor autoqimwmenda.ge | **P2** |

---

## Umbrella / General detailing (8 новых)

| # | Slug | Title (KA) | Title (RU) | Title (EN) | Primary HF | GSC signal | Priority |
|---|---|---|---|---|---|---|---|
| 93 | `detailing-center-tbilisi` | დეტეილინგ ცენტრი თბილისში — რას ითვალისწინება | Детейлинг-центр в Тбилиси — критерии выбора | Detailing center Tbilisi — what to look for | детейлинг центр, детейлинг студия | RU `детейлинг центр` 749 imp / 0 cl; `детейлинг студия` 531 imp / 0 cl | **P1** |
| 94 | `detailing-services-all-in-one` | ავტო დეტეილინგის სრული სპექტრი BESTAUTO | Все детейлинг-услуги — сводный гайд | Full-spectrum car detailing services | детейлинг услуги | RU `детейлинг услуги` 469 imp / 0 cl | **P1** |
| 95 | `winter-detailing-tbilisi` | ზამთრის დეტეილინგი თბილისში — მარილი, ლაფი | Зимний детейлинг в Тбилиси — соль, слякоть | Winter detailing Tbilisi — salt, slush | зимний уход | seasonal counterpart to `summer-car-care-georgia` | **P2** |
| 96 | `5-year-ownership-detailing-plan` | 5-წლიანი მფლობელობის გეგმა | План детейлинга на 5 лет владения | 5-year ownership detailing plan | детейлинг график, долгосрочный уход | TCO/umbrella | **P2** |
| 97 | `lease-return-detailing-prep` | სალიზინგო/დაქირავებული ავტოს დაბრუნება | Возврат авто после лизинга/аренды — детейлинг | Lease-return detailing prep | лизинг авто возврат | niche-commercial | **P3** |
| 98 | `detailing-brands-we-use` | რომელ მასალებს ვიყენებთ — LLumar, Quantum | Какие материалы используем — бренды и почему | Detailing brands we use — LLumar, Quantum | материалы для детейлинга, бренды | trust-building | **P2** |
| 99 | `tbilisi-districts-detailing-delivery` | რა რაიონებში ემსახურებით — საბურთალო, გლდანი | В какие районы выезжаем — Сабуртало, Глдани | Tbilisi districts we serve — coverage map | geo qualifier | geo-local | **P3** |
| 100 | `detailing-faq-common-myths` | ხშირად დასმული კითხვები — 15 მითი | Детейлинг-мифы — разбираем 15 часто задаваемых | Detailing myths & FAQ — 15 common questions | faq по детейлингу | evergreen | **P2** |

---

## Расклад по приоритетам

| Priority | Kол-во | Описание |
|---|---|---|
| **P1** | 27 | Высокие GSC-показы (500+) и 0-3 клика — наибольший ROI, можно начать писать в первую очередь |
| **P2** | 49 | Средний трафик / competitor gap / commercial intent |
| **P3** | 24 | Long-tail, сезонное, niche |

**Первые 10 тем к реализации** (по убыванию ROI):
1. #79 `chem-cleaning-tbilisi-prices` — GSC 1331 imp (KA) + 538 imp (RU), минимум по 3 клика
2. #80 `salon-detailing-explained` — RU 631 imp / 0 cl
3. #26 `what-is-ppf-explainer` — 3 GSC-запроса суммарно 2300+ impressions
4. #1 `polish-cream-diy-vs-studio` — KA `მანქანის პოლირების კრემი` 1424 imp / 0 cl
5. #27 `ppf-full-body-wrapping-guide` — RU 705 imp + EN 1104 imp
6. #61 `chip-repair-process-step-by-step` — RU `ремонт сколов` 1106 imp / 0 cl
7. #71 `detailing-wash-explained` — RU `детейлинг мойка` 553 imp / 5 cl (кластер /carwash = 0 статей)
8. #93 `detailing-center-tbilisi` — RU `детейлинг центр` 749 imp / 0 cl
9. #49 `tint-60-percent-legal-georgia` — VLT-legal angle; трафик KA + RU
10. #50 `tint-percentage-explained` — RU `тонировка стекол` 805 imp / 0 cl

---

## Примечания по исполнению

1. **Языковая раскатка.** Каждая статья — 3 языка одним PR (KA primary, RU/EN параллельно). Перевод не машинный — пересказ с локализацией (KA/RU используют Russism уместно, EN — geo-qualified).

2. **Связка с editorial blog links.** Для каждой новой статьи после публикации — добавить 2-3 anchor-правила в `blog-links.ts` через `/blog-links <slug>` команду. Все новые статьи должны иметь pillar-ссылку на соответствующий service page.

3. **ВЧ-словарь.** Если предлагаемый primary HF не в `seo-service-keywords.ts` — сначала добавить (с GSC-комментарием), потом писать статью. Это предотвращает build-warning при следующей инъекции.

4. **Sanity-check:** перед публикацией каждой статьи проверить что её primary HF реально есть в GSC (не гипотеза) и что конкуренты не доминируют в выдаче.

5. **TCO темы (#23, 28, 96)** — требуют реальных цифр и долгосрочного отслеживания. Лучше писать после того как текущие SEO-изменения покажут 2-3 месяца данных.

6. **TIER-1 раскатка:** писать по 2-3 статьи/неделю — тогда за 12 недель выйдут все P1 темы (27 статей). После этого оценить GSC-реакцию и расставить приоритеты P2 по факту.

7. **Источник правды:** этот файл (`docs/content-roadmap.md`) — это живой roadmap, обновляется по мере написания статей (добавить столбец `Статус: planned/draft/published`).
