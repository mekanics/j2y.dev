---
title: "Time series models will silently overfit if you use random train/test splits"
date: "2024-06-20"
tags: ["python", "ml", "xgboost", "data-science"]
draft: false
---

The classic mistake when training on time series data: using `train_test_split` with shuffle — which is the scikit-learn default.

Random splits leak future information into training. Your model learns patterns it couldn't possibly have known at prediction time. Evaluation metrics look great. Production performance doesn't match.

The fix is chronological splitting:

```python
# Wrong: random split leaks future data
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Right: respect temporal ordering
split_idx = int(len(X) * 0.8)
X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]
```

For proper cross-validation on time series, use `TimeSeriesSplit`:

```python
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(X):
    X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
    # ...
```

Learned this while building the badi-predictor. The random-split model had suspiciously good metrics.
