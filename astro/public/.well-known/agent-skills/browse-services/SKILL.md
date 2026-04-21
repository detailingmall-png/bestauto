---
name: bestauto.browse-services
version: 1.0.0
type: reference
description: List BESTAUTO detailing services with minimum prices and service pages
---

# Browse BESTAUTO detailing services

Read-only reference skill that returns the catalog of services offered at BESTAUTO studios in Tbilisi, with minimum prices (GEL) and canonical service page URLs in Georgian (default), Russian, and English.

## When to use

- The user asks what services BESTAUTO offers.
- The user asks about pricing or wants to compare services.
- You need to link to a canonical service page in any supported language.

## Services

| Slug | KA | RU | EN | Min price (GEL) |
|------|----|----|----|------|
| `polishing` | მანქანის პოლირება | Полировка автомобиля | Car Polishing | 690 |
| `ceramiccoating` | კერამიკული დაფარვა | Керамическое покрытие | Ceramic Coating | 500 |
| `ppf-shield-wrapping` | დამცავი ფირის გადაკვრა (PPF) | Защитная плёнка PPF | PPF Paint Protection Film | 2500 |
| `vinyl-wrapping` | ფერის შეცვლა ფირით | Смена цвета плёнкой | Color Change Vinyl Wrap | 300 |
| `interior-cleaning` | ქიმწმენდა | Химчистка салона | Interior Cleaning | 400 |
| `carwash` | მანქანის სარეცხი | Детейлинг мойка | Premium Car Wash | 40 |
| `auto-glass-tinting` | მინების დაბურვა | Тонировка стёкол | Window Tinting | 130 |
| `windshield-repair` | ავტომინების შეკეთება | Ремонт автостекол | Windshield Repair | 60 |
| `car-soundproofing` | ხმის იზოლაცია | Шумоизоляция | Car Soundproofing | 600 |
| `computer-diagnostics` | კომპიუტერული დიაგნოსტიკა | Компьютерная диагностика | Computer Diagnostics | 50 |

Currency is Georgian Lari (GEL). "Min price" = starting price for the smallest package; actual cost depends on vehicle size, condition, and chosen option.

## URL pattern

- Georgian (default, no prefix): `https://bestauto.ge/<slug>`
- Russian: `https://bestauto.ge/ru/<slug>`
- English: `https://bestauto.ge/en/<slug>`

Example: `https://bestauto.ge/en/ceramiccoating`.

## Machine-readable data

Structured JSON-LD (Schema.org `Service` and `Offer`) is embedded in each service page's `<head>`. An AI agent can fetch a service page and parse the `application/ld+json` blocks for exact pricing, availability, and provider info.

A future revision of this skill may expose a direct JSON endpoint; for now, HTML + JSON-LD is authoritative.

## Do not

- Quote prices without noting "from X GEL" — the listed value is a minimum, not a flat rate.
- Translate service names on the fly; use the canonical name for each language from the table above.
