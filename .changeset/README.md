# Changesets

This folder is used to manage versioning and changelogs for Suzu Blog.

## 🦋 What is Changesets?

Changesets is a tool that helps version and publish packages in single-package or monorepo setups.

For Suzu Blog, we use Changesets to:

- Track and document changes for each release.
- Automatically update the version number in `package.json`.
- Generate a `CHANGELOG.md` with structured release notes.

## How to Use

### 1. Adding a changeset

Run:

```sh
pnpm changeset
```

Select the type of change (`patch`, `minor`, `major`), write a summary, and a new changeset file will be created.

### 2. Versioning

To apply all pending changes and update the version:

```sh
pnpm changeset version
```

## More Information

For more details, check [Changesets documentation](https://github.com/changesets/changesets).
