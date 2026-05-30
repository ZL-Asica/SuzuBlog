# SuzuBlog 🎐

[English](./README.md) | [中文](./README_ZH.md) | [日本語](./README_JA.md)

> **Suzu**（日语中的 “铃”）代表着清脆的铃声，SuzuBlog 是一款基于 **Next.js + Markdown** 的极简博客模板，轻量、美观、快速。

🚀 **[在线演示](https://www.zla.pub)** | 📚 **[使用文档](https://suzu.zla.app)**

如果你喜欢这个项目，请考虑给它一个 ⭐！我希望你能和我一样享受使用它的乐趣！拜托了这对我真的很重要！

[![GitHub License][license-badge]][license-link] [![Latest Release][release-badge]][release-link]

[![Node.js][node-badge]][node-link] [![pnpm Version][pnpm-badge]][pnpm-link] | [![Next.js][nextjs-badge]][nextjs-link] [![Tailwind CSS][tailwind-badge]][tailwind-link] | [![Vercel][vercel-badge]][vercel-link] [![Eslint][eslint-badge]][eslint-link] [![Prettier][prettier-badge]][prettier-link]

## ✨ 主要特性

- **🚀 基于 Next.js** – 支持 ISR & SSG，提供极速加载体验。
- **📄 强大 Markdown 支持** – 代码高亮（带一键复制）、LaTeX 数学公式、美观排版、优化图片加载。
- **🔍 SEO 友好** – 自动生成站点地图、Open Graph、Twitter Cards 等。
- **🌍 多语言支持** – 通过 `config.yml` 轻松配置中、英、日等多种语言。
- **📺 动漫列表功能** – 从 AniList API 获取并展示动漫信息。
- **🌓 深色模式** – 自动适配系统主题，无缝切换。
- **📢 RSS 订阅** – 自动生成 RSS，方便订阅和分发内容。
- **♿ 无障碍优化** – 语义化 HTML、ARIA 支持、符合 WCAG 规范的色彩设计。
- **⚛️ LLM 支持** – 自动生成 `llms.txt` 和 `llms-full.txt` 文件，兼容 ChatGPT、Claude 等 LLM。

## 🚀 快速上手

想要搭建你自己的 Suzu Blog？只需点击下方按钮，即可通过 Vercel 一键部署：

[![Deploy with Vercel][vercel-button]][vercel-deploy-link]

需要了解如何配置、撰写 Markdown 或部署网站？请查阅完整文档：

📖 **[Suzu Blog 官方文档](https://suzu.zla.app)**

## 📚 仓库文档

- [架构说明](./ARCHITECTURE_ZH.md) | [English](./ARCHITECTURE.md)
- [开发指南](./DEVELOPMENT_ZH.md) | [English](./DEVELOPMENT.md)
- [贡献指南](./CONTRIBUTING_ZH.md) | [English](./CONTRIBUTING.md)

## 🏗️ 项目结构

```plaintext
.
├── config.yml                # 全局配置文件
├── posts                     # Markdown 文章目录
│   └── _pages                # 独立页面（关于/友情链接）
├── public                    # 静态资源目录
│   └── images                # 图片资源
├── src                       # 项目源代码
│   ├── app                   # Next.js App Router
│   ├── components            # 复用组件
│   ├── services              # 服务逻辑（内容解析、配置加载等）
│   ├── schemas               # Zod Schemas
│   └── types                 # 全局类型定义
├── package.json              # 项目依赖与脚本
└── pnpm-lock.yaml            # pnpm 依赖锁定
```

## ❤️ 关于 Suzu

在多年使用各种博客框架的过程中，我深受 **维护成本高、安全隐患多、性能不稳定** 等问题的困扰。最终，我决定基于 **Next.js** 打造 Suzu Blog —— 一个 **简洁、高效、可高度自定义** 的博客模板，帮助任何人快速搭建现代化博客。

## 🔗 社区支持

**贡献**：欢迎提出问题或贡献代码！请访问 [贡献指南](https://github.com/ZL-Asica/SuzuBlog/blob/main/CONTRIBUTING.md)。

## 📜 许可证

本项目遵循 [AGPL-3.0 许可证][license-link]。有关详细信息，请参阅 [LICENSE](./LICENSE) 文件。

<!-- Badges / Links -->

[eslint-badge]: https://img.shields.io/badge/eslint-4B32C3?logo=eslint&logoColor=white
[eslint-link]: https://www.npmjs.com/package/eslint-config-zl-asica
[license-badge]: https://img.shields.io/github/license/ZL-Asica/SuzuBlog
[license-link]: ./LICENSE
[nextjs-badge]: https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white
[nextjs-link]: https://nextjs.org
[node-badge]: https://img.shields.io/badge/node%3E=20.9.0-339933?logo=node.js&logoColor=white
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
