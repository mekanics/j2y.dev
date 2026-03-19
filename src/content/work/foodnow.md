---
title: "Foodnow — Cross-Platform Food Delivery"
client: "Foodnow AG (powered by Migros)"
agency: "dreipol GmbH"
role: "Mobile Developer"
stack: ["Swift", "Kotlin Multiplatform", "GraphQL", "iOS", "Android"]
description: "Cross-platform food delivery app for one of Switzerland's largest retailers. iOS and Android with shared business logic via Kotlin Multiplatform."
date: "2023"
featured: false
draft: false
---

## The Context

Foodnow is Migros's food delivery offering — one of Switzerland's largest grocery retailers bringing delivery to customers' doors. The app needed to ship on both iOS and Android, and "we'll do Android later" wasn't an option.

I joined the project as a freelancer embedded with agency **dreipol**, contributing to both iOS and Android development.

## What We Built

A cross-platform food delivery app with a shared business logic layer. The technical approach used **Kotlin Multiplatform** to share the core logic between platforms — networking, data models, business rules — while keeping native UI layers in Swift (iOS) and Kotlin (Android).

The GraphQL API powered the data layer, handling the complexity of real-time inventory, order state management, and delivery tracking.

## The Technical Approach

Kotlin Multiplatform gave us one place to write and test the business logic. Both platforms consumed it. Changes to the core behaviour propagated to both apps without duplication.

This approach required careful boundary design — what belongs in shared code versus what belongs in native UI. Getting that wrong adds friction. Getting it right means the platforms stay in sync without ceremony.

## Outcome

A cross-platform food delivery app shipping to Swiss customers, backed by one of the country's largest retailers. Both platforms, shared business logic, one coherent product.
