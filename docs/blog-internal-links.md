# Editorial blog → service internal links

> Mechanism that injects high-value internal links from blog articles to
> service pages (`/polishing`, `/ceramiccoating`, etc.) at build time —
> using **editor-picked, validated, ВЧ-keyword anchors** instead of regex
> keyword matching.

---

## Why this exists (and what it replaces)

**Replaces:** the disabled auto-matcher in `astro/src/lib/blog-internal-links.ts`
(do not re-enable; see `feedback_no_auto_link_injector.md`). The auto-matcher
produced low-quality anchors like `Полировка уменьшает завихрения` — sentence
fragments, not search queries.

**Goal:** raise pillar service pages in Google search by feeding them
internal anchor-text signal from related blog articles. Each article gets 2–3
anchors pointing to relevant services, where every anchor is a real
high-frequency (HF) search query (validated against
[`seo-service-keywords.ts`](../astro/src/data/seo-service-keywords.ts)).

**Approach:** Variant A — text-edit at injection time. The editor specifies
both an `originalPhrase` (existing text in the article HTML) and an `anchor`
(the HF search query that should become the link text). The injector
replaces the original phrase with `<a href=target>anchor</a>`. This lets us
insert HF-phrases that don't naturally exist in the article body without
re-editing the source. Example:

```
Article body: "Полировка уменьшает завихрения, ..."
Rule: originalPhrase="Полировка", anchor="Полировка авто"
Result:       "<a href='/ru/polishing'>Полировка авто</a> уменьшает завихрения, ..."
```

---

## Architecture

```
┌──────────────────────────────────┐
│ astro/src/data/blog-links.ts     │  Editor-picked rules:
│   BLOG_LINKS_RU = [...]          │  { article, links: [{role, target,
│   BLOG_LINKS_KA = [...]          │    anchor, originalPhrase, contextQuote}]}
│   BLOG_LINKS_EN = [...]          │
└────────────────┬─────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│ astro/src/lib/blog-links-inject.ts │  injectEditorialBlogLinks()
│   - find contextQuote (unique?)  │  Runs at build time per blog article
│   - check anchor vs HF dictionary│  via [...slug].astro:528.
│   - check duplicate-stem         │
│   - replace originalPhrase       │  Returns { html, stats: InjectionStats }.
│     with <a href>anchor</a>      │
└────────────────┬─────────────────┘
                 │ validates against
                 ▼
┌──────────────────────────────────┐
│ astro/src/data/seo-service-      │  isKnownServiceKeyword(target, anchor, lang)
│   keywords.ts                    │  Source of truth: GSC + competitor scan.
│   SERVICE_KEYWORDS_{RU,KA,EN}    │  See docs/semantic-core.md.
└──────────────────────────────────┘
```

Wired in [`[...slug].astro:526-532`](../astro/src/pages/[...slug].astro):

```ts
const editorialRules = getBlogLinksForLang(lang);
const injected = injectEditorialBlogLinks(mainContent, baseSlug, lang, editorialRules);
mainContent = injected.html;
if (injected.stats.applied + injected.stats.missed + ... > 0) {
  console.log(`[blog-links] ${baseSlug} (${lang}): applied=N missed=N ...`);
}
```

---

## The 4 validation checks

Each rule passes through 4 sequential checks. Failure logs a warning and
skips the rule (no link injected, build still succeeds).

### 1. Anchor must be a known HF keyword

`isKnownServiceKeyword(link.target, link.anchor, lang)` — case-insensitive
exact match against `SERVICE_KEYWORDS_{LANG}[target]` in
`seo-service-keywords.ts`.

Failure: `[blog-links] unknown-keyword … anchor "X" not in HF-list`. Does
NOT skip the rule (warning only) — but you should fix it: either add the
term to the dictionary (with GSC evidence) or pick a different anchor.

### 2. `contextQuote` must be unique in article HTML

Found exactly once. Two indexOf calls — first occurrence + second
occurrence. If second exists → ambiguous.

Failure: `[blog-links] ambiguous … contextQuote matches multiple times`.
Skips the rule. Fix: extend the contextQuote with surrounding text until
unique.

If not found at all → `[blog-links] miss … contextQuote not found`. Skips.
Usually means the article body changed and the rule needs re-editing.

### 3. `originalPhrase` must be inside `contextQuote`

`contextQuote.indexOf(originalPhrase) !== -1`. Sanity check that the editor
specified a phrase that actually exists in the chosen context.

Failure: `[blog-links] bad-rule … originalPhrase not inside contextQuote`.
Skips. Fix the rule.

### 4. No duplicate stems within the contextQuote

Words added by the anchor (vs. originalPhrase) must not have their root
already present in the rest of the contextQuote. Prevents awkward
repetitions like:

```
anchor: "Полировка кузова"
quote:  "Полировка уменьшает завихрения ... подготавливает кузов"
        → 2 × "кузов" stem → blocked
```

Algorithm: take each word ≥ 4 chars from anchor that's NOT in originalPhrase,
take its first 5 chars (Russian/KA stem heuristic), check if that stem
appears anywhere else in the contextQuote (case-insensitive).

Failure: `[blog-links] duplicate-stem … anchor word "X" root already
present elsewhere`. Skips. Fix: pick a different anchor variant from the
HF dictionary, or shorten the contextQuote so the duplicate falls outside.

---

## Build-time output

When at least one rule is touched for an article, you'll see:

```
[blog-links] blog/ceramic-coating-for-car (ru): applied=3 missed=0 ambiguous=0 unknown-kw=0 dup-stem=0
```

| Field | Meaning |
|---|---|
| `applied` | Rules successfully injected as links |
| `missed` | `contextQuote` not found OR `originalPhrase` not in quote |
| `ambiguous` | `contextQuote` found 2+ times |
| `unknown-kw` | Anchor not in HF dictionary (warning only, doesn't skip) |
| `dup-stem` | Duplicate-stem detector blocked the rule |

Healthy build: `applied = N, everything else = 0`.

---

## Quick start: adding rules for a new article

### The easy way — slash command

In a Claude session inside the `bestauto-site` repo, run:

```
/blog-links <article-slug>
```

Examples:
```
/blog-links ceramic-coating-maintenance
/blog-links ppf-benefits
/blog-links car-body-polishing --langs ru,ka
/blog-links polishing-cost-tbilisi --apply
```

What happens:
1. Claude checks the article exists in all 3 language builds.
2. Spawns a focused agent that reads each language version, proposes 2–3 rules per language, validates against the HF dictionary and all 4 build-time checks.
3. Returns 3 clean TypeScript code blocks (RU / KA / EN).
4. Asks you to confirm before editing `blog-links.ts`.
5. Runs `npm run build` and shows you the `[blog-links]` log line per language (should be `applied=N missed=0 ambiguous=0 unknown-kw=0 dup-stem=0`).
6. Shows spot-check grep output from rendered HTML.
7. Asks whether to commit.

Flags:
- `--langs ru,ka,en` — process only selected languages (default: all 3)
- `--apply` — skip the confirmation step, auto-insert and build

The slash command itself lives at `.claude/commands/blog-links.md`.

---

## Manual workflow (when you need fine control)

### 1. Pick the article and target services

Open the rendered HTML (e.g. `/ru/blog/{slug}`). Identify 2–3 service pages
that the article naturally relates to. Stick to 2–3 — over-linking
dilutes anchor signal.

### 2. Pick anchor texts from the HF dictionary

Open [`seo-service-keywords.ts`](../astro/src/data/seo-service-keywords.ts)
and pick the top-priority keyword for each target that fits grammatically
into the article text. Mix priorities: 60% long-tail, 30% mid, 10% generic
to avoid Penguin over-optimization (one anchor per article should be the
short HF, not all three).

#### Declension rule (Russian / Georgian — CRITICAL)

The injector substitutes `anchor` **verbatim** into the sentence in place of
`originalPhrase`. If the two differ in grammatical case, the surrounding text
becomes ungrammatical:

```
❌ anchor: 'керамическое покрытие'   (nominative)
   originalPhrase: 'керамическим покрытием'  (instrumental)
   → "На машине с керамическое покрытие задача…"  ← broken Russian

✓  anchor: 'керамическим покрытием'
   originalPhrase: 'керамическим покрытием'
   → "На машине с керамическим покрытием задача…"  ← correct
```

**Rule:** `anchor` must agree in grammatical case with `originalPhrase`.

- Safe default: `anchor === originalPhrase` — always grammatically consistent.
- Diverge only when `originalPhrase` is in nominative case (or stands alone
  after a dash / in parentheses), so substituting a different nominative-form
  HF keyword doesn't break the sentence.
- If you want the canonical nominative form as anchor but the only natural
  occurrence is inflected — find a different `originalPhrase` location
  (e.g. a sentence where the term appears in nominative), or accept the
  inflected form as anchor (Google understands Russian morphology).
- Add inflected-form anchors to `seo-service-keywords.ts` so `unknown-kw=0`
  stays clean in the build log.

### 3. Find unique contextQuote + originalPhrase

For each anchor:
- Find a sentence in the article body that mentions or naturally relates
  to the service.
- The `contextQuote` = a substring of that sentence that is unique in the
  full HTML (search for it; if it appears in related-services block or
  reviews, extend it).
- The `originalPhrase` = the exact text inside `contextQuote` that should
  become the link. Often this is just one word from the existing sentence,
  e.g. "Полировка" → replaced with "Полировка авто".

### 4. Add to `blog-links.ts`

```ts
{
  article: 'blog/your-article-slug',
  links: [
    {
      role: 'pillar',                // pillar | bridge | cta
      target: '/polishing',
      anchor: 'Полировка авто',      // must be in SERVICE_KEYWORDS_{LANG}[target]
      originalPhrase: 'Полировка',   // existing text in HTML to replace
      contextQuote: 'Полировка уменьшает завихрения, усиливает глубину цвета',
    },
    // 2 more rules ...
  ],
},
```

### 5. Build and verify

```bash
cd astro && npm run build 2>&1 | grep blog-links
```

Should see `applied=N missed=0 ambiguous=0 unknown-kw=0 dup-stem=0`.
If anything else is non-zero → read the warning above the summary line and
fix the rule.

### 6. Spot-check the rendered HTML

```bash
grep -oE 'href="/{lang}/{service}"[^>]*>[^<]+</a>' \
  astro/dist/{lang}/blog/{slug}.html
```

Verify the 3 anchors appear in body text (not in related-services block at
the bottom).

---

## Roles (`pillar` | `bridge` | `cta`)

Documentation-only field for now (the injector doesn't use it). Convention:

- `pillar` — anchor pointing to the canonical service page that this
  article is "about" (e.g. ceramic-coating article → `/ceramiccoating`).
  Use the highest-priority HF keyword. **MANDATORY: every article must
  have exactly one `pillar` link to its parent service.** An article about
  car wash with no link to `/carwash` defeats the entire pillar strategy.
  Map the parent service via `BLOG_SERVICE_MAP` in `related-services.ts`.
- `bridge` — anchor to a related/complementary service the user might
  also need (e.g. ceramic article → `/polishing` because polishing is a
  prerequisite step).
- `cta` — call-to-action anchor with stronger commercial intent (e.g.
  "записаться на полировку" if it's in the dictionary).

---

## Anchor diversity (Penguin protection)

Don't make every anchor an exact-match short HF query (`полировка кузова`,
`керамическое покрытие`, ...). Google penalises over-optimization since
the Penguin update.

Healthy split per article:
- 60% long-tail / specific (`Полировка авто`, `защитная пленка на авто`)
- 30% mid-frequency core (`полировка машины`, `керамика на авто`)
- 10% branded or generic (`узнать цены`, `подробнее о услуге`) — only if
  one of the targets needs a soft CTA-style link

Mix across the 2–3 anchors per article. Never all 3 short exact-match.

---

## Multi-language

Rules are stored in language-specific arrays:

```ts
BLOG_LINKS_RU  // Russian articles
BLOG_LINKS_KA  // Georgian articles
BLOG_LINKS_EN  // English articles
```

The same article slug exists in all 3 languages with different translated
content. Each language has its own rule set with its own contextQuote
(translated) and anchor (HF keyword in that language). Validation pulls
from `SERVICE_KEYWORDS_KA` for KA articles, etc.

Currently populated: RU only. KA + EN to be added (dictionaries are
ready in `seo-service-keywords.ts`).

---

## Common gotchas

| Symptom | Cause | Fix |
|---|---|---|
| `miss` warning, used to work | Article HTML changed (Tilda re-export, content edit) | Re-find contextQuote in current HTML |
| `ambiguous` warning | Sentence appears in related-services block too | Extend contextQuote to include unique surrounding words |
| `dup-stem` warning | Anchor adds a word whose root already exists in quote | Pick a different anchor variant from dictionary |
| `unknown-keyword` warning | Anchor not in HF dictionary | Add to `seo-service-keywords.ts` with GSC evidence, or pick known anchor |
| Link styled wrong | LINK_STYLE constant in `blog-links-inject.ts:11` | Edit the constant; affects all injected links |
| Anchor text reads awkwardly / wrong case | `anchor` is nominative but `originalPhrase` is inflected — substitution breaks grammar | Match `anchor` to the same grammatical case as `originalPhrase`. See Declension rule in step 2. |

---

## Related files & docs

- [`astro/src/data/blog-links.ts`](../astro/src/data/blog-links.ts) — rules per article
- [`astro/src/lib/blog-links-inject.ts`](../astro/src/lib/blog-links-inject.ts) — injector + validators
- [`astro/src/data/seo-service-keywords.ts`](../astro/src/data/seo-service-keywords.ts) — HF keyword dictionary
- [`astro/src/pages/[...slug].astro`](../astro/src/pages/[...slug].astro) — call site (line 528)
- [`docs/semantic-core.md`](semantic-core.md) — narrative SEO report driving the dictionary
- `~/.claude/.../memory/feedback_no_auto_link_injector.md` — old auto-matcher is permanently disabled
- `~/.claude/.../memory/feedback_anchor_must_match_search.md` — anchor must be real search query
- `~/.claude/.../memory/project_seo_keywords.md` — dictionary memory entry
