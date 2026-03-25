---
title: "changelog"
description: "Stop the changelog merge conflict madness! A CLI tool that creates one file per entry and bundles them together before release — inspired by how GitLab solved their CHANGELOG conflict crisis."
stack: ["Ruby"]
github: "https://github.com/KiloKilo/changelog"
status: "live"
featured: false
draft: false
---

Anyone who's worked on a team knows the pain: merge conflicts in `CHANGELOG.md`. Every feature branch touches the same file, in the same place, and rebasing becomes a ritual.

GitLab [wrote about how they solved this](https://about.gitlab.com/2018/07/03/solving-gitlabs-changelog-conflict-crisis/), and I liked the approach enough to build a standalone tool around it.

## How It Works

Instead of editing a single CHANGELOG file, each change gets its own file in `changelogs/unreleased/`. When you're ready to release, the tool bundles them into a proper `CHANGELOG.md`.

```bash
# Create a new entry
changelog

# Bundle for release
changelog bundle 2.3.1
```

No more conflicts. Each branch touches its own file. The bundling step is deterministic.

## Why I Built It

I was tired of the merge dance. This was a clean, simple fix — and a good excuse to ship a Ruby gem.
