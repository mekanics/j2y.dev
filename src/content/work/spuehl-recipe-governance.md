---
title: 'Recipe Governance Platform'
client: 'Spühl GmbH'
agency: 'originate GmbH'
role: 'Lead Developer'
stack: ['React', 'Next.js', 'Python', 'Flask', 'Azure']
description: 'Replaced a USB-stick-based production workflow with an auditable recipe governance system featuring 4-stage approval workflows.'
startYear: 2025
date: 2025-09-01
featured: true
draft: true
---

## The Problem

Industrial machines run on recipes — precise configurations that define how production processes work. At Spühl, those recipes were being transported on USB sticks.

No audit trail, no version control, no approval process. A wrong recipe on a machine meant you'd find out during production, not before.

## What We Built

I was contracted through originate GmbH, who build the machine-side software and API. My focus was the frontend and the governance workflow layer.

A governance platform that replaces the USB workflow with a structured, traceable process. The system handles the full recipe lifecycle:

- **Recipe management** — version-controlled recipe library, with change history and authorship tracking
- **4-stage approval workflow** — from engineering review through production sign-off, each stage with explicit accountability
- **Machine deployment** — recipes are pushed to machines through the platform, not carried on a stick
- **Audit trail** — every action logged, who approved what and when

**Stack:** React and Next.js for the frontend, Python and Flask for the backend API, Azure for hosting and storage.

## The Shift

The tech was straightforward. The harder thing was that USB sticks, despite everything, are simple — you grab one, walk to the machine, and it works. Adding a four-stage approval process means convincing production staff that the friction is worth it.

I spent time on the production floor before building anything. If the approval workflow is too much friction, people route around it — which defeats the point. Getting that right required understanding how they actually work, not how the process diagram said they should.

## Outcome

A fragile, untracked process replaced by one that meets production-grade compliance requirements. Recipes are traceable from creation to deployment. The wrong recipe can no longer reach a machine. Full stop.

Spühl now has an auditable record of every change, every approval, every deployment.
