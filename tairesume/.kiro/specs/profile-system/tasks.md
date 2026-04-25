# Implementation Plan: Profile System

## Overview

Implement a per-user profile data layer backed by Supabase, surfaced through a slide-in Profile Manager drawer. The work proceeds in layers: schema → types → data layer → context → UI components → integration → styling.

## Tasks

- [x] 1. Extend Supabase schema and update SQL setup file
  - Add `ALTER TABLE public.users ADD COLUMN IF NOT EXISTS projects jsonb NOT NULL DEFAULT '[]'::jsonb` to `supabase-setup.sql`
  - Add `ALTER TABLE public.users ADD COLUMN IF NOT EXISTS experience jsonb NOT NULL DEFAULT '[]'::jsonb` to `supabase-setup.sql`
  - Add `ALTER TABLE public.users ADD COLUMN IF NOT EXISTS personal_info jsonb NOT NULL DEFAULT '{}'::jsonb` to `supabase-setup.sql`
  - Include optional normalised-table alternatives (`user_projects`, `user_experience`) as commented-out `CREATE TABLE` statements
  - All three `ALTER TABLE` statements must use `IF NOT EXISTS` guards so the migration is safe to re-run
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2. Add new TypeScript types to `src/types/index.ts`
  - Add `ProfileProject` interface: `id`, `name`, `description`, `startDate`, `endDate`, `location`, `placeOfWork`, `skills`
  - Add `Experience` interface: `id`, `jobTitle`, `company`, `startDate`, `endDate`, `location`, `description`, `skills`
  - Add `PersonalInfo` interface: `fullName`, `jobTitle`, `email`, `phone`, `location`, `linkedIn`, `github`, `portfolio`, `summary`
  - Add `EMPTY_PERSONAL_INFO` constant
  - Keep existing `Project` type and `ProjectsData` type unchanged for backward compatibility
  - _Requirements: 2.5, 3.5, 4.3_

- [x] 3. Implement Profile API (`src/lib/profile.ts`)
  - [x] 3.1 Implement `getProfileData(uid)` — reads `projects`, `experience`, `personal_info` columns from `public.users` using the existing `supabase` client from `src/lib/supabase.ts`; returns typed `{ projects, experience, personalInfo }`
    - _Requirements: 2.1, 3.1, 4.1_
  - [x] 3.2 Implement `saveProject(uid, project)` — read-modify-write: fetch current `projects` array, upsert by `id`, write back
    - _Requirements: 2.2_
  - [x] 3.3 Implement `deleteProject(uid, projectId)` — read-modify-write: fetch current array, filter out by `id`, write back
    - _Requirements: 2.4_
  - [x] 3.4 Implement `saveExperience(uid, entry)` — same read-modify-write pattern as `saveProject`
    - _Requirements: 3.2_
  - [x] 3.5 Implement `deleteExperience(uid, entryId)` — same read-modify-write pattern as `deleteProject`
    - _Requirements: 3.4_
  - [x] 3.6 Implement `savePersonalInfo(uid, info)` — overwrite the entire `personal_info` column
    - _Requirements: 4.2_

- [x] 4. Implement Export Service (`src/lib/export.ts`)
  - Implement `downloadJson(filename, data)` — creates a `Blob`, temporary `<a>` element, triggers `.click()`, removes element; uses `JSON.stringify(data, null, 2)`
  - Implement `exportProjects(projects)` — calls `downloadJson('projects.json', projects)`
  - Implement `exportExperience(experience)` — calls `downloadJson('experience.json', experience)`
  - Implement `exportFullProfile(projects, experience, personalInfo)` — calls `downloadJson('profile.json', { projects, experience, personalInfo })`
  - Empty arrays/objects must be exported as `[]` / `{}`, not omitted
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 5. Implement Resume Builder utility (`src/lib/resumeBuilder.ts`)
  - Implement `generateTypstResume(personalInfo, experience, projects)` — returns a complete Typst document string
  - Template must include: personal info header, professional summary, experience section (jobTitle, company, dates, location, description, skills), projects section (name, dates, description, skills)
  - When `experience` or `projects` arrays are empty, include placeholder sections with comment markers
  - _Requirements: 7.4, 7.6, 7.7_

- [x] 6. Implement ProfileContext (`src/context/ProfileContext.tsx`)
  - [x] 6.1 Define `ProfileContextValue` interface and create context with `createContext`
    - Fields: `projects`, `experience`, `personalInfo`, `loading`, `error`, `refresh`, `saveProject`, `deleteProject`, `saveExperience`, `deleteExperience`, `savePersonalInfo`
    - _Requirements: 2.1, 3.1, 4.1_
  - [x] 6.2 Implement `ProfileProvider` component
    - Fetch all three data types on mount when user is authenticated (use `useAuth` hook)
    - Apply optimistic updates to local state immediately; restore previous state on error
    - Expose `refresh()` to re-fetch from Supabase
    - _Requirements: 2.2, 2.4, 3.2, 3.4, 4.2, 5.1, 5.3_
  - [x] 6.3 Export `useProfile` convenience hook that calls `useContext(ProfileContext)` and throws if used outside provider
    - _Requirements: 5.1_

- [x] 7. Checkpoint — Ensure data layer compiles without TypeScript errors
  - Run `tsc --noEmit` in the `tairesume` directory; fix any type errors before proceeding.

- [x] 8. Implement `ProjectForm` component (`src/components/ProjectForm.tsx`)
  - Fields: `name` (required), `description`, `startDate`, `endDate`, `location`, `placeOfWork`, `skills` (comma-separated input → string array on save)
  - Validate that `name` is non-empty after trimming; show inline error below the field; do not call `onSave` if invalid
  - Pre-populate all fields from `initial` prop when provided (edit mode)
  - Accept `saving` prop to disable submit button and show spinner while saving
  - _Requirements: 2.3, 2.5, 2.6_

- [x] 9. Implement `ExperienceForm` component (`src/components/ExperienceForm.tsx`)
  - Fields: `jobTitle` (required), `company`, `startDate`, `endDate`, `location`, `description`, `skills` (comma-separated)
  - Validate that `jobTitle` is non-empty after trimming; show inline error; do not call `onSave` if invalid
  - Pre-populate all fields from `initial` prop when provided (edit mode)
  - Accept `saving` prop to disable submit button and show spinner while saving
  - _Requirements: 3.3, 3.5, 3.6_

- [x] 10. Implement `PersonalInfoForm` component (`src/components/PersonalInfoForm.tsx`)
  - Fields: `fullName`, `jobTitle`, `email`, `phone`, `location`, `linkedIn`, `github`, `portfolio`, `summary`
  - Pre-populate all fields from `ProfileContext.personalInfo` on render
  - Accept `saving` prop to disable submit button and show spinner while saving
  - _Requirements: 4.3, 4.4_

- [x] 11. Implement `ResumeBuilder` component (`src/components/ResumeBuilder.tsx`)
  - [x] 11.1 Render a modal/panel with personal info fields pre-filled from `ProfileContext.personalInfo`
    - _Requirements: 7.1_
  - [x] 11.2 Render a multi-select list of experience entries from `ProfileContext.experience`; all entries selected by default
    - _Requirements: 7.2_
  - [x] 11.3 Render a multi-select list of projects from `ProfileContext.projects`; all entries selected by default
    - _Requirements: 7.3_
  - [x] 11.4 On "Generate Resume" click: call `generateTypstResume(personalInfo, selectedExperience, selectedProjects)`, pass result to `onGenerate` prop, then close
    - Generation is zero-cost (no coin spend)
    - _Requirements: 7.4, 7.5, 7.8_

- [x] 12. Implement `ProfileManager` component (`src/components/ProfileManager.tsx`)
  - [x] 12.1 Render the slide-in drawer shell: fixed overlay, `transform: translateX(100%)` when closed, `translateX(0)` when open, semi-transparent backdrop behind it
    - Minimum width 320px, maximum width 480px (`width: min(480px, 100vw)`)
    - Close on backdrop click and on close button click
    - _Requirements: 8.2, 8.6, 8.7_
  - [x] 12.2 Render three tabs ("Projects", "Experience", "Personal Info") and track `activeTab` in local state
    - _Requirements: 8.3_
  - [x] 12.3 Implement Projects tab: list saved projects with "Edit" and "Delete" actions; "Add" button opens `ProjectForm`; "Edit" pre-populates form; loading indicator while `ProfileContext.loading`; error message if `ProfileContext.error`; export button triggers `exportProjects`
    - Use `btn--danger` class for Delete buttons
    - _Requirements: 2.1, 2.2, 2.4, 2.7, 2.8, 6.1, 8.4, 8.5, 9.3_
  - [x] 12.4 Implement Experience tab: list saved experience entries with "Edit" and "Delete" actions; "Add" button opens `ExperienceForm`; loading indicator; error message; export button triggers `exportExperience`
    - Use `btn--danger` class for Delete buttons
    - _Requirements: 3.1, 3.2, 3.4, 3.7, 3.8, 6.2, 8.4, 8.5, 9.3_
  - [x] 12.5 Implement Personal Info tab: render `PersonalInfoForm` pre-populated from context; success confirmation after save; export button triggers `exportFullProfile`
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 6.3_
  - [x] 12.6 Add ARIA labels to all interactive elements; ensure visible focus indicators on all buttons and inputs
    - _Requirements: 8.8_
  - [x] 12.7 When user is not authenticated, render a sign-in prompt instead of the tabs
    - _Requirements: 8.9_

- [x] 13. Modify `Header` (`src/components/Header.tsx`)
  - Import `User` icon from `lucide-react`
  - Add a "Profile" button (ghost style, `User` icon at 16px) between the coin balance and the theme toggle
  - Button is only rendered when `user` is authenticated (not during loading, not when signed out)
  - Button calls `onOpenProfile` prop (or equivalent callback) to open the `ProfileManager`
  - _Requirements: 8.1_

- [x] 14. Modify `ProjectSelector` (`src/components/ProjectSelector.tsx`)
  - Remove `projects: Project[]` prop; read `projects`, `loading`, and `error` from `useProfile()` instead
  - Map `ProfileProject[]` to the chip display (use `project.name` as key and label)
  - Show a loading skeleton (or spinner) while `loading` is true
  - Show an empty-state message ("No projects yet — add some in your Profile") when `projects` is empty and not loading
  - Show an error message if `error` is set
  - _Requirements: 5.1, 5.2, 5.4, 5.5_

- [x] 15. Modify `src/app/app/page.tsx`
  - [x] 15.1 Wrap the authenticated workspace with `<ProfileProvider>` (inside `AuthProvider` / after auth check)
    - _Requirements: 5.1_
  - [x] 15.2 Add `showProfileManager` and `showResumeBuilder` boolean state; pass `onOpenProfile` to `<Header>`; render `<ProfileManager>` and `<ResumeBuilder>` alongside existing modals
    - _Requirements: 8.1, 8.2_
  - [x] 15.3 Remove `const projects = useMemo(() => getProjects(), [])` and the `getProjects` import; remove `projects` prop from `<ProjectSelector>`
    - _Requirements: 5.1_
  - [x] 15.4 Map `ProfileProject[]` to `Project[]` when building the tailor request: `{ name, desc: project.description, startDate, endDate, location, placeOfWork, skills }`; filter by `selectedProjects` names
    - _Requirements: 5.1_
  - [x] 15.5 Wire `<ResumeBuilder onGenerate={(typst) => setTypstCode(typst)} />` so generated Typst replaces editor content
    - _Requirements: 7.4, 7.8_
  - [x] 15.6 Update "Watch Ad" button to use `btn--gold` class; update "Buy Coins" button to use `btn--primary` class
    - _Requirements: 9.1, 9.2_

- [x] 16. Update `globals.css` with button color system and drawer styles
  - [x] 16.1 Add `btn--danger` class: `background: var(--error-dim)`, `border-color: rgba(239,68,68,0.3)`, `color: var(--error)`; hover darkens background
    - _Requirements: 9.3_
  - [x] 16.2 Verify `btn--gold` class already exists (it does); verify `btn--primary` uses `--accent`; no changes needed if already correct
    - _Requirements: 9.1, 9.2_
  - [x] 16.3 Add profile drawer CSS: `.profile-drawer` (fixed, right-anchored, `transform: translateX(100%)`, `transition: transform 0.3s ease`, `z-index: 500`, `width: min(480px, 100vw)`), `.profile-drawer--open` (`transform: translateX(0)`), `.profile-backdrop` (fixed inset, `z-index: 499`, semi-transparent)
    - _Requirements: 8.2, 8.7_
  - [x] 16.4 Add profile manager inner styles: `.profile-drawer__header`, `.profile-drawer__tabs`, `.profile-tab`, `.profile-tab--active`, `.profile-drawer__body`, `.profile-item`, `.profile-item__actions`, `.profile-form`, `.profile-form__field`, `.profile-form__error`, `.profile-empty-state`
    - All styles mobile-first; drawer body scrollable
    - _Requirements: 8.3, 8.4, 8.5, 8.7_

- [x] 17. Final checkpoint — Build verification
  - Run `next build` (or `tsc --noEmit` + `eslint`) in the `tairesume` directory
  - Fix any TypeScript or lint errors
  - Ensure all imports resolve and no orphaned code remains

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The existing `Project` type and `getProjects()` function in `projects.ts` are kept; only `page.tsx` stops calling `getProjects()` — `projects.ts` itself is not deleted
- `ProfileProject.description` maps to `Project.desc` when constructing tailor API requests
- All Supabase calls go through the existing `supabase` client in `src/lib/supabase.ts`; no new client setup needed
- The `ProfileProvider` must be placed inside the auth-check guard in `page.tsx` so it only mounts for authenticated users
