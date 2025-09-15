import React from 'react';
import { 
  faChartBar, 
  faChartPie, 
  faChartLine,
  faMap,
  faDashboard,
  faVirus
} from '@fortawesome/free-solid-svg-icons';
import SkillChip from '../widgets/SkillChip.tsx';
import ToolCard from '../widgets/ToolCard.tsx';
import CaseStudyCard from '../widgets/CaseStudyCard.tsx';
import './tabs.css';

const DataVizTab: React.FC = () => {
  const techniques = [
    'Interactive Dashboards',
    'Statistical Charts',
    'Geospatial Mapping',
    'Time Series Analysis',
    'Custom Styling',
    'Accessibility Focused'
  ];

  const tools = [
    { icon: faChartBar, name: 'Matplotlib', description: 'Comprehensive 2D plotting library' },
    { icon: faChartPie, name: 'Seaborn', description: 'Statistical data visualization' },
    { icon: faChartLine, name: 'Plotly', description: 'Interactive web-based visualizations' },
    { icon: faMap, name: 'Geopandas', description: 'Geospatial data visualization' }
  ];

  return (
    <div className="service-tab">
      <h2>Data Visualization Services</h2>
      <p>
        We transform complex data into clear, insightful visualizations that tell compelling stories. 
        Our visualizations help you understand patterns, trends, and outliers in your data.
      </p>
      
      <div className="section">
        <h3>Our Visualization Toolkit:</h3>
        <div className="skills-container">
          {techniques.map((technique, index) => (
            <SkillChip key={index} label={technique} />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Featured Tools:</h3>
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
        <h3>Sample Projects:</h3>
        <div className="case-studies-grid">
          <CaseStudyCard
            title="Sales Dashboard"
            description="Built an interactive sales dashboard for a retail client using Plotly Dash."
            tags={['Retail', 'Dashboards', 'Plotly']}
            icon={faDashboard}
          />
          <CaseStudyCard
            title="COVID-19 Trends"
            description="Developed time series animations of pandemic spread across regions."
            tags={['Time Series', 'Public Health', 'Seaborn']}
            icon={faVirus}
          />
        </div>
      </div>
    </div>
  );
};

export default DataVizTab;