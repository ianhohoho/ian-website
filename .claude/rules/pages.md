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
- **About** (`about/page.tsx`): Fun facts cards (6 cards: hiking, gym, volunteering, writing, bias-to-action, PPE training) — edit the `funFacts` array to update. Intro links to resume page ("For my professional background, check out my resume. But more personally...")
- **Resume** (`resume/page.tsx`): Data-driven from `content/resume/` markdown files via `getResumeData()`. Async Server Component. Sticky `SideNav` with sections: Summary, Experience, Education, Skills, Certifications. Summary uses same card grid format as hero. Experience bullets rendered via `dangerouslySetInnerHTML` with `.resume-bullets` CSS (supports nested sub-bullets with `›` prefix in grey). Timeline uses `border-primary/30` left border, skill pills use cyan style. Education shows subjects as pills and achievements in white bold text. Certifications grouped by category (AI/ML, Cloud/DevOps, Product/Agile, Software Engineering) in 2-col card grid. "View LinkedIn" button links to linkedin.com/in/ianhojy
- **Portfolio** (`portfolio/page.tsx`): Data-driven from `content/projects/`, `content/articles/`, and `content/sidequests/` markdown files. Three sections: Projects → Articles → Side Quests. Sticky `SideNav` on desktop. Projects use terminal-style showcase cards (macOS window chrome header with `~/projects/` path, optional yellow WIP badge via `wip: true` in frontmatter) in a scrollable container (`max-h-[600px]`, `.scrollable-section`). Articles use numbered list (`01`, `02`...) in a single bordered container. Side Quests use quest-log timeline with upward arrow nodes and "Retired" badges. Sections have `scroll-mt-24` for proper anchor scrolling
- **Blog** (`blog/page.tsx`): Staggered blog cards
- **Blog Post** (`blog/[slug]/page.tsx`): Prose styles — `prose-a:text-primary prose-code:text-primary`
- **Contact** (`contact/page.tsx`): Staggered contact cards with icon + glow hover
- **404** (`not-found.tsx`): `.text-gradient` on "404", terminal-style subtitle

## Layout
- `layout.tsx`: Root layout with JetBrains Mono font, `.bg-grid-pattern` wrapper, Navbar + Footer
- `template.tsx`: Wraps all page content in `<PageTransition>` for automatic fade-in on navigation
