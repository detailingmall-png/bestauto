# Blog drafts — 100 статей × 3 языка

Исходные markdown-файлы для ручной публикации в Tilda. Каждая статья = 1 файл с тремя языковыми секциями (RU/KA/EN). Публикуются порциями по 2-3/неделю.

## Содержание директории

- `_template.md` — скелет для новой статьи (frontmatter + 3 языковых секции)
- `_pilot-chem-cleaning-tbilisi-prices.md` — одобренный пилот (тема #79, reference по стилю)
- `{slug}.md` × 99 — все остальные темы

## Публикационный workflow

Для каждой статьи:

1. **Открыть** `drafts/blog/{slug}.md` в текстовом редакторе
2. **Скопировать секцию нужного языка** (например всё между `## RU` и следующим `---`):
   - `**Hero title:**` и `**Hero subtitle:**` → в Tilda hero block (Title + Subtitle поля)
   - `**Meta title:**` и `**Meta description:**` → Tilda Settings → SEO
   - Тело (H1, intro, H2 секции, FAQ, Заключение, CTA) → в TextPlus / Zero block article body
3. **Создать страницу** в Tilda admin → получить numeric ID (~658xxxxx)
4. **Export HTML**: `Tilda admin → Export → Save to disk` → переместить в `/tilda-export/project6825691/page{ID}.html`
5. **Обновить** `page-map.json` — добавить запись:
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
6. **Astro build** → `cd astro && bun run build` → проверить что `astro/dist/ru/blog/{slug}.html` создан
7. **Commit + push** → Cloudflare Pages автоматом деплоит на prod
8. **Request Indexing в GSC** (первые дни публикации)

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
