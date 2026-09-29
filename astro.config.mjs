// @ts-check

import { satteri } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { externalLinksPlugin } from './src/lib/external-links.ts'

const site = 'https://j2y.dev'

// https://astro.build/config
export default defineConfig({
	site,
	trailingSlash: 'always',
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [mdx(), sitemap()],
	markdown: {
		processor: satteri({
			hastPlugins: [externalLinksPlugin(site)],
		}),
		shikiConfig: {
			theme: 'github-dark',
			wrap: true,
		},
	},
})
