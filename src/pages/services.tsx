import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
import Footer from '../components/Footer.tsx';

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
      <Helmet>
        <title>TADS Services | Data Science & Development by Michael Tunwashe</title>
        <meta
          name="description"
          content="Explore comprehensive data science services from TADS: expert data cleaning, visualization, predictive modeling, and exploratory analysis for actionable business insights."
        />
        <meta
          name="keywords"
          content="TADS, Michael Tunwashe, data cleaning, data visualization, machine learning modeling, EDA, data scientist, full-stack developer, Nigeria, React, Python"
        />
        <meta name="author" content="Michael Tunwashe" />
        <meta property="og:title" content="TADS Services - Professional Data Solutions" />
        <meta
          property="og:description"
          content="Discover TADS' expertise in data cleaning, visualization, modeling, and EDA. Tailored solutions for data-driven decision making."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://tadstech.web.app/services" />
      </Helmet>

      <header className="services-header" aria-label="Services Header">
        <h1>Professional Data Services</h1>
        <p>
          From raw data to strategic insights: Our end-to-end data solutions empower businesses with clean, visualized, and modeled data for better decisions.
        </p>
      </header>

      <nav className="services-tabs" aria-label="Service Tabs">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              aria-label={`Switch to ${tab.label} tab`}
              aria-current={activeTab === tab.id ? 'true' : 'false'}
            >
              <FontAwesomeIcon icon={tab.icon} className="tab-icon" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="services-content">
        <ActiveComponent />
      </main>

      <a href="/contact" className="services-cta" aria-label="Contact TADS for Services">Get Started with TADS</a>

      <Footer />
    </div>
  );
};

export default ServicesPage;