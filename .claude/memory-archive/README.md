# Memory Archive

Старые memory-файлы перенесены сюда 2026-04-20 из `~/.claude/projects/-Users-fedorzubrickij/memory/` после консолидации в `CLAUDE.md` и `.claude/rules/`.

**Статус:** deprecated. Содержимое уже включено (в переработанном виде) в:

- `../../CLAUDE.md` — главный entry
- `../rules/seo-guide.md` — полный SEO
- `../rules/pagespeed-rules.md` — полные PageSpeed правила
- `../rules/ui-ux-guide.md` — design tokens

**Зачем держим:** история. Если что-то потерялось в консолидации — можно свериться.

**Claude автоматически эти файлы не читает** (лежат не в `rules/` и не в project root). Если нужна конкретная информация — сюда заглядываем руками.

## Файлы

### Feedback (правила поведения)

- `feedback_anchor_must_match_search.md` → `CLAUDE.md` + `rules/seo-guide.md` (section 10)
- `feedback_check_all_pages.md` → `CLAUDE.md` (Changes across pages)
- `feedback_css_cache_busting.md` → `CLAUDE.md` (Cache busting CSS)
- `feedback_deploy.md` → `CLAUDE.md` (Deploy rules)
- `feedback_no_auto_link_injector.md` → `CLAUDE.md` (Blog → Service section, НЕ делать)
- `feedback_pagespeed_tilda_scripts.md` → `rules/pagespeed-rules.md` (Если функциональность сломалась)
- `feedback_seo_guide_mandatory.md` → `CLAUDE.md` (SEO section) + `rules/seo-guide.md`
- `feedback_tilda_native_structure.md` → `CLAUDE.md` (Tilda native structure STRICT)
- `feedback_uiux_guide.md` → `CLAUDE.md` (UI / Design work)
- `feedback_use_design_skills.md` → `CLAUDE.md` (UI / Design work)
- `feedback_verify_deploy.md` → `CLAUDE.md` (После каждого push)
- `feedback_verify_live.md` → `CLAUDE.md` (Verify live, не локально)
- `feedback_zero_block_mobile_width.md` → `CLAUDE.md` (Zero Block (t396) mobile width)

### Project (архитектура и состояние)

- `project_blog_internal_links.md` → `CLAUDE.md` (Blog → Service internal linking)
- `project_discontinued_services.md` → `CLAUDE.md` (Discontinued services)
- `project_font_architecture.md` → `CLAUDE.md` (Font architecture two-layer)
- `project_nolcp_fix.md` → `rules/pagespeed-rules.md` (NO_LCP история)
- `project_pagespeed_optimization_rules.md` → `rules/pagespeed-rules.md`
- `project_seo_keywords.md` → `rules/seo-guide.md` (section 10)
- `project_structure.md` → `CLAUDE.md` (Ключевые directories & files)
- `project_tilda_script_replacements.md` → `rules/pagespeed-rules.md` (Scripts replaced with shims + completely removed)

### Reference

- `reference_seo_guide.md` → `rules/seo-guide.md` (полный перенос)
