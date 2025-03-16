# SuzuBlog 🎐

[English](./README.md) | [中文](./README_ZH.md) | [日本語](./README_JA.md)

> **Suzu**（日语中的 “铃”）代表着清脆的铃声，SuzuBlog 是一款基于 **Next.js + Markdown** 的极简博客模板，轻量、美观、快速。

🚀 **[在线演示](https://www.zla.pub)** | 📚 **[使用文档](https://suzu.zla.app)**

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

## 🚀 快速上手

Suzu Blog 的安装、配置、Markdown 语法、部署等详细教程，请参考：

📖 **[Suzu Blog 官方文档](https://suzu.zla.app)**

## 🏗️ 项目结构

```plaintext
.
├── config.yml                # 全局配置文件
├── posts                     # Markdown 文章目录
│   └── _pages                # 独立页面（关于/友情链接）
├── public                    # 静态资源目录
│   └── images                # 图片资源
├── src                       # 项目源代码
│   ├── app                   # Next.js 页面目录
│   ├── components            # 复用组件
│   ├── services              # 服务逻辑（内容解析、配置加载等）
│   └── types.d.ts            # 全局类型定义
├── tailwind.config.ts        # Tailwind CSS 配置
├── package.json              # 项目依赖与脚本
└── pnpm-lock.yaml            # pnpm 依赖锁定
```

## ❤️ 关于 Suzu

在多年使用各种博客框架的过程中，我深受 **维护成本高、安全隐患多、性能不稳定** 等问题的困扰。最终，我决定基于 **Next.js** 打造 Suzu Blog —— 一个 **简洁、高效、可高度自定义** 的博客模板，帮助任何人快速搭建现代化博客。

## 🔗 社区支持

**贡献**：欢迎提出问题或贡献代码！请访问 [贡献指南](https://github.com/ZL-Asica/SuzuBlog/blob/main/CONTRIBUTING.md)。

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
