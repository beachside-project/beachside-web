# Quickstart: 001-modern-layout-theme

対象: [spec.md](./spec.md)

## Prerequisites

- Node.js / npm

## Setup

- `npm i`

## Run (dev)

- `npm run dev`

## Build / Lint (quality gates)

- `npm run build`
- `npm run lint`

## Manual verification checklist

### P1: 一目で資格/受賞が分かる

- ページを開いて、既存の情報（Description、資格/受賞、ソーシャル、ブログリンク）が整理されている
- 新しい文章/項目/セクションが増えていない
- 画面幅 320px で横スクロールが発生しない
- 1366×768 相当で初期表示（ファーストビュー）に資格/受賞の要素が視認できる（SC-004）

### P2: テーマ切り替え

- 右上のアイコンボタンで `system` / `light` / `dark` を切り替えられる（クリックごとに循環）
- 選択に応じて背景・文字・リンク・主要 UI が一貫して切り替わる

### P3: 保持 + アクセシブル

- テーマ選択後にページを再読み込みしても選択が維持される
- テーマ切り替えボタンに Tab でフォーカスでき、Enter/Space で切り替えできる

### Edge cases

- `system` 選択中に OS のテーマを変更しても追従する
- `localStorage` が使えない場合も `system` で破綻しない
- `system` / `light` / `dark` のどれでも本文・リンク・主要UIのコントラストが十分で読める

## Notes

- このリポジトリは小規模 LP のためテストコードは不要（憲章 II）。代わりに上記手順で検証する。
