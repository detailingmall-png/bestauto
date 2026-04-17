---
description: Generate 2-3 editorial blog→service internal link rules for a blog article across all 3 languages (RU/KA/EN). Outputs code ready to paste into blog-links.ts.
---

# /blog-links

Generate internal-link rules for a blog article. Produces 2-3 high-quality anchor placements per language pointing to relevant service pages, using the HF keyword dictionary for validation.

## Usage

```
/blog-links <article-slug>
/blog-links ceramic-coating-maintenance
/blog-links ppf-benefits
/blog-links car-body-polishing
```

Optional flags (after slug):
- `--langs ru,ka,en` — which languages to process (default: all 3)
- `--apply` — automatically insert rules into `astro/src/data/blog-links.ts` + run build to verify (default: propose only, let user review first)

## Process

### Step 1: Resolve article

Confirm `{slug}` exists in all requested languages. Paths:
- RU: `astro/dist/ru/blog/{slug}.html`
- KA: `astro/dist/blog/{slug}.html` (no lang prefix — KA is default)
- EN: `astro/dist/en/blog/{slug}.html`

If missing in one language, warn and continue with the rest.

If the slug already has rules in `blog-links.ts`, warn: "Rules exist for this article. Overwrite? (yes/no)". Wait for user.

### Step 2: Spawn extraction agent

Launch a `general-purpose` agent with the brief below. The agent does the heavy lifting (reads article HTML, proposes rules, validates against dictionary). This keeps the main session context clean.

**Agent brief template:**

```
Generate editorial blog→service link rules for ONE blog article on bestauto.ge across N languages.

Article slug: {slug}
Languages: {langs}

## Required reading FIRST
1. docs/blog-internal-links.md — mechanism + validation rules
2. astro/src/data/seo-service-keywords.ts — HF dict (anchors MUST come from here)
3. astro/src/data/blog-links.ts — existing rules for format reference

## Article HTML paths
- RU: astro/dist/ru/blog/{slug}.html
- KA: astro/dist/blog/{slug}.html
- EN: astro/dist/en/blog/{slug}.html

## For each language:
1. Read the article HTML
2. Extract article body (inside `<div field="text" class="t-text...">`). IGNORE: nav, related-services (.ba-related), reviews (.ba-reviews), CTA block, footer.
3. Identify 2-3 service targets from the 8 options: /polishing, /ceramiccoating, /ppf-shield-wrapping, /vinyl-wrapping, /auto-glass-tinting, /windshield-repair, /carwash, /interior-cleaning
4. For each target, find a UNIQUE sentence in the body that can carry the anchor
5. Pick anchor from SERVICE_KEYWORDS_{LANG}[target] (exact match required)
6. Set originalPhrase = existing substring inside contextQuote (often same as anchor; shorter if text-edit to insert HF phrase)

## 4 validation checks — pre-empt all at extraction time:
1. Anchor must be in HF dict for the right language
2. contextQuote MUST be unique in the full HTML (grep to verify)
3. originalPhrase MUST be a substring of contextQuote
4. If anchor adds new words vs originalPhrase, their first-5-char stems must NOT appear elsewhere in contextQuote (the "dup-stem" check)

## Anchor diversity per article
- Mix long-tail / mid / core — don't make all 3 short exact-match HF queries
- Pick different pillar anchor variants across articles (Penguin protection)

## KA rules
- Don't use `მანქანის ფირი` for /vinyl (reserved for /ppf)
- Don't use bare `შუშის აღდგენა` (too generic — use `საქარე მინის აღდგენა`)

## Output: 3 TypeScript code blocks

```
### RU rules
```ts
{
  article: 'blog/{slug}',
  links: [
    { role: 'pillar', target: '/SERVICE', anchor: '...', originalPhrase: '...', contextQuote: '...' },
    { role: 'bridge', target: '/SERVICE', anchor: '...', originalPhrase: '...', contextQuote: '...' },
  ],
},
```
(same for KA, EN — one rule block each)

## Honesty
If you can't find a clean 3rd anchor in some language, output 2 + inline `// TODO: couldn't find clean 3rd`. Better than forcing a bad rule.
```

### Step 3: Present rules to user

Show the 3 code blocks from agent output. For each, briefly mention:
- Target services chosen and why
- Any TODOs / missing placements
- Anchor diversity summary

Ask: "Apply these rules to `blog-links.ts`? (yes/edit/no)"

### Step 4: Apply (if user confirms)

Insert the three rule objects into the appropriate arrays in `astro/src/data/blog-links.ts`:
- RU rules → `BLOG_LINKS_RU`
- KA rules → `BLOG_LINKS_KA`
- EN rules → `BLOG_LINKS_EN`

Insert alphabetically by slug within each array, or append at end. Preserve formatting and comments.

### Step 5: Build and verify

```bash
cd astro && npm run build 2>&1 | grep -E "\[blog-links\].*{slug}"
```

Expected output:
```
[blog-links] blog/{slug} (ru): applied=N missed=0 ambiguous=0 unknown-kw=0 dup-stem=0
[blog-links] blog/{slug} (ka): applied=N missed=0 ambiguous=0 unknown-kw=0 dup-stem=0
[blog-links] blog/{slug} (en): applied=N missed=0 ambiguous=0 unknown-kw=0 dup-stem=0
```

Every non-zero warning counter → show the warning line above the summary and either:
- Fix the rule inline and rebuild
- Remove the rule and leave a TODO comment

### Step 6: Spot-check rendered HTML

For each language, verify anchors appear in body (not in related-services block):

```bash
grep -oE 'href="/{lang-prefix}/SERVICE"[^>]*>[^<]+</a>' astro/dist/{lang}/blog/{slug}.html
```

Confirm anchor texts match what was proposed.

### Step 7: Summarize to user

Report:
- Total rules inserted (should be 6-9: 2-3 per language × 3 langs)
- Any TODOs remaining
- Build log line for each language
- Link to preview: `https://bestauto.ge/{lang}/blog/{slug}` (production) or preview server for localhost

Then ask: "Commit these changes? Commit message suggestion: `feat: add editorial blog links for {slug} (RU/KA/EN)`"

Do NOT commit automatically unless `--commit` flag was passed.

## Edge cases

**Article missing in one language:** Proceed with the rest, output a clear note: `// skipped: {slug} not present in {lang}`.

**Article already has rules:** Ask user to confirm overwrite. If yes, remove the old block entirely before inserting new.

**Agent proposes unknown-keyword anchor:** Flag to user — either add the anchor to `seo-service-keywords.ts` with GSC evidence, or pick a different anchor from the dict.

**Agent proposes dup-stem rule:** Ask agent for alternative anchor variant. Don't force it through — let the build warning catch it as last resort.

**Build shows `miss`:** Article body changed since rule was written. Re-read the body, update contextQuote to a currently-present unique sentence.

## Files touched

- `astro/src/data/blog-links.ts` (add rules)
- Nothing else (dictionary + injector + docs are unchanged)

## Related docs

- `docs/blog-internal-links.md` — full mechanism + validation details
- `docs/semantic-core.md` — why we chose these HF keywords
- `astro/src/data/seo-service-keywords.ts` — the HF dictionary itself
