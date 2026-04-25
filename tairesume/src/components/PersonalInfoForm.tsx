'use client';

import { FormEvent, useState } from 'react';
import { Loader } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import { PersonalInfo } from '@/types';

interface PersonalInfoFormProps {
  onSave: (info: PersonalInfo) => Promise<void>;
  saving: boolean;
}

export default function PersonalInfoForm({ onSave, saving }: PersonalInfoFormProps) {
  const { personalInfo } = useProfile();
  const [form, setForm] = useState<PersonalInfo>({ ...personalInfo });

  const set = (field: keyof PersonalInfo, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form__row">
        <div className="profile-form__field">
          <label>Full name</label>
          <input
            className="input"
            value={form.fullName}
            onChange={(e) => set('fullName', e.target.value)}
            placeholder="Ada Lovelace"
          />
        </div>
        <div className="profile-form__field">
          <label>Job title</label>
          <input
            className="input"
            value={form.jobTitle}
            onChange={(e) => set('jobTitle', e.target.value)}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="profile-form__row">
        <div className="profile-form__field">
          <label>Email</label>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="ada@example.com"
          />
        </div>
        <div className="profile-form__field">
          <label>Phone</label>
          <input
            className="input"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="+234 800 000 0000"
          />
        </div>
      </div>

      <div className="profile-form__field">
        <label>Location</label>
        <input
          className="input"
          value={form.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="Lagos, Nigeria"
        />
      </div>

      <div className="profile-form__field">
        <label>LinkedIn URL</label>
        <input
          className="input"
          value={form.linkedIn}
          onChange={(e) => set('linkedIn', e.target.value)}
          placeholder="https://linkedin.com/in/yourname"
        />
      </div>

      <div className="profile-form__row">
        <div className="profile-form__field">
          <label>GitHub URL</label>
          <input
            className="input"
            value={form.github}
            onChange={(e) => set('github', e.target.value)}
            placeholder="https://github.com/yourname"
          />
        </div>
        <div className="profile-form__field">
          <label>Portfolio URL</label>
          <input
            className="input"
            value={form.portfolio}
            onChange={(e) => set('portfolio', e.target.value)}
            placeholder="https://yoursite.dev"
          />
        </div>
      </div>

      <div className="profile-form__field">
        <label>Professional summary</label>
        <textarea
          className="textarea"
          value={form.summary}
          onChange={(e) => set('summary', e.target.value)}
          placeholder="A brief 2–3 sentence summary of your background and goals..."
          style={{ minHeight: 80 }}
        />
      </div>

      <div className="profile-form__actions">
        <button type="submit" className="btn btn--primary btn--full" disabled={saving}>
          {saving ? <><Loader size={14} className="spin" aria-hidden="true" /> Saving…</> : 'Save Personal Info'}
        </button>
      </div>
    </form>
  );
}
