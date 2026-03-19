---
title: "Recipe Governance Platform"
client: "Spühl GmbH"
agency: "Freelance (self-employed)"
role: "Lead Developer"
stack: ["React", "Next.js", "Python", "Flask", "Azure"]
description: "Replaced a USB-stick-based production workflow with an auditable recipe governance system featuring 4-stage approval workflows."
date: "2024"
featured: true
draft: false
---

## The Problem

Industrial machines run on recipes — precise configurations that define how production processes work. At Spühl, those recipes were being transported on USB sticks.

That means no audit trail. No approval process. No version control. If the wrong recipe ended up on a machine, you'd find out the hard way. The risk wasn't theoretical — it was embedded in the daily workflow.

## What We Built

A governance platform that replaces the USB workflow with a structured, traceable process. The system handles the full recipe lifecycle:

- **Recipe management** — version-controlled recipe library, with change history and authorship tracking
- **4-stage approval workflow** — from engineering review through production sign-off, each stage with explicit accountability
- **Machine deployment** — recipes are pushed to machines through the platform, not carried on a stick
- **Audit trail** — every action logged, who approved what and when

**Stack:** React and Next.js for the frontend, Python and Flask for the backend API, Azure for hosting and storage.

## The Shift

The hard part wasn't the technology — it was changing how people worked. USB sticks are simple. Workflows add friction.

The design had to be opinionated enough to enforce compliance, but not so rigid that people would route around it. That balance came from spending time with the people who actually run production — understanding their constraints before writing a line of code.

## Outcome

A fragile, untracked process replaced by one that meets production-grade compliance requirements. Recipes are traceable from creation to deployment. The risk of the wrong recipe reaching a machine is eliminated — not managed, eliminated.

Spühl now has an auditable record of every change, every approval, every deployment.
