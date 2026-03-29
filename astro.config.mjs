// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://hackspain.com',
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'never',
  integrations: [react()],
});
