'use client';

import { Check, Square, Loader, AlertCircle } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';

interface ProjectSelectorProps {
  selected: string[];
  onToggle: (name: string) => void;
}

export default function ProjectSelector({ selected, onToggle }: ProjectSelectorProps) {
  const { projects, loading, error } = useProfile();

  if (loading) {
    return (
      <div className="card">
        <label className="card__label">Projects to Highlight</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          <Loader size={14} className="spin" aria-hidden="true" />
          Loading projects…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <label className="card__label">Projects to Highlight</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--error)', fontSize: '0.82rem' }}>
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <label className="card__label">Projects to Highlight</label>
      {projects.length === 0 ? (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          No projects yet — add some in your <strong>Profile</strong>.
        </p>
      ) : (
        <div className="project-grid">
          {projects.map((project) => {
            const isSelected = selected.includes(project.name);
            return (
              <button
                key={project.id}
                className={`project-chip ${isSelected ? 'project-chip--selected' : ''}`}
                onClick={() => onToggle(project.name)}
                type="button"
              >
                <span className="project-chip__check">
                  {isSelected ? <Check size={12} aria-hidden="true" /> : <Square size={12} aria-hidden="true" />}
                </span>
                <span>{project.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
