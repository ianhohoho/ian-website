---
name: reload
description: Restart this project's Next.js development server and clear its cache. Use when the user explicitly invokes $reload or asks to reload or restart the local site after code changes.
---

# Reload the Development Server

Kill any running development server on port 3000, clear the `.next` cache, and start a fresh server in the background.

Run this command from the repository root in the background:

```
lsof -ti:3000 | xargs kill 2>/dev/null; sleep 1; rm -rf .next && pnpm dev
```

Wait until the server reports that it is ready. Confirm the restarted URL and tell the user to hard-refresh (`Cmd+Shift+R`) if the browser still shows stale output.
