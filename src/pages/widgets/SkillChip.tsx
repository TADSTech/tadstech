import React from 'react';
import './widgets.css';

interface SkillChipProps {
  label: string;
}

const SkillChip: React.FC<SkillChipProps> = ({ label }) => {
  return (
    <span className="skill-chip">
      {label}
    </span>
  );
};

export default SkillChip;