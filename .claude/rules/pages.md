---
paths:
  - "src/app/**/page.tsx"
  - "src/app/not-found.tsx"
  - "src/app/template.tsx"
  - "src/app/layout.tsx"
---

# Page Rules

## All Pages
- Export metadata via `export const metadata: Metadata`
- Headings use terminal-prefix style with `<span className="text-primary">` prefix
- Section sub-headers (h2) styled with `text-primary` (baby blue)
- Content sections wrapped in `<AnimateIn>` for scroll-triggered reveals
- Lists/grids of cards use staggered delays: `<AnimateIn delay={i * 0.1}>`

## Specific Pages
- **Home** (`page.tsx`): Hero component only, no other content
- **About** (`about/page.tsx`): Fun facts cards (hiking, badminton, volunteering, writing) — edit the `funFacts` array to update
- **Resume** (`resume/page.tsx`): Real experience (GovTech, Grab, Point72), education (Columbia, Oxford). Timeline uses `border-primary/30` left border, skill pills use cyan style
- **Portfolio** (`portfolio/page.tsx`): Staggered project and article cards
- **Blog** (`blog/page.tsx`): Staggered blog cards
- **Blog Post** (`blog/[slug]/page.tsx`): Prose styles — `prose-a:text-primary prose-code:text-primary`
- **Contact** (`contact/page.tsx`): Staggered contact cards with icon + glow hover
- **404** (`not-found.tsx`): `.text-gradient` on "404", terminal-style subtitle

## Layout
- `layout.tsx`: Root layout with JetBrains Mono font, `.bg-grid-pattern` wrapper, Navbar + Footer
- `template.tsx`: Wraps all page content in `<PageTransition>` for automatic fade-in on navigation
