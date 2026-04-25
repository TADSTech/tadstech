'use client';

import { FormEvent, useState } from 'react';
import { Loader } from 'lucide-react';
import { Experience } from '@/types';

interface ExperienceFormProps {
  initial?: Experience;
  onSave: (entry: Experience) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

const empty = (): Experience => ({
  id: crypto.randomUUID(),
  jobTitle: '',
  company: '',
  startDate: '',
  endDate: '',
  location: '',
  description: '',
  skills: [],
});

export default function ExperienceForm({ initial, onSave, onCancel, saving }: ExperienceFormProps) {
  const [form, setForm] = useState<Experience>(initial ?? empty());
  const [skillsInput, setSkillsInput] = useState(initial?.skills.join(', ') ?? '');
  const [titleError, setTitleError] = useState('');

  const set = (field: keyof Experience, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.jobTitle.trim()) {
      setTitleError('Job title is required.');
      return;
    }
    setTitleError('');
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    await onSave({ ...form, skills });
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form__field">
        <label>Job title *</label>
        <input
          className="input"
          value={form.jobTitle}
          onChange={(e) => set('jobTitle', e.target.value)}
          placeholder="e.g. Software Engineer"
        />
        {titleError && <p className="profile-form__error">{titleError}</p>}
      </div>

      <div className="profile-form__field">
        <label>Company</label>
        <input
          className="input"
          value={form.company}
          onChange={(e) => set('company', e.target.value)}
          placeholder="e.g. Acme Corp"
        />
      </div>

      <div className="profile-form__row">
        <div className="profile-form__field">
          <label>Start date</label>
          <input
            className="input"
            value={form.startDate}
            onChange={(e) => set('startDate', e.target.value)}
            placeholder="e.g. Jan 2022"
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

      <div className="profile-form__field">
        <label>Location</label>
        <input
          className="input"
          value={form.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="e.g. Lagos, Nigeria"
        />
      </div>

      <div className="profile-form__field">
        <label>Description</label>
        <textarea
          className="textarea textarea--small"
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Key responsibilities and achievements..."
        />
      </div>

      <div className="profile-form__field">
        <label>Skills (comma-separated)</label>
        <input
          className="input"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          placeholder="e.g. Python, SQL, Leadership"
        />
      </div>

      <div className="profile-form__actions">
        <button type="button" className="btn btn--secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? <><Loader size={14} className="spin" aria-hidden="true" /> Saving…</> : (initial ? 'Update Experience' : 'Add Experience')}
        </button>
      </div>
    </form>
  );
}
