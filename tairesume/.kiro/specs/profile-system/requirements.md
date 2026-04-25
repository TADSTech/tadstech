# Requirements Document

## Introduction

The Profile System adds a per-user data layer to TaiResume, replacing the hardcoded `projects.ts` with Supabase-backed project and experience libraries. Users can manage their professional data (projects, work experience, personal info) through a slide-in Profile Manager drawer accessible from the app header. The system also provides JSON export capabilities and a "Resume from Scratch" builder that generates a complete Typst resume template directly into the editor. Button styling is standardised across the app with visually distinct roles (primary/secondary/destructive/gold).

The app uses Next.js, React, TypeScript, Supabase, and CSS custom properties (no Tailwind). The existing `users` table in Supabase is extended with `projects` and `experience` JSONB columns. All UI is mobile-first.

---

## Glossary

- **Profile_Manager**: The slide-in drawer component accessible from the app header that contains the Projects, Experience, and Personal Info tabs.
- **Project_Library**: The per-user collection of project entries stored in the `projects` JSONB column of the `users` table.
- **Experience_Library**: The per-user collection of work experience entries stored in the `experience` JSONB column of the `users` table.
- **Personal_Info**: The user's personal details (name, job title, email, phone, location, links, summary) stored in the `personal_info` JSONB column of the `users` table.
- **Project**: A single project entry with fields: `id` (UUID), `name`, `description`, `startDate`, `endDate`, `location`, `placeOfWork`, `skills` (string array).
- **Experience**: A single work experience entry with fields: `id` (UUID), `jobTitle`, `company`, `startDate`, `endDate`, `location`, `description`, `skills` (string array).
- **Project_Form**: The inline form within the Profile Manager used to create or edit a Project.
- **Experience_Form**: The inline form within the Profile Manager used to create or edit an Experience entry.
- **Personal_Info_Form**: The inline form within the Profile Manager used to edit Personal_Info.
- **ProjectSelector**: The existing component in the app workspace that displays toggleable project chips.
- **Resume_Builder**: The "Resume from Scratch" form that collects personal info, selected experience, and selected projects, then generates a Typst template into the editor textarea.
- **Profile_API**: The set of Supabase read/write operations for projects, experience, and personal info data.
- **Export_Service**: The client-side utility that serialises profile data to downloadable JSON files.
- **Supabase**: The backend-as-a-service providing the PostgreSQL database and authentication.
- **Typst_Template**: The generated Typst markup string that represents a complete resume.

---

## Requirements

### Requirement 1: Supabase Schema Extension

**User Story:** As a developer, I want the Supabase `users` table to store per-user projects, experience, and personal info, so that profile data persists across sessions.

#### Acceptance Criteria

1. THE Profile_API SHALL add a `projects` JSONB column (default `'[]'`) to the `public.users` table via an `ALTER TABLE` migration.
2. THE Profile_API SHALL add an `experience` JSONB column (default `'[]'`) to the `public.users` table via an `ALTER TABLE` migration.
3. THE Profile_API SHALL add a `personal_info` JSONB column (default `'{}'`) to the `public.users` table via an `ALTER TABLE` migration.
4. THE Profile_API SHALL provide `CREATE TABLE` alternatives (`user_projects` and `user_experience`) as separate SQL statements for teams that prefer normalised tables.
5. WHEN the migration SQL is executed, THE Profile_API SHALL be safe to re-run without error (idempotent via `IF NOT EXISTS` or equivalent guards).
6. THE Profile_API SHALL enforce that only the authenticated row owner can read or write their own `projects`, `experience`, and `personal_info` data via existing RLS policies on `public.users`.

---

### Requirement 2: Project Library — Read and Write

**User Story:** As a user, I want to add, edit, and delete projects in my personal library, so that I can maintain an up-to-date set of projects to include in tailored resumes.

#### Acceptance Criteria

1. WHEN the Profile_Manager is opened and the Projects tab is active, THE Profile_Manager SHALL load and display all of the authenticated user's saved projects from Supabase.
2. WHEN the user submits the Project_Form with valid data, THE Profile_API SHALL upsert the project entry into the `projects` JSONB array in `public.users` and THE Profile_Manager SHALL reflect the updated list without a full page reload.
3. WHEN the user submits the Project_Form with an empty `name` field, THE Project_Form SHALL display an inline validation error and SHALL NOT submit the data to Supabase.
4. WHEN the user clicks the delete action on a project, THE Profile_API SHALL remove that project entry from the `projects` array and THE Profile_Manager SHALL remove it from the displayed list.
5. THE Project_Form SHALL include fields for: `name` (required), `description`, `startDate`, `endDate`, `location`, `placeOfWork`, and `skills` (entered as comma-separated text, stored as a string array).
6. WHEN the user clicks "Edit" on a project chip, THE Project_Form SHALL pre-populate with that project's existing values.
7. THE Profile_Manager SHALL display a loading indicator WHILE the Profile_API is fetching or saving project data.
8. IF the Profile_API returns an error during save or delete, THEN THE Profile_Manager SHALL display an error message to the user.

---

### Requirement 3: Experience Library — Read and Write

**User Story:** As a user, I want to add, edit, and delete work experience entries in my personal library, so that I can maintain an accurate employment history for resume generation.

#### Acceptance Criteria

1. WHEN the Profile_Manager is opened and the Experience tab is active, THE Profile_Manager SHALL load and display all of the authenticated user's saved experience entries from Supabase.
2. WHEN the user submits the Experience_Form with valid data, THE Profile_API SHALL upsert the experience entry into the `experience` JSONB array in `public.users` and THE Profile_Manager SHALL reflect the updated list without a full page reload.
3. WHEN the user submits the Experience_Form with an empty `jobTitle` field, THE Experience_Form SHALL display an inline validation error and SHALL NOT submit the data to Supabase.
4. WHEN the user clicks the delete action on an experience entry, THE Profile_API SHALL remove that entry from the `experience` array and THE Profile_Manager SHALL remove it from the displayed list.
5. THE Experience_Form SHALL include fields for: `jobTitle` (required), `company`, `startDate`, `endDate`, `location`, `description`, and `skills` (entered as comma-separated text, stored as a string array).
6. WHEN the user clicks "Edit" on an experience entry, THE Experience_Form SHALL pre-populate with that entry's existing values.
7. THE Profile_Manager SHALL display a loading indicator WHILE the Profile_API is fetching or saving experience data.
8. IF the Profile_API returns an error during save or delete, THEN THE Profile_Manager SHALL display an error message to the user.

---

### Requirement 4: Personal Info — Read and Write

**User Story:** As a user, I want to save my personal information (name, contact details, links, summary) in my profile, so that it can be used when generating a resume from scratch.

#### Acceptance Criteria

1. WHEN the Profile_Manager is opened and the Personal Info tab is active, THE Profile_Manager SHALL load and display the authenticated user's saved personal info from Supabase.
2. WHEN the user submits the Personal_Info_Form, THE Profile_API SHALL write the personal info object to the `personal_info` JSONB column in `public.users` and THE Profile_Manager SHALL show a success confirmation.
3. THE Personal_Info_Form SHALL include fields for: `fullName`, `jobTitle`, `email`, `phone`, `location`, `linkedIn`, `github`, `portfolio`, and `summary`.
4. WHEN the Personal_Info_Form is opened, THE Personal_Info_Form SHALL pre-populate all fields with the user's currently saved values.
5. IF the Profile_API returns an error during save, THEN THE Profile_Manager SHALL display an error message to the user.

---

### Requirement 5: ProjectSelector Integration

**User Story:** As a user, I want the project chips in the app workspace to reflect my saved projects from Supabase, so that I can select relevant projects when tailoring a resume.

#### Acceptance Criteria

1. WHEN the app workspace loads and the user is authenticated, THE ProjectSelector SHALL display the user's projects fetched from Supabase instead of the hardcoded data from `projects.ts`.
2. WHEN the user has no saved projects, THE ProjectSelector SHALL display an empty state message prompting the user to add projects via the Profile_Manager.
3. WHEN the user adds or deletes a project in the Profile_Manager, THE ProjectSelector SHALL reflect the updated project list on the next workspace load or after the Profile_Manager is closed.
4. WHILE the user's projects are being fetched from Supabase, THE ProjectSelector SHALL display a loading state.
5. IF the Supabase fetch fails, THEN THE ProjectSelector SHALL display an error state and SHALL NOT show stale hardcoded data.

---

### Requirement 6: JSON Export

**User Story:** As a user, I want to download my profile data as JSON files, so that I can back up my data or use it in other tools.

#### Acceptance Criteria

1. WHEN the user clicks "Download projects.json" in the Profile_Manager Projects tab, THE Export_Service SHALL generate and trigger a browser download of a JSON file named `projects.json` containing the user's projects array.
2. WHEN the user clicks "Download experience.json" in the Profile_Manager Experience tab, THE Export_Service SHALL generate and trigger a browser download of a JSON file named `experience.json` containing the user's experience array.
3. WHEN the user clicks "Download profile.json" in the Profile_Manager Personal Info tab, THE Export_Service SHALL generate and trigger a browser download of a JSON file named `profile.json` containing an object with `projects`, `experience`, and `personalInfo` keys.
4. THE Export_Service SHALL produce valid, human-readable JSON with 2-space indentation.
5. WHEN the user has no data in a section, THE Export_Service SHALL export an empty array or empty object for that section rather than omitting the key.

---

### Requirement 7: Resume from Scratch Builder

**User Story:** As a user, I want to generate a complete Typst resume template from my saved profile data, so that I can create a new resume without manually writing Typst markup.

#### Acceptance Criteria

1. WHEN the user opens the Resume_Builder, THE Resume_Builder SHALL display a form with personal info fields pre-populated from the user's saved Personal_Info.
2. THE Resume_Builder SHALL allow the user to select which saved Experience entries to include via a multi-select list.
3. THE Resume_Builder SHALL allow the user to select which saved Projects to include via a multi-select list.
4. WHEN the user clicks "Generate Resume", THE Resume_Builder SHALL produce a valid Typst_Template string and write it directly into the editor textarea, replacing any existing content.
5. THE Resume_Builder SHALL generate the Typst_Template at zero coin cost.
6. THE Typst_Template SHALL include sections for: personal info header, professional summary, selected experience entries (with job title, company, dates, location, description, and skills), and selected projects (with name, dates, description, and skills).
7. WHEN the user has no saved experience or projects, THE Resume_Builder SHALL still generate a valid Typst_Template with placeholder sections for those areas.
8. WHEN the generated Typst_Template is written to the editor, THE Resume_Builder SHALL close and the editor SHALL display the new content.

---

### Requirement 8: Profile Manager UI

**User Story:** As a user, I want a slide-in drawer accessible from the app header to manage my profile data, so that I can add and edit my information without leaving the workspace.

#### Acceptance Criteria

1. THE Header SHALL display a "Profile" button that opens the Profile_Manager drawer when clicked.
2. WHEN the Profile_Manager is opened, THE Profile_Manager SHALL slide in from the right side of the screen as an overlay drawer.
3. THE Profile_Manager SHALL contain three tabs: "Projects", "Experience", and "Personal Info".
4. WHEN a tab is active, THE Profile_Manager SHALL display a list of saved items for that tab with "Edit" and "Delete" actions on each item.
5. THE Profile_Manager SHALL display an "Add" button on the Projects and Experience tabs that opens the respective inline form.
6. WHEN the Profile_Manager is open, THE Profile_Manager SHALL be closeable via a close button and by clicking the overlay backdrop.
7. THE Profile_Manager SHALL use a mobile-first layout with a minimum width of 320px and a maximum width of 480px on desktop.
8. THE Profile_Manager SHALL be accessible: all interactive elements SHALL have visible focus indicators and appropriate ARIA labels.
9. WHERE the user is not authenticated, THE Profile_Manager SHALL display a prompt to sign in rather than the profile tabs.

---

### Requirement 9: Button Color System

**User Story:** As a user, I want buttons to be visually distinct by role, so that I can immediately identify primary actions, utility actions, and destructive actions.

#### Acceptance Criteria

1. THE System SHALL apply the `--accent` color (purple) as the background for primary action buttons including "Tailor Resume", "Save", "Add", and "Generate Resume".
2. THE System SHALL apply the `--coin-gold` color as the background for secondary utility buttons including "Watch Ad".
3. THE System SHALL apply the `--error` color as the background for destructive buttons including all "Delete" actions.
4. THE System SHALL apply the `--surface` background with `--border` border for neutral secondary buttons such as "Cancel" and "Close".
5. WHEN a primary button is in a disabled state, THE System SHALL render it at 40% opacity with `cursor: not-allowed`.
6. WHEN a button is hovered and not disabled, THE System SHALL apply a `translateY(-1px)` transform and a subtle box-shadow to indicate interactivity.
7. THE System SHALL ensure all button text meets WCAG AA contrast ratio (4.5:1) against its background color.
