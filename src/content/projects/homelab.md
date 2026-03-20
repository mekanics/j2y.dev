---
title: "Homelab"
description: "Kubernetes cluster on Raspberry Pi — K3s, Cilium, Longhorn, GitOps with ArgoCD. Because running production infrastructure at home is a perfectly reasonable hobby."
stack: ["K3s", "Cilium", "Longhorn", "ArgoCD", "CloudNative-PG", "Raspberry Pi"]
github: "https://github.com/mekanics/homelab"
year: 2022
status: "in-progress"
featured: false
draft: false
---

A Kubernetes cluster running on Raspberry Pis, because why not.

The stack: K3s for the lightweight Kubernetes distribution, Cilium for networking and network policy, Longhorn for persistent storage, ArgoCD for GitOps-based deployment, and CloudNative-PG for Postgres.

The whole thing is managed as code — every service declared, versioned, and deployed through ArgoCD. If something breaks, I can rebuild it from scratch. That's the point.

It runs various self-hosted services and serves as a continuous learning environment for anything infrastructure-related. The cost of a mistake here is measured in minutes, not incidents.
