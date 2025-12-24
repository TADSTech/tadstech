import React, { useState } from 'react';
import { Download, ChevronLeft, Palette, TreePine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const isHolidaySeason = () => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    return month === 11 && day <= 29;
};

export const CV: React.FC = () => {
    const navigate = useNavigate();
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('tadstech-theme');
        return saved ? saved === 'blue' : false;
    });
    const [holidayMode, setHolidayMode] = useState(() => {
        const saved = localStorage.getItem('tadstech-holiday');
        return saved !== null ? saved === 'true' : isHolidaySeason();
    });

    const holidayColors = ['#dc2626', '#16a34a'];
    const getHolidayColor = () => holidayColors[Math.floor(Date.now() / 1000) % 2];
    const accentColor = holidayMode ? getHolidayColor() : (colorMode ? '#0ea5e9' : '#28333F');

    const handleThemeClick = () => {
        setColorMode(prev => !prev);
        localStorage.setItem('tadstech-theme', !colorMode ? 'blue' : 'gray');
    };

    const handleHolidayToggle = () => {
        setHolidayMode(prev => {
            localStorage.setItem('tadstech-holiday', String(!prev));
            return !prev;
        });
    };

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            <div className="fixed inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accentColor} 2px, ${accentColor} 4px)`,
                    backgroundSize: '100% 4px'
                }}></div>
            </div>

            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b transition-colors duration-300" style={{ borderColor: accentColor }}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg cursor-pointer"
                        style={{ borderColor: accentColor }}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wider hidden sm:inline">Back</span>
                    </button>

                    <h1 className="text-xl font-bold">Resume</h1>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleHolidayToggle}
                            className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg cursor-pointer"
                            style={{ 
                                borderColor: accentColor,
                                backgroundColor: holidayMode ? '#16a34a' : 'transparent'
                            }}
                        >
                            <TreePine className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider hidden sm:inline">
                                {holidayMode ? 'Festive' : 'Normal'}
                            </span>
                        </button>

                        <button
                            onClick={handleThemeClick}
                            className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg relative cursor-pointer"
                            style={{ 
                                borderColor: accentColor,
                                backgroundColor: colorMode ? accentColor : 'transparent'
                            }}
                        >
                            <Palette className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider hidden sm:inline">
                                {colorMode ? 'Color' : 'B&W'}
                            </span>
                        </button>

                        <a
                            href="/cv/tadscvIMP.pdf"
                            download="Michael_Tunwashe_Resume.pdf"
                            className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg cursor-pointer"
                            style={{ 
                                borderColor: accentColor,
                                backgroundColor: colorMode ? accentColor : 'transparent'
                            }}
                        >
                            <Download className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider hidden sm:inline">Download</span>
                        </a>
                    </div>
                </div>
            </nav>

            <div className="pt-20 pb-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="border transition-colors duration-300 overflow-hidden" style={{ borderColor: accentColor }}>
                        <iframe
                            src="/cv/tadscvIMP.pdf"
                            className="w-full h-screen"
                            title="Resume"
                        />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <a
                            href="/cv/tadscvIMP.pdf"
                            download="Michael_Tunwashe_Resume.pdf"
                            className="flex items-center gap-2 border px-6 py-3 hover:shadow-lg transition-all text-sm uppercase tracking-wider hover:-translate-y-1"
                            style={{ 
                                borderColor: accentColor,
                                backgroundColor: colorMode ? accentColor : 'transparent',
                                color: 'white'
                            }}
                        >
                            <Download className="h-4 w-4" />
                            <span>Download Resume</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
