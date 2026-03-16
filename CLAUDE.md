# Ian's Personal Website

## Overview
Personal portfolio/blog website for a data scientist. Purely frontend, hosted on Vercel.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3 + shadcn/ui design tokens (dark theme)
- **Blog**: Local `.md` files in `content/blog/`, parsed with `gray-matter` + `remark`/`remark-html`
- **Icons**: Lucide React
- **Fonts**: Inter (via next/font)
- **Package Manager**: pnpm

## Project Structure
```
src/
  app/              # Next.js App Router pages
    layout.tsx      # Root layout (navbar, footer, dark theme)
    page.tsx        # Landing page
    resume/         # Resume page
    portfolio/      # Portfolio page (projects + articles)
    blog/           # Blog listing + [slug] pages
    contact/        # Contact page
  components/       # Shared React components
  data/             # Static data files (projects.ts, articles.ts)
  lib/              # Utilities (blog parser, cn helper)
content/blog/       # Markdown blog posts with frontmatter
public/images/      # Static images
```

## Commands
- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm lint` — Run ESLint

## Key Patterns
- Dark theme enforced via `<html class="dark">` in root layout
- shadcn/ui CSS variables for consistent theming (defined in globals.css)
- Blog posts use frontmatter: title, date, description, tags
- Portfolio data is driven from TypeScript files in `src/data/`
- All pages are statically generated (SSG)
