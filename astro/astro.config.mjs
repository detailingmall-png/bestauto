// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
      filter: (page) =>
        !page.includes('/paintless-dent-repair') &&
        !page.includes('/interior-restoration') &&
        !page.includes('/blog/pdr-method') &&
        !page.includes('/blog/pdr-after-hail') &&
        !page.includes('/blog/pdr-guidelines-and-techniques') &&
        !page.includes('/blog/plastic-elements-restoration') &&
        !page.includes('/blog/restoring-car-seats') &&
        !page.includes('/blog/steering-wheel-restoration') &&
        !page.includes('/blog/why-restore-interior-elements'),
      i18n: {
        defaultLocale: 'ka',
        locales: {
          ka: 'ka',
          ru: 'ru',
          en: 'en',
        },
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
