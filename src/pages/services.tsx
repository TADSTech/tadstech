import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faBroom, 
  faChartLine, 
  faArrowUpRightDots, 
  faChartBar 
} from '@fortawesome/free-solid-svg-icons';
import DataCleaningTab from './tabs/DataCleaningTab.tsx';
import DataVizTab from './tabs/DataVizTab.tsx';
import ModelingTab from './tabs/ModelingTab.tsx';
import EDATab from './tabs/EDATab.tsx';
import './styles/ServicesPage.css';

interface Tab {
  id: string;
  label: string;
  icon: IconDefinition;
  component: React.FC;
}

const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('data_cleaning');

  const tabs: Tab[] = [
    {
      id: 'data_cleaning',
      label: 'Data Cleaning',
      icon: faBroom,
      component: DataCleaningTab
    },
    {
      id: 'data_viz',
      label: 'Data Viz',
      icon: faChartLine,
      component: DataVizTab
    },
    {
      id: 'modeling',
      label: 'Modeling',
      icon: faArrowUpRightDots,
      component: ModelingTab
    },
    {
      id: 'eda',
      label: 'EDA & Stats',
      icon: faChartBar,
      component: EDATab
    }
  ];

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabs.some(tab => tab.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DataCleaningTab;

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Services</h1>
      </div>

      <div className="services-tabs">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <FontAwesomeIcon icon={tab.icon} className="tab-icon" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="services-content">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default ServicesPage;