// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Build a pathname -> lastmod (ISO 8601) map for the sitemap from git history.
 *
 * Source of truth: the last commit date of each page's Tilda export file
 * (tilda-export/project6825691/pageXXX.html), resolved through page-map.json
 * (file -> path). One `git log` pass covers all 330+ pages.
 *
 * Requires full git history: deploy.yml checks out with fetch-depth: 0.
 * If git is unavailable or the clone is shallow, we log a warning and emit
 * the sitemap without lastmod (never with made-up dates).
 */
function buildLastmodMap() {
  const map = new Map();
  try {
    const log = execSync(
      'git log --format="C %cI" --name-only -- tilda-export/project6825691/',
      { cwd: repoRoot, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    );
    // git log is newest-first: the first date seen for a file is its lastmod.
    const fileDates = new Map();
    let currentDate = null;
    for (const line of log.split('\n')) {
      if (line.startsWith('C ')) {
        currentDate = line.slice(2).trim();
        continue;
      }
      const file = line.trim();
      if (!file || !currentDate) continue;
      const base = file.split('/').pop();
      if (base && !fileDates.has(base)) fileDates.set(base, currentDate);
    }

    const pageMap = JSON.parse(
      readFileSync(resolve(repoRoot, 'astro/src/lib/page-map.json'), 'utf8'),
    );
    for (const entry of Object.values(pageMap)) {
      if (!entry || typeof entry !== 'object') continue;
      const { file, path } = /** @type {{file?: string, path?: string}} */ (entry);
      if (!file || !path) continue;
      const date = fileDates.get(file);
      if (date) map.set(path, date);
    }
    console.log(`[sitemap] lastmod map built for ${map.size} pages from git history`);
  } catch (err) {
    console.warn(
      '[sitemap] lastmod skipped (git history unavailable?):',
      err instanceof Error ? err.message : err,
    );
  }
  return map;
}

const LASTMOD_BY_PATH = buildLastmodMap();

// https://astro.build/config
export default defineConfig({
  site: 'https://bestauto.ge',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      // Generate sitemap for all 3 locales
      i18n: {
        defaultLocale: 'ka',
        locales: {
          ka: 'ka',
          ru: 'ru',
          en: 'en',
        },
      },
      serialize(item) {
        try {
          // trailingSlash: 'never' -> page-map paths have no trailing slash;
          // the site root serializes as "https://bestauto.ge/" -> "/".
          const pathname = new URL(item.url).pathname;
          const normalized =
            pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
          const lastmod = LASTMOD_BY_PATH.get(normalized);
          if (lastmod) return { ...item, lastmod };
        } catch {
          // Malformed URL in a sitemap item: emit it unchanged rather than
          // failing the whole build over a missing lastmod.
        }
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'ka',
    locales: ['ka', 'ru', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
