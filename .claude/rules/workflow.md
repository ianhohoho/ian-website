# Workflow Rules

## Dev Server
- After making ANY code changes, always restart the dev server for the user:
  ```
  lsof -ti:3000 | xargs kill 2>/dev/null; sleep 1; rm -rf .next && pnpm dev
  ```
- Run this in the background so the conversation can continue
- The user will hard-refresh (`Cmd+Shift+R`) to see changes

## Before Committing
- The pre-commit hook handles this automatically, but if committing manually:
  1. `pnpm exec tsc --noEmit` — must pass
  2. `pnpm build` — must pass
- Never skip hooks (`--no-verify`)

## Pushing to GitHub
- Remote often has changes from Vercel's version-bump workflow
- If `git push` is rejected, always run `git pull --rebase origin main` first, then push again
- Vercel auto-deploys on push to `main` — no manual deploy step needed

## Committing
- Use descriptive commit messages
- Always include `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` when Claude writes the code
- Bump the version in `package.json` when the user asks to deploy

## Tools & Commands
- Package manager: `pnpm` (never npm or yarn)
- `next lint` does NOT exist in Next.js 16 — never attempt to use it
- TypeScript checking: `pnpm exec tsc --noEmit`
