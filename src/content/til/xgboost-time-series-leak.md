---
title: "Time series models will silently overfit if you use random train/test splits"
date: "2024-06-20"
tags: ["python", "ml", "xgboost", "data-science"]
draft: false
---

Here's a fun way to feel like a genius for 20 minutes: train a time series model with `train_test_split(shuffle=True)` — which is the scikit-learn default — and marvel at your incredible metrics.

Then deploy it and watch it predict like a drunk weatherman.

Random splits leak future data into training. Your model literally learns from tomorrow to predict today. Of course it looks great on paper.

```python
# 🚨 This is time travel, not machine learning
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ✅ Respect the arrow of time
split_idx = int(len(X) * 0.8)
X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]
```

For proper cross-validation, use `TimeSeriesSplit` which rolls forward through time:

```python
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(X):
    X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
    # ...
```

I learned this building [badi-predictor](https://github.com/mekanics/badi-predictor) — a pool occupancy prediction model. The random-split version had suspiciously good metrics. "Suspiciously good" in ML is never a compliment.
