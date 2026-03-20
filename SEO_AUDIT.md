# SEO & Discoverability Audit — j2y.dev (Re-Audit)

**Audited:** 2026-03-20 (Re-audit — original audit also 2026-03-20)
**Site:** https://j2y.dev
**Stack:** Astro 6 static site, deployed on Vercel
**Previous audit:** Same file, same date (replaced)

---

## Summary

| Metric | Count |
|---|---|
| **Total findings** | 22 |
| ✅ **Fixed since last audit** | 8 |
| ⚠️ **Still needs work** | 6 |
| ❌ **New issues found** | 8 |

---

## What Was Fixed ✅

These were flagged in the first audit and are now resolved:

| # | Finding | Notes |
|---|---|---|
| 1 | OG default image | `public/og-default.png` created, correct 1200×630px |
| 2 | JSON-LD structured data | Person + WebSite on home, ProfilePage on about, BlogPosting + BreadcrumbList on TIL detail, BreadcrumbList on work and project detail |
| 3 | `og:type` prop | Added to `BaseLayout.astro`; "article" correctly set on TIL detail and work detail pages |
| 4 | TIL meta descriptions | `description` field added to schema; auto-extract from body content implemented; all 6 TIL posts have frontmatter descriptions |
| 5 | llms.txt | Created at `public/llms.txt` with full site context |
| 6 | Custom 404 page | `src/pages/404.astro` created with branded layout and nav back home |
| 7 | Favicon/manifest | SVG, ICO, apple-touch-icon (180×180 ✅), site.webmanifest with 192/512 icons — all linked in BaseLayout |
| 8 | Client logos | Moved to content collection `src/content/clients/` with Astro `image()` schema |

---

## Scorecard

| Area | Status |
|---|---|
| Title & meta descriptions | ✅ Good |
| Open Graph / Twitter Cards | ⚠️ Needs improvement |
| Structured Data (JSON-LD) | ⚠️ Partial — index pages and work detail incomplete |
| Sitemap | ⚠️ Needs improvement |
| robots.txt | ✅ Good |
| llms.txt | ✅ Good |
| Canonical URLs | ⚠️ 404 page canonical incorrect |
| Heading hierarchy | ✅ Good |
| RSS feed | ❌ Descriptions not updated |
| Favicon | ✅ Good |
| Images | ⚠️ Profile photo needs work |
| Internal linking | ⚠️ Still minimal |
| 404 page | ⚠️ Exists but needs noindex |
| `<html lang>` | ✅ Good |

---

## HIGH PRIORITY

---

### 1. RSS Feed Descriptions Still Use Hashtags

**Finding:** RSS feed item `<description>` still outputs only tag hashtags  
**Status:** ⚠️ Not fixed (was High in previous audit)  
**Priority:** High

**Details:**
`src/pages/til/rss.xml.ts` line 14 was not updated despite `description` field now existing in the TIL schema:

```typescript
// CURRENT (broken):
description: post.data.tags.map((t) => `#${t}`).join(' '),
```

RSS readers (Feedly, NetNewsWire, etc.) show this as:
> `#python #ml #xgboost #data-science`

All 6 items in the feed have this problem — confirmed in built output at `dist/til/rss.xml`.

**Action:**
Update `src/pages/til/rss.xml.ts`:

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('til', ({ data }) => !data.draft);
  const sortedPosts = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'j2y.dev — Today I Learned',
    description: 'Short notes on things Alex Joly discovers while building software.',
    site: context.site!.toString(),
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      // Use description field — it's now populated on all posts
      description: post.data.description ?? `Tagged: ${post.data.tags.map((t) => `#${t}`).join(' ')}`,
      categories: post.data.tags,
      link: `/til/${post.id}/`,
    })),
    customData: `<language>en</language>`,
  });
}
```

**Time:** 5 minutes.

---

### 2. 404 Page Missing `noindex` + Canonical URL is Wrong

**Finding:** The 404 page is indexable and has a wrong canonical URL  
**Status:** ❌ New issue  
**Priority:** High

**Details:**
The built `dist/404.html` contains:

```html
<link rel="canonical" href="https://j2y.dev/404/" />
```

Two problems:
1. **Wrong canonical** — The canonical points to `/404/` as if it's a real page. 404 pages shouldn't canonicalize to themselves.
2. **Missing noindex** — Search engines should not index error pages. No `<meta name="robots" content="noindex">` is present.

Confirmed in built output:
```html
<title>404 — Page Not Found — j2y.dev</title>
<meta name="description" content="This page doesn't exist. It may have moved or been deleted.">
<link rel="canonical" href="https://j2y.dev/404/">
<!-- No noindex anywhere -->
```

**Action:**
Update `src/layouts/BaseLayout.astro` to support a `noindex` prop, then pass it from 404.astro:

```astro
// BaseLayout.astro — add to interface:
interface Props {
  // ...existing...
  noindex?: boolean;
}
const { noindex = false } = Astro.props;

// In <head>:
{noindex && <meta name="robots" content="noindex,nofollow" />}
```

Update `src/pages/404.astro`:

```astro
<BaseLayout
  title="404 — Page Not Found"
  description="This page doesn't exist. It may have moved or been deleted."
  noindex={true}
  canonicalUrl="https://j2y.dev/"
>
```

(Setting canonical to homepage is a common approach for 404s — it signals to Google that `/` is the authoritative page for lost traffic.)

---

### 3. Projects Detail Pages Missing `ogType="article"`

**Finding:** Project pages use `og:type="website"` instead of `"article"`  
**Status:** ❌ New issue  
**Priority:** High

**Details:**
`src/pages/projects/[slug].astro` does **not** pass `ogType` to `BaseLayout`, so it defaults to `"website"`. Meanwhile `work/[slug].astro` correctly uses `ogType="article"`. The omission is inconsistent and incorrect.

Confirmed in built output:
```html
<!-- projects/badi-predictor/ -->
<meta property="og:type" content="website" />
```

**Action:**
In `src/pages/projects/[slug].astro`, add the `ogType` prop to the `<BaseLayout>` call:

```astro
<BaseLayout
  title={title}
  description={item.data.description}
  ogTitle={`${title} — j2y.dev`}
  ogDescription={item.data.description}
  ogType="article"          {/* ADD THIS */}
  structuredData={structuredData}
>
```

**Time:** 2 minutes.

---

## MEDIUM PRIORITY

---

### 4. Work Detail Pages Missing Article/CreativeWork JSON-LD Schema

**Finding:** Work case study pages only have BreadcrumbList — no content-level schema  
**Status:** ❌ New issue  
**Priority:** Medium

**Details:**
`dist/work/canton-thurgau/index.html` contains:
```json
[{"@context":"https://schema.org","@type":"BreadcrumbList",...}]
```

That's it. No schema describing the *content* of the case study. By contrast, TIL detail pages correctly have a `BlogPosting` schema. Work pages should have at minimum a `Article` or `WebPage` schema, or ideally a custom type like `CreativeWork`. This helps Google understand these are portfolio case studies authored by Alexandre Joly.

**Action:**
Update `src/pages/work/[slug].astro`:

```typescript
const { title, client, agency, role, stack, date, description } = item.data;
const isoDate = new Date(date + '-01').toISOString(); // date is stored as "YYYY-MM"

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: item.data.description,
    datePublished: isoDate,
    author: {
      '@type': 'Person',
      '@id': 'https://j2y.dev/#alex',
      name: 'Alexandre Joly',
      url: 'https://j2y.dev/about',
    },
    publisher: {
      '@type': 'Person',
      name: 'Alexandre Joly',
      url: 'https://j2y.dev',
    },
    url: `https://j2y.dev/work/${item.id}/`,
    mainEntityOfPage: `https://j2y.dev/work/${item.id}/`,
    keywords: stack.join(', '),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Work', item: 'https://j2y.dev/work' },
      { '@type': 'ListItem', position: 2, name: title, item: `https://j2y.dev/work/${item.id}/` },
    ],
  },
];
```

---

### 5. `og:image:width` and `og:image:height` Missing

**Finding:** OG image size hints are absent from all pages  
**Status:** ❌ New issue  
**Priority:** Medium

**Details:**
LinkedIn, Facebook, and Slack use `og:image:width` and `og:image:height` to validate image dimensions before fetching. Without them, platforms may refuse to show the image or show a blank card. The OG image is now correctly 1200×630, but the size hints aren't declared.

Confirmed: zero `og:image:width` or `og:image:height` anywhere in the dist.

**Action:**
Add to `src/layouts/BaseLayout.astro` in the Open Graph section, after the `og:image` tag:

```astro
<meta property="og:image" content={new URL(ogImage, Astro.site)} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
```

Note: This hardcodes 1200×630. If per-page OG images are ever added with different dimensions, this prop will need to become dynamic. Fine for now.

**Time:** 3 minutes.

---

### 6. Sitemap Still Missing `lastmod`, `changefreq`, `priority`

**Finding:** No `lastmod` or crawl hints on any sitemap entry  
**Status:** ⚠️ Not fixed (was Medium in previous audit)  
**Priority:** Medium

**Details:**
`dist/sitemap-0.xml` still has 21 bare `<url>` entries with only `<loc>`. `astro.config.mjs` still uses the minimal `sitemap()` with no options.

Google uses `lastmod` to prioritise re-crawling. For a content site with TIL posts (dated content), this is a missed signal.

**Action:**
Update `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://j2y.dev',
  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url === 'https://j2y.dev/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
          item.lastmod = new Date();
          return item;
        }
        if (item.url.includes('/til/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
          item.lastmod = new Date();
          return item;
        }
        if (item.url.includes('/work/') || item.url.includes('/projects/')) {
          item.changefreq = 'yearly';
          item.priority = 0.6;
          item.lastmod = new Date();
          return item;
        }
        item.changefreq = 'monthly';
        item.priority = 0.5;
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
});
```

For proper per-page `lastmod` based on content date (TIL `date` field), you'd need to maintain a URL→date map in the serializer, or use a custom sitemap page. The above gets you `lastmod` on all pages immediately.

---

### 7. Profile Photo: External CDN + Above-Fold with `loading="lazy"`

**Finding:** About page photo loaded from GitHub CDN; lazy-loaded despite being above the fold  
**Status:** ⚠️ Not fixed (was Low in previous audit — now elevated)  
**Priority:** Medium

**Details:**
`src/pages/about.astro` uses:

```astro
<img
  src="https://avatars.githubusercontent.com/u/591059?v=4"
  alt="Alexandre Joly"
  loading="lazy"    ← WRONG for above-fold hero image
/>
```

Two problems:
1. **External dependency** — GitHub could change the URL format; photo isn't served via Astro's optimisation pipeline (no WebP, no controlled sizing)
2. **LCP penalty** — The profile photo is the largest visible element on the about page. `loading="lazy"` delays the browser from requesting it until paint time, directly hurting Largest Contentful Paint.

**Action:**
1. Download and save the photo: `public/images/alexandre-joly.jpg` (or `src/assets/` for Astro Image processing)
2. Update `src/pages/about.astro`:

```astro
---
import { Image } from 'astro:assets';
import profilePhoto from '../assets/alexandre-joly.jpg';
---

<Image
  src={profilePhoto}
  alt="Alexandre Joly — Freelance Tech Lead based in Zurich"
  width={400}
  height={400}
  class="w-full h-full object-cover"
  loading="eager"
  fetchpriority="high"
/>
```

Using `astro:assets` `Image` gets you: automatic WebP/AVIF conversion, correct `width`/`height` to prevent CLS, and lazy-load opt-out.

---

### 8. `og:locale` Tag Missing

**Finding:** No `og:locale` meta tag on any page  
**Status:** ⚠️ Not fixed (was Low in previous audit)  
**Priority:** Medium

**Details:**
Open Graph protocol specifies `og:locale` to declare the content language. Missing on all pages. While not a critical ranking factor, it's part of the complete OG spec and is used by some social platforms for content localisation.

**Action:**
Add to `src/layouts/BaseLayout.astro` in the Open Graph section:

```astro
<!-- Open Graph -->
<meta property="og:locale" content="en_US" />
<meta property="og:type" content={ogType} />
<meta property="og:title" content={resolvedOgTitle} />
<!-- ...rest of OG tags... -->
```

**Time:** 2 minutes.

---

### 9. Logo Bar Duplicate Images Have Non-Empty Alt Text

**Finding:** The second (decorative) set of logos in `LogoBar.astro` has real alt text  
**Status:** ❌ New issue  
**Priority:** Medium

**Details:**
`src/components/LogoBar.astro` renders each client logo twice for the seamless CSS scroll loop. The second copy correctly uses `aria-hidden="true"` on the *container*, but the `<img>` inside still has descriptive alt text:

```astro
<!-- Duplicate copy for seamless loop -->
{clients.map((c) => (
  <div class="logo-slot" aria-hidden="true">
    <img
      src={c.data.logo.src}
      alt={c.data.name}    ← Should be alt="" since aria-hidden on parent
      ...
    />
  </div>
))}
```

While `aria-hidden="true"` on the parent div suppresses the images from the accessibility tree, having descriptive `alt` text is inconsistent and could confuse some screen readers depending on how deeply they process `aria-hidden`. The correct pattern for decorative duplicates is `alt=""`.

**Action:**
Update `src/components/LogoBar.astro`, change the second copy:

```astro
<!-- Duplicate copy for seamless loop -->
{clients.map((c) => (
  <div class="logo-slot" aria-hidden="true">
    <img
      src={c.data.logo.src}
      alt=""              {/* Decorative duplicate — empty alt */}
      class="logo-img"
      loading="lazy"
      decoding="async"
    />
  </div>
))}
```

**Time:** 5 minutes.

---

### 10. `site.webmanifest` Missing Required PWA Fields

**Finding:** Web app manifest is missing `description` and `start_url`  
**Status:** ❌ New issue  
**Priority:** Medium

**Details:**
`public/site.webmanifest` currently:

```json
{
  "name": "j2y.dev",
  "short_name": "[j2y]",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#18181b",
  "background_color": "#18181b",
  "display": "standalone"
}
```

Missing:
- `description` — Required for Chrome's PWA installability criteria and "Add to Home Screen" prompts
- `start_url` — Without it, browsers default to the current URL when the app is launched from home screen (unreliable)
- `lang` — Declares manifest language (matches site language)

**Action:**
Update `public/site.webmanifest`:

```json
{
  "name": "j2y.dev — Alexandre Joly",
  "short_name": "[j2y]",
  "description": "Alexandre Joly — Freelance Tech Lead & Full-Stack Developer based in Zurich, Switzerland.",
  "start_url": "/",
  "lang": "en",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ],
  "theme_color": "#18181b",
  "background_color": "#18181b",
  "display": "standalone"
}
```

Note: `"purpose": "any maskable"` requires that the icon has safe-zone padding (content in the center 80%). If the current icons bleed to the edges, split into two entries — one `"any"` and one `"maskable"`.

**Time:** 5 minutes.

---

## LOW PRIORITY

---

### 11. Index Pages (Work, Projects, TIL) Have No JSON-LD

**Finding:** The three main index pages have no structured data whatsoever  
**Status:** ❌ New issue  
**Priority:** Low

**Details:**

| Page | Current JSON-LD |
|---|---|
| `/work/` | None |
| `/projects/` | None |
| `/til/` | None |
| `/` | ✅ WebSite + Person |
| `/about/` | ✅ ProfilePage |

`ItemList` schemas on index pages help Google understand the relationship between the index page and its child pages, and can surface sitelinks and rich results.

**Action:**

`src/pages/work/index.astro`:

```astro
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Client Work — Alexandre Joly',
  url: 'https://j2y.dev/work',
  description: 'Case studies from client engagements — Swiss enterprise software, banking, EV infrastructure, government.',
  itemListElement: sortedWork.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.data.title,
    url: `https://j2y.dev/work/${item.id}/`,
  })),
};
```

Same pattern for `projects/index.astro` and `til/index.astro`.

---

### 12. `article:published_time` and `article:author` OG Tags Missing on Article Pages

**Finding:** TIL and work detail pages set `og:type="article"` but don't include article-namespace OG properties  
**Status:** ❌ New issue  
**Priority:** Low

**Details:**
When `og:type="article"` is set, Facebook/Open Graph expects additional `article:*` properties. Without them, the social card is less rich:

- `article:published_time` — ISO 8601 date
- `article:author` — URL of the author
- `article:tag` — content tags

Confirmed: no `article:published_time` on any TIL or work page.

**Action:**
Add an optional `articleMeta` prop to `BaseLayout.astro`:

```astro
interface Props {
  // ...existing...
  articleMeta?: {
    publishedTime?: string;    // ISO 8601
    modifiedTime?: string;
    author?: string;           // URL
    tags?: string[];
  };
}
const { articleMeta } = Astro.props;
```

In `<head>`:
```astro
{articleMeta?.publishedTime && (
  <meta property="article:published_time" content={articleMeta.publishedTime} />
)}
{articleMeta?.modifiedTime && (
  <meta property="article:modified_time" content={articleMeta.modifiedTime} />
)}
{articleMeta?.author && (
  <meta property="article:author" content={articleMeta.author} />
)}
{articleMeta?.tags?.map(tag => (
  <meta property="article:tag" content={tag} />
))}
```

Then in `src/pages/til/[slug].astro`:

```astro
<BaseLayout
  title={title}
  description={metaDescription}
  ogType="article"
  articleMeta={{
    publishedTime: isoDate,
    modifiedTime: isoDate,
    author: 'https://j2y.dev/about',
    tags: tags,
  }}
  structuredData={structuredData}
>
```

---

### 13. Internal Linking Still Minimal

**Finding:** No cross-linking between related TIL posts and work/project pages  
**Status:** ⚠️ Not implemented (was Medium in previous audit)  
**Priority:** Low

**Details:**
Clear topical relationships still exist and remain unexploited:
- `til/xgboost-time-series-leak` → `projects/badi-predictor` (XGBoost usage)
- `til/module-federation-shared-deps` → `work/swiss-bank-card-center` (micro-frontend project)
- `til/k3s-longhorn-node-selector` → `projects/homelab`
- `til/self-signed-certificate-authority-creation-with-open-ssl` → `projects/homelab`

**Action (quick wins — add inline links to TIL post bodies):**

`src/content/til/xgboost-time-series-leak.md` — append:

```markdown
---
*Related: I use XGBoost with proper temporal splits for occupancy prediction in [badi-predictor](/projects/badi-predictor).*
```

`src/content/til/module-federation-shared-deps.md` — append:

```markdown
---
*Related: I applied this configuration to a production micro-frontend migration — see the [Card Center Platform case study](/work/swiss-bank-card-center).*
```

`src/content/til/k3s-longhorn-node-selector.md` — append:

```markdown
---
*Related: Part of my [homelab setup](/projects/homelab) — K3s on Raspberry Pis with Longhorn for persistent storage.*
```

---

### 14. Name Inconsistency: "Alex" vs "Alexandre" in Meta Descriptions

**Finding:** Inconsistent name form across index page meta descriptions  
**Status:** ⚠️ Partially fixed — still inconsistent on two index pages  
**Priority:** Low

**Details:**

| Page | Meta description name |
|---|---|
| `/` | "Alexandre Joly" ✅ |
| `/about/` | "Alexandre Joly" ✅ |
| `/work/` | "Alex Joly" ❌ |
| `/projects/` | "Alex Joly" ❌ |
| `/til/` | "Alex Joly" ❌ |

**Action:**

`src/pages/work/index.astro`:
```astro
description="Client work and case studies — Alexandre Joly, freelance tech lead and full-stack developer based in Zurich."
```

`src/pages/projects/index.astro`:
```astro
description="Personal and open-source projects by Alexandre Joly — side projects, experiments, tools built for fun."
```

`src/pages/til/index.astro`:
```astro
description="Today I Learned — short notes on things Alexandre Joly discovers while building software."
```

---

## WHAT'S ALREADY GOOD

These are solid — don't break them:

| Item | Details |
|---|---|
| `<html lang="en">` ✅ | Set in `BaseLayout.astro` |
| Canonical URLs ✅ | Present on all pages (except 404 — see Finding #2) |
| robots.txt ✅ | Correctly allows all crawlers and references sitemap at correct URL |
| RSS feed ✅ | Exists at `/til/rss.xml`, linked in `<head>` — descriptions need fixing (Finding #1) |
| Unique page titles ✅ | All 22 pages have distinct titles |
| Open Graph base tags ✅ | og:title, og:description, og:url, og:image, og:site_name on all pages |
| Twitter Card tags ✅ | `summary_large_image`, creator handle `@jolyAlexandre` set |
| OG image ✅ | `public/og-default.png` — 1200×630px, correct format |
| Favicon ✅ | SVG + ICO + apple-touch-icon (180×180) + manifest with 192/512 icons |
| JSON-LD: Home, About ✅ | Person, WebSite, ProfilePage all present and correct |
| JSON-LD: TIL detail ✅ | BlogPosting + BreadcrumbList — all required fields present |
| JSON-LD: Work/Project detail ✅ | BreadcrumbList present (Article schema for work is recommended — see Finding #4) |
| og:type ✅ | "article" on TIL detail ✅ and work detail ✅; "website" on index pages ✅ |
| TIL descriptions ✅ | All 6 TIL posts have real frontmatter descriptions; auto-extract fallback implemented |
| llms.txt ✅ | Well-structured, contains site overview, work examples, social links |
| 404 page ✅ | Branded page exists — needs noindex (Finding #2) |
| Sitemap coverage ✅ | All 21 content pages present; 404 correctly excluded |
| Sitemap domain ✅ | Production domain `https://j2y.dev` correctly set |
| Clean URLs ✅ | Descriptive slug-based URLs throughout |
| Heading hierarchy ✅ | H1→H2→H3 correct on all page types |
| Semantic HTML ✅ | `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<time>`, `<dl>` used correctly |
| Image lazy loading ✅ | Astro auto-adds `loading="lazy" decoding="async"` to content images |
| WebP image conversion ✅ | TIL post images (n8n workflow screenshots) converted to WebP in dist |
| Image alt text ✅ | TIL post images and logo bar (first copy) have descriptive alt text |
| Breadcrumb nav ✅ | All detail pages have visible breadcrumb navigation |
| `aria-*` attributes ✅ | Decorative elements use `aria-hidden="true"`, nav links use `aria-current` |
| Logo bar reduced motion ✅ | `@media (prefers-reduced-motion: reduce)` stops animation |
| `prefers-color-scheme` ✅ | Dark mode inline script avoids FOUC |

---

## PRIORITISED ACTION CHECKLIST

### Immediate (< 10 mins each)

- [ ] **Fix RSS feed descriptions** (`src/pages/til/rss.xml.ts`) — use `post.data.description` (5 min)
- [ ] **Add `noindex` to 404 page** — add `noindex` prop to BaseLayout, pass from 404.astro (10 min)
- [ ] **Fix 404 canonical URL** — set `canonicalUrl="https://j2y.dev/"` in 404.astro (2 min)
- [ ] **Add `ogType="article"` to projects/[slug].astro** (2 min)
- [ ] **Add `og:image:width/height/type`** to BaseLayout.astro (3 min)
- [ ] **Add `og:locale`** to BaseLayout.astro (2 min)
- [ ] **Fix logo bar duplicate image `alt=""`** in LogoBar.astro (5 min)
- [ ] **Update site.webmanifest** — add `description`, `start_url`, `lang` (5 min)

### Short-term (30 min total)

- [ ] **Add Article JSON-LD to work/[slug].astro** — describe case studies as authored articles
- [ ] **Add `article:published_time` etc.** to BaseLayout via `articleMeta` prop
- [ ] **Fix name inconsistency** — "Alexandre Joly" in work/projects/til index descriptions
- [ ] **Update sitemap config** — add `serialize()` with `changefreq`/`priority`/`lastmod`

### Polish (ongoing)

- [ ] **Host profile photo locally** — download, use `astro:assets` Image with `loading="eager"`
- [ ] **Add internal links in TIL posts** — 3 cross-links (xgboost→badi, module-fed→bank, k3s→homelab)
- [ ] **Add ItemList JSON-LD** to work, projects, TIL index pages

---

_Re-audit generated by Jarvis (OpenClaw research agent) — 2026-03-20_
