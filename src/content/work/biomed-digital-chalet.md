---
title: "Digital Chalet — Online Events Platform"
client: "Biomed AG"
agency: "KiloKilo GmbH (co-founded)"
role: "Lead Developer"
stack: ["Strapi", "AWS CloudFormation", "SwissRx", "DocCheck"]
description: "Backend and auth integration for Biomed AG's Digital Chalet — an online platform replacing in-person pharmaceutical events during the pandemic."
startYear: 2021
endYear: 2021
featured: false
draft: false
---

## The Context

Pharma events are regulated. You can't just open a Zoom link and invite anyone — content intended for healthcare professionals has to stay with healthcare professionals. Biomed AG ran in-person events for doctors and medical specialists. Then COVID made that impossible.

The brief came to KiloKilo: build an online replacement. A "Digital Chalet" — a platform where the same events could happen, just without the travel and the venue. I led the backend development.

## What We Built

The interesting problem wasn't the platform itself — it was the front door.

**Healthcare professional verification:**
Before anyone could access content, we had to verify they were actually an HCP. We integrated two systems to cover the relevant markets: DocCheck (the standard for HCP verification across Europe) and SwissRx (the Swiss-specific equivalent). A doctor logs in through whichever system they're already registered with. If the verification passes, they're in. If not, they're not.

This kind of auth integration sounds simple until you're dealing with two different identity providers, each with their own flows, tokens, and edge cases. Getting it right mattered — a pharma company has real regulatory exposure if the wrong people are accessing restricted content.

**The backend:**
Built on Strapi as the headless CMS, with infrastructure provisioned through AWS CloudFormation. Content editors at Biomed could manage events, sessions, and materials without touching code. CloudFormation kept the infrastructure consistent and reproducible.

## Outcome

A working online events platform that let Biomed AG keep running their HCP events through the pandemic — compliant, gated to verified healthcare professionals, and manageable by the client's own team. Smaller in scope than some of the projects KiloKilo shipped, but the auth problem was the kind of detail that matters a lot when you get it wrong.
