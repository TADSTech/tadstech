import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      description: 'Expertly transform raw, messy datasets into clean, structured formats ready for advanced analysis and ML pipelines.',
      icon: faBroom,
      route: '/services?tab=data_cleaning',
    },
    {
      title: 'Data Visualization',
      description: 'Design interactive, insightful dashboards and charts that uncover hidden patterns and drive data-informed decisions.',
      icon: faChartLine,
      route: '/services?tab=data_viz',
    },
    {
      title: 'Regression & Modeling',
      description: 'Develop accurate predictive models using advanced regression techniques to forecast trends and optimize business outcomes.',
      icon: faArrowUpRightDots,
      route: '/services?tab=modeling',
    },
    {
      title: 'EDA & Statistics',
      description: 'Conduct thorough exploratory data analysis with statistical methods to reveal key insights and guide strategic planning.',
      icon: faChartBar,
      route: '/services?tab=eda',
    },
  ];

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className="services-preview" id="services-preview">
      <Helmet>
        <title>TADS Services Preview | Data Science Solutions by Michael Tunwashe</title>
        <meta
          name="description"
          content="Explore TADS data science services: expert data cleaning, visualization, modeling, and exploratory analysis for actionable insights."
        />
        <meta
          name="keywords"
          content="TADS, Michael Tunwashe, data cleaning, data visualization, machine learning modeling, EDA, data scientist, Nigeria, React developer"
        />
        <meta name="author" content="Michael Tunwashe" />
        <meta property="og:title" content="TADS Services Preview - Professional Data Solutions" />
        <meta
          property="og:description"
          content="Discover Michael Tunwashe's data services: from cleaning messy datasets to building predictive models and insightful visualizations."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://tadstech.web.app/services-preview" />
      </Helmet>

      <div className="services-container">
        <h2 className="services-title">Our Core Services</h2>
        <p className="services-description">
          Tailored data science solutions to unlock your data's potential and drive business growth.
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <article
              key={index}
              className="service-card"
              onClick={() => handleServiceClick(service.route)}
              aria-label={`Learn more about ${service.title}`}
            >
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} aria-hidden="true" />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-arrow">→</div>
            </article>
          ))}
        </div>

        <a href="/services" className="services-cta" aria-label="View All Services">Explore All Services</a>
      </div>
    </section>
  );
};

export default ServicesPreview;