# Feature Specification: モダンなレイアウト + テーマ切り替え

**Feature Branch**: `001-modern-layout-theme`  
**Created**: 2025-12-27  
**Status**: Draft  
**Input**: User description: "モダンなレイアウトと、テーマ切り替え(system, light, dark)を加える。プロフィールサイトとしてシンプルを保ち、既存内容以上の情報は増やさない。"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - 一目で資格/受賞が分かる (Priority: P1)

サイト訪問者として、ページを開いた瞬間に「プロフィールサイトであること」と
「資格やアワードの情報」を一目で把握したい。内容は増やさず、既存の情報を
モダンなレイアウトで見やすく配置したい。

**Why this priority**: このサイトの目的（実績を一目で分かるようにする）に直結するため。

**Independent Test**: 主要ブラウザでページを開き、既存の情報が見やすく整理され、
追加の情報（新しい文章/項目/セクション）が増えていないことを確認できる。

**Acceptance Scenarios**:

1. **Given** 初回訪問者がページを開いた状態, **When** 上から内容を読み進める, **Then**
  既存の資格/受賞/リンク情報が「まとまり」として見やすく整理され、情報量が増えていない
2. **Given** 画面幅 320px の端末で表示している, **When** ページを閲覧する, **Then**
  横スクロールが発生せず、主要要素（説明/資格画像/リンク）が崩れない

---

### User Story 2 - テーマを切り替えて見やすくする (Priority: P2)

サイト訪問者として、system/light/dark のテーマを切り替えて、環境や好みに合わせて
読みやすくしたい。

**Why this priority**: 視認性（コントラスト/眩しさ）を改善し、閲覧体験を安定させるため。

**Independent Test**: テーマを3種類すべて選択でき、背景・文字・リンク等が一貫して切り替わる
ことを確認できる。

**Acceptance Scenarios**:

1. **Given** ページ表示中, **When** テーマを light に切り替える, **Then** ページ全体の見た目が
  light テーマとして一貫して表示される
2. **Given** ページ表示中, **When** テーマを dark に切り替える, **Then** ページ全体の見た目が
  dark テーマとして一貫して表示される
3. **Given** ページ表示中, **When** テーマを system に切り替える, **Then** 端末/OS のテーマ設定に
  追従した表示になる

**UI Note**: テーマ切り替えUIはページ右上のアイコンボタンとし、クリックするたびに `system` → `light` → `dark` → `system` の順で切り替える。

---

### User Story 3 - 選んだテーマを維持し、操作はアクセシブル (Priority: P3)

サイト訪問者として、選んだテーマが再訪/再読み込みでも維持され、かつテーマ切り替えが
キーボードでも操作できる状態であってほしい。

**Why this priority**: 小さな機能でもUXの一貫性を高め、使い勝手の質を担保するため。

**Independent Test**: テーマを選択→再読み込み→同じテーマで表示され、キーボード操作で切り替え
できることを確認できる。

**Acceptance Scenarios**:

1. **Given** ユーザーが light を選択済み, **When** ページを再読み込みする, **Then** light のまま表示される
2. **Given** テーマ切り替えボタンにフォーカスできる状態, **When** キーボード操作でテーマを変更する,
   **Then** マウスなしでも切り替えが完了する

---


### Edge Cases

- テーマが system のときに、端末/OSのテーマが途中で変わった場合の表示
- テーマ設定を保存できない/読み出せない環境の場合のフォールバック（既定は system）
- どのテーマでもテキストやリンクが読めるコントラストを維持できているか

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST 既存のプロフィール情報（description、資格/受賞、ソーシャル、ブログリンク）を表示し、
  既存以上の「余計な情報（新しい文章/項目/セクション）」を増やさない
- **FR-002**: System MUST モダンなレイアウトに再配置し、資格/受賞が一目で分かる状態を改善する（内容は増やさない）
- **FR-003**: System MUST テーマ切り替え（system / light / dark）を提供する
- **FR-004**: System MUST 未設定の場合、テーマの既定値を system にする
- **FR-005**: Users MUST be able to メインページ上でテーマを切り替えられる
- **FR-006**: System MUST 選択したテーマをページ全体に一貫して適用する（背景、文字、リンク、主要UI）
- **FR-007**: System MUST ユーザーのテーマ選択を保持し、再読み込み/再訪時にも同じ選択を適用する
- **FR-008**: System MUST テーマ切り替えUIがキーボード操作可能で、アクセシブルなラベル/説明を持つ
- **FR-008a**: System MUST テーマ切り替えUIとしてページ右上のボタン（わかりやすいアイコン表示）を使用し、`system` / `light` / `dark` の3状態を切り替えられる
- **FR-009**: System MUST 画面幅 320px 以上で横スクロールを発生させない
- **FR-010**: System MUST レイアウト変更により、資格/受賞の視認性が低下しない（過度な余白や分断を避ける）

### Key Entities *(include if feature involves data)*

- **ThemePreference**: ユーザーが選択したテーマ（system / light / dark）。再訪時の表示に使われる
- **PageSection**: ページ内の表示単位（例: Description、Credentials/Awards、Links）。配置の一貫性に使われる

### Assumptions

- この機能は「既存コンテンツの見せ方改善」と「テーマ切り替え」に限定し、新しい情報（新規セクション/新規説明文）は追加しない
- テーマ未設定時の既定値は system とする
- テーマ選択の保持は同一ブラウザ/同一端末での再訪を対象とする

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 画面幅 320px の表示で横スクロールが発生しない（主要ブラウザで確認）
- **SC-002**: ユーザーが 10 秒以内にテーマ（system/light/dark）を目的の状態に切り替えられる
- **SC-003**: テーマ選択がページ再読み込み後も維持される（少なくとも3回の再読み込みで再現しない）
- **SC-004**: 画面サイズ 1366×768 相当で、初期表示（ファーストビュー）に資格/受賞の要素が視認でき、
  "一目でわかる" という目的を阻害しない
