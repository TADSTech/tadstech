import React, { useEffect, useRef, useState } from 'react';
import './crossplatformsection.css';
import { FaReact } from "react-icons/fa";

const CrossPlatformSection: React.FC = () => {
  const platformRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section id="cross-platform-section" className="cross-platform-section">
      <div className="cross-platform-container">
        <h2 className="cross-platform-title">
          Built with React
        </h2>
        <p className="cross-platform-description">
          One codebase, all platforms
        </p>

        <div className={`platform-grid ${isMobile ? 'mobile-layout' : ''}`}>
          <div
            className="platform-item"
            ref={el => { platformRefs.current[0] = el; }}
          >
            <div className="platform-icon-container">
              <img
                src="/icons/web.png"
                alt="Web"
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
                alt="Android"
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
                alt="iOS"
                className="platform-icon"
              />
            </div>
            <span className="platform-label">iOS</span>
          </div>
          <div className="react-center">
            <FaReact className="react-icon" />
          </div>
        </div>

        <p className="cross-platform-tagline">
          Seamless cross-platform development powered by React Native for mobile excellence.
        </p>
      </div>
    </section>
  );
};

export default CrossPlatformSection;