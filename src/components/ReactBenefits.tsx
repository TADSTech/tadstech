import './reactbenefits.css';
import './components.css';


import React, { useRef, useEffect, useState } from 'react';

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

const ReactBenefitsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const benefits: BenefitItem[] = [
    {
      icon: '⚛️',
      title: 'Reusable Components',
      description: 'Build modular UIs with reusable, maintainable code blocks.'
    },
    {
      icon: '🚀',
      title: 'Fast Rendering',
      description: 'Virtual DOM ensures high performance and smooth user experiences.'
    },
    {
      icon: '🌐',
      title: 'Cross-Platform',
      description: 'Create web, mobile, and desktop apps from a single codebase.'
    },
    {
      icon: '🔄',
      title: 'Rich Ecosystem',
      description: 'Leverage a vast ecosystem of libraries and tools for every need.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="react-benefits-section" id="react-benefits-section">
      <div className="react-benefits-container">
        <h2 className="react-benefits-title">Why We Chose React</h2>
        <p className="react-benefits-description">
          React brings efficiency, flexibility, and a beautiful developer experience to every project.
        </p>
        
        <div className="react-benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`benefit-item ${isVisible ? 'animate' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <div className="benefit-content">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReactBenefitsSection;