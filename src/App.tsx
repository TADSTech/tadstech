import './App.css'
import AppBar from './components/AppBar.tsx';
import HeroSection from './components/HeroSection.tsx';
import ServicesPreview from './components/ServicesPreview.tsx';
import CrossPlatformSection from './components/CrossPlatformSection.tsx';
import ReactBenefitsSection from './components/ReactBenefits.tsx';
import Footer from './components/Footer.tsx';

function App() {

  return (
    <div className="bg-background dark:bg-dark-background min-h-screen w-full m-0 p-0">
    <AppBar />
    <HeroSection />
    <ServicesPreview />
    <CrossPlatformSection />
    <ReactBenefitsSection />
    <Footer />
    </div>

  );
}

export default App;