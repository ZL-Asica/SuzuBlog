# 开发指南

[English](./DEVELOPMENT.md) | [中文](./DEVELOPMENT_ZH.md)

本指南覆盖 SuzuBlog 的本地设置、内容编辑、校验和部署。

## 前置要求

- Node.js >= 20.9.0，优先匹配 `.node-version`
- pnpm，匹配 `package.json` 中的 `packageManager`

安装依赖：

```bash
pnpm install
```

## 本地开发

启动应用：

```bash
pnpm dev
```

打开：

```text
http://localhost:3000/
```

构建生产版本：

```bash
pnpm run build
```

启动已构建的生产应用：

```bash
pnpm start
```

## 可用脚本

- `pnpm dev`：启动 Next.js 开发服务器。
- `pnpm run build`：先运行 `pnpm run lint:fix`，再运行 `next build`。
- `pnpm start`：在构建后启动生产 Next.js 服务。
- `pnpm lint`：运行 ESLint。
- `pnpm lint:fix`：运行 ESLint 并应用自动修复。

当前没有配置测试脚本。文档相关变更优先使用 `pnpm lint` 或 `pnpm run build` 校验；如果未来的改动引入需要测试覆盖的行为，应添加聚焦的测试。

## 配置

编辑 `config.yml` 管理站点级设置：

- 标题、副标题、描述、关键词、语言和站点 URL
- 作者资料和头像/背景图
- 分页和内容许可证默认值
- 社交链接和 RSS 可见性
- Twikoo 或 Disqus 评论集成
- 自定义 head 脚本和 footer HTML

配置会在运行时通过 Zod 校验。如果添加新的配置字段，需要同时更新 `config.yml` 和 `src/schemas/config.ts`。

## 内容编辑

在 `posts` 中创建 Markdown 文章：

```text
posts/my-post.md
```

特殊页面放在 `posts/_pages`：

```text
posts/_pages/About.md
posts/_pages/Friends.md
```

典型文章 frontmatter：

```yaml
---
title: My Post
date: '2026-05-29 09:00:00'
thumbnail: /images/background.jpg
categories:
  - Notes
tags:
  - Next.js
  - Markdown
---
```

使用 `<!--more-->` 控制文章列表中的摘要。没有该标记时，摘要会从文章开头内容自动生成。

## 文章可见性

文章可见性由可选的 `status` frontmatter 字段控制：

- `published`：显示在列表、生成页面、站点地图、RSS 和 LLM 文件中。
- `unlisted`：页面可以渲染，但会从列表和生成给爬虫使用的输出中排除。
- `draft`：非生产环境可用；生产环境需要 `ALLOW_DRAFTS=true`。
- `hidden`：仅在非生产环境且 `ALLOW_HIDDEN=true` 时可用。

如果省略 `status`，文章会被视为 `published`。

## 资源

静态资源放在 `public` 下。文章和配置使用的图片通常放在 `public/images`，并从站点根路径引用：

```md
![Alt text](/images/example.jpg)
```

`next/image` 允许 `/images/**` 下的本地图片和远程 HTTPS 图片。

## 生成文件

构建过程可能重新生成：

- `public/feed.xml`
- `public/llms.txt`
- `public/llms-full.txt`

这些文件来自已发布文章和 `config.yml`。提交前请检查生成文件 diff。

## 校验

仅文档变更：

```bash
pnpm lint
```

代码、配置 schema、内容管线或路由变更：

```bash
pnpm run build
```

需要 ESLint 和 formatter 自动应用安全修复时，使用 `pnpm lint:fix`。Git pre-commit hook 会运行 `npx nano-staged`；pre-push hook 会运行 `pnpm run build`。

## 部署

该模板为 Vercel 设计，也可以运行在任何支持标准 Next.js 应用的平台。

部署前确认：

- `config.yml` 中的 `siteUrl` 是不带末尾斜杠的公开 origin。
- 公共图片、图标、RSS 设置和评论设置正确。
- 已运行 `pnpm run build`。
- 如果 `public/feed.xml`、`public/llms.txt`、`public/llms-full.txt` 发生变化，已检查对应 diff。
