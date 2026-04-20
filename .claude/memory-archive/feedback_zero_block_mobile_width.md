---
name: Zero Block mobile text width check
description: Tilda Zero Block (t396) text elements must have width >= 300px at 320bp to avoid narrow columns on 375px phones
type: feedback
---

After adding or importing a Tilda Zero Block (t396), check `data-field-width-res-320-value` for all text elements. If width < 300px, the text field will appear too narrow on 375px phones (iPhone SE/Mini/standard).

**Why:** The 3 homepage hero blocks had H1 at 290px and subtitle at 270px width at the 320 breakpoint. On a 375px phone this left 47-85px unused, creating a visually cramped text column. Subtitle was also only 14px (below the 15px minimum from UI/UX guide). Took a user complaint to discover — not visible in DevTools emulation because Tilda JS positioning differs from CSS.

**How to apply:**
1. After any Tilda export with t396 blocks, grep for `data-field-width-res-320-value` and flag values < 300
2. For subtitle/body text, check `data-field-fontsize-res-320-value` is >= 15px
3. If too narrow: add CSS override in `bestauto-custom.css` targeting `.t396 .tn-elem[data-elem-id="XXXX"]` with `width: 340px !important; left: calc(50% - 170px) !important;`
4. Current homepage fix: elem 1470209944682 (H1) and 1684511382614 (subtitle) widened to 340px, subtitle font bumped to 15px
