'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { X, Plus, Pencil, Trash2, Download, Upload, LogIn, RefreshCw, Loader, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/context/ProfileContext';
import {
  exportProjects, exportExperience, exportFullProfile,
  importProjectsFromFile, importExperienceFromFile, importFullProfileFromFile,
} from '@/lib/export';
import ProjectForm from '@/components/ProjectForm';
import ExperienceForm from '@/components/ExperienceForm';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import { ProfileProject, Experience, PersonalInfo } from '@/types';

type Tab = 'projects' | 'experience' | 'personalInfo';

interface ProfileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeBuilder: () => void;
}

export default function ProfileManager({ isOpen, onClose, onOpenResumeBuilder }: ProfileManagerProps) {
  const { user } = useAuth();
  const {
    projects, experience, personalInfo,
    loading, loaded, error,
    load,
    saveProject, deleteProject,
    saveExperience, deleteExperience,
    savePersonalInfo,
    importProjects, importExperience,
    saveAllProjectsToDB, saveAllExperienceToDB,
  } = useProfile();

  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [editingProject, setEditingProject] = useState<ProfileProject | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [bulkSaving, setBulkSaving] = useState(false);

  const projectImportRef = useRef<HTMLInputElement>(null);
  const experienceImportRef = useRef<HTMLInputElement>(null);
  const profileImportRef = useRef<HTMLInputElement>(null);

  // Load data when drawer opens (only if not already loaded)
  useEffect(() => {
    if (isOpen && user && !loaded && !loading) {
      load();
    }
  }, [isOpen, user, loaded, loading, load]);

  const showImportSuccess = (msg: string) => {
    setImportSuccess(msg);
    setTimeout(() => setImportSuccess(null), 3500);
  };

  const handleSaveAllProjects = useCallback(async () => {
    setBulkSaving(true);
    setActionError(null);
    try {
      await saveAllProjectsToDB();
      showImportSuccess(`${projects.length} project${projects.length !== 1 ? 's' : ''} saved to database.`);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBulkSaving(false);
    }
  }, [saveAllProjectsToDB, projects.length]);

  const handleSaveAllExperience = useCallback(async () => {
    setBulkSaving(true);
    setActionError(null);
    try {
      await saveAllExperienceToDB();
      showImportSuccess(`${experience.length} experience entr${experience.length !== 1 ? 'ies' : 'y'} saved to database.`);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setBulkSaving(false);
    }
  }, [saveAllExperienceToDB, experience.length]);

  // ── Project handlers ──────────────────────────────────────────────────────

  const handleSaveProject = useCallback(async (project: ProfileProject) => {
    setSaving(true);
    setActionError(null);
    try {
      await saveProject(project);
      setShowProjectForm(false);
      setEditingProject(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  }, [saveProject]);

  const handleDeleteProject = useCallback(async (id: string) => {
    setActionError(null);
    try {
      await deleteProject(id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  }, [deleteProject]);

  const handleImportProjects = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setActionError(null);
    setImporting(true);
    try {
      const parsed = await importProjectsFromFile(file);
      await importProjects(parsed);
      showImportSuccess(`Imported ${parsed.length} project${parsed.length !== 1 ? 's' : ''} from ${file.name}.`);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  }, [importProjects]);

  // ── Experience handlers ───────────────────────────────────────────────────

  const handleSaveExperience = useCallback(async (entry: Experience) => {
    setSaving(true);
    setActionError(null);
    try {
      await saveExperience(entry);
      setShowExperienceForm(false);
      setEditingExperience(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to save experience');
    } finally {
      setSaving(false);
    }
  }, [saveExperience]);

  const handleDeleteExperience = useCallback(async (id: string) => {
    setActionError(null);
    try {
      await deleteExperience(id);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete experience');
    }
  }, [deleteExperience]);

  const handleImportExperience = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setActionError(null);
    setImporting(true);
    try {
      const parsed = await importExperienceFromFile(file);
      await importExperience(parsed);
      showImportSuccess(`Imported ${parsed.length} experience entr${parsed.length !== 1 ? 'ies' : 'y'} from ${file.name}.`);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  }, [importExperience]);

  // ── Personal info handlers ────────────────────────────────────────────────

  const handleSavePersonalInfo = useCallback(async (info: PersonalInfo) => {
    setSaving(true);
    setActionError(null);
    setSaveSuccess(false);
    try {
      await savePersonalInfo(info);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to save personal info');
    } finally {
      setSaving(false);
    }
  }, [savePersonalInfo]);

  const handleImportFullProfile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setActionError(null);
    setImporting(true);
    try {
      const { projects: importedProjects, experience: importedExp, personalInfo: importedInfo } = await importFullProfileFromFile(file);
      if (importedProjects.length > 0) await importProjects(importedProjects);
      if (importedExp.length > 0) await importExperience(importedExp);
      if (Object.values(importedInfo).some(Boolean)) await savePersonalInfo(importedInfo);
      showImportSuccess(`Imported full profile from ${file.name}.`);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  }, [importProjects, importExperience, savePersonalInfo]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {isOpen && <div className="profile-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside
        className={`profile-drawer${isOpen ? ' profile-drawer--open' : ''}`}
        aria-label="Profile Manager"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="profile-drawer__header">
          <span className="profile-drawer__title">My Profile</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              className="btn btn--primary btn--sm"
              onClick={() => { onClose(); onOpenResumeBuilder(); }}
              type="button"
              title="Build a resume from scratch"
            >
              Resume from Scratch
            </button>
            {/* Manual refresh button */}
            <button
              className="btn btn--ghost"
              onClick={onClose}
              aria-label="Close profile manager"
              type="button"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="profile-drawer__body">
          {!user ? (
            <div className="profile-empty-state">
              <LogIn size={32} aria-hidden="true" style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
              <p>Sign in to manage your profile data.</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="profile-drawer__tabs">
                {(['projects', 'experience', 'personalInfo'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`profile-tab${activeTab === tab ? ' profile-tab--active' : ''}`}
                    onClick={() => {
                      setActiveTab(tab);
                      setShowProjectForm(false);
                      setShowExperienceForm(false);
                      setActionError(null);
                    }}
                  >
                    {tab === 'projects' ? 'Projects' : tab === 'experience' ? 'Experience' : 'Personal Info'}
                  </button>
                ))}
              </div>

              {/* Status messages */}
              {(error || actionError) && (
                <p className="profile-form__error" style={{ margin: '8px 0' }}>
                  {error || actionError}
                </p>
              )}
              {importSuccess && (
                <p style={{ fontSize: '0.82rem', color: 'var(--success)', margin: '8px 0' }}>
                  ✓ {importSuccess}
                </p>
              )}
              {(loading || importing) && (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '8px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Loader size={13} className="spin" aria-hidden="true" />
                  {importing ? 'Importing…' : 'Loading…'}
                </p>
              )}

              {/* ── Projects tab ── */}
              {activeTab === 'projects' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="card__label" style={{ margin: 0 }}>
                      {projects.length} project{projects.length !== 1 ? 's' : ''}
                    </span>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={load}
                        disabled={loading}
                        type="button"
                        title="Load from database"
                      >
                        {loading ? <Loader size={14} className="spin" aria-hidden="true" /> : <RefreshCw size={14} aria-hidden="true" />}
                        Load
                      </button>
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={handleSaveAllProjects}
                        disabled={bulkSaving || projects.length === 0}
                        type="button"
                        title="Save all projects to database"
                      >
                        {bulkSaving ? <Loader size={14} className="spin" aria-hidden="true" /> : <Save size={14} aria-hidden="true" />}
                        Save
                      </button>
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => projectImportRef.current?.click()}
                        disabled={importing}
                        type="button"
                        title="Import projects from JSON"
                      >
                        <Upload size={14} aria-hidden="true" /> Import
                      </button>
                      <input ref={projectImportRef} type="file" accept=".json,application/json" hidden onChange={handleImportProjects} />
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => exportProjects(projects)}
                        type="button"
                        title="Download projects.json"
                      >
                        <Download size={14} aria-hidden="true" /> Export
                      </button>
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => { setEditingProject(null); setShowProjectForm(true); }}
                        type="button"
                      >
                        <Plus size={14} aria-hidden="true" /> Add
                      </button>
                    </div>
                  </div>

                  {showProjectForm && (
                    <ProjectForm
                      initial={editingProject ?? undefined}
                      onSave={handleSaveProject}
                      onCancel={() => { setShowProjectForm(false); setEditingProject(null); }}
                      saving={saving}
                    />
                  )}

                  {!loading && projects.length === 0 && !showProjectForm && (
                    <div className="profile-empty-state">
                      <p>No projects yet. Hit <strong>Add</strong> to create one, or <strong>Import</strong> a JSON file.</p>
                    </div>
                  )}

                  {projects.map((p) => (
                    <div key={p.id} className="profile-item">
                      <div className="profile-item__info">
                        <strong>{p.name}</strong>
                        {p.startDate && (
                          <span className="profile-item__meta">
                            {p.startDate}{p.endDate ? ` – ${p.endDate}` : ''}
                          </span>
                        )}
                        {p.skills.length > 0 && (
                          <span className="profile-item__skills">
                            {p.skills.slice(0, 4).join(', ')}{p.skills.length > 4 ? '…' : ''}
                          </span>
                        )}
                      </div>
                      <div className="profile-item__actions">
                        <button
                          className="btn btn--secondary btn--sm"
                          onClick={() => { setEditingProject(p); setShowProjectForm(true); }}
                          type="button"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Pencil size={13} aria-hidden="true" /> Edit
                        </button>
                        <button
                          className="btn btn--danger btn--sm"
                          onClick={() => handleDeleteProject(p.id)}
                          type="button"
                          aria-label={`Delete ${p.name}`}
                        >
                          <Trash2 size={13} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Experience tab ── */}
              {activeTab === 'experience' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="card__label" style={{ margin: 0 }}>
                      {experience.length} entr{experience.length !== 1 ? 'ies' : 'y'}
                    </span>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={load}
                        disabled={loading}
                        type="button"
                        title="Load from database"
                      >
                        {loading ? <Loader size={14} className="spin" aria-hidden="true" /> : <RefreshCw size={14} aria-hidden="true" />}
                        Load
                      </button>
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={handleSaveAllExperience}
                        disabled={bulkSaving || experience.length === 0}
                        type="button"
                        title="Save all experience to database"
                      >
                        {bulkSaving ? <Loader size={14} className="spin" aria-hidden="true" /> : <Save size={14} aria-hidden="true" />}
                        Save
                      </button>
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => experienceImportRef.current?.click()}
                        disabled={importing}
                        type="button"
                        title="Import experience from JSON"
                      >
                        <Upload size={14} aria-hidden="true" /> Import
                      </button>
                      <input ref={experienceImportRef} type="file" accept=".json,application/json" hidden onChange={handleImportExperience} />
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => exportExperience(experience)}
                        type="button"
                        title="Download experience.json"
                      >
                        <Download size={14} aria-hidden="true" /> Export
                      </button>
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => { setEditingExperience(null); setShowExperienceForm(true); }}
                        type="button"
                      >
                        <Plus size={14} aria-hidden="true" /> Add
                      </button>
                    </div>
                  </div>

                  {showExperienceForm && (
                    <ExperienceForm
                      initial={editingExperience ?? undefined}
                      onSave={handleSaveExperience}
                      onCancel={() => { setShowExperienceForm(false); setEditingExperience(null); }}
                      saving={saving}
                    />
                  )}

                  {!loading && experience.length === 0 && !showExperienceForm && (
                    <div className="profile-empty-state">
                      <p>No experience yet. Hit <strong>Add</strong> to add your first role.</p>
                    </div>
                  )}

                  {experience.map((e) => (
                    <div key={e.id} className="profile-item">
                      <div className="profile-item__info">
                        <strong>{e.jobTitle}</strong>
                        {e.company && <span className="profile-item__meta">{e.company}</span>}
                        {e.startDate && (
                          <span className="profile-item__meta">
                            {e.startDate}{e.endDate ? ` – ${e.endDate}` : ''}
                          </span>
                        )}
                      </div>
                      <div className="profile-item__actions">
                        <button
                          className="btn btn--secondary btn--sm"
                          onClick={() => { setEditingExperience(e); setShowExperienceForm(true); }}
                          type="button"
                          aria-label={`Edit ${e.jobTitle}`}
                        >
                          <Pencil size={13} aria-hidden="true" /> Edit
                        </button>
                        <button
                          className="btn btn--danger btn--sm"
                          onClick={() => handleDeleteExperience(e.id)}
                          type="button"
                          aria-label={`Delete ${e.jobTitle}`}
                        >
                          <Trash2 size={13} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Personal Info tab ── */}
              {activeTab === 'personalInfo' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="card__label" style={{ margin: 0 }}>Personal Info</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => profileImportRef.current?.click()}
                        disabled={importing}
                        type="button"
                        title="Import full profile.json"
                      >
                        <Upload size={14} aria-hidden="true" /> Import All
                      </button>
                      <input ref={profileImportRef} type="file" accept=".json,application/json" hidden onChange={handleImportFullProfile} />
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => exportFullProfile(projects, experience, personalInfo)}
                        type="button"
                        title="Download profile.json"
                      >
                        <Download size={14} aria-hidden="true" /> Export All
                      </button>
                    </div>
                  </div>

                  {saveSuccess && (
                    <p style={{ fontSize: '0.82rem', color: 'var(--success)', marginBottom: 8 }}>
                      ✓ Personal info saved.
                    </p>
                  )}

                  <PersonalInfoForm onSave={handleSavePersonalInfo} saving={saving} />
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
