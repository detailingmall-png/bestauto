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
      filter: (page) => !page.includes('/paintless-dent-repair'),
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
