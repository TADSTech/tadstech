import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import SkillChip from './SkillChip';
import './widgets.css';

interface CaseStudyCardProps {
  title: string;
  description: string;
  tags: string[];
  icon: IconDefinition;
  ctaLabel?: string;
  ctalink?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ 
  title, 
  description, 
  tags, 
  icon, 
  ctaLabel,
  ctalink,
}) => {
  return (
    <div className="case-study-card">
      <div className="case-study-header">
        <FontAwesomeIcon icon={icon} className="case-study-icon" />
        <h4 className="case-study-title">{title}</h4>
      </div>
      
      <p className="case-study-description">{description}</p>
      
      <div className="case-study-tags">
        {tags.map((tag, index) => (
          <SkillChip key={index} label={tag} />
        ))}
      </div>
      
      {ctaLabel && (
        <div className="case-study-cta">
          <button className="cta-button" onClick={() => window.open(ctalink, "_blank")}>
            {ctaLabel}
            <span className="cta-arrow">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CaseStudyCard;