# BestAuto.ge — Project Structure & Architecture

## Location
`/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/`

## Architecture
Hybrid Tilda + Astro SSG. Tilda provides visual design (exported HTML). Astro transforms, injects data, optimizes, and outputs pure static HTML. Hosted on Cloudflare Pages.

## Top-Level
```
bestauto-site/
├── astro/              # Main Astro SSG project (Node 22+)
├── tilda-export/       # Raw Tilda page exports (source HTML)
├── studio/             # Sanity Studio (CMS backend)
├── docs/               # Documentation
├── .github/            # GitHub Actions (deploy, fetch-reviews)
├── page-map.json       # OLD metadata index (NOT used by build — kept for reference only)
└── sync_tilda_export.py # Tilda sync script
```

## Astro Project (`astro/`)
```
astro/
├── src/
│   ├── lib/            # 26 TypeScript modules (core pipeline)
│   ├── data/           # Static data (FAQs, locations, reviews.json, meta-overrides)
│   ├── pages/          # Route files ([...slug].astro, locations/[location].astro)
│   └── layouts/        # TildaPageLayout.astro (single layout for all pages)
├── public/
│   ├── css/            # 226 Tilda CSS files + bestauto-custom.css (design tokens)
│   ├── js/             # 239 Tilda JS files + tracking.js
│   ├── fonts/          # TildaSans variable font
│   ├── images/         # 1566 images
│   └── videos/         # Hero video (desktop/mobile MP4 + HLS)
├── dist/               # Build output (static HTML)
├── tilda-export -> ../tilda-export/project6825691  # Symlink
├── astro.config.mjs    # Site config (static output, i18n: ka/ru/en)
└── package.json        # Astro 6.1.1, Sanity, sitemap
```

## Key Build Scripts
- `npm run dev` — dev server with hot reload
- `npm run build` — production build to dist/
- `npm run preview` — preview built site (port 4322)

## Core Lib Files (`astro/src/lib/`)

### HTML Pipeline (the heart)
| File | What it does |
|------|-------------|
| **html-extractor.ts** | MAIN PIPELINE: extracts head/nav/body from Tilda HTML, defers scripts (3.5s/5s core + interaction-gated analytics 15s/20s fallback), inlines all CSS, removes replaced scripts, injects shims |
| **shared-blocks.ts** | Extracts & injects shared blocks (header, footer, WhatsApp) across pages |
| **pages.ts** | Page data loader from page-map.json; route helpers |
| **page-map.json** | **ACTUAL** page metadata used by build (NOT the root page-map.json). Maps page IDs to file/slug/lang/title. Some pages use non-numeric IDs (e.g. `ppf_new_ka` → `page_ppf_new_ka.html`) |

### Shims (replace heavy Tilda JS)
| File | Replaces | Savings |
|------|----------|---------|
| **popup-shim.ts** | tilda-popup-3.1.min.js (3.4KB) | ~1KB inline |
| **slider-shim.ts** | tilda-slds-1.4.min.js (39KB) | ~1.5KB inline |
| **gallery-inject.ts** | tilda-zoom + tilda-slds + hammer.js (72KB) | ~2.5KB inline lightbox |

### Content Generators
| File | What it generates |
|------|------------------|
| **hero-block.ts** | Hero video injection into Zero Block (t396), build-time CSS calc |
| **services-grid.ts** | Homepage services grid (Tier 1 + Tier 2 cards with gradient overlays) |
| **reviews-widget.ts** | Google Reviews carousel from reviews.json |
| **video-gallery.ts** | Video gallery section (9:16 cards with play overlay) |
| **faq-accordion.ts** | Native `<details>/<summary>` FAQ (no JS) |
| **faq-section.ts** | FAQ section with FAQPage JSON-LD schema |
| **blog-grid.ts** | Blog article grid from page-map.json |
| **blog-cta.ts** | CTA section for blog articles |
| **brand-logos.ts** | Brand logos grid (multilingual) |
| **process-steps.ts** | "How it works" 4-step process section |
| **related-services.ts** | Related services carousel |
| **prices-inject.ts** | Live Sanity pricing into Tilda prices page |
| **service-prices-inject.ts** | Service-specific price injection |
| **location-page.ts** | Studio location pages (address, hours, FAQ) |

### SEO & Data
| File | What it does |
|------|-------------|
| **seo.ts** | hreflang, BreadcrumbList, Service/FAQPage/Article/Organization schemas |
| **sanity.ts** | Sanity CMS client (GROQ queries) |
| **sanity-inject.ts** | Injects Sanity data (phones, addresses, hours) |
| **image-dims.ts** | Precomputed image dimensions for width/height attributes |
| **webp-available.ts** | WebP availability detection |

### Data Files (`astro/src/data/`)
| File | Contents |
|------|---------|
| **service-faqs.ts** | FAQ Q&A for 10 services in ka/ru/en |
| **location-data.ts** | Studio locations (address, phone, hours, Maps embed) |
| **meta-overrides.ts** | OG meta tag overrides per page |
| **reviews.json** | Google Reviews snapshot (174 reviews, 4.9 stars, auto-updated daily) |

## Page Route (`[...slug].astro`)
Single catch-all route serving 210+ pages. Pipeline:
1. Load Tilda HTML from export
2. `extractSections()` — parse & optimize head/body
3. Inject Sanity data (prices, contacts)
4. Inject custom components (gallery, FAQ, reviews, video, services grid)
5. Generate SEO schemas
6. Wrap in TildaPageLayout
7. Output static HTML

Blog detection: `baseSlug === 'blog' || baseSlug.startsWith('blog/')`
Homepage detection: `baseSlug === ''`

## Deployment
```
git push main → GitHub Actions → npm run build → Cloudflare Wrangler → bestauto.ge
```
- **deploy.yml**: On push to main, builds & deploys
- **fetch-reviews.yml**: Daily at 4am UTC, fetches Google Reviews API, commits if changed, triggers deploy

## Tilda Export (`tilda-export/project6825691/`)
- 227 raw HTML files (`pageNNNNNNNNN.html`)
- Each ~500KB with inline styles/scripts
- CSS/JS/images directories
- This is the SOURCE OF TRUTH for page design

## Design System Files
- `.claude/rules/ui-ux-guide.md` — Master design tokens, typography, spacing, colors
- `public/css/bestauto-custom.css` — CSS custom properties (runtime tokens)
- `.interface-design/system.md` — Compact extract for interface-design skill

## Languages
3 languages: KA (Georgian, default, no prefix), RU (`/ru/`), EN (`/en/`)

## Key Technical Details
- `ZERO_BLOCK_CRITICAL_CSS` in html-extractor.ts inlines critical styles on ALL pages (font-face with `font-display:swap`, grid atoms, dark bg)
- Blog pages get `html{background-color:#fff}` override (dark text on transparent blocks)
- Scripts deferred in 4 tiers: core 3.5s, non-critical 5s, head analytics interaction-gated (15s fallback), external analytics interaction-gated (20s fallback + 3s inner delay)
- Core/non-critical scripts use requestIdleCallback; analytics use interaction gate (scroll/click/touch/keydown trigger)
- Tilda popup/slider/zoom/hammer/cover/fade-in/polyfill replaced or removed (~200KB savings)
- tilda-zero.js removed on homepage + pages without t396 blocks
- All page CSS inlined except forms (0 blocking CSS requests, forms async preload)
- CSS removal functions MUST run before inlineAllPageCss() — see project_pagespeed_optimization_rules.md
