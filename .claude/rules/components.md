---
paths:
  - "src/components/**/*.tsx"
---

# Component Rules

## Animation Components
- `animate-in.tsx` — Wrap sections in `<AnimateIn>` for scroll-triggered entrance. Accepts `delay` prop for staggering.
- `page-transition.tsx` — Used by `template.tsx`, not called directly.
- `typing-effect.tsx` — Accepts `texts: string[]` array, cycles through them with type/delete animation. Always shows blinking cursor.

## Card Components
- All cards use `.card-glow` for hover effect
- All cards use `hover:border-primary/30` for border highlight
- Tag/tech pills: `rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary`
- Link hover color: `hover:text-primary` (not `hover:text-foreground`)

## Footer
- Imports version from `package.json` and displays inline: `$ © 2026 Ian Ho | v0.1.x`
- Version number styled with `text-primary` (Baby Blue)
- Social icons: GitHub, LinkedIn, Email — hover with `text-primary` and `drop-shadow-glow`

## Hero
- Client component (`"use client"`) due to motion animations
- Profile photo at `/images/dp.jpg` in a glowing circular frame (`scale-125` zoom)
- Name uses `.text-gradient`
- Subtitle uses `<TypingEffect>` with rotating titles
- CTA buttons: uniform outlined style, arrow always visible, nudges right on hover

## Navbar
- Client component due to `usePathname` and `useState`
- `<i/>` logo mark links to home
- Desktop: motion `layoutId="navbar-indicator"` for sliding underline
- Mobile: `AnimatePresence` for menu animation
