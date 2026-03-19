---
title: "Module Federation shared dependencies need explicit version constraints"
date: "2024-11-15"
tags: ["webpack", "micro-frontends", "javascript"]
draft: false
---

Module Federation has this wonderful feature where it lets two different versions of React run simultaneously in your app. I say "wonderful" because it will absolutely not tell you it's doing this. Everything works. Until it doesn't. And then you're staring at a hook error that makes zero sense.

The fix: stop being lazy with the `shared` config.

```javascript
// This looks clean. It's a trap.
shared: ['react', 'react-dom']

// This is what you actually want.
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

`singleton: true` = one React to rule them all. `strictVersion: true` = blow up loudly if versions don't match. Loud failure beats two hours of "why is `useState` returning undefined."

The `deps` reference is just `require('./package.json').dependencies`. Nothing fancy. The fancy part was the debugging session that led me here.
