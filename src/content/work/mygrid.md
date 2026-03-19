---
title: "mygrid — EV Charging App & Backend"
client: "mygrid AG"
agency: "Freelance (self-employed)"
role: "Lead Developer"
stack: ["React Native", "TypeScript", "AWS Lambda", "Terraform", "Serverless"]
description: "Mobile app and serverless backend for Switzerland's private and semi-public EV charging infrastructure — end-to-end ownership from prototype to production."
date: "2023"
featured: true
draft: false
---

## The Context

mygrid AG operates private and semi-public EV charging infrastructure in Switzerland. They needed a product — an app drivers use to manage their charging sessions and the backend that runs it — built from scratch.

I owned it end-to-end.

## What We Built

**Mobile app (React Native / TypeScript):**
The driver-facing application. Charging session management, real-time status, billing, and account management. Cross-platform — iOS and Android from a single codebase.

**Serverless backend (AWS Lambda / Terraform):**
The infrastructure powering the app — session management, OCPP protocol integration, user accounts, billing, push notifications. Built serverless to keep operational overhead low and scaling predictable.

Everything provisioned with Terraform. Reproducible, version-controlled infrastructure.

## End-to-End Ownership

The defining characteristic of this project was scope. I wasn't the frontend developer. I wasn't the backend developer. I was the person responsible for the whole thing reaching production.

That means architecture decisions, third-party integrations, DevOps setup, and the operational runbook — not just shipping features. When something breaks at 11pm, you want to know who owns it. On this project, that was clear.

## Outcome

A production mobile app backed by a serverless infrastructure — shipped from a blank slate to live users. Built to be maintainable by a small team, not just the person who built it.
