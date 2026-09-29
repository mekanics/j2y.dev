---
title: 'Oh My Zsh `take` is mkdir and cd'
date: '2021-02-22'
tags:
  - zsh
  - oh-my-zsh
  - cli
description: '`take foo` in Oh My Zsh creates the directory and changes into it — the same as mkdir, then cd.'
draft: false
---

Just learned about `take` in [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh).

```sh
$ take foo
```

is the same as

```sh
$ mkdir foo
$ cd foo
```

It runs `mkdir -p`, so `take a/b/c` creates the missing parents and lands you in `c`. Pass several names and you end up in the last one.

These days the same function also takes a remote argument: a `.git` URL gets cloned, a tarball or zip gets downloaded and extracted, then you `cd` into the result. `mkcd` is the directory-only version.

Both live in `~/.oh-my-zsh/lib/functions.zsh`.
