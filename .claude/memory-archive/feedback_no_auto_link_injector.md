---
name: No auto-inject of blog internal links
description: blog-internal-links.ts auto keyword-matcher is disabled by user decision — use manual/editorial link placement instead
type: feedback
originSessionId: e7edc367-f54c-473b-9b1b-1f7eebf3d0c4
---
Do NOT re-enable `injectBlogInternalLinks` (keyword-matcher) in `astro/src/pages/[...slug].astro:523`. It is commented out intentionally.

**Why:** User explicitly asked not to use the automatic keyword matcher. Automatic first-occurrence matching produces low-quality, generic anchors and can create awkward link placement inside article body text.

**How to apply:**
- When planning blog → service internal linking, design an **editorial / manual** approach: an explicit `{slug → [{anchor, targetUrl}]}` map maintained by hand, not regex keyword matching.
- Do not pitch "improve keyword list + turn the injector back on" — it's been rejected. Propose a curated data file (e.g. `astro/src/data/blog-links.ts`) with hand-picked anchor + target pairs per article.
- The import of `injectBlogInternalLinks` can stay (harmless), but don't un-comment the call unless the user explicitly asks.
- `blog-internal-links.ts` itself can remain as dead code reference — don't delete without approval.
