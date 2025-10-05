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
        We expertly refine your raw data into high-quality, reliable assets. Our meticulous cleaning process eliminates errors, fills gaps, and structures information for optimal analysis and modeling.
      </p>
      
      <div className="section">
        <h3>Issues We Resolve</h3>
        <div className="skills-container">
          {commonIssues.map((issue, index) => (
            <SkillChip key={index} label={issue} />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Real-World Applications</h3>
        <div className="case-studies-grid">
          <CaseStudyCard
            title="Retail Sales Data Cleanup"
            description="Processed and standardized 6 months of sales data from multiple stores, improving reporting accuracy by 40%."
            tags={['Excel', 'Missing Values', 'Pandas']}
            icon={faStore}
            ctaLabel="Demo Available on Request"
            ctalink='https://wa.me/2347041029093'
          />
          <CaseStudyCard
            title="Student Performance Dataset"
            description="Cleaned and anonymized survey data from 500+ students, enabling accurate academic trend analysis."
            tags={['Survey Data', 'Data Formatting', 'CSV']}
            icon={faSchool}
          />
          <CaseStudyCard
            title="Personal Finance Tracker"
            description="Developed automated cleaning script for bank statements, simplifying monthly budgeting process."
            tags={['CSV', 'Text Cleaning', 'Python']}
            icon={faPiggyBank}
            ctaLabel="Open Notebook"
          />
          <CaseStudyCard
            title="E-Commerce Transaction Cleanup"
            description="Deduplicated and normalized 50k+ orders from multiple platforms, reducing error rate by 25%."
            tags={['Deduplication', 'Standardization', 'Pandas']}
            icon={faShoppingCart}
          />
          <CaseStudyCard
            title="Medical Records Integration"
            description="Harmonized patient data from 3 sources, ensuring compliance and improving query efficiency."
            tags={['Healthcare', 'Missing Data', 'Data Merging']}
            icon={faHeartbeat}
            ctaLabel="Demo Available on Request"
            ctalink='https://wa.me/2347041029093'
          />
        </div>
      </div>
    </div>
  );
};

export default DataCleaningTab;