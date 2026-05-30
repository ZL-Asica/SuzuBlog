<!-- omit in toc -->

# 为 SuzuBlog 做贡献

[English](./CONTRIBUTING.md) | [中文](./CONTRIBUTING_ZH.md)

感谢你愿意贡献。SuzuBlog 是一个 Next.js + Markdown 博客模板，所以改动应尽量小、实用，并且便于站点维护者按需调整。

也请阅读 [行为准则](./CODE_OF_CONDUCT.md)。

## 目录

- [为 SuzuBlog 做贡献](#为-suzublog-做贡献)
  - [目录](#目录)
  - [我有问题](#我有问题)
  - [报告 Bug](#报告-bug)
  - [提出改进建议](#提出改进建议)
  - [本地开发](#本地开发)
  - [代码组织](#代码组织)
  - [内容和配置变更](#内容和配置变更)
  - [风格指南](#风格指南)
  - [校验](#校验)
  - [Pull Request 检查清单](#pull-request-检查清单)

## 我有问题

提问前，请先查看 [文档](https://suzu.zla.app)、已有 [issues](https://github.com/ZL-Asica/SuzuBlog/issues) 和 README。

打开 issue 时，请提供相关版本、操作系统、浏览器（如果相关），以及足够让维护者理解或复现问题的上下文。

## 报告 Bug

提交 bug 报告前：

- 确认你正在使用最新可用版本。
- 检查问题是否由本地配置、不支持的运行时版本或无效 Markdown/frontmatter 引起。
- 搜索已有 issue，避免重复提交。
- 将复现缩小到最小可行的内容、配置或代码示例。

好的 bug 报告应包含：

- 期望行为
- 实际行为
- 复现步骤
- 相关的 `config.yml` 值或文章 frontmatter
- 有用的终端输出或截图
- Node.js 和 pnpm 版本

不要在公开 issue 中报告安全敏感信息。敏感报告请发送到 <zl@zla.app>。

## 提出改进建议

改进建议通过 GitHub issues 跟踪。好的建议会说明：

- 当前行为
- 期望行为
- 为什么该变化适合一个极简博客模板
- 对现有用户是否有兼容性或迁移影响

只服务于某个私人站点的功能，可能更适合通过本地自定义实现，而不是加入模板。

## 本地开发

使用仓库声明的版本：

- Node.js >= 20.9.0，参考 `.node-version`
- pnpm，参考 `package.json`

安装依赖：

```bash
pnpm install
```

启动开发环境：

```bash
pnpm dev
```

打开 `http://localhost:3000/`。

内容编辑、生成文件和部署说明见 [DEVELOPMENT_ZH.md](./DEVELOPMENT_ZH.md)。

## 代码组织

遵循现有项目结构：

```text
src/app          Next.js App Router routes and metadata files
src/components   Reusable UI grouped by surface
src/hooks        Client hooks
src/lib          Shared metadata, JSON-LD, and pure helpers
src/schemas      Zod schemas
src/services     Config, content, and generated-output utilities
src/styles       Theme and utility CSS
src/types        Global project types
```

路由文件应专注于框架集成和页面组合。内容加载放在 `src/services/content`，配置加载放在 `src/services/config`，可复用的生成输出 helper 放在 `src/services/utils`。

只有存在明确复用路径时才移动代码。避免引入不必要的新文件夹、状态管理器、依赖或架构层。

## 内容和配置变更

文章放在 `posts/*.md`。特殊页面放在 `posts/_pages`。

编辑文章时：

- 使用现有 frontmatter 约定。
- 需要自定义摘要时使用 `<!--more-->`。
- 将公开图片放在 `public/images`，并使用 `/images/example.jpg` 这类根相对路径引用。
- 修改 `status` 前先确认可见性行为。

编辑 `config.yml` 时：

- 为公开博客模板保留安全默认值。
- 新增或修改字段时更新 `src/schemas/config.ts`。
- 当用户需要了解某个选项时，同步更新 README 或文档。

提交前请检查 `public/feed.xml`、`public/llms.txt`、`public/llms-full.txt` 这类生成文件。

## 风格指南

- 优先使用 TypeScript，并保持命名清晰、数据形状明确。
- 保留 `@/...` imports。
- 复用现有 metadata、JSON-LD、config 和 content helper。
- UI 保持可访问性：语义化 HTML、有用的 label、键盘友好交互和可见 focus 状态。
- 只为不明显的行为添加注释；避免重复解释代码本身。
- 不要在没有明确理由的情况下添加依赖。

Commit message 尽量简洁并遵循 conventional commit：

```text
docs(project): update development guide
fix(content): handle unlisted post metadata
feat(ui): add compact post search
```

## 校验

运行与改动最相关的检查：

```bash
pnpm lint:fix
```

代码、配置 schema、路由、内容加载或生成输出变更：

```bash
pnpm run build
```

当前没有配置测试脚本。如果某个改动引入需要自动化覆盖的行为，请讨论或一并添加聚焦的测试基础设施。

## Pull Request 检查清单

- 改动只有一个清晰目的。
- 保留项目结构和现有命名约定。
- 影响内容可见性、metadata、RSS、sitemap 或 LLM 输出时，相关行为已同步更新。
- `config.yml` 和 `src/schemas/config.ts` 保持一致。
- 设置、配置、架构或工作流变化时已更新文档。
- 已运行相关校验命令，或解释了跳过原因。
- UI 变更已在浏览器中检查，实际可行时也检查移动端布局。
