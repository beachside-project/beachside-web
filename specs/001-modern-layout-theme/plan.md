# Implementation Plan: モダンなレイアウト + テーマ切り替え

**Branch**: `001-modern-layout-theme` | **Date**: 2025-12-27 | **Spec**: [specs/001-modern-layout-theme/spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-modern-layout-theme/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.github/prompts/speckit.plan.prompt.md` for the execution workflow.

## Summary

- 既存コンテンツを増やさず（FR-001）、モダンなレイアウトへ再配置して「資格/受賞が一目で分かる」状態を改善する（FR-002, FR-010）。
- テーマ切り替え（`system` / `light` / `dark`）を右上のアイコンボタンで提供し（FR-003, FR-008a）、選択を `localStorage` に保持する（FR-007）。
- 実装は追加 runtime dependency なしで、`data-theme` + CSS variables によりページ全体へ一貫適用する（FR-006）。

詳細な技術判断は [specs/001-modern-layout-theme/research.md](./research.md) を参照。

## Technical Context

**Language/Version**: TypeScript 5.7.3  
**Primary Dependencies**: React 18.3.x, Vite 6.x, ESLint 8.x, react-icons 5.x, @fortawesome/react-fontawesome 0.2.x  
**Storage**: `localStorage`（ThemePreference のみ）  
**Testing**: テストコードは不要（憲章 II）。代わりに `quickstart.md` の手動検証で担保  
**Target Platform**: モダンブラウザ（Vite による静的配信）
**Project Type**: Web application（frontend only / Vite + React）  
**Performance Goals**: 1ページのプロフィールサイトとして初期表示の軽量さを維持（依存追加・JS chunk 増加を抑制）  
**Constraints**:
- 画面幅 320px 以上で横スクロールを発生させない（FR-009）
- 新しい runtime dependency は原則追加しない（憲章 IV）
- 既存情報を増やさない（FR-001）
**Scale/Scope**: 単一ページ（App）のレイアウト調整 + テーマ切替 UI 追加

## Build Output Notes

- 2025-12-27 `npm run build`:
  - `dist/assets/index-*.js` 155.53 kB (gzip 50.60 kB)
  - `dist/assets/index-*.css` 2.89 kB (gzip 1.13 kB)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

憲章（.specify/memory/constitution.md）に基づくゲート。

Minimum gates for this repository typically include:

- Code quality: `npm run build` + `npm run lint`
- Testing/verification: テストは作らない代わりに、手動検証手順を明記（憲章 II）
- UX consistency & accessibility:
  - テーマ切替 UI は右上のボタンで keyboard-operable（FR-008, FR-008a）
  - 外部リンクは `rel="noopener noreferrer"` を満たす（憲章 III）
- Performance:
  - 追加 runtime dependency はなし（または追加する場合は正当化）
  - `npm run build` 出力で JS chunk の増加を確認（憲章 IV）

GATE 評価（設計時点）:
- `npm run build` / `npm run lint`: 実装後に必ず実行
- テスト: 不要（憲章 II）
- UX/A11y: ボタンで切り替えでき、アクセシブルな名前（aria-label等）を持つ。リンク `rel` は実装時に整合させる
- Performance: 依存追加なしの方針で設計

## Project Structure

### Documentation (this feature)

```text
specs/001-modern-layout-theme/
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── themePreference.schema.json
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── assets/
├── components/
│   ├── BlogLink.tsx
│   ├── Credential.tsx
│   ├── CredentialLine.tsx
│   ├── Description.tsx
│   └── SocialLink.tsx
├── types/
│   └── CredentialItem.tsx
├── App.tsx
├── App.css
├── index.css
├── main.tsx
└── vite-env.d.ts

public/
index.html
vite.config.ts
package.json
```

**Structure Decision**: 既存の Vite + React SPA 構造を維持し、変更は `src/` 配下の UI と CSS に閉じる（憲章 V）。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

この機能では、憲章の violation を必要とする設計要素は想定しない（依存追加なし、構造変更は最小）。
