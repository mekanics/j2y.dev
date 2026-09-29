import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { matchTil, parseTilQuery, tilResultLabel, tilTagHref, type TilQuery } from './til-query.ts'

const githubNote = { title: 'Using github actions', tags: ['github'] }
const dataScienceNote = { title: 'Leak in a pipeline', tags: ['data-science'] }
const bashNote = { title: 'Help for a Bash script', tags: ['cli', 'bash'] }

function queryActive(query: TilQuery): boolean {
	return query.tag !== null || query.q !== null
}

describe('parseTilQuery', () => {
	it('returns a null tag and q for an empty search string', () => {
		assert.deepEqual(parseTilQuery(''), { tag: null, q: null })
	})

	it('keeps the first tag and treats a blank q as null', () => {
		assert.deepEqual(parseTilQuery('?tag=Bash&q='), { tag: 'Bash', q: null })
	})

	it('uses the first value when a param is repeated', () => {
		assert.deepEqual(parseTilQuery('tag=bash&tag=cli'), { tag: 'bash', q: null })
	})

	it('treats a whitespace-only q as no q', () => {
		assert.deepEqual(parseTilQuery('?q=   '), { tag: null, q: null })
	})
})

describe('matchTil', () => {
	it('matches every entry when the query is inactive', () => {
		assert.equal(matchTil(githubNote, parseTilQuery('')), true)
	})

	it('matches a full tag without regard to case', () => {
		assert.equal(matchTil(bashNote, { tag: 'Bash', q: null }), true)
	})

	it('does not match a tag filter against a longer hyphenated tag', () => {
		assert.equal(matchTil(dataScienceNote, { tag: 'data', q: null }), false)
	})

	it('matches a search token as a prefix of a title word', () => {
		assert.equal(
			matchTil({ title: 'Time series models overfit', tags: [] }, { tag: null, q: 'tim' }),
			true,
		)
	})

	it('matches a search token as a prefix of a longer tag word', () => {
		assert.equal(matchTil(githubNote, { tag: null, q: 'git' }), true)
	})

	it('does not match a search token in the middle of a word', () => {
		assert.equal(
			matchTil({ title: 'Time series models overfit', tags: [] }, { tag: null, q: 'ime' }),
			false,
		)
	})

	it('matches a search token to a word inside a hyphenated tag', () => {
		assert.equal(matchTil(dataScienceNote, { tag: null, q: 'data' }), true)
	})

	it('matches a search token to a full hyphenated tag', () => {
		assert.equal(matchTil(dataScienceNote, { tag: null, q: 'data-science' }), true)
	})

	it('requires every search token to match', () => {
		assert.equal(matchTil(dataScienceNote, { tag: null, q: 'data missing' }), false)
	})

	it('requires both the tag filter and the search tokens', () => {
		assert.equal(matchTil(bashNote, { tag: 'bash', q: 'missing' }), false)
	})

	it('matches a title word when the entry has no tags', () => {
		assert.equal(matchTil({ title: 'hello world', tags: [] }, { tag: null, q: 'hello' }), true)
	})
})

describe('tilResultLabel', () => {
	it('uses the plain count when q is only whitespace', () => {
		const query = parseTilQuery('?q=   ')
		assert.equal(queryActive(query), false)
		assert.equal(tilResultLabel(2, queryActive(query)), '2 posts')
	})

	it('names a zero-hit active query', () => {
		assert.equal(tilResultLabel(0, true), 'No notes match this search.')
	})

	it('uses the singular for one match', () => {
		assert.equal(tilResultLabel(1, true), '1 post')
	})

	it('uses the plural for two matches', () => {
		assert.equal(tilResultLabel(2, true), '2 posts')
	})

	it('uses the plural for zero matches when the query is inactive', () => {
		assert.equal(tilResultLabel(0, false), '0 posts')
	})
})

describe('tilTagHref', () => {
	it('encodes the tag on the TIL index path', () => {
		const href = tilTagHref('c++')
		assert.equal(href.startsWith('/til/?'), true)
		assert.equal(new URL(href, 'https://j2y.dev').searchParams.get('tag'), 'c++')
	})
})
