# Code Style Rules

## General
- TypeScript strict mode — all code must pass `tsc --noEmit`
- Prefer editing existing files over creating new ones
- Keep components focused and single-purpose
- Use `"use client"` directive only when the component needs client-side interactivity (motion, useState, etc.)

## Imports
- Use `@/` path alias for all imports from `src/`
- Import order: React/Next → third-party → local components → local utils/data
- Use named exports for components (not default), except for page components which use default export

## Components
- Shared components go in `src/components/`
- Page components go in `src/app/<route>/page.tsx`
- Props interfaces defined inline in the same file (no separate types file)
- Use `cn()` utility from `@/lib/utils` for conditional class merging

## Styling
- Tailwind CSS classes only — no inline styles, no CSS modules
- Use shadcn/ui CSS variable tokens (e.g., `bg-background`, `text-primary`, `border-border`)
- Custom utilities defined in `globals.css` under `@layer utilities`
- Card hover effects: use `.card-glow` class
- Accent text: use `text-primary` (Baby Blue) or `.text-gradient` (Baby Blue → Electric Cyan)
- Tag/pill styling: `rounded-full border border-primary/20 bg-primary/5 text-primary`
- Button hover glow: `hover:shadow-[0_0_16px_hsl(var(--glow)/0.15)]`

## Animations
- Use `motion` package (Framer Motion) — import from `"motion/react"`
- Page-level animations: wrap in `<AnimateIn>` component
- Staggered lists: `<AnimateIn delay={i * 0.1}>`
- Type the `ease` property with `as const` to satisfy TypeScript (e.g., `ease: "easeOut" as const`)

## Pages
- All page headings use terminal-prefix style: `<span className="text-primary">$</span> Title`
- Prefixes: `>` for Resume/Contact, `#` for Portfolio/About, `$` for Blog/404
- Metadata exported via `export const metadata: Metadata = { ... }`
