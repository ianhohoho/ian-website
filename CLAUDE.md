# Ian's Personal Website

See `.claude/CLAUDE.md` for full project documentation.
See `.claude/rules/` for detailed rules on workflow, code style, design, components, pages, and blog.

## Quick Reference
- **Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 3 + Motion
- **Package Manager**: pnpm
- **Dev**: `pnpm dev` (port 3000)
- **Quality Gates**: `pnpm exec tsc --noEmit` + `pnpm build` (pre-commit hook + CI)
- **Deploy**: Push to `main` → Vercel auto-deploys
- **No `next lint`**: Removed in Next.js 16, do not use
- **After code changes**: Restart dev server (`lsof -ti:3000 | xargs kill 2>/dev/null; sleep 1; rm -rf .next && pnpm dev`)
