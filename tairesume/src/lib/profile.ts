import { supabase } from './supabase';
import { ProfileProject, Experience, PersonalInfo, EMPTY_PERSONAL_INFO } from '@/types';

// ── Read ──────────────────────────────────────────────────────────────────────

export async function getProfileData(uid: string): Promise<{
  projects: ProfileProject[];
  experience: Experience[];
  personalInfo: PersonalInfo;
}> {
  const { data, error } = await supabase
    .from('users')
    .select('projects, experience, personal_info')
    .eq('uid', uid)
    .single();

  if (error || !data) {
    return { projects: [], experience: [], personalInfo: { ...EMPTY_PERSONAL_INFO } };
  }

  return {
    projects: (data.projects as ProfileProject[]) ?? [],
    experience: (data.experience as Experience[]) ?? [],
    personalInfo: (data.personal_info as PersonalInfo) ?? { ...EMPTY_PERSONAL_INFO },
  };
}

// ── Projects ──────────────────────────────────────────────────────────────────

/** Write the entire projects array in one shot — use for bulk imports. */
export async function saveAllProjects(uid: string, projects: ProfileProject[]): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ projects })
    .eq('uid', uid);
  if (error) throw new Error(error.message);
}

/** Upsert a single project (read-modify-write). */
export async function saveProject(uid: string, project: ProfileProject): Promise<void> {
  const { data, error: fetchError } = await supabase
    .from('users')
    .select('projects')
    .eq('uid', uid)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const current: ProfileProject[] = (data?.projects as ProfileProject[]) ?? [];
  const idx = current.findIndex((p) => p.id === project.id);
  const updated = idx >= 0
    ? current.map((p) => (p.id === project.id ? project : p))
    : [...current, project];

  const { error } = await supabase
    .from('users')
    .update({ projects: updated })
    .eq('uid', uid);

  if (error) throw new Error(error.message);
}

export async function deleteProject(uid: string, projectId: string): Promise<void> {
  const { data, error: fetchError } = await supabase
    .from('users')
    .select('projects')
    .eq('uid', uid)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const current: ProfileProject[] = (data?.projects as ProfileProject[]) ?? [];
  const updated = current.filter((p) => p.id !== projectId);

  const { error } = await supabase
    .from('users')
    .update({ projects: updated })
    .eq('uid', uid);

  if (error) throw new Error(error.message);
}

// ── Experience ────────────────────────────────────────────────────────────────

/** Write the entire experience array in one shot — use for bulk imports. */
export async function saveAllExperience(uid: string, experience: Experience[]): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ experience })
    .eq('uid', uid);
  if (error) throw new Error(error.message);
}

export async function saveExperience(uid: string, entry: Experience): Promise<void> {
  const { data, error: fetchError } = await supabase
    .from('users')
    .select('experience')
    .eq('uid', uid)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const current: Experience[] = (data?.experience as Experience[]) ?? [];
  const idx = current.findIndex((e) => e.id === entry.id);
  const updated = idx >= 0
    ? current.map((e) => (e.id === entry.id ? entry : e))
    : [...current, entry];

  const { error } = await supabase
    .from('users')
    .update({ experience: updated })
    .eq('uid', uid);

  if (error) throw new Error(error.message);
}

export async function deleteExperience(uid: string, entryId: string): Promise<void> {
  const { data, error: fetchError } = await supabase
    .from('users')
    .select('experience')
    .eq('uid', uid)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const current: Experience[] = (data?.experience as Experience[]) ?? [];
  const updated = current.filter((e) => e.id !== entryId);

  const { error } = await supabase
    .from('users')
    .update({ experience: updated })
    .eq('uid', uid);

  if (error) throw new Error(error.message);
}

// ── Personal Info ─────────────────────────────────────────────────────────────

export async function savePersonalInfo(uid: string, info: PersonalInfo): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({ personal_info: info })
    .eq('uid', uid);

  if (error) throw new Error(error.message);
}
