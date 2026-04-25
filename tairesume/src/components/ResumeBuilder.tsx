'use client';

import { FormEvent, useState } from 'react';
import { X, FileText, Check, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import { generateTypstResume } from '@/lib/resumeBuilder';
import { PersonalInfo, Experience, ProfileProject } from '@/types';

interface ResumeBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (typst: string) => void;
}

export default function ResumeBuilder({ isOpen, onClose, onGenerate }: ResumeBuilderProps) {
  const { personalInfo, experience, projects } = useProfile();

  const [info, setInfo] = useState<PersonalInfo>({ ...personalInfo });
  const [selectedExp, setSelectedExp] = useState<string[]>(experience.map((e) => e.id));
  const [selectedProj, setSelectedProj] = useState<string[]>(projects.map((p) => p.id));
  const [infoOpen, setInfoOpen] = useState(true);
  const [expOpen, setExpOpen] = useState(true);
  const [projOpen, setProjOpen] = useState(true);

  const setField = (field: keyof PersonalInfo, value: string) =>
    setInfo((prev) => ({ ...prev, [field]: value }));

  const toggleExp = (id: string) =>
    setSelectedExp((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleProj = (id: string) =>
    setSelectedProj((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    const chosenExp = experience.filter((x) => selectedExp.includes(x.id));
    const chosenProj = projects.filter((x) => selectedProj.includes(x.id));
    const typst = generateTypstResume(info, chosenExp, chosenProj);
    onGenerate(typst);
    onClose();
  };

  if (!isOpen) return null;

  return (
    /* Full-screen sheet on mobile, centered modal on desktop */
    <div className="builder-overlay" onClick={onClose}>
      <div className="builder-sheet" onClick={(e) => e.stopPropagation()}>

        {/* Sticky header */}
        <div className="builder-sheet__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={18} aria-hidden="true" style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <span className="builder-sheet__title">Resume from Scratch</span>
          </div>
          <button className="btn btn--ghost" onClick={onClose} type="button" aria-label="Close">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <p className="builder-sheet__desc">
          Fill in your details, pick what to include, then generate a Typst resume — free, no coins.
        </p>

        <form onSubmit={handleGenerate} className="builder-sheet__body">

          {/* ── Personal Info (collapsible) ── */}
          <button
            type="button"
            className="builder-section-toggle"
            onClick={() => setInfoOpen((v) => !v)}
            aria-expanded={infoOpen}
          >
            <span className="card__label" style={{ margin: 0 }}>Personal Info</span>
            {infoOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
          </button>

          {infoOpen && (
            <div className="builder-fields">
              <div className="builder-row">
                <div className="profile-form__field">
                  <label>Full name</label>
                  <input className="input" value={info.fullName} onChange={(e) => setField('fullName', e.target.value)} placeholder="Ada Lovelace" />
                </div>
                <div className="profile-form__field">
                  <label>Job title</label>
                  <input className="input" value={info.jobTitle} onChange={(e) => setField('jobTitle', e.target.value)} placeholder="Software Engineer" />
                </div>
              </div>
              <div className="builder-row">
                <div className="profile-form__field">
                  <label>Email</label>
                  <input className="input" type="email" value={info.email} onChange={(e) => setField('email', e.target.value)} placeholder="ada@example.com" />
                </div>
                <div className="profile-form__field">
                  <label>Phone</label>
                  <input className="input" value={info.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="+234 800 000 0000" />
                </div>
              </div>
              <div className="builder-row">
                <div className="profile-form__field">
                  <label>Location</label>
                  <input className="input" value={info.location} onChange={(e) => setField('location', e.target.value)} placeholder="Lagos, Nigeria" />
                </div>
                <div className="profile-form__field">
                  <label>LinkedIn</label>
                  <input className="input" value={info.linkedIn} onChange={(e) => setField('linkedIn', e.target.value)} placeholder="linkedin.com/in/you" />
                </div>
              </div>
              <div className="builder-row">
                <div className="profile-form__field">
                  <label>GitHub</label>
                  <input className="input" value={info.github} onChange={(e) => setField('github', e.target.value)} placeholder="github.com/you" />
                </div>
                <div className="profile-form__field">
                  <label>Portfolio</label>
                  <input className="input" value={info.portfolio} onChange={(e) => setField('portfolio', e.target.value)} placeholder="yoursite.dev" />
                </div>
              </div>
              <div className="profile-form__field">
                <label>Summary</label>
                <textarea
                  className="textarea textarea--small"
                  value={info.summary}
                  onChange={(e) => setField('summary', e.target.value)}
                  placeholder="Brief professional summary..."
                />
              </div>
            </div>
          )}

          {/* ── Experience (collapsible) ── */}
          {experience.length > 0 && (
            <>
              <button
                type="button"
                className="builder-section-toggle"
                onClick={() => setExpOpen((v) => !v)}
                aria-expanded={expOpen}
              >
                <span className="card__label" style={{ margin: 0 }}>
                  Experience
                  <span className="builder-section-count">{selectedExp.length}/{experience.length}</span>
                </span>
                {expOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
              </button>

              {expOpen && (
                <div className="builder-checklist">
                  {experience.map((e) => {
                    const on = selectedExp.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        type="button"
                        className={`builder-check-item${on ? ' builder-check-item--on' : ''}`}
                        onClick={() => toggleExp(e.id)}
                      >
                        <span className="project-chip__check">
                          {on ? <Check size={12} aria-hidden="true" /> : <Square size={12} aria-hidden="true" />}
                        </span>
                        <span className="builder-check-item__label">
                          <strong>{e.jobTitle}</strong>
                          {e.company && <span className="builder-check-item__sub"> — {e.company}</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* ── Projects (collapsible) ── */}
          {projects.length > 0 && (
            <>
              <button
                type="button"
                className="builder-section-toggle"
                onClick={() => setProjOpen((v) => !v)}
                aria-expanded={projOpen}
              >
                <span className="card__label" style={{ margin: 0 }}>
                  Projects
                  <span className="builder-section-count">{selectedProj.length}/{projects.length}</span>
                </span>
                {projOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
              </button>

              {projOpen && (
                <div className="builder-checklist">
                  {projects.map((p) => {
                    const on = selectedProj.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        className={`builder-check-item${on ? ' builder-check-item--on' : ''}`}
                        onClick={() => toggleProj(p.id)}
                      >
                        <span className="project-chip__check">
                          {on ? <Check size={12} aria-hidden="true" /> : <Square size={12} aria-hidden="true" />}
                        </span>
                        <span className="builder-check-item__label">{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Sticky footer CTA */}
          <div className="builder-sheet__footer">
            <button type="submit" className="btn btn--primary btn--full" style={{ minHeight: 48 }}>
              <FileText size={16} aria-hidden="true" />
              Generate Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
