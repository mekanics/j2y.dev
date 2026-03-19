---
title: "badi-predictor"
description: "ML system predicting Zürich public pool (Badi) occupancy using real-time data and historical patterns."
stack: ["Python", "XGBoost", "FastAPI", "TimescaleDB", "Docker"]
github: "https://github.com/mekanics/badi-predictor"
status: "live"
featured: true
draft: false
---

Zürich's public pools (Badi) get busy. Very busy on a sunny Saturday afternoon. This project predicts how busy, so you can decide whether it's worth the trip.

The system collects real-time occupancy data, stores it in TimescaleDB, and trains an XGBoost model on historical patterns — time of day, day of week, weather conditions. The FastAPI backend serves predictions on demand.

It's been collecting data since launch. The longer it runs, the better it gets.

A classic example of solving a mildly annoying problem with entirely disproportionate technology — which is the best kind of side project.
