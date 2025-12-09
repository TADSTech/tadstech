import './App.css';
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useScrollbarStyles } from 'stylisticscroll/react';
import { MainPortfolio } from './pages/MainPortfolio';
import { Challenge } from './pages/Challenge';
import { Writing } from './pages/Writing';
import { CV } from './pages/CV';

export default function App() {
    useScrollbarStyles({ hideScrollbar: true });
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

    return (
        <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <Routes>
                <Route path="/" element={<MainPortfolio />} />
                <Route path="/challenge" element={<Challenge />} />
                <Route path="/writing" element={<Writing />} />
                <Route path="/cv" element={<CV />} />
            </Routes>
        </div>
    );
}
