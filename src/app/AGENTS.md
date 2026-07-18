# App and Page Instructions

## Shared Page Rules

- Export page metadata as `export const metadata: Metadata = { ... }` when the route supports static metadata.
- Use terminal-prefix headings with a `text-primary` prefix. Use `>` for Resume and Contact, `#` for Portfolio and About, and `$` for Blog and 404.
- Style section headings with `text-primary`.
- Wrap content sections in `AnimateIn`; stagger card lists and grids with `delay={i * 0.1}`.

## Routes

- Home (`page.tsx`): render only the Hero component.
- About (`about/page.tsx`): maintain six fun-fact cards for hiking, gym, volunteering, writing, bias to action, and PPE training. Update the `funFacts` array to change them. The intro links to Resume before shifting to personal context.
- Resume (`resume/page.tsx`): load Markdown with `getResumeData()` in an async Server Component. Keep the desktop SideNav sections Summary, Experience, Education, Skills, and Certifications. Use the hero-style card grid for Summary, a `border-primary/30` timeline for Experience, cyan pills for skills and education subjects, bold white achievements, and a two-column certification grid grouped into AI/ML, Cloud/DevOps, Product/Agile, and Software Engineering. Render nested resume bullets through the existing sanitized content pipeline and `.resume-bullets` styles. Keep the LinkedIn action pointed at `linkedin.com/in/ianhojy`.
- Portfolio (`portfolio/page.tsx`): load projects, articles, and side quests from their respective `content/` folders. Keep sections ordered Projects, Articles, Side Quests with the desktop SideNav. Project cards use macOS-style window chrome, a `~/projects/` path, optional WIP badges, and a `max-h-[600px]` scrollable container. Articles remain a numbered list in one bordered container. Side quests remain a quest-log timeline with upward-arrow nodes and Retired badges. Use `scroll-mt-24` on anchored sections.
- Blog (`blog/page.tsx`): use staggered BlogCard entries.
- Blog post (`blog/[slug]/page.tsx`): keep cyan prose links and code.
- Contact (`contact/page.tsx`): use staggered icon contact cards with glow hover.
- 404 (`not-found.tsx`): apply `.text-gradient` to `404` and retain the terminal-style subtitle.

## Layout

- `layout.tsx` owns JetBrains Mono, the grid-pattern wrapper, Navbar, and Footer.
- `template.tsx` wraps route content in `PageTransition` for navigation fade-in.
