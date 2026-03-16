# Workflow Rules

## Dev Server
- After making ANY code changes, always restart the dev server for the user:
  ```
  lsof -ti:3000 | xargs kill 2>/dev/null; sleep 1; rm -rf .next && pnpm dev
  ```
- Run this in the background so the conversation can continue
- The user will hard-refresh (`Cmd+Shift+R`) to see changes

## Before Committing
- The pre-commit hook (`.hooks/pre-commit`) runs automatically on every commit:
  1. Bumps the patch version in `package.json` (auto-stages the change)
  2. `pnpm exec tsc --noEmit` — must pass
  3. `pnpm build` — must pass
- Never skip hooks (`--no-verify`)
- Do NOT manually bump the version — the hook does it automatically

## Pushing to GitHub
- If `git push` is rejected, run `git pull --rebase origin main` first, then push again
- Vercel auto-deploys on push to `main` — no manual deploy step needed

## Committing
- Use descriptive commit messages
- Always include `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` when Claude writes the code

## Tools & Commands
- Package manager: `pnpm` (never npm or yarn)
- `next lint` does NOT exist in Next.js 16 — never attempt to use it
- TypeScript checking: `pnpm exec tsc --noEmit`
