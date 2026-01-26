import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, TrendingUp, Palette, ChevronRight } from 'lucide-react';

interface ChallengeItem {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    route: string;
    daysCompleted: number;
    totalDays: number;
    status: 'completed' | 'in-progress' | 'upcoming';
    startDate?: string;
    accentColor: string;
}

export const Challenge: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('tadstech-theme');
        return saved ? saved === 'blue' : false;
    });

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev < 90) {
                    return prev + Math.random() * 30;
                }
                return prev;
            });
        }, 1000);

        const completeTimer = setTimeout(() => {
            setLoadingProgress(100);
            setTimeout(() => setIsLoading(false), 300);
        }, 1500);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(completeTimer);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('tadstech-theme', colorMode ? 'blue' : 'gray');
    }, [colorMode]);

    const accentColor = colorMode ? '#0ea5e9' : '#28333F';

    const challenges: ChallengeItem[] = [
        {
            id: 'datasets',
            name: '30 Days of Datasets',
            description: 'A personal challenge to explore and analyze a different dataset every day. Building practical data analysis skills through hands-on exploration with Python, pandas, and machine learning.',
            icon: <Database className="h-8 w-8" />,
            route: '/challenge/datasets',
            daysCompleted: 30,
            totalDays: 30,
            status: 'completed',
            startDate: 'Oct 27, 2025',
            accentColor: '#0ea5e9'
        },
        {
            id: 'tsa',
            name: '30 Days of TSA',
            description: 'A structured journey through time-series analysis and forecasting. Building towards production-ready gold price prediction systems using ARIMA, Prophet, and LSTM models.',
            icon: <TrendingUp className="h-8 w-8" />,
            route: '/challenge/ts-analysis',
            daysCompleted: 19,
            totalDays: 30,
            status: 'in-progress',
            startDate: 'Jan 7 2026',
            accentColor: '#f59e0b'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden relative">
            {isLoading && (
                <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-900 z-[100]">
                    <div
                        className="h-full transition-all duration-300 ease-out"
                        style={{
                            width: `${loadingProgress}%`,
                            backgroundColor: accentColor
                        }}
                    ></div>
                </div>
            )}

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
                        className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg"
                        style={{ borderColor: accentColor }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wider">Back to Home</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setColorMode(prev => !prev)}
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
                    </div>
                </div>
            </nav>

            <div className="pt-24 pb-16 px-4">
                {isLoading ? (
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="border p-8 md:p-12 animate-pulse" style={{ borderColor: `${accentColor}20` }}>
                            <div className="h-12 bg-gray-800 rounded w-64 mb-4"></div>
                            <div className="h-1 w-48 bg-gray-800 rounded mb-4"></div>
                        </div>
                        {[1, 2].map(i => (
                            <div key={i} className="border p-6 animate-pulse" style={{ borderColor: `${accentColor}20` }}>
                                <div className="h-8 bg-gray-800 rounded w-48 mb-3"></div>
                                <div className="h-4 bg-gray-800 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center mb-16">
                            <div className="inline-block border p-8 md:p-12 relative mb-8 transition-all duration-300 hover:shadow-2xl w-full" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 30px ${accentColor}40` : 'none' }}>
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>

                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                                    {'>'} <span style={{ color: colorMode ? accentColor : 'white' }}>30-DAY CHALLENGES</span>
                                </h1>
                                <div className="h-px w-48 mx-auto mb-4 transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
                                    Building expertise through structured, daily learning challenges.
                                    Each challenge focuses on a specific domain with hands-on projects.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {challenges.map((challenge) => (
                                <button
                                    key={challenge.id}
                                    onClick={() => navigate(challenge.route)}
                                    className="w-full text-left border p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
                                    style={{
                                        borderColor: challenge.accentColor,
                                        boxShadow: colorMode ? `0 0 20px ${challenge.accentColor}20` : 'none'
                                    }}
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <div
                                                className="w-20 h-20 border flex items-center justify-center transition-all duration-300"
                                                style={{ borderColor: challenge.accentColor, color: challenge.accentColor }}
                                            >
                                                {challenge.icon}
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <div className="flex items-center gap-4 mb-2">
                                                    <h2 className="text-xl md:text-2xl font-bold transition-colors" style={{ color: colorMode ? challenge.accentColor : 'white' }}>
                                                        {challenge.name}
                                                    </h2>
                                                    <div className={`px-3 py-1 text-xs uppercase tracking-wider border ${challenge.status === 'completed'
                                                        ? 'text-green-400 border-green-400/50'
                                                        : challenge.status === 'in-progress'
                                                            ? 'text-amber-400 border-amber-400/50'
                                                            : 'text-gray-500 border-gray-500/50'
                                                        }`}>
                                                        {challenge.status === 'completed' ? 'Completed' : challenge.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-white/70">{challenge.description}</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs text-white/50">
                                                    <span>Progress: {challenge.daysCompleted}/{challenge.totalDays} days</span>
                                                    {challenge.startDate && <span>Started: {challenge.startDate}</span>}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm transition-all group-hover:translate-x-2" style={{ color: challenge.accentColor }}>
                                                    <span>View Challenge</span>
                                                    <ChevronRight className="h-4 w-4" />
                                                </div>
                                            </div>

                                            <div className="w-full h-2 border overflow-hidden" style={{ borderColor: `${challenge.accentColor}50` }}>
                                                <div
                                                    className="h-full transition-all duration-1000"
                                                    style={{
                                                        width: `${(challenge.daysCompleted / challenge.totalDays) * 100}%`,
                                                        backgroundColor: challenge.accentColor
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
