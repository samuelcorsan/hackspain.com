// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { getSitemapCustomPages } from './sitemap-custom-pages.mjs';

/** Astro + sitemap sometimes emit both `https://hackspain.com` and `https://hackspain.com/` as distinct strings — duplicate `<loc>` in XML. */
function normalizeSitemapUrl(href) {
  const u = new URL(href);
  if (u.pathname === '/' || u.pathname === '') return u.origin;
  return `${u.origin}${u.pathname.replace(/\/+$/, '')}`;
}

function dedupeSitemapByUrl() {
  const seen = new Set();
  return (item) => {
    const key = normalizeSitemapUrl(item.url);
    if (seen.has(key)) return undefined;
    seen.add(key);
    return { ...item, url: key };
  };
}

export default defineConfig({
  site: 'https://hackspain.com',
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
      customPages: getSitemapCustomPages(),
      serialize: dedupeSitemapByUrl(),
    }),
  ],
});