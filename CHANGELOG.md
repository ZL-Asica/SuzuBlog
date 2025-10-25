# SuzuBlog Changelog

## 1.11.5 (2025-10-25)

### Patch Changes

- Upgrade Next.js to 16.0.0
  - Update `.node-version` to `22.21.0`
  - Update `pnpm` to `10.19.0`
  - Update Next.js to `16.0.0` (see: [https://nextjs.org/blog/next-16](https://nextjs.org/blog/next-16))
  - Update `@next/eslint-plugin-next` to `16.0.0`
  - Remove `eslint` configuration from `next.config.ts` as it's no longer needed nor supported in Next.js 16

## 1.11.4 (2025-10-18)

### Patch Changes

- Bump up dependencies

## 1.11.3 (2025-09-23)

### Patch Changes

- Small bugs fixed and bump up dependencies
  - Fix fuzzy search for CJK characters #193
  - Bump up dependencies

## 1.11.2 (2025-08-02)

### Patch Changes

- Fix social media link render unexpected
  - Social media links render even when user not set the username #190.

## 1.11.1 (2025-08-01)

### Patch Changes

- Minor bug fix and deps bump up

## 1.11.0 (2025-06-15)

### Minor Changes

- Enhances SEO and replaces the syntax highlighter with Shiki
  - Switched from `react-syntax-highlighter` to `shiki` and added custom CSS and copy functionality
  - Consolidated metadata and JSON-LD generation using `buildMetadata` and `build*JsonLd` helpers
  - Removed unused configs, updated dependencies, and refined project/editor settings

## 1.10.0 (2025-06-15)

### Minor Changes

- Update anime page function and TOC performance and style
  - Update anime page settings and some factors may caused by the new introduced config setting.
  - Move list rendering into server side to improve performance (the part contains map and sort).
  - Change `Notes` to dynamic import to save needs.
  - Update `TOC` detection logic use ref to replace state to reduce re-rendering and improve performance.
  - Fix `TOC` click the link may be hidden by the header issue.
  - Improve `TOC` auto centering function.

## 1.9.3 (2025-05-23)

### Patch Changes

- Improve config settings and validation
  - Refactor config settings from watch the file to Singleton pattern.
  - Add zod validation for config settings. Add error handling and clear error message for the user.
  - Add zod schema for Friend Links to validate the data.
  - Extract Head part code as a single component.
  - Move the icons/links as a setting option in the config settings.

## 1.9.2 (2025-05-20)

### Patch Changes

- Remove useless deps, bump up deps

## 1.9.1 (2025-05-09)

### Patch Changes

- Minor bug fix, CI update, and add citation

## 1.9.0 (2025-04-23)

### Minor Changes

- Add auto-generation for llms.txt & llms-full.txt
  - Add auto-generation for `llms.txt` and `llms-full.txt` files at build time.
    - Followed the guidelines on [llmstxt.org](https://llmstxt.org/) to generate the files.
    - This allows real time MCP, RAG, or LLM model doing web searching by itself could better understand the context of the whole website.
    - `llms.txt` contains basic information for the whole website include some links.
    - `llms-full.txt` contains all the content of the website, include full posts contents, about, friends.
  - Fix `robots.txt` to allow search engines to crawl some files in `_next` folder.
    - This will fix crawlers are not able to render the website properly (since no css and js files are loaded).

## 1.8.2 (2025-04-21)

### Patch Changes

- Fix sitemap for in site image links

## 1.8.1 (2025-04-20)

### Patch Changes

- Fix dynamicParams in post slug page

## 1.8.0

### Minor Changes

- Add responsive pagination UI
  - Move Pagination component to a separate file for better organization.
  - Added ARIA support for pagination.
  - Update i18n for pagination.
  - Different pagination styles for mobile and desktop.
  - Now able to handle whatever number of pages.

## 1.7.1 (2025-04-12)

### Patch Changes

- Switch to useRouter for pagination and search
  - feat(search): use useRouter from Next.js instead of history API
    - Introduce `useUpdateURL` hook to manage URL updates.
    - Replace `history.` with `useRouter` for better integration with Next.js.
    - With `useRouter`, fix the scroll behavior when current page changes.
    - Add sanitize query logic to prevent XSS attacks (before only from URL, now also from input).
    - Extract `SearchInput` component from `PostPageClient` to `src/app/posts/page.tsx` for better organization and performance (categories and tags array also generated without re-rendering).

  - chore: some updates on minor details
    - Finally remove `tailwind.config.ts` from README (since from v4.0.0 it has been removed)
    - Update manifest theme color.
    - Fix thumbnail showing when parameter `showThumbnail` is set to `false`.
    - Replace some a tags with NextLink.

  - style(search): extract select in search out
    - Color adjusted a little bit. Now the color is different in light and dark mode.
    - Added a new component Select to be used in the search input.

## 1.7.0 (2025-04-11)

### Minor Changes

- improve search function
  - Search function is now implemented with MiniSearch instead of manually filtering the posts.
  - Add full-text search support.
  - Add fuzzy search support.
  - Set different weight for title, categories, tags, and content.
  - Handle page changing while searching.

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
