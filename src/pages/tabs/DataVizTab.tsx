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
    { icon: faChartBar, name: 'Matplotlib', description: 'Versatile 2D plotting for publication-quality figures' },
    { icon: faChartPie, name: 'Seaborn', description: 'High-level statistical visualization interface' },
    { icon: faChartLine, name: 'Plotly', description: 'Interactive, web-ready graphs and dashboards' },
    { icon: faMap, name: 'Geopandas', description: 'Geographic data analysis and mapping' }
  ];

  return (
    <div className="service-tab">
      <h2>Data Visualization Services</h2>
      <p>
        We craft compelling visual narratives from your data, making complex information accessible and actionable. Our visualizations combine aesthetic appeal with analytical depth to drive better decisions.
      </p>
      
      <div className="section">
        <h3>Visualization Expertise</h3>
        <div className="skills-container">
          {techniques.map((technique, index) => (
            <SkillChip key={index} label={technique} />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Our Toolkit</h3>
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
        <h3>Featured Projects</h3>
        <div className="case-studies-grid">
          <CaseStudyCard
            title="Sales Performance Dashboard"
            description="Created real-time interactive dashboard for retail chain, improving sales tracking efficiency by 35%."
            tags={['Retail', 'Dashboards', 'Plotly']}
            icon={faDashboard}
          />
          <CaseStudyCard
            title="COVID-19 Spread Visualization"
            description="Developed animated geospatial maps tracking pandemic progression, used in public health reports."
            tags={['Time Series', 'Public Health', 'Seaborn']}
            icon={faVirus}
          />
        </div>
      </div>
    </div>
  );
};

export default DataVizTab;