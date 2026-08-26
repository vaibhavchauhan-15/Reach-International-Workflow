# AI AGENT RULES: REACH INTERNATIONAL DESIGN SYSTEM ENFORCEMENT

All AI agents working within this workspace MUST strictly follow the design specifications, visual guidelines, padding scales, button hierarchies, component structures, and responsive rules defined in [`design.md`](file:///c:/Users/vaibh/PROGRAMMING/PROJECTS/Reach%20International%20Workflow/design.md).

---

## 1. Core Mandates & Universal Web App Consistency

1. **Strict Adherence to `design.md`**:
   - Before adding or modifying any UI component, CSS styles, presentation slides, or meeting summaries, consult [`design.md`](file:///c:/Users/vaibh/PROGRAMMING/PROJECTS/Reach%20International%20Workflow/design.md).
   - Do NOT introduce arbitrary hex colors, arbitrary fonts, or deviating layout structures.

2. **Clean Plain White Background & High Contrast Aesthetic**:
   - Maintain the crisp plain white background (`#ffffff`) and subtle stage tone (`#f8fafc`).
   - Do NOT introduce dark mode themes or muddy background gradients.
   - Text must always strictly maintain high contrast against white backgrounds (`--text-primary: #0f172a`, `--text-secondary: #475569`, `--text-muted: #64748b`).

3. **Standard Padding & Spacing Consistency**:
   - All components must use the standardized 4px/8px grid scale defined in `design.md` (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`).
   - Always apply the standard component padding matrix (Desktop stage `24px 32px`, Mobile stage `8px 10px`, Desktop card `24px`, Mobile card `14px`, Table cell `14px 18px` desktop / `10px 12px` mobile).
   - Never use arbitrary one-off paddings or unaligned margins.

4. **Standard Button Hierarchy & Interactive States**:
   - Only use standardized button classes:
     - **Primary Action**: `.btn-primary` (gradient cyan to teal `#00a8cc` ➔ `#0b84a5` with white text & hover lift).
     - **Outline / Neutral**: `.btn-outline` (white background with `#e2e8f0` border & hover accent).
     - **Success Action**: `.btn-success` (`#10b981` with white text).
     - **Icon Action**: `.btn-icon` / `.open-large-btn` (standardized icon dimensions).
     - **Filter Pill**: `.month-pill-btn` (`border-radius: 20px` with active `#0066cc`).
   - Every button must define hover, active (`scale(0.98)` or `scale(0.94)` for icons), and focus states.
   - Minimum mobile touch target: **44×44px**.

5. **Mandatory Mobile & Desktop Dual-Viewport Support**:
   - Every layout addition or change MUST support both Desktop (`>1024px`) and Mobile (`≤768px` / `≤480px`).
   - Never implement a desktop-only feature without its mobile responsive equivalent (e.g. horizontal flowchart on desktop ➔ vertical timeline on mobile; 2-column grids on desktop ➔ 1-column stacks on mobile; tables in `.clean-table-responsive` with touch scroll).

---

## 2. Presentation Decks (Workflows) Standards

When adding or editing workflow slides in `src/data/workflowsData.js` or `src/components/`:

- **Node Data Schema**:
  ```js
  {
      step: 'STEP 01',                  // Step label
      role: 'Store Manager (Pradeep)',  // Stakeholder name
      roleClass: 'role-sm',             // Must use one of the standard role classes
      icon: '⚠️',                       // Emoji / Icon
      bgClass: 'bg-red',                // Background class
      title: 'Short Title',             // Concise step title
      desc: 'Detailed action description...', // 2-line clamped on card, full in modal
      tag: 'Status Tag',                // Bottom metadata tag
      photo: '/images/filename.png',    // 4:3 photo path
      isSuccess: false,                 // Optional green success highlight
      isAlert: false,                   // Optional red alert highlight
      isDecision: false,                // Optional decision branch with yesText/noText
      linkSlide: 2                      // Optional jump to chapter slide index
  }
  ```
- **5-Step Ribbon Color Cycle**:
  - Chevron ribbon and bottom accent pill colors must follow `(stepIndex % 5) + 1` corresponding to:
    1. Navy (`#0f2537`)
    2. Amber (`#f59e0b`)
    3. Steel Teal (`#0b84a5`)
    4. Vibrant Cyan (`#00a8cc`)
    5. Emerald Green (`#10b981`)
- **Role Badges**: Use only standard role badge classes (`.role-mgmt`, `.role-sm`, `.role-guard`, `.role-eng`, `.role-client`, `.role-oem`, `.role-logistics`, `.role-sys`, `.role-store`).
- **Responsive Layout**:
  - **Desktop**: 16:9 stage frame (`.ppt-stage-frame`), horizontal scroll with snap alignment, floating navigation buttons, and animated arrow connectors.
  - **Mobile (`≤768px`)**: Unlocked full-height stage (`100dvh`), vertical timeline flow, arrows rotated 90° down, touch swipe slide transitions.

---

## 3. Daily Meeting Summaries Standards

When adding or editing meeting summaries in `src/data/meetingsData.js` or `src/components/MeetingSummariesPage.jsx`:

- **Meeting Data Schema**:
  ```js
  {
      id: 'meet-YYYY-MM-DD',
      title: 'DD Mon YYYY',
      date: 'YYYY-MM-DD',
      dateFormatted: 'DD Mon YYYY',
      focus: 'High-level meeting agenda & focus areas',
      breakdowns: [
          { site: 'Site Name', issue: '...', action: '...', logistics: '...', clarification: '...', status: '...', pendingIssue: '...' }
      ],
      parts: [
          { part: 'Part Name', context: 'Site / Equipment Context', statusNextSteps: 'Status & Next steps' }
      ],
      directives: [
          { title: 'Directive Name', points: ['Point 1', 'Point 2'] }
      ],
      actionItems: [
          { person: 'Owner Name', task: 'Assigned task details' }
      ]
  }
  ```
- **Document Layout**:
  - **Header**: Main title, formatted date, agenda focus.
  - **Section 1 (Breakdowns)**: Desktop 2-column grid (`minmax(420px, 1fr)`), mobile 1-column stack, left blue border (`border-left: 4px solid #0066cc`).
  - **Section 2 (Parts Table)**: Responsive table container (`.clean-table-responsive`) with horizontal touch scroll.
  - **Section 3 (Directives)**: Amber background (`#fffbeb`) with `border-left: 4px solid #f59e0b`.
  - **Section 4 (Action Items)**: Emerald background (`#f0fdf4`) with `border-left: 4px solid #10b981`.
- **Text Copy Functionality**:
  - Any updates to the meeting data structure MUST be reflected in `formatMeetingSummary()` inside [`src/utils/meetingUtils.js`](file:///c:/Users/vaibh/PROGRAMMING/PROJECTS/Reach%20International%20Workflow/src/utils/meetingUtils.js).

---

## 4. UI/UX Quality & Performance Requirements

1. **Touch Ergonomics**: Minimum touch targets of 44×44px on mobile devices.
2. **Keyboard Hotkeys**: Retain global navigation keys (`ArrowRight`, `ArrowLeft`, `F` for fullscreen, `G` for grid overview, `Escape` for closing modals). Ensure input fields do not trigger slide changes.
3. **GPU Animations**: Use CSS `transform: translate3d` and `will-change` where appropriate to ensure buttery 60fps animations.
4. **Image Optimization**: Retain background idle preloading for adjacent slides.
