---
name: Discontinued services
description: Services removed from live site — artifacts, SEO handling, and blog-article guards
type: project
originSessionId: e7edc367-f54c-473b-9b1b-1f7eebf3d0c4
---
# Discontinued services on bestauto.ge

Two services are not live on the site:

1. **interior-restoration** — removed from project 2026-04-17 (commit on branch `chore/remove-interior-restoration`)
2. **paintless-dent-repair (PDR)** — discontinued earlier, only code-level guards

**Why:** Owner (user) confirmed these pages are not live and should not be rebuilt.

**How to apply:**
- Do NOT link to `/interior-restoration`, `/ru/interior-restoration`, `/en/interior-restoration` in any new content.
- Do NOT link to `/paintless-dent-repair` variants.
- Do NOT include these services in SEO strategies, SERVICE_SLUGS, service-faqs.
- 4 orphan blog articles about restoration live in `DISCONTINUED_BLOG_SLUGS` (blog-grid.ts):
  `blog/plastic-elements-restoration`, `blog/restoring-car-seats`, `blog/steering-wheel-restoration`, `blog/why-restore-interior-elements`
- 3 orphan PDR blog articles: `blog/pdr-method`, `blog/pdr-after-hail`, `blog/pdr-guidelines-and-techniques`
- These orphan articles are filtered from blog grid + sitemap but still exist in `page-map.json`.
- Cloudflare `_redirects` handles 301s from old URLs to `/interior-cleaning` for SEO — DO NOT remove these 301 rules.
- 23 Tilda HTML pages (other services/pages) still contain `/interior-restoration` links in menus — Cloudflare 301s them. Cleanup of source links is optional future work.

**Live services (10):** polishing, ceramiccoating, ppf-shield-wrapping, vinyl-wrapping, interior-cleaning, carwash, auto-glass-tinting, windshield-repair, car-soundproofing, computer-diagnostics.
