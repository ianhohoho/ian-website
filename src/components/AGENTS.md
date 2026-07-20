# Shared Component Instructions

## Animation

- Use `AnimateIn` for scroll-triggered entrances. It accepts `delay` and `className`; pass `className="h-full"` inside equal-height grids.
- `PageTransition` is owned by `src/app/template.tsx`; do not call it directly elsewhere.
- `TypingEffect` accepts `texts: string[]`, cycles through type and delete states, and always displays its blinking cursor.

## Cards

- Apply `.card-glow` and `hover:border-primary/30` to all cards.
- Use `rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary` for tag and technology pills.
- Use `hover:text-primary` for card links.
- `ProjectCard` supports `wip?: boolean` for a yellow WIP badge and `showTechStack?: boolean` to hide technology pills.

## Analytics Components

- Mount `AnalyticsPageTracker` once from the root layout. It measures foreground time per pathname and must skip `/analytics`.
- Wrap every trackable blog, article, project, and side-quest card in `AnalyticsAsset` with a stable type, name, and ID. Count a view only after at least 50% visibility and one second of foreground time.
- Keep `TrafficChart` dependency-free, accessible as an SVG image, and driven by the filled daily series returned by the server analytics layer.

## Footer

- Import the version from `package.json` and display `$ © 2026 Ian Ho | v{version}` inline.
- Style the version with `text-primary`.
- Keep GitHub, LinkedIn, and Email icons with `hover:text-primary` and `drop-shadow-glow`.

## Hero

- Keep Hero as a client component because it uses Motion.
- Use `/images/dp.jpg` in a glowing circular frame with the existing `scale-125` crop.
- Apply `.text-gradient` to the name and use `TypingEffect` for rotating titles.
- Keep the one-line summary followed by a two-by-two grid of emoji information cards.
- Keep CTA buttons uniformly outlined with always-visible arrows that move right on hover.

## Side Navigation

- Keep `SideNav` reusable across Portfolio and Resume.
- Accept `sections: { id: string; label: string }[]`.
- Keep it client-side with `IntersectionObserver`-driven active-section tracking.
- Hide it below the `lg` breakpoint and keep it sticky at `top-32`.
- Mark the active section with a primary-colored left border and text.

## Navbar

- Keep Navbar client-side for `usePathname` and menu state.
- Link the `<i/>` mark to Home.
- Keep the desktop `layoutId="navbar-indicator"` underline and the `AnimatePresence` mobile menu.
