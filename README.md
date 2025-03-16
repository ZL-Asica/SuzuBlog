# SuzuBlog 🎐

[English](./README.md) | [中文](./README_ZH.md) | [日本語](./README_JA.md)

> **Suzu** (鈴) means "bell" in Japanese — a minimalist **Next.js + Markdown** blog template.

🚀 **[Live Demo](https://www.zla.pub)** | 📚 **[Documentation](https://suzu.zla.app)**

[![GitHub License][license-badge]][license-link] [![Latest Release][release-badge]][release-link]

[![Node.js][node-badge]][node-link] [![pnpm Version][pnpm-badge]][pnpm-link] | [![Next.js][nextjs-badge]][nextjs-link] [![Tailwind CSS][tailwind-badge]][tailwind-link] | [![Vercel][vercel-badge]][vercel-link] [![Eslint][eslint-badge]][eslint-link] [![Prettier][prettier-badge]][prettier-link]

## ✨ Features

- **🚀 Next.js Powered** – Supports ISR & SSG for lightning-fast performance.
- **📄 Markdown Support** – Code highlighting with copy button, LaTeX rendering, optimized images, and elegant styling.
- **🔍 SEO Ready** – Auto-generates sitemap, Open Graph, Twitter Cards, and more.
- **🌍 Multi-Language** – Supports English, Chinese, Japanese, and more via `config.yml`.
- **📺 Anime List** – Fetch & display anime info from AniList API.
- **🌓 Dark Mode** – Adapts to system preferences seamlessly.
- **📢 RSS Feed** – Auto-generated RSS for easy content distribution.
- **♿ Accessibility First** – Semantic HTML, ARIA support, WCAG-compliant colors.

## **🚀 Get Started**

For setup, configuration, Markdown syntax, and deployment guides, follow the documentation:

📖 **[Suzu Blog Docs](https://suzu.zla.app)**

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

After years of frustration with the maintenance, security risks, and performance issues of other frameworks, I decided to create Suzu Blog using **Next.js**. It is simple, efficient, and highly customizable, designed for anyone looking to build a modern blog quickly.

## 🔗 Community Support

**Contribute**: Contributions are welcome! Please refer to the [Contribution Guide](./CONTRIBUTING.md).

<!-- Badges / Links -->

[eslint-badge]: https://img.shields.io/badge/eslint-4B32C3?logo=eslint&logoColor=white
[eslint-link]: https://www.npmjs.com/package/eslint-config-zl-asica
[license-badge]: https://img.shields.io/github/license/ZL-Asica/SuzuBlog
[license-link]: ./LICENSE
[nextjs-badge]: https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white
[nextjs-link]: https://nextjs.org
[node-badge]: https://img.shields.io/badge/node%3E=18.18-339933?logo=node.js&logoColor=white
[node-link]: https://nodejs.org/
[pnpm-badge]: https://img.shields.io/github/package-json/packageManager/ZL-Asica/SuzuBlog?label=&logo=pnpm&logoColor=fff&color=F69220
[pnpm-link]: https://pnpm.io/
[prettier-badge]: https://img.shields.io/badge/Prettier-F7B93E?logo=Prettier&logoColor=white
[prettier-link]: https://www.npmjs.com/package/@zl-asica/prettier-config
[release-badge]: https://img.shields.io/github/v/release/ZL-Asica/SuzuBlog?display_name=release&label=SuzuBlog&color=fc8da3
[release-link]: https://github.com/ZL-Asica/SuzuBlog/releases/
[tailwind-badge]: https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white
[tailwind-link]: https://tailwindcss.com/
[vercel-badge]: https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white
[vercel-link]: https://vercel.com
