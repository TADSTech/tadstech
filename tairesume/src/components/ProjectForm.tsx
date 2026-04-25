'use client';

import { FormEvent, useState } from 'react';
import { Loader } from 'lucide-react';
import { ProfileProject } from '@/types';

interface ProjectFormProps {
  initial?: ProfileProject;
  onSave: (project: ProfileProject) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

const empty = (): ProfileProject => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  location: '',
  placeOfWork: '',
  skills: [],
});

export default function ProjectForm({ initial, onSave, onCancel, saving }: ProjectFormProps) {
  const [form, setForm] = useState<ProfileProject>(initial ?? empty());
  const [skillsInput, setSkillsInput] = useState(initial?.skills.join(', ') ?? '');
  const [nameError, setNameError] = useState('');

  const set = (field: keyof ProfileProject, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setNameError('Project name is required.');
      return;
    }
    setNameError('');
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    await onSave({ ...form, skills });
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form__field">
        <label>Project name *</label>
        <input
          className="input"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. My Awesome App"
        />
        {nameError && <p className="profile-form__error">{nameError}</p>}
      </div>

      <div className="profile-form__field">
        <label>Description</label>
        <textarea
          className="textarea textarea--small"
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="What did you build and what was your role?"
        />
      </div>

      <div className="profile-form__row">
        <div className="profile-form__field">
          <label>Start date</label>
          <input
            className="input"
            value={form.startDate}
            onChange={(e) => set('startDate', e.target.value)}
            placeholder="e.g. Jan 2024"
          />
        </div>
        <div className="profile-form__field">
          <label>End date</label>
          <input
            className="input"
            value={form.endDate}
            onChange={(e) => set('endDate', e.target.value)}
            placeholder="e.g. Present"
          />
        </div>
      </div>

      <div className="profile-form__row">
        <div className="profile-form__field">
          <label>Location</label>
          <input
            className="input"
            value={form.location ?? ''}
            onChange={(e) => set('location', e.target.value)}
            placeholder="e.g. Remote"
          />
        </div>
        <div className="profile-form__field">
          <label>Place of work</label>
          <input
            className="input"
            value={form.placeOfWork ?? ''}
            onChange={(e) => set('placeOfWork', e.target.value)}
            placeholder="e.g. Company / Freelance"
          />
        </div>
      </div>

      <div className="profile-form__field">
        <label>Skills (comma-separated)</label>
        <input
          className="input"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          placeholder="e.g. React, TypeScript, Node.js"
        />
      </div>

      <div className="profile-form__actions">
        <button type="button" className="btn btn--secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? <><Loader size={14} className="spin" aria-hidden="true" /> Saving…</> : (initial ? 'Update Project' : 'Add Project')}
        </button>
      </div>
    </form>
  );
}
