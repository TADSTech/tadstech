import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataAnalysis from '../assets/images/data_analysis.png';
import './components.css';
import './herosection.css';


interface HeroSectionProps {
  onScrollToFlutter?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToFlutter }) => {
  const navigate = useNavigate();

  // Handle scroll to Flutter section
  const handleScrollToFlutter = () => {
    if (onScrollToFlutter) {
      onScrollToFlutter();
    } else {
      // Default scroll behavior if no callback provided
      document.getElementById('react-benefits-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
 
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          {/* Content Section */}
          <div className="hero-text-content">
            <h1 className="hero-title">
              The Average Data Scientist
            </h1>
            <p className="hero-description">
              Turning raw data into meaningful insights with clean code and clear visualizations.
            </p>
            <div className="hero-buttons">
              <button
                onClick={() => navigate('/services')}
                className="hero-primary-button"
              >
                Explore Services
              </button>
              <button
                onClick={handleScrollToFlutter}
                className="hero-secondary-button"
              >
                Why React?
              </button>
            </div>
          </div>

          {/* Mockup Section */}
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