import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
    experimental: {
        assets: true
    },
    site: 'https://www.j2y.dev',
    integrations: [sitemap()],
})