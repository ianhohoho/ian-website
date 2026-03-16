# Design Rules

## Color Palette
- **Background**: Near-black `#080808` — CSS var `--background: 0 0% 3%`
- **Primary (Baby Blue)**: `#89CFF0` — CSS var `--primary: 199 77% 74%` — used for buttons, links, active states, icons
- **Glow (Electric Cyan)**: `#00D4FF` — CSS var `--glow: 190 100% 50%` — used for hover glows, highlights, gradients
- **Foreground (Off-White)**: `#F5F5F5` — CSS var `--foreground: 0 0% 96%` — main text color
- **Muted**: Dimmed grays for secondary text and borders
- Key content text (hero cycling title, about me card descriptions, resume bullets) uses `text-foreground` (white), not `text-muted-foreground`
- Never introduce new accent colors without user approval

## Typography
- Font: JetBrains Mono (monospace) everywhere — loaded via `next/font/google`
- The `fontFamily.sans` in Tailwind is remapped to the monospace font

## Theme
- Dark-only theme — `<html class="dark">` is always set
- All colors defined as HSL CSS variables in `globals.css`
- Never add a light theme or theme toggle

## Visual Effects
- Dot-grid background pattern (`.bg-grid-pattern`) on the page wrapper
- Glow pulse animation on the hero profile photo
- Card hover glow (`.card-glow`) on all interactive cards
- Social icon hover: `hover:text-primary hover:drop-shadow-glow`
- Gradient text (`.text-gradient`) for the hero name and 404 heading
- Terminal-style prefixes on page headings (`>`, `#`, `$`)

## Favicon
- `src/app/icon.svg` — circular SVG with black background, subtle baby blue ring, `<i/>` logo
- Next.js auto-detects `icon.svg` in the app directory

## Navigation
- Logo: `<i/>` mark — angle brackets in muted color, "i" in gradient, glow on hover
- Active link indicator: motion `layoutId` underline that slides between links
- Mobile menu: `AnimatePresence` animated open/close

## Buttons
- CTA buttons should be uniform — outlined/muted by default, highlight on hover
- Hover state: border lights up to primary, text becomes primary, arrow nudges right
- Portfolio Code/Live Demo: styled as distinct clickable buttons (outlined for Code, filled for Live Demo)
