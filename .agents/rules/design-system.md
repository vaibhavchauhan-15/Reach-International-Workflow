# Rule: Reach International Design System Adherence
trigger: always_on

## Overview
All code generation, UI component modifications, styling changes, and data updates must strictly comply with `design.md` located at the project root.

## Non-Negotiables for Consistency
1. **Clean Plain White Theme**: Keep `--bg-white: #ffffff` and `--stage-bg: #f8fafc`. High text contrast (`--text-primary: #0f172a`, `--text-secondary: #475569`, `--text-muted: #64748b`). Never introduce dark mode or rogue gradients.
2. **Padding & Spacing Grid**: Follow the 4px/8px scale (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`) and the component padding matrix defined in `design.md`.
3. **Button Hierarchy**: Use only `.btn-primary` (cyan-teal gradient), `.btn-outline` (white + light border), `.btn-success` (emerald), `.btn-icon` / `.open-large-btn`, and `.month-pill-btn`. Ensure min 44×44px mobile touch targets.
4. **5-Color Ribbon Cycle**: `Navy (#0f2537) -> Amber (#f59e0b) -> Teal (#0b84a5) -> Cyan (#00a8cc) -> Emerald (#10b981)`.
5. **Dual-Viewport Architecture**:
   - **Workflows Deck**: 16:9 stage frame & horizontal snap flowchart on Desktop; full-height `100dvh` vertical timeline layout on Mobile.
   - **Meeting Summaries**: Date-wise clean cards with blue top border. Detail document with 4 structured sections (Breakdowns 2-col, Parts table, Directives 2-col, Action items multi-col) on Desktop; single-column stacked layout on Mobile.
6. **Copy Summary Utility**: Always maintain ASCII formatting in `meetingUtils.js` when editing meeting fields.
7. **Touch & Performance**: Maintain 44px touch targets, keyboard hotkeys, and smooth GPU transforms.
