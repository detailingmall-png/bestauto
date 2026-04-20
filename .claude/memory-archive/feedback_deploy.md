---
name: Deploy rules — branch-dependent
description: Tilda fixes push to main directly; new pilot/component work goes to feature branches, merge to main only with user approval
type: feedback
---

Deploy rules depend on the type of work:

- **Tilda fixes** (CSS, HTML injection, existing page tweaks): push to main directly after commit, no prompt needed. User originally said "не спрашивай меня, всегда деплой".
- **New component/pilot work** (Astro components, new pages, Tailwind config): work on a feature branch. NEVER push to main without explicit user approval. User had to revert a production push of the pilot page (2026-04-03).

**How to apply:** Before pushing, check if the changes are Tilda-level fixes or new architecture work. If new architecture — use a feature branch.
