# Design Document: Profile System

## Overview

The Profile System adds a per-user data layer to TaiResume. It replaces the hardcoded `projects.ts` with Supabase-backed project and experience libraries, adds a personal info store, and surfaces all of this through a slide-in Profile Manager drawer accessible from the app header.

The feature has five concrete deliverables:

1. **Supabase schema extension** — three new JSONB columns (`projects`, `experience`, `personal_info`) on the existing `public.users` table.
2. **Profile API** — a `src/lib/profile.ts` module with typed read/write helpers for all three data types.
3. **Profile Manager drawer** — a `ProfileManager` component with Projects, Experience, and Personal Info tabs, inline CRUD forms, and JSON export buttons.
4. **ProjectSelector integration** — the existing `ProjectSelector` component reads from Supabase instead of the hardcoded `projects.ts`.
5. **Resume from Scratch builder** — a form that generates a complete Typst template from saved profile data and writes it into the editor.

The app stack is Next.js 16 / React 19 / TypeScript / Supabase / CSS custom properties (no Tailwind). All UI is mobile-first. No new npm packages are required — `lucide-react` and `@supabase/supabase-js` are already installed.

### Design Philosophy

The Profile Manager follows the same visual language as the rest of the app: `--surface` backgrounds, `--border` borders, `--accent` for primary actions, `--error` for destructive actions, and `--coin-gold` for utility actions. The drawer slides in from the right as a fixed overlay, keeping the workspace visible behind it.

Data flow is unidirectional: Supabase is the source of truth. The Profile Manager fetches on open, writes on save/delete, and notifies the workspace via a shared React context so the `ProjectSelector` stays in sync without a page reload.

---

## Architecture

```
tairesume/src/
├── app/
│   └── app/page.tsx          ← add ProfileManager, pass profile context
├── components/
│   ├── Header.tsx             ← add "Profile" button
│   ├── ProfileManager.tsx     ← NEW: slide-in drawer with tabs
│   ├── ProjectForm.tsx        ← NEW: inline create/edit form for projects
│   ├── ExperienceForm.tsx     ← NEW: inline create/edit form for experience
│   ├── PersonalInfoForm.tsx   ← NEW: inline form for personal info
│   ├── ResumeBuilder.tsx      ← NEW: "Resume from Scratch" modal/panel
│   └── ProjectSelector.tsx   ← modified: reads from ProfileContext
├── context/
│   ├── ThemeContext.tsx        ← unchanged
│   └── ProfileContext.tsx     ← NEW: shared projects/experience/personalInfo state
├── lib/
│   ├── profile.ts             ← NEW: Supabase CRUD helpers
│   ├── export.ts              ← NEW: JSON download utility
│   ├── resumeBuilder.ts       ← NEW: Typst template generator
│   └── projects.ts            ← kept for fallback / unauthenticated state
└── types/
    └── index.ts               ← extended with ProfileProject, Experience, PersonalInfo
```

### Data Flow

```
Supabase public.users
  │  (projects / experience / personal_info JSONB columns)
  │
  ▼
profile.ts (read/write helpers)
  │
  ▼
ProfileContext (React context — source of truth in the browser)
  │
  ├──► ProfileManager drawer (CRUD UI)
  │         └──► ProjectForm / ExperienceForm / PersonalInfoForm
  │
  ├──► ProjectSelector (reads projects from context)
  │
  └──► ResumeBuilder (reads all three from context)
              └──► resumeBuilder.ts (generates Typst string)
                        └──► TypstEditor textarea
```

### Drawer Slide-in Mechanism

The `ProfileManager` is rendered at the root of `app/app/page.tsx` (alongside the existing modals). It is always mounted but conditionally visible. CSS transitions handle the slide-in:

```css
.profile-drawer {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: min(480px, 100vw);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 500;
}

.profile-drawer--open {
  transform: translateX(0);
}
```

A semi-transparent backdrop (`position: fixed; inset: 0; z-index: 499`) is rendered behind the drawer when open and dismissed on click.

---

## Components and Interfaces

### ProfileContext (`src/context/ProfileContext.tsx`)

```typescript
interface ProfileContextValue {
  projects: ProfileProject[];
  experience: Experience[];
  personalInfo: PersonalInfo;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  saveProject: (project: ProfileProject) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveExperience: (entry: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  savePersonalInfo: (info: PersonalInfo) => Promise<void>;
}
```

The context is provided in `app/app/page.tsx` (inside `AuthProvider`). It fetches all three data types on mount when the user is authenticated, and re-fetches when `refresh()` is called. Optimistic updates are applied immediately to local state; on error the previous state is restored.

### ProfileManager (`src/components/ProfileManager.tsx`)

Props:
```typescript
interface ProfileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateResume: (typst: string) => void;
}
```

Internal state:
- `activeTab: 'projects' | 'experience' | 'personalInfo'`
- `editingProject: ProfileProject | null`
- `editingExperience: Experience | null`
- `showProjectForm: boolean`
- `showExperienceForm: boolean`

The component reads from `ProfileContext` — no direct Supabase calls. It delegates all mutations to the context methods.

### ProjectForm (`src/components/ProjectForm.tsx`)

```typescript
interface ProjectFormProps {
  initial?: ProfileProject;
  onSave: (project: ProfileProject) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}
```

Fields: `name` (required), `description`, `startDate`, `endDate`, `location`, `placeOfWork`, `skills` (comma-separated input → string array on save).

Validation: `name` must be non-empty after trimming. Inline error shown below the field.

### ExperienceForm (`src/components/ExperienceForm.tsx`)

```typescript
interface ExperienceFormProps {
  initial?: Experience;
  onSave: (entry: Experience) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}
```

Fields: `jobTitle` (required), `company`, `startDate`, `endDate`, `location`, `description`, `skills` (comma-separated).

### PersonalInfoForm (`src/components/PersonalInfoForm.tsx`)

```typescript
interface PersonalInfoFormProps {
  onSave: (info: PersonalInfo) => Promise<void>;
  saving: boolean;
}
```

Fields: `fullName`, `jobTitle`, `email`, `phone`, `location`, `linkedIn`, `github`, `portfolio`, `summary`.

Pre-populated from `ProfileContext.personalInfo` on render.

### ResumeBuilder (`src/components/ResumeBuilder.tsx`)

```typescript
interface ResumeBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (typst: string) => void;
}
```

Reads `ProfileContext` for pre-population. Renders a form with:
- Personal info fields (editable, pre-filled from saved data)
- Multi-select list of experience entries
- Multi-select list of projects

On "Generate Resume": calls `generateTypstResume(personalInfo, selectedExperience, selectedProjects)` from `resumeBuilder.ts`, passes the result to `onGenerate`, then closes.

### Header (`src/components/Header.tsx`)

Adds a "Profile" button (using `User` icon from lucide-react, 16px) between the coin balance and the theme toggle. The button opens the `ProfileManager` drawer. The button is only shown when the user is authenticated.

### ProjectSelector (`src/components/ProjectSelector.tsx`)

Modified to read from `ProfileContext.projects` instead of the hardcoded `getProjects()`. Shows a loading skeleton while `ProfileContext.loading` is true. Shows an empty-state message when the user has no projects. Shows an error message if `ProfileContext.error` is set.

---

## Data Models

### Extended TypeScript types (`src/types/index.ts`)

```typescript
// Replaces the existing Project type for profile-stored projects
export interface ProfileProject {
  id: string;           // UUID (crypto.randomUUID())
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string | null;
  placeOfWork: string | null;
  skills: string[];
}

export interface Experience {
  id: string;           // UUID
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  skills: string[];
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  summary: string;
}

export const EMPTY_PERSONAL_INFO: PersonalInfo = {
  fullName: '', jobTitle: '', email: '', phone: '',
  location: '', linkedIn: '', github: '', portfolio: '', summary: '',
};
```

The existing `Project` type (used by the tailor API) is kept as-is for backward compatibility. The `ProfileProject` type maps to it when constructing tailor requests: `description` → `desc`.

### Supabase schema (`public.users` table additions)

```sql
-- Migration: add profile columns
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS projects     jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS experience   jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS personal_info jsonb NOT NULL DEFAULT '{}'::jsonb;
```

The existing RLS policies (`users: owner read`, `users: owner update`) already cover these columns — no new policies needed.

### Profile API (`src/lib/profile.ts`)

```typescript
// Read all profile data for a user
export async function getProfileData(uid: string): Promise<{
  projects: ProfileProject[];
  experience: Experience[];
  personalInfo: PersonalInfo;
}>

// Upsert a single project (insert or replace by id)
export async function saveProject(uid: string, project: ProfileProject): Promise<void>

// Remove a project by id
export async function deleteProject(uid: string, projectId: string): Promise<void>

// Upsert a single experience entry
export async function saveExperience(uid: string, entry: Experience): Promise<void>

// Remove an experience entry by id
export async function deleteExperience(uid: string, entryId: string): Promise<void>

// Overwrite the entire personal_info object
export async function savePersonalInfo(uid: string, info: PersonalInfo): Promise<void>
```

All functions use the existing `supabase` client from `src/lib/supabase.ts`. Array mutations (save/delete) use a read-modify-write pattern: fetch the current array, apply the change, write back. This is safe because the `users` table has row-level locking via RLS and concurrent edits from the same user are unlikely.

### Export Service (`src/lib/export.ts`)

```typescript
export function downloadJson(filename: string, data: unknown): void
export function exportProjects(projects: ProfileProject[]): void
export function exportExperience(experience: Experience[]): void
export function exportFullProfile(projects: ProfileProject[], experience: Experience[], personalInfo: PersonalInfo): void
```

`downloadJson` creates a `Blob` with `application/json`, creates a temporary `<a>` element, triggers `.click()`, and removes the element. Uses `JSON.stringify(data, null, 2)` for human-readable output.

### Resume Builder (`src/lib/resumeBuilder.ts`)

```typescript
export function generateTypstResume(
  personalInfo: PersonalInfo,
  experience: Experience[],
  projects: ProfileProject[],
): string
```

Returns a complete Typst document string. The template uses Typst's built-in layout primitives. Placeholder sections are included when `experience` or `projects` arrays are empty.

---
