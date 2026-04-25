'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  getProfileData,
  saveProject as apiSaveProject,
  deleteProject as apiDeleteProject,
  saveAllProjects as apiSaveAllProjects,
  saveExperience as apiSaveExperience,
  deleteExperience as apiDeleteExperience,
  saveAllExperience as apiSaveAllExperience,
  savePersonalInfo as apiSavePersonalInfo,
} from '@/lib/profile';
import { ProfileProject, Experience, PersonalInfo, EMPTY_PERSONAL_INFO } from '@/types';

interface ProfileContextValue {
  projects: ProfileProject[];
  experience: Experience[];
  personalInfo: PersonalInfo;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  load: () => Promise<void>;
  saveProject: (project: ProfileProject) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveExperience: (entry: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  savePersonalInfo: (info: PersonalInfo) => Promise<void>;
  importProjects: (incoming: ProfileProject[]) => Promise<void>;
  importExperience: (incoming: Experience[]) => Promise<void>;
  // Explicit bulk-save current in-memory state to DB
  saveAllProjectsToDB: () => Promise<void>;
  saveAllExperienceToDB: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProfileProject[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({ ...EMPTY_PERSONAL_INFO });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manual load — called when the drawer opens
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getProfileData(user.id);
      setProjects(data.projects);
      setExperience(data.experience);
      setPersonalInfo(data.personalInfo);
      setLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ── Single-item mutations ─────────────────────────────────────────────────

  const saveProject = useCallback(async (project: ProfileProject) => {
    if (!user) return;
    // Optimistic update
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === project.id);
      return idx >= 0 ? prev.map((p) => (p.id === project.id ? project : p)) : [...prev, project];
    });
    try {
      await apiSaveProject(user.id, project);
    } catch (err) {
      await load();
      throw err;
    }
  }, [user, load]);

  const deleteProject = useCallback(async (id: string) => {
    if (!user) return;
    const prev = projects;
    setProjects((p) => p.filter((x) => x.id !== id));
    try {
      await apiDeleteProject(user.id, id);
    } catch (err) {
      setProjects(prev);
      throw err;
    }
  }, [user, projects]);

  const saveExperience = useCallback(async (entry: Experience) => {
    if (!user) return;
    setExperience((prev) => {
      const idx = prev.findIndex((e) => e.id === entry.id);
      return idx >= 0 ? prev.map((e) => (e.id === entry.id ? entry : e)) : [...prev, entry];
    });
    try {
      await apiSaveExperience(user.id, entry);
    } catch (err) {
      await load();
      throw err;
    }
  }, [user, load]);

  const deleteExperience = useCallback(async (id: string) => {
    if (!user) return;
    const prev = experience;
    setExperience((e) => e.filter((x) => x.id !== id));
    try {
      await apiDeleteExperience(user.id, id);
    } catch (err) {
      setExperience(prev);
      throw err;
    }
  }, [user, experience]);

  const savePersonalInfo = useCallback(async (info: PersonalInfo) => {
    if (!user) return;
    const prev = personalInfo;
    setPersonalInfo(info);
    try {
      await apiSavePersonalInfo(user.id, info);
    } catch (err) {
      setPersonalInfo(prev);
      throw err;
    }
  }, [user, personalInfo]);

  // ── Bulk import mutations ─────────────────────────────────────────────────

  const importProjects = useCallback(async (incoming: ProfileProject[]) => {
    if (!user) return;
    // Merge: keep existing projects not in the import, upsert imported ones by id
    const merged = [...projects];
    for (const p of incoming) {
      const idx = merged.findIndex((x) => x.id === p.id);
      if (idx >= 0) {
        merged[idx] = p;
      } else {
        merged.push(p);
      }
    }
    setProjects(merged);
    try {
      await apiSaveAllProjects(user.id, merged);
    } catch (err) {
      await load();
      throw err;
    }
  }, [user, projects, load]);

  const importExperience = useCallback(async (incoming: Experience[]) => {
    if (!user) return;
    const merged = [...experience];
    for (const e of incoming) {
      const idx = merged.findIndex((x) => x.id === e.id);
      if (idx >= 0) {
        merged[idx] = e;
      } else {
        merged.push(e);
      }
    }
    setExperience(merged);
    try {
      await apiSaveAllExperience(user.id, merged);
    } catch (err) {
      await load();
      throw err;
    }
  }, [user, experience, load]);

  // Explicit save-all — writes current in-memory state to DB in one shot
  const saveAllProjectsToDB = useCallback(async () => {
    if (!user) return;
    await apiSaveAllProjects(user.id, projects);
  }, [user, projects]);

  const saveAllExperienceToDB = useCallback(async () => {
    if (!user) return;
    await apiSaveAllExperience(user.id, experience);
  }, [user, experience]);

  return (
    <ProfileContext.Provider value={{
      projects,
      experience,
      personalInfo,
      loading,
      loaded,
      error,
      load,
      saveProject,
      deleteProject,
      saveExperience,
      deleteExperience,
      savePersonalInfo,
      importProjects,
      importExperience,
      saveAllProjectsToDB,
      saveAllExperienceToDB,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider');
  return ctx;
}
