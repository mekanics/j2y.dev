---
title: "Longhorn requires a node selector when mixing storage and non-storage nodes"
date: "2024-09-03"
tags: ["kubernetes", "k3s", "longhorn", "homelab"]
draft: false
---

If you're running a K3s cluster where not all nodes should participate in Longhorn storage (e.g., a low-powered node you only want for scheduling), you need to configure node selectors explicitly.

Without it, Longhorn will try to schedule replicas on every node — and if a node doesn't have the required disk, you'll get stuck volumes.

Label the nodes that should host storage:

```bash
kubectl label node <node-name> node.longhorn.io/create-default-disk=true
```

Then in Longhorn's settings, set `Create Default Disk Only On Labeled Nodes` to `true`.

Alternatively, in the Longhorn Helm values:

```yaml
defaultSettings:
  createDefaultDiskLabeledNodes: true
```

Took me longer than it should have to find this — the error messages from Longhorn aren't particularly helpful when replicas can't be placed.
