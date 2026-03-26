---
title: 'mygrid — EV Charging App & Backend'
client: 'mygrid AG'
agency: 'Freelance (self-employed)'
role: 'Lead Developer'
stack: ['React Native', 'TypeScript', 'AWS Lambda', 'Terraform', 'Serverless']
description: "Mobile app and serverless backend for Switzerland's private and semi-public EV charging infrastructure — end-to-end ownership from prototype to production."
startYear: 2023
endYear: 2023
date: 2024-02-01
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

What made this project different was scope. I wasn't the frontend developer. I wasn't the backend developer. I was the person responsible for the whole thing reaching production.

That means architecture decisions, third-party integrations, DevOps setup, and the operational runbook — not just shipping features. When something breaks at 11pm, you want one person accountable — and I was it.

## Outcome

Shipped from scratch to production. The infrastructure is Terraform-managed and the architecture is documented — whoever picks this up next won't be starting from memory.
