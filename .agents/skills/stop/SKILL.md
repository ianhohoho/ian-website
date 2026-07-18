---
name: stop
description: Stop this project's local development server on port 3000. Use when the user explicitly invokes $stop or asks to stop or tear down the local site.
---

# Stop the Development Server

Kill any running dev server on port 3000.

Run this command:

```
lsof -ti:3000 | xargs kill 2>/dev/null
```

Verify that port 3000 is no longer listening, then confirm that the development server has stopped.
