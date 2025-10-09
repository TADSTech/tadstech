import React from 'react';
import { Helmet } from 'react-helmet';
import ServiceCard from './ServicesCard';
import './services.css'

const servicesData = [
  {
    id: 1,
    title: 'Data Science & Machine Learning',
    description:
      'I transform raw data into actionable insights using Python, Pandas, NumPy, and scikit-learn. From exploratory data analysis to building ML models, I deliver solutions for finance, HR, and research applications.',
  },
  {
    id: 2,
    title: 'Full-Stack Development',
    description:
      'I build scalable, responsive web applications with React, Next.js, TailwindCSS, and Supabase. My focus is on clean code, seamless user experiences, and robust backend integration.',
  },
  {
    id: 3,
    title: 'Data Visualization & Analytics',
    description:
      'I create intuitive dashboards and visualizations with Matplotlib and JavaScript, turning complex datasets into clear, decision-ready insights for clients.',
  },
];

const Services: React.FC = () => {
  return (
    <section className="services-section" id="services">
      <Helmet>
        <title>TADS Services | Data Science, Full-Stack Development, Analytics</title>
        <meta
          name="description"
          content="Explore Michael Tunwashe (TADS) services: expert data science, machine learning, full-stack development, and data visualization solutions for impactful projects."
        />
        <meta
          name="keywords"
          content="TADS, Michael Tunwashe, data scientist, full-stack developer, machine learning, data visualization, React, Next.js, TailwindCSS, Supabase, Nigeria"
        />
        <meta name="author" content="Michael Tunwashe" />
        <meta property="og:title" content="TADS Services - Data Science & Development" />
        <meta
          property="og:description"
          content="Discover TADS services: data science, full-stack development, and analytics by Michael Tunwashe, a mathematics major delivering real-world solutions."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="services-container">
        <div className="services-content">
          <div className="services-text">
            <h2 className="services-title">
              What Does <span className="bg-highlight">TADS</span> Do?
            </h2>
            <p className="services-description">
              As Michael Tunwashe, aka TADS, I specialize in turning data into solutions through data science, full-stack development, and insightful visualizations. My approach blends analytical precision with creative execution, delivering value for clients worldwide.
            </p>
            <p className="services-description">
              From building ML-powered apps to crafting clear dashboards, I focus on practical outcomes that drive decisions. Let’s create something impactful together.
            </p>
            <a
              href="mailto:motrenewed@gmail.com"
              className="services-button"
              aria-label="Contact TADS to discuss services"
            >
              Connect with TADS
            </a>
          </div>
          <div className="services-cards">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;