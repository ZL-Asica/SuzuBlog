# AGENTS.md

Use this file as the working contract for future coding agents (e.g., Codex, Claude Code) runs in this repository. Inspect first, then change. Prefer small, coherent edits that match the existing Next.js App Router structure.

## Related Docs

- [`README.md`](./README.md): project overview and quick start.
- [`ARCHITECTURE.md`](./ARCHITECTURE.md): source layout, content model, generated outputs, and config ownership.
- [`DEVELOPMENT.md`](./DEVELOPMENT.md): local setup, content editing, validation, and deployment notes.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md): contributor workflow, code style, and PR checklist.

Agents should follow `CONTRIBUTING.md` unless the user explicitly asks for a different structure.

## Repo Overview

- This is a Next.js App Router blog template, not a TanStack Start app.
- The app uses React 19, TypeScript, Tailwind CSS v4, Markdown content files, Zod validation, and Vercel for deployment.
- Package manager: `pnpm`.
- This repository has no database, auth system, or custom API runtime.

## Source Layout

- `src/app`: Next.js routes, metadata, sitemap, robots, manifest, and loading states.
- `src/components`: reusable UI, grouped by surface such as article, posts, anime, common, and ui.
- `src/hooks`: client hooks for search, URL state, and table-of-contents logic.
- `src/lib`: shared metadata, JSON-LD, social data, and pure helpers.
- `src/schemas`: Zod schemas for config and content-adjacent data.
- `src/services`: config loading, content loading, and generated RSS/LLM output.
- `src/styles`: theme and utility CSS.
- `src/types`: global types.
- `posts`: Markdown posts; `posts/_pages` contains special pages.
- `public`: static assets and generated public files.

## Architecture Expectations

- Keep route files focused on framework integration and page composition.
- Keep content parsing in `src/services/content` and config loading in `src/services/config`.
- Keep generated RSS, LLM, image URL, and slug helpers in `src/services/utils` unless there is a clear reason to move them.
- Preserve alias usage with `@/...`; do not add another source alias.
- When adding config fields, update `config.yml`, `src/schemas/config.ts`, and any relevant docs together.
- Reuse existing metadata and JSON-LD helpers instead of hand-building metadata in individual routes.

## Content Guidance

- Top-level `posts/*.md` files are blog posts.
- `posts/_pages/About.md` and `posts/_pages/Friends.md` back the `/about` and `/friends` pages.
- Use the existing frontmatter shape and visibility rules from `src/services/content/postVisibility.ts`.
- Generated files in `public/feed.xml`, `public/llms.txt`, and `public/llms-full.txt` are derived from published posts and site config. Review generated diffs before committing.

## Validation and Testing

- Inspect available scripts before choosing commands.
- Run the most relevant validation for the files changed.
- Use `pnpm lint:fix` for automatic formatting and linting fixes.
- Use `pnpm run build` for code, route, config schema, content pipeline, or generated-output changes.
- There is currently no `pnpm test` script nor test framework right now.
- If validation fails, report the command, the failure, and whether it appears related to the current change.

## Commits and Branches

- Keep commits small, coherent, and conventional when commits are requested.
- Prefer commit messages such as:
  - `docs(project): align contributor guide`
  - `feat(markdown): add excerpt support with <!--more-->`
  - `fix(content): preserve unlisted post metadata`

Before presenting work as ready, state clearly:

- what branch the work is on
- what commits were created, if any
- what validation passed
- what validation was not run and why
- whether any known or unrelated failures remain
