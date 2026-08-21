/**
 * The slice of the Tilda runtime that hand-built pages need.
 *
 * Pages migrated from Tilda get this from their exported <head>: three helper
 * functions inline, plus tilda-menu.js for the nav. Pages this repo builds
 * itself — the location pages — reuse the same nav and footer markup, whose
 * inline scripts call `t_onReady`, `t_onFuncLoad`, `t_throttle` and the
 * `t_menu__*` family. Without the runtime those calls threw ReferenceError on
 * every location page, so the mobile menu never got built, anchor links were
 * never wired and the header never switched background on scroll.
 *
 * The three helpers are copied verbatim from the Tilda export so behaviour
 * stays identical (t_throttle really is a pass-through there — Tilda ships it
 * that way in exports, and the menu code depends on that timing).
 */

/** Same tag the Tilda exports use: async, non-blocking, error-tolerant. */
const MENU_SCRIPT =
  `<script src="/js/tilda-menu-1.0.min.js" charset="utf-8" async onerror="this.loaderr='y';"></script>`;

const HELPERS =
  `<script>` +
  `function t_onReady(func){if(document.readyState!='loading'){func();}else{document.addEventListener('DOMContentLoaded',func);}}` +
  `function t_onFuncLoad(funcName,okFunc,time){if(typeof window[funcName]==='function'){okFunc();}else{setTimeout(function(){t_onFuncLoad(funcName,okFunc,time);},(time||100));}}` +
  `function t_throttle(fn,threshhold,scope){return function(){fn.apply(scope||this,arguments);};}` +
  `</script>`;

export function tildaRuntimeSnippet(): string {
  return HELPERS + MENU_SCRIPT;
}
