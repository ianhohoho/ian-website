# Ian's Personal Website

## Overview
Personal portfolio/blog website for a data scientist. Purely frontend, hosted on Vercel.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3 + shadcn/ui design tokens (dark theme)
- **Animations**: Motion (Framer Motion v11+) for page transitions, scroll reveals, typing effects
- **Blog**: Local `.md` files in `content/blog/`, parsed with `gray-matter` + `remark`/`remark-html`
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono (monospace everywhere, via next/font)
- **Package Manager**: pnpm

## Project Structure
```
src/
  app/              # Next.js App Router pages
    layout.tsx      # Root layout (navbar, footer, dark theme, JetBrains Mono)
    template.tsx    # Page transition wrapper (re-mounts on navigation)
    page.tsx        # Landing page (hero only)
    about/          # About Me page (fun facts)
    resume/         # Resume page
    portfolio/      # Portfolio page (projects + articles)
    blog/           # Blog listing + [slug] pages
    contact/        # Contact page
  components/       # Shared React components
    animate-in.tsx  # Scroll-triggered entrance animation
    page-transition.tsx  # Page fade-in-up wrapper
    typing-effect.tsx    # Rotating typing effect with blinking cursor
  data/             # Static data files (projects.ts, articles.ts)
  lib/              # Utilities (blog parser, cn helper)
content/blog/       # Markdown blog posts with frontmatter
public/images/      # Static images (including dp.jpg profile photo)
.hooks/             # Git hooks (committed, shared across clones)
```

## Commands
- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm exec tsc --noEmit` — TypeScript type check

## Pre-commit Hook
A pre-commit hook runs `tsc --noEmit` and `pnpm build` before every commit.
- Hook lives in `.hooks/pre-commit` (committed to repo)
- Git is configured with `core.hooksPath = .hooks`
- After cloning, run: `git config core.hooksPath .hooks`

## Quality Gates
Before pushing changes, always run:
1. `pnpm exec tsc --noEmit` — must pass
2. `pnpm build` — must pass
These are the same checks that run in CI (GitHub Actions) and in the pre-commit hook.

## Key Patterns
- Dark theme enforced via `<html class="dark">` in root layout
- Color palette: black background, Baby Blue (#89CFF0) primary, Electric Cyan (#00D4FF) glow/highlight
- shadcn/ui CSS variables for consistent theming (defined in globals.css)
- Blog posts use frontmatter: title, date, description, tags
- Portfolio data is driven from TypeScript files in `src/data/`
- All pages are statically generated (SSG)
- `next lint` was removed in Next.js 16 — do not use it

## Workflow Preferences
- After making code changes, restart the dev server: `lsof -ti:3000 | xargs kill 2>/dev/null; sleep 1; rm -rf .next && pnpm dev`
- Always run type check + build before committing/pushing
