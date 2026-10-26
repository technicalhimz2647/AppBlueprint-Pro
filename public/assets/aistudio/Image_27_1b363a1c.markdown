---
name: Pragati Dark EdTech
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#a08e7a'
  outline-variant: '#534434'
  surface-tint: '#ffb95f'
  primary: '#ffc174'
  on-primary: '#472a00'
  primary-container: '#f59e0b'
  on-primary-container: '#613b00'
  inverse-primary: '#855300'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#56e5a9'
  on-tertiary: '#003824'
  tertiary-container: '#30c88f'
  on-tertiary-container: '#004e34'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-tablet: 1rem
  margin: 1rem
  margin-tablet: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system targets secondary students preparing for the Bihar School Examination Board (BSEB) Class 10 Matriculation exams. The aesthetic blends modern Indian educational ambition with competitive test-engine ergonomics: energetic, laser-focused, lightweight, and engineered for high clarity under continuous, low-latency mobile study conditions. 

The visual style is **Contemporary Dark Neo-Utility**:
- **Atmospheric Discipline:** Deep, glare-free dark canvas minimizes ocular fatigue during late-night study sessions while maximizing OLED battery efficiency on low-to-mid-tier Android devices.
- **Aspirational Energy:** The warm saffron-amber tone channels academic vitality and focus, providing an unmistakable visual beacon for primary actions (e.g., "Start Test", "Watch Lecture", "Attempt Doubt").
- **Rigid Precision:** Subtle micro-borders, clean structural dividers, and crisp hierarchy replace visual clutter, evoking the exactitude of test answer sheets and high-stakes examination consoles.

## Colors

The palette is engineered around high contrast, strict accessibility guidelines (WCAG AAA for text), and visual stamina:

- **Surface Tiers:**
  - **Base Canvas (`#090D16`):** Deep midnight navy. The bedrock tone for overall page canvases and navigation bars.
  - **Elevated Slate Card (`#131B2E`):** Distinct elevated layer for mock test modules, video tiles, question cards, and modal sheets.
  - **Interactive Surface (`#1E293B`):** Hover, pressed, and chip unselected states.
  - **Crisp Structural Borders (`#1E293B` and `#334155`):** Razor-thin outlines to cleanly delineate modules without elevation heaviness.

- **Accent Strategy:**
  - **Primary Saffron-Amber (`#F59E0B`):** Primary CTAs, key progress bars, active bottom-nav indicators, and high-impact motivational badges.
  - **Secondary Sky (`#38BDF8`):** Informational callouts, live lecture tags, doubt resolution states, and deep analytics.
  - **Tertiary Emerald (`#10B981`):** Correct answers, test pass states, percentile gains, and completed subject indicators.
  - **Critical Crimson (`#EF4444`):** Incorrect answers, negative marking flags, and urgent timers.

- **Typography & Content Tone:**
  - **Crisp White (`#F8FAFC`):** Question stems, section titles, score values, and active interactive text.
  - **Muted Slate (`#94A3B8`):** Subtext, metadata (marks, negative scoring, duration), Hindi transliteration labels, and disabled elements.

## Typography

The typography system pairs **Space Grotesk** for numerical metrics, percentages, test ranks, and key headlines with **Plus Jakarta Sans** for comprehensive reading, bilingual English/Devanagari UI labels, and examination stems.

- **Numeric Rigor & Display:** Space Grotesk offers geometric firmness that prevents numerical confusion (e.g., distinguishing 6, 8, and 0 in test timers or negative marks).
- **Legibility for Bilingual Rendering:** Plus Jakarta Sans contains tall x-height and wide counters, ensuring that Hindi-English mixed subject titles (e.g., "गणित / Mathematics - त्ऱ)%x)b
J�����ि") render crisp without vertical clipping.
- **Micro-Hierarchy:** Label styles (`label-md`, `label-sm`) use uppercase letter-spacing for state badges (e.g., "LIVE", "NCERT BASED", "PYQ 2024").

## Layout & Spacing

This design system uses a 4-column mobile grid expanding to an 8-column layout for tablets. Everything adheres strictly to an **8pt primary baseline grid** with a **4pt sub-grid** for compact mobile ed-tech components:

- **Mobile First Canvas (360dp - 412dp):** A compact `margin` of `1rem` (16px) with an internal `gutter` of `0.75rem` (12px) guarantees maximum readable surface area on small displays without wasting margin space.
- **Vertical Rhythm:** 
  - Standard component gap: `space-md` (12px).
  - Module separation (e.g., between "Daily Quiz" and "Recorded Lectures"): `space-xl` (24px).
  - Chip, badge, and inline icon offsets: `space-xs` (4px) to `space-sm` (8px).
- **Sticky Test Interface Rules:** During mock examinations, canvas margins are pinned to zero edge-to-edge for question sheets, retaining fixed top navigation for timers and subject switchers, and a persistent bottom action sheet for option selection.

## Elevation & Depth

To sustain 60–120 FPS performance on budget Android chipsets, heavy box-shadow stacking is eliminated in favor of **Crisp Low-Contrast Outlines** paired with **Targeted Ambient Glows**:

- **Layer 0 (Canvas):** Pure `#090D16`.
- **Layer 1 (Cards, Modules, List Items):** Solid `#131B2E` with a 1px continuous hairline stroke of `#1E293B`.
- **Layer 2 (Active/Selected Options, Bottom Sheets):** `#1E293B` bordered with `#334155`.
- **Layer 3 (Accent Glow / Focused Test Action):** Surfaces highlighted with saffron-amber utilize a localized, zero-spread translucent aura:
  - `box-shadow: 0 0 16px -2px rgba(245, 158, 11, 0.25);`
  - Active button states use a subtle inner border highlight: `inset 0 1px 0 0 rgba(255, 255, 255, 0.15)`.
- **Glass Overlays:** Bottom navigation bar and sticky test timers use `backdrop-filter: blur(12px)` over `#090D16` tinted at 85% opacity, preserving contextual awareness of scrolling study material.

## Shapes

The design system employs **Rounded (0.5rem base)** geometry. This balances modern app friendliness with the dense, information-rich look required for complex test interfaces:

- **Base Radii (`rounded` - 0.5rem / 8px):** Input text fields, individual MCQ answer choice rows, action buttons, progress bars, and doubt forum cards.
- **Large Radii (`rounded-lg` - 1rem / 16px):** Course banner cards, batch overview surfaces, video player containers, and modal sheets.
- **Capsule / Pill (`rounded-full`):** Category chips, timer badges, "FREE" tags, and rank pills.

## Components

### Buttons
- **Primary Action (Saffron CTA):** Background `#F59E0B`, text `#090D16` (font weight 700), height 48px, radius 8px. Subtle saffron drop-glow (`rgba(245, 158, 11, 0.2)`). Focus/press adds an overlay of `rgba(0,0,0,0.12)`.
- **Secondary Action (Slate Outline):** Background `#131B2E`, border 1px solid `#334155`, text `#F8FAFC`.
- **Critical / Stop Button:** Background `#EF4444`, text `#FFFFFF`, radius 8px for "Submit Test" or "End Exam".

### Cards (Course, Test, Subject Modules)
- **Default State:** Background `#131B2E`, 1px solid border `#1E293B`, internal padding `1rem`. 
- **Featured / Recommended State:** Border tinted with subtle amber gradient top edge (`rgba(245, 158, 11, 0.4)` to `#1E293B`).

### MCQ Option Selector (Testbook/PW Style)
- **Unselected:** Background `#0F172A`, 1px border `#1E293B`, text `#F8FAFC`. Contains an index circle (A, B, C, D) in `#1E293B` with `#94A3B8` text.
- **Selected:** Background `#1A243B`, 1.5px border `#F59E0B`. Index circle turns `#F59E0B` with dark `#090D16` glyph.
- **Correct (Review Mode):** Background `rgba(16, 185, 129, 0.12)`, border `#10B981`, index icon `#10B981`.
- **Incorrect (Review Mode):** Background `rgba(239, 68, 68, 0.12)`, border `#EF4444`, index icon `#EF4444`.

### Chips & Subject Filters
- **Standard Filter Chip:** Height 32px, pill-shaped (`rounded-full`), background `#131B2E`, border 1px solid `#1E293B`, text `#94A3B8`.
- **Active State:** Background `#F59E0B`, border `#F59E0B`, text `#090D16`, bold weight.

### Input Fields & Search Bars
- **Container:** Height 44px, background `#0D1424`, border 1px solid `#1E293B`, text `#F8FAFC`, placeholder `#64748B`.
- **Active Focus:** Border transitions to `#F59E0B`, displaying a 2px outer outline glow (`rgba(245, 158, 11, 0.2)`).

### Metric Counters & Test Timers
- Monospaced numerical display using **Space Grotesk**.
- Urgent countdown (< 5 minutes) triggers a pulsating amber-to-red border warning indicator.