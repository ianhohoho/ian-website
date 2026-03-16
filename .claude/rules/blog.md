---
paths:
  - "content/blog/**/*.md"
  - "src/app/blog/**/*.tsx"
  - "src/lib/blog.ts"
---

# Blog Rules

## Blog Posts
- Written as Markdown files in `content/blog/`
- Frontmatter fields: `title`, `date`, `description`, `tags` (string array)
- Parsed with `gray-matter` + `remark`/`remark-html`
- Blog post pages are statically generated via `generateStaticParams`

## Styling
- Post content rendered with `prose prose-invert` (Tailwind Typography)
- Links styled as primary (cyan): `prose-a:text-primary`
- Code styled as primary: `prose-code:text-primary`
- Tag pills use the standard cyan style: `border border-primary/20 bg-primary/5 text-primary`
- Back link: `hover:text-primary`
