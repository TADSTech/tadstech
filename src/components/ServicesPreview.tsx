import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { 
  faBroom, 
  faChartLine, 
  faChartBar,
  faArrowUpRightDots
} from '@fortawesome/free-solid-svg-icons';
import './servicespreview.css';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ServiceModel {
  title: string;
  description: string;
  icon: IconDefinition;
  route: string;
}

const ServicesPreview: React.FC = () => {
  const navigate = useNavigate();

  const services: ServiceModel[] = [
    {
      title: 'Data Cleaning',
      description: 'Transform messy data into analysis-ready datasets.',
      icon: faBroom,
      route: '/services?tab=data_cleaning',
    },
    {
      title: 'Data Visualization',
      description: 'Create insightful and beautiful visualizations.',
      icon: faChartLine,
      route: '/services?tab=data_viz',
    },
    {
      title: 'Regression & Modeling',
      description: 'Build predictive models for your business needs.',
      icon: faArrowUpRightDots,
      route: '/services?tab=modeling',
    },
    {
      title: 'EDA & Statistics',
      description: 'Comprehensive exploratory data analysis.',
      icon: faChartBar,
      route: '/services?tab=eda',
    },
  ];

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className="services-preview">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <p className="services-description">
          Comprehensive data science solutions tailored to your needs
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              onClick={() => handleServiceClick(service.route)}
            >
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;