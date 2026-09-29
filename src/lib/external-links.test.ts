import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { markdownToHtml } from 'satteri'
import { externalLinksPlugin } from './external-links.ts'

const site = 'https://j2y.dev'

function render(markdown: string): string {
	const { html } = markdownToHtml(markdown, {
		hastPlugins: [externalLinksPlugin(site)],
	})
	return html
}

function opensInNewTab(html: string): boolean {
	return html.includes('target="_blank"') && html.includes('rel="noopener noreferrer"')
}

describe('external markdown links', () => {
	it('opens an https link on another site in a new tab', () => {
		const html = render('[Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh)')
		assert.ok(html.includes('href="https://github.com/ohmyzsh/ohmyzsh"'), html)
		assert.equal(opensInNewTab(html), true, html)
	})

	it('opens an http link on another site in a new tab', () => {
		const html = render('[Harvest](http://try.hrv.st/4-598457)')
		assert.equal(opensInNewTab(html), true, html)
	})

	it('opens a protocol-relative link on another site in a new tab', () => {
		const html = render('[GitHub](//github.com/ohmyzsh/ohmyzsh)')
		assert.equal(opensInNewTab(html), true, html)
	})

	it('keeps a link to this site in the same tab', () => {
		const html = render('[about](https://j2y.dev/about/)')
		assert.equal(opensInNewTab(html), false, html)
	})

	it('keeps a root-relative link in the same tab', () => {
		const html = render('[TIL](/til/)')
		assert.equal(opensInNewTab(html), false, html)
	})

	it('keeps a mailto link in the same tab', () => {
		const html = render('[email](mailto:alexandre@j2y.dev)')
		assert.equal(opensInNewTab(html), false, html)
	})

	it('leaves a broken http href in the same tab', () => {
		const html = render('<a href="http://[">bad</a>')
		assert.equal(opensInNewTab(html), false, html)
		assert.match(html, /href="http:\/\/\["/)
	})
})
