---
name: SEO service-keyword dictionary
description: Single source of truth for HF search keywords per service × language; consumed by blog-links validator, planned for meta/schema/audit uses
type: project
originSessionId: e7edc367-f54c-473b-9b1b-1f7eebf3d0c4
---
**File:** `astro/src/data/seo-service-keywords.ts`
**Doc:** `docs/semantic-core.md`

## What it is

Canonical dictionary of high-frequency (ВЧ / HF) search keywords per service page per language (RU/KA/EN). 8 services × 3 langs. Top 5–8 keywords per slot, ordered by real-world signal:

1. **GSC** clicks/impressions for bestauto.ge over 16 months (`Downloads/gsc_service_pages_16months.csv`, 6.4k rows)
2. **Competitor scan** of Tbilisi auto-detailing sites (performance.ge, adetailing.ge, detailing-ge.com, servisebi.ge, nam.ge, fixup.ge, priala.ge, cleancar.ge, qimwmenda.ge)
3. **SERP intent check** — only commercial-intent terms, not informational
4. **KA disambiguation** — manual review for cannibalising terms (e.g. `მანქანის ფირი` ambiguous between PPF/vinyl → routed to PPF only)

## Why it matters

Reusable across the site beyond just blog links. Single place to look up "what do people actually search for this service in this language" — backed by real GSC data, not guesses.

## Current usage

- `lib/blog-links-inject.ts` calls `isKnownServiceKeyword(target, anchor, lang)` to validate every editorial blog→service anchor text. Unknown anchors trigger `unknown-keyword` warning at build time and get skipped.

## Planned usage

- Meta title/description rewrites (`{ka,ru,en}-seo-changes.ts`) — require top-2 HF terms per page
- Schema.org Service.name / alternateName per language
- Build-time on-page H2/FAQ keyword coverage audit
- Paid ad campaign targeting (single source of truth, not separate sheet)

## How to refresh

Quarterly:
```bash
cd "$HOME/Documents/Projects CODE/bestauto-content" && python3 scripts/gsc_export_2y.py
# Then update SERVICE_KEYWORDS_* arrays in seo-service-keywords.ts
# Add `// GSC: N clicks` or `// ALT: <competitor>` comments
```

## How to add a keyword

1. Confirm real GSC clicks for the term on target service page
2. (KA only) Verify a Georgian competitor uses it as H1/menu/title
3. Add to `SERVICE_KEYWORDS_{LANG}[target]` array in priority order (top = most clicks)
4. Comment the source

## Key disambiguation rules baked in

- **KA `მანქანის ფირი` (car film)** — ambiguous between PPF and vinyl in real searches. Routed ONLY to `/ppf-shield-wrapping` (protective connotation dominates). Use `ფირის გადაკვრა` or `ფერადი ფირის გადაკვრა` for `/vinyl-wrapping`.
- **KA `შუშის აღდგენა`** — too generic (could mean home/building glass). Excluded; competitors always qualify with `საქარე` (windshield).
- **EN "windshield repair", "window tinting", "auto glass repair"** — pull US Georgia state SERP without geo qualifier. Prefer `+ Tbilisi`.
- **`ფირის გადაკვრა`** — intentionally listed for BOTH `/ppf` and `/vinyl` because the term genuinely applies to both; the rule decides target via explicit href in `blog-links.ts`.

## Related

- Validation logic in `data/seo-service-keywords.ts:isKnownServiceKeyword()`
- Anchor injection logic in `lib/blog-links-inject.ts`
- Editorial rules in `data/blog-links.ts` (per-article anchor placements)
- Full narrative SEO report in `docs/semantic-core.md`
