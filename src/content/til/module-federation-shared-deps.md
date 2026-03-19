---
title: "Module Federation shared dependencies need explicit version constraints"
date: "2024-11-15"
tags: ["webpack", "micro-frontends", "javascript"]
draft: false
---

When using Webpack Module Federation, the `shared` configuration silently resolves to different versions of a dependency if you're not careful — and you won't notice until runtime.

The fix: be explicit about `requiredVersion`.

```javascript
// Instead of this
shared: ['react', 'react-dom']

// Do this
shared: {
  react: { 
    singleton: true, 
    requiredVersion: deps.react,
    strictVersion: true 
  },
  'react-dom': { 
    singleton: true, 
    requiredVersion: deps['react-dom'],
    strictVersion: true 
  },
}
```

`singleton: true` ensures only one instance loads. `strictVersion: true` will throw an error at runtime if the version constraint isn't met — loud failure beats silent inconsistency.

The `deps` reference is just `package.json` dependencies pulled in: `const deps = require('./package.json').dependencies`.
