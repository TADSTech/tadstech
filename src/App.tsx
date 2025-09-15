import './App.css'
import AppBar from './components/AppBar.tsx';
import HeroSection from './components/HeroSection.tsx';
import CrossPlatformSection from './components/CrossPlatformSection.tsx';
import ReactBenefitsSection from './components/ReactBenefits.tsx';
import Footer from './components/Footer.tsx';

function App() {

  return (
    <div className="bg-background dark:bg-dark-background h-screen w-screen m-0 p-0">
    <AppBar />
    <HeroSection />
    <CrossPlatformSection />
    <ReactBenefitsSection />
    <Footer />
    </div>

  );
}

export default App;