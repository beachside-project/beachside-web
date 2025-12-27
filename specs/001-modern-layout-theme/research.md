# Phase 0 Research: モダンなレイアウト + テーマ切り替え

このドキュメントは、[spec.md](./spec.md) の要件を実装へ落とし込むための技術的な意思決定をまとめます。

## Decision 1: テーマの保存先は `localStorage`

- Decision: `localStorage` にユーザーの選択（`system` / `light` / `dark`）を保存する
- Rationale:
  - 1ページ静的サイトであり、サーバー/アカウント/DB を追加しない方針に合う
  - 再読み込み・再訪で保持（FR-007）を満たすために最小
- Alternatives considered:
  - Cookie: 送信不要であり用途過剰
  - URL クエリ: 共有には便利だが要件外、UI増加や状態管理が複雑

想定キー:
- `beachside.theme`（値: `system` | `light` | `dark`）

## Decision 2: テーマ適用は `data-theme` + CSS Variables

- Decision: `document.documentElement`（`<html>`）に `data-theme="light" | "dark"` を付与し、CSS variables で配色を切り替える
- Rationale:
  - 既存 CSS がハードコード色を多用しているため、変数化が最小の移行パス
  - React 側のレンダリングに依存せず全体へ一貫適用（FR-006）できる
  - 追加の runtime dependency が不要（憲章 IV）
- Alternatives considered:
  - `className`（`theme-dark` 等）: どちらでもよいが attribute の方が値の列挙が明確
  - テーマライブラリ導入: 依存追加と bundle 増のリスクが高い

CSS 方針:
- `:root` に共通トークン（`--bg`, `--fg`, `--muted`, `--link`, `--card-bg`, etc.）
- `[data-theme="light"]` / `[data-theme="dark"]` で値差分を定義
- `color-scheme` もテーマに合わせて明示（フォーム部品の見た目安定）

## Decision 3: `system` は「選択値」と「適用値」を分離

- Decision:
  - 保存・UI表示する選択値は `system | light | dark`
  - 実際に CSS に適用する `data-theme` は `light | dark`（effective theme）
- Rationale:
  - `system` のとき OS 変更に追従（Edge case）しやすい
  - CSS 側の分岐を `light/dark` に限定して単純化
- Alternatives considered:
  - `data-theme="system"` を残し CSS の `@media (prefers-color-scheme)` で分岐: 可能だが、アプリ側の整合（FR-006）や UI 表示との一貫性が取りづらい

## Decision 4: フラッシュ（FOUC）回避のため React 起動前に適用

- Decision: `src/main.tsx` の `createRoot(...).render(...)` より前に、保存済み選択を読み `data-theme` を先にセットする
- Rationale:
  - ページ表示直後のチラつきを減らし、体感品質を上げる
- Alternatives considered:
  - `useEffect` で適用: 初回描画後になり、テーマ反映が遅れる

## Decision 5: レイアウト改善は「構造は最小」「情報追加はゼロ」

- Decision:
  - 新規の説明文/項目/セクションを追加しない（FR-001）
  - 既存コンポーネントの並び替え・コンテナ追加・CSS による grid/flex 最適化で視認性を改善（FR-002, FR-010）
- Rationale:
  - 既存は全体センタリング + 単純縦並びで、資格/受賞の“まとまり”が弱い
  - コンテンツを増やさずに、グルーピングと余白/幅制御で改善できる
- Alternatives considered:
  - 見出し追加（"Awards" など）: 情報追加に該当する可能性が高く、要件に反する

推奨レイアウト案（実装時に最小で調整）:
- 320px〜: 1カラム（Description → Credentials → Links → Blog → Theme selector か、Theme selector を最上部に小さく配置）
- 768px〜: 2カラム（左: Description + Links、右: Credentials）

## Decision 6: アクセシビリティと外部リンクの `rel`

- Decision:
  - テーマ切替 UI は右上のボタン（アイコン表示）で提供し、クリックで `system` / `light` / `dark` を切り替える（FR-008a）
  - ボタンはアクセシブルな名前（例: `aria-label`）を持ち、キーボード操作可能にする（FR-008）
  - 外部リンクは `rel="noopener noreferrer"` を使用（憲章 III）
- Rationale:
  - キーボード操作・スクリーンリーダー双方で安定
- Alternatives considered:
  - `select`: 明示的な選択肢提示はできるが、今回の仕様（右上ボタン + アイコン）と合わない
  - カスタムトグル/モーダル: UI が増え、要件外になりやすい
