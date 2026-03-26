---
title: 'Card Center Platform'
client: 'A leading Swiss bank'
agency: 'Freelance (self-employed)'
role: 'Frontend Architecture Lead'
stack: ['React', 'TypeScript', 'Module Federation', 'Micro-frontends']
description: 'Led the architectural transformation of a legacy financial platform to a micro-frontend system — modernised without disrupting live operations.'
startYear: 2024
endYear: 2026
date: 2025-01-01
featured: true
draft: true
---

## The Problem

A legacy monolith that multiple teams shared. Deployments were risky, infrequent, and no one wanted to own the consequences — which slowed everything down.

A big rewrite was off the table — too risky, too long. Any changes had to go through production incrementally, without disrupting active users.

## What We Built

I led the architectural transformation from a coupled monolith to a distributed micro-frontend system using **React**, **TypeScript**, and **Webpack Module Federation**.

The work involved:

- Designing the module boundary strategy — deciding what got extracted first, what stayed, and how the seams would be managed
- Implementing the host/remote architecture so teams could ship independently
- Establishing shared dependency contracts to prevent version drift between modules
- Building the tooling to make the system understandable for teams that hadn't worked with micro-frontends before

## How We Did It

The migration started with one module, got it running in production, and used that as the proof of concept and template for everything that followed. Each step validated the architecture before committing to the next.

No big cutover, no months-long dark launch. One module at a time, each one in production before starting the next.

## Outcome

Teams can now deploy independently. The system went from 'nobody wants to touch this' to each team owning their module and shipping on their own schedule.

The architecture is documented. When the next team extracts their module, they have a working example to follow.
