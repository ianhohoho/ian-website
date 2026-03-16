---
name: reload
description: Kill the dev server, clear the Next.js cache, and restart so changes are visible
disable-model-invocation: true
---

# /reload — Restart Dev Server

Kill any running dev server on port 3000, clear the `.next` cache, and start a fresh dev server in the background.

Run this single command in the background:

```
lsof -ti:3000 | xargs kill 2>/dev/null; sleep 1; rm -rf .next && pnpm dev
```

After launching, tell the user to hard-refresh (`Cmd+Shift+R`) to see changes.
