---
title: '`.git/info/exclude` is a gitignore for this clone only'
date: '2025-11-10'
tags:
  - git
  - cli
description: '`.git/info/exclude` is a `.gitignore` that Git will not commit. `git init` creates the file.'
draft: false
---

`.git/info/exclude` is a [`.gitignore`](https://git-scm.com/docs/gitignore) that Git will not commit. `git init` creates the file. Same patterns.

This checkout only. The committed `.gitignore` is the shared one.

Patterns match from the repo root. A file Git already tracks stays tracked.

`git check-ignore -v path` shows which file and which line ignored it.
