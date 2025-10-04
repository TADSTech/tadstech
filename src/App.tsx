import { useEffect, useRef, useState } from 'react';
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar';
import './App.css';
import AppBar from './components/AppBar.tsx';
import HeroSection from './components/HeroSection.tsx';
import ServicesPreview from './components/ServicesPreview.tsx';
import CrossPlatformSection from './components/CrossPlatformSection.tsx';
import ReactBenefitsSection from './components/ReactBenefits.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  const ref = useRef<LoadingBarRef>(null);
  const [showFullScreen, setShowFullScreen] = useState(() => {
    return !sessionStorage.getItem('hasLoaded');
  });

  useEffect(() => {
    if (showFullScreen) {
      console.log('App: Starting initial loading bar and full-screen loader');
      ref.current?.continuousStart();
      const timer = setTimeout(() => {
        console.log('App: Completing initial loading bar and full-screen loader');
        ref.current?.complete();
        setShowFullScreen(false);
        sessionStorage.setItem('hasLoaded', 'true');
      }, 3000);
      return () => {
        console.log('App: Cleaning up initial load timer');
        clearTimeout(timer);
      };
    }
  }, [showFullScreen]);

  return (
    <>
      {showFullScreen && (
        <>
          <LoadingBar
            height={4}
            color="#3B82F6"
            shadow={true}
            ref={ref}
          />
          <div className="fixed inset-0 bg-background dark:bg-dark-background flex items-center justify-center z-50">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary mb-4"></div>
              <h2 className="text-2xl font-bold text-primary dark:text-white">Loading TADS Tech</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Preparing your experience...</p>
            </div>
          </div>
        </>
      )}
      {!showFullScreen && (
        <div className="bg-background dark:bg-dark-background min-h-screen w-full m-0 p-0">
          <AppBar />
          <HeroSection />
          <ServicesPreview />
          <CrossPlatformSection />
          <ReactBenefitsSection />
          <Footer />
        </div>
      )}
    </>
  );
}