# Development Guide

[English](./DEVELOPMENT.md) | [中文](./DEVELOPMENT_ZH.md)

This guide covers local setup, content editing, validation, and deployment for SuzuBlog.

## Prerequisites

- Node.js >= 20.9.0, prefer matching `.node-version`
- pnpm, matching `packageManager` in `package.json`

Install dependencies:

```bash
pnpm install
```

## Local Development

Start the app:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000/
```

Build the production app:

```bash
pnpm run build
```

Start a built production app:

```bash
pnpm start
```

## Available Scripts

- `pnpm dev`: start the Next.js development server.
- `pnpm run build`: run `pnpm run lint:fix`, then `next build`.
- `pnpm start`: start the production Next.js server after a build.
- `pnpm lint`: run ESLint.
- `pnpm lint:fix`: run ESLint with automatic fixes.

There is no test script configured at the moment. Prefer `pnpm lint` or `pnpm run build` for documentation-adjacent changes, and add focused tests if a future change introduces test infrastructure.

## Configuration

Edit `config.yml` for site-wide settings:

- title, subtitle, description, keywords, language, and site URL
- author profile and avatar/background images
- pagination and content license defaults
- social links and RSS visibility
- Twikoo or Disqus comment integration
- custom head scripts and footer HTML

Config is validated with Zod at runtime. If a new config field is added, update both `config.yml` and `src/schemas/config.ts`.

## Content Editing

Create posts as Markdown files in `posts`:

```text
posts/my-post.md
```

Special pages live in `posts/_pages`:

```text
posts/_pages/About.md
posts/_pages/Friends.md
```

Typical post frontmatter:

```yaml
---
title: My Post
date: '2026-05-29 09:00:00'
thumbnail: /images/background.jpg
categories:
  - Notes
tags:
  - Next.js
  - Markdown
---
```

Use `<!--more-->` to control the excerpt shown in post lists. Without it, the abstract is derived from the beginning of the post content.

## Post Visibility

Post visibility is controlled by the optional `status` frontmatter field:

- `published`: visible in lists, generated pages, sitemap, RSS, and LLM files.
- `unlisted`: page can render, but it is excluded from lists and generated crawler outputs.
- `draft`: available outside production; production requires `ALLOW_DRAFTS=true`.
- `hidden`: available only outside production with `ALLOW_HIDDEN=true`.

If `status` is omitted, the post is treated as `published`.

## Assets

Put static assets under `public`. Images used by posts and config usually belong in `public/images` and are referenced from the site root:

```md
![Alt text](/images/example.jpg)
```

`next/image` allows local images under `/images/**` and remote HTTPS images.

## Generated Files

The build can regenerate:

- `public/feed.xml`
- `public/llms.txt`
- `public/llms-full.txt`

These files come from published posts and `config.yml`. Review generated diffs before committing them.

## Validation

For documentation-only changes:

```bash
pnpm lint
```

For code, config schema, content pipeline, or route changes:

```bash
pnpm run build
```

Use `pnpm lint:fix` when you want ESLint and formatters to apply safe fixes. The Git pre-commit hook runs `npx nano-staged`; the pre-push hook runs `pnpm run build`.

## Deployment

The template is designed for Vercel and can also run anywhere that supports a standard Next.js app.

Before deploying:

- Set `siteUrl` in `config.yml` to the public origin without a trailing slash.
- Confirm public images, icons, RSS settings, and comment settings are correct.
- Run `pnpm run build`.
- Review generated `public/feed.xml`, `public/llms.txt`, and `public/llms-full.txt` if they changed.
