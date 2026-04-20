---
name: SEO guide mandatory check
description: Before ANY site change (new page, edit page, add block), ALWAYS read reference_seo_guide.md and follow its checklists
type: feedback
---

Before ANY change to bestauto.ge (adding pages, editing content, creating blocks, changing meta tags), ALWAYS read and follow the SEO guide at `reference_seo_guide.md`.

**Why:** The site has a complex build-time SEO pipeline (seo.ts, html-extractor.ts, meta-overrides.ts, service-faqs.ts, page-map.json). Missing any step (e.g. forgetting to add slug to page-map.json, or not adding FAQ data for a new service) silently breaks hreflang, schema, or meta optimization. The user invested significant effort in building this SEO foundation and expects it maintained.

**How to apply:** Treat this like the UI/UX guide — mandatory pre-flight check. For new pages: run the "new page" checklist. For new services: update 3 files (SERVICES in seo.ts, SERVICE_FAQS, page-map.json). For edits: run the "edit" checklist. Always verify build + dist output.
