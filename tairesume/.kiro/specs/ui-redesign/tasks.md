# Implementation Plan: UI Redesign

## Overview

Implement a complete visual overhaul of TaiResume: install `lucide-react`, build a light/dark theme system with a `ThemeContext`, rewrite `globals.css` with semantic tokens and custom scrollbars, update every component with icons and proper feedback states, and polish modals, typography, and layout. No API routes or business logic change.

## Tasks

- [x] 1. Install lucide-react and set up ThemeContext
  - Run `npm install lucide-react` (or `bun add lucide-react`) in the `tairesume` directory
  - Create `src/context/ThemeContext.tsx` with `Theme = 'light' | 'dark'`, `ThemeContextValue`, a `ThemeProvider` component that reads `html[data-theme]` on mount, writes to `localStorage` on toggle, and exposes `theme` + `toggleTheme`
  - Export a `useTheme` hook from the same file
  - _Requirements: 1.1, 1.2, 1.6, 1.7_

- [x] 2. Update layout.tsx with inline theme script and ThemeProvider
  - Add an inline `<script>` in `<head>` that reads `localStorage["tairesume-theme"]`, falls back to `prefers-color-scheme`, and sets `document.documentElement.setAttribute('data-theme', ...)` synchronously — wrapped in try/catch defaulting to `'dark'`
  - Wrap `<AuthProvider>` with `<ThemeProvider>` in the body
  - Load Inter (weights 400, 500, 600, 700) and JetBrains Mono via `next/font/google` and apply their CSS variables to `<body>`
  - _Requirements: 1.3, 1.4, 1.7, 6.1, 6.2_

- [x] 3. Rewrite globals.css — color tokens, typography, and base styles
  - Replace the single `:root` block with `[data-theme="dark"]` and `[data-theme="light"]` blocks, each defining: `--bg`, `--surface`, `--surface-hover`, `--border`, `--border-hover`, `--accent`, `--accent-hover`, `--accent-dim`, `--text`, `--text-secondary`, `--text-muted`, `--coin-gold`, `--coin-gold-dim`, `--success`, `--success-dim`, `--error`, `--error-dim`
  - Keep all existing layout, component, and animation CSS intact; update hardcoded color values to use the new tokens
  - Update `.card__label` and `.editor-toolbar__label` to 11px, 600 weight, uppercase, 0.06em letter-spacing
  - Fix `.modal__title` to 18px / 700 weight
  - Fix `.header` to `height: 56px`; fix `.footer` to `height: 40px` with 12px centered text
  - Fix `.panel--inputs` padding to 20px; fix `.panel` gap to 16px
  - Fix `.editor-toolbar` and `.preview-toolbar` to `min-height: 44px`
  - _Requirements: 1.1, 1.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_

- [x] 4. Add custom scrollbars and button affordance improvements to globals.css
  - Add `::-webkit-scrollbar` (6px width/height), `::-webkit-scrollbar-track` (`--surface`), `::-webkit-scrollbar-thumb` (`--border-hover`, border-radius 4px), `::-webkit-scrollbar-thumb:hover` (`--text-muted`)
  - Add `scrollbar-width: thin; scrollbar-color: var(--border-hover) var(--surface)` to `body` for Firefox
  - Scope scrollbar styles to `.panel--inputs`, `.editor-textarea`, `.modal` as well as globally
  - Update `.btn` hover to add `transform: translateY(-2px)` and a subtle `box-shadow`
  - Add `focus-visible` outline: `outline: 2px solid var(--accent); outline-offset: 2px` on all interactive elements
  - Add `.btn:disabled { opacity: 0.4; cursor: not-allowed; }`
  - Add `.sr-only` utility class
  - Add `@keyframes fadeOut` and `.toast--exiting { animation: fadeOut 0.2s ease forwards; }`
  - _Requirements: 3.6, 3.7, 3.8, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 10.1_

- [x] 5. Update Header.tsx with ThemeToggle, icons, and fixed height
  - Import `ArrowLeft`, `Coins`, `Sun`, `Moon` from `lucide-react`
  - Import `useTheme` from `@/context/ThemeContext`
  - Replace `← back to home` text with `<ArrowLeft size={16} aria-hidden="true" />` + "back to home"
  - Replace `🪙` emoji in `CoinBalance` with `<Coins size={16} aria-hidden="true" />`
  - Add a `ThemeToggle` button in `.header__right`: renders `<Sun size={18} />` when theme is `'dark'`, `<Moon size={18} />` when `'light'`; has `aria-label="Switch to light mode"` / `"Switch to dark mode"` and `title` matching; calls `toggleTheme` on click
  - _Requirements: 1.5, 1.6, 1.8, 2.3, 2.4, 2.5, 6.8_

- [x] 6. Update ResumeInput.tsx with Upload icon and feedback state
  - Import `Upload`, `Loader` from `lucide-react`
  - Replace the "Upload PDF" button text with `<Upload size={16} aria-hidden="true" /> Upload PDF`
  - When `isImporting` is true, replace icon with `<Loader size={16} className="spin" aria-hidden="true" />` and set button text to "Importing…", keep `disabled`
  - _Requirements: 2.9, 4.7_

- [x] 7. Update JobInput.tsx with Globe icon and error feedback
  - Import `Globe`, `Loader`, `AlertCircle` from `lucide-react`
  - Replace "Scrape" button text with `<Globe size={16} aria-hidden="true" /> Scrape`
  - When `isScraping` is true, replace icon with `<Loader size={16} className="spin" aria-hidden="true" />`, keep `disabled`
  - Replace the inline `<p>` error with `<p><AlertCircle size={14} aria-hidden="true" /> {scrapeError}</p>` styled in `--error`
  - _Requirements: 2.12, 4.9, 4.10_

- [x] 8. Update TypstEditor.tsx with icons and status badge
  - Import `Upload`, `Play`, `Download`, `Copy`, `Loader`, `CheckCircle`, `AlertCircle` from `lucide-react`
  - Upload button: `<Upload size={16} aria-hidden="true" /> Upload` idle; `<Loader size={16} className="spin" aria-hidden="true" /> Uploading…` when `isImporting`
  - Compile button: `<Play size={16} aria-hidden="true" /> Compile` idle; `<Loader size={16} className="spin" aria-hidden="true" /> Compiling…` when `isCompiling`
  - Download button: `<Download size={16} aria-hidden="true" /> PDF`
  - Copy button: `<Copy size={16} aria-hidden="true" /> Copy`
  - Replace plain-text status with a badge: success → `<CheckCircle size={14} aria-hidden="true" /> Compiled` in `--success`; error → `<AlertCircle size={14} aria-hidden="true" /> Error` in `--error`; streaming → `<Loader size={14} className="spin" aria-hidden="true" /> Streaming…` in `--accent`
  - _Requirements: 2.7, 2.8, 2.10, 2.11, 4.4, 4.5, 4.6, 4.8_

- [x] 9. Update PdfPreview.tsx with Loader icon states
  - Import `Loader` from `lucide-react`
  - Replace plain "loading compiler..." text with `<Loader size={14} className="spin" aria-hidden="true" /> Loading compiler…` in `--text-muted`
  - Replace plain "compiling..." text with `<Loader size={14} className="spin" aria-hidden="true" /> Compiling…` in `--accent`
  - _Requirements: 4.13_

- [x] 10. Update ProjectSelector.tsx with Check/Square icons
  - Import `Check`, `Square` from `lucide-react`
  - Replace `{isSelected ? '✓' : ''}` inside `.project-chip__check` with `{isSelected ? <Check size={12} aria-hidden="true" /> : <Square size={12} aria-hidden="true" />}`
  - _Requirements: 2.15_

- [x] 11. Update ModelSelector.tsx with Coins icon
  - Import `Coins` from `lucide-react`
  - Replace `🪙` emoji in `.model-option__cost` with `<Coins size={14} aria-hidden="true" style={{ color: 'var(--coin-gold)' }} />`
  - _Requirements: 2.4_

- [x] 12. Update AuthModal.tsx with X icon, pill tabs, and Check/Circle password rules
  - Import `X`, `Check`, `Circle` from `lucide-react`
  - Replace all `×` close button characters with `<X size={18} aria-hidden="true" />`
  - Restyle `.auth-tabs` as a pill segmented control: wrap both tab buttons in a single `.auth-tabs__track` container with a shared rounded background; active tab gets a filled pill background; update CSS in globals.css accordingly
  - Replace `password-rules__item::before` pseudo-element approach with inline icons: `{met ? <Check size={12} aria-hidden="true" /> : <Circle size={12} aria-hidden="true" />}` inside each `<li>`, styled in `--success` / `--text-muted` respectively
  - _Requirements: 2.13, 7.3, 7.4, 7.5, 7.6_

- [x] 13. Update AdModal.tsx with X icon and fade-in claim button
  - Import `X`, `Coins` from `lucide-react`
  - Replace `×` close button with `<X size={18} aria-hidden="true" />`
  - Replace `🪙` in the claim button with `<Coins size={16} aria-hidden="true" />`
  - Add `className={adFinished ? 'btn btn--gold btn--full btn--large claim-btn--visible' : 'btn btn--gold btn--full btn--large claim-btn--hidden'}` and add `.claim-btn--hidden { opacity: 0; pointer-events: none; } .claim-btn--visible { animation: fadeIn 0.3s ease forwards; }` to globals.css
  - _Requirements: 2.13, 7.8, 7.9_

- [x] 14. Update BuyCoinsModal.tsx with X icon and Coins icon
  - Import `X`, `Coins` from `lucide-react`
  - Replace `×` close button with `<X size={18} aria-hidden="true" />`
  - Replace the `🪙` emoji `<div>` with `<Coins size={32} aria-hidden="true" style={{ color: 'var(--coin-gold)' }} />`
  - _Requirements: 2.13, 7.7_

- [x] 15. Update app/app/page.tsx — Tailor button icon, toast icons, and streaming success toast
  - Import `Wand2`, `CheckCircle`, `AlertCircle` from `lucide-react`
  - Add `<Wand2 size={16} aria-hidden="true" />` to the Tailor button idle state; keep spinner when `isStreaming`, change label to "Tailoring…"
  - Update toast JSX: success → `<CheckCircle size={16} aria-hidden="true" />` + message; error → `<AlertCircle size={16} aria-hidden="true" />` + message
  - Add a `useEffect` that watches `isStreaming`: when it transitions from `true` to `false` with no `tailorError`, call `showToast('success', 'Resume tailored successfully.')`
  - Add toast exit animation: set a `toastExiting` boolean state; when toast is set, after 2300ms set `toastExiting = true`, after 2500ms clear toast; apply `toast--exiting` class when `toastExiting` is true
  - _Requirements: 2.6, 4.1, 4.2, 4.3, 4.11, 4.12_

- [x] 16. Add light mode background and landing page polish to globals.css
  - Add `[data-theme="light"] .landing` and `[data-theme="light"] .page-shell` with a light radial gradient (warm white/cream tones)
  - Add `[data-theme="light"] .landing-header` with a frosted-glass background using light surface color
  - Add `.landing-card:hover { border-color: var(--accent); }` hover state
  - Ensure `.hero__actions .btn` and `.landing-header__nav .btn--primary` have `min-height: 48px`
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.6, 8.7_

- [x] 17. Checkpoint — build verification
  - Run `next build` (or `bun run build`) in the `tairesume` directory to confirm zero TypeScript and ESLint errors
  - Fix any import errors, missing `aria-label` attributes, or type mismatches surfaced by the build
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 18. Write unit tests for theme switching and icon presence
  - Set up Vitest + React Testing Library if not already present (`bun add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom`)
  - [ ]* 18.1 Write unit test: render Header in dark theme → click ThemeToggle → assert `html[data-theme]` flips to `'light'` and `localStorage["tairesume-theme"]` is `'light'`
    - _Requirements: 1.5, 1.6_
  - [ ]* 18.2 Write unit test: set `localStorage["tairesume-theme"] = "light"` → render app → assert `html[data-theme]` is `'light'`
    - _Requirements: 1.7_
  - [ ]* 18.3 Write unit test: mock `matchMedia` to return `prefers-color-scheme: light` with no localStorage → assert `html[data-theme]` is `'light'`
    - _Requirements: 1.4_
  - [ ]* 18.4 Write unit test: render TypstEditor with `compileStatus="success"` → assert `CheckCircle` icon is in the DOM
    - _Requirements: 4.5_
  - [ ]* 18.5 Write unit test: render TypstEditor with `compileStatus="error"` → assert `AlertCircle` icon is in the DOM
    - _Requirements: 4.6_
  - [ ]* 18.6 Write unit test: render ProjectSelector with a selected project → assert `Check` icon present; unselected → assert `Square` icon present
    - _Requirements: 2.15_
  - [ ]* 18.7 Write unit test: render AuthModal in signup mode with partial password → assert `Check` icons for met rules and `Circle` icons for unmet rules
    - _Requirements: 7.6_
  - [ ]* 18.8 Write unit test: render a disabled button → assert `opacity: 0.4` and `cursor: not-allowed`
    - _Requirements: 3.6_

- [x] 19. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The design document explicitly states property-based testing is not appropriate for this feature — all tests are unit/component tests
- The inline theme script in layout.tsx must run before React hydrates to prevent flash of wrong theme
- The `spin` CSS class (for Lucide `Loader` icons) should be added to globals.css as `.spin { animation: spin 0.6s linear infinite; }`
- All decorative icons must have `aria-hidden="true"`; icon-only buttons must have `aria-label`
- Light mode tokens should be warm and readable — avoid pure white backgrounds; use off-white (#FAFAF9 or similar)
