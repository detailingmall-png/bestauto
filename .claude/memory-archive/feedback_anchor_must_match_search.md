---
name: Blog link anchors must match real search queries
description: editorial blog→service links: anchor must be a real user search query, not a descriptive phrase from the article
type: feedback
originSessionId: e7edc367-f54c-473b-9b1b-1f7eebf3d0c4
---
When picking anchor text for internal blog→service links (astro/src/data/blog-links.ts), the anchor MUST be a phrase users actually type into Google — not a descriptive excerpt from the article.

**Why:** Anchors carry ranking signal only when they match search intent. A descriptive phrase like "Полировка уменьшает завихрения" is a sentence fragment, not a query — it contributes nothing to SEO and wastes the link slot. User called this out 2026-04-17 on the pilot `blog/ceramic-coating-for-car` mapping.

**How to apply:**
- Before accepting an anchor, ask: would a user paste this into Google to find this service? If no → reject.
- Prefer: "полировка перед керамикой", "полировка кузова", "защитная PPF-пленка", "керамическое покрытие", "тонировка стекол".
- Avoid: "правильно отполирована", "усиливает глубину цвета", "наша услуга", "подробнее", "профессиональная полировка в студии BESTAUTO" (too branded).
- When writing a rule, the anchor substring inside `contextQuote` should be the keyword, and the quote should be the surrounding uniquely-identifying sentence.
- Balance across an article: 60% longtail keywords ("полировка перед керамикой"), 30% shorter keywords ("керамическое покрытие"), 10% branded/generic ("узнать цены"). Never all exact-match short keywords (Penguin penalty).
