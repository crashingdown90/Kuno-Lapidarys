import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://kunolapidary.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
      customPages: ['https://shop.kunolapidary.com'],
    }),
  ],
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  trailingSlash: 'never',
  redirects: {
    '/shop': 'https://shop.kunolapidary.com',
    '/store': 'https://shop.kunolapidary.com',
  },
  vite: {
    ssr: {
      external: ['@sanity/client'],
    },
  },
});
