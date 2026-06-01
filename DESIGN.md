# Design System — j2y.dev

## Aesthetic direction

Swiss precision with a developer's sense of humor — a portfolio that signals 20 years of serious enterprise work while being unmistakably built by a real person with opinions.

## Typography

| Role    | Font              | Weight    | Scale                        |
| ------- | ----------------- | --------- | ---------------------------- |
| Display | Plus Jakarta Sans | 700–800   | 2.25rem–3rem, tracking -0.03em |
| UI/Body | Plus Jakarta Sans | 400–600   | 0.875rem–1rem, leading 1.6   |
| Code    | JetBrains Mono    | 400–500   | 0.875rem, leading 1.7        |

**Migration from Inter:** Plus Jakarta Sans is a humanist geometric sans with more warmth and personality than Inter while remaining readable and professional. The difference is felt rather than named — it makes the site read like a person wrote it.

**JetBrains Mono** is the brand anchor. It appears in: the `[j2y]` logo, the terminal block, the location badge, stack tags, and the footer. It must never be swapped.

## Colour palette

This is a **dual-personality system**. Dark mode and light mode are not inverses of each other — they are distinct experiences sharing a neutral scaffold.

### Dark mode — "terminal / hacker"

| Token           | Value                        | Usage                            |
| --------------- | ---------------------------- | -------------------------------- |
| `bg-primary`    | `#09090b` (zinc-950)         | Page background                  |
| `bg-surface`    | `#18181b` (zinc-900)         | Cards, panels                    |
| `bg-surface-2`  | `#27272a` (zinc-800)         | Hover states, nested surfaces    |
| `text-primary`  | `#fafafa` (zinc-50)          | Headings, key text               |
| `text-secondary`| `#a1a1aa` (zinc-400)         | Body, meta, descriptions         |
| `text-muted`    | `#52525b` (zinc-600)         | Timestamps, decorative labels    |
| `border`        | `rgba(255,255,255,0.08)`     | Card borders, dividers           |
| `accent`        | `oklch(62% 0.20 255)`        | Blue/indigo — links, CTAs, focus |
| `accent-glow`   | `oklch(55% 0.20 255 / 0.35)` | Button shadow, section glow      |

### Light mode — "human / builder"

| Token           | Value                        | Usage                            |
| --------------- | ---------------------------- | -------------------------------- |
| `bg-primary`    | `#fafafa` (zinc-50)          | Page background                  |
| `bg-surface`    | `#f4f4f5` (zinc-100)         | Cards, panels                    |
| `bg-surface-2`  | `#e4e4e7` (zinc-200)         | Hover states, nested surfaces    |
| `text-primary`  | `#18181b` (zinc-900)         | Headings, key text               |
| `text-secondary`| `#71717a` (zinc-500)         | Body, meta, descriptions         |
| `text-muted`    | `#a1a1aa` (zinc-400)         | Timestamps, decorative labels    |
| `border`        | `rgba(0,0,0,0.08)`           | Card borders, dividers           |
| `accent`        | `#b45309` (amber-700)        | Warm amber — links, CTAs, focus  |
| `accent-glow`   | `oklch(62% 0.16 58 / 0.30)`  | Button shadow, section glow      |

### Semantic (both modes)

| Token     | Light     | Dark      |
| --------- | --------- | --------- |
| `success` | `#16a34a` | `#4ade80` |
| `warning` | `#d97706` | `#fbbf24` |
| `error`   | `#dc2626` | `#f87171` |

### The terminal block — the bridge

The terminal block (`#1e1e1e` background, `#8fbc8f` green text) is **always dark**, in both modes. It is the single constant visual element that bridges the two personalities. It must never be inverted, lightened, or restyled for light mode.

### Ambient orbs

Dark mode: cool blue/indigo orbs (`oklch(45% 0.15 240 / 0.30)`, `oklch(42% 0.15 275 / 0.20)`)
Light mode: warm amber/yellow orbs (`oklch(78% 0.12 60 / 0.25)`, `oklch(80% 0.10 50 / 0.18)`)

This gives light mode its own ambient character rather than feeling like "dark mode with the lights on."

## Spacing scale

Base unit: **4px**

| Token  | Value |
| ------ | ----- |
| `xs`   | 4px   |
| `sm`   | 8px   |
| `md`   | 16px  |
| `lg`   | 24px  |
| `xl`   | 48px  |
| `2xl`  | 96px  |

## Layout

- Grid: 12-column CSS grid, 24px gutter
- Max content width: **896px** (`max-w-4xl`)
- Body padding: `px-6` (24px) on all breakpoints
- Prefer CSS grid over flexbox for all layout decisions

## Motion

- Principle: **minimal-functional** — motion explains, never decorates
- Default transition: `200ms ease-out`
- Mode switch: `200ms ease` on `background-color` and `color`
- `prefers-reduced-motion`: no transitions, no orb drift animations

## Creative risks taken

1. **Plus Jakarta Sans over Inter** — more humanist warmth and personality while staying legible and professional. The site reads like a person, not a template.

2. **Amber accent on light mode** — light mode has its own accent (`#b45309`, amber-700) rather than being a lighter version of the dark mode blue. The two modes represent two facets: terminal-dark is the "hacker self," warm-light is the "human self." The terminal block anchors both.

3. **Dual-personality ambient orbs** — dark orbs are cool blue/indigo; light orbs are warm amber/yellow. Light mode has genuine identity, not just inverted colors.

## Not in scope

- Custom typefaces beyond the stated fonts (no display serifs, no variable font experiments)
- Complex animation or scroll effects
- Third-party component libraries (shadcn, etc.)
- Design tokens as JS/JSON exports (CSS custom properties are sufficient for this stack)

## Implementation status (as of 2026-06-01)

**Done:**
- `--color-accent` in `global.css`: default amber (`#b45309`), `.dark` override blue (`oklch(62% 0.20 255)`)
- `--font-sans` updated to Plus Jakarta Sans; Google Fonts preconnect added to `BaseLayout.astro`
- `glass-card` hover: transparent base → visible lift + shadow on hover
- `page-ambient`: light mode now uses warm amber/yellow orbs
- `gradient-heading`: light mode now zinc → amber direction
- `btn-gradient`: light=amber, dark=blue/violet
- `section-glow`: light mode now uses amber glow
- `ProjectCard.astro`: internal layout migrated to CSS grid; accent hardcodes removed, uses `var(--color-accent)`
- `TilEntry.astro`: internal layout migrated to CSS grid; accent hardcodes removed
- `BaseLayout.astro`: `bg-white` → `bg-zinc-50`
- `about.astro`: LinkedIn link accent fixed (was `blue light / orange dark`, now uses `var(--color-accent)`)
- `Hero.astro`: orb classes updated — light=amber/yellow, dark=blue/violet (unchanged)
- `work/index.astro`: LLM dramatic payoff copy removed

**Still pending:**
- Any remaining hardcoded `text-blue-*` hover states in other components not yet reviewed
- Case study copy rewrites per `COPY_REVIEW.md`
