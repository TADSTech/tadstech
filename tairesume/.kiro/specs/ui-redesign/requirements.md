# Requirements Document

## Introduction

TaiResume is a Next.js web application that uses AI to tailor Typst resumes to job descriptions. The current UI is perceived as overly "AI/SaaS-like" — it lacks clear interactive affordances, has no iconography, uses browser-default scrollbars, provides weak feedback states, and only supports dark mode. This redesign overhauls the visual language to feel more like a focused, human-scale tool: clear buttons with icons, explicit feedback for every action, custom scrollbars, and a full light/dark mode toggle — while preserving all existing functionality.

## Glossary

- **App**: The TaiResume Next.js web application.
- **Theme_System**: The CSS custom-property layer that drives light and dark color schemes.
- **Icon_Set**: The SVG icon library used throughout the App (Lucide React or equivalent).
- **Scrollbar**: The custom-styled scrollbar applied to all scrollable regions.
- **Feedback_State**: A visible UI change (loading spinner, success badge, error message, toast) that communicates the result of a user action.
- **Affordance**: A visual cue (button shape, icon, label, hover state) that signals an element is interactive.
- **Toolbar**: The row of action buttons above the Typst editor and PDF preview panels.
- **Panel**: One of the two main split-view columns in the workspace (inputs panel, output panel).
- **Toast**: The transient notification that appears at the bottom-right of the screen.
- **Modal**: An overlay dialog (AuthModal, AdModal, BuyCoinsModal).
- **Coin_Balance**: The pill-shaped display of the user's current coin count in the Header.
- **Tailor_Button**: The primary call-to-action button that triggers the AI tailoring run.
- **Compile_Button**: The toolbar button that compiles Typst code to PDF.
- **Download_Button**: The toolbar button that downloads the compiled PDF.
- **Theme_Toggle**: The button in the Header that switches between light and dark mode.
- **Light_Mode**: A color scheme with a light background and dark text.
- **Dark_Mode**: The existing color scheme with a dark background and light text.

---

## Requirements

### Requirement 1: Light Mode and Theme Toggle

**User Story:** As a user, I want to switch between light and dark mode, so that I can use TaiResume comfortably in any lighting environment.

#### Acceptance Criteria

1. THE Theme_System SHALL define a complete set of CSS custom properties for Light_Mode under a `[data-theme="light"]` selector, covering background, surface, border, text, accent, and status colors.
2. THE Theme_System SHALL define a complete set of CSS custom properties for Dark_Mode under a `[data-theme="dark"]` selector, preserving all existing dark color values.
3. THE App SHALL default to Dark_Mode on first visit.
4. WHEN the user's OS preference is `prefers-color-scheme: light` and no saved preference exists, THE App SHALL default to Light_Mode.
5. THE Theme_Toggle SHALL be rendered in the Header as a button with a sun icon in Dark_Mode and a moon icon in Light_Mode.
6. WHEN the user activates the Theme_Toggle, THE Theme_System SHALL switch the active theme and persist the selection to `localStorage` under the key `tairesume-theme`.
7. WHEN the App loads, THE Theme_System SHALL read `localStorage` and apply the saved theme before first paint to prevent a flash of unstyled content.
8. THE Theme_Toggle SHALL display a tooltip with the label "Switch to light mode" or "Switch to dark mode" matching the target state.

---

### Requirement 2: Icon Set Integration

**User Story:** As a user, I want every interactive control to have a recognizable icon, so that I can identify actions at a glance without reading every label.

#### Acceptance Criteria

1. THE App SHALL use Lucide React as the Icon_Set for all iconography.
2. THE Icon_Set SHALL be installed as a dependency and imported per-component (no global icon font).
3. THE Header SHALL render a home/arrow-left icon alongside the "back to home" link.
4. THE Coin_Balance SHALL render a `Coins` icon in place of the 🪙 emoji.
5. THE Theme_Toggle SHALL render a `Sun` icon in Dark_Mode and a `Moon` icon in Light_Mode.
6. THE Tailor_Button SHALL render a `Wand2` icon when idle and a spinner when streaming.
7. THE Compile_Button SHALL render a `Play` icon when idle and a spinner when compiling.
8. THE Download_Button SHALL render a `Download` icon.
9. THE ResumeInput upload button SHALL render an `Upload` icon.
10. THE TypstEditor upload button SHALL render an `Upload` icon.
11. THE TypstEditor copy button SHALL render a `Copy` icon.
12. THE JobInput scrape button SHALL render a `Globe` icon.
13. THE Modal close button SHALL render an `X` icon from the Icon_Set instead of the `×` character.
14. THE Toast SHALL render a `CheckCircle` icon for success and a `AlertCircle` icon for errors.
15. THE ProjectSelector chip SHALL render a `Check` icon inside the checkbox when selected and an empty square outline when unselected.
16. WHEN an icon is used alongside a text label, THE Icon_Set SHALL render the icon at 16px × 16px.
17. WHEN an icon is used as the sole content of a button, THE Icon_Set SHALL render the icon at 18px × 18px and the button SHALL include an `aria-label`.

---

### Requirement 3: Clear Button Affordances

**User Story:** As a user, I want every button to look and feel clearly clickable, so that I never have to guess what is interactive.

#### Acceptance Criteria

1. THE App SHALL define a unified button design system with four variants: `primary`, `secondary`, `ghost`, and `danger`.
2. THE primary variant SHALL use the accent color as background with white text and a visible border-radius of at least 8px.
3. THE secondary variant SHALL use the surface color as background with a 1px border and text color matching the theme.
4. THE ghost variant SHALL have a transparent background and show a surface-colored background on hover.
5. THE danger variant SHALL use the error color as background with white text, reserved for destructive actions.
6. WHEN a button is in the `disabled` state, THE App SHALL render it at 40% opacity and set `cursor: not-allowed`.
7. WHEN a button is hovered, THE App SHALL apply a 2px upward `translateY` transform and a subtle box-shadow to communicate elevation.
8. WHEN a button is focused via keyboard, THE App SHALL render a 2px accent-colored outline offset by 2px.
9. THE Tailor_Button SHALL be visually distinct from secondary buttons — larger padding (16px vertical), full-width, and gradient background.
10. THE btn--sm variant SHALL have a minimum touch target of 32px height.
11. THE btn--large variant SHALL have a minimum touch target of 48px height.

---

### Requirement 4: Feedback States

**User Story:** As a user, I want the UI to clearly communicate the result of every action I take, so that I always know whether something succeeded, is in progress, or failed.

#### Acceptance Criteria

1. WHEN the Tailor_Button is clicked and streaming begins, THE Tailor_Button SHALL replace its label with a spinner and the text "Tailoring…".
2. WHEN streaming completes successfully, THE App SHALL display a success Toast with the message "Resume tailored successfully."
3. WHEN streaming fails, THE App SHALL display an error Toast with a human-readable error message.
4. WHEN the Compile_Button is clicked and compilation begins, THE Compile_Button SHALL replace its icon with a spinner and the text "Compiling…".
5. WHEN compilation succeeds, THE Toolbar SHALL display a green `CheckCircle` icon and the text "Compiled" next to the Compile_Button.
6. WHEN compilation fails, THE Toolbar SHALL display a red `AlertCircle` icon and the text "Error" next to the Compile_Button.
7. WHEN a PDF upload is in progress, THE ResumeInput upload button SHALL show a spinner and be disabled.
8. WHEN a Typst file upload is in progress, THE TypstEditor upload button SHALL show a spinner and be disabled.
9. WHEN the scrape API call is in progress, THE JobInput scrape button SHALL show a spinner and be disabled.
10. WHEN the scrape API call fails, THE JobInput SHALL display an inline error message below the URL input in the error color.
11. THE Toast SHALL auto-dismiss after 2500ms.
12. THE Toast SHALL render with a slide-up entrance animation and a fade-out exit animation.
13. WHEN the compiler WASM module is loading, THE PdfPreview toolbar SHALL display a `Loader` spinner icon and the text "Loading compiler…".

---

### Requirement 5: Custom Scrollbars

**User Story:** As a user, I want scrollbars to match the application's visual style, so that the UI feels cohesive and polished rather than using browser defaults.

#### Acceptance Criteria

1. THE App SHALL define custom scrollbar styles using `::-webkit-scrollbar` pseudo-elements in `globals.css`.
2. THE Scrollbar track SHALL use the surface color (`--surface`) as its background.
3. THE Scrollbar thumb SHALL use the border-hover color (`--border-hover`) as its background with a border-radius of 4px.
4. WHEN the Scrollbar thumb is hovered, THE Scrollbar thumb SHALL transition to the text-muted color (`--text-muted`).
5. THE Scrollbar width SHALL be 6px for vertical scrollbars and 6px for horizontal scrollbars.
6. THE custom scrollbar styles SHALL apply to the inputs Panel, the editor textarea, and all Modal bodies.
7. WHILE Light_Mode is active, THE Scrollbar track SHALL use the light surface color and the thumb SHALL use the light border color.
8. THE App SHALL set `scrollbar-width: thin` and `scrollbar-color` for Firefox compatibility.

---

### Requirement 6: Improved Typography and Spacing

**User Story:** As a user, I want the text hierarchy and spacing to feel intentional and readable, so that I can scan the interface quickly.

#### Acceptance Criteria

1. THE App SHALL load the Inter font via `next/font/google` with weights 400, 500, 600, and 700.
2. THE App SHALL load JetBrains Mono via `next/font/google` for all monospace contexts.
3. THE card__label elements SHALL use 11px font-size, 600 weight, uppercase, and 0.06em letter-spacing.
4. THE editor-toolbar__label elements SHALL use the same typographic treatment as card__label.
5. THE Modal title SHALL use 18px font-size and 700 weight.
6. THE Panel gap between cards SHALL be 16px.
7. THE Panel padding SHALL be 20px on all sides.
8. THE Header height SHALL be fixed at 56px.
9. THE Footer height SHALL be fixed at 40px with centered text at 12px.
10. WHEN a card__hint or card__meta is present, THE App SHALL render it in text-muted color at 12px.

---

### Requirement 7: Polished Modal Design

**User Story:** As a user, I want modals to feel focused and well-structured, so that I can complete authentication and payment flows without distraction.

#### Acceptance Criteria

1. THE Modal SHALL render with a backdrop blur of 6px and a background overlay of `rgba(0,0,0,0.7)` in Dark_Mode and `rgba(0,0,0,0.4)` in Light_Mode.
2. THE Modal SHALL animate in with a 200ms slide-up and fade-in transition.
3. THE Modal close button SHALL be positioned at the top-right corner with a 16px inset and render the `X` icon from the Icon_Set.
4. THE Modal close button SHALL have a hover state that changes the icon color to the primary text color.
5. THE AuthModal tabs (Sign in / Sign up) SHALL use a pill-style segmented control rather than individual bordered buttons.
6. THE password-rules list items SHALL render a `Check` icon in the success color when the rule is met and a `Circle` icon in the muted color when unmet.
7. THE BuyCoinsModal coin display SHALL render the `Coins` icon from the Icon_Set instead of the 🪙 emoji.
8. THE AdModal countdown timer SHALL render in a monospace font at 48px with the accent color.
9. WHEN the AdModal countdown reaches zero, THE AdModal SHALL animate the "Claim 1 Coin" button in with a fade-in transition.
10. THE Modal SHALL be dismissible by clicking the overlay, except during the AdModal countdown.

---

### Requirement 8: Landing Page Visual Polish

**User Story:** As a visitor, I want the landing page to feel professional and trustworthy, so that I am confident signing up.

#### Acceptance Criteria

1. THE landing-header SHALL render with a frosted-glass effect (backdrop-filter: blur(8px)) in both Light_Mode and Dark_Mode.
2. WHEN Light_Mode is active, THE landing background SHALL use a light gradient instead of the dark radial gradients.
3. THE hero section SHALL render the eyebrow badge, title, subtitle, and CTA buttons with consistent vertical rhythm of 16px between elements.
4. THE landing-grid cards SHALL render with a hover state that elevates the card border color to the accent color.
5. THE pricing__grid items SHALL render the coin amount in the coin-gold color and the label in text-secondary color.
6. THE "Open App" button in the landing-header nav SHALL use the primary button variant with the accent color.
7. THE hero CTA buttons SHALL have a minimum touch target of 48px height.

---

### Requirement 9: Workspace Layout Refinements

**User Story:** As a user, I want the workspace to feel organized and efficient, so that I can focus on tailoring my resume without visual clutter.

#### Acceptance Criteria

1. THE workspace SHALL use a 50/50 split grid layout on screens wider than 768px.
2. THE inputs Panel SHALL have a right border separator of 1px in the border color.
3. THE output Panel SHALL be divided vertically between the TypstEditor (top half) and PdfPreview (bottom half) with a 1px border separator.
4. THE editor-toolbar and preview-toolbar SHALL have a consistent height of 44px.
5. THE editor-textarea SHALL fill all remaining vertical space in the TypstEditor section with `flex: 1`.
6. THE preview-frame SHALL fill all remaining vertical space in the PdfPreview section with `flex: 1`.
7. WHEN the workspace is viewed on a screen narrower than 768px, THE workspace SHALL stack the panels vertically.
8. THE tailor-section SHALL render the Tailor_Button, Watch Ad, and Buy Coins buttons with 8px vertical gap between them.
9. THE Watch Ad button SHALL use the gold button variant.
10. THE Buy Coins button SHALL use the primary button variant.

---

### Requirement 10: Accessibility and Focus Management

**User Story:** As a keyboard or assistive-technology user, I want all interactive elements to be fully accessible, so that I can use TaiResume without a mouse.

#### Acceptance Criteria

1. THE App SHALL ensure all interactive elements have a visible focus ring using a 2px accent-colored outline.
2. THE Modal SHALL trap focus within its bounds while open.
3. WHEN a Modal opens, THE App SHALL move focus to the first focusable element inside the Modal.
4. WHEN a Modal closes, THE App SHALL return focus to the element that triggered the Modal.
5. THE Theme_Toggle SHALL have an `aria-label` that reflects the current action ("Switch to light mode" or "Switch to dark mode").
6. THE Icon_Set icons used as decorative elements SHALL have `aria-hidden="true"`.
7. THE Icon_Set icons used as the sole content of a button SHALL have a sibling `<span className="sr-only">` with a descriptive label.
8. THE color contrast ratio between text and background SHALL meet WCAG AA (4.5:1 for normal text, 3:1 for large text) in both Light_Mode and Dark_Mode.
9. THE App SHALL not rely solely on color to convey state — every status indicator SHALL include both a color change and an icon or text label.
