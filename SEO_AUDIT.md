# SEO & Discoverability Audit — j2y.dev
**Audited:** 2026-03-20  
**Site:** https://j2y.dev  
**Stack:** Astro 6 static site, deployed on Vercel

---

## Summary Scorecard

| Area | Status |
|---|---|
| Title & meta descriptions | ⚠️ Needs improvement |
| Open Graph / Twitter Cards | ⚠️ Needs improvement |
| Structured Data (JSON-LD) | ❌ Missing |
| Sitemap | ⚠️ Needs improvement |
| robots.txt | ✅ Good |
| llms.txt | ❌ Missing |
| Canonical URLs | ✅ Good |
| Heading hierarchy | ✅ Good |
| RSS feed | ⚠️ Needs improvement |
| Favicon | ⚠️ Needs improvement |
| Images | ✅ Good |
| Internal linking | ⚠️ Needs improvement |
| 404 page | ❌ Missing |
| `<html lang>` | ✅ Good |

---

## HIGH PRIORITY

---

### 1. OG Default Image Missing

**Finding:** Default OG image file does not exist  
**Status:** ❌ Missing  
**Priority:** High

**Details:**  
`src/layouts/BaseLayout.astro` references `/og-default.png` as the default OG/Twitter card image:
```astro
ogImage = '/og-default.png',
```
And resolves it with:
```astro
<meta property="og:image" content={new URL(ogImage, Astro.site)} />
```
This generates `https://j2y.dev/og-default.png` on every page. The file `public/og-default.png` **does not exist**. Every social share across the entire site — all 21 pages — shows a broken/missing image. This is the single highest-impact SEO fix.

**Action:**  
Create an OG image at `public/og-default.png`. Recommended size: **1200×630px**.

Suggested design: Dark background, your name, tagline, and site URL — something like:

```
[j2y.dev]
Alexandre Joly
Freelance Tech Lead & Full-Stack Developer
Zurich, Switzerland
```

Tools: Figma, Canva, or a quick script. Once created, copy to:
```
public/og-default.png
```

Also consider per-page OG images for TIL posts (generate dynamically via Astro's `@vercel/og` or a static generation script), but the default is the critical fix right now.

---

### 2. JSON-LD Structured Data — Missing Entirely

**Finding:** No structured data (JSON-LD) on any page  
**Status:** ❌ Missing  
**Priority:** High

**Details:**  
`grep -r "application/ld+json"` returns nothing across the entire `src/` directory. There is zero structured data. This is a significant missed opportunity: structured data helps Google understand who Alex is, what pages represent, and can trigger rich results (sitelinks, author bylines, breadcrumbs).

**Action — 4 schemas to add:**

---

#### A. `Person` + `WebSite` on Homepage & About Page

Add to `src/layouts/BaseLayout.astro` inside `<head>`, just before `</head>` (this handles site-wide schema):

```astro
---
// In BaseLayout.astro, pass a new optional prop:
interface Props {
  // ... existing props ...
  jsonLd?: object | object[];
}
const { jsonLd } = Astro.props;
---

<!-- In <head>, before </head>: -->
{jsonLd && (
  <script type="application/ld+json" set:html={JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])} />
)}
```

Then in `src/pages/index.astro`, pass the schemas:

```astro
<BaseLayout
  title="j2y.dev"
  description="Alex Joly — Freelance tech lead and full-stack developer based in Zurich, Switzerland. I build things that work."
  jsonLd={[
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "j2y.dev",
      "url": "https://j2y.dev",
      "description": "Personal portfolio of Alexandre Joly — freelance tech lead and full-stack developer in Zurich",
      "author": {
        "@type": "Person",
        "name": "Alexandre Joly"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://j2y.dev/#alex",
      "name": "Alexandre Joly",
      "alternateName": "Alex Joly",
      "url": "https://j2y.dev",
      "image": "https://avatars.githubusercontent.com/u/591059?v=4",
      "sameAs": [
        "https://github.com/mekanics",
        "https://www.linkedin.com/in/jolyalexandre/",
        "https://mastodon.online/@jolyAlexandre",
        "https://x.com/jolyAlexandre"
      ],
      "jobTitle": "Freelance Tech Lead & Full-Stack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Self-employed"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zurich",
        "addressCountry": "CH"
      },
      "knowsLanguage": ["en", "de", "fr"],
      "description": "Freelance tech lead and full-stack developer based in Zurich, Switzerland. 20+ years shipping software across Swiss enterprise."
    }
  ]}
>
```

In `src/pages/about.astro`, add a `ProfilePage` schema:

```astro
<BaseLayout
  title="About"
  description="Alexandre Joly — freelance tech lead and full-stack developer based in Zurich, Switzerland. 20+ years of building software."
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://j2y.dev/#alex",
      "name": "Alexandre Joly",
      "alternateName": "Alex Joly",
      "url": "https://j2y.dev",
      "image": "https://avatars.githubusercontent.com/u/591059?v=4",
      "sameAs": [
        "https://github.com/mekanics",
        "https://www.linkedin.com/in/jolyalexandre/",
        "https://mastodon.online/@jolyAlexandre",
        "https://x.com/jolyAlexandre"
      ],
      "jobTitle": "Freelance Tech Lead & Full-Stack Developer",
      "description": "Freelance tech lead and full-stack developer based in Zurich, Switzerland. 20+ years shipping software across Swiss enterprise.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zurich",
        "addressCountry": "CH"
      },
      "knowsLanguage": ["en", "de", "fr"]
    }
  }}
>
```

---

#### B. `BlogPosting` Schema for TIL Posts

In `src/pages/til/[slug].astro`, after extracting post data:

```astro
const { post } = Astro.props;
const { Content } = await render(post);
const { title, date, tags } = post.data;
const isoDate = date.toISOString();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "datePublished": isoDate,
  "dateModified": isoDate,
  "author": {
    "@type": "Person",
    "@id": "https://j2y.dev/#alex",
    "name": "Alexandre Joly",
    "url": "https://j2y.dev/about"
  },
  "publisher": {
    "@type": "Person",
    "name": "Alexandre Joly",
    "url": "https://j2y.dev"
  },
  "url": `https://j2y.dev/til/${post.id}/`,
  "mainEntityOfPage": `https://j2y.dev/til/${post.id}/`,
  "keywords": tags.join(", "),
  "isPartOf": {
    "@type": "Blog",
    "name": "j2y.dev TIL",
    "url": "https://j2y.dev/til"
  }
};
```

Then pass `jsonLd={jsonLd}` to `<BaseLayout>`.

---

#### C. `BreadcrumbList` for Detail Pages

For work, project, and TIL detail pages. Add to `src/pages/work/[slug].astro`:

```astro
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Work",
      "item": "https://j2y.dev/work"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": title,
      "item": `https://j2y.dev/work/${item.id}/`
    }
  ]
};
```

Apply the same pattern to `src/pages/projects/[slug].astro` and `src/pages/til/[slug].astro`.

---

#### D. `ItemList` for Index Pages

For `src/pages/work/index.astro`:

```astro
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Client Work — Alexandre Joly",
  "url": "https://j2y.dev/work",
  "itemListElement": sortedWork.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.data.title,
    "url": `https://j2y.dev/work/${item.id}/`
  }))
};
```

---

### 3. TIL Meta Descriptions Are Weak

**Finding:** TIL post meta descriptions auto-generated as `TIL: ${title}`  
**Status:** ⚠️ Needs improvement  
**Priority:** High

**Details:**  
`src/pages/til/[slug].astro` line 21:
```astro
description={`TIL: ${title}`}
```

This generates descriptions like:
- `"TIL: Simple Snippet to Add a Help Description to a Bash Script"` — just the title prefixed
- `"TIL: Time series models will silently overfit if you use random train/test splits"` — same

These provide zero additional context beyond the title, waste 160 characters, and are a negative signal for CTR from search results. The TIL content schema also has no `description` field.

**Action — 2 steps:**

**Step 1:** Add `description` field to the TIL schema in `src/content.config.ts`:

```typescript
const til = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/til' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    description: z.string().optional(), // ADD THIS
    draft: z.boolean().optional().default(false),
  }),
});
```

**Step 2:** Update `src/pages/til/[slug].astro` to use it:

```astro
const { title, date, tags, description } = post.data;

// Generate a smart fallback from the first paragraph of content
// or use description if provided
const metaDescription = description || `A short note on ${tags.slice(0, 2).map(t => `#${t}`).join(' ')} — ${title}`;
```

Then:
```astro
<BaseLayout
  title={title}
  description={metaDescription}
  ogTitle={`${title} — j2y.dev/til`}
>
```

**Step 3:** Add `description` to each existing TIL frontmatter:

`src/content/til/bash-script-help.md`:
```yaml
description: "A reusable bash boilerplate that auto-generates --help output from inline comments using awk. Zero external dependencies."
```

`src/content/til/xgboost-time-series-leak.md`:
```yaml
description: "Why shuffled train/test splits cause silent data leakage in time series models, and how TimeSeriesSplit fixes it."
```

`src/content/til/today-I-hired-a-cfo.md`:
```yaml
description: "How I automated monthly invoicing with n8n, Harvest, and Beancount — saving 15 minutes/month at the cost of 2 days engineering. Classic."
```

`src/content/til/k3s-longhorn-node-selector.md`:
```yaml
description: "Longhorn storage will try to use all nodes by default — here's the node selector config to restrict it to designated storage nodes."
```

`src/content/til/module-federation-shared-deps.md`:
```yaml
description: "Webpack Module Federation can silently ship duplicate dependencies without version constraints — how to configure shared deps correctly."
```

`src/content/til/self-signed-certificate-authority-creation-with-open-ssl.md`:
```yaml
description: "Step-by-step guide to creating a self-signed certificate authority with OpenSSL for homelab Kubernetes clusters and local HTTPS."
```

---

### 4. `og:type` Hardcoded as "website" on All Pages

**Finding:** Article pages use `og:type="website"` instead of `"article"`  
**Status:** ⚠️ Needs improvement  
**Priority:** High

**Details:**  
`src/layouts/BaseLayout.astro` line 43:
```astro
<meta property="og:type" content="website" />
```

This is hardcoded for every page. TIL posts and work case studies should use `og:type="article"` for correct social sharing metadata and possible rich results.

**Action:**  
Add an `ogType` prop to `BaseLayout.astro`:

```astro
interface Props {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';  // ADD THIS
}

const {
  // ...existing...
  ogType = 'website',
} = Astro.props;
```

Then in the template:
```astro
<meta property="og:type" content={ogType} />
```

For `src/pages/til/[slug].astro`:
```astro
<BaseLayout
  title={title}
  description={metaDescription}
  ogTitle={`${title} — j2y.dev/til`}
  ogType="article"   <!-- ADD THIS -->
>
```

For `src/pages/work/[slug].astro`:
```astro
<BaseLayout
  title={title}
  description={item.data.description}
  ogTitle={`${title} — j2y.dev`}
  ogType="article"   <!-- ADD THIS -->
>
```

---

## MEDIUM PRIORITY

---

### 5. Sitemap Missing `lastmod` Dates

**Finding:** No `lastmod` on any sitemap entry  
**Status:** ⚠️ Needs improvement  
**Priority:** Medium

**Details:**  
`dist/sitemap-0.xml` contains 21 URLs with zero `lastmod`, `changefreq`, or `priority` hints. Google uses `lastmod` to prioritise re-crawling. For a content site with TIL posts and work case studies, this is a missed signal.

The default `@astrojs/sitemap` configuration in `astro.config.mjs` is minimal:
```javascript
integrations: [sitemap()]
```

**Action:**  
Update `astro.config.mjs` to add `lastmod` and `changefreq` customisation:

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://j2y.dev',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Optionally filter out any pages you don't want indexed
      // filter: (page) => !page.includes('/drafts/'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
```

For proper per-page `lastmod` based on content date, you'd need a custom serialiser — but this gets you `lastmod` on every URL immediately.

---

### 6. No Custom 404 Page

**Finding:** No `src/pages/404.astro` exists  
**Status:** ❌ Missing  
**Priority:** Medium

**Details:**  
`find dist -name "404.html"` returns nothing. Astro requires `src/pages/404.astro` to generate a custom 404. Without it, the server (Vercel) falls back to its default 404 — no branding, no navigation back to the site.

**Action:**  
Create `src/pages/404.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="404 — Page Not Found"
  description="This page doesn't exist. Probably moved or deleted."
>
  <div class="max-w-4xl mx-auto px-6 py-32 text-center">
    <p class="font-mono text-6xl font-bold text-zinc-200 dark:text-zinc-800 mb-4">404</p>
    <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
      Page not found
    </h1>
    <p class="text-zinc-500 dark:text-zinc-400 mb-8">
      This page doesn't exist — it may have moved or been deleted.
    </p>
    <a
      href="/"
      class="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
    >
      Back home
    </a>
  </div>
</BaseLayout>
```

---

### 7. RSS Feed Item Descriptions Are Just Hashtags

**Finding:** RSS feed `<description>` contains only tag hashtags, no actual content  
**Status:** ⚠️ Needs improvement  
**Priority:** Medium

**Details:**  
`src/pages/til/rss.xml.ts` line 15:
```typescript
description: post.data.tags.map((t) => `#${t}`).join(' '),
```

This produces descriptions like `"#python #ml #xgboost #data-science"` in the feed. RSS readers show this as the post excerpt — it's useless. Anyone subscribing via RSS (and RSS-powered aggregators like Feedly) see no useful preview.

**Action:**  
Update `src/pages/til/rss.xml.ts` to use the `description` field once added (see Finding #3), with a fallback:

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('til', ({ data }) => !data.draft);
  const sortedPosts = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "j2y.dev — Today I Learned",
    description: "Short notes on things Alex Joly discovers while building software.",
    site: context.site!.toString(),
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      // Use description if available, otherwise a meaningful fallback
      description: post.data.description
        ?? `Tagged: ${post.data.tags.map((t) => `#${t}`).join(' ')}`,
      categories: post.data.tags,
      link: `/til/${post.id}/`,
    })),
    customData: `<language>en</language>`,
  });
}
```

---

### 8. llms.txt Missing

**Finding:** No LLM discoverability file  
**Status:** ❌ Missing  
**Priority:** Medium

**Details:**  
`llms.txt` is the emerging standard (proposed by Jeremy Howard, adopted by many portfolio/docs sites) for telling LLMs what a site contains and how to understand it — analogous to `robots.txt` but for AI crawlers and context windows.

**Action:**  
Create `public/llms.txt`:

```markdown
# j2y.dev — Alexandre Joly

> Freelance tech lead and full-stack developer based in Zurich, Switzerland.
> 20+ years shipping software across Swiss enterprise — banking, manufacturing, government.

## About

Alexandre Joly is a freelance software architect and engineer specialising in technical leadership,
full-stack development, and frontend architecture. Based in Zurich. Trilingual: English, German, French.

Available for project-based technical leadership and full-stack engagements.

Contact: alexandre@j2y.dev

## Site sections

- **Work** (https://j2y.dev/work): Client case studies — Swiss enterprise projects in banking, EV infrastructure, government, manufacturing
- **Projects** (https://j2y.dev/projects): Personal side projects and open-source work
- **TIL** (https://j2y.dev/til): Today I Learned — short technical notes on things discovered while building
- **About** (https://j2y.dev/about): Background, timeline, and contact

## Selected Work

- Swiss bank card center platform — Frontend architecture lead, micro-frontend migration (React, Module Federation)
- Spühl GmbH recipe governance — Lead developer, replaced USB-stick workflow with auditable 4-stage approval system
- mygrid AG EV charging app — Lead developer, React Native + AWS Lambda serverless backend
- Canton of Thurgau IT service portal — Lead developer, Next.js, government accessibility requirements
- Get Charge (Deutsche Telekom) — Mobile app for 56,000+ EV charging stations across Europe

## Personal Projects

- badi-predictor: ML system predicting Zürich public pool occupancy (Python, XGBoost, FastAPI)
- chargeprice.ch: EV charging price comparison for Switzerland
- homelab: Kubernetes on Raspberry Pi (K3s, Cilium, Longhorn, ArgoCD)
- work-vacation-planner: Freelance day planning tool for Swiss contractors

## TIL Posts

https://j2y.dev/til/rss.xml (RSS feed, all posts)

## Social

- GitHub: https://github.com/mekanics
- LinkedIn: https://www.linkedin.com/in/jolyalexandre/
- Mastodon: https://mastodon.online/@jolyAlexandre
- X/Twitter: https://x.com/jolyAlexandre
```

---

### 9. Internal Linking Is Minimal

**Finding:** No cross-linking between related content  
**Status:** ⚠️ Needs improvement  
**Priority:** Medium

**Details:**  
There are clear topical connections between content sections that are unexploited:

- `til/xgboost-time-series-leak` → should link to `projects/badi-predictor` (which uses XGBoost)
- `til/module-federation-shared-deps` → should link to `work/swiss-bank-card-center` (Module Federation project)
- `til/k3s-longhorn-node-selector` → should link to `projects/homelab`
- Work detail pages have no "Related TIL" section
- The Work index page links to individual work pages but not to related projects

**Action:**  
1. **Add a `relatedTil` field to work and project frontmatter** (optional array of TIL slugs):

In `src/content.config.ts`:
```typescript
const work = defineCollection({
  schema: z.object({
    // ...existing fields...
    relatedTil: z.array(z.string()).optional(), // TIL post IDs
  }),
});
```

2. **Add a "Related notes" section to `src/pages/work/[slug].astro`** after the content:

```astro
---
// After existing code:
const relatedTilSlugs = item.data.relatedTil ?? [];
const allTil = await getCollection('til');
const relatedTilPosts = allTil.filter(p => relatedTilSlugs.includes(p.id));
---

{relatedTilPosts.length > 0 && (
  <aside class="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
    <h2 class="text-sm font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-wide mb-4">
      Related notes
    </h2>
    <ul class="space-y-2">
      {relatedTilPosts.map(post => (
        <li>
          <a href={`/til/${post.id}`} class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            {post.data.title}
          </a>
        </li>
      ))}
    </ul>
  </aside>
)}
```

3. **For immediate wins, add links manually** in TIL post content bodies:

In `src/content/til/xgboost-time-series-leak.md`, add at the end:
```markdown
*Related: I use XGBoost for occupancy prediction in [badi-predictor](/projects/badi-predictor).*
```

In `src/content/til/module-federation-shared-deps.md`:
```markdown
*Related: I applied this to a production micro-frontend migration — [Card Center Platform case study](/work/swiss-bank-card-center).*
```

---

### 10. No Apple Touch Icon or Web App Manifest

**Finding:** Missing touch icons for iOS/Android bookmarks  
**Status:** ⚠️ Needs improvement  
**Priority:** Medium

**Details:**  
`public/` only contains `favicon.ico` and `favicon.svg`. No `apple-touch-icon.png` (180×180) or web manifest. When someone bookmarks the site on iOS, they get a blank bookmark icon. The favicon.svg is good for modern browsers but iOS Safari requires a PNG.

**Action:**  
1. Create `public/apple-touch-icon.png` — 180×180px PNG version of the favicon.
2. Add to `src/layouts/BaseLayout.astro` in `<head>`:

```astro
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
```

3. Optionally add a `site.webmanifest` at `public/site.webmanifest`:

```json
{
  "name": "j2y.dev",
  "short_name": "j2y",
  "description": "Alexandre Joly — Freelance Tech Lead & Full-Stack Developer",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#18181b",
  "icons": [
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ]
}
```

And link in `<head>`:
```astro
<link rel="manifest" href="/site.webmanifest" />
```

---

## LOW PRIORITY

---

### 11. `og:locale` Tag Missing

**Finding:** No `og:locale` meta tag  
**Status:** ⚠️ Needs improvement  
**Priority:** Low

**Details:**  
Open Graph recommends `og:locale` to specify the content language. Missing on all pages.

**Action:**  
Add to `src/layouts/BaseLayout.astro` in the Open Graph section:

```astro
<!-- Open Graph -->
<meta property="og:locale" content="en_US" />
<meta property="og:type" content={ogType} />
<!-- ...rest of OG tags... -->
```

---

### 12. About Page Profile Photo Served from External URL

**Finding:** Profile photo loaded from GitHub CDN  
**Status:** ⚠️ Needs improvement  
**Priority:** Low

**Details:**  
`src/pages/about.astro` line ~27:
```astro
src="https://avatars.githubusercontent.com/u/591059?v=4"
```

This is an external dependency (GitHub avatar CDN). Issues:
- GitHub could change URL format or rate-limit
- Not served through Astro's image optimisation pipeline (no WebP conversion, no resizing)
- No `width`/`height` attributes causing CLS (Cumulative Layout Shift)

**Action:**  
Download the photo and add it to `public/images/alexandre-joly.jpg` (or `src/assets/alexandre-joly.jpg` for Astro optimisation). Then update:

```astro
import { Image } from 'astro:assets';
import profilePhoto from '../assets/alexandre-joly.jpg';

// Replace the img tag with:
<Image
  src={profilePhoto}
  alt="Alexandre Joly — Freelance Tech Lead based in Zurich"
  width={400}
  height={400}
  class="w-full h-full object-cover"
  loading="eager"
/>
```

Using `astro:assets` `Image` component gets you automatic WebP conversion and properly sized output.

---

### 13. Sitemap: No `changefreq` Granularity

**Finding:** All URLs treated equally in sitemap  
**Status:** ⚠️ Needs improvement  
**Priority:** Low

**Details:**  
Currently all 21 pages get the same treatment. The homepage changes more often than an archived work case study.

**Action:**  
Use the `serialize` option in `astro.config.mjs` (requires `@astrojs/sitemap` ^3.x):

```javascript
sitemap({
  serialize(item) {
    // Homepage: highest priority
    if (item.url === 'https://j2y.dev/') {
      item.changefreq = 'weekly';
      item.priority = 1.0;
      item.lastmod = new Date();
      return item;
    }
    // TIL index and posts: updated regularly
    if (item.url.includes('/til/')) {
      item.changefreq = 'monthly';
      item.priority = 0.8;
      return item;
    }
    // Work/Projects: rarely change
    item.changefreq = 'yearly';
    item.priority = 0.6;
    return item;
  },
}),
```

---

### 14. Name Inconsistency Across Pages

**Finding:** "Alex Joly" vs "Alexandre Joly" used inconsistently  
**Status:** ⚠️ Needs improvement  
**Priority:** Low

**Details:**  
- `index.astro` meta description: `"Alex Joly"`
- `about.astro` description + H1: `"Alexandre Joly"`
- `work/index.astro` description: `"Alex Joly"`
- Hero component: `"I'm Alex"`
- Footer: `"© 2026 Alexandre Joly"`

Google may understand these as the same entity, but it's cleaner to be consistent. The JSON-LD `Person` schema helps (using `alternateName`), but the surface copy should be consistent too.

**Action:**  
Choose one canonical form. "Alexandre Joly" is the full legal name and is better for professional search. "Alex" is fine in conversational contexts (hero copy). The meta descriptions and structured data should consistently use "Alexandre Joly":

- `src/pages/work/index.astro` description → `"Client work — Alexandre Joly, freelance tech lead..."`
- `src/pages/index.astro` description → `"Alexandre Joly — Freelance tech lead..."`

---

## WHAT'S ALREADY GOOD

These are done right — don't break them:

| Item | Details |
|---|---|
| `<html lang="en">` ✅ | Set in `BaseLayout.astro` |
| Canonical URLs ✅ | Present on all pages via `<link rel="canonical">` |
| robots.txt ✅ | Correctly allows all crawlers and references sitemap |
| RSS feed ✅ | Exists at `/til/rss.xml`, linked in `<head>` |
| Unique page titles ✅ | All 21 pages have distinct titles |
| Open Graph tags ✅ | Present on all pages (image broken, but tags exist) |
| Twitter Card tags ✅ | `summary_large_image`, creator handle set |
| Clean URLs ✅ | All URLs are descriptive and slug-based |
| Heading hierarchy ✅ | H1→H2→H3 structure is correct on all pages |
| Semantic HTML ✅ | `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<time>`, `<dl>` used correctly |
| Image lazy loading ✅ | Astro auto-adds `loading="lazy" decoding="async"` to content images |
| WebP image conversion ✅ | Astro converts PNG content images to WebP (confirmed in dist) |
| Image alt text ✅ | TIL post images have descriptive alt text |
| Breadcrumb navigation ✅ | All detail pages have visible breadcrumb nav |
| `aria-*` attributes ✅ | Decorative elements use `aria-hidden="true"`, nav links use `aria-current` |
| Sitemap coverage ✅ | All 21 public pages are in the sitemap |
| Sitemap domain ✅ | Production domain `https://j2y.dev` is correctly set |
| Favicon (SVG + ICO) ✅ | Both formats present |

---

## PRIORITISED ACTION CHECKLIST

Copy this and work through it:

### Immediate (30 mins each)
- [ ] **Create `public/og-default.png`** — 1200×630px OG image (unblocks all social sharing)
- [ ] **Add `og:type="article"` prop** to `BaseLayout.astro` and pass it from TIL/work slugs
- [ ] **Create `src/pages/404.astro`** — basic branded 404 with nav back home
- [ ] **Create `public/llms.txt`** — copy from template above

### Short-term (1-2 hours total)
- [ ] **Add `description` to TIL frontmatter** — write real descriptions for all 6 posts
- [ ] **Add `description` field to TIL schema** in `src/content.config.ts`
- [ ] **Update `src/pages/til/[slug].astro`** to use description field
- [ ] **Update `src/pages/til/rss.xml.ts`** to use descriptions in feed items

### Structured Data Sprint (2-3 hours)
- [ ] **Add `jsonLd` prop to `BaseLayout.astro`**
- [ ] **Add `Person` + `WebSite` JSON-LD to `index.astro`**
- [ ] **Add `ProfilePage` JSON-LD to `about.astro`**
- [ ] **Add `BlogPosting` JSON-LD to `til/[slug].astro`**
- [ ] **Add `BreadcrumbList` JSON-LD to `work/[slug].astro`**, `projects/[slug].astro`, `til/[slug].astro`

### Polish (ongoing)
- [ ] **Add `og:locale`** to `BaseLayout.astro`
- [ ] **Create `apple-touch-icon.png`** and link it
- [ ] **Add `relatedTil` links** between connected content pieces
- [ ] **Update sitemap config** with `changefreq`/`priority`/`lastmod`
- [ ] **Host profile photo locally** using `astro:assets`

---

*Audit generated by Jarvis (OpenClaw research agent) — 2026-03-20*
