# SuzuBlog 🎐

[English](./README.md) | [中文](./README_ZH.md) | [日本語](./README_JA.md)

> **Suzu** - 日本語の「鈴（すず）」を意味し、**Next.js** と純粋な **Markdown** を基盤としたミニマリストブログテンプレートです。

[![GitHub License][license-badge]][license-link]
[![Node.js][node-badge]][node-link]
[![pnpm Version][pnpm-badge]][pnpm-link]
[![Next.js][nextjs-badge]][nextjs-link]
[![Tailwind CSS][tailwind-badge]][tailwind-link] |
[![Vercel][vercel-badge]][vercel-link]
[![Eslint][eslint-badge]][eslint-link]
[![Prettier][prettier-badge]][prettier-link]

- [**ドキュメント**](https://suzu.zla.app) 📚
  Suzu Blog の開始、設定、カスタマイズ方法を詳細に説明。

## ✨ 特徴

- **Next.js**: モダンな Web フレームワークで、サーバーサイドレンダリング（SSR）と静的サイト生成（SSG）をサポート。
- **超高速**: 洗練されたデザインで、高パフォーマンスを実現。
- **Markdown 対応**: 記事作成がシンプルで、以下の機能を提供：
  - **コードハイライト**: 言語タグやワンクリックコピー機能をサポート。
  - **LaTeX**: 美しい数式レンダリング。
  - **画像最適化**: Next.js による効率的な画像読み込み。
  - **リンク事前読み込み**: スムーズなナビゲーションを実現。
- **SEO 最適化**: sitemap.xml、robots.txt、manifest.json、Open Graph、Twitter Cards などを自動生成。
- **多言語サポート**: 英語、中国語、日本語などに対応。`config.yml` の設定に基づいて自動切替。
- **ライト/ダークテーマ対応**: システム設定に基づき、自動的にダークモードを適用。
- **RSS フィード**: ブログ用の RSS フィードを自動生成。
- **アクセシビリティ（A11Y）対応**:
  - セマンティック HTML や ARIA 準拠のコンポーネントを提供。
  - すべての画像とアイコンに alt 属性を追加。
  - WCAG 基準に準拠した色彩コントラストで可読性を向上。

## 🚀 はじめに

### 1. テンプレートを使用

`Use this template` ボタンをクリックして、独自のブログリポジトリを作成。

### 2. サイト情報を設定

`config.yml` を編集し、サイト名、説明、著者情報などを設定。

### 3. 記事を書く

- Markdown 形式の記事を `posts` フォルダに配置します。ファイル名が URL になります。
- `posts/_pages` ディレクトリ内のファイルを編集して、「About」や「Friends」ページを更新。

### 4. デプロイ

- **クラウドホスティング（推奨）**: [Vercel](https://vercel.com) を使用します。プロジェクトをインポートするだけで自動デプロイが完了。
- **ローカルデプロイ/プレビュー**: `Node.js` をインストールして、以下のコマンドを実行：

  ```bash
  pnpm install
  pnpm dev
  ```

### 5. テンプレート更新を同期

デフォルトで GitHub Actions を使用して、Suzu Blog テンプレートの最新更新を毎週自動でリポジトリに同期。
同期時に `.github`、`public`、`posts`、`config.yml` は無視されます。

## 🏗️ プロジェクト構造

```plaintext
.
├── config.yml                # グローバル設定ファイル
├── posts                     # Markdown 記事ディレクトリ
│   └── _pages                # 固定ページ（About/Friends）
├── public                    # 静的リソースディレクトリ
│   └── images                # 画像リソース
├── src                       # プロジェクトソースコード
│   ├── app                   # Next.js ページディレクトリ
│   ├── components            # 再利用可能なコンポーネント
│   ├── services              # コンテンツ解析、設定処理などのロジック
│   └── types.d.ts            # グローバル型定義
├── tailwind.config.ts        # Tailwind CSS 設定
├── package.json              # プロジェクト依存関係とスクリプト
└── pnpm-lock.yaml            # pnpm 依存関係ロックファイル
```

## ❤️ Suzu について

WordPress のメンテナンスコスト、安全性、性能問題に悩まされてきた結果、**Next.js** を使用して Suzu Blog を作成しました。このテンプレートはシンプルで効率的、かつカスタマイズ性が高く、現代的なブログを迅速に構築したい人に最適です。

## 🔗 コミュニティサポート

**貢献**: 貢献を歓迎します！詳しくは [Contribution Guide](https://github.com/ZL-Asica/SuzuBlog/blob/main/CONTRIBUTING.md) を参照してください。

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
[tailwind-badge]: https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white
[tailwind-link]: https://tailwindcss.com/
[vercel-badge]: https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white
[vercel-link]: https://vercel.com
