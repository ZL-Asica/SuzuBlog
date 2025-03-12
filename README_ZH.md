# SuzuBlog 🎐

[English](./README.md) | [中文](./README_ZH.md) | [日本語](./README_JA.md)

> **Suzu** - 日语中的鈴 “铃铛” - 是一个基于 **Next.js** 和纯 **Markdown** 的极简博客模板。

[![GitHub License][license-badge]][license-link]
[![Node.js][node-badge]][node-link]
[![Latest Release][release-badge]][release-link]
[![pnpm Version][pnpm-badge]][pnpm-link] |
[![Next.js][nextjs-badge]][nextjs-link]
[![Tailwind CSS][tailwind-badge]][tailwind-link] |
[![Vercel][vercel-badge]][vercel-link]
[![Eslint][eslint-badge]][eslint-link]
[![Prettier][prettier-badge]][prettier-link]

- [**文档**](https://suzu.zla.app) 📚
  学习如何使用详细说明开始、配置和自定义 Suzu Blog。

## ✨ 特性

- **Next.js**：现代 Web 框架，支持服务端渲染（SSR）和静态站点生成（SSG）。
- **极速**：超高性能，简洁高效的体验。
- **Markdown 支持**：便捷撰写文章，提供以下特性：
  - **代码高亮**：支持语言标注与一键复制。
  - **LaTeX**：公式渲染。
  - **图片优化**：通过 Next.js 高效加载。
  - **链接预加载**：提升用户体验。
- **SEO 优化**：自动生成 sitemap.xml、robots.txt、manifest.json、Open Graph、Twitter Card 等。
- **多语言支持**：内置中文、英文、日语等，根据 `config.yml` 中的语言配置自动切换。
- **动漫列表功能**：从 AniList API 获取并展示动漫信息。
- **自适应亮暗色主题**：支持深色模式，用户体验更优。
- **RSS 订阅**：自动生成博客 RSS 订阅。
- **无障碍（A11Y）优化**：提供语义化的 HTML 和符合 ARIA 标准的组件。
  - 提供语义化的 HTML 和符合 ARIA 标准的组件。
  - 图片和图标添加 alt 属性。
  - 符合 WCAG 对比度要求的颜色搭配。

## 🚀 快速上手

### 1. 使用模板

点击 `Use this template` 按钮，创建你的博客仓库。

### 2. 配置站点信息

在 `config.yml` 中设置你的站点名称、描述、作者信息等。

### 3. 撰写文章

- 将 Markdown 格式的文章放入 `posts` 文件夹，文件名即为文章的 URL。
- 修改 `posts/_pages` 目录下的文件以更新“关于”页面或“友情链接”。

### 4. 部署

- **云端托管（推荐）**：推荐使用 [Vercel](https://vercel.com)。导入项目后，自动完成部署。
- **本地部署/预览**：需要安装 `Node.js`，运行以下命令：

  ```bash
  pnpm install
  pnpm dev
  ```

### 5. 自动同步

默认通过 GitHub Actions，每周自动同步模板的最新更新到你的仓库。

同步时忽略的目录：`.github`、`public`、`posts`、`config.yml`。

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

## ❤️ 关于

受够了 WordPress 的维护成本、安全隐患、性能问题后，我决定用 **Next.js** 打造这个博客模板。它简洁、高效、可定制，适合任何想快速搭建现代化博客的人。

## 🔗 社区支持

**贡献**：欢迎提出问题或贡献代码！请访问 [贡献指南](https://github.com/ZL-Asica/SuzuBlog/blob/main/CONTRIBUTING.md)。

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
[release-badge]: https://img.shields.io/github/v/release/ZL-Asica/SuzuBlog?display_name=release&label=SuzuBlog&color=fc8da3
[release-link]: https://github.com/ZL-Asica/SuzuBlog/releases
[tailwind-badge]: https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white
[tailwind-link]: https://tailwindcss.com/
[vercel-badge]: https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white
[vercel-link]: https://vercel.com
