# 架构说明

[English](./ARCHITECTURE.md) | [中文](./ARCHITECTURE_ZH.md)

SuzuBlog 是一个极简博客模板，基于 Next.js App Router、React、TypeScript、Tailwind CSS 和 Markdown 内容文件构建。它适合以静态友好的 Next.js 站点形式部署，并对 Vercel 部署提供一等支持。

## 运行模型

- Next.js App Router 负责 `src/app` 下的路由、元数据、站点地图、robots、manifest 和页面渲染。
- 博客内容存放在 `posts` 目录中的 Markdown 文件里。
- 站点级设置存放在 `config.yml`，使用前会通过 Zod 校验。
- 公共资源存放在 `public`；配置和文章引用的图片通常放在 `public/images`。
- RSS 和 LLM 文本文件会在文章静态参数生成阶段输出到 `public`。

这个项目不使用数据库、自定义 API 服务、认证系统，也不依赖服务端邮件或运行时绑定。

## 源码结构

```text
src/
  app/          Next.js App Router routes, metadata, sitemap, robots, manifest
  components/   Reusable UI grouped by domain and surface
  hooks/        Client hooks for search, URL state, and table of contents logic
  lib/          Shared metadata, JSON-LD, social data, and pure helpers
  schemas/      Zod schemas for config and content-adjacent data
  services/     Content loading, config loading, and generated output utilities
  styles/       Tailwind theme and utility CSS
  types/        Global project types
```

路由文件应专注于页面组合和框架集成。内容解析、配置加载、生成文件和可复用逻辑应保留在 `src/services` 或 `src/lib`，遵循当前分层。

## 内容模型

`posts/*.md` 中的顶层 Markdown 文件会成为博客文章。特殊页面放在 `posts/_pages`：

- `posts/_pages/About.md` 渲染到 `/about`。
- `posts/_pages/Friends.md` 渲染到 `/friends`。

文章 frontmatter 使用 `gray-matter` 解析。常见字段包括：

- `title`
- `date`
- `thumbnail`
- `categories`
- `tags`
- `redirect`
- `showComments`
- `showLicense`
- `showThumbnail`
- `autoSlug`
- `status`

`status` 支持 `published`、`unlisted`、`draft` 和 `hidden`。

- `published` 文章会出现在列表、页面、RSS、LLM 输出和站点地图中。
- `unlisted` 文章可以渲染页面，但不会出现在列表或生成给爬虫使用的文件中。
- `draft` 文章在非生产环境可用；生产环境需要设置 `ALLOW_DRAFTS=true`。
- `hidden` 文章只会在非生产环境且 `ALLOW_HIDDEN=true` 时可用。

重定向文章通过 frontmatter 中的 `redirect` 配置。动态文章页会在渲染正文前执行重定向。

## 配置

`config.yml` 是站点身份、SEO 默认值、社交链接、评论、图标、分析和内容展示设置的来源。它由 `src/services/config/configLoader.ts` 加载，并通过 `src/schemas/config.ts` 校验。

新增配置项时：

1. 在 `config.yml` 中加入说明和安全默认值。
2. 更新 `src/schemas/config.ts` 中的 Zod schema。
3. 通过现有 config service 更新使用方。
4. 如果用户需要了解这个选项，同步更新 README 或开发文档。

## 生成输出

动态文章路由在收集静态参数时会生成辅助公开文件：

- `public/feed.xml`
- `public/llms.txt`
- `public/llms-full.txt`

这些文件由已发布文章和站点配置生成。生成输出逻辑应保留在 `src/services/utils`，避免重复实现文章过滤规则。

## SEO 和元数据

元数据集中在 `src/lib/buildMetadata.ts`，JSON-LD 辅助函数位于 `src/lib/buildJsonLd.ts`。路由应复用这些 helper，而不是在各自文件里临时拼装 metadata。

`src/app/sitemap.ts`、`src/app/robots.ts` 和文章元数据都依赖 `src/services/content/postVisibility.ts` 中的同一套文章可见性规则。修改可见性行为时，应同步更新所有依赖输出。

## 样式

Tailwind CSS v4 通过 PostCSS 以及 `src/app/globals.css`、`src/styles/theme.css`、`src/styles/utilities.css` 中的全局 CSS 配置。可复用 UI 放在 `src/components`；小范围的一次性页面组合可以留在对应路由中。

## 文档维护

当源码布局、内容可见性、配置归属、生成输出、部署假设或元数据行为等稳定边界发生变化时，请更新本文档。
