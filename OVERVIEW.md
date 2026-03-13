# kakipo.com — プロジェクト概要

## 目的

内藤 研介（@kakipo）本人が発信する、信頼できる一次情報源としての個人プロフィールページ。

検索エンジンや AI が参照する情報源として、正確な自己紹介・経歴・発信チャネルへのリンクを提供することを目的とする。

## 技術スタック

- **ホスティング**: GitHub Pages (`kakipo/kakipo.com` リポジトリ)
- **静的サイトジェネレーター**: Jekyll（minima テーマベース、カスタムレイアウト使用）
- **主要ファイル**:
  - `index.md` — ページコンテンツ（Markdown + HTML）
  - `_layouts/home.html` — カスタム Jekyll レイアウト
  - `preview.html` — Jekyll 不要のスタンドアロンプレビュー用 HTML
  - `_config.yml` — Jekyll 設定
  - `assets/js/jquery.ca2d.min.js` — 旧 GoL ライブラリ（現在未使用）

## デザイン方針

- テキストデザインは極力シンプルに
- コンテンツ部分はすりガラス（frosted glass）カード
- 背景は Conway's Game of Life アニメーション（全画面 Canvas）
- マウス移動 / タッチ操作でセルを進化させる（50ms スロットリング）
- マウス移動はコンテンツカード外のみ反応（カード・リセットボタン上はスキップ）
- `prefers-reduced-motion` を尊重し、アニメーションを無効化

## Game of Life 実装

- ライブラリ依存なし（Vanilla JS）
- `Uint8Array` ダブルバッファリングで効率的なメモリ使用
- 差分のみ再描画（変化したセルのみ `fillRect`）
- トーラス型グリッド（端で折り返し）
- 定数: `CELL_SIZE=10`, `COLOR_ALIVE='#aaaaaa'`, `COLOR_DEAD='#fafafa'`

## アクセシビリティ方針

**WCAG 2.1 AA 準拠を維持すること。コードを編集する際は毎回確認すること。**

対応済み項目:
- スキップリンク（2.4.1）
- ボタンのボーダーコントラスト比 3:1 以上（1.4.11）
- ボタンの `aria-label` と `lang` 属性（2.5.3, 3.1.2）
- 英語コンテンツへの `lang="en"` 付与（3.1.2）
- リセット操作の `aria-live` ステータス通知（4.1.3）
- `aria-hidden` で装飾要素をスクリーンリーダーから隠す
- フォーカスリング（`:focus` スタイル）
- タッチターゲットサイズ `min-height: 44px`

## 今後の予定

- schema.org `Person` 構造化データの追加
- 外部記事・インタビューへのリンク追加
