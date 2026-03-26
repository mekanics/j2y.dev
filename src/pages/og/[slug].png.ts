import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import satori from 'satori'
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const prerender = true

const fontPath = fileURLToPath(
	new URL('../../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff', import.meta.url)
)
const fontData = readFileSync(fontPath)

export async function getStaticPaths() {
	const [works, tils] = await Promise.all([
		getCollection('work', ({ data }) => !data.draft),
		getCollection('til', ({ data }) => !data.draft),
	])

	return [
		...works.map(w => ({
			params: { slug: `work-${w.id}` },
			props: { title: w.data.title, label: 'Work' },
		})),
		...tils.map(t => ({
			params: { slug: `til-${t.id}` },
			props: { title: t.data.title, label: 'TIL' },
		})),
	]
}

export const GET: APIRoute = async ({ props }) => {
	const { title, label } = props as { title: string; label: string }

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					width: '100%',
					height: '100%',
					padding: '72px 80px',
					background: '#18181b',
					fontFamily: 'Inter',
				},
				children: [
					// Top: logo
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
							},
							children: [
								{
									type: 'span',
									props: {
										style: {
											fontSize: '20px',
											color: '#fb923c',
											fontWeight: 700,
											letterSpacing: '-0.5px',
										},
										children: '[j2y]',
									},
								},
							],
						},
					},
					// Middle: title
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flex: 1,
								alignItems: 'center',
							},
							children: [
								{
									type: 'span',
									props: {
										style: {
											fontSize: title.length > 60 ? '40px' : title.length > 40 ? '48px' : '56px',
											color: '#f4f4f5',
											fontWeight: 700,
											lineHeight: 1.2,
											letterSpacing: '-1px',
											maxWidth: '900px',
										},
										children: title,
									},
								},
							],
						},
					},
					// Bottom: label + domain
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							},
							children: [
								{
									type: 'span',
									props: {
										style: {
											fontSize: '18px',
											color: '#71717a',
											fontWeight: 700,
											letterSpacing: '1px',
											textTransform: 'uppercase',
										},
										children: label,
									},
								},
								{
									type: 'span',
									props: {
										style: {
											fontSize: '18px',
											color: '#52525b',
											fontWeight: 700,
										},
										children: 'j2y.dev',
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Inter',
					data: fontData,
					weight: 700,
					style: 'normal',
				},
			],
		}
	)

	const png = await sharp(Buffer.from(svg)).png().toBuffer()

	return new Response(png, {
		headers: { 'Content-Type': 'image/png' },
	})
}
