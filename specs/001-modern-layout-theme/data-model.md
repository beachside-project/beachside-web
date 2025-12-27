# Phase 1 Data Model: モダンなレイアウト + テーマ切り替え

この機能はサーバーサイドの永続化を持たないため、主に「クライアント側の状態」と「永続キー」のモデルを定義します。

## Entity: ThemePreference

目的: ユーザーのテーマ選択を保持し、ページ全体へ一貫適用する（FR-003, FR-006, FR-007）。

### Fields

- `selection`: `'system' | 'light' | 'dark'`
  - 保存値（ユーザーが選んだ値）
- `effectiveTheme`: `'light' | 'dark'`
  - 実際にページへ適用するテーマ
  - `selection === 'system'` のとき `matchMedia('(prefers-color-scheme: dark)')` から導出
- `storageKey`: `'beachside.theme'`

### Validation rules

- `selection` が不正値の場合は `system` として扱う（FR-004 の既定）
- `localStorage` が利用できない場合も `system` へフォールバック

### State transitions

- 初期化:
  1. `localStorage[storageKey]` を読み込み → `selection` を決定
  2. `selection` から `effectiveTheme` を計算
  3. `document.documentElement.dataset.theme = effectiveTheme` を適用
- 変更:
  - ユーザーがボタンをクリック → `selection` 更新 → `effectiveTheme` 再計算 → DOM へ適用 → `localStorage` 保存
- OS テーマ変更:
  - `selection === 'system'` のときのみ `effectiveTheme` を再計算して再適用

## Entity: PageSection（UI構造）

目的: 既存コンテンツを増やさず、見やすい配置に整理する（FR-001, FR-002, FR-010）。

このプロジェクトでは DB 上の entity ではなく、UI コンポーネント構造（セクション単位）の概念として扱います。

- `Description`
- `Credentials/Awards`（既存の `CredentialLine` 群）
- `Social links`
- `Blog link`
- `Theme selector`（追加 UI）

制約:
- 新規テキストやセクション見出しを追加しない
- 既存要素の順序/レイアウト/余白/幅制御のみに留める
