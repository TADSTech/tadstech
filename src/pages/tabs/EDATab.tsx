import React from 'react';
import { 
  faTable, 
  faLineChart, 
  faChartArea,
  faFileCsv,
  faUserSlash,
  faShield
} from '@fortawesome/free-solid-svg-icons';
import SkillChip from '../widgets/SkillChip.tsx';
import ToolCard from '../widgets/ToolCard.tsx';
import CaseStudyCard from '../widgets/CaseStudyCard.tsx';
import './tabs.css';

const EDATab: React.FC = () => {
  const techniques = [
    'Descriptive Statistics',
    'Data Distributions',
    'Correlation Analysis',
    'Missing Data Analysis',
    'Outlier Detection',
    'Feature Engineering'
  ];

  const tools = [
    { icon: faTable, name: 'Pandas Profiling', description: 'Automated EDA reports' },
    { icon: faLineChart, name: 'Sweetviz', description: 'Visual feature analysis' },
    { icon: faChartArea, name: 'D-Tale', description: 'Interactive EDA interface' },
    { icon: faFileCsv, name: 'Pandas', description: 'Core data analysis' }
  ];

  return (
    <div className="service-tab">
      <h2>Exploratory Data Analysis</h2>
      <p>
        We perform comprehensive exploratory analysis to uncover insights, identify patterns, and detect anomalies in your data. 
        Our EDA process forms the foundation for all subsequent analysis and modeling.
      </p>
      
      <div className="section">
        <h3>EDA Techniques:</h3>
        <div className="skills-container">
          {techniques.map((technique, index) => (
            <SkillChip key={index} label={technique} />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Primary Tools:</h3>
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
        <h3>Analysis Deliverables:</h3>
        <div className="case-studies-grid">
          <CaseStudyCard
            title="Customer Churn Insights"
            description="Explored churn indicators using correlation analysis and visual EDA techniques."
            tags={['Churn Analysis', 'EDA', 'Sweetviz']}
            icon={faUserSlash}
          />
          <CaseStudyCard
            title="Financial Fraud Detection"
            description="Performed outlier analysis and clustering to flag potential fraud patterns."
            tags={['Fraud Detection', 'Anomaly Detection', 'Pandas Profiling']}
            icon={faShield}
          />
        </div>
      </div>
    </div>
  );
};

export default EDATab;