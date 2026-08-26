# REACH INTERNATIONAL — DESIGN SYSTEM & SPECIFICATION
**Version:** 2.1.0  
**Target Applications:** Operational Workflows Deck (Presentations), Daily Meeting Summaries & Landing Portal  
**Core Directive:** 100% Visual, Layout, Padding, Button, Color, and Theme Consistency Across All Viewports (Desktop & Mobile)

---

## 1. Design Philosophy & Uniform Aesthetic

The **Reach International Workflow Management System** adheres to a strictly unified, clean industrial aesthetic designed for plant operations, equipment management, and executive presentations.

### Non-Negotiable Tenets:
1. **Crisp Plain White Background (`#ffffff`)**:
   - The entire web application operates on a pure white canvas (`#ffffff`) paired with a subtle, clean stage background (`#f8fafc`).
   - Dark mode or muddy background gradients are strictly prohibited.
   - Text must always strictly maintain high contrast (`#0f172a`, `#475569`, `#64748b`).

2. **Component & Spacing Uniformity**:
   - All interactive elements, cards, tables, buttons, and sections must use standardized tokens from the global design scale.
   - No component may introduce arbitrary one-off paddings, custom hex colors, or inconsistent button styles.

3. **Dual-Viewport Parity**:
   - Every layout feature on Desktop (`>1024px`) has a mandatory mobile equivalent (`≤768px` / `≤480px`).
   - Mobile interfaces must guarantee a minimum **44×44px touch target** for buttons and interactive elements.

---

## 2. Global Design Tokens & Variables

### 2.1 Color Palette & Theme Tokens

```css
:root {
    /* Base Backgrounds & Surfaces */
    --bg-white: #ffffff;         /* Main content & card surface */
    --stage-bg: #f8fafc;         /* Subtle secondary background / table headers */
    --border-light: #e2e8f0;     /* Default light border */
    --border-dark: #cbd5e1;      /* Secondary / input border */

    /* Typography / High-Contrast Text */
    --text-primary: #0f172a;     /* Headings & primary labels (Slate 900) */
    --text-secondary: #475569;   /* Body copy & descriptions (Slate 600) */
    --text-muted: #64748b;       /* Metadata, timestamps, captions (Slate 500) */

    /* 5-Step Chevron Ribbon Sequence (Cyclic per step: (stepIndex % 5) + 1) */
    --ribbon-1: #0f2537;         /* Dark Navy (Step 1, 6, 11...) */
    --ribbon-2: #f59e0b;         /* Amber Orange (Step 2, 7, 12...) */
    --ribbon-3: #0b84a5;         /* Steel Teal (Step 3, 8, 13...) */
    --ribbon-4: #00a8cc;         /* Vibrant Cyan (Step 4, 9, 14...) */
    --ribbon-5: #10b981;         /* Emerald Green (Step 5, 10, 15...) */

    /* Operational Category Accent Colors */
    --theme-breakdown: #0066cc;  /* Vivid Blue (Machine Breakdowns & Site Updates) */
    --theme-parts: #0b84a5;      /* Steel Teal (Parts & Inventory) */
    --theme-directive: #f59e0b;  /* Amber Orange (Policy Directives) */
    --theme-action: #10b981;     /* Emerald Green (Action Items & Tasks) */

    /* Standardized Status Badges (Background / Text / Border) */
    --status-success-bg: #f0fdf4;
    --status-success-text: #047857;
    --status-success-border: #a7f3d0;

    --status-danger-bg: #fff5f5;
    --status-danger-text: #e11d48;
    --status-danger-border: #fca5a5;

    --status-warning-bg: #fffbeb;
    --status-warning-text: #d97706;
    --status-warning-border: #fde68a;

    --status-info-bg: #eff6ff;
    --status-info-text: #1d4ed8;
    --status-info-border: #bfdbfe;

    /* Standard Shadows */
    --card-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04);
    --hover-shadow: 0 20px 35px -10px rgba(15, 23, 42, 0.15);
    --modal-shadow: 0 30px 60px -12px rgba(15, 23, 42, 0.35);

    /* Border Radii */
    --radius-sm: 8px;            /* Badges, small buttons, inner cards */
    --radius-md: 16px;           /* Cards, modals, containers */
    --radius-lg: 24px;           /* Large modals, hero banners */
    --radius-full: 9999px;       /* Pills, search inputs, circular buttons */

    /* Standard Animations */
    --transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
    --transition-fast: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
    --transition-card: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
}
```

### 2.2 Standard Spacing & Padding Scale

All component paddings and margins MUST strictly use the standardized 4px/8px grid scale:

| Token | Size | Application Scope |
| :--- | :--- | :--- |
| `space-1` | `4px` | Tiny tag padding, inner badge margins, micro gaps |
| `space-2` | `8px` | Icon button gaps, list item gaps, small card paddings |
| `space-3` | `12px`| Button vertical padding, small card internal spacing |
| `space-4` | `16px`| Standard card padding (mobile), table cell padding, form gaps |
| `space-5` | `20px`| Grid gaps, modal internal padding, mobile container margins |
| `space-6` | `24px`| Standard card padding (desktop), section bottom spacing |
| `space-7` | `32px`| Presentation stage padding, document container padding |
| `space-8` | `40px`| Hero banner paddings, landing page margins |

#### Standard Component Padding Matrix:

| Component | Desktop (`>1024px`) | Mobile (`≤768px`) | Small Mobile (`≤480px`) |
| :--- | :--- | :--- | :--- |
| **App Header** (`.app-header`) | `0 28px` (H: `64px`) | `0 12px` (H: `56px`) | `0 10px` (H: `56px`) |
| **Presentation Stage** (`.presentation-container`) | `24px 32px` | `8px 10px` | `6px 8px` |
| **Slide Card** (`.slide-card`) | `28px 32px` | `16px 14px` | `14px 10px` |
| **Flow Node Card** (`.flow-node`) | `12px 12px 16px 12px` | `12px 12px 14px 12px` | `10px 10px 12px 10px` |
| **Clean Meeting Document** (`.clean-meeting-document`) | `32px 36px` | `24px 18px` | `16px 12px` |
| **Meeting Site Block** (`.clean-site-block`) | `16px 18px` | `14px 14px` | `12px 10px` |
| **Parts Table Cells** (`th, td`) | `14px 18px` | `10px 12px` | `8px 10px` |
| **Directives Card** (`.clean-directive-item`) | `16px 18px` | `12px 14px` | `10px 12px` |
| **Action Items Box** (`.clean-action-items-list`) | `18px 20px` | `14px 14px` | `12px 10px` |

---

## 3. Standard Button Hierarchy & Interactive Styles

All buttons across the entire application MUST follow one of the standardized button classes:

```
+-----------------------------------------------------------------------------+
|  Primary Button          Outline Button         Icon Button       Action Pill|
|  [ + Start Walkthrough ]  [ 📋 Copy Summary ]    [ [↗] ]           ( 26 Aug ) |
+-----------------------------------------------------------------------------+
```

### 3.1 Button Variants & Specifications

1. **Primary Action Button (`.btn-primary`)**:
   - **Background**: `linear-gradient(135deg, var(--ribbon-4), var(--ribbon-3))` (`#00a8cc` to `#0b84a5`).
   - **Text Color**: `#ffffff` (Font weight `700` or `600`).
   - **Shadow**: `0 4px 12px rgba(0, 168, 204, 0.3)`.
   - **Hover State**: `transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0, 168, 204, 0.45);`.
   - **Use Case**: Key conversions (Start Presentation, Resume, Submit, Primary Confirmations).

2. **Outline / Secondary Button (`.btn-outline`)**:
   - **Background**: `#ffffff`.
   - **Text Color**: `var(--text-primary)` (`#0f172a`).
   - **Border**: `1px solid var(--border-light)` (`#e2e8f0`).
   - **Hover State**: `background: var(--stage-bg); border-color: var(--ribbon-4); color: var(--ribbon-4);`.
   - **Use Case**: Navigation back-buttons, deck grid openers, secondary actions.

3. **Success State Button (`.btn-success`)**:
   - **Background**: `#10b981` (Emerald Green).
   - **Text Color**: `#ffffff`.
   - **Hover State**: `background: #059669;`.
   - **Use Case**: Completed actions (e.g. `✓ Copied Summary!`).

4. **Icon Action Button (`.btn-icon`)**:
   - **Dimensions**: `38px × 38px` (or `26px × 26px` for `.open-large-btn`).
   - **Background**: `#ffffff` (or `#0284c7` for zoom triggers).
   - **Border**: `1px solid var(--border-light)` with rounded corners (`--radius-sm`).
   - **Hover State**: Lift and highlight border/background.
   - **Active State**: Scale `0.94` for crisp tactile click feedback.

5. **Month / Category Filter Pill (`.month-pill-btn`)**:
   - **Dimensions**: Padding `7px 18px`, `border-radius: 20px`.
   - **Default**: `#ffffff` background with `1.5px solid #cbd5e1`, text `#334155`.
   - **Active**: Background `#0066cc`, border `#0066cc`, text `#ffffff`, shadow `0 4px 12px rgba(0, 102, 204, 0.25)`.

6. **Button Sizes**:
   - **Small (`.btn-sm`)**: Padding `6px 12px`, font-size `0.78rem`.
   - **Default (`.btn`)**: Padding `9px 18px`, font-size `0.82rem`, height `~38px`.
   - **Large (`.btn-large`)**: Padding `12px 26px`, font-size `0.92rem`, height `~46px`.
   - **Touch Target Safeguard**: On mobile devices (`≤768px`), all interactive buttons must maintain a minimum bounding box of `44px × 44px` or appropriate padding.

---

## 4. Standard Layout & Card Containers

### 4.1 Card Container Anatomy

Every card in the system (Workflow Node Card, Meeting Summary Card, Directive Card, Site Breakdown Block) MUST follow these unified structure rules:

```css
.card-container-standard {
    background: var(--bg-white);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-md);
    box-shadow: var(--card-shadow);
    transition: var(--transition-card);
    overflow: hidden;
    position: relative;
}

.card-container-standard:hover {
    transform: translateY(-4px);
    box-shadow: var(--hover-shadow);
    border-color: var(--ribbon-4);
}
```

### 4.2 Presentation System (Workflows Deck)

- **Desktop (`>1024px`)**:
  - **Stage Frame**: 16:9 fixed aspect ratio (`max-width: 1440px`, `max-height: 82vh`) centered on stage.
  - **Flowchart**: Horizontal scrollable container with snap alignment (`scroll-snap-type: x proximity;`).
  - **Node Cards**: Chevron ribbon badge top-right, 4:3 photo thumbnail, role tag badge, 2-line clamped description, bottom accent color pill.
  - **Connectors**: Right-pointing animated SVG arrows (`.flow-arrow`).
  - **Navigation**: Previous / Next footer controls + circular slide dots + keyboard arrows.
- **Mobile (`≤768px`)**:
  - **Stage Frame**: Full viewport height (`100dvh`, `aspect-ratio: auto`).
  - **Flowchart**: Vertical procedural timeline (`flex-direction: column`).
  - **Node Cards**: 100% full width with responsive photo heights.
  - **Connectors**: Arrows rotated 90° downward (`transform: rotate(90deg)`).
  - **Gestures**: Left/Right touch swipe slide navigation with scroll-lock threshold.

### 4.3 Daily Meeting Summary System

- **Date Grid View**:
  - Hero header with "Choose Date" title and month filter pill bar.
  - Summary cards with bold blue top accent (`border-top: 4px solid #0066cc`) and large date title (`1.35rem`, weight `800`).
- **Operational Document View**:
  - White document container (`.clean-meeting-document`) with `border-radius: 12px`.
  - **Section 1 (Machine Breakdowns & Site Updates)**: Desktop 2-column grid (`minmax(420px, 1fr)`), mobile 1-column stack, left blue border (`border-left: 4px solid #0066cc`).
  - **Section 2 (Parts, Procurement & Inventory)**: Full-width responsive table container (`.clean-table-responsive`) with horizontal touch scrolling.
  - **Section 3 (Policy & Process Directives)**: Amber warning background (`#fffbeb`) with `border-left: 4px solid #f59e0b`.
  - **Section 4 (Key Action Items & Ownership)**: Emerald task container (`#f0fdf4`) with `border-left: 4px solid #10b981`.
  - **Copy Summary**: Standardized ASCII plain-text export for WhatsApp, Slack, and email.

---

## 5. Typography & Text Hierarchy

| Level | Size | Weight | Line Height | Color | Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero / Document)** | `1.75rem - 2.2rem` | `800` (ExtraBold) | `1.2` | `#0f2537` | Cover slide title, meeting document main title |
| **H2 (Slide / Section)** | `1.28rem - 1.6rem` | `800` (ExtraBold) | `1.25` | `#0f2537` | Slide titles, section headings, date card titles |
| **H3 (Card / Site)** | `0.95rem - 1.1rem` | `800` (ExtraBold) | `1.3` | `#0f2537` | Flow node title, site breakdown title, directive title |
| **Body (Standard)** | `0.88rem - 0.95rem` | `400` / `500` | `1.55` | `#334155` | Operational field descriptions, table cells, modal text |
| **Card Description** | `0.72rem - 0.82rem` | `500` (Medium) | `1.35` | `#475569` | 2-line clamped summary on presentation cards |
| **Category Tag / Pill** | `0.65rem - 0.75rem` | `700` (Bold) | `1.0` | `--ribbon-3` | Chapter tag, slide indicator, status badge |

---

## 6. Micro-Interactions & Performance Rules

1. **GPU Acceleration**: Always use `transform: translate3d` or `translateZ(0)` for animated elements. Heavy cards must declare `will-change: transform; contain: layout style;`.
2. **Idle Image Preloading**: Adjacent slide images must preload silently via `requestIdleCallback`.
3. **Modal Focus & Escape Handling**: All modals (`NodeDetailModal`, `SlideDeckGrid`, `MeetingDetailModal`) must close on `Escape` key and outside backdrop clicks.
4. **Zero Layout Shifts**: Image wrappers must always define fixed aspect ratios (`4 / 3`) or explicit dimensions to prevent Cumulative Layout Shift (CLS).
