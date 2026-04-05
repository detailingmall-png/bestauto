# BestAuto.ge Design System

> Source of truth: `.claude/rules/ui-ux-guide.md` (48KB, 24 sections).
> This file is a compact extract for the interface-design skill to validate code against.

---

## Direction & Feel

**Who:** Car owners in Tbilisi, Georgia. Often on mobile, checking prices between errands. Three languages (KA, RU, EN).

**What they do:** Find a service, see prices, book a visit.

**Feel:** Premium restraint. Dark + gold. Luxury = emptiness and cleanliness, NOT clutter. If in doubt, remove the element, don't add one.

**Signature:** Gold accent (#e4c97e) on pure black — automotive premium. Every screen leads to booking.

---

## Depth Strategy

**Surface elevation** (background lightness shifts), NOT box-shadow.

Dark theme: higher elevation = slightly lighter background.

| Level | Token | Value | Use |
|-------|-------|-------|-----|
| Base | `--ba-color-bg` | `#000000` | Page background |
| Card | `--ba-color-surface` | `#111111` | Card backgrounds |
| Section | `--ba-color-surface-dark` | `#1a1a1a` | Alternate sections |

Shadows used sparingly:
- `--ba-shadow-none` — most elements (flat)
- `--ba-shadow-subtle` — cards on non-black bg
- `--ba-shadow-medium` — CTA buttons (Tilda standard)
- `--ba-shadow-high` — modals, lightbox

---

## Palette

| Token | Value | Use |
|-------|-------|-----|
| `--ba-color-bg` | `#000000` | Main background |
| `--ba-color-text` | `#ffffff` | Main text |
| `--ba-color-accent` | `#e4c97e` | Gold — CTA, icons, links |
| `--ba-color-accent-hover` | `#d4b96e` | Gold hover (darker) |
| `--ba-color-accent-alt` | `#C8A96E` | Badge gold |
| `--ba-color-error` | `#ff4444` | Validation errors |
| `--ba-color-success` | `#25D366` | Success / WhatsApp |
| `--ba-color-surface` | `#111111` | Card backgrounds |
| `--ba-color-surface-dark` | `#1a1a1a` | Dark sections |
| `--ba-color-text-muted` | `rgba(255,255,255,0.7)` | Descriptions |
| `--ba-color-text-subtle` | `rgba(255,255,255,0.6)` | Subtitles |
| `--ba-color-text-faint` | `rgba(255,255,255,0.3)` | Captions, brands |
| `--ba-color-border` | `rgba(255,255,255,0.1)` | Section dividers |
| `--ba-color-border-subtle` | `rgba(255,255,255,0.06)` | Light borders |
| `--ba-color-rating` | `#f4b400` | Google review stars |

Gradient overlays for service cards:
- `--ba-overlay-t1`: `linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)` — Tier 1
- `--ba-overlay-t2`: `linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)` — Tier 2

**Rule:** No colors outside this palette without approval. Always use `var(--ba-color-*)`, never hardcode hex.
**Rule:** No emojis as UI icons. SVG only.

---

## Typography

**Font:** `TildaSans, Arial, sans-serif` — one font only, no others allowed.

**Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Sizes (Desktop > Tablet > Mobile)

| Element | Desktop (>960px) | Tablet (641-960px) | Mobile (<=640px) |
|---------|-------------------|---------------------|-------------------|
| H1 hero | 48px | 40px | 32px |
| H2 section | 36px | 32px | 28px |
| H3 item | 22px | 20px | 18px |
| Body | 16-20px | 15-16px | 14-16px |
| Caption | 12-14px | 12px | 12px |

**Zero Block hero** uses different sizes due to absolute positioning:

| Breakpoint | H1 font | Subtitle font | CTA font |
|------------|---------|---------------|----------|
| default | 42px | 18px | 16px |
| 960 | 36px | 18px | 16px |
| 640 | 30px | 16px | 16px |
| 480 | 28px | 15px | 15px |
| 320 | 24px | 14px | 14px |

**Line-height:** Headings 1.2-1.35, body 1.5-1.6, small 1.4-1.5

**Rule:** No inline `style="font-size:XXpx"`. All sizes via CSS classes with selectors.

**Rule:** No text smaller than 12px anywhere.

---

## Spacing

**Base grid:** 8px (4px for fine-tuning)

| Token | Value | Use |
|-------|-------|-----|
| `--ba-space-xs` | 4px | Fine-tuning |
| `--ba-space-sm` | 8px | Min gap |
| `--ba-space-md` | 16px | Inner padding |
| `--ba-space-lg` | 24px | Gap between items |
| `--ba-space-xl` | 32px | Gap between groups |
| `--ba-space-2xl` | 48px | Heading to section content |
| `--ba-space-3xl` | 64px | Section padding (desktop) |
| `--ba-space-4xl` | 80px | Large section padding |
| `--ba-space-5xl` | 96px | Between sections (desktop) |

Tilda blocks use 15px increments: 0, 30, 45, 60, 75, 90, 105, 135, 150px.
Custom `ba-*` components use 8px grid.

---

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--ba-radius-sm` | 4px | Small controls |
| `--ba-radius-md` | 8px | Form fields |
| `--ba-radius-lg` | 12px | Review cards, video |
| `--ba-radius-xl` | 16px | Service cards |
| `--ba-radius-2xl` | 20px | Custom CTA buttons |
| `--ba-radius-full` | 50% | Avatars, badges |

Tilda CTA uses 30px natively. Custom `ba-*` uses 20px.

---

## Component Patterns

### Button Primary (CTA)

- Height: 48px min (mobile), 40px min (desktop)
- Padding: 12px 24px
- Radius: `var(--ba-radius-2xl)` (20px) / 30px Tilda native
- Font: 16px, 600 weight
- Background: `var(--ba-color-accent)`
- Color: `#000000`
- Hover: `var(--ba-color-accent-hover)`, cursor: pointer
- Active: `#c4a95e`
- Focus-visible: `outline: 2px solid #fff; outline-offset: 2px`
- Disabled: `rgba(228,201,126,0.4)`, cursor: not-allowed
- Transition: `var(--ba-duration-fast)` (0.2s)

### Service Card (Tier 1)

- Height: 360px
- Padding: 40px
- Radius: `var(--ba-radius-xl)` (16px)
- Background: image + gradient overlay `rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%`
- Title: 24px/22px/20px, 700 weight
- Description: 16px/15px/14px, 400 weight, `var(--ba-color-text-muted)`
- Hover: `transform: scale(1.02)`, transition 0.3s
- Cursor: pointer

### Service Card (Tier 2)

- Height: 280px
- Padding: 24px
- Title: 20px/18px/18px, 700 weight
- Description: 14px, 400 weight

### Review Card

- Background: `#fff` (light card on dark page)
- Padding: 20px
- Radius: `var(--ba-radius-lg)` (12px)
- Avatar: 40x40px, `border-radius: 50%`
- Min-height: 200px
- Stars color: `#f4b400`

### FAQ Item

- Element: native `<details>/<summary>`
- Chevron: 20x20px SVG
- Max-width: 800px
- Question font: 18px/17px/16px, 600 weight
- Answer font: 16px/15px/15px, 400 weight
- Border-bottom: `var(--ba-color-border)`

### Process Step

- Icon circle: 72x72px
- Badge number: 24x24px
- Separator line: 2px, `var(--ba-color-border)`
- Step title: 20px/18px/18px, 700 weight
- Step description: 15px/15px/14px, 400 weight

### WhatsApp Button

- Fixed position: bottom-right
- Size: 56x56px
- z-index: `var(--ba-z-toast)` (500)
- Border-radius: 50%
- Color: `var(--ba-color-success)` (#25D366)

---

## Animation

| Token | Value | Use |
|-------|-------|-----|
| `--ba-duration-fast` | 0.2s | Hover color/bg |
| `--ba-duration-normal` | 0.3s | Transform, opacity |
| `--ba-duration-slow` | 0.5s | Gallery slider |
| `--ba-ease-default` | ease | General |
| `--ba-ease-smooth` | ease-in-out | Tilda standard |

**Rule:** Respect `prefers-reduced-motion`. No UI animations > 0.5s.

---

## Z-index Scale

| Token | Value | Use |
|-------|-------|-----|
| `--ba-z-base` | 0 | Normal flow |
| `--ba-z-card` | 1 | Card content above gradient |
| `--ba-z-sticky` | 100 | Sticky header, mobile CTA |
| `--ba-z-dropdown` | 200 | Mobile menu |
| `--ba-z-overlay` | 300 | Lightbox backdrop |
| `--ba-z-modal` | 400 | Lightbox content |
| `--ba-z-toast` | 500 | WhatsApp button |

**Rule:** No `z-index: 9999` or arbitrary values. Use the scale.

---

## Breakpoints

| Name | Width | Padding |
|------|-------|---------|
| Mobile | <=640px | 16-20px |
| Tablet | 641-960px | 20-24px |
| Desktop | >960px | 20-24px |

Container: `max-width: 1200px; margin: 0 auto`

**Rule:** Always test at 375px (iPhone SE). Georgian text is longer — always test all 3 languages.

---

## Touch Targets

- Minimum: **48x48px** for all clickable elements on mobile
- Gap between adjacent targets: minimum 8px
- Visual element can be smaller (24px icon), expand hit area with padding

---

## Accessibility

- One H1 per page, strict hierarchy (H1 > H2 > H3)
- `cursor: pointer` on all clickable elements
- Focus-visible: `2px solid` outline, `2px offset`
- `aria-expanded` on toggles, `aria-current` on nav
- All images: alt text (decorative: `alt=""` + `aria-hidden="true"`)
- Form inputs: `<label>` with `for` attribute
- Color contrast: 4.5:1 normal text, 3:1 large text (WCAG AA)
- Language tags: `lang="ka"`, `lang="ru"`, `lang="en"`
