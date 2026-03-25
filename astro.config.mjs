// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://j2y.dev',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap()
  ],
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
