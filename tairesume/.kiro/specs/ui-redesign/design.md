# Design Document: UI Redesign

## Overview

TaiResume's current UI is functional but feels generic — it reads as a dark-mode SaaS template rather than a focused, human-scale tool. The redesign addresses five concrete pain points:

1. **No light mode** — users in bright environments have no alternative.
2. **No iconography** — every action is text-only, making the interface harder to scan.
3. **Weak affordances** — buttons lack hover elevation, focus rings, and consistent sizing.
4. **Incomplete feedback** — some actions (streaming, compilation, uploads) don't communicate their state clearly enough.
5. **Browser-default scrollbars** — jarring against the custom dark surface.

The redesign is purely visual and interaction-layer work. No API routes, data models, or business logic change. All existing component props and hooks remain intact. The implementation touches `globals.css`, `layout.tsx`, and every component file, plus adds one new `ThemeProvider` context and installs `lucide-react`.

### Design Philosophy

The target aesthetic is **tool-like and human** — closer to a code editor or design tool than a marketing SaaS page. Concretely:

- Every interactive element has an icon *and* a label (or an `aria-label` when icon-only).
- State changes are always visible: spinners during async work, colored status badges after completion.
- The color system is semantic — accent, success, error, muted — so both light and dark themes can swap values without restructuring markup.
- Spacing is systematic: 8px base unit, 16px panel gaps, 20px panel padding, 44px toolbar height, 56px header height.

---

## Architecture

The redesign introduces one new piece of infrastructure — a theme system — and otherwise modifies existing files in place.

```
tairesume/src/
├── app/
│   ├── layout.tsx          ← add ThemeProvider, next/font, inline theme script
│   ├── globals.css         ← complete rewrite: light/dark tokens, scrollbars, icons
│   └── app/page.tsx        ← minor: icon imports, toast icons
├── components/
│   ├── Header.tsx          ← ThemeToggle button, Lucide icons, fixed 56px height
│   ├── ResumeInput.tsx     ← Upload icon, feedback states
│   ├── JobInput.tsx        ← Globe icon, feedback states
│   ├── TypstEditor.tsx     ← Play/Download/Copy/Upload icons, status badge
│   ├── PdfPreview.tsx      ← Loader icon for compiler loading state
│   ├── ProjectSelector.tsx ← Check/Square icons replacing text checkmarks
│   ├── ModelSelector.tsx   ← Coins icon replacing emoji
│   ├── AuthModal.tsx       ← X icon, pill tabs, Check/Circle password rules
│   ├── AdModal.tsx         ← X icon, monospace countdown, fade-in claim button
│   └── BuyCoinsModal.tsx   ← Coins icon replacing emoji
└── context/
    └── ThemeContext.tsx     ← NEW: theme state, localStorage persistence, SSR guard
```

### Theme System Architecture

The theme is stored as a `data-theme` attribute on `<html>`. CSS custom properties are scoped to `[data-theme="dark"]` and `[data-theme="light"]`. An inline `<script>` in `<head>` reads `localStorage` before React hydrates, preventing a flash of the wrong theme.

```
localStorage["tairesume-theme"]
        │
        ▼
  inline <script> (layout.tsx <head>)
        │  sets html[data-theme] synchronously
        ▼
  CSS custom properties resolve
        │
        ▼
  React hydrates → ThemeContext reads html[data-theme]
        │
        ▼
  ThemeToggle button reflects current theme
```

### Icon System Architecture

`lucide-react` exports individual SVG components. Each is imported at the call site — no global registry, no icon font. Icons are sized via a `size` prop (16 for inline-with-label, 18 for icon-only buttons). Decorative icons carry `aria-hidden="true"`; icon-only buttons carry a sibling `<span className="sr-only">`.

---

## Components and Interfaces

### ThemeContext (`src/context/ThemeContext.tsx`)

```typescript
type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// Reads html[data-theme] on mount (set by inline script).
// Writes to localStorage and html[data-theme] on toggle.
// Provides theme + toggleTheme to all consumers.
```

### Header (`src/components/Header.tsx`)

New additions:
- `ThemeToggle` button: renders `Sun` (in dark mode) or `Moon` (in light mode) from lucide-react, 18px, with `aria-label`.
- `ArrowLeft` icon on the "back to home" link, 16px, `aria-hidden`.
- `Coins` icon replacing the 🪙 emoji in `CoinBalance`, 16px, `aria-hidden`.
- Fixed height via `.header { height: 56px }`.

### TypstEditor (`src/components/TypstEditor.tsx`)

Toolbar button icon mapping:
| Button | Idle icon | Active icon |
|---|---|---|
| Upload | `Upload` (16px) | `Loader` spinner |
| Compile | `Play` (16px) | `Loader` spinner |
| Download | `Download` (16px) | — |
| Copy | `Copy` (16px) | — |

Status badge (replaces plain text):
- Success: `CheckCircle` (14px, `--success` color) + "Compiled"
- Error: `AlertCircle` (14px, `--error` color) + "Error"
- Streaming: `Loader` spinner (14px, `--accent` color) + "Streaming…"

### PdfPreview (`src/components/PdfPreview.tsx`)

- Compiler loading: `Loader` spinner (14px) + "Loading compiler…" in `--text-muted`.
- Compiling: `Loader` spinner (14px) + "Compiling…" in `--accent`.

### ResumeInput (`src/components/ResumeInput.tsx`)

- Upload button: `Upload` icon (16px) + "Upload PDF" label.
- Importing state: `Loader` spinner + "Importing…" label, button disabled.

### JobInput (`src/components/JobInput.tsx`)

- Scrape button: `Globe` icon (16px) + "Scrape" label.
- Scraping state: `Loader` spinner, button disabled.
- Error: inline `<p>` in `--error` color below URL input.

### ProjectSelector (`src/components/ProjectSelector.tsx`)

- Selected chip: `Check` icon (12px) inside `.project-chip__check`, accent background.
- Unselected chip: `Square` icon (12px) inside `.project-chip__check`, muted border.

### ModelSelector (`src/components/ModelSelector.tsx`)

- `Coins` icon (14px, `--coin-gold`) replacing 🪙 emoji in cost display.

### AuthModal (`src/components/AuthModal.tsx`)

- Close button: `X` icon (18px) replacing `×` character.
- Tabs: pill-style segmented control (single rounded container, active tab has filled background).
- Password rules: `Check` icon (12px, `--success`) when met; `Circle` icon (12px, `--text-muted`) when unmet.

### AdModal (`src/components/AdModal.tsx`)

- Close button: `X` icon (18px).
- Countdown: `font-family: var(--font-mono)`, 48px, `--accent` color.
- Claim button: fades in with `animation: fadeIn 0.3s ease` when `adFinished` becomes true.
- Overlay click blocked during countdown (existing behavior preserved).

### BuyCoinsModal (`src/components/BuyCoinsModal.tsx`)

- Close button: `X` icon (18px).
- Coin display: `Coins` icon (32px, `--coin-gold`) replacing 🪙 emoji.

### Toast (inline in `app/app/page.tsx`)

- Success: `CheckCircle` icon (16px, `--success`) + message.
- Error: `AlertCircle` icon (16px, `--error`) + message.
- Exit animation: `fadeOut` keyframe triggered by a `toast--exiting` class applied 200ms before removal.

---

## Data Models

No new data models. The only new persistent state is the theme preference:

```
localStorage key: "tairesume-theme"
value: "light" | "dark"
```

The `ThemeContext` holds `theme: Theme` in React state. No server-side storage, no database changes.

---

## Error Handling

| Scenario | Current behavior | Redesigned behavior |
|---|---|---|
| Scrape API fails | Inline text in `--error` color | Same, now with `AlertCircle` icon prefix |
| Tailor stream fails | Error text below tailor button | Error Toast with `AlertCircle` icon |
| Compile error | `✗ compile error` text in toolbar | `AlertCircle` icon + "Error" badge in toolbar |
| PDF upload fails | Toast | Toast with `AlertCircle` icon |
| Typst upload fails | Toast | Toast with `AlertCircle` icon |
| Coin spend fails | Toast | Toast with `AlertCircle` icon |
| localStorage unavailable (SSR) | N/A | Inline script wrapped in try/catch; falls back to dark mode |
| `lucide-react` import error | N/A | Build-time error — caught during `next build` |

The inline theme script must be wrapped in a try/catch to handle environments where `localStorage` is blocked (private browsing with strict settings, SSR):

```html
<script dangerouslySetInnerHTML={{ __html: `
  try {
    var t = localStorage.getItem('tairesume-theme');
    var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t || preferred);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
` }} />
```

---

## Testing Strategy

This feature is a UI redesign — CSS variables, component rendering, icon integration, theme switching, and visual polish. All acceptance criteria are specific examples, configuration checks, or visual/interaction scenarios. There are no pure functions with large input spaces, no parsers, no serializers, and no data transformations. Property-based testing is not appropriate here.

The appropriate testing strategies are:

### Unit / Component Tests (Vitest + React Testing Library)

Focus on specific behavioral examples:

- **Theme switching**: render Header with dark theme → click ThemeToggle → assert `html[data-theme]` flips to "light" and `localStorage["tairesume-theme"]` is "light".
- **Theme persistence**: set `localStorage["tairesume-theme"] = "light"` → render app → assert `html[data-theme]` is "light" without flash.
- **OS preference fallback**: mock `matchMedia` to return `prefers-color-scheme: light` with no localStorage → assert dark mode is NOT applied.
- **Icon presence**: render each component → assert the expected Lucide icon is in the DOM (by `data-testid` or `aria-label`).
- **Button disabled state**: render Tailor button with `disabled` → assert `cursor: not-allowed` and `opacity: 0.4`.
- **Feedback states**: mock streaming/compiling/uploading states → assert correct spinner/label/badge appears.
- **Toast icons**: trigger success toast → assert `CheckCircle` icon present; trigger error toast → assert `AlertCircle` icon present.
- **Modal close icon**: render AuthModal → assert `X` icon present, not `×` character.
- **Password rules icons**: render signup form with partial password → assert `Check` icons for met rules, `Circle` icons for unmet rules.
- **AdModal countdown**: advance timers → assert claim button fades in at t=0.
- **ProjectSelector icons**: render with selected project → assert `Check` icon; unselected → assert `Square` icon.

### Snapshot Tests

- Snapshot the full `globals.css` token block for both `[data-theme="light"]` and `[data-theme="dark"]` to catch accidental regressions.
- Snapshot each component's rendered output in both themes.

### Accessibility Tests (axe-core via `@axe-core/react` or `jest-axe`)

- Run axe on the full app page in both light and dark themes.
- Assert zero violations at WCAG AA level.
- Specifically check: all icon-only buttons have `aria-label`; all decorative icons have `aria-hidden="true"`; focus ring is visible on all interactive elements.

### Manual / Visual QA Checklist

The following cannot be fully automated and require manual review:

- Custom scrollbar appearance in Chrome, Firefox, and Safari.
- Hover elevation (`translateY(-2px)` + box-shadow) on buttons.
- Frosted-glass landing header in both themes.
- AdModal countdown monospace font rendering.
- Toast slide-up entrance and fade-out exit animations.
- PDF preview iframe background (white) against both themes.
- Mobile layout stacking at 768px breakpoint.

### Test Configuration

- Test runner: Vitest (already in the Next.js ecosystem).
- Component rendering: React Testing Library.
- Accessibility: `jest-axe` or `@axe-core/react`.
- No property-based testing library is needed for this feature.
