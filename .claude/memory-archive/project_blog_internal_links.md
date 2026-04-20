---
name: Editorial blog→service link mechanism
description: Build-time injector for HF-keyword anchors from blog articles to service pages — full architecture, validation pipeline, workflow
type: project
originSessionId: e7edc367-f54c-473b-9b1b-1f7eebf3d0c4
---
**Doc:** `docs/blog-internal-links.md` (full guide)

## Quick reference

**Goal:** raise pillar service pages in Google search via internal anchor-text signal from blog articles.

**Approach (Variant A):** editor-picked rules with `originalPhrase` (existing text in article HTML) + `anchor` (HF search query that becomes link text). Injector replaces phrase with `<a>anchor</a>` at build time. Allows inserting HF queries that don't naturally exist in article body.

## Architecture (3 files)

| File | Role |
|---|---|
| `astro/src/data/blog-links.ts` | Editor-picked rules per article: `{contextQuote, originalPhrase, anchor, target, role}` |
| `astro/src/lib/blog-links-inject.ts` | Build-time injector with 4 validation checks |
| `astro/src/data/seo-service-keywords.ts` | HF keyword dictionary (also has its own memory: `project_seo_keywords.md`) |

Wired via `[...slug].astro:528`.

## 4 validation checks (in order)

1. **Anchor in HF dictionary** — `isKnownServiceKeyword(target, anchor, lang)`. Failure = warning only (does NOT skip).
2. **contextQuote unique** — must occur EXACTLY once in article HTML. Failure = `ambiguous` or `miss`, skips.
3. **originalPhrase inside contextQuote** — sanity check. Failure = `bad-rule`, skips.
4. **No duplicate stems** — anchor's new words mustn't share root (first 5 chars) with other words in quote. Prevents "Полировка кузова... подготавливает кузов". Failure = `dup-stem`, skips.

## Build log

```
[blog-links] blog/{slug} ({lang}): applied=N missed=N ambiguous=N unknown-kw=N dup-stem=N
```

Healthy = `applied=N, rest=0`.

## Adding a new article rule

1. Pick 2–3 target services
2. Pick anchors from `seo-service-keywords.ts` (top HF for each target)
3. Find unique `contextQuote` in article HTML; pick `originalPhrase` inside it
4. Add to `BLOG_LINKS_{LANG}` array in `blog-links.ts`
5. `npm run build` — verify `applied=N, all warnings=0`
6. Spot-check `astro/dist/{lang}/blog/{slug}.html` for the anchors

## Anchor diversity rules

Per article: 60% long-tail, 30% mid-frequency, 10% generic/branded. Never 3× short exact-match (Penguin penalty).

## Multi-language

Three rule arrays: `BLOG_LINKS_RU`, `BLOG_LINKS_KA`, `BLOG_LINKS_EN`. Currently RU only is populated. KA + EN dictionaries ready in `seo-service-keywords.ts`, pending article-rule writeup.

## Roles (documentation field, not used by injector)

- `pillar` — canonical service for this article
- `bridge` — related/complementary service
- `cta` — soft commercial call-to-action

## Hard rules baked in

- **Old auto keyword-matcher** (`blog-internal-links.ts`) is **permanently disabled** by user — see `feedback_no_auto_link_injector.md`. Never re-enable.
- **Anchors must be real search queries** — see `feedback_anchor_must_match_search.md`. Reject descriptive sentence fragments.

## Related

- Pilot: `blog/ceramic-coating-for-car` (RU) with 3 anchors — live in prod
- Companion dict memory: `project_seo_keywords.md`
- Full doc: `docs/blog-internal-links.md`
- SEO context: `docs/semantic-core.md`
