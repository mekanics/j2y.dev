---
title: "Longhorn requires a node selector when mixing storage and non-storage nodes"
date: "2024-09-03"
tags: ["kubernetes", "k3s", "longhorn", "homelab"]
description: "Longhorn storage will try to use all nodes by default — here's the node selector config to restrict it to designated storage nodes."
draft: false
---

Picture this: you've got a beautiful K3s cluster. Some beefy nodes, one tiny Raspberry Pi you added "just for fun." Longhorn sees all nodes as equal and starts scheduling storage replicas everywhere — including the Pi that barely has enough disk space for the OS.

Cue: stuck volumes, cryptic errors, and 45 minutes of your life you won't get back.

The fix: tell Longhorn which nodes are allowed to hold data.

```bash
kubectl label node <node-name> node.longhorn.io/create-default-disk=true
```

Then flip the setting:

```yaml
# In Longhorn Helm values
defaultSettings:
  createDefaultDiskLabeledNodes: true
```

Now Longhorn only provisions disks on nodes you've explicitly blessed. The tiny Pi can still schedule workloads — it just won't try to store 50GB of replicated data on its 32GB SD card.

The error messages from Longhorn when replicas can't be placed are... aspirational in their unhelpfulness. You'll see "replica scheduling failed" and nothing about *why*. So if you're here because you searched that error: you're welcome.
