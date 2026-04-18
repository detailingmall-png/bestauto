# Blog drafts — 100 статей × 3 языка

Исходные markdown-файлы для ручной публикации в Tilda. Каждая статья = 1 файл с тремя языковыми секциями (RU/KA/EN). Публикуются порциями по 2-3/неделю.

## Содержание директории

- `_template.md` — скелет для новой статьи (frontmatter + 3 языковых секции)
- `_pilot-chem-cleaning-tbilisi-prices.md` — одобренный пилот (тема #79, reference по стилю)
- `{slug}.md` × 99 — все остальные темы

## Публикационный workflow

Для каждой статьи:

1. **Открыть** `drafts/blog/{slug}.md` в текстовом редакторе
2. **Подобрать/сгенерировать фото для hero** (см. раздел «Фото для статьи» ниже) — обычно 1 hero + 2-4 inline шота
3. **Скопировать секцию нужного языка** (например всё между `## RU` и следующим `---`):
   - `**Hero title:**` и `**Hero subtitle:**` → в Tilda hero block (Title + Subtitle поля) + загрузить hero-фото
   - `**Meta title:**` и `**Meta description:**` → Tilda Settings → SEO (+ meta og:image = hero-фото)
   - Тело (H1, intro, H2 секции, FAQ, Заключение, CTA) → в TextPlus / Zero block article body; inline фото между H2 секциями где логично
4. **Создать страницу** в Tilda admin → получить numeric ID (~658xxxxx)
5. **Export HTML**: `Tilda admin → Export → Save to disk` → переместить в `/tilda-export/project6825691/page{ID}.html`
6. **Обновить** `page-map.json` — добавить запись:
   ```json
   {
     "pageId": "658xxxxx",
     "url": "https://bestauto.ge/ru/blog/{slug}",
     "path": "/ru/blog/{slug}",
     "title": "...",
     "lang": "ru",
     "slug": "blog/{slug}"
   }
   ```
7. **Astro build** → `cd astro && bun run build` → проверить что `astro/dist/ru/blog/{slug}.html` создан
8. **Commit + push** → Cloudflare Pages автоматом деплоит на prod
9. **Request Indexing в GSC** (первые дни публикации)

## Структура одного файла

```markdown
---
slug: polish-cream-diy-vs-studio
cluster: POL
target_service: /polishing
priority: P1
gsc_signal: "KA `მანქანის პოლირების კრემი` 1424/0"
primary_hf_ru: "..."
primary_hf_ka: "..."
primary_hf_en: "..."
secondary_links: ["/ppf-shield-wrapping"]
status: drafted
---

## RU

**Meta title:** ... (50-65 chars, информационный)
**Meta description:** ... (140-160 chars, образовательный)
**Hero title:** ... (40-70 chars)
**Hero subtitle:** ... (120-160 chars)

---

# H1 (совпадает с Hero title по теме)

Intro (100-150 слов)...

## H2 секции (5-7 шт, 200-350 слов каждая)

## FAQ
### Вопрос 1? Ответ...
(всего 5 вопросов)

## Заключение
Итог + bullet-список 3-5 ключевых выводов

## CTA
(обе студии: Гурамишвили 78 / +995 550 000 299 + Политковская 51 / +995 550 000 199)

---

## KA
(аналогично, +10-20% char к RU)

---

## EN
(аналогично, -10-15% char к RU)
```

## Все 100 тем

### POL — /polishing (14 статей)

| # | Slug | Priority | GSC signal |
|---|---|---|---|
| 1 | [polish-cream-diy-vs-studio](./polish-cream-diy-vs-studio.md) | P1 | KA `მანქანის პოლირების კრემი` 1424/0 |
| 2 | [interior-plastic-polish](./interior-plastic-polish.md) | P1 | RU 550/0 |
| 3 | [salon-polish-interior-detail](./salon-polish-interior-detail.md) | P1 | RU 765/2 |
| 4 | [steam-headlight-polishing](./steam-headlight-polishing.md) | P1 | RU 648/0 |
| 5 | [polishing-after-body-repair-guide](./polishing-after-body-repair-guide.md) | P1 | EN 412/0 |
| 6 | [polishing-old-cars-worth-it](./polishing-old-cars-worth-it.md) | P2 | competitor autoqimwmenda.ge |
| 7 | [pre-sale-polishing-resale-value](./pre-sale-polishing-resale-value.md) | P2 | competitor priala.ge |
| 8 | [abrasive-polishing-deep-dive](./abrasive-polishing-deep-dive.md) | P2 | dict HF |
| 9 | [polish-vs-wax-vs-ceramic-beginners](./polish-vs-wax-vs-ceramic-beginners.md) | P2 | educational |
| 10 | [mountain-trip-polish-check](./mountain-trip-polish-check.md) | P3 | geo |
| 11 | [polish-finish-types-matt-gloss-satin](./polish-finish-types-matt-gloss-satin.md) | P3 | dict expansion |
| 12 | [polishing-how-often-myth-bust](./polishing-how-often-myth-bust.md) | P3 | myth-busting |
| 13 | [headlight-polish-vs-replace](./headlight-polish-vs-replace.md) | P2 | RU 233/0 |
| 14 | [scratch-polish-guide](./scratch-polish-guide.md) | P2 | depth topic |

### CER — /ceramiccoating (11 статей)

| # | Slug | Priority | GSC signal |
|---|---|---|---|
| 15 | [ceramic-polishing-combo](./ceramic-polishing-combo.md) | P1 | KA 1077/39 |
| 16 | [interior-ceramic-detail](./interior-ceramic-detail.md) | P1 | RU 172/0 |
| 17 | [hydrophobic-windshield-coating](./hydrophobic-windshield-coating.md) | P2 | competitor |
| 18 | [ceramic-application-cost-breakdown](./ceramic-application-cost-breakdown.md) | P2 | RU 120/0 |
| 19 | [ceramic-prep-paint-correction](./ceramic-prep-paint-correction.md) | P2 | educational |
| 20 | [ceramic-over-ppf-layered](./ceramic-over-ppf-layered.md) | P2 | synthesis |
| 21 | [ceramic-product-lines-compared](./ceramic-product-lines-compared.md) | P3 | technical |
| 22 | [ceramic-tbilisi-climate](./ceramic-tbilisi-climate.md) | P3 | seasonal |
| 23 | [ceramic-5-year-tco](./ceramic-5-year-tco.md) | P3 | TCO |
| 24 | [maintenance-wash-ceramic](./maintenance-wash-ceramic.md) | P2 | cross-link |
| 25 | [ceramic-vs-wax-vs-sealant](./ceramic-vs-wax-vs-sealant.md) | P2 | umbrella |

### PPF — /ppf-shield-wrapping (13 статей)

| # | Slug | Priority | GSC signal |
|---|---|---|---|
| 26 | [what-is-ppf-explainer](./what-is-ppf-explainer.md) | P1 | 2300+ imp combined |
| 27 | [ppf-full-body-wrapping-guide](./ppf-full-body-wrapping-guide.md) | P1 | RU 705 + EN 1104 |
| 28 | [ppf-vs-ceramic-vs-vinyl](./ppf-vs-ceramic-vs-vinyl.md) | P1 | synthesis |
| 29 | [ppf-protection-levels-partial-full](./ppf-protection-levels-partial-full.md) | P1 | RU 329/0 |
| 30 | [ppf-self-healing-explained](./ppf-self-healing-explained.md) | P2 | technical |
| 31 | [ppf-for-new-cars-checklist](./ppf-for-new-cars-checklist.md) | P2 | new-car angle |
| 32 | [ppf-matte-satin-finish-options](./ppf-matte-satin-finish-options.md) | P2 | dict long-tail |
| 33 | [ppf-edge-peeling-troubleshoot](./ppf-edge-peeling-troubleshoot.md) | P2 | service-depth |
| 34 | [ppf-pricing-georgia-2026](./ppf-pricing-georgia-2026.md) | P1 | pricing intent |
| 35 | [ppf-brand-comparison-llumar-luxarmor-quantum](./ppf-brand-comparison-llumar-luxarmor-quantum.md) | P2 | brand comparison |
| 36 | [ppf-anti-gravel-focused](./ppf-anti-gravel-focused.md) | P2 | dict HF |
| 37 | [ppf-hood-only-partial-wrap](./ppf-hood-only-partial-wrap.md) | P3 | common question |
| 38 | [ppf-removal-how-to](./ppf-removal-how-to.md) | P3 | service-depth |

### VIN — /vinyl-wrapping (10 статей)

| # | Slug | Priority | GSC signal |
|---|---|---|---|
| 39 | [car-body-wrap-cost-guide](./car-body-wrap-cost-guide.md) | P1 | RU 470/0 |
| 40 | [black-gloss-wrap-popular-choice](./black-gloss-wrap-popular-choice.md) | P2 | RU 155/1 |
| 41 | [wrap-color-options-finishes](./wrap-color-options-finishes.md) | P2 | variant expansion |
| 42 | [carbon-fiber-vinyl-wrap](./carbon-fiber-vinyl-wrap.md) | P2 | competitor |
| 43 | [wrap-vs-paint-cost-lifetime](./wrap-vs-paint-cost-lifetime.md) | P1 | business decision |
| 44 | [interior-decor-vinyl-film](./interior-decor-vinyl-film.md) | P3 | competitor |
| 45 | [chrome-delete-vinyl](./chrome-delete-vinyl.md) | P2 | service-specific |
| 46 | [vinyl-wrap-care-maintenance](./vinyl-wrap-care-maintenance.md) | P2 | complements existing |
| 47 | [wrap-removal-residue](./wrap-removal-residue.md) | P3 | service-depth |
| 48 | [wedding-photoshoot-wrap](./wedding-photoshoot-wrap.md) | P3 | unique angle |

### TIN — /auto-glass-tinting (12 статей)

| # | Slug | Priority | GSC signal |
|---|---|---|---|
| 49 | [tint-60-percent-legal-georgia](./tint-60-percent-legal-georgia.md) | P1 | KA 325/4 + RU 147/2 |
| 50 | [tint-percentage-explained](./tint-percentage-explained.md) | P1 | RU 805/0 |
| 51 | [reflective-vs-dark-tint-heat](./reflective-vs-dark-tint-heat.md) | P1 | competitor |
| 52 | [front-windshield-tint-rules](./front-windshield-tint-rules.md) | P1 | RU 129/0 |
| 53 | [tint-ceramic-vs-atermal-vs-dyed](./tint-ceramic-vs-atermal-vs-dyed.md) | P1 | type comparison |
| 54 | [window-tint-process-detailed](./window-tint-process-detailed.md) | P2 | competitor |
| 55 | [anti-uv-anti-rust-tint](./anti-uv-anti-rust-tint.md) | P2 | competitor |
| 56 | [tint-removal-bubbles](./tint-removal-bubbles.md) | P2 | service-depth |
| 57 | [tint-care-fresh-install](./tint-care-fresh-install.md) | P2 | complement to existing |
| 58 | [mobile-tinting-on-location](./mobile-tinting-on-location.md) | P2 | dict HF |
| 59 | [how-to-choose-tint-film](./how-to-choose-tint-film.md) | P2 | competitor |
| 60 | [windshield-tint-strip-header](./windshield-tint-strip-header.md) | P3 | niche |

### WIN — /windshield-repair (10 статей)

| # | Slug | Priority | GSC signal |
|---|---|---|---|
| 61 | [chip-repair-process-step-by-step](./chip-repair-process-step-by-step.md) | P1 | RU 1106/0 + 423/5 |
| 62 | [windshield-crack-repair-size-limit](./windshield-crack-repair-size-limit.md) | P1 | HF dict #1 |
| 63 | [windshield-repair-vs-replacement](./windshield-repair-vs-replacement.md) | P2 | decision tree |
| 64 | [mobile-windshield-repair-on-site](./mobile-windshield-repair-on-site.md) | P2 | KA 131/2 |
| 65 | [windshield-polishing-micro-scratch](./windshield-polishing-micro-scratch.md) | P2 | competitor |
| 66 | [modern-windshields-sensors-cameras](./modern-windshields-sensors-cameras.md) | P2 | technical |
| 67 | [windshield-night-visibility-issues](./windshield-night-visibility-issues.md) | P2 | commercial intent |
| 68 | [winter-windshield-care-cracks-prevention](./winter-windshield-care-cracks-prevention.md) | P3 | seasonal |
| 69 | [deep-crack-rescue-last-chance](./deep-crack-rescue-last-chance.md) | P3 | urgent |
| 70 | [insurance-windshield-claim-georgia](./insurance-windshield-claim-georgia.md) | P3 | commercial |

### WSH — /carwash (8 статей)

| # | Slug | Priority | GSC signal |
|---|---|---|---|
| 71 | [detailing-wash-explained](./detailing-wash-explained.md) | P1 | RU 553/5 + 133/0 |
| 72 | [2-phase-vs-3-phase-wash](./2-phase-vs-3-phase-wash.md) | P1 | service-specific |
| 73 | [contactless-vs-hand-wash](./contactless-vs-hand-wash.md) | P1 | dict HF |
| 74 | [wash-schedule-tbilisi-weather](./wash-schedule-tbilisi-weather.md) | P2 | seasonal |
| 75 | [wash-with-ceramic-ppf-care](./wash-with-ceramic-ppf-care.md) | P1 | cross-link |
| 76 | [pressure-washer-diy-danger](./pressure-washer-diy-danger.md) | P2 | technical warning |
| 77 | [engine-bay-wash-safety](./engine-bay-wash-safety.md) | P2 | cross-sell |
| 78 | [wash-subscription-pass](./wash-subscription-pass.md) | P3 | business model |

### INT — /interior-cleaning (14 статей)

| # | Slug | Priority | GSC signal |
|---|---|---|---|
| 79 | [chem-cleaning-tbilisi-prices](./_pilot-chem-cleaning-tbilisi-prices.md) (pilot) | P1 | **KA 1331/3 + RU 538/3** |
| 80 | [salon-detailing-explained](./salon-detailing-explained.md) | P1 | RU 631/0 |
| 81 | [interior-disinfection-ozone](./interior-disinfection-ozone.md) | P1 | RU 250/0 |
| 82 | [smoker-cabin-nicotine-removal](./smoker-cabin-nicotine-removal.md) | P1 | competitor |
| 83 | [pet-hair-cabin-removal](./pet-hair-cabin-removal.md) | P2 | priala.ge |
| 84 | [leather-seat-restoration](./leather-seat-restoration.md) | P1 | priala.ge |
| 85 | [fabric-seat-stain-guide](./fabric-seat-stain-guide.md) | P2 | common search |
| 86 | [wrong-chemicals-damage-plastic](./wrong-chemicals-damage-plastic.md) | P2 | competitor |
| 87 | [headliner-cleaning-dangers](./headliner-cleaning-dangers.md) | P2 | niche commercial |
| 88 | [mold-mildew-cabin-flood](./mold-mildew-cabin-flood.md) | P2 | urgent intent |
| 89 | [interior-ceramic-after-cleaning](./interior-ceramic-after-cleaning.md) | P2 | cross-link |
| 90 | [salon-vacuum-vs-dry-clean](./salon-vacuum-vs-dry-clean.md) | P3 | educational |
| 91 | [bolt-yandex-driver-detailing](./bolt-yandex-driver-detailing.md) | P2 | market-specific |
| 92 | [post-interior-cleaning-mistakes](./post-interior-cleaning-mistakes.md) | P2 | competitor |

### GEN — umbrella / general (8 статей)

| # | Slug | Priority | GSC signal |
|---|---|---|---|
| 93 | [detailing-center-tbilisi](./detailing-center-tbilisi.md) | P1 | RU 749/0 |
| 94 | [detailing-services-all-in-one](./detailing-services-all-in-one.md) | P1 | RU 469/0 |
| 95 | [winter-detailing-tbilisi](./winter-detailing-tbilisi.md) | P2 | seasonal |
| 96 | [5-year-ownership-detailing-plan](./5-year-ownership-detailing-plan.md) | P2 | TCO umbrella |
| 97 | [lease-return-detailing-prep](./lease-return-detailing-prep.md) | P3 | niche commercial |
| 98 | [detailing-brands-we-use](./detailing-brands-we-use.md) | P2 | trust building |
| 99 | [tbilisi-districts-detailing-delivery](./tbilisi-districts-detailing-delivery.md) | P3 | geo-local |
| 100 | [detailing-faq-common-myths](./detailing-faq-common-myths.md) | P2 | evergreen |

## Приоритетная раскатка

**P1 (32 статьи) — топ ROI, высокие GSC-показы + низкие клики**
— Рекомендовано публиковать первыми. Покрывают все 9 кластеров, начинай с Pilot #79 (уже одобрен) и топ-трафиковых #26 (PPF-explainer, 2300+ imp), #1 (POL, 1424 KA imp), #61 (chip-repair, 1106 RU imp).

**P2 (49 статей) — средний трафик + competitor gap + commercial intent**
— После выхода P1. Включают depth-articles и сравнения.

**P3 (19 статей) — long-tail, seasonal, niche**
— Последние. Добавят корпус и покрытие редких запросов.

## Фото для статьи

Каждая статья нуждается минимум в **одном hero-фото** (open graph + верх статьи) и **2-4 inline фото** между H2-секциями. Ниже — где искать, как генерировать, какие должны быть.

### Иерархия источников (по убывающему приоритету)

**1. Архив BESTAUTO (идеал)** — собственные фото работ в студии.
- Плюсы: уникальность, аутентичность, полная совместимость с бренд-эстетикой (тёмный бокс, золотой акцент).
- Минусы: надо вручную отбирать из архива, не всегда есть шот под конкретный угол.
- **Когда использовать**: всегда, если есть подходящий шот на конкретную тему (полировка фар, оклейка PPF на капот, химчистка салона и т.д.).

**2. AI-генерация через fal.ai / Flux / SDXL** — fallback, когда в архиве нет подходящего кадра.
- Плюсы: безлимит, кастом под статью, быстро.
- Минусы: риск generic-AI-look если промпт плохой; не всегда физически корректно (отражения, детали).
- **Когда использовать**: для декоративных inline-шотов, абстрактных концепт-визуалов (физика SiO₂, схема слоёв PPF), когда в архиве пусто.
- **Skill**: `fal-ai-media` — text-to-image через MCP, поддерживает Flux / Nano Banana / SDXL.
- **Модель**: Flux 1.1 Pro Ultra или Flux Dev для детализированных реалистичных кадров.

**3. Stock НЕ использовать** — категорически (per §5 guidelines). Unsplash/Pexels/Shutterstock одинаковые фото всплывают на сотнях сайтов, убивают доверие.

### Эстетика (бренд-правила BESTAUTO)

Все фото должны соответствовать визуальному языку сайта (см. `.claude/rules/ui-ux-guide.md` §12):

- **Тёмный студийный фон** — чёрный или тёмно-серый бокс с точечной LED-подсветкой. НЕ дневной свет на улице, НЕ белый фон.
- **Близкие крупные планы** процесса или детали — не общие виды машины целиком.
- **Драматичное освещение** — контровый свет, рефлексы, мокрые поверхности после мойки.
- **Золотой/тёплый акцент** где возможно (блики, отражения в лаке).
- **Премиум-бренды машин без логотипа**: BMW M-силуэт, Porsche 911, Mercedes AMG, Audi RS, Range Rover. Для AI-генерации — избегать видимых лого и эмблем.
- **Избегать**: яркая дневная съёмка, белый фон, stock-постановка, логотипы конкурентов (студий), зеркалки в отражении, фото китайских тюнинг-плёнок «с перепечатанным брендом».

### Шот-guidance по кластерам

Для каждого кластера — типичные удачные ракурсы:

**POL — полировка**
- Hero: полировочная машинка в действии на тёмном лаке, золотые блики, микрофибра рядом
- Inline: 50/50 до-после половины капота, толщиномер лака на детали, этапы пасты разных зёрен
- Специфика #4 (headlights): макро фары с голограммами до → прозрачными после

**CER — керамика**
- Hero: вода каплями скатывается с чёрного капота после дождя (гидрофобный эффект)
- Inline: нанесение керамики аппликатором, блик от свежего слоя, контейнер Gyeon
- Специфика #17 (hydrophobic windshield): капли на стекле с scraping-эффектом

**PPF — защитная плёнка**
- Hero: мастер натягивает прозрачную плёнку на капот, рука в перчатке, 45° угол
- Inline: сравнение сколов на обычной детали vs защищённой, срез слоёв плёнки (схема), ролл плёнки на столе
- Специфика #35 (brand comparison): 3 флакона/листа Llumar+LuxArmor+Quantum на тёмном фоне

**VIN — виниловая оклейка**
- Hero: машина наполовину в чёрном глянце, наполовину в исходном цвете
- Inline: нож подрезает плёнку на кромке, сатин/мат/глянец рядом для сравнения
- Специфика #45 (chrome delete): до/после оконной рамки

**TIN — тонировка**
- Hero: процесс наклейки плёнки на заднее стекло изнутри, тёмный бокс
- Inline: тонометр показывает VLT%, 3 уровня плёнки 20/35/70 на стекле
- Специфика #49/52 (legal): градиент затемнения с метками % и пометкой законной зоны

**WIN — ремонт стекла**
- Hero: инжектор на лобовом, УФ-лампа 365нм, капля смолы
- Inline: bullseye/star/combination 3 типа сколов макро, до-после ремонта свежего скола
- Специфика #66 (ADAS): крепление камеры за зеркалом крупным планом

**WSH — мойка**
- Hero: активная пена на капоте Range Rover, радужные блики
- Inline: микрофибра в двухведёрной системе, pH-нейтральный шампунь крупно
- Специфика #75 (ceramic/PPF wash): капли воды на покрытии vs обычном лаке

**INT — химчистка**
- Hero: экстрактор вытягивает грязную воду из чёрного кожаного сиденья
- Inline: до-после обивки, парогенератор на торпедо, озонатор в закрытом салоне
- Специфика #84 (leather): ланолиновый кондиционер на макро-текстуре кожи

**GEN — umbrella**
- Hero: общий вид бокса BESTAUTO с инструментами и оборудованием
- Inline: разные процессы кратко, финальный блик на детейлинг-готовом авто
- Специфика #98 (brands-we-use): лого Llumar, LuxArmor, Quantum, Gyeon, Koch Chemie на полке (только whitelist)

### AI-генерация: базовый prompt template

Для Flux / SDXL через fal.ai. Базовый шаблон, который адаптируется под шот:

```
Premium automotive detailing studio photo, dark industrial workshop,
dramatic LED key light from left, warm amber rim light, macro close-up of
[SPECIFIC SHOT — e.g. "hand in black nitrile glove applying ceramic coating
applicator on black car paint, water beading effect"], shallow depth of
field, f/1.8 aperture, 85mm lens, Nikon Z8 quality, photorealistic, no
brand logos visible, moody automotive photography style, commercial-grade,
cinematic lighting, 8K detail
```

Негативные промпты:
```
white background, bright daylight, stock photo, logo, watermark, text,
cartoon, anime, 3d render, plastic look, oversaturated, low quality
```

**Per-cluster примеры промптов**:

- POL hero: `rotary polisher on glossy black car hood, golden reflection, micro-scratches becoming mirror-smooth, macro detail of pad and paste`
- CER hero: `hydrophobic water beads rolling off ceramic-coated black carbon hood, raindrops spherical and glossy, dark garage background`
- PPF hero: `technician's gloved hand installing transparent paint protection film on white supercar fender, film edge clearly visible, studio lighting`
- TIN hero: `film being applied to rear window interior, squeegee removing bubbles, transparent dark tint layer, technician silhouette backlit`
- WIN hero: `resin injector bridge on windshield, UV lamp 365nm purple glow, chip being sealed, macro close-up`
- WSH hero: `foam cannon spraying pH-neutral snow foam on black luxury sedan hood, rainbow reflections, detailed water droplets`
- INT hero: `wet-dry extractor pulling dirty water from black leather car seat, steam rising, detailed fabric texture`
- GEN hero: `cinematic wide shot of premium detailing bay at night, rolling tool chest, polisher on stand, ambient blue and amber LED strips`

### Технические спецификации

Все фото перед загрузкой в Tilda:

| Параметр | Hero | Inline |
|---|---|---|
| Формат | WebP (primary) + JPG fallback | WebP |
| Разрешение | 1920×1080 (16:9) | 1200×800 (3:2) |
| Размер файла | < 300 KB (Squoosh 75% quality) | < 150 KB |
| Цветовой профиль | sRGB | sRGB |
| Сжатие | Squoosh / Squoosh CLI / cwebp | то же |

### Alt-текст (обязательно)

Каждое фото в Tilda получает описательный alt-атрибут с primary HF:

**Формат**: `{действие/объект} — {контекст bestauto}`

Примеры:
- `Полировка лака BMW на ротационной машинке — детейлинг-студия BESTAUTO`
- `Нанесение керамики Gyeon на капот Porsche — студия BESTAUTO в Тбилиси`
- `Ремонт скола на лобовом стекле инжектором — BESTAUTO windshield repair`

**Per-lang**: alt должен быть на языке страницы (RU для /ru/, KA для /, EN для /en/).

### Именование файлов

`{slug}-{shot-type}-{lang}.webp`

Примеры:
- `polish-cream-diy-vs-studio-hero-ru.webp`
- `ppf-full-body-wrapping-guide-step-application-en.webp`
- `chem-cleaning-tbilisi-prices-before-after-ka.webp`

Если фото одинаковое на всех 3 языках (hero обычно) — можно без lang-суффикса: `{slug}-hero.webp`.

### Куда складывать файлы

**До публикации в Tilda**:
- Локальная папка `drafts/blog-images/{slug}/` (создавать по мере написания)
- В Tilda **НЕ** загружать заранее — только при создании страницы, чтобы не плодить orphan файлы

**После публикации**:
- Tilda автоматически хостит картинки на своём CDN
- В Astro-export HTML картинки указывают на `https://static.tildacdn.com/...` — это нормально

### Когда какой источник использовать (decision tree)

1. **Техническая близкая деталь процесса** (макро инжектор, паста на поролоне, слой керамики) → AI-генерация Flux (реалистично при хорошем промпте)
2. **Машина конкретной модели в studio setting** (BMW, Porsche, Range Rover на тёмном фоне) → AI-генерация Flux; избегать видимых эмблем
3. **Реальные «до/после» работы BESTAUTO** → архив студии (100% приоритет, даже если качество среднее)
4. **Концепт/схема** (3D слои плёнки, физика self-healing, шкала VLT) → AI-генерация или minimal vector иллюстрация
5. **Бренд-материалы (Gyeon, Koch Chemie упаковки)** → фото с сайта производителя (permission) ИЛИ из архива студии
6. **Люди**: избегать лиц (privacy, model-release). Показывать руки в перчатках, силуэты против света.

### Minimum viable photos per article (МVP)

Если бюджет на фото ограничен — приоритеты:
1. **Hero** (обязательно) — 1 шт, без него статья выглядит стоком в Tilda blog-карточке
2. **Inline #1** (обязательно) — между H2 #2 и #3, разбивает текст
3. **Inline #2** (желательно) — перед FAQ или перед Заключением
4. **Inline #3-4** (опционально) — для длинных статей >2000w

Если совсем нет времени — **1 только hero** допустим для P2/P3 статей, но для P1 (top GSC ROI) — минимум hero + 2 inline.

## Общие правила содержания (см. `docs/blog-article-guidelines.md`)

- Длины: RU 1300-2200 слов; KA chars +10-20%; EN chars −10-15%
- Цены только из §8a.1 (snapshot прайса), формат «от X ₾»
- Бренды только whitelist: PPF=Llumar/LuxArmor/Quantum, Ceramic=Gyeon, Tinting=LLumar/LuxArmor, Wash=Koch Chemie
- Для POL/VIN/WIN/INT — whitelist не установлен → дженерик без конкретных брендов
- Ссылки ведут на сервис-страницы (`/ppf-shield-wrapping`, `/polishing` и т.д.), НЕ на `/prices`
- CTA во всех статьях перечисляет обе студии (Гурамишвили 78 / Политковская 51) с телефонами
- Районы (Глдани / Сабуртало / Лило / Ваке) НЕ упоминаются — только улицы

## Статус publikacij

Все 100 статей помечены в frontmatter как `status: drafted`. После публикации в Tilda обновлять на `status: published` + фиксировать дату публикации.

Планка публикации по договоренности с юзером — 2-3 статьи в неделю, в порядке приоритета P1 → P2 → P3.

## Ссылки

- **Гайдлайны**: `/docs/blog-article-guidelines.md` — все правила с чек-листом
- **Roadmap**: `/docs/content-roadmap.md` + `/docs/content-roadmap.csv` — исходная разбивка 100 тем
- **HF-словарь**: `/astro/src/data/seo-service-keywords.ts` — все ключи по сервисам × языкам
- **Editorial links**: `/astro/src/data/blog-links.ts` — rules для автоматической расстановки ссылок blog→service
- **Прайс snapshot**: `/docs/blog-article-guidelines.md` §8a.1 — все цены из `/prices` на момент написания
