---
title: "beancount-tools-collection"
description: "Personal collection of beancount importers, price fetchers, and plugins for Swiss financial institutions. Plain-text accounting for the Swiss market."
stack: ["Python", "Beancount", "Fava"]
github: "https://github.com/mekanics/beancount-tools-collection"
status: "live"
featured: false
draft: false
---

I use [beancount](https://github.com/beancount/beancount) for personal accounting — plain text, version controlled, no vendor lock-in. The problem is that every Swiss financial institution exports data in its own idiosyncratic format, and nobody builds importers for them.

So I built my own.

## What's Included

Importers for the Swiss institutions I actually use: **Yuh** (CSV), **Viseca** (JSON — covers the Migros Cumulus Credit Card too), **VIAC** (JSON, pillar 2 & 3a), and **Finpension** (CSV, pillar 3a). Also **Interactive Brokers** via FlexQuery XML and **Revolut** CSV for international coverage.

```python
from beancount_tools_collection.importers import (
    finpension, ibkr, revolut,
    viac, viseca, yuh
)

CONFIG = [
    yuh.YuhImporter(
        account="Assets:Cash:Yuh:CHF",
        goals_base_account="Assets:Savings:Yuh"
    ),
    viac.ViacImporter(
        root_account="Assets:Pension:S3a:Viac:Portfolio1",
        deposit_account="Assets:Checking",
        share_lookup={
            "UBS SMI": {"isin": "CH0033782431", "symbol": "CH0033782431"},
        }
    ),
    ibkr.IBKRImporter(
        Mainaccount="Assets:Invest:InteractiveBrokers",
        DivAccount="Income:Dividends:InteractiveBrokers",
        WHTAccount="Expenses:Taxes:WithholdingTax",
        PnLAccount="Income:Invest:Gains",
        FeesAccount="Expenses:Invest:Fees",
        configFile="ibkr.yaml"
    ),
    # ... etc
]
```

## Who It's For

Primarily myself. But if you're doing plain-text accounting in Switzerland and hitting the same wall I did, this might save you some time. MIT licensed, contributions welcome.
