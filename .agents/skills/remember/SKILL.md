---
name: remember
description: Consolidate durable project knowledge from the current session into this repository's Codex instructions. Use when the user explicitly invokes $remember or asks to persist session learnings, conventions, or project documentation.
---

# Persist Session Knowledge

Review all changes made during this conversation and update the project's documentation and rules to reflect the current state. Follow these steps:

## 1. Gather Context

- Run `git diff HEAD~5..HEAD --stat` to see recent file changes
- Read `AGENTS.md` and all nested `AGENTS.md` files in the repository.
- If the runtime explicitly provides a persistent memory file, read it. Do not invent a memory path or write outside the repository without authorization.

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

### `AGENTS.md`
- Update the root file for repository-wide architecture, commands, workflow, and conventions.
- Update or create a nested `AGENTS.md` when guidance applies only to one directory tree.
- Remove stale guidance instead of accumulating exceptions.

### Persistent memory
- If an explicit persistent memory file is available, update it with:
  - User workflow preferences
  - Key project facts
  - Gotchas and things to avoid
- Keep it concise — under 200 lines

## 4. Commit

- Stage only the documentation files you changed
- Commit with message: `docs: update project docs and rules via /remember`

## Rules for Updating

- **Don't duplicate** — keep each instruction in the narrowest applicable `AGENTS.md`
- **Don't be stale** — remove information that is no longer true
- **Be specific** — "use Baby Blue #89CFF0 for primary" is better than "use blue"
- **Capture preferences** — if the user said "always restart the dev server", that's a rule
- **Scope by directory** — component rules belong in `src/components/AGENTS.md`
