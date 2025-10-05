import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataAnalysis from '../assets/images/data_analysis.png';
import './components.css';
import './herosection.css';

interface HeroSectionProps {
  onScrollToFlutter?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const navigate = useNavigate();
  const handleSayHi = () => {
    window.location.href = 'mailto:motrenewed@gmail.com';
  };

  // Stats data inspired by InformationSummary.jsx
  const statsData = [
    { id: 1, title: 'Experience', description: '2+ Yrs' },
    { id: 2, title: 'Projects', description: '20+' },
    { id: 3, title: 'Datasets Analyzed', description: '15+' },
  ];

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          {/* Text Content */}
          <div className="hero-text-content">
            <h1 className="hero-title">
              <span className="bg-highlight">TADS</span> — The Average Data Scientist
            </h1>
            <p className="hero-description">
              I’m Michael Tunwashe, turning raw data into actionable insights and building practical solutions with code, math, and curiosity.
            </p>
            <div className="hero-buttons">
              <button
                onClick={() => navigate('/github')}
                className="hero-primary-button"
              >
                Explore My Work
              </button>
              <button
                onClick={handleSayHi}
                className="hero-secondary-button"
              >
                Connect With TADS
              </button>
            </div>
            {/* Stats Section */}
            <div className="hero-stats">
              {statsData.map((stat) => (
                <div key={stat.id} className="stat-item">
                  <p className="stat-description">{stat.description}</p>
                  <p className="stat-title">{stat.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="hero-image-container">
            <div className="hero-image-wrapper">
              <img
                src={DataAnalysis}
                alt="Data Analysis Visualization"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;