# Suzu

> Suzu - 日语中的 鈴🎐 - 一个基于 Next.js 和纯 Markdown 的博客模板。

[![Build by Vercel][github-build-badge]][github-build-link]
[![GitHub License][license-badge]][license-link]
[![Node js][node-badge]][node-link]
[![pnpm Version][pnpm-badge]][pnpm-link] |
[![Next.js][nextjs-badge]][nextjs-link]
[![Vercel][vercel-badge]][vercel-link]
[![Eslint][eslint-badge]][eslint-link]
[![Prettier][prettier-badge]][prettier-link]

## ✨ 项目简介

完全就是我受够了之前用了好多年的 Wordpress 博客站点的速度、性能消耗、维护成本、安全性等等多个方面的考虑，就打算自己写这个了，顺便就做成模板的形式方便大家去使用。

```plaintext
.
├── config.yml                # 全局配置文件（站点信息、作者信息等）
├── posts                     # Markdown 格式的文章目录
├── public                    # 静态资源目录（favicon, robots.txt, 等）
├── src                       # 项目源代码
│   ├── app                     # Next.js 应用目录（按页面组织）
│   ├── components              # 复用组件目录
│   │   ├── common              # 通用组件
│   │   └── posts               # 文章页面组件
│   ├── services                # 服务目录，包含数据获取和解析逻辑
│   │   ├── config              # 配置加载
│   │   ├── content             # 内容处理和文章获取
│   │   ├── parsing             # 内容解析和标签处理
│   │   └── utils               # 实用工具
│   ├── styles                  # 全局和组件样式
│   └── types.d.ts              # 全局类型定义
├── postcss.config.mjs        # PostCSS 配置文件
├── tailwind.config.ts        # Tailwind CSS 配置文件
├── next.config.ts            # Next.js 配置文件
├── package.json              # 项目依赖和脚本
└── pnpm-lock.yaml            # pnpm 依赖锁定文件
```

## 🚀 快速开始

1. 克隆项目并安装依赖：

   ```bash
   git clone https://github.com/ZL-Asica/SuzuBlog.git
   cd SuzuBlog
   pnpm install
   ```

2. 配置自定义变量：

   - 在 `config.yml` 中配置个性化站点信息。

3. 撰写你的博客文章：

   - 文章：可以使用 Markdown 格式放置于根目录下的 `posts` 文件夹内
   - 关于/友情链接：直接更改 `posts/_pages` 路径内对应的文件内容即可。

4. 部署：

   - 可以部署在自己的服务器中，需要有 `nodejs` 环境。
   - 也可以直接使用 `Vercel` 进行托管。经测试在中国大陆访问速度良好。

<!-- Badge Links -->

[github-build-badge]: https://img.shields.io/github/deployments/ZL-Asica/SuzuBlog/Production?logo=github&label=Build
[license-badge]: https://img.shields.io/github/license/ZL-Asica/SuzuBlog
[node-badge]: https://img.shields.io/badge/node%3E=18.18-339933?logo=node.js&logoColor=white
[pnpm-badge]: https://img.shields.io/github/package-json/packageManager/ZL-Asica/SuzuBlog?label=&logo=pnpm&logoColor=fff&color=F69220
[nextjs-badge]: https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white
[vercel-badge]: https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white
[eslint-badge]: https://img.shields.io/badge/eslint-4B32C3?logo=eslint&logoColor=white
[prettier-badge]: https://img.shields.io/badge/Prettier-F7B93E?logo=Prettier&logoColor=white

<!-- Badge URL Links -->

[github-build-link]: https://github.com/ZL-Asica/SuzuBlog/deployments
[license-link]: https://github.com/ZL-Asica/eslint-config/blob/main/LICENSE
[node-link]: https://nodejs.org/
[pnpm-link]: https://pnpm.io/
[nextjs-link]: https://nextjs.org
[vercel-link]: https://vercel.com/
[eslint-link]: https://www.npmjs.com/package/eslint-config-zl-asica
[prettier-link]: https://www.npmjs.com/package/@zl-asica/prettier-config
