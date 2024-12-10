# SuzuBlog 🎐

[English](./README.md) | [中文](./README_ZH.md) | [日本語](./README_JA.md)

> **Suzu** - "鈴" in Japanese, meaning "bell" - is a minimalist blog template built with **Next.js** and pure **Markdown**.

[![GitHub License][license-badge]][license-link]
[![Node.js][node-badge]][node-link]
[![pnpm Version][pnpm-badge]][pnpm-link]
[![Next.js][nextjs-badge]][nextjs-link]
[![Tailwind CSS][tailwind-badge]][tailwind-link] |
[![Vercel][vercel-badge]][vercel-link]
[![Eslint][eslint-badge]][eslint-link]
[![Prettier][prettier-badge]][prettier-link]

- [**Documentation**](https://suzu.zla.app) 📚
  Learn how to start, configure and customize your Suzu Blog with detailed instructions.

## ✨ Features

- **Next.js**: A modern web framework supporting both server-side rendering (SSR) and static site generation (SSG).
- **Lightning Fast**: Ultra-high performance with a sleek and minimal design.
- **Markdown Support**: Simplify your writing experience with features like:
  - **Code Highlighting**: Includes language tags and one-click copy functionality.
  - **LaTeX**: Beautiful formula rendering.
  - **Optimized Images**: Efficient image loading powered by Next.js.
  - **Link Preloading**: Improves navigation speed and user experience.
- **SEO Optimized**: Automatically generates sitemap.xml, robots.txt, manifest.json, Open Graph, Twitter Cards, and more.
- **Multi-Language Support**: Built-in support for English, Chinese, Japanese, etc., automatically configured via `config.yml`.
- **Adaptive Light/Dark Themes**: Provides a seamless dark mode experience based on system preferences.
- **RSS Feed**: Automatically generated RSS feed for your blog.
- **Accessibility (A11Y) Enhanced**:
  - Semantic HTML and ARIA-compliant components.
  - Alt attributes for all images and icons.
  - WCAG-compliant color contrast for optimal readability.

## 🚀 Get Started

### 1. Use the Template

Click the `Use this template` button to create your own blog repository.

### 2. Configure Site Information

Edit `config.yml` to set your site name, description, author details, and more.

### 3. Write Your Posts

- Place Markdown posts in the `posts` folder, where the filename becomes the post URL.
- Edit files in the `posts/_pages` directory to update your "About" or "Friends" pages.

### 4. Deploy

- **Cloud Hosting (Recommended)**: Use [Vercel](https://vercel.com). Import your project, and it will be automatically deployed.
- **Local Deployment/Preview**: Install `Node.js`, then run:

  ```bash
  pnpm install
  pnpm dev
  ```

### 5. Keep Your Blog Updated

By default, GitHub Actions sync the latest updates from the Suzu Blog template to your repository weekly.  
Ignored directories during sync include `.github`, `public`, `posts`, and `config.yml`.

## 🏗️ Project Structure

```plaintext
.
├── config.yml                # Global configuration file
├── posts                     # Markdown posts directory
│   └── _pages                # Special pages (About/Friends)
├── public                    # Static assets directory
│   └── images                # Image resources
├── src                       # Project source code
│   ├── app                   # Next.js application directory
│   ├── components            # Reusable components
│   ├── services              # Logic for content parsing, configuration, etc.
│   └── types.d.ts            # Global type definitions
├── tailwind.config.ts        # Tailwind CSS configuration
├── package.json              # Project dependencies and scripts
└── pnpm-lock.yaml            # pnpm dependency lock file
```

## ❤️ About Suzu

After years of frustration with the maintenance, security risks, and performance issues of WordPress, I decided to create Suzu Blog using **Next.js**. It is simple, efficient, and highly customizable, designed for anyone looking to build a modern blog quickly.

## 🔗 Community Support

**Contribute**: Contributions are welcome! Please refer to the [Contribution Guide](https://github.com/ZL-Asica/SuzuBlog/blob/main/CONTRIBUTING.md).

<!-- Badges / Links -->

[eslint-badge]: https://img.shields.io/badge/eslint-4B32C3?logo=eslint&logoColor=white
[eslint-link]: https://www.npmjs.com/package/eslint-config-zl-asica
[license-badge]: https://img.shields.io/github/license/ZL-Asica/SuzuBlog
[license-link]: https://github.com/ZL-Asica/SuzuBlog/blob/main/LICENSE
[nextjs-badge]: https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white
[nextjs-link]: https://nextjs.org
[node-badge]: https://img.shields.io/badge/node%3E=18.18-339933?logo=node.js&logoColor=white
[node-link]: https://nodejs.org/
[pnpm-badge]: https://img.shields.io/github/package-json/packageManager/ZL-Asica/SuzuBlog?label=&logo=pnpm&logoColor=fff&color=F69220
[pnpm-link]: https://pnpm.io/
[prettier-badge]: https://img.shields.io/badge/Prettier-F7B93E?logo=Prettier&logoColor=white
[prettier-link]: https://www.npmjs.com/package/@zl-asica/prettier-config
[tailwind-badge]: https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white
[tailwind-link]: https://tailwindcss.com/
[vercel-badge]: https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white
[vercel-link]: https://vercel.com
