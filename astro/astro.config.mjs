// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://bestauto.ge',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
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
    react(),
  ],
  i18n: {
    defaultLocale: 'ka',
    locales: ['ka', 'ru', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
