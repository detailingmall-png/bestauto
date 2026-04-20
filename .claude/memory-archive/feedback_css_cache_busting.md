---
name: CSS cache busting on Cloudflare
description: bestauto-custom.css cached by Cloudflare CDN for 30 days; must bump ?v= query param after every CSS change
type: feedback
---

After editing `astro/public/css/bestauto-custom.css`, ALWAYS bump the cache-busting version parameter in `astro/src/layouts/TildaPageLayout.astro`:

```html
<link rel="stylesheet" href="/css/bestauto-custom.css?v=3">
<!--                                                   ^^^ increment this -->
```

**Why:** Cloudflare CDN caches static CSS with `max-age=2592000` (30 days). Without bumping the version, the CDN serves the stale cached file even after a successful deploy. The user confirmed the fix wasn't visible on production in incognito — the old CSS was being served from Cloudflare edge cache.

**How to apply:** Every time `bestauto-custom.css` is modified, increment the `?v=N` parameter by 1 in `TildaPageLayout.astro` in the same commit. Current version: `?v=10`.
