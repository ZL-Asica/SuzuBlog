<!-- omit in toc -->

# Contributing to SuzuBlog

[English](./CONTRIBUTING.md) | [中文](./CONTRIBUTING_ZH.md)

Thanks for taking the time to contribute. SuzuBlog is a Next.js + Markdown blog template, so changes should stay small, practical, and easy for site owners to adapt.

Please also read the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Table of Contents

- [Contributing to SuzuBlog](#contributing-to-suzublog)
  - [Table of Contents](#table-of-contents)
  - [I Have a Question](#i-have-a-question)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Local Development](#local-development)
  - [Code Organization](#code-organization)
  - [Content and Config Changes](#content-and-config-changes)
  - [Style Guide](#style-guide)
  - [Validation](#validation)
  - [Pull Request Checklist](#pull-request-checklist)

## I Have a Question

Before opening a question, check the [documentation](https://suzu.zla.app), existing [issues](https://github.com/ZL-Asica/SuzuBlog/issues), and the README.

When opening an issue, include the relevant versions, operating system, browser if applicable, and enough context for maintainers to reproduce or understand the problem.

## Reporting Bugs

Before submitting a bug report:

- Make sure you are using the latest available version.
- Check whether the issue is caused by local config, unsupported runtime versions, or invalid Markdown/frontmatter.
- Search existing issues to avoid duplicates.
- Reduce the reproduction to the smallest possible content, config, or code example.

Good bug reports include:

- expected behavior
- actual behavior
- reproduction steps
- relevant `config.yml` values or post frontmatter
- terminal output or screenshots when useful
- Node.js and pnpm versions

Do not report security-sensitive information publicly. Send sensitive reports to <zl@zla.app>.

## Suggesting Enhancements

Enhancements are tracked through GitHub issues. A good suggestion explains:

- the current behavior
- the proposed behavior
- why the change fits a minimalist blog template
- any compatibility or migration impact for existing users

Features that only serve one private site may be better handled through local customization rather than added to the template.

## Local Development

Use the versions declared by the repository:

- Node.js >= 20.9.0 from `.node-version`
- pnpm from `package.json`

Install dependencies:

```bash
pnpm install
```

Start development:

```bash
pnpm dev
```

Open `http://localhost:3000/`.

See [DEVELOPMENT.md](./DEVELOPMENT.md) for content editing, generated files, and deployment notes.

## Code Organization

Follow the existing project structure:

```text
src/app          Next.js App Router routes and metadata files
src/components   Reusable UI grouped by surface
src/hooks        Client hooks
src/lib          Shared metadata, JSON-LD, and pure helpers
src/schemas      Zod schemas
src/services     Config, content, and generated-output utilities
src/styles       Theme and utility CSS
src/types        Global project types
```

Keep route files focused on framework integration and page composition. Put content loading in `src/services/content`, config loading in `src/services/config`, and reusable generated-output helpers in `src/services/utils`.

Move code only when there is a clear existing reuse path. Avoid new folders, state managers, dependencies, or architectural layers unless the change needs them.

## Content and Config Changes

Posts live in `posts/*.md`. Special pages live in `posts/_pages`.

When editing posts:

- Use existing frontmatter conventions.
- Use `<!--more-->` when you need a custom excerpt.
- Put public images under `public/images` and reference them with root-relative paths such as `/images/example.jpg`.
- Review visibility behavior before changing `status`.

When editing `config.yml`:

- Keep defaults safe for a public blog template.
- Update `src/schemas/config.ts` for new or changed fields.
- Update README or docs when users need to know about the option.

Generated files such as `public/feed.xml`, `public/llms.txt`, and `public/llms-full.txt` should be reviewed before commit.

## Style Guide

- Prefer TypeScript with clear names and explicit data shapes.
- Preserve `@/...` imports.
- Use existing metadata, JSON-LD, config, and content helpers.
- Keep UI accessible with semantic HTML, useful labels, keyboard-friendly interactions, and visible focus states.
- Keep comments for non-obvious behavior; avoid comments that restate the code.
- Do not add dependencies without a clear reason.

Commit messages should be concise and conventional when possible:

```text
docs(project): update development guide
fix(content): handle unlisted post metadata
feat(ui): add compact post search
```

## Validation

Run the most relevant checks for your change:

```bash
pnpm lint:fix
```

For code, config schema, routing, content loading, or generated-output changes:

```bash
pnpm run build
```

There is no test script configured right now. If a change introduces behavior that needs automated coverage, discuss or add focused test infrastructure as part of that work.

## Pull Request Checklist

- The change has one clear purpose.
- Project structure and existing naming conventions are preserved.
- Content visibility, metadata, RSS, sitemap, and LLM output behavior are updated consistently when affected.
- `config.yml` and `src/schemas/config.ts` stay in sync.
- Documentation is updated when setup, config, architecture, or workflow changes.
- Relevant validation commands were run, or skipped checks are explained.
- UI changes were checked in the browser, including mobile layout when practical.
