import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('til', ({ data }) => !data.draft);
  const sortedPosts = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "j2y.dev — Today I Learned",
    description: "Short notes on things Alexandre Joly discovers while building software.",
    site: context.site!.toString(),
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? post.data.tags.map((t) => `#${t}`).join(' '),
      link: `/til/${post.id}/`,
    })),
    customData: `<language>en</language>`,
  });
}
