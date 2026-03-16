# Ian's Personal Website

## Overview
Personal portfolio/blog website for a data scientist. Purely frontend, hosted on Vercel. Auto-deploys on push to `main`.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3 + shadcn/ui CSS variable design tokens
- **Animations**: Motion (Framer Motion v11+) — page transitions, scroll reveals, typing effects
- **Blog**: Local `.md` files in `content/blog/`, parsed with `gray-matter` + `remark`/`remark-html`
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono (monospace everywhere, loaded via `next/font/google`)
- **Package Manager**: pnpm
- **Hosting**: Vercel (auto-deploy on push to main)
- **Repo**: `github.com/ianhohoho/ian-website`

## Project Structure
```
src/
  app/
    layout.tsx          # Root layout (navbar, footer, dark theme, JetBrains Mono, dot-grid bg)
    template.tsx        # Page transition wrapper (re-mounts on every navigation)
    page.tsx            # Landing page (hero only)
    about/page.tsx      # About Me page (fun facts cards)
    resume/page.tsx     # Resume page (timeline with cyan accent borders)
    portfolio/page.tsx  # Portfolio page (projects + articles, staggered animations)
    blog/page.tsx       # Blog listing (staggered card animations)
    blog/[slug]/page.tsx  # Individual blog post
    contact/page.tsx    # Contact page (animated cards)
    not-found.tsx       # Custom 404 (gradient text, terminal style)
  components/
    navbar.tsx          # <i/> logo mark, motion layoutId indicator, AnimatePresence mobile menu
    footer.tsx          # Terminal-style copyright + version, social icons with glow hover
    hero.tsx            # Profile photo, gradient name, rotating TypingEffect, CTA buttons
    animate-in.tsx      # Scroll-triggered entrance (useInView + motion)
    page-transition.tsx # Fade-in-up motion wrapper
    typing-effect.tsx   # Rotating multi-title typing animation with blinking cursor
    project-card.tsx    # Project card with glow hover, styled action buttons
    article-card.tsx    # Article card with glow hover
    blog-card.tsx       # Blog post card with glow hover, cyan tag pills
  data/               # Static data files (projects.ts, articles.ts)
  lib/                # Utilities (blog parser, cn helper)
content/blog/         # Markdown blog posts with frontmatter
public/images/        # Static images (dp.jpg profile photo)
.hooks/               # Git hooks (committed to repo)
.claude/              # Claude Code project config, rules, and skills
  skills/remember/    # /remember slash command
```

## Commands
- `pnpm dev` — Start dev server (port 3000)
- `pnpm build` — Production build
- `pnpm exec tsc --noEmit` — TypeScript type check
- `lsof -ti:3000 | xargs kill 2>/dev/null; sleep 1; rm -rf .next && pnpm dev` — Full dev server restart

## Pre-commit Hook
A pre-commit hook in `.hooks/pre-commit` bumps the patch version, runs `tsc --noEmit`, and `pnpm build` before every commit.
- Git is configured with `core.hooksPath = .hooks`
- After cloning, run: `git config core.hooksPath .hooks`

## Quality Gates (CI + Pre-commit)
1. `pnpm exec tsc --noEmit` — TypeScript type check, must pass
2. `pnpm build` — Production build, must pass
- These run in GitHub Actions (`.github/workflows/lint.yml`) and in the pre-commit hook
- `next lint` was removed in Next.js 16 — do NOT use it

## Design System
- **Theme**: Dark-only, enforced via `<html class="dark">`
- **Background**: Near-black (`0 0% 3%`)
- **Primary / Accent**: Baby Blue `#89CFF0` (`199 77% 74%`)
- **Glow / Highlight**: Electric Cyan `#00D4FF` (`190 100% 50%`)
- **Text**: Off-White `#F5F5F5` (`0 0% 96%`)
- **CSS variables**: Defined in `globals.css` under `.dark` selector
- **Custom utilities**: `.bg-grid-pattern`, `.text-gradient`, `.card-glow`, `.drop-shadow-glow`
- **Animations**: `fade-in-up`, `glow-pulse`, `terminal-blink` keyframes
