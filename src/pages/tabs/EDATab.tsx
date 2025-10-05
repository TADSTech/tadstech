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
    { icon: faTable, name: 'Pandas Profiling', description: 'Automated EDA reports with detailed insights' },
    { icon: faLineChart, name: 'Sweetviz', description: 'Rapid visual feature analysis and comparisons' },
    { icon: faChartArea, name: 'D-Tale', description: 'Interactive web-based EDA interface' },
    { icon: faFileCsv, name: 'Pandas', description: 'Powerful data manipulation and analysis' }
  ];

  return (
    <div className="service-tab">
      <h2>Exploratory Data Analysis</h2>
      <p>
        Our advanced EDA uncovers hidden patterns, detects anomalies, and provides deep insights to guide your data strategy. We combine statistical rigor with visual exploration for comprehensive understanding.
      </p>
      
      <div className="section">
        <h3>Key Techniques</h3>
        <div className="skills-container">
          {techniques.map((technique, index) => (
            <SkillChip key={index} label={technique} />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Specialized Tools</h3>
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
        <h3>Success Stories</h3>
        <div className="case-studies-grid">
          <CaseStudyCard
            title="Customer Churn Insights"
            description="Identified key churn drivers through correlation and distribution analysis, reducing churn by 15% for a telecom client."
            tags={['Churn Analysis', 'EDA', 'Sweetviz']}
            icon={faUserSlash}
          />
          <CaseStudyCard
            title="Financial Fraud Detection"
            description="Detected subtle fraud patterns via outlier analysis and clustering, improving detection accuracy by 22%."
            tags={['Fraud Detection', 'Anomaly Detection', 'Pandas Profiling']}
            icon={faShield}
          />
        </div>
      </div>
    </div>
  );
};

export default EDATab;