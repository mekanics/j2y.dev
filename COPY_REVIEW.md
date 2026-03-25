# Copy Review — j2y.dev LLM Audit

**Files reviewed:** 26 (6 work case studies, 9 project descriptions, 6 TIL posts, pages/index.astro, pages/about.astro, components/Hero.astro, components/Footer.astro, public/llms.txt)

**Overall LLM Score:** 4.3/10 — The site has personality but several files — especially the TLS cert TIL and the Swiss bank case study — read like ChatGPT wrote them. The work case studies are the biggest offenders. TIL posts are mostly fine.

---

## 🚨 Top 5 Worst Offenders

| Rank | File | Score | Main Crime |
|------|------|-------|------------|
| 1 | `til/self-signed-certificate-authority-creation-with-open-ssl.md` | **8/10** | Full GPT blog post structure — "Why create X", numbered reasons, "## Conclusion", "robust foundation" |
| 2 | `work/swiss-bank-card-center.md` | **8/10** | "No X. No Y. Just Z." pattern, one-word dramatic paragraphs, every paragraph ends with a neat punchline |
| 3 | `work/spuehl-recipe-governance.md` | **7/10** | Staccato dramatic buildup, "not managed, eliminated", "The hard part wasn't X — it was Y" |
| 4 | `work/canton-thurgau.md` | **7/10** | "The kind of work where…", triple-parallel structure, "comprehensive component library", "stakeholders" |
| 5 | `pages/about.astro` | **5/10** | "Where software meets real-world manufacturing", "navigating Swiss enterprise stakeholders", too-neat bio |

---

## File-by-File Review

---

### `src/pages/index.astro`

**LLM Score: 2/10**

The page is mostly layout/component code. The human-readable text is minimal and clean.

**Flagged:**
> "Short notes on things I discover while building."

**Why:** Fine on its own, but "things I discover while building" is slightly manufactured-casual. 

**Suggested rewrite:** "Short notes on things I run into while building." or just "Short notes."

---

### `src/pages/about.astro`

**LLM Score: 5/10**

The bio reads well in places but has several LLM tells. The timeline entry for Bühler is a clear red flag.

**Flagged #1 (Timeline — Bühler AG):**
> "Where software meets real-world manufacturing."

**Why:** "Where X meets Y" is explicitly an LLM construction. It also adds nothing — you just described building control software for mills. What does this add?

**Suggested rewrite:** Cut it. The previous sentence does the job. Or: "Making flour mills actually work in software wasn't glamorous, but I learned what production-grade really means."

---

**Flagged #2 (Timeline — Freelance):**
> "Banking, manufacturing, government — the problems where getting it wrong has consequences."

**Why:** The em-dash dramatic pause + grand philosophical conclusion pattern. "The problems where getting it wrong has consequences" sounds like an AI writing a LinkedIn post about stakes.

**Suggested rewrite:** "Banking, manufacturing, government — the sectors where bugs aren't just annoying." or just cut the second clause entirely. The list of sectors says enough.

---

**Flagged #3 (Bio):**
> "I work in the space where architecture decisions have business consequences."

**Why:** "I work in the space where X" is an LLM framing device. It's also vague — every architecture decision has business consequences.

**Suggested rewrite:** "My work sits at the intersection of technical decisions and business outcomes." — wait, that's also LLM. Try: "The projects I take on tend to be ones where the architecture matters — banking, government, infrastructure. Getting it wrong isn't theoretical."

---

**Flagged #4 (Bio):**
> "Banking, manufacturing, government — environments where 'we'll figure it out later' isn't a strategy. I scope problems, lead teams, and deliver working software. That's the job."

**Why:** Two LLM moves here. First: "environments where X isn't a strategy" is a setup for a pithy conclusion. Second: "I scope it. I lead it. I ship it." (Hero) and "I scope problems, lead teams, and deliver working software" — forced tri-colon. "That's the job" is the classic LLM mic-drop sign-off.

**Suggested rewrite:** "In these sectors, 'we'll fix it in the next sprint' tends to have actual consequences. I come in, understand the problem, lead the technical work, and make sure it ships. Pretty straightforward." 

---

**Flagged #5 (Bio):**
> "Trilingual (English, German, French), which matters more than it sounds when you're navigating Swiss enterprise stakeholders across three language regions."

**Why:** "Swiss enterprise stakeholders" — "stakeholders" is flagged language. Also "which matters more than it sounds" is a setup-payoff construction. And the phrase is doing too much work: it feels like justifying the trilingual claim with an overly polished explanation.

**Suggested rewrite:** "Trilingual — English, German, French — which actually matters when your clients are spread across Romandy, Deutschschweiz, and everything in between."

---

### `src/components/Hero.astro`

**LLM Score: 4/10**

Most terminal lines are fine. One is a clear LLM construction.

**Flagged:**
> "I scope it. I lead it. I ship it."

**Why:** Forced tri-colon parallelism. This is the signature LLM rhetorical flourish — three short parallel clauses as a climactic statement. It sounds like a LinkedIn headline.

**Suggested rewrite:** Pick one thing: "I own the whole thing — scope to ship." or just "I take it from brief to production." Or drop it entirely — the other lines already make this point.

---

**Flagged (minor):**
> "Enterprise backends, mobile apps, modern web — whatever ships."

**Why:** The list format with em-dash kicker is LLM-patterned, though "whatever ships" saves it a bit.

**Suggested rewrite:** "Backends, mobile apps, web — I don't have a lane, I just build what's needed."

---

### `src/components/Footer.astro`

**LLM Score: 1/10**

Minimal prose. Name, copyright, social links. Nothing to flag.

---

### `public/llms.txt`

**LLM Score: 3/10**

It's a structured data file, so some formality is expected — but a few lines feel like they were written by the very thing it's describing to.

**Flagged #1:**
> "Alexandre Joly is a freelance software architect and engineer specialising in technical leadership, full-stack development, and frontend architecture."

**Why:** Adjective stacking of roles/capabilities. "Technical leadership, full-stack development, and frontend architecture" — it's a LinkedIn summary.

**Suggested rewrite:** "Alexandre Joly is a freelance tech lead and full-stack developer based in Zurich."

---

**Flagged #2:**
> "Available for project-based technical leadership and full-stack engagements."

**Why:** "Engagements" is corporate-speak. Nobody says this out loud.

**Suggested rewrite:** "Available for freelance technical leadership and development work."

---

### `src/content/work/get-charge.md`

**LLM Score: 4/10**

Mostly solid. The context and "what we built" sections are clean. The end starts to drift.

**Flagged #1:**
> "Not just building to spec, but helping define what the product looked and felt like."

**Why:** "Not X, but Y" construction. Mild but present.

**Suggested rewrite:** "We didn't just build to spec — we shaped the digital brand strategy, which meant having opinions about what the product should look and feel like."

---

**Flagged #2:**
> "A live product used by Telekom Deutschland's customers across Europe. One of the larger consumer-facing projects KiloKilo shipped — and an early signal that EV infrastructure was going to be a significant market."

**Why:** "An early signal that X was going to be a significant market" is an LLM-y forward-looking conclusion, presented with too much confidence in hindsight. It's also a bit vague — significant compared to what?

**Suggested rewrite:** "A live product, 56,000+ stations, shipped in 2020 — before EV infrastructure became the obvious thing to build for. One of the bigger projects we shipped at KiloKilo."

---

### `src/content/work/spuehl-recipe-governance.md`

**LLM Score: 7/10**

The problem description and what-we-built sections are solid. But the "Shift" and "Outcome" sections are packed with LLM tells.

**Flagged #1:**
> "That means no audit trail. No approval process. No version control. If the wrong recipe ended up on a machine, you'd find out the hard way. The risk wasn't theoretical — it was embedded in the daily workflow."

**Why:** "No X. No Y. No Z." as dramatic buildup is one of the most recognizable LLM patterns — three staccato negatives followed by a pithy summary. "The risk wasn't theoretical — it was embedded in the daily workflow" is a textbook LLM dramatic payoff sentence.

**Suggested rewrite:** "No audit trail, no version control, no approval process. A wrong recipe on a machine meant you'd find out during production, not before."

---

**Flagged #2:**
> "The hard part wasn't the technology — it was changing how people worked. USB sticks are simple. Workflows add friction."

**Why:** "The hard part wasn't X — it was Y" is a quintessential LLM construction. The follow-up "USB sticks are simple. Workflows add friction." is overly compressed and symmetrical — it sounds like a slide deck summary, not a person talking.

**Suggested rewrite:** "The tech was straightforward. The harder thing was that USB sticks, despite everything, are simple — you grab one, walk to the machine, and it works. Adding a four-stage approval process means convincing production staff that the friction is worth it."

---

**Flagged #3:**
> "The design had to be opinionated enough to enforce compliance, but not so rigid that people would route around it. That balance came from spending time with the people who actually run production — understanding their constraints before writing a line of code."

**Why:** "X enough to Y, but not so Z that people would W" is an LLM sentence template. "Before writing a line of code" is a cliché. "That balance came from spending time with the people who actually run production" sounds like a consulting deck.

**Suggested rewrite:** "I spent time on the production floor before building anything. If the approval workflow is too much friction, people route around it — which defeats the point. Getting that right required understanding how they actually work, not how the process diagram said they should."

---

**Flagged #4:**
> "The risk of the wrong recipe reaching a machine is eliminated — not managed, eliminated."

**Why:** "Not X, eliminated" — the repeat-for-emphasis construction is peak LLM rhetorical flourish. It's trying to sound decisive and ends up sounding like a sales pitch.

**Suggested rewrite:** "The wrong recipe can't reach a machine anymore — not because there are more checks, but because the system controls the deployment." or simply: "The wrong recipe can no longer reach a machine. Full stop."

---

### `src/content/work/foodnow.md`

**LLM Score: 5/10**

The setup is strong. The technical explanation is clean. The problem is the conclusion pattern — every section wraps up with a suspiciously tidy summary sentence.

**Flagged #1:**
> "Getting that wrong adds friction. Getting it right means the platforms stay in sync without ceremony."

**Why:** "Getting X wrong does A. Getting X right does B." — perfect parallelism, LLM style. "Without ceremony" is also an LLM phrase.

**Suggested rewrite:** "Get the boundary wrong and you end up with duplicated logic and inconsistent behaviour across platforms. Get it right and changes to core logic propagate to both apps automatically."

---

**Flagged #2:**
> "A cross-platform food delivery app shipping to Swiss customers, backed by one of the country's largest retailers. Both platforms, shared business logic, one coherent product."

**Why:** The tricolon conclusion — "Both platforms, shared business logic, one coherent product" — is an LLM sign-off. It's the kind of sentence that ends a product brief, not a retrospective.

**Suggested rewrite:** "The app shipped on iOS and Android with shared business logic. One codebase for the core, native UI on each platform."

---

### `src/content/work/mygrid.md`

**LLM Score: 5/10**

The "what we built" section is clean and specific. The prose around end-to-end ownership gets slightly LLM-y.

**Flagged #1:**
> "The defining characteristic of this project was scope."

**Why:** "The defining characteristic of X was Y" is a corporate/LLM framing device. It's telling us how to categorize the project rather than showing us.

**Suggested rewrite:** "What made this project different was scope."

---

**Flagged #2:**
> "When something breaks at 11pm, you want to know who owns it. On this project, that was clear."

**Why:** "On this project, that was clear" is a classic LLM sign-off that adds nothing. The previous sentence already made the point.

**Suggested rewrite:** "When something breaks at 11pm, you want one person accountable — and I was it." Or just cut the second sentence.

---

**Flagged #3:**
> "A production mobile app backed by a serverless infrastructure — shipped from a blank slate to live users. Built to be maintainable by a small team, not just the person who built it."

**Why:** "Not just the person who built it" — another "not X, but Y" construction as a neat conclusion. "Shipped from a blank slate to live users" is polished to the point of sounding like marketing.

**Suggested rewrite:** "Shipped from scratch to production. The infrastructure is Terraform-managed and the architecture is documented — whoever picks this up next won't be starting from memory."

---

### `src/content/work/canton-thurgau.md`

**LLM Score: 7/10**

The project description is good. The "Constraints" section and "Outcome" section have multiple LLM patterns.

**Flagged #1:**
> "A comprehensive component library covering everything a government portal needs"

**Why:** "Comprehensive" is a flagged adjective — it's vague and LLM-y. "Everything a government portal needs" is also a sweeping claim.

**Suggested rewrite:** "A component library covering all the form types, input patterns, and data displays a government portal actually requires"

---

**Flagged #2:**
> "Public sector work has its own rules: WCAG accessibility requirements, data protection, procurement processes, stakeholders who aren't product people, and systems that have to work reliably for years without significant investment."

**Why:** "Stakeholders" is flagged language. The list also reads like an LLM bullet point dump formatted as a sentence.

**Suggested rewrite:** "Public sector work has different constraints: WCAG accessibility, data protection, procurement timelines, people who care about outcomes not epics, and the expectation that the thing still works five years later with minimal upkeep."

---

**Flagged #3:**
> "The architecture had to be straightforward. The components had to be accessible. The documentation had to be good enough for a developer who wasn't in the room when the decisions were made."

**Why:** Three-sentence parallel construction — "X had to be A. Y had to be B. Z had to be C." — is an LLM staple. Each sentence lands with the same rhythm; it reads like a bullet list disguised as prose.

**Suggested rewrite:** "Everything had to outlast the project: clear architecture, accessible components, and documentation that a developer can follow without needing to call me."

---

**Flagged #4:**
> "The kind of work where good UX means someone gets their scholarship application submitted in 15 minutes instead of mailing forms back and forth for weeks."

**Why:** "The kind of work where…" is explicitly called out in the red flags list. It's a classic LLM construction for adding poetic weight to a conclusion. The specific detail (15 minutes vs. mailing forms) is good — it just needs a different frame.

**Suggested rewrite:** "Good UX here means someone submits their scholarship application in 15 minutes instead of mailing forms back and forth for three weeks. That's what it was actually for."

---

### `src/content/work/swiss-bank-card-center.md`

**LLM Score: 8/10**

This is the most LLM-heavy case study. Almost every section ends with a dramatic flourish. Multiple "No X. No Y. Just Z." structures. One-word dramatic section openers. This reads like Claude wrote it on the first pass and nobody pushed back.

**Flagged #1:**
> "A legacy financial platform serving an internal business unit had grown into a monolith. Independent teams were stepping on each other. Deployments were risky and infrequent. The business needed to move faster — but the system wasn't built for that."

**Why:** Four short punchy sentences as a dramatic setup is the LLM "stakes" paragraph. The final sentence "the system wasn't built for that" is a textbook LLM payoff.

**Suggested rewrite:** "A legacy monolith that multiple teams shared. Deployments were risky, infrequent, and no one wanted to own the consequences — which slowed everything down."

---

**Flagged #2:**
> "Rearchitecting meant accepting risk. A big-bang rewrite was off the table. Any changes had to land in production incrementally, without disrupting active users."

**Why:** Staccato sentences as constraint-listing. "Off the table" is a cliché. Each sentence lands the same weight — it's LLM dramatic rhythm.

**Suggested rewrite:** "A big rewrite was off the table — too risky, too long. Any changes had to go through production incrementally, without disrupting active users."

---

**Flagged #3 (worst one):**
> "Incrementally."
> (single-word paragraph)

**Why:** A one-word paragraph as a section opener is one of the most recognizable LLM rhetorical moves. It's in every piece of "engaging" AI content. It reads like a copywriter's first draft at best.

**Suggested rewrite:** Remove it. The subsequent paragraph explains the approach — the one-word opener adds nothing except a false sense of drama.

---

**Flagged #4:**
> "No big-bang cutover. No dark launch for months. Just careful, deliberate decomposition — one module at a time."

**Why:** "No X. No Y. Just Z." — this is the most recognisable LLM sentence structure in the document. It appears in at least two case studies. "Careful, deliberate decomposition" also sounds corporate.

**Suggested rewrite:** "We didn't do a big cutover or a months-long dark launch. One module at a time, each one in production before starting the next."

---

**Flagged #5:**
> "Independent teams now own independent modules. Deployments are routine. The system that was once a shared liability is now a platform each team can work in without fear of breaking something they didn't touch."

**Why:** Triple-sentence parallel structure again. "Shared liability → platform" is an LLM transformation narrative. "Without fear of breaking something they didn't touch" — this is competent but too tidy. The whole paragraph is an LLM "after" summary.

**Suggested rewrite:** "Teams can now deploy independently. The system went from 'nobody wants to touch this' to each team owning their module and shipping on their own schedule."

---

**Flagged #6:**
> "The architecture is documented and the pattern is repeatable. When the next team needs to extract their module, the path is already there."

**Why:** "The path is already there" is an LLM poetic sign-off. It sounds meaningful but says nothing specific.

**Suggested rewrite:** "The architecture is documented. When the next team extracts their module, they have a working example to follow." Or just cut the second sentence — it's implied.

---

### `src/content/projects/n8n-nodes-harvest.md`

**LLM Score: 2/10**

Strong. Direct, specific, shows the tool, explains the use case. 

**Flagged (minor):**
> "MIT licensed. If you're a freelancer using both n8n and Harvest, this should slot right in."

**Why:** "Should slot right in" is slightly LLM-smooth marketing language. Minor.

**Suggested rewrite:** "MIT licensed. If you're a freelancer running both, install it and you're done."

---

### `src/content/projects/beancount-tools.md`

**LLM Score: 2/10**

Good. Specific institutions named, direct motivation, code example. Nothing significant to flag.

---

### `src/content/projects/n8n-workflows.md`

**LLM Score: 2/10**

Clean. "Automation automating itself — couldn't resist." is exactly Alex's voice. Nothing to flag.

---

### `src/content/projects/work-vacation-planner.md`

**LLM Score: 2/10**

Mostly good. One minor flag.

**Flagged:**
> "maintaining that in JSON inside an automation tool is a recipe for stale data"

**Why:** "Recipe for stale data" is a cliché. Minor.

**Suggested rewrite:** "maintaining that in JSON inside n8n means it's out of date the moment your plans change."

---

### `src/content/projects/badi-predictor.md`

**LLM Score: 3/10**

Clean and voice-y. One flag.

**Flagged:**
> "A classic example of solving a mildly annoying problem with entirely disproportionate technology — which is the best kind of side project."

**Why:** "Which is the best kind of side project" is a neat conclusory sign-off that tries to turn the project into a philosophy statement. Also, nearly identical phrasing appears in `about.astro` ("building side projects that solve mildly annoying problems with entirely disproportionate technology") — repeated template language across pages suggests LLM copy.

**Suggested rewrite:** Either cut the last sentence or break the repetition with something specific: "Classic side project: annoying problem, way too much infrastructure."

---

### `src/content/projects/spusu-monitor.md`

**LLM Score: 3/10**

The "Honest Assessment" section redeems this. The "How It Works" summary has one mild LLM pattern.

**Flagged:**
> "No server needed. No database. Just a cron job, a Python script, and two JSON files."

**Why:** "No X. No Y. Just Z." — same pattern flagged in swiss-bank-card-center.md. It appears to be a recurring LLM sentence template throughout the site.

**Suggested rewrite:** "Runs on GitHub Actions. Cron job, Python script, two JSON files. No server."

---

### `src/content/projects/homelab.md`

**LLM Score: 4/10**

The opener is great. The ending gets too polished.

**Flagged #1:**
> "The cost of a mistake here is measured in minutes, not incidents."

**Why:** Too clever. "Measured in minutes, not incidents" is an LLM contrast constructed to sound insightful. It's not wrong, but it reads like it was workshopped.

**Suggested rewrite:** "If I break something here, I fix it and learn something. No on-call, no post-mortem required."

---

**Flagged #2:**
> "That's the point."

**Why:** LLM mic-drop sign-off. Appears multiple times across the site (also "That's the job" in about.astro). It's become a crutch.

**Suggested rewrite:** Cut it. "If something breaks, I can rebuild it from scratch." already makes the point.

---

### `src/content/projects/chargeprice.ch`

**LLM Score: 3/10**

**Flagged:**
> "A useful tool for anyone driving electric in Switzerland."

**Why:** Vague, generic sign-off. "A useful tool" says nothing specific. It's a filler conclusion.

**Suggested rewrite:** Cut it — the tool description above already explains what it does and why it's useful. Or: "I use it myself every time I'm planning a longer trip."

---

### `src/content/projects/world-matrix.md`

**LLM Score: 2/10**

**Flagged (minor):**
> "A client project needed a dotted world map rendered natively in iOS — the kind you see on travel apps and dashboards."

**Why:** "The kind you see on travel apps and dashboards" is a mild "the kind X" construction. Low priority.

**Suggested rewrite:** "A client needed a dotted world map rendered natively on iOS — the sort that shows up in travel apps and analytics dashboards."

---

### `src/content/til/xgboost-time-series-leak.md`

**LLM Score: 1/10**

Excellent. Voice-y, specific, self-deprecating. "Predict like a drunk weatherman" is the best line on the site. Nothing to flag.

---

### `src/content/til/self-signed-certificate-authority-creation-with-open-ssl.md`

**LLM Score: 8/10**

This reads like a ChatGPT blog post from 2023. It has every tell: formal intro paragraph, "## Why Create Your Own CA" section with a bulleted list of benefits, numbered implementation steps, a "## Troubleshooting" section, and a "## Conclusion" paragraph. The voice is completely absent. This is the most obviously LLM-generated content on the site.

**Flagged #1:**
> "When running a homelab and managing internal services, SSL/TLS certificates are needed for secure communication. While public Certificate Authorities like Let's Encrypt work great for internet-facing services, they're not always practical for internal infrastructure. Creating your own Certificate Authority (CA) solves this problem."

**Why:** This is the canonical LLM tutorial opener: "While X is great for Y, it's not always practical for Z. [Topic] solves this problem." It could be on any Medium post about anything.

**Suggested rewrite:** "Let's Encrypt is great for anything internet-facing. For internal homelab services, it's more hassle than it's worth. Here's how to set up your own CA with OpenSSL and wire it into cert-manager."

---

**Flagged #2:**
> "## Why Create Your Own CA
> The main reasons for creating your own CA:
> - **Internal Services**: Perfect for services that only need to communicate within your network
> - **Development Environment**: Avoid certificate warnings during development
> - **Cost-Effective**: No need to purchase certificates for internal use
> - **Full Control**: You control the entire certificate lifecycle
> - **Client Certificate Authentication**: Secure services by requiring client certificates..."
> - **Learning**: Great way to understand how PKI works"

**Why:** Bolded reasons list. This is GPT documentation mode. Every benefit has a label, a colon, and a neat explanation. Zero personality. A TIL post should read like Alex jotted something down, not like a Confluence page was generated.

**Suggested rewrite:** Cut this whole section. It's throat-clearing. If someone is reading this, they already know they need a CA — they're here for the steps.

---

**Flagged #3:**
> "Creating your own Certificate Authority provides a robust foundation for secure internal communications in your homelab or development environment. With cert-manager handling the certificate lifecycle automatically, you can focus on building your services while maintaining proper security practices."

**Why:** "Robust foundation" is flagged language. "You can focus on building your services while maintaining proper security practices" is textbook LLM conclusion — it adds nothing except a feeling that the post is wrapping up.

**Suggested rewrite:** Cut the whole Conclusion section. The last step is the last step — end there.

---

**Flagged #4:**
> "Remember to handle the CA private key (ca.key) with utmost security to prevent unauthorized certificate issuance."

**Why:** "Utmost security" is boilerplate LLM security warning language.

**Suggested rewrite:** "Keep ca.key out of your git repo. If it leaks, anyone can issue trusted certs for your internal network."

---

**Overall note on this file:** The structure needs a full rewrite. The content is fine — the actual OpenSSL commands and cert-manager config are solid. But the framing, intro, conclusion, and "why" section need to be torn out and replaced with Alex actually talking about why he did this and what bit him. Compare to `k3s-longhorn-node-selector.md` and `xgboost-time-series-leak.md` — those are how TIL posts should sound.

---

### `src/content/til/module-federation-shared-deps.md`

**LLM Score: 2/10**

Good. The "I say 'wonderful' because it will absolutely not tell you it's doing this" opener is strong. "The fancy part was the debugging session that led me here" closes it well.

Nothing significant to flag.

---

### `src/content/til/today-I-hired-a-cfo.md`

**LLM Score: 3/10**

Mostly voice-y and specific. A few minor corporate phrases snuck in.

**Flagged #1:**
> "I'd been hearing about n8n for a while but never had a compelling use case."

**Why:** "Compelling use case" is corporate-speak.

**Suggested rewrite:** "I'd heard about n8n but never had a good reason to dig in."

---

**Flagged #2:**
> "right now it's hardcoded, which works but isn't elegant"

**Why:** "Isn't elegant" is a flagged word. It's also a bit mealy-mouthed — just say it's hardcoded and annoying.

**Suggested rewrite:** "right now it's hardcoded, which works but I hate looking at it."

---

### `src/content/til/bash-script-help.md`

**LLM Score: 1/10**

Minimal prose. "This is my standard boilerplate to add a help documentation to a bash script." — clean and direct. Nothing to flag.

---

### `src/content/til/k3s-longhorn-node-selector.md`

**LLM Score: 1/10**

Excellent TIL. "Aspirational in their unhelpfulness" is a good line. Specific about the error, specific about the fix, has a voice.

Nothing to flag.

---

## Recurring Patterns to Watch

These patterns appear across multiple files and are worth doing a site-wide find/replace audit on:

1. **"No X. No Y. Just Z."** — appears in swiss-bank-card-center, spusu-monitor. Cut every instance.
2. **"That's the [noun]."** — "That's the job", "That's the point." LLM mic-drop sign-off. Cut every instance.
3. **"The kind of work where..."** — flagged explicitly. Appears in canton-thurgau.
4. **"X had to be A. Y had to be B. Z had to be C."** — triple parallel structure. canton-thurgau, hero.
5. **Em-dash + pithy payoff sentence** — overused. Almost every paragraph ends this way.
6. **"[Single word]. [Next paragraph]"** — dramatic one-word openers. swiss-bank-card-center.
7. **"Built to be X, not just Y"** — mygrid. "Not X, but Y" as a conclusion.
8. **Identical phrasing across pages** — "mildly annoying problems with entirely disproportionate technology" appears in about.astro and badi-predictor.md. Pick one.
