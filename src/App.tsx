import './App.css';
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useScrollbarStyles } from 'stylisticscroll/react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainPortfolio } from './pages/MainPortfolio';
import { Challenge } from './pages/Challenge';
import { Writing } from './pages/Writing';
import { CV } from './pages/CV';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { AdminEditor } from './pages/AdminEditor';

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
        <AuthProvider>
            <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <Routes>
                    <Route path="/" element={<MainPortfolio />} />
                    <Route path="/challenge" element={<Challenge />} />
                    <Route path="/writing" element={<Writing />} />
                    <Route path="/writing/:slug" element={<Writing />} />
                    <Route path="/cv" element={<CV />} />

                    {/* Admin routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/editor/:id?"
                        element={
                            <ProtectedRoute>
                                <AdminEditor />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </AuthProvider>
    );
}
