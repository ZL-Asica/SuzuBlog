# Architecture

[English](./ARCHITECTURE.md) | [中文](./ARCHITECTURE_ZH.md)

SuzuBlog is a minimalist blog template built with Next.js App Router, React, TypeScript, Tailwind CSS, and Markdown content files. It is designed to be deployed as a static-friendly Next.js site, with first-class Vercel support.

## Runtime Model

- Next.js App Router owns routing, metadata, sitemap, robots, manifest, and page rendering under `src/app`.
- Blog content is stored as Markdown files in `posts`.
- Site-wide settings are stored in `config.yml` and validated with Zod before use.
- Public assets live in `public`; images referenced by config and posts should usually be placed under `public/images`.
- RSS and LLM text files are generated into `public` during static parameter generation for posts.

The project does not use a database, custom API server, authentication provider, or serverless mail/runtime bindings.

## Source Layout

```text
src/
  app/          Next.js App Router routes, metadata, sitemap, robots, manifest
  components/   Reusable UI grouped by domain and surface
  hooks/        Client hooks for search, URL state, and table of contents logic
  lib/          Shared metadata, JSON-LD, social data, and pure helpers
  schemas/      Zod schemas for config and content-adjacent data
  services/     Content loading, config loading, and generated output utilities
  styles/       Tailwind theme and utility CSS
  types/        Global project types
```

Keep route files focused on page composition and framework integration. Content parsing, config loading, generated files, and reusable logic should stay in `src/services` or `src/lib`, following the current split.

## Content Model

Top-level Markdown files in `posts/*.md` become blog posts. Special pages live in `posts/_pages`:

- `posts/_pages/About.md` renders at `/about`.
- `posts/_pages/Friends.md` renders at `/friends`.

Post frontmatter is parsed with `gray-matter`. Common fields include:

- `title`
- `date`
- `thumbnail`
- `categories`
- `tags`
- `redirect`
- `showComments`
- `showLicense`
- `showThumbnail`
- `autoSlug`
- `status`

`status` supports `published`, `unlisted`, `draft`, and `hidden`.

- `published` posts appear in lists, pages, RSS, LLM output, and sitemap.
- `unlisted` posts can render as pages but do not appear in lists or generated crawler files.
- `draft` posts are available outside production, or in production when `ALLOW_DRAFTS=true`.
- `hidden` posts are only available outside production when `ALLOW_HIDDEN=true`.

Redirect posts use `redirect` in frontmatter. The dynamic post page redirects before rendering article content.

## Configuration

`config.yml` is the source of truth for site identity, SEO defaults, social links, comments, icons, analytics, and content display settings. It is loaded by `src/services/config/configLoader.ts` and validated against `src/schemas/config.ts`.

When adding a new config key:

1. Update `config.yml` with comments and a safe default.
2. Update the Zod schema in `src/schemas/config.ts`.
3. Update consumers through the existing config service.
4. Update README or development docs if users need to know about the option.

## Generated Outputs

The dynamic post route generates supporting public files while collecting static params:

- `public/feed.xml`
- `public/llms.txt`
- `public/llms-full.txt`

These files are derived from published posts and site config. Keep generated output logic in `src/services/utils` and avoid duplicating post filtering rules.

## SEO and Metadata

Metadata is centralized in `src/lib/buildMetadata.ts`, with JSON-LD helpers in `src/lib/buildJsonLd.ts`. Routes should use those helpers instead of building metadata objects ad hoc.

`src/app/sitemap.ts`, `src/app/robots.ts`, and post metadata all rely on the same post visibility rules from `src/services/content/postVisibility.ts`. Changes to visibility behavior should update every dependent output consistently.

## Styling

Tailwind CSS v4 is configured through PostCSS and the global CSS files in `src/app/globals.css`, `src/styles/theme.css`, and `src/styles/utilities.css`. Reusable UI belongs in `src/components`; small one-off page composition can stay in the relevant route.

## Documentation Maintenance

Update this document when changing stable project boundaries such as source layout, content visibility, config ownership, generated outputs, deployment assumptions, or metadata behavior.
