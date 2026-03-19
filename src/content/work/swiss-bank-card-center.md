---
title: "Card Center Platform"
client: "A leading Swiss bank"
agency: "Freelance (self-employed)"
role: "Frontend Architecture Lead"
stack: ["React", "TypeScript", "Module Federation", "Micro-frontends"]
description: "Led the architectural transformation of a legacy financial platform to a micro-frontend system — modernised without disrupting live operations."
date: "2024"
featured: true
draft: false
---

## The Problem

A legacy financial platform serving an internal business unit had grown into a monolith. Independent teams were stepping on each other. Deployments were risky and infrequent. The business needed to move faster — but the system wasn't built for that.

Rearchitecting meant accepting risk. A big-bang rewrite was off the table. Any changes had to land in production incrementally, without disrupting active users.

## What We Built

I led the architectural transformation from a coupled monolith to a distributed micro-frontend system using **React**, **TypeScript**, and **Webpack Module Federation**.

The work involved:

- Designing the module boundary strategy — deciding what got extracted first, what stayed, and how the seams would be managed
- Implementing the host/remote architecture so teams could ship independently
- Establishing shared dependency contracts to prevent version drift between modules
- Building the tooling to make the system understandable for teams that hadn't worked with micro-frontends before

## How We Did It

Incrementally. We started with one module, got it running in production, and used that as the proof of concept and template for everything that followed. Each step validated the architecture before we committed to the next.

No big-bang cutover. No dark launch for months. Just careful, deliberate decomposition — one module at a time.

## Outcome

Independent teams now own independent modules. Deployments are routine. The system that was once a shared liability is now a platform each team can work in without fear of breaking something they didn't touch.

The architecture is documented and the pattern is repeatable. When the next team needs to extract their module, the path is already there.
