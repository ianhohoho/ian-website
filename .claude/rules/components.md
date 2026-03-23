---
paths:
  - "src/components/**/*.tsx"
---

# Component Rules

## Animation Components
- `animate-in.tsx` — Wrap sections in `<AnimateIn>` for scroll-triggered entrance. Accepts `delay` and `className` props. Use `className="h-full"` in grids for equal-height cards.
- `page-transition.tsx` — Used by `template.tsx`, not called directly.
- `typing-effect.tsx` — Accepts `texts: string[]` array, cycles through them with type/delete animation. Always shows blinking cursor.

## Card Components
- All cards use `.card-glow` for hover effect
- All cards use `hover:border-primary/30` for border highlight
- Tag/tech pills: `rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary`
- Link hover color: `hover:text-primary` (not `hover:text-foreground`)
- `ProjectCard` supports `wip?: boolean` — renders yellow WIP badge; `showTechStack?: boolean` — hides tech pills when false

## Footer
- Imports version from `package.json` and displays inline: `$ © 2026 Ian Ho | v0.1.x`
- Version number styled with `text-primary` (Baby Blue)
- Social icons: GitHub, LinkedIn, Email — hover with `text-primary` and `drop-shadow-glow`

## Hero
- Client component (`"use client"`) due to motion animations
- Profile photo at `/images/dp.jpg` in a glowing circular frame (`scale-125` zoom)
- Name uses `.text-gradient`
- Subtitle uses `<TypingEffect>` with rotating titles
- Below subtitle: one-liner summary, then 2x2 grid of info cards with emoji icons
- CTA buttons: uniform outlined style, arrow always visible, nudges right on hover

## Side Nav
- `side-nav.tsx` — Reusable sticky side nav, used on portfolio and resume pages
- Accepts `sections: { id: string; label: string }[]` prop
- Client component with `IntersectionObserver` for scroll-aware active section highlighting
- Hidden on mobile (`hidden lg:block`), sticky at `top-32`
- Active section: `border-primary text-primary` left border

## Navbar
- Client component due to `usePathname` and `useState`
- `<i/>` logo mark links to home
- Desktop: motion `layoutId="navbar-indicator"` for sliding underline
- Mobile: `AnimatePresence` for menu animation
