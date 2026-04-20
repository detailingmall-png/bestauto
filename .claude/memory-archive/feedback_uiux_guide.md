Before ANY change to the bestauto.ge site (editing blocks, adding new blocks/pages, changing styles, creating components), ALWAYS read the UI/UX guide first: /Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/.claude/rules/ui-ux-guide.md — and follow every instruction in it. The guide contains evidence-based standards (NNGroup, Baymard, WCAG, Google Research) applied specifically to this site. Run the pre-commit checklist from the guide before finishing work.

Key additions (2026-04-02):
- Tilda block typography standardization section: t502/t508 blocks have inconsistent inline customstyle font-sizes across pages. CSS overrides in bestauto-custom.css standardize them (22px/20px/18px desktop/tablet/mobile). Always check bestauto-custom.css when Tilda blocks look different between pages.
- Component-level font-size table with 3 breakpoints (desktop >960px, tablet 641-960px, mobile <=640px) for all custom sections.
