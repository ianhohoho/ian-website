---
name: remember
description: Consolidate session changes into project docs, rules, and memory
disable-model-invocation: true
---

# /remember — Persist Session Knowledge

Review all changes made during this conversation and update the project's documentation and rules to reflect the current state. Follow these steps:

## 1. Gather Context

- Run `git diff HEAD~5..HEAD --stat` to see recent file changes
- Read the current documentation files:
  - `.claude/CLAUDE.md`
  - `.claude/rules/*.md`
  - `CLAUDE.md` (root)
- Read the persistent memory file at the user's Claude memory directory (the path shown in the system prompt under "auto memory")

## 2. Identify What Changed

Look at the conversation for:
- **New files or components** added to the project
- **Structural changes** (new pages, routes, directories)
- **New dependencies** installed
- **Design changes** (colors, fonts, layouts, animations)
- **Workflow changes** (new scripts, hooks, CI changes, preferences the user stated)
- **User preferences** expressed during the conversation (e.g. "always do X", "never do Y", "I prefer Z")
- **Bug fixes or gotchas** discovered (e.g. "next lint doesn't work in Next.js 16")

## 3. Update Files

### `.claude/CLAUDE.md`
- Update the project overview, tech stack, and structure to reflect the current state
- Add/remove entries as needed — don't leave stale information

### `.claude/rules/*.md`
- Update existing rule files if their content is affected
- Create new rule files if a new category of rules emerged (e.g. a new `api.md` if API routes were added)
- Use path-specific frontmatter when rules apply to specific directories:
  ```yaml
  ---
  paths:
    - "src/some/path/**/*.tsx"
  ---
  ```

### `CLAUDE.md` (root)
- Keep this as a brief quick-reference that points to `.claude/CLAUDE.md` and `.claude/rules/`
- Update any quick-reference commands or facts that changed

### Persistent memory file
- Update the memory file at the auto memory path with:
  - User workflow preferences
  - Key project facts
  - Gotchas and things to avoid
- Keep it concise — under 200 lines

## 4. Commit

- Stage only the documentation files you changed
- Commit with message: `docs: update project docs and rules via /remember`

## Rules for Updating

- **Don't duplicate** — if something is in a rule file, don't repeat it in CLAUDE.md
- **Don't be stale** — remove information that is no longer true
- **Be specific** — "use Baby Blue #89CFF0 for primary" is better than "use blue"
- **Capture preferences** — if the user said "always restart the dev server", that's a rule
- **Path-scope when possible** — component rules should have `paths: ["src/components/**"]`
