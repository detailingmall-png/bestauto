/**
 * Generates the brand logos strip HTML for the bestauto.ge homepage.
 * Shows certified material brands (Gtechniq, Koch-Chemie, GYEON, STEK, 3M).
 * Returns complete HTML with inline styles (Tilda-compatible).
 */

const BRANDS: ReadonlyArray<{ readonly name: string; readonly width: number }> = [
  { name: 'LLumar', width: 90 },
  { name: 'Quantum', width: 100 },
  { name: 'LuxArmor', width: 100 },
  { name: 'Koch-Chemie', width: 120 },
  { name: 'GYEON', width: 80 },
  { name: '3M', width: 50 },
];

const SUBTITLE: Readonly<Record<string, string>> = {
  ka: 'ვმუშაობთ მხოლოდ სერტიფიცირებული მასალებით',
  ru: 'Работаем только с сертифицированными материалами',
  en: 'We work exclusively with certified materials',
};

function renderBrandItem(brand: { readonly name: string; readonly width: number }): string {
  return `<span class="ba-brands__item" style="display:inline-flex;align-items:center;justify-content:center;min-width:${brand.width}px;padding:12px 24px;font-family:TildaSans,Arial,sans-serif;font-weight:700;letter-spacing:1.5px;color:rgba(255,255,255,0.6);text-transform:uppercase;transition:color 0.25s ease;white-space:nowrap;">${brand.name}</span>`;
}

export function generateBrandLogosHtml(lang: string): string {
  const subtitle = SUBTITLE[lang] ?? SUBTITLE['en'];
  const items = BRANDS.map(renderBrandItem).join('\n');

  return `<div id="ba-brand-logos" style="background:#000;padding:48px 0;border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);">
  <div style="max-width:1200px;margin:0 auto;padding:0 24px;text-align:center;">
    <div class="ba-brands__row" style="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:16px 40px;margin-bottom:16px;">
      ${items}
    </div>
    <p class="ba-brands__subtitle" style="font-family:TildaSans,Arial,sans-serif;color:rgba(255,255,255,0.3);letter-spacing:0.5px;margin:0;">${subtitle}</p>
  </div>
  <style>
    .ba-brands__item { font-size: 18px; }
    .ba-brands__subtitle { font-size: 13px; }
    .ba-brands__item:hover { color: rgba(228,201,126,0.8) !important; }
    @media screen and (max-width: 960px) {
      .ba-brands__item { font-size: 16px; }
    }
    @media screen and (max-width: 640px) {
      #ba-brand-logos { padding: 32px 0; }
      .ba-brands__row { gap: 8px 24px !important; }
      .ba-brands__item { font-size: 14px; padding: 8px 16px !important; min-width: auto !important; }
      .ba-brands__subtitle { font-size: 12px; }
    }
  </style>
</div>`;
}
