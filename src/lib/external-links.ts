import { defineHastPlugin } from 'satteri'

const NEW_TAB_REL = 'noopener noreferrer'

/** True when `href` is an http(s) URL whose origin is not this site. */
function leavesSite(href: string, site: string, origin: string): boolean {
	let url: URL
	try {
		url = new URL(href, site)
	} catch {
		return false
	}
	if (url.protocol !== 'http:' && url.protocol !== 'https:') return false
	return url.origin !== origin
}

/** Opens markdown links that leave `site` in a new tab. Wired in `astro.config.mjs`. */
export function externalLinksPlugin(site: string) {
	const origin = new URL(site).origin
	return defineHastPlugin({
		name: 'external-links',
		element: {
			filter: ['a'],
			visit(node, context) {
				const href = node.properties?.href
				if (typeof href !== 'string' || !leavesSite(href, site, origin)) return
				context.setProperty(node, 'target', '_blank')
				context.setProperty(node, 'rel', NEW_TAB_REL)
			},
		},
	})
}
