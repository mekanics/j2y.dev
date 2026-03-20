---
title: 'Digitaler Schalter — Digital Government Portal'
client: 'Canton of Thurgau'
agency: 'KiloKilo GmbH (co-founded)'
role: 'Lead Developer'
stack: ['TypeScript', 'Next.js', 'React', 'Component Library', 'Design System']
description: 'A citizen-facing digital government portal with a full design system — from scholarship applications to tax filings, serving the entire Canton of Thurgau.'
startYear: 2021
endYear: 2021
featured: true
draft: false
---

![Thurgau Design System — cover illustration showing diverse citizens](./images/canton-thurgau/design-system-cover.webp)

## The Project

The Canton of Thurgau set out to digitise its citizen services — moving paper-based government processes online. Not a marketing website, but a real transactional portal where citizens apply for scholarships, file tax extensions, order official documents, and manage their interactions with the canton.

KiloKilo built it. I led the frontend and design system development.

## What We Built

![Component library overview — forms, buttons, navigation, cards, and data tables](./images/canton-thurgau/design-system-components.webp)

**The Design System:**
A component library covering all the form types, input patterns, and data displays a government portal actually requires, multi-step application wizards, data tables, accordion FAQs, date pickers, tag selectors, and responsive navigation. Built to be accessible, documented, and maintainable by teams that would extend it long after we left.

**The Portal:**
A responsive, citizen-facing application handling the full service lifecycle. Citizens can browse services by category (education, taxes, construction, transport), complete multi-step applications with progress tracking, upload documents, and receive status updates.

![Homepage — desktop and mobile responsive views](./images/canton-thurgau/homepage-responsive.webp)

**Key Features:**

- 6-step scholarship application with eligibility pre-check and progress tracking
- Service catalogue with topic filtering across 10+ government departments
- FAQ system with categorised, searchable content and explainer video carousel
- Logged-in user area for managing applications and personal documents
- Friendly error and maintenance pages with custom illustrations

![Scholarship application flow and help & contact page](./images/canton-thurgau/scholarship-application.webp)

## The Constraints

Public sector work has different constraints: WCAG accessibility, data protection, procurement timelines, people who care about outcomes not epics, and the expectation that the thing still works five years later with minimal upkeep.

Everything had to outlast the project: clear architecture, accessible components, and documentation that a developer can follow without needing to call me.

![Help & contact page with FAQ section, and graceful server error page](./images/canton-thurgau/help-contact-error.webp)

## Portal Walkthrough

<video controls playsinline preload="metadata" poster="/videos/portal-walkthrough-poster.jpg" class="rounded-lg w-full">
  <source src="/videos/portal-walkthrough.mp4" type="video/mp4" />
</video>

## Outcome

A live digital government portal serving the citizens of Canton Thurgau. A design system with hand-drawn illustrations that makes government services feel approachable rather than bureaucratic. Good UX here means someone submits their scholarship application in 15 minutes instead of mailing forms back and forth for three weeks. That's what it was actually for.
