---

description: "Task list for feature implementation"

---

# Tasks: モダンなレイアウト + テーマ切り替え

**Input**: Design documents from `/specs/001-modern-layout-theme/`

**Prerequisites**:
- [specs/001-modern-layout-theme/plan.md](./plan.md)
- [specs/001-modern-layout-theme/spec.md](./spec.md)
- Optional (available): [specs/001-modern-layout-theme/research.md](./research.md), [specs/001-modern-layout-theme/data-model.md](./data-model.md), [specs/001-modern-layout-theme/contracts/](./contracts/), [specs/001-modern-layout-theme/quickstart.md](./quickstart.md)

**Tests**: 憲章 II によりテストコードは作らない。代わりに各ストーリーで独立した手動検証タスクを含める。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- すべてのタスクに対象ファイルパスを含める

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 変更作業に入る前の準備と品質ゲートの確認

 - [X] T001 Install dependencies via `npm i` (see dependencies in package.json)
 - [X] T002 Verify baseline quality gates: run `npm run build` and `npm run lint` (scripts in package.json)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: すべてのストーリーで共通に求められる品質・アクセシビリティ要件を先に揃える

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Update external link rel to `noopener noreferrer` in src/components/Description.tsx
- [X] T004 [P] Update external link rel to `noopener noreferrer` in src/components/Credential.tsx
- [X] T005 [P] Update external link rel to `noopener noreferrer` in src/components/SocialLink.tsx
- [X] T006 [P] Update external link rel to `noopener noreferrer` in src/components/BlogLink.tsx
- [X] T007 Add stable React keys to credential mapping in src/components/CredentialLine.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin (US1/US2/US3)

---

## Phase 3: User Story 1 - 一目で資格/受賞が分かる (Priority: P1) 🎯 MVP

**Goal**: 既存コンテンツを増やさず、資格/受賞が「まとまり」として視認できるモダンなレイアウトに再配置する

**Independent Test**: 主要ブラウザでページを開き、既存情報のみで見やすく整理され、320pxでも崩れない（spec.md の P1 シナリオ）

### Implementation for User Story 1

 - [X] T008 [US1] Refactor page structure into semantic sections/wrappers without adding content in src/App.tsx
 - [X] T009 [P] [US1] Implement responsive layout (1-col → 2-col) and spacing rules in src/App.css
 - [X] T010 [P] [US1] Improve credentials wrapping/spacing (no overflow at 320px) in src/index.css
 - [X] T011 [US1] Ensure no horizontal scroll at >=320px (root/body/container sizing) in src/index.css
- [ ] T012 [US1] Run P1 manual verification checklist (include SC-004) in specs/001-modern-layout-theme/quickstart.md

**Checkpoint**: User Story 1 is functional and independently verifiable

---

## Phase 4: User Story 2 - テーマを切り替えて見やすくする (Priority: P2)

**Goal**: `system` / `light` / `dark` の選択でページ全体の見た目が一貫して切り替わる

**Independent Test**: 右上のアイコンボタンで `system` / `light` / `dark` を切り替えられ、背景・文字・リンク・主要UIがテーマに応じて変わる（spec.md の P2 シナリオ）

### Implementation for User Story 2

- [X] T013 [P] [US2] Add theme domain types + helpers (selection/effective theme) in src/theme.ts
- [X] T014 [P] [US2] Add Theme selector UI (top-right icon button; cycles system/light/dark; accessible name) in src/components/ThemeSelector.tsx
- [X] T015 [US2] Wire Theme selector into App layout and state in src/App.tsx
- [X] T016 [US2] Apply initial effective theme before React render to reduce FOUC in src/main.tsx
- [X] T017 [US2] Define theme CSS variables and `[data-theme]` rules (light/dark) in src/index.css
- [X] T018 [US2] Replace hard-coded colors with CSS variables (text/bg/links/buttons/icons) in src/index.css
- [ ] T019 [US2] Run P2 manual verification checklist in specs/001-modern-layout-theme/quickstart.md

**Checkpoint**: User Story 2 is functional and independently verifiable

---

## Phase 5: User Story 3 - 選んだテーマを維持し、操作はアクセシブル (Priority: P3)

**Goal**: 選択したテーマが再読み込みでも維持され、キーボード操作でも切り替えできる

**Independent Test**: テーマ選択→再読み込みで保持され、Tab でボタンにフォーカスし Enter/Space で切り替えできる（spec.md の P3 シナリオ）

### Implementation for User Story 3

- [X] T020 [US3] Load theme selection from localStorage safely; on missing/invalid/error fallback to `system` in src/theme.ts
- [X] T021 [US3] Persist theme selection to localStorage (`beachside.theme`) on change in src/App.tsx
- [X] T022 [US3] Handle `system` selection: listen for OS theme changes and re-apply effective theme in src/theme.ts
- [X] T023 [US3] Ensure ThemeSelector has an accessible name and remains keyboard-operable (button) in src/components/ThemeSelector.tsx
- [ ] T024 [US3] Run P3 manual verification checklist in specs/001-modern-layout-theme/quickstart.md

**Checkpoint**: User Story 3 is functional and independently verifiable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 全体品質の最終確認（憲章ゲート、パフォーマンス、ドキュメント整合）

- [ ] T025 [P] Update technical notes (storage key, data-theme approach, system listener) in specs/001-modern-layout-theme/research.md
- [X] T029 [P] Update Theme selector UX to top-right icon button and align docs (spec/plan/research/quickstart/data-model)
- [X] T026 Run final quality gates: `npm run build` and `npm run lint` (scripts in package.json)
- [X] T027 Review `npm run build` output for meaningful chunk size increases and record notes in specs/001-modern-layout-theme/plan.md
- [ ] T028 Run full manual verification checklist (P1/P2/P3 + edge cases) in specs/001-modern-layout-theme/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Depends only on Foundational (Phase 2)
- **US2 (P2)**: Depends only on Foundational (Phase 2)
- **US3 (P3)**: Depends on US2 concepts (theme selection/effective theme) but can be implemented as incremental enhancements after Foundational

Suggested completion order (MVP-first): **US1 → US2 → US3**

---

## Parallel Opportunities

- Setup: none (sequencing is fine)
- Foundational: T003–T006 can run in parallel (different files)
- US1: T009 and T010 can run in parallel (different files)
- US2: T013 and T014 can run in parallel (different files)
- Polish: T025 can run in parallel with other final checks (different files)

---

## Parallel Example: User Story 2

```bash
# Parallelizable tasks (different files):
Task: "T013 Add theme domain types + helpers in src/theme.ts"
Task: "T014 Add Theme selector UI in src/components/ThemeSelector.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1
4. Validate using specs/001-modern-layout-theme/quickstart.md

### Incremental Delivery

1. US1 (layout) → manual verify
2. US2 (theme switch) → manual verify
3. US3 (persistence + system follow + a11y polish) → manual verify
4. Final quality gates + build output review

---

## Notes

- [P] tasks = different files, no dependencies
- This repository does not require test code (constitution II); use explicit manual verification steps instead
