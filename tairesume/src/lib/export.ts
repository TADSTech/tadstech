import { ProfileProject, Experience, PersonalInfo } from '@/types';

// ── Export ────────────────────────────────────────────────────────────────────

export function downloadJson(filename: string, data: unknown): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportProjects(projects: ProfileProject[]): void {
  downloadJson('projects.json', projects);
}

export function exportExperience(experience: Experience[]): void {
  downloadJson('experience.json', experience);
}

export function exportFullProfile(
  projects: ProfileProject[],
  experience: Experience[],
  personalInfo: PersonalInfo,
): void {
  downloadJson('profile.json', { projects, experience, personalInfo });
}

// ── Import / Parse ────────────────────────────────────────────────────────────

/** Read a File as text and parse JSON, throwing a user-friendly error on failure. */
async function readJsonFile(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        resolve(JSON.parse(e.target?.result as string));
      } catch {
        reject(new Error(`${file.name} is not valid JSON.`));
      }
    };
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsText(file);
  });
}

/**
 * Parse a projects JSON file.
 *
 * Accepts two shapes:
 *   1. Array of ProfileProject  — { id, name, description, ... }
 *   2. Legacy projects.json     — { projects: [{ name, desc, ... }] }  (no id, uses `desc`)
 *
 * Returns a ProfileProject[] with UUIDs assigned to any entry missing an id.
 */
export async function importProjectsFromFile(file: File): Promise<ProfileProject[]> {
  const raw = await readJsonFile(file);

  // Unwrap { projects: [...] } wrapper if present
  let items: unknown[] = [];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && typeof raw === 'object' && Array.isArray((raw as Record<string, unknown>).projects)) {
    items = (raw as Record<string, unknown>).projects as unknown[];
  } else {
    throw new Error('Expected an array of projects or { projects: [...] }.');
  }

  return items.map((item) => {
    const p = item as Record<string, unknown>;
    if (!p.name || typeof p.name !== 'string') {
      throw new Error('Each project must have a "name" field.');
    }
    return {
      id: (typeof p.id === 'string' && p.id) ? p.id : crypto.randomUUID(),
      name: p.name,
      // Accept both "description" (ProfileProject) and "desc" (legacy Project)
      description: (typeof p.description === 'string' ? p.description : typeof p.desc === 'string' ? p.desc : '') as string,
      startDate: (typeof p.startDate === 'string' ? p.startDate : '') as string,
      endDate: (typeof p.endDate === 'string' ? p.endDate : '') as string,
      location: (typeof p.location === 'string' ? p.location : null) as string | null,
      placeOfWork: (typeof p.placeOfWork === 'string' ? p.placeOfWork : null) as string | null,
      skills: Array.isArray(p.skills) ? (p.skills as string[]).filter((s) => typeof s === 'string') : [],
    } satisfies ProfileProject;
  });
}

/**
 * Parse an experience JSON file.
 *
 * Accepts:
 *   1. Array of Experience  — { id, jobTitle, company, ... }
 *   2. Wrapped              — { experience: [...] }
 */
export async function importExperienceFromFile(file: File): Promise<Experience[]> {
  const raw = await readJsonFile(file);

  let items: unknown[] = [];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && typeof raw === 'object' && Array.isArray((raw as Record<string, unknown>).experience)) {
    items = (raw as Record<string, unknown>).experience as unknown[];
  } else {
    throw new Error('Expected an array of experience entries or { experience: [...] }.');
  }

  return items.map((item) => {
    const e = item as Record<string, unknown>;
    if (!e.jobTitle || typeof e.jobTitle !== 'string') {
      throw new Error('Each experience entry must have a "jobTitle" field.');
    }
    return {
      id: (typeof e.id === 'string' && e.id) ? e.id : crypto.randomUUID(),
      jobTitle: e.jobTitle,
      company: (typeof e.company === 'string' ? e.company : '') as string,
      startDate: (typeof e.startDate === 'string' ? e.startDate : '') as string,
      endDate: (typeof e.endDate === 'string' ? e.endDate : '') as string,
      location: (typeof e.location === 'string' ? e.location : '') as string,
      description: (typeof e.description === 'string' ? e.description : '') as string,
      skills: Array.isArray(e.skills) ? (e.skills as string[]).filter((s) => typeof s === 'string') : [],
    } satisfies Experience;
  });
}

/**
 * Parse a full profile.json file.
 *
 * Accepts { projects?, experience?, personalInfo? } — all keys optional.
 * Returns parsed arrays/object, falling back to empty values for missing keys.
 */
export async function importFullProfileFromFile(file: File): Promise<{
  projects: ProfileProject[];
  experience: Experience[];
  personalInfo: PersonalInfo;
}> {
  const raw = await readJsonFile(file);
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('profile.json must be an object with projects, experience, and/or personalInfo keys.');
  }

  const obj = raw as Record<string, unknown>;

  // Parse projects (reuse same logic, inline)
  const rawProjects = Array.isArray(obj.projects) ? obj.projects : [];
  const projects: ProfileProject[] = rawProjects.map((item) => {
    const p = item as Record<string, unknown>;
    return {
      id: (typeof p.id === 'string' && p.id) ? p.id : crypto.randomUUID(),
      name: typeof p.name === 'string' ? p.name : '',
      description: typeof p.description === 'string' ? p.description : typeof p.desc === 'string' ? p.desc : '',
      startDate: typeof p.startDate === 'string' ? p.startDate : '',
      endDate: typeof p.endDate === 'string' ? p.endDate : '',
      location: typeof p.location === 'string' ? p.location : null,
      placeOfWork: typeof p.placeOfWork === 'string' ? p.placeOfWork : null,
      skills: Array.isArray(p.skills) ? (p.skills as string[]).filter((s) => typeof s === 'string') : [],
    };
  });

  // Parse experience
  const rawExp = Array.isArray(obj.experience) ? obj.experience : [];
  const experience: Experience[] = rawExp.map((item) => {
    const e = item as Record<string, unknown>;
    return {
      id: (typeof e.id === 'string' && e.id) ? e.id : crypto.randomUUID(),
      jobTitle: typeof e.jobTitle === 'string' ? e.jobTitle : '',
      company: typeof e.company === 'string' ? e.company : '',
      startDate: typeof e.startDate === 'string' ? e.startDate : '',
      endDate: typeof e.endDate === 'string' ? e.endDate : '',
      location: typeof e.location === 'string' ? e.location : '',
      description: typeof e.description === 'string' ? e.description : '',
      skills: Array.isArray(e.skills) ? (e.skills as string[]).filter((s) => typeof s === 'string') : [],
    };
  });

  // Parse personalInfo
  const pi = (obj.personalInfo && typeof obj.personalInfo === 'object' && !Array.isArray(obj.personalInfo))
    ? obj.personalInfo as Record<string, unknown>
    : {};
  const personalInfo: PersonalInfo = {
    fullName: typeof pi.fullName === 'string' ? pi.fullName : '',
    jobTitle: typeof pi.jobTitle === 'string' ? pi.jobTitle : '',
    email: typeof pi.email === 'string' ? pi.email : '',
    phone: typeof pi.phone === 'string' ? pi.phone : '',
    location: typeof pi.location === 'string' ? pi.location : '',
    linkedIn: typeof pi.linkedIn === 'string' ? pi.linkedIn : '',
    github: typeof pi.github === 'string' ? pi.github : '',
    portfolio: typeof pi.portfolio === 'string' ? pi.portfolio : '',
    summary: typeof pi.summary === 'string' ? pi.summary : '',
  };

  return { projects, experience, personalInfo };
}
