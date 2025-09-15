import React from 'react';
import { 
  faStore, 
  faSchool, 
  faPiggyBank,
  faShoppingCart,
  faHeartbeat
} from '@fortawesome/free-solid-svg-icons';
import SkillChip from '../widgets/SkillChip.tsx';
import CaseStudyCard from '../widgets/CaseStudyCard.tsx';
import './tabs.css';

const DataCleaningTab: React.FC = () => {
  const commonIssues = [
    'Missing Values',
    'Inconsistent Formatting',
    'Duplicate Records',
    'Outlier Detection',
    'Data Type Conversion',
    'Text Normalization',
    'Date/Time Standardization',
    'Categorical Encoding'
  ];

  return (
    <div className="service-tab">
      <h2>Data Cleaning Services</h2>
      <p>
        We transform messy, incomplete, or inconsistent data into clean, analysis-ready datasets. 
        Our data cleaning process ensures your data is accurate, consistent, and properly formatted 
        for your specific analytical needs.
      </p>
      
      <div className="section">
        <h3>Common Data Issues We Handle:</h3>
        <div className="skills-container">
          {commonIssues.map((issue, index) => (
            <SkillChip key={index} label={issue} />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Case Studies:</h3>
        <div className="case-studies-grid">
          <CaseStudyCard
            title="Local Store Sales Cleanup"
            description="Cleaned weekly Excel files and standardized sales records for a small retail shop."
            tags={['Excel', 'Missing Values', 'Pandas']}
            icon={faStore}
            ctaLabel="Demo Available on Request"
          />
          <CaseStudyCard
            title="Student Survey Data Formatting"
            description="Processed raw Google Forms data into anonymized, structured CSVs for departmental analysis."
            tags={['Survey Data', 'Data Formatting', 'CSV']}
            icon={faSchool}
          />
          <CaseStudyCard
            title="Bank CSV Cleanup Tool"
            description="Built a script to parse and clean messy bank statements for personal budgeting."
            tags={['CSV', 'Text Cleaning', 'Python']}
            icon={faPiggyBank}
            ctaLabel="Open Notebook"
          />
          <CaseStudyCard
            title="E-Commerce Order Cleanup"
            description="Normalized and deduplicated 50k+ transaction records across multiple sales platforms."
            tags={['Deduplication', 'Standardization', 'Pandas']}
            icon={faShoppingCart}
          />
          <CaseStudyCard
            title="Healthcare Records Harmonization"
            description="Resolved schema conflicts and imputed missing medical data across 3 datasets."
            tags={['Healthcare', 'Missing Data', 'Data Merging']}
            icon={faHeartbeat}
            ctaLabel="Demo Available on Request"
          />
        </div>
      </div>
    </div>
  );
};

export default DataCleaningTab;