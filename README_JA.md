# SuzuBlog 🎐

[English](./README.md) | [中文](./README_ZH.md) | [日本語](./README_JA.md)

> **Suzu（鈴）** は日本語で「鈴（すず）」を意味し、心地よい響きを持つ名前です。SuzuBlog は **Next.js + Markdown** によるシンプルで美しいブログテンプレートです。

🚀 **[デモサイト](https://www.zla.pub)** | 📚 **[ドキュメント](https://suzu.zla.app)**

もしこのプロジェクトが気に入ったら、ぜひ ⭐ を付けてください！私と同じように楽しんでいただければ幸いです！

[![GitHub License][license-badge]][license-link] [![Latest Release][release-badge]][release-link]

[![Node.js][node-badge]][node-link] [![pnpm Version][pnpm-badge]][pnpm-link] | [![Next.js][nextjs-badge]][nextjs-link] [![Tailwind CSS][tailwind-badge]][tailwind-link] | [![Vercel][vercel-badge]][vercel-link] [![Eslint][eslint-badge]][eslint-link] [![Prettier][prettier-badge]][prettier-link]

## ✨ 特長

- **🚀 Next.js ベース** – ISR & SSG 対応で超高速パフォーマンスを実現。
- **📄 Markdown 完全対応** – コードハイライト（ワンクリックコピー）、LaTeX 数式、洗練されたデザイン、画像最適化。
- **🔍 SEO 最適化** – サイトマップ、Open Graph、Twitter Cards などを自動生成。
- **🌍 多言語対応** – `config.yml` で英語・中国語・日本語など簡単に設定可能。
- **📺 アニメリスト機能** – AniList API からアニメ情報を取得＆表示。
- **🌓 ダークモード** – システム設定に応じて自動でテーマを切り替え。
- **📢 RSS フィード** – 自動生成される RSS でブログの更新を簡単に配信。
- **♿ アクセシビリティ対応** – セマンティック HTML、ARIA サポート、WCAG 基準のカラーデザイン。
- **⚛️ LLM 対応** – `llms.txt` と `llms-full.txt` を自動生成し、ChatGPT や Claude などの LLM に対応。

## 🚀 はじめに

自分だけの Suzu Blog を立ち上げませんか？下のボタンをクリックするだけで、Vercel で簡単にデプロイできます：

[![Deploy with Vercel][vercel-button]][vercel-deploy-link]

セットアップ、カスタマイズ、Markdown の書き方、デプロイ手順については、以下のドキュメントをご覧ください：

📖 **[Suzu Blog ドキュメント](https://suzu.zla.app)**

## 📚 リポジトリドキュメント

- [Architecture](./ARCHITECTURE.md) | [中文](./ARCHITECTURE_ZH.md)
- [Development Guide](./DEVELOPMENT.md) | [中文](./DEVELOPMENT_ZH.md)
- [Contribution Guide](./CONTRIBUTING.md) | [中文](./CONTRIBUTING_ZH.md)

## 🏗️ プロジェクト構造

```plaintext
.
├── config.yml                # グローバル設定ファイル
├── posts                     # Markdown 記事ディレクトリ
│   └── _pages                # 固定ページ（About/Friends）
├── public                    # 静的リソースディレクトリ
│   └── images                # 画像リソース
├── src                       # プロジェクトソースコード
│   ├── app                   # Next.js App Router
│   ├── components            # 再利用可能なコンポーネント
│   ├── services              # コンテンツ解析、設定処理などのロジック
│   ├── schemas               # Zod Schemas
│   └── types                 # グローバル型定義
├── package.json              # プロジェクト依存関係とスクリプト
└── pnpm-lock.yaml            # pnpm 依存関係ロックファイル
```

## ❤️ Suzu について

長年にわたり、さまざまなブログフレームワークを試してきましたが、**保守の手間・セキュリティリスク・パフォーマンス問題** に悩まされてきました。そこで、私は **Next.js** を用いて **シンプル・高効率・カスタマイズ性抜群** の Suzu Blog を開発しました。モダンなブログを素早く構築したいすべての人のためのテンプレートです。

## 🔗 コミュニティサポート

**貢献**: 貢献を歓迎します！詳しくは [Contribution Guide](./CONTRIBUTING.md) を参照してください。

## 📜 ライセンス

本プロジェクトは [AGPL-3.0 ライセンス][license-link] の下でライセンスされています。詳細については [LICENSE](./LICENSE) ファイルをご覧ください。

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
