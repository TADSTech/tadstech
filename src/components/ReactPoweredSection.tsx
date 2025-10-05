import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaReact } from "react-icons/fa";
import './reactpowered.css';

interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

const ReactPoweredSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const platformRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
    <section ref={sectionRef} className="react-powered-section" id="react-powered" aria-label="React Powered Development Section">
      <Helmet>
        <title>React Powered Development | TADS - Michael Tunwashe</title>
        <meta
          name="description"
          content="Discover why TADS uses React for cross-platform development. Build efficient, reusable, and high-performance web, iOS, and Android apps with Michael Tunwashe."
        />
        <meta
          name="keywords"
          content="TADS, Michael Tunwashe, React developer, cross-platform apps, React Native, web development, mobile apps, Nigeria, full-stack developer"
        />
        <meta name="author" content="Michael Tunwashe" />
        <meta property="og:title" content="React Powered Development by TADS" />
        <meta
          property="og:description"
          content="Explore how TADS leverages React and React Native for seamless cross-platform solutions, delivering modular and high-performance apps."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="react-powered-container">
        <h2 className="react-powered-title">Powered by React</h2>
        <p className="react-powered-description">
          One codebase for seamless cross-platform development, delivering efficient and flexible solutions.
        </p>

        <div className={`platform-grid ${isMobile ? 'mobile-layout' : ''}`} aria-label="Supported Platforms">
          <div
            className="platform-item"
            ref={el => { platformRefs.current[0] = el; }}
          >
            <div className="platform-icon-container">
              <img
                src="/icons/web.png"
                alt="Web Platform"
                className="platform-icon"
              />
            </div>
            <span className="platform-label">Web</span>
          </div>
          <div
            className="platform-item"
            ref={el => { platformRefs.current[1] = el; }}
          >
            <div className="platform-icon-container">
              <img
                src="/icons/android.png"
                alt="Android Platform"
                className="platform-icon"
              />
            </div>
            <span className="platform-label">Android</span>
          </div>
          <div
            className="platform-item"
            ref={el => { platformRefs.current[2] = el; }}
          >
            <div className="platform-icon-container">
              <img
                src="/icons/ios.png"
                alt="iOS Platform"
                className="platform-icon"
              />
            </div>
            <span className="platform-label">iOS</span>
          </div>
          <div className="react-center">
            <FaReact className="react-icon" aria-label="React Logo" />
          </div>
        </div>

        <p className="react-powered-tagline">
          Seamless cross-platform development powered by React Native for mobile excellence.
        </p>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <article 
              key={index}
              className={`benefit-item ${isVisible ? 'animate' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              aria-label={`Benefit: ${benefit.title}`}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <div className="benefit-content">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReactPoweredSection;