import './App.css';
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useScrollbarStyles } from 'stylisticscroll/react';
import { DesktopRender } from './desktop/desktopRender';
import { MobileRender } from './mobile/mobileRender';
import { MainPortfolio } from './pages/MainPortfolio';
import { Challenge } from './pages/Challenge';

export default function App() {
    useScrollbarStyles({ hideScrollbar: true });
    const [isMobile, setIsMobile] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const location = useLocation();
    const prevLocationRef = useRef(location.pathname);

    useEffect(() => {
        if (prevLocationRef.current !== location.pathname) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                prevLocationRef.current = location.pathname;
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [location.pathname]);

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
        <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <Routes>
                <Route path="/" element={<MainPortfolio />} />
                <Route 
                    path="/terminal" 
                    element={
                        isMobile ? (
                            <div className='min-h-screen w-full bg-black'>
                                <MobileRender />
                            </div>
                        ) : (
                            <div className='flex min-h-screen w-full items-center justify-center bg-primary p-4'>
                                <div className='h-[90vh] w-[90vw] overflow-hidden rounded-lg border border-neutral-800 bg-black shadow-2xl'>
                                    <DesktopRender />
                                </div>
                            </div>
                        )
                    } 
                />
                <Route path="/challenge" element={<Challenge />} />
            </Routes>
        </div>
    );
}
