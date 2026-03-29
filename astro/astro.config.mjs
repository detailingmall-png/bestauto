// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bestauto.ge',
  output: 'static',
  build: {
    format: 'directory',
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
