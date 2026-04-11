// ---------------------------------------------------------------------------
// blog-internal-links.ts — Build-time internal link injection for blog articles
// Scans article <p> text for service keywords and wraps first occurrence with <a>.
// Supports KA, RU, EN languages with separate keyword sets.
// ---------------------------------------------------------------------------

interface ServiceKeywordEntry {
  readonly service: string;
  readonly url: string;
  readonly keywords: readonly string[];
}

/** Keywords sorted longest-first within each entry. */
const SERVICE_KEYWORDS: Readonly<Record<string, readonly ServiceKeywordEntry[]>> = {
  ka: [
    {
      service: 'ppf-shield-wrapping',
      url: '/ppf-shield-wrapping',
      keywords: ['PPF დამცავი ფირი', 'დამცავი ფირის გადაკვრა', 'პოლიურეთანის ფირი', 'PPF ფირი', 'დამცავი ფირი'],
    },
    {
      service: 'vinyl-wrapping',
      url: '/vinyl-wrapping',
      keywords: ['მანქანაზე გადასაკრავი ფირი', 'ფერის შეცვლა ფირით', 'ფირის გადაკვრა', 'ვინილის ფირი'],
    },
    {
      service: 'auto-glass-tinting',
      url: '/auto-glass-tinting',
      keywords: ['შუშების დამუქება', 'მინების დამუქება', 'შუშების დაბურვა', 'მინების დაბურვა'],
    },
    {
      service: 'polishing',
      url: '/polishing',
      keywords: ['მანქანის პალიროვკა', 'მანქანის პოლირება', 'პოლირება ფასი', 'პოლირება'],
    },
    {
      service: 'ceramiccoating',
      url: '/ceramiccoating',
      keywords: ['კერამიკული საფარი', 'მანქანის კერამიკა', 'კერამიკა მანქანაზე', 'კერამიკა'],
    },
    {
      service: 'carwash',
      url: '/carwash',
      keywords: ['მანქანის სამრეცხაო', 'მანქანის რეცხვა', 'ავტოსამრეცხაო'],
    },
    {
      service: 'interior-cleaning',
      url: '/interior-cleaning',
      keywords: ['სალონის ქიმწმენდა', 'მანქანის ქიმწმენდა', 'ქიმწმენდა'],
    },
    {
      service: 'car-soundproofing',
      url: '/car-soundproofing',
      keywords: ['მანქანის ხმის იზოლაცია', 'ხმის იზოლაცია'],
    },
    {
      service: 'windshield-repair',
      url: '/windshield-repair',
      keywords: ['საქარე მინის აღდგენა', 'საქარე მინის შეკეთება', 'ნაკენჭარის აღდგენა', 'ნაკენჭარის შეკეთება', 'ბზარის აღდგენა', 'ბზარის შეკეთება', 'მინის შეკეთება'],
    },
    {
      service: 'computer-diagnostics',
      url: '/computer-diagnostics',
      keywords: ['კომპიუტერული დიაგნოსტიკა'],
    },
  ],
  ru: [
    {
      service: 'ppf-shield-wrapping',
      url: '/ppf-shield-wrapping',
      keywords: ['оклейка защитной пленкой авто', 'защитная пленка на авто', 'полиуретановая защитная пленка', 'оклейка защитной пленкой', 'пленка PPF', 'пленки PPF', 'защитной пленкой', 'защитная пленка', 'PPF пленка'],
    },
    {
      service: 'vinyl-wrapping',
      url: '/vinyl-wrapping',
      keywords: ['оклейка виниловой пленкой', 'виниловая пленка для авто', 'виниловой пленкой', 'виниловую пленку', 'цветной пленкой', 'оклейка пленкой', 'виниловая пленка'],
    },
    {
      service: 'auto-glass-tinting',
      url: '/auto-glass-tinting',
      keywords: ['тонировка стекол авто', 'тонировка автомобиля', 'тонировку стекол', 'тонировка стекол', 'тонировка авто', 'тонировки', 'тонировка', 'тонировку'],
    },
    {
      service: 'polishing',
      url: '/polishing',
      keywords: ['полировка автомобиля', 'полировку автомобиля', 'полировка машины', 'полировка кузова', 'полировка авто', 'полировку авто', 'полировку', 'полировки', 'полировка'],
    },
    {
      service: 'ceramiccoating',
      url: '/ceramiccoating',
      keywords: ['керамическое покрытие автомобиля', 'керамическое покрытие авто', 'керамическим покрытием', 'покрытие керамикой', 'керамическое покрытие', 'керамика на авто', 'керамику', 'керамика'],
    },
    {
      service: 'carwash',
      url: '/carwash',
      keywords: ['мойка авто', 'автомойка', 'мойка машины', 'мойку авто', 'мойки', 'мойка'],
    },
    {
      service: 'interior-cleaning',
      url: '/interior-cleaning',
      keywords: ['химчистка салона авто', 'химчистка автомобиля', 'химчистку салона', 'химчистка авто', 'химчистка салона', 'химчистку', 'химчистка'],
    },
    {
      service: 'car-soundproofing',
      url: '/car-soundproofing',
      keywords: ['шумоизоляция автомобиля', 'шумоизоляция авто', 'шумоизоляцию', 'шумоизоляции', 'шумоизоляция'],
    },
    {
      service: 'windshield-repair',
      url: '/windshield-repair',
      keywords: ['ремонт лобового стекла', 'восстановление лобового стекла', 'ремонт сколов лобового стекла', 'ремонт трещин лобового стекла', 'лобового стекла', 'лобовое стекло'],
    },
    {
      service: 'computer-diagnostics',
      url: '/computer-diagnostics',
      keywords: ['компьютерная диагностика', 'компьютерной диагностики', 'диагностику', 'диагностика'],
    },
  ],
  en: [
    {
      service: 'ppf-shield-wrapping',
      url: '/ppf-shield-wrapping',
      keywords: ['paint protection film', 'protection film', 'protective film', 'PPF wrap', 'PPF film'],
    },
    {
      service: 'vinyl-wrapping',
      url: '/vinyl-wrapping',
      keywords: ['vinyl wrap for cars', 'car vinyl wrap', 'vinyl wrapping', 'vinyl wrap', 'vinyl film'],
    },
    {
      service: 'auto-glass-tinting',
      url: '/auto-glass-tinting',
      keywords: ['car window tinting', 'window tinting', 'tinted windows', 'window tint', 'tinting'],
    },
    {
      service: 'polishing',
      url: '/polishing',
      keywords: ['car polishing service', 'car polishing', 'car polish', 'polishing'],
    },
    {
      service: 'ceramiccoating',
      url: '/ceramiccoating',
      keywords: ['car ceramic coating', 'ceramic coating', 'ceramic coat', 'auto ceramic'],
    },
    {
      service: 'carwash',
      url: '/carwash',
      keywords: ['car wash service', 'car washing', 'auto car wash', 'car wash'],
    },
    {
      service: 'interior-cleaning',
      url: '/interior-cleaning',
      keywords: ['car interior cleaning', 'interior detailing', 'interior cleaning'],
    },
    {
      service: 'car-soundproofing',
      url: '/car-soundproofing',
      keywords: ['car soundproofing', 'sound insulation', 'soundproofing'],
    },
    {
      service: 'windshield-repair',
      url: '/windshield-repair',
      keywords: ['windshield repair', 'windshield restoration', 'windshield'],
    },
    {
      service: 'computer-diagnostics',
      url: '/computer-diagnostics',
      keywords: ['computer diagnostics', 'diagnostics'],
    },
  ],
};

const MAX_LINKS_PER_ARTICLE = 5;
const LINK_STYLE = 'color: rgb(228, 201, 126);';

/** True when `matchIndex` falls inside an unclosed <a …>…</a> in `html`. */
function isInsideAnchor(html: string, matchIndex: number): boolean {
  const before = html.slice(0, matchIndex);
  const lastOpen = Math.max(before.lastIndexOf('<a '), before.lastIndexOf('<a>'));
  if (lastOpen === -1) return false;
  const lastClose = before.lastIndexOf('</a>');
  return lastOpen > lastClose;
}

/** Escape special regex characters in a literal string. */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Inject internal service links into blog article HTML.
 * Processes `<p>` tags in article content blocks (both ba-article and t-text containers).
 * Runs before CTA/FAQ/related-services injection, so only raw article HTML is present.
 */
export function injectBlogInternalLinks(
  html: string,
  baseSlug: string,
  lang: string,
): string {
  const langKeywords = SERVICE_KEYWORDS[lang];
  if (!langKeywords) return html;

  // Check if this is a blog article (not the blog index)
  const slugWithoutLang = lang === 'ka' ? baseSlug : baseSlug.replace(`${lang}/`, '');
  if (!slugWithoutLang.startsWith('blog/') || slugWithoutLang === 'blog') {
    return html;
  }

  // URL prefix for non-KA languages
  const urlPrefix = lang === 'ka' ? '' : `/${lang}`;

  // Start after the cover/hero block to skip navigation <p> tags
  const coverEnd = html.indexOf('data-record-type="18"');
  const articleStart = coverEnd !== -1 ? coverEnd : 0;

  // Flatten keywords across all services, sorted longest-first
  const flatKeywords: { keyword: string; url: string; service: string }[] = [];
  for (const entry of langKeywords) {
    for (const kw of entry.keywords) {
      flatKeywords.push({ keyword: kw, url: entry.url, service: entry.service });
    }
  }
  flatKeywords.sort((a, b) => b.keyword.length - a.keyword.length);

  // Extract all <p> and <li> blocks with their positions
  const tagRegex = /<(?:p|li)[^>]*>[\s\S]*?<\/(?:p|li)>/gi;
  const pBlocks: { start: number; end: number; content: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(html)) !== null) {
    if (match.index >= articleStart) {
      pBlocks.push({
        start: match.index,
        end: match.index + match[0].length,
        content: match[0],
      });
    }
  }

  if (pBlocks.length === 0) return html;

  const linkedServices = new Set<string>();
  let totalLinks = 0;

  // Collect replacements: { blockIdx, matchStart, matchEnd, replacement }
  const replacements: {
    blockIdx: number;
    matchStart: number;
    matchEnd: number;
    replacement: string;
  }[] = [];

  for (const { keyword, url, service } of flatKeywords) {
    if (totalLinks >= MAX_LINKS_PER_ARTICLE) break;
    if (linkedServices.has(service)) continue;

    // Build case-insensitive regex for this keyword
    const kwRegex = new RegExp(escapeRegex(keyword), 'i');

    for (let i = 0; i < pBlocks.length; i++) {
      const kwMatch = kwRegex.exec(pBlocks[i].content);
      if (!kwMatch) continue;

      const matchIndex = kwMatch.index;

      // Skip if inside an existing <a> tag
      if (isInsideAnchor(pBlocks[i].content, matchIndex)) continue;

      // Skip if this exact position already has a scheduled replacement
      const overlaps = replacements.some(
        (r) =>
          r.blockIdx === i &&
          matchIndex < r.matchEnd &&
          matchIndex + kwMatch[0].length > r.matchStart,
      );
      if (overlaps) continue;

      const matchedText = kwMatch[0]; // preserve original casing
      const link = `<a href="${urlPrefix}${url}" style="${LINK_STYLE}">${matchedText}</a>`;

      replacements.push({
        blockIdx: i,
        matchStart: matchIndex,
        matchEnd: matchIndex + matchedText.length,
        replacement: link,
      });

      linkedServices.add(service);
      totalLinks++;
      break; // move to next keyword
    }
  }

  if (replacements.length === 0) return html;

  // Apply replacements in reverse order within each block to preserve offsets
  // Group by blockIdx
  const byBlock = new Map<number, typeof replacements>();
  for (const r of replacements) {
    const arr = byBlock.get(r.blockIdx) ?? [];
    arr.push(r);
    byBlock.set(r.blockIdx, arr);
  }

  // Build result by reconstructing HTML with modified <p> blocks
  let result = html;
  let offset = 0; // cumulative offset from earlier replacements

  // Process blocks in document order, replacements within each block in reverse
  const sortedBlockIdxs = [...byBlock.keys()].sort((a, b) => a - b);

  for (const blockIdx of sortedBlockIdxs) {
    const block = pBlocks[blockIdx];
    let content = block.content;

    // Apply replacements within this block in reverse order
    const blockReplacements = byBlock.get(blockIdx)!.sort(
      (a, b) => b.matchStart - a.matchStart,
    );

    for (const r of blockReplacements) {
      content =
        content.slice(0, r.matchStart) +
        r.replacement +
        content.slice(r.matchEnd);
    }

    // Replace in the full HTML
    const originalBlock = block.content;
    const pos = result.indexOf(originalBlock, block.start + offset);
    if (pos !== -1) {
      result =
        result.slice(0, pos) +
        content +
        result.slice(pos + originalBlock.length);
      offset += content.length - originalBlock.length;
    }
  }

  return result;
}
