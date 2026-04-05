# UI Review: bestauto.ge

**Date**: 2026-04-05
**Viewport tested**: Desktop 1280x800, Mobile 375x812
**Pages audited**: /ru/ (homepage), code audit across all generators
**Baseline**: `.claude/rules/ui-ux-guide.md` (Design System v1)

---

## Overall Score: 17/24

| Pillar | Score | Verdict |
|--------|-------|---------|
| Copywriting | 3/4 | GOOD |
| Visuals | 3/4 | GOOD |
| Color | 3/4 | GOOD |
| Typography | 3/4 | GOOD |
| Spacing | 2/4 | NEEDS WORK |
| Experience Design | 3/4 | GOOD |

---

## 1. Copywriting — 3/4

### PASS
- **Result-oriented sticky CTA** on mobile: "Zapisat'sya na besplatnyj osmotr" (Записаться на бесплатный осмотр) — describes outcome, not action
- **Service card descriptions** are specific and technical: "Невидимая защита от сколов, царапин и UV — гарантия 10 лет"
- **Prices visible** on every card ("от 350 ₾") — transparency principle followed
- **Professional voice** — technical terms used without marketing fluff
- **Trust signals** placed near decision points: "4.9 ★★★★★ (173)" Google rating next to reviews
- **Contact section heading** uses result language: "для бесплатной консультации"
- **Footer nav** contains key pages (Цены, Преимущества, Услуги, Блог)

### ISSUES
| Severity | Issue | Location |
|----------|-------|----------|
| HIGH | Hero CTA says "Получить консультацию" (generic action) — guide mandates result-oriented text like "Записаться на бесплатный осмотр" | Hero Zero Block button |
| LOW | "Подробнее →" on service cards is adequate but could be more specific ("Узнать цену →") | services-grid.ts |

---

## 2. Visuals — 3/4

### PASS
- **Premium dark theme** with studio photography — aligns with brand principle "Премиальная сдержанность"
- **Service cards** with photo + gradient overlay + text — well-executed visual hierarchy
- **Review cards** on white background contrasting with dark page — readable and trustworthy
- **Google branding** in reviews widget (colored wordmark, stars) — authentic trust signal
- **WhatsApp FAB** positioned correctly (bottom-right, green, 56px)
- **Brand logos** section (LLUMAR, QUANTUM, etc.) — professional material certification
- **Video gallery** with 9:16 aspect ratio and play overlay — correct per guide
- **Consistent card styling**: 16px border-radius, gradient overlays, hover scale

### ISSUES
| Severity | Issue | Location |
|----------|-------|----------|
| MEDIUM | Gallery section is 7838px tall at desktop — excessively long, consider pagination or "load more" | rec2072063053 |
| LOW | WhatsApp button overlaps "Подробнее →" text on some mobile service cards | Floating button z-index |

---

## 3. Color — 3/4

### PASS
- **14-color palette** properly defined as CSS tokens in `:root {}` (bestauto-custom.css)
- **Token usage** consistent in all major components (services grid, reviews, process steps, contact form)
- **Gradient overlays** on service cards match guide spec exactly
- **Opacity scale** for white text (1.0 → 0.8 → 0.7 → 0.6 → 0.3) correctly applied
- **Google review card** white background (#ffffff) provides needed contrast relief
- **Gold accent** (#e4c97e) used consistently for CTA buttons, icons, hover states
- **Focus indicator** gold outline on interactive elements

### ISSUES
| Severity | Issue | Location |
|----------|-------|----------|
| CRITICAL | `#eee` (light grey) used in windshield-faq.ts — **NOT in design palette** | windshield-faq.ts:126 |
| CRITICAL | `#222222` (dark grey) used in windshield-faq.ts — **NOT in design palette** | windshield-faq.ts:103 |
| HIGH | 9 hardcoded hex colors across TS generators instead of CSS tokens | blog-cta.ts:91-94, brand-logos.ts:40, windshield-faq.ts:101-126 |
| HIGH | `#e4c97e` hardcoded instead of `var(--ba-color-accent)` in blog-cta.ts | blog-cta.ts:91,93 |
| HIGH | `#d4b96e` hardcoded instead of `var(--ba-color-accent-hover)` in blog-cta.ts | blog-cta.ts:94 |
| HIGH | `rgba(228,201,126,0.8)` hardcoded instead of token in brand-logos.ts | brand-logos.ts:40 |

---

## 4. Typography — 3/4

### PASS
- **TildaSans** is the only font — no external fonts loaded (performance win)
- **Desktop font sizes** match guide: H1=42px, H2=36px, service card h3=24px (tier1), body=15-18px
- **Mobile font sizes** scale correctly: service card h3=20px (guide says 20px), body=14px
- **Font weights** use design tokens (400/500/600/700) consistently
- **Line height** standardized: 1.2-1.35 for headings, 1.5-1.6 for body
- **t502/t508 CSS overrides** use `inherit !important` pattern — effectively neutralizes inline Tilda customstyle
- **Heading hierarchy** maintained (H1 > H2 > H3) across generators
- **No text below 12px** anywhere on the site
- **`overflow-wrap: break-word`** on H1/H2 for long Georgian words

### ISSUES
| Severity | Issue | Location |
|----------|-------|----------|
| MEDIUM | t502 item titles have inconsistent `<strong>` wrapping — items 1 & 3 are bold, items 2 & 4 are not (visually the same due to CSS but semantically inconsistent) | rec588593935 (t502 block) |
| LOW | Tilda inline `data-customstyle` still present in HTML — CSS overrides work but fragile if new Tilda blocks added | Tilda export HTML files |

---

## 5. Spacing — 2/4

### PASS
- **8px grid** strictly followed in custom `ba-*` components
- **Services grid gap**: 24px — matches guide requirement
- **Hero proximity principle**: subtitle→CTA gap (62px) > H1→subtitle gap (40px) at 1280px
- **Section padding** responsive: 60-80px desktop, 48px tablet, 32-48px mobile
- **Service card padding**: 40px 32px (tier1), 24px 20px (tier2) — matches guide
- **Review card padding**: 20px — matches guide
- **FAQ max-width**: 800px narrow container for readability — matches guide

### ISSUES
| Severity | Issue | Location |
|----------|-------|----------|
| CRITICAL | **~930px white gap** between services grid (ends y=5130) and reviews section (starts y=6059) on mobile 375px — hidden Tilda recs create dead whitespace | Between ba-services-grid and rec758383531 |
| CRITICAL | **~734px white gap** between reviews section (ends y=6738) and gallery header (starts y=7472) on mobile 375px | Between rec758369923 and rec713423972 |
| HIGH | On Chrome at certain viewports (606px CSS), the entire services section + middle page renders as massive white void (~4000px) — likely viewport-dependent rendering issue | Full page flow |
| LOW | Gallery padding 40px — not on 8px grid scale (should be 32px or 48px) | gallery-inject.ts:23 |

---

## 6. Experience Design — 3/4

### PASS
- **Skip-link** present ("К основному контенту") — accessibility requirement met
- **`prefers-reduced-motion`** implemented — disables all animations for vestibular disorders
- **Focus-visible** gold outline on burger menu and interactive elements
- **Keyboard navigation** in lightbox (Escape, arrow keys, Tab)
- **Form inputs 48px** minimum height — touch target requirement met
- **`role="alert"`** on form error messages
- **`aria-required`** on required form fields
- **All images have `alt`** text (service cards, gallery, review avatars)
- **`loading="lazy"`** on all below-fold images
- **`lang` attribute** correctly set per page language (ru/en/ka)
- **Sticky mobile CTA** in thumb zone (bottom of screen)
- **Desktop navigation**: horizontal menu with 6 links + CTA button + language switcher — PASS (not burger)
- **Mobile navigation**: burger menu — PASS (correct for <=980px)
- **Click-to-call** on phone numbers
- **Two studio selector** with expandable cards in contact section

### ISSUES
| Severity | Issue | Location |
|----------|-------|----------|
| MEDIUM | Missing `:active` and `:disabled` button states — guide specifies exact styling for both | blog-cta.ts, all CTA generators |
| MEDIUM | Missing `aria-label` on windshield FAQ accordion trigger button | windshield-faq.ts:121 |
| MEDIUM | Cannot verify "one H1 per page" rule across all page templates without full audit | All service pages |
| LOW | Service card `<a>` links lack descriptive `aria-label` (content is visually clear) | services-grid.ts:173-206 |

---

## Top 5 Fixes (Priority Order)

1. **CRITICAL — Fix white gaps between sections**: Hidden Tilda recs between services grid and reviews/gallery create ~930px and ~734px of dead whitespace. Identify and remove/collapse these empty blocks or set `display:none` on zero-content recs.

2. **CRITICAL — Replace out-of-palette colors**: `#eee` and `#222222` in windshield-faq.ts are not in the design palette. Replace with appropriate tokens or add to the token system if needed.

3. **HIGH — Replace all hardcoded hex colors with CSS tokens**: 9 instances across blog-cta.ts, brand-logos.ts, and windshield-faq.ts. Use `var(--ba-color-accent)`, `var(--ba-color-accent-hover)`, etc. for maintainability.

4. **HIGH — Fix hero CTA text**: Change "Получить консультацию" to result-oriented "Записаться на бесплатный осмотр" to match the mobile sticky CTA and the guide's copywriting principles.

5. **MEDIUM — Add missing button states and aria-labels**: Implement `:active` and `:disabled` CTA states per guide spec. Add `aria-label` to windshield FAQ trigger button.

---

## What Works Well

- Premium dark aesthetic is cohesive and well-executed
- Service cards with gradient overlays are polished and readable
- Google Reviews integration feels authentic (real data, proper branding)
- Mobile experience is strong: sticky CTA, single-column cards, thumb-zone optimized
- Design token system is comprehensive (14 colors, 9 spacing values, 6 radii)
- Accessibility foundations are solid (skip-link, reduced-motion, focus-visible, aria)
- Typography is clean and consistent with proper responsive scaling
- TildaSans-only approach keeps font loading fast

---

**Audited by**: 6-Pillar UI Audit
**Methodology**: Visual inspection (preview screenshots + CSS inspection) + code review (CSS tokens, TS generators, HTML structure)
