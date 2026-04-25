// ── Existing types (kept for backward compatibility with tailor API) ──────────

export interface Project {
  name: string;
  desc: string;
  startDate: string;
  endDate: string;
  location: string | null;
  placeOfWork: string | null;
  skills: string[];
}

export interface ProjectsData {
  projects: Project[];
}

export interface TailorRequest {
  resume: string;
  jobDescription: string;
  selectedProjects: Project[];
  model: 'standard' | 'advanced';
}

export interface ScrapeRequest {
  url: string;
}

export interface ScrapeResponse {
  title: string;
  text: string;
  success: boolean;
  error?: string;
}

export interface CoinTransaction {
  type: 'signup_bonus' | 'ad_reward' | 'purchase' | 'tailor_standard' | 'tailor_advanced';
  amount: number;
  timestamp: number;
  description: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  coins: number;
  createdAt: number;
}

// ── Profile System types ──────────────────────────────────────────────────────

/** A project entry stored in the user's profile (Supabase-backed). */
export interface ProfileProject {
  id: string;           // UUID — crypto.randomUUID()
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string | null;
  placeOfWork: string | null;
  skills: string[];
}

/** A work experience entry stored in the user's profile. */
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

/** Personal contact and summary information for resume generation. */
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
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  linkedIn: '',
  github: '',
  portfolio: '',
  summary: '',
};

/** Maps a ProfileProject to the legacy Project shape used by the tailor API. */
export function profileProjectToProject(p: ProfileProject): Project {
  return {
    name: p.name,
    desc: p.description,
    startDate: p.startDate,
    endDate: p.endDate,
    location: p.location,
    placeOfWork: p.placeOfWork,
    skills: p.skills,
  };
}
