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
    { icon: faFlask, name: 'Scikit-learn', description: 'Traditional ML algorithms' },
    { icon: faLineChart, name: 'Statsmodels', description: 'Statistical modeling' },
    { icon: faNetworkWired, name: 'TensorFlow', description: 'Deep learning framework' },
    { icon: faBolt, name: 'XGBoost', description: 'Gradient boosting' }
  ];

  return (
    <div className="service-tab">
      <h2>Predictive Modeling</h2>
      <p>
        We build robust predictive models tailored to your specific business needs. 
        From regression to classification, our models are rigorously tested and optimized for performance.
      </p>
      
      <div className="section">
        <h3>Modeling Approaches:</h3>
        <div className="skills-container">
          {approaches.map((approach, index) => (
            <SkillChip key={index} label={approach} />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Modeling Stack:</h3>
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
        <h3>Recent Projects:</h3>
        <div className="case-studies-grid">
          <CaseStudyCard
            title="Customer Lifetime Value Model"
            description="Built a regression model to predict the lifetime value of e-commerce users."
            tags={['Regression', 'CLV', 'Scikit-learn']}
            icon={faArrowUpRightDots}
          />
          <CaseStudyCard
            title="Loan Default Prediction"
            description="Classified high-risk borrowers using logistic regression and XGBoost."
            tags={['Classification', 'Finance', 'XGBoost']}
            icon={faBank}
          />
        </div>
      </div>

      <div className="section">
        <h3>Model Evaluation Metrics:</h3>
        <p>
          We use metrics like RMSE, AUC-ROC, precision, recall, and F1 score depending on the model type.
        </p>
      </div>
    </div>
  );
};

export default ModelingTab;