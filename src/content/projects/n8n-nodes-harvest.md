---
title: "n8n-nodes-harvest"
description: "Custom n8n community node for Harvest time tracking. Integrates Harvest's API into n8n workflows for automated time tracking and invoicing."
stack: ["TypeScript", "n8n", "Harvest API"]
github: "https://github.com/mekanics/n8n-nodes-harvest"
status: "live"
featured: false
draft: false
---

I track time in Harvest and automate my freelance business in n8n. The two didn't talk to each other — there was no community node. So I built one.

The project grew into a proper TypeScript monorepo: a type-safe Harvest API client (generated from the official OpenAPI spec) plus the n8n community node that wraps it. Built with Turborepo and pnpm workspaces.

## What It Enables

Once the node is installed in your n8n instance, you can pull time entries, project budgets, invoices, and more directly into workflows. The main thing I use it for: a weekly report that reads project budget utilisation from Harvest, calculates how many days per week I need to work to hit targets, and sends a formatted HTML summary.

## Structure

```
harvest-clients/
├── apps/
│   └── n8n-nodes-harvest/   # The n8n community node
├── packages/
│   └── harvest-client/      # Type-safe API client (OpenAPI-generated types)
└── examples/
    └── n8n-workflows/       # Ready-to-import workflow examples
```

MIT licensed. If you're a freelancer using both n8n and Harvest, this should slot right in.
