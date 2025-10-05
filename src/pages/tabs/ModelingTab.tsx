import React from 'react';
import { 
  faFlask, 
  faLineChart, 
  faNetworkWired,
  faBolt,
  faArrowUpRightDots,
  faBank
} from '@fortawesome/free-solid-svg-icons';
import SkillChip from '../widgets/SkillChip.tsx';
import ToolCard from '../widgets/ToolCard.tsx';
import CaseStudyCard from '../widgets/CaseStudyCard.tsx';
import './tabs.css';

const ModelingTab: React.FC = () => {
  const approaches = [
    'Linear Regression',
    'Logistic Regression',
    'Decision Trees',
    'Random Forests',
    'Neural Networks',
    'Time Series Forecasting'
  ];

  const tools = [
    { icon: faFlask, name: 'Scikit-learn', description: 'Versatile ML algorithms and pipelines' },
    { icon: faLineChart, name: 'Statsmodels', description: 'Advanced statistical modeling' },
    { icon: faNetworkWired, name: 'TensorFlow', description: 'Scalable deep learning framework' },
    { icon: faBolt, name: 'XGBoost', description: 'High-performance gradient boosting' }
  ];

  return (
    <div className="service-tab">
      <h2>Predictive Modeling Services</h2>
      <p>
        We develop sophisticated predictive models that forecast outcomes, identify patterns, and drive intelligent decision-making. Our models are optimized for accuracy, efficiency, and real-world deployment.
      </p>
      
      <div className="section">
        <h3>Modeling Approaches</h3>
        <div className="skills-container">
          {approaches.map((approach, index) => (
            <SkillChip key={index} label={approach} />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Advanced Tools</h3>
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              icon={tool.icon}
              name={tool.name}
              description={tool.description}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Impactful Projects</h3>
        <div className="case-studies-grid">
          <CaseStudyCard
            title="Customer Lifetime Value Prediction"
            description="Created regression model forecasting CLV, enabling targeted marketing that increased retention by 18%."
            tags={['Regression', 'CLV', 'Scikit-learn']}
            icon={faArrowUpRightDots}
          />
          <CaseStudyCard
            title="Loan Risk Assessment"
            description="Implemented XGBoost classifier for default prediction, reducing bad loans by 25% for a fintech client."
            tags={['Classification', 'Finance', 'XGBoost']}
            icon={faBank}
          />
        </div>
      </div>

      <div className="section">
        <h3>Evaluation Excellence</h3>
        <p>
          We rigorously evaluate models using metrics like RMSE, AUC-ROC, precision-recall, and cross-validation to ensure reliability and performance.
        </p>
      </div>
    </div>
  );
};

export default ModelingTab;