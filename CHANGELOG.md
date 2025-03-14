# SuzuBlog Changelog

## 1.4.3

### Patch Changes

- Fix pnpm lock file error

## 1.4.2 (2025-03-12)

### Patch Changes

- 005a095: Add Changeset for version managing

  - Bump up Next.js version to 15.2.2, which solved Twikoo support issue (crypto-js TypeError).
  - Add version badge in README.md.
  - Add more different grammar and syntax for Markdown inside sample-post.md.
  - Remove support in Browserlist for op_mini all, which is not necessary.

## 1.4.1 (2025-03-09)

- ac9d6b1: Lock Next.js verson to 15.2.0 due to Twikoo support issue

- 8d395f3: Update CI resealse workflow.

## 1.4.0 (2025-03-08)

- fbf97ab: Notes showing issue on hover and mobile in `about/anime` page

  - Addressing anime page issue with notes on hover (desktop) and on click (mobile) (#141).
  - Extract `AnimeCard` and `Notes` components from `AnimeList` (#140).
  - Handle hover logic differently for desktop.
  - Add onClick() event to show notes on mobile.

- 0c9c327: add new markdown parsing logic

  - markdown content parsing logic and improves styles (#139).
  - Fixed issues #137 and #138.

## 1.3.0 (2025-03-01)

- e5f644a: Set anime images to unoptimized

  - Set anime images to unoptimized to prevent Next.js from optimizing them.

- b9a030f: Fix anime header issue #135

- 815a211: add anime tracking page (#134)

  - This PR introduces the **Anime List** feature #133 , integrating AniList API to fetch and display my personal anime tracking data under `/about/anime`. It also includes a new API endpoint (`GET /api/anime`) to handle data retrieval. The header menu now highlights the current page dynamically, improving navigation clarity. Additionally, I refactored the scroll progress bar into its own component (`ScrollPositionBar.tsx`) for better maintainability. Fixed an issue where the scroll bar was hidden behind headers. The overall UI/UX could use some refinement, especially for submenu interactions and hover effects on different devices. Also, styling details need to be revisited to better align with the rest of the site.
