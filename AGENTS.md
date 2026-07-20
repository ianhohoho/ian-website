# Ian's Personal Website

## Overview

Personal portfolio and blog for a data scientist. Most public content is statically generated; a password-protected server route provides private PostHog analytics. The site is hosted on Vercel and automatically deployed when changes reach `main`.

## Tech Stack

- Framework: Next.js 16 App Router with React 19
- Language: TypeScript in strict mode
- Styling: Tailwind CSS 3 with shadcn/ui-style CSS variable tokens
- Animation: Motion, imported from `motion/react`
- Analytics: PostHog through `posthog-js` plus server-side HogQL queries
- Content: Markdown under `content/`, parsed with `gray-matter`, `remark`, and `remark-html`
- Icons: Lucide React
- Font: JetBrains Mono through `next/font/google`
- Package manager: pnpm only
- Hosting: Vercel
- Repository: `github.com/ianhohoho/ian-website`

## Project Structure

```text
src/
  app/
    layout.tsx            # Root layout, navbar, footer, theme, font, and grid background
    template.tsx          # Page transition wrapper
    page.tsx              # Landing page
    about/page.tsx        # About page
    resume/page.tsx       # Resume timeline
    portfolio/page.tsx    # Projects, articles, and side quests
    blog/page.tsx         # Blog listing
    blog/[slug]/page.tsx  # Blog post
    contact/page.tsx      # Contact page
    analytics/page.tsx    # Private, dynamic PostHog dashboard
    icon.svg              # Favicon
    not-found.tsx         # Custom 404
  components/             # Shared UI components
  lib/                    # Content parsers and utilities
  instrumentation-client.ts # PostHog browser initialization
content/
  blog/                   # Blog posts
  projects/               # Project entries
  articles/               # Article entries
  sidequests/             # Side-quest entries
  resume/                 # Summary, experience, education, skills, and certifications
public/images/            # Static images
.agents/skills/           # Project-local Codex skills
.hooks/                   # Committed Git hooks
```

More specific instructions are inherited from:

- `src/app/AGENTS.md` for pages and layouts
- `src/components/AGENTS.md` for shared components

## Commands and Quality Gates

- Start development: `pnpm dev` on port 3000
- Type-check: `pnpm exec tsc --noEmit`
- Production build: `pnpm build`
- Do not run `next lint`; it was removed in Next.js 16.
- After cloning, run `git config core.hooksPath .hooks`.

The pre-commit hook in `.hooks/pre-commit` bumps the patch version, stages that version change, runs the type-check, and builds the production bundle. Never skip the hook with `--no-verify`, and do not bump the version manually.

GitHub Actions runs the same type-check and build. A push to `main` triggers Vercel deployment. If a push is rejected because `main` advanced, run `git pull --rebase origin main` before pushing again.

PostHog adds a transitive `core-js` install script. Keep `core-js: true` in `pnpm-workspace.yaml` so pnpm's build-script policy and the pre-commit hook can install dependencies non-interactively.

## Workflow

- Prefer editing existing files over creating new ones.
- Use pnpm, never npm or yarn.
- Use descriptive commit messages.
- After any code change, invoke the project `reload` skill or perform its equivalent: stop the process on port 3000, clear `.next`, restart `pnpm dev` in the background, and open the relevant page for verification.
- Do not add an AI co-author trailer unless the user explicitly requests one.

## Code Style

- Keep components focused and single-purpose.
- Add `"use client"` only when client-side interactivity requires it.
- Use the `@/` alias for imports from `src/`.
- Order imports as React/Next, third-party packages, local components, then local utilities or data.
- Use named component exports. Page components are the exception and use default exports.
- Define prop interfaces in the component file rather than a separate types file.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Use Tailwind classes rather than inline styles or CSS modules.
- Define shared custom utilities in `globals.css` under `@layer utilities`.
- Use CSS variable tokens such as `bg-background`, `text-primary`, and `border-border`.
- Import Motion APIs from `motion/react`.
- Wrap page-level reveals in `AnimateIn`; stagger lists with `delay={i * 0.1}`.
- Type Motion easing literals with `as const` when required by TypeScript.

## Design System

- The theme is dark-only. Keep `<html class="dark">`; do not add a light theme or theme toggle.
- Background: near-black `#080808` / `--background: 0 0% 3%`.
- Primary: Baby Blue `#89CFF0` / `--primary: 199 77% 74%`.
- Glow: Electric Cyan `#00D4FF` / `--glow: 190 100% 50%`.
- Foreground: Off-White `#F5F5F5` / `--foreground: 0 0% 96%`.
- Border: `--border: 0 0% 22%`, intentionally brighter for card visibility.
- Use `text-foreground` for important content, including the hero title, About descriptions, and resume bullets.
- Do not introduce another accent color without user approval.
- JetBrains Mono is the only font; Tailwind's sans family maps to it.
- Preserve the dot-grid background, profile-photo glow, card hover glow, social-icon glow, gradient hero name, and terminal-style heading prefixes.
- Use `.card-glow` on interactive cards and `hover:border-primary/30` for their border highlight.
- Style tags and pills with `rounded-full border border-primary/20 bg-primary/5 text-primary` plus context-appropriate spacing.
- Default CTA buttons are outlined and muted; on hover, highlight the border and text and nudge the arrow right.
- Portfolio Code and Live Demo actions remain visually distinct: outlined for Code and filled for Live Demo.
- Keep the favicon at `src/app/icon.svg`: a circular black SVG with a subtle baby-blue ring and the `<i/>` mark.

## Blog

- Store posts as Markdown in `content/blog/`.
- Require frontmatter fields `title`, `date`, `description`, and `tags` as a string array.
- Write body content for the existing `remark` and `remark-html` pipeline; do not add unsupported MDX syntax.
- Parse posts with `gray-matter`, `remark`, and `remark-html`.
- Statically generate post routes with `generateStaticParams`.
- Render post content with `prose prose-invert`, `prose-a:text-primary`, and `prose-code:text-primary`.
- Use the standard cyan pill treatment for tags and `hover:text-primary` for the back link.

## Analytics

- Keep `/analytics` unlinked, password-protected, dynamically rendered, and marked `noindex`, `nofollow`, `noarchive`, and `nosnippet`.
- Required local and Vercel Production variables are `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `NEXT_PUBLIC_POSTHOG_HOST`, `POSTHOG_PROJECT_ID`, `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_API_HOST`, and `ANALYTICS_PASSWORD`. Document them with empty values in `.env.example`; never commit real values.
- Only the token and ingest host use `NEXT_PUBLIC_`. Keep the personal API key, project ID, API host, and dashboard password server-only.
- Rotating `ANALYTICS_PASSWORD` invalidates existing signed dashboard sessions. Store the resulting cookie as signed, HTTP-only, `sameSite=lax`, and secure in production.
- Browser analytics live in `src/instrumentation-client.ts`. Honor Do Not Track, exclude `/analytics`, keep session recording and autocapture disabled, and use local-storage persistence with anonymous profiles.
- Capture `$pageview` automatically. Custom events are `page_engagement` (`path`, `duration_seconds`), `asset_viewed` (`asset_type`, `asset_name`, `asset_id`, `active_seconds`), and `asset_opened` (asset fields plus link metadata).
- Send unload-time duration and visibility events with `transport: "sendBeacon"` and `send_instantly: true`; ordinary batched delivery can lose page-exit events.
- Server-side dashboard queries live in `src/lib/posthog-analytics.ts`, use rolling 7/30/90-day windows, exclude `/analytics`, and issue requests with Next.js `cache: "no-store"`.
- PostHog's `/query` API caches results by default and caches different range queries independently. Immediately after new event ingestion, two ranges can briefly show different snapshots even when all events fit both windows; a later request converges. Use PostHog's documented `refresh` modes if strict fresh-on-every-click behavior becomes necessary, while considering query limits.
