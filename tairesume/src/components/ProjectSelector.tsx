'use client';

import { Project } from '@/types';

interface ProjectSelectorProps {
  projects: Project[];
  selected: string[];
  onToggle: (name: string) => void;
}

export default function ProjectSelector({ projects, selected, onToggle }: ProjectSelectorProps) {
  return (
    <div className="card">
      <label className="card__label">Projects to Highlight</label>
      <div className="project-grid">
        {projects.map((project) => {
          const isSelected = selected.includes(project.name);
          return (
            <button
              key={project.name}
              className={`project-chip ${isSelected ? 'project-chip--selected' : ''}`}
              onClick={() => onToggle(project.name)}
              type="button"
            >
              <span className="project-chip__check">
                {isSelected ? '✓' : ''}
              </span>
              <span>{project.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
