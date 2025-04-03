# SuzuBlog Changelog

## 1.6.2 (2025-04-03)

### Patch Changes

- Performance improvement

  - Make two main fonts "display:swap" and "preload:true" to improve performance.
  - Honor "motion-safe" for page fade-in animation for accessibility.
  - Set main page avatar "loading:eager" to make sure this image is loaded first.
  - Fix `<ul>` and `<li>` tags issues in mobile header menu.

## 1.6.1 (2025-04-02)

### Patch Changes

- Bump up deps and fix env compatibility error in Windows

  - Bump up dependencies.
  - Fix npm script "build". Remove NODE_NO_WARNINGS env variable from the script to avoid incompatibility issues on Windows.

## 1.6.0 (2025-03-16)

### Minor Changes

- Update color palette, styles updates, fix aria issues

  - Primary, secondary, accent color update. Corresponding utils added.
  - h5, h6 new styles added.
  - h3, h4 border sharpeness issue fixed.
  - em, ul, strong, del styles updated.
  - inline codeblock ml 0.5->1, p 1->0.5.
  - aria-hidden added for decoration DOM elements.

## 1.5.1 (2025-03-15)

### Patch Changes

- Fix anime page styling issue

  - Forget to update anime page.
  - Also update dark mode styling to improve contrast.

## 1.5.0 (2025-03-15)

### Minor Changes

- Theme cleanup and style refine

  - feat(makrdown): add style for checkbox related

  - 7daad73: style(global): styles clean up and re-structure

    - Move reusable styles into `styles` folder.
    - Fix custom scroll bar consistence.
    - Fix minor styling issue and contract issue.
    - Improve A11Y overall experience.
    - Remove img min-h limit in markdown. Remember to refine this in the future.
    - Remove Suspense for `CategoriesTagsList.tsx`. LoadingIndicator is non-used component now.

  - 2548e85: chore: clean up some code
  - 215b4eb: feat(darkTheme): theme setting only store for 7 days

## 1.4.3 (2025-03-12)

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
