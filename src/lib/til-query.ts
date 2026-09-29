export type TilQuery = { tag: string | null; q: string | null }

export type TilMatchInput = { title: string; tags: readonly string[] }

function blankToNull(value: string | null): string | null {
	if (value === null) return null
	const trimmed = value.trim()
	return trimmed.length > 0 ? trimmed : null
}

/** `search` may include a leading '?'. First `tag` and first `q` win. Blank values become null. */
export function parseTilQuery(search: string): TilQuery {
	const params = new URLSearchParams(search)
	return {
		tag: blankToNull(params.get('tag')),
		q: blankToNull(params.get('q')),
	}
}

function words(value: string): string[] {
	return value.toLowerCase().match(/[a-z0-9]+/g) ?? []
}

function searchTokens(q: string): string[] {
	return q.toLowerCase().split(/\s+/).filter(Boolean)
}

function tokenMatchesEntry(token: string, entry: TilMatchInput): boolean {
	const fullTags = entry.tags.map(tag => tag.toLowerCase())
	if (fullTags.includes(token)) return true

	if (words(entry.title).some(word => word.startsWith(token))) return true

	return entry.tags.some(tag => words(tag).some(word => word.startsWith(token)))
}

/**
 * Inactive query matches everything.
 * `tag` matches one full tag, case-insensitive. `tag=data` does not match `data-science`.
 * `q` is whitespace-separated tokens, AND. A token matches if it equals a full tag
 * (case-insensitive) or is a prefix of one word of the title or of any tag.
 * Words are `[a-z0-9]+` runs. Hyphen is a word break for that check, not for the full-tag check.
 */
export function matchTil(entry: TilMatchInput, query: TilQuery): boolean {
	if (query.tag !== null) {
		const wanted = query.tag.toLowerCase()
		if (!entry.tags.some(tag => tag.toLowerCase() === wanted)) return false
	}

	if (query.q === null) return true

	return searchTokens(query.q).every(token => tokenMatchesEntry(token, entry))
}

/** `/til/?tag=` with the tag encoded. */
export function tilTagHref(tag: string): string {
	const params = new URLSearchParams()
	params.set('tag', tag)
	return `/til/?${params.toString()}`
}

/**
 * query inactive: "1 post" / "N posts" (zero is "0 posts").
 * query active and count 0: "No notes match this search."
 * query active and count > 0: same post count as inactive.
 */
export function tilResultLabel(count: number, queryActive: boolean): string {
	if (queryActive && count === 0) return 'No notes match this search.'
	return count === 1 ? '1 post' : `${count} posts`
}
