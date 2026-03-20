---
title: "WorldMatrix"
description: "iOS library for rendering dotted world maps. Supports custom map regions, configurable density, and multiple export formats. Published as a CocoaPod."
stack: ["Swift", "iOS", "CocoaPods"]
github: "https://github.com/KiloKilo/WorldMatrix"
status: "archived"
featured: false
draft: false
---

Built at [KiloKilo](https://kilokilo.ch), the agency I co-founded. A client project needed a dotted world map rendered natively in iOS — the kind you see on travel apps and dashboards. Nothing off-the-shelf did exactly what we needed, so we built a library and open-sourced it.

Written in Swift 4.2, published as a CocoaPod.

## Usage

```swift
// Generate a map matrix
let generator = WorldMatrixGenerator()

// Configure columns per row (default: 100)
generator.columns = 20

// Set map region — .world, .europe, or .custom(north, east, south, west)
generator.mapCutting = .europe

// Export format: .enum, .ascii, or .emoji
generator.exportType = .enum

generator.generate()

// Render it
let matrix = Matrix<WorldCharacteristic>(columns: 100, array: worldArray)
worldMatrixView.mapMatrix = matrix
```

## Installation

```bash
pod 'WorldMatrix', '~> 4.2.0'

# Optional: include the generator
pod 'WorldMatrix/Generator', '~> 4.2.0'
```

The library handles the projection math and dot placement. You get a configurable, renderable map with a few lines of setup. MIT licensed.
