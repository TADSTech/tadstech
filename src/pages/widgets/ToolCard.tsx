import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './widgets.css';

interface ToolCardProps {
  icon: IconDefinition;
  name: string;
  description: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, name, description }) => {
  return (
    <div className="tool-card">
      <div className="tool-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="tool-content">
        <h4 className="tool-name">{name}</h4>
        <p className="tool-description">{description}</p>
      </div>
    </div>
  );
};

export default ToolCard;