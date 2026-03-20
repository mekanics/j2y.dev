---
title: "n8n-workflows"
description: "Collection of n8n automation workflows — invoicing, time tracking, notifications, and other business process automations for freelance work."
stack: ["n8n", "Automation", "JSON"]
github: "https://github.com/mekanics/n8n-workflows"
year: 2025
status: "live"
featured: false
draft: false
---

Running a freelance business means a lot of repetitive admin: tracking hours, sending invoices, chasing status updates. n8n lets me automate most of that.

This repo is where those workflows live — a growing archive of automations I've built for my own setup. Invoicing, time tracking reports, notifications, and whatever else needed automating that week.

## The Meta Part

The repo is self-maintaining. One of the workflows (`Publish-My-Workflows`) automatically exports and commits workflows back to the repository. Automation automating itself — couldn't resist.

## Using These Workflows

Download any `.json` file and import it directly into your n8n instance via the workflows page. You'll need to wire up your own credentials and tweak account-specific parameters, but the logic is all there.

n8n is self-hostable, open source (fair-code), and a genuinely solid alternative to Zapier or Make if you want control over your data and infrastructure.
