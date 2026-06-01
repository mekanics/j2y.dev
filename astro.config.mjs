// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
	site: 'https://j2y.dev',
	trailingSlash: 'always',
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			// Required when Vite 8 is hoisted: @tailwindcss/vite spreads resolve options
			// into rolldown's createResolver(), which rejects configs without tsconfigPaths.
			tsconfigPaths: true,
		},
	},
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: 'github-dark',
			wrap: true,
		},
	},
})
