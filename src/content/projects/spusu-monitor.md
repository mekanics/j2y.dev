---
title: "spusu-monitor"
description: "Automated SPUSU mobile plan price monitoring with history tracking and Telegram notifications. A 2-hour vibe-coding experiment."
stack: ["Python", "Telegram Bot", "Web Scraping"]
github: "https://github.com/mekanics/spusu-monitor"
year: 2025
status: "archived"
featured: false
draft: false
---

SPUSU occasionally changes their mobile plan prices. I wanted to know when that happens without manually checking their website every week.

So I spent two hours vibe-coding this with AI assistance: a Python script that scrapes the SPUSU tariffs page daily via GitHub Actions, diffs the results against the previous run, and fires a Telegram notification if anything changed. Price history accumulates in a JSON file committed back to the repo — accidental version control for price data.

## How It Works

GitHub Actions runs the scraper every morning at 8:00 AM UTC. If prices changed, it sends an alert to a Telegram channel ([@spusu_price_alerts](https://t.me/spusu_price_alerts)). Either way, the latest data gets committed back to the repo.

Runs on GitHub Actions. Cron job, Python script, two JSON files. No server.

## Honest Assessment

The code was AI-generated and it shows. But it works, which is all I needed it to do. Sometimes that's the right call.
