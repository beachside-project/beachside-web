# beachside.dev 憲章 (Constitution)

## コア原則 (Core Principles)


### ドキュメントの言語

- ドキュメントは日本語で作成します。
- ただし、読み手はベテランで英語がわかるエンジニアなので、英単語のままの方がわかりやすい場合は英単語のままにします。

### I. コード品質ゲート (Code Quality Gate)
すべての変更は、プロジェクトの品質ゲートを MUST で満たさなければなりません。

- `npm run build` MUST pass.
- `npm run lint` MUST pass with zero warnings.
- TypeScript error を MUST NOT で増やしてはいけません。
- やむを得ず一時的にゲートを回避する場合、PR は理由と是正計画/期日を MUST で記載します。

Rationale: 小規模サイトでは build と lint が主要な信頼性保証です。

### II. テスト標準 (Testing Standards)

このプロジェクトは小規模な1ページのランディングページのため、テストコードは不要です。

### III. UX 一貫性 & アクセシビリティ (UX Consistency & Accessibility)
User experience は MUST で一貫性とアクセシビリティを保ちます。

- 新しい UI は、明示的に redesign が要求されていない限り、既存のパターン (layout / typography /
	spacing) を MUST で再利用します。
- Interactive elements は semantic elements を MUST で使い、keyboard-operable を維持します。
- 画像は意味のある `alt` text を MUST で付けます (装飾目的なら、その旨を明示)。
- 新しいタブで開く external link は `rel="noopener noreferrer"` を MUST で付与します。

Rationale: 一貫性は信頼につながり、アクセシビリティは最低限の品質要件です。

### IV. パフォーマンス予算 (Performance Budgets)
Performance regression は MUST で避け、不可避な場合は MUST で根拠を示します。

- 新しい runtime dependency は MUST で正当化します。
- 大きすぎる asset は MUST で避け、最適化画像・適切な寸法を優先します。
- production build で意味のある JS bundle size 増加が見られる場合、PR は原因と mitigation を MUST
	で記録します。
	- デフォルト閾値: `npm run build` 出力が示す、任意の単一 JS chunk の +100KB

Rationale: プロフィールサイトはデフォルトで速いべきです。

### V. 保守しやすい構造 (Maintainable Structure)
コードベース構造は MUST でシンプルかつ一貫性を保ちます。

- Components belong in `src/components/`; shared types belong in `src/types/`.
- UI や type の重複は避け、パターンが繰り返される場合は shared component へ refactor します。
- 変更は small / localized / reviewable を保ち、明確な必要がない large refactor は避けます。

Rationale: 保守性は、一貫性と小さな変更面から得られます。

## 品質 & パフォーマンス要件 (Quality & Performance Requirements)

- Target stack: Vite + React + TypeScript.
- Quality gates: `npm run build` と `npm run lint` は、すべての変更で MUST pass.
- パフォーマンス影響は、production build output と asset review で MUST 評価します。

## 開発フロー & レビュー (Development Workflow & Review)

- PRs MUST:
	- user-visible change を記述する
	- verification steps を列挙する
	- dependency 追加と performance 影響を明示する
- Reviewer は Core Principles への準拠を MUST で確認します。

## Governance

- この憲章は、衝突がある場合にローカル慣習より優先します。
- 改定 (amendment) は MUST で:
	- このファイルと Sync Impact Report を更新する
	- rationale と impact summary を含める
	- semantic versioning に従う:
		- MAJOR: ガバナンス上の互換性破壊、原則の削除、または再定義
		- MINOR: 新しい原則/セクションの追加、または指針の実質的な拡張
		- PATCH: 意味を変えない範囲の明確化/文言修正
- レビューでは次のコンプライアンス確認が REQUIRED です: quality gates, test/verification,
	UX consistency, performance impacts.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2025-12-27
