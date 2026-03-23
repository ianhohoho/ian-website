---
name: stop
description: Kill the local dev server running on port 3000
disable-model-invocation: true
---

# /stop — Tear Down Local Dev Server

Kill any running dev server on port 3000.

Run this command:

```
lsof -ti:3000 | xargs kill 2>/dev/null
```

After running, confirm to the user that the dev server has been stopped.
