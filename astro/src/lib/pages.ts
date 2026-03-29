/**
 * Page data loader for Tilda-exported HTML pages.
 * Reads page-map.json and provides route/content helpers for Astro.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import pageMap from './page-map.json';

export interface PageEntry {
  readonly id: string;
  readonly file: string;
  readonly url: string;
  readonly path: string;
  readonly title: string;
  readonly lang: string;
  readonly slug: string;
}

// Build typed entries from JSON
const entries: readonly PageEntry[] = Object.entries(
  pageMap as Record<string, { file: string; url: string; path: string; title: string; lang: string; slug: string }>
).map(([id, data]) => ({
  id,
  ...data,
}));

/**
 * Returns all page entries for use in getStaticPaths().
 */
export function getAllPages(): readonly PageEntry[] {
  return entries;
}

/**
 * Returns the full HTML content for a given page file.
 * Reads from the tilda-export directory.
 */
export function getPageHtml(pageFile: string): string {
  const exportDir = join(process.cwd(), 'tilda-export');
  const filePath = join(exportDir, pageFile);
  return readFileSync(filePath, 'utf-8');
}

/**
 * Computes the Astro route slug from a page entry.
 * KA pages: slug as-is (no prefix)
 * RU pages: ru/slug
 * EN pages: en/slug
 * Home pages: empty string / "ru" / "en"
 */
export function getRouteSlug(page: PageEntry): string | undefined {
  const { lang, slug } = page;

  if (lang === 'ka') {
    return slug || undefined; // undefined = index route
  }
  if (lang === 'ru') {
    return slug ? `ru/${slug}` : 'ru';
  }
  if (lang === 'en') {
    return slug ? `en/${slug}` : 'en';
  }
  return slug || undefined;
}
