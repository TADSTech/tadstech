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
