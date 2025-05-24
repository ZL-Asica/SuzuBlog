# SuzuBlog 🎐

[English](./README.md) | [中文](./README_ZH.md) | [日本語](./README_JA.md)

> **Suzu** (鈴) means "bell" in Japanese — a minimalist **Next.js + Markdown** blog template.

🚀 **[Live Demo](https://www.zla.pub)** | 📚 **[Documentation](https://suzu.zla.app)**

If you enjoy using it, please consider giving it a star! ⭐ I hope you find it as enjoyable as I do!

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
- **⚛️ LLM Support** – Auto-generated `llms.txt` and `llms-full.txt` files for LLMs like ChatGPT, Claude, and more.

## **🚀 Get Started**

Ready to launch your own Suzu Blog? Just click the button below to deploy instantly with Vercel:

[![Deploy with Vercel][vercel-button]][vercel-deploy-link]

Need help with setup, customization, or deployment? Check out the full documentation:

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
│   ├── app                   # Next.js App Router
│   ├── components            # Reusable components
│   ├── services              # Logic for content parsing, configuration, etc.
│   ├── schemas               # Zod schemas
│   └── types                 # Global type definitions
├── package.json              # Project dependencies and scripts
└── pnpm-lock.yaml            # pnpm dependency lock file
```

## ❤️ About Suzu

After years of frustration with the maintenance, security risks, and performance issues of other frameworks, I decided to create Suzu Blog using **Next.js**. It is simple, efficient, and highly customizable, designed for anyone looking to build a modern blog quickly.

## 🔗 Community Support

**Contribute**: Contributions are welcome! Please refer to the [Contribution Guide](./CONTRIBUTING.md).

## 📜 License

This project is licensed under the [AGPL-3.0 License][license-link]. See the [LICENSE](./LICENSE) file for details.

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
[vercel-button]: https://vercel.com/button
[vercel-deploy-link]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FZL-Asica%2FSuzuBlog&env=ENABLE_EXPERIMENTAL_COREPACK&envDescription=This%20is%20option%20to%20enable%20corepack%20by%20default%20to%20use%20pnpm.%20Set%20this%20to%201.&envLink=https%3A%2F%2Fvercel.com%2Fdocs%2Fbuilds%2Fconfigure-a-build%23corepack&project-name=suzu-blog&repository-name=SuzuBlog&redirect-url=https%3A%2F%2Fsuzu.zla.app%2F&demo-title=ZLA%20%E5%B0%8F%E7%AB%99%20(Demo)&demo-description=ZL%20Asica%2C%20the%20creator%20of%20SuzuBlog%2C%20personal%20Blog.&demo-url=https%3A%2F%2Fzla.pub%2F
[vercel-link]: https://vercel.com
