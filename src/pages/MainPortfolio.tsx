import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Database, Code, Github, Mail, Linkedin, ExternalLink, Palette, Briefcase, Cpu, Feather, TreePine } from 'lucide-react';

type Layer = 'hero' | 'experience' | 'projects' | 'contact';

export const MainPortfolio: React.FC = () => {
    const navigate = useNavigate();
    const [currentLayer, setCurrentLayer] = useState<Layer>('hero');
    const [isAnimating, setIsAnimating] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('tadstech-theme');
        return saved ? saved === 'blue' : false;
    });
    const [holidayMode, setHolidayMode] = useState(() => {
        const now = new Date();
        const isHolidaySeason = now.getMonth() === 11 && now.getDate() <= 29;
        const saved = localStorage.getItem('tadstech-holiday');
        return saved !== null ? saved === 'true' : isHolidaySeason;
    });
    const [autoSwapInterval, setAutoSwapInterval] = useState<NodeJS.Timeout | null>(null);
    const [clickCount, setClickCount] = useState(0);
    const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
    const fullText = '> MICHAEL_TUNWASHE._init()';

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        localStorage.setItem('tadstech-theme', colorMode ? 'blue' : 'gray');
    }, [colorMode]);

    useEffect(() => {
        if (currentLayer === 'hero' || isMobile) {
            let i = 0;
            setDisplayText('');
            const timer = setInterval(() => {
                if (i < fullText.length) {
                    setDisplayText(fullText.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 100);
            return () => clearInterval(timer);
        }
    }, [currentLayer, isMobile]);

    useEffect(() => {
        return () => {
            if (clickTimer) clearTimeout(clickTimer);
            if (autoSwapInterval) clearInterval(autoSwapInterval);
        };
    }, [clickTimer, autoSwapInterval]);

    const handleThemeClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (clickTimer) clearTimeout(clickTimer);

        if (newCount === 3) {
            if (autoSwapInterval) {
                clearInterval(autoSwapInterval);
                setAutoSwapInterval(null);
            } else {
                const interval = setInterval(() => {
                    setColorMode(prev => !prev);
                }, 5000);
                setAutoSwapInterval(interval);
            }
            setClickCount(0);
        } else {
            if (!autoSwapInterval) {
                setColorMode(prev => !prev);
            }
            const timer = setTimeout(() => {
                setClickCount(0);
            }, 500);
            setClickTimer(timer);
        }
    };

    const navigateToLayer = (layer: Layer) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentLayer(layer);
            setIsAnimating(false);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        }, 300);
    };

    const handleHolidayToggle = () => {
        setHolidayMode(prev => {
            localStorage.setItem('tadstech-holiday', String(!prev));
            return !prev;
        });
    };

    const holidayColors = ['#dc2626', '#16a34a'];
    const getHolidayColor = () => holidayColors[Math.floor(Date.now() / 1000) % 2];
    const accentColor = holidayMode ? getHolidayColor() : (colorMode ? '#0ea5e9' : '#28333F');

    const projects = [
        {
            name: 'Financial News Classifier',
            desc: 'Financial news sentiment classifier using PyTorch and scikit-learn for analyzing market sentiment from news articles.',
            tech: ['Python', 'PyTorch', 'scikit-learn', 'FastAPI', 'Docker'],
            metrics: { accuracy: '93%', Status: 'Complete', Completion: 'Nov 2025' },
            url: 'https://tadstech.github.io/financial-news-classifier'
        },
        {
            name: 'Brazilian Retail Intelligence System (BRIS)',
            desc: 'ETL workflows and dashboard for processing retail transaction data and visualizing business metrics.',
            tech: ['Python', 'SQLAlchemy', 'FastAPI', 'PostgreSQL', 'Docker', 'React', 'TypeScript'],
            metrics: { components: '5', Status: 'Complete', Completion: 'Nov 2025' },
            url: 'https://brazilian-retail-intelligence-syste.vercel.app'
        },
        {
            name: 'Mini Data Manim',
            desc: 'Frontend tool for animating charts and statistics with Python preprocessing for data cleaning.',
            tech: ['React', 'TypeScript', 'Python', 'Plotly'],
            metrics: { type: 'Animation Tool', Status: 'Complete', Completion: 'Sep 2025' },
            url: 'https://minidatamanim.web.app'
        },
        {
            name: 'Naija Economic Dashboard',
            desc: 'Interactive dashboard tracking Nigerian financial indicators with API integration.',
            tech: ['Python', 'Dash', 'Plotly', 'API Integration'],
            metrics: { type: 'Dashboard', Status: 'Complete', Completion: 'Feb 2025' },
            url: 'https://naija-econo-plotlydash.onrender.com',
        },
        {
            name: 'Mousiki Mini',
            desc: 'Simplified Music Recommendation System - Hybrid recommendation system combining Content-Based Filtering and Neural Collaborative Filtering. Built local-first application with CLI interface using Typer.',
            tech: ['Python', 'Typer', 'Machine Learning', 'CLI'],
            metrics: { type: 'Recommendation System', Status: 'Complete', Completion: 'Dec 2025' },
            url: 'https://github.com/tadstech/mousiki-mini'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden relative">
            <Helmet>
                <title>Michael Tunwashe | Junior ML Engineer & Python Data Engineer</title>
                <meta name="description" content="Junior Machine Learning & Data Engineering practitioner with strong Python skills. Building ETL workflows, ML models, and data pipelines. BSc Mathematics student at University of Lagos." />
                <meta name="keywords" content="Michael Tunwashe, TADS, Junior ML Engineer, Data Engineer, Python Developer, Machine Learning, ETL Workflows, PyTorch, FastAPI, Docker, Data Analysis, Lagos, Nigeria, University of Lagos, Data Science" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tadstech.web.app/" />
                <meta property="og:title" content="Michael Tunwashe | Junior ML Engineer & Python Data Engineer" />
                <meta property="og:description" content="Junior Machine Learning & Data Engineering practitioner with strong Python skills. Building ETL workflows, ML models, and data pipelines." />
                <meta property="og:image" content="https://tadstech.web.app/logo.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://tadstech.web.app/" />
                <meta property="twitter:title" content="Michael Tunwashe | Junior ML Engineer & Python Data Engineer" />
                <meta property="twitter:description" content="Junior Machine Learning & Data Engineering practitioner with strong Python skills. Building ETL workflows, ML models, and data pipelines." />
                <meta property="twitter:image" content="https://tadstech.web.app/logo.png" />
                <meta name="author" content="Michael Tunwashe" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="https://tadstech.web.app/" />
            </Helmet>
            <div className="fixed inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accentColor} 2px, ${accentColor} 4px)`,
                    backgroundSize: '100% 4px'
                }}></div>
            </div>

            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b transition-colors duration-300" style={{ borderColor: accentColor }}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
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
                            title={autoSwapInterval ? "Triple-click active! Click 3x to stop" : "Triple-click for auto-swap"}
                        >
                            <Palette className={`h-4 w-4 ${autoSwapInterval ? 'animate-spin' : ''}`} />
                            <span className="text-xs uppercase tracking-wider hidden sm:inline">
                                {autoSwapInterval ? 'Auto' : colorMode ? 'Color' : 'B&W'}
                            </span>
                        </button>

                        <button
                            onClick={() => navigate('/writing')}
                            className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg cursor-pointer"
                            style={{ borderColor: accentColor }}
                        >
                            <Feather className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider hidden sm:inline">Writing</span>
                        </button>
                    </div>
                    
                    <div className="hidden md:flex gap-2">
                        {(['hero', 'experience', 'projects', 'contact'] as Layer[]).map((layer) => (
                            <button
                                key={layer}
                                onClick={() => navigateToLayer(layer)}
                                className="px-3 py-1.5 text-xs uppercase tracking-wider transition-all hover:shadow-lg cursor-pointer"
                                style={{
                                    backgroundColor: currentLayer === layer ? accentColor : 'transparent',
                                    color: 'white',
                                    border: `1px solid ${accentColor}`
                                }}
                            >
                                {layer}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex items-center gap-2 text-white border px-3 py-1.5 cursor-pointer"
                        style={{ borderColor: accentColor }}
                    >
                        <span className="text-xs uppercase tracking-wider">Menu</span>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden border-t bg-black/98 backdrop-blur-md relative overflow-hidden" style={{ borderColor: accentColor }}>
                        <div className="absolute inset-0 opacity-5 pointer-events-none">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${accentColor} 10px, ${accentColor} 11px)`
                            }}></div>
                        </div>
                        
                        <div className="relative z-10 px-4 py-4">
                            <div className="mb-3 flex items-center justify-between pb-2 border-b" style={{ borderColor: `${accentColor}40` }}>
                                <span className="text-[10px] font-mono tracking-wider text-white/60">NAVIGATION_MENU</span>
                                <div className="flex gap-1">
                                    {[...Array(6)].map((_, i) => (
                                        <div 
                                            key={i} 
                                            className="w-1 h-1 rounded-full animate-pulse" 
                                            style={{ 
                                                backgroundColor: accentColor,
                                                animationDelay: `${i * 150}ms`
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {(['hero', 'experience', 'projects', 'contact'] as Layer[]).map((layer, idx) => (
                                    <button
                                        key={layer}
                                        onClick={() => {
                                            const element = document.getElementById(layer);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth' });
                                            }
                                            setMobileMenuOpen(false);
                                        }}
                                        className="relative group overflow-hidden px-4 py-3 text-xs uppercase tracking-wider transition-all font-mono cursor-pointer"
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: `1px solid ${accentColor}40`,
                                        }}
                                    >
                                        <div className="absolute top-0 right-0 text-[8px] font-mono opacity-30" style={{ color: accentColor }}>
                                            0{idx + 1}
                                        </div>
                                        <div className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" 
                                             style={{ backgroundColor: accentColor }}
                                        ></div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ border: `1px solid ${accentColor}` }}></div>
                                            <span className="relative z-10">{layer.toUpperCase()}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="border-t pt-3 space-y-2" style={{ borderColor: `${accentColor}40` }}>
                                <button
                                    onClick={() => handleHolidayToggle()}
                                    className="w-full px-4 py-3 text-xs uppercase tracking-wider transition-all font-mono flex items-center justify-between group relative overflow-hidden cursor-pointer"
                                    style={{
                                        backgroundColor: holidayMode ? '#16a34a20' : 'transparent',
                                        border: `1px solid ${accentColor}`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <div className="flex items-center gap-3">
                                        <TreePine className="h-4 w-4" />
                                        <div className="text-left">
                                            <div className="text-xs">{holidayMode ? 'FESTIVE_MODE' : 'NORMAL_MODE'}</div>
                                            <div className="text-[8px] text-white/50">Toggle holiday theme</div>
                                        </div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: holidayMode ? '#16a34a' : 'transparent', border: `1px solid ${accentColor}` }}></div>
                                </button>

                                <button
                                    onClick={() => handleThemeClick()}
                                    className="w-full px-4 py-3 text-xs uppercase tracking-wider transition-all font-mono flex items-center justify-between group relative overflow-hidden cursor-pointer"
                                    style={{
                                        backgroundColor: colorMode ? `${accentColor}20` : 'transparent',
                                        border: `1px solid ${accentColor}`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <div className="flex items-center gap-3">
                                        <Palette className={`h-4 w-4 ${autoSwapInterval ? 'animate-spin' : ''}`} />
                                        <div className="text-left">
                                            <div className="text-xs">{autoSwapInterval ? 'AUTO_SWAP' : colorMode ? 'COLOR_MODE' : 'MONO_MODE'}</div>
                                            <div className="text-[8px] text-white/50">Triple-click to {autoSwapInterval ? 'stop' : 'enable'}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <div 
                                                key={i} 
                                                className="w-1.5 h-1.5 rounded-full transition-all" 
                                                style={{ 
                                                    backgroundColor: autoSwapInterval ? accentColor : 'transparent',
                                                    border: `1px solid ${accentColor}`,
                                                    transform: autoSwapInterval ? 'scale(1.2)' : 'scale(1)',
                                                    animationDelay: `${i * 200}ms`
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </button>

                                <div className="flex items-center justify-between text-[9px] font-mono text-white/40 px-2">
                                    <span>SECTIONS: 4</span>
                                    <span>MODE: {colorMode ? 'CLR' : 'B&W'}</span>
                                    <span>STATUS: ACTIVE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {(isMobile || currentLayer === 'hero') && (
                    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-28 pb-28">
                        <div className="max-w-5xl w-full animate-fadeIn">
                            <div className="border p-12 md:p-20 relative transition-all duration-300 hover:shadow-2xl" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 30px ${accentColor}40` : 'none' }}>
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>

                                <div className="text-center space-y-8 md:space-y-12">
                                    <div className="h-12 sm:h-16 flex items-center justify-center px-2 relative">
                                        {holidayMode && (
                                            <svg 
                                                className="absolute -top-6 left-1/2 -translate-x-1/2 md:-top-8 w-12 h-12 md:w-16 md:h-16 -rotate-12"
                                                viewBox="0 0 64 64" 
                                                fill="none"
                                            >
                                                <path d="M32 8L48 40H16L32 8Z" fill="#dc2626"/>
                                                <path d="M32 2L38 14H26L32 2Z" fill="#dc2626"/>
                                                <ellipse cx="32" cy="42" rx="18" ry="6" fill="white"/>
                                                <circle cx="32" cy="4" r="4" fill="white"/>
                                            </svg>
                                        )}
                                        <span className="text-xl sm:text-2xl md:text-4xl tracking-widest leading-tight text-center break-words" style={{ color: colorMode ? accentColor : 'white' }}>
                                            {displayText}
                                            <span className="inline-block ml-1 animate-pulse" aria-hidden="true">_</span>
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                            Junior <span style={{ color: colorMode ? accentColor : 'white' }}>ML Engineer</span>
                                        </h1>
                                        
                                        <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base text-white/70 font-mono">
                                            <span>Lagos, Nigeria</span>
                                            <span className="hidden sm:inline">|</span>
                                            <span>+234-704-102-9093</span>
                                            <span className="hidden sm:inline">|</span>
                                            <span>motrenewed@gmail.com</span>
                                        </div>

                                        <div className="h-px w-40 mx-auto transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                        
                                        <p className="text-sm md:text-base text-white/80 max-w-3xl mx-auto leading-relaxed">
                                            Junior ML Engineer & Data Engineering practitioner. Building end-to-end data solutions with Python, PyTorch, SQL, and FastAPI. Interested in ML Engineering, Data Engineering, and Finance.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8">
                                        {[
                                            { value: '4', label: 'Personal Projects' },
                                            { value: '3M', label: 'Intern Experience' },
                                            { value: '93%', label: 'ML Model Accuracy' },
                                            { value: '2028', label: 'BSc Mathematics' },
                                        ].map((stat, i) => (
                                            <div key={i} className="border p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}20` : 'none' }}>
                                                <div className="text-2xl md:text-3xl font-bold transition-colors duration-300" style={{ color: colorMode ? accentColor : 'white' }}>
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs text-white/90 uppercase mt-1">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-center gap-3 pt-8">
                                        {[
                                            { Icon: Linkedin, url: 'https://linkedin.com/in/tadstech', label: 'LinkedIn' },
                                            { Icon: Github, url: 'https://github.com/tadstech', label: 'GitHub' },
                                            { Icon: Mail, url: 'mailto:motrenewed@gmail.com', label: 'Email' },
                                        ].map(({ Icon, url, label }) => (
                                            <a
                                                key={label}
                                                href={url}
                                                target={label !== 'Email' ? '_blank' : undefined}
                                                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                                                aria-label={label}
                                                className="p-2 hover:opacity-80 transition-all border hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                                                style={{ borderColor: accentColor }}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        ))}
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            onClick={() => navigate('/cv')}
                                            className="inline-flex items-center gap-2 border px-6 py-2.5 hover:shadow-lg transition-all text-xs uppercase tracking-wider hover:-translate-y-1 cursor-pointer"
                                            style={{ 
                                                borderColor: accentColor,
                                                backgroundColor: colorMode ? accentColor : 'transparent',
                                                color: 'white'
                                            }}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            <span>View Resume</span>
                                        </button>
                                    </div>

                                    <div className="pt-8 space-y-3 relative group/challenge">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-white/90 uppercase tracking-wider">30-Day Data Challenge</span>
                                            <span className="font-bold" style={{ color: colorMode ? accentColor : 'white' }}>COMPLETED</span>
                                        </div>
                                        
                                        <button
                                            onClick={() => navigate('/challenge')}
                                            className="w-full h-10 border relative overflow-hidden transition-all hover:shadow-lg group cursor-pointer"
                                            style={{ 
                                                borderColor: accentColor,
                                                backgroundColor: colorMode ? `${accentColor}10` : 'rgba(255,255,255,0.05)'
                                            }}
                                        >
                                            {/* Progress fill - Full width now */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                                style={{ 
                                                    backgroundColor: colorMode ? accentColor : 'white',
                                                }}
                                            ></div>
                                            
                                            {/* Animated shine effect - only on hover */}
                                            <div 
                                                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                                                style={{
                                                    background: `linear-gradient(90deg, transparent 0%, ${colorMode ? accentColor : 'white'} 50%, transparent 100%)`,
                                                    animation: 'shine 3s infinite',
                                                    backgroundSize: '200% 100%'
                                                }}
                                            ></div>

                                            
                                            <div className="absolute inset-0 flex items-center justify-center gap-2">
                                                <span className="text-xs font-mono font-bold tracking-widest" style={{ color: colorMode ? accentColor : 'white' }}>
                                                    VIEW JOURNEY
                                                </span>
                                                <ExternalLink className="h-3 w-3" style={{ color: colorMode ? accentColor : 'white' }} />
                                            </div>

                                            {/* Background grid pattern */}
                                            <div 
                                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                                                style={{
                                                    backgroundImage: `repeating-linear-gradient(90deg, ${accentColor} 0px, transparent 1px, transparent 4px)`,
                                                    backgroundSize: '4px 100%'
                                                }}
                                            ></div>
                                        </button>

                                        {/* Stats below bar */}
                                        <div className="flex justify-between text-[10px] text-white/50 font-mono">
                                            <span>Oct 27 - Nov 25</span>
                                            <span style={{ color: colorMode ? accentColor : 'white' }}>30 Datasets Analyzed</span>
                                        </div>
                                    </div>

                                    <style>{`
                                        @keyframes shine {
                                            0% { background-position: -200% 0; }
                                            100% { background-position: 200% 0; }
                                        }
                                    `}</style>

                                    <button
                                        onClick={() => navigateToLayer('experience')}
                                        className="mt-8 flex items-center gap-3 mx-auto border px-8 py-3 hover:shadow-lg transition-all group hover:-translate-y-1 cursor-pointer"
                                        style={{ 
                                            borderColor: accentColor,
                                            backgroundColor: colorMode ? accentColor : 'transparent'
                                        }}
                                    >
                                        <span className="text-xs uppercase tracking-wider">Dive Deeper</span>
                                        <ChevronDown className="h-4 w-4 animate-bounce group-hover:animate-none" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {(isMobile || currentLayer === 'experience') && (
                    <section id="experience" className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
                        <div className="max-w-6xl w-full space-y-12">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 font-mono">
                                    {'>'} <span style={{ color: colorMode ? accentColor : 'white' }}>EXPERIENCE</span>.load()
                                </h2>
                                <div className="h-px w-48 mx-auto transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                <p className="text-sm text-white/60 mt-4 font-mono">Technical Arsenal & Professional Trajectory</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="border p-6 bg-black/50 backdrop-blur-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                                     style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}10` : 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 border bg-black/50" style={{ borderColor: `${accentColor}40` }}>
                                                <Database className="h-6 w-6" style={{ color: colorMode ? accentColor : 'white' }} />
                                            </div>
                                            <span className="text-[10px] font-mono opacity-50 tracking-widest">MOD_DATA</span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold mb-3" style={{ color: colorMode ? accentColor : 'white' }}>Data & ML Engineering</h3>
                                        <p className="text-sm text-white/70 mb-6 leading-relaxed font-mono">
                                            Building <span className="text-white font-bold">ETL workflows</span> and <span className="text-white font-bold">ML models</span>. Learning to transform raw data into insights through hands-on projects.
                                        </p>
                                        
                                        <div className="mt-auto space-y-4">
                                            <div className="h-px w-full bg-white/10"></div>
                                            <div className="flex flex-wrap gap-2">
                                                {['Python', 'Pandas', 'PyTorch', 'Scikit-Learn', 'SQL', 'FastAPI'].map((tech) => (
                                                    <span key={tech} className="text-[10px] border px-2 py-1 rounded-sm font-mono transition-colors hover:bg-white/5" 
                                                          style={{ borderColor: `${accentColor}40` }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border p-6 bg-black/50 backdrop-blur-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                                     style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}10` : 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 border bg-black/50" style={{ borderColor: `${accentColor}40` }}>
                                                <Code className="h-6 w-6" style={{ color: colorMode ? accentColor : 'white' }} />
                                            </div>
                                            <span className="text-[10px] font-mono opacity-50 tracking-widest">MOD_DEV</span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold mb-3" style={{ color: colorMode ? accentColor : 'white' }}>Web Development</h3>
                                        <p className="text-sm text-white/70 mb-6 leading-relaxed font-mono">
                                            Building with <span className="text-white font-bold">React</span> and <span className="text-white font-bold">TypeScript</span> for building dashboards and data visualization interfaces.
                                        </p>
                                        
                                        <div className="mt-auto space-y-4">
                                            <div className="h-px w-full bg-white/10"></div>
                                            <div className="flex flex-wrap gap-2">
                                                {['React', 'TypeScript', 'Node.js', 'Tailwind'].map((tech) => (
                                                    <span key={tech} className="text-[10px] border px-2 py-1 rounded-sm font-mono transition-colors hover:bg-white/5" 
                                                          style={{ borderColor: `${accentColor}40` }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border p-6 bg-black/50 backdrop-blur-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                                     style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}10` : 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 border bg-black/50" style={{ borderColor: `${accentColor}40` }}>
                                                <Cpu className="h-6 w-6" style={{ color: colorMode ? accentColor : 'white' }} />
                                            </div>
                                            <span className="text-[10px] font-mono opacity-50 tracking-widest">MOD_OPS</span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold mb-3" style={{ color: colorMode ? accentColor : 'white' }}>Systems & Ops</h3>
                                        <p className="text-sm text-white/70 mb-6 leading-relaxed font-mono">
                                            Ensuring reliability through <span className="text-white font-bold">containerization</span> and automated workflows. Managing the infrastructure that powers data solutions.
                                        </p>
                                        
                                        <div className="mt-auto space-y-4">
                                            <div className="h-px w-full bg-white/10"></div>
                                            <div className="flex flex-wrap gap-2">
                                                {['Docker', 'Git', 'Linux', 'CI/CD', 'Bash', 'APIs'].map((tech) => (
                                                    <span key={tech} className="text-[10px] border px-2 py-1 rounded-sm font-mono transition-colors hover:bg-white/5" 
                                                          style={{ borderColor: `${accentColor}40` }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                                <div className="border p-6 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 40px ${accentColor}25` : 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <Database className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                            <span className="text-[10px] font-mono tracking-wider" style={{ color: colorMode ? accentColor : 'white' }}>DATA_PIPELINE</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold mb-1 font-mono" style={{ color: colorMode ? accentColor : 'white' }}>30+</div>
                                        <div className="text-xs uppercase text-white/60 tracking-wider mb-1">Datasets Explored</div>
                                        <div className="text-[10px] text-white/40 font-mono">30-Day Challenge Completed</div>
                                        
                                        <div className="mt-6 space-y-2">
                                            {[
                                                { label: 'ETL', val: 92, time: '2.3s' },
                                                { label: 'Clean', val: 88, time: '1.8s' },
                                                { label: 'Transform', val: 95, time: '3.1s' },
                                                { label: 'Load', val: 85, time: '1.5s' },
                                                { label: 'Validate', val: 90, time: '2.0s' }
                                            ].map((item, i) => (
                                                <div key={i}>
                                                    <div className="flex items-center justify-between text-[10px] mb-1">
                                                        <span className="text-white/70 font-mono">{item.label}</span>
                                                        <span className="text-white/50 font-mono">{item.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${accentColor}20` }}>
                                                            <div
                                                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                                                style={{ 
                                                                    width: `${item.val}%`,
                                                                    backgroundColor: colorMode ? accentColor : 'white',
                                                                    transitionDelay: `${i * 100}ms`,
                                                                    boxShadow: colorMode ? `0 0 8px ${accentColor}` : 'none'
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <div className="text-[10px] w-8 text-right font-mono text-white/90">{item.val}%</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="border p-6 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 40px ${accentColor}25` : 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <Code className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                            <span className="text-[10px] font-mono tracking-wider" style={{ color: colorMode ? accentColor : 'white' }}>MODEL_PERFORMANCE</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold mb-1 font-mono" style={{ color: colorMode ? accentColor : 'white' }}>93%</div>
                                        <div className="text-xs uppercase text-white/60 tracking-wider mb-1">Best Model Accuracy</div>
                                        <div className="text-[10px] text-white/40 font-mono">Financial News Classifier</div>
                                        
                                        <div className="mt-6 flex justify-center">
                                            <div className="relative w-36 h-36">
                                                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
                                                    <circle cx="60" cy="60" r="52" fill="none" stroke={`${accentColor}08`} strokeWidth="1" />
                                                    <circle cx="60" cy="60" r="44" fill="none" stroke={`${accentColor}08`} strokeWidth="1" />
                                                    
                                                    <circle
                                                        cx="60" cy="60" r="48"
                                                        fill="none"
                                                        stroke={`${accentColor}20`}
                                                        strokeWidth="12"
                                                    />
                                                    
                                                    <circle
                                                        cx="60" cy="60" r="48"
                                                        fill="none"
                                                        stroke={colorMode ? accentColor : 'white'}
                                                        strokeWidth="12"
                                                        strokeDasharray={`${2 * Math.PI * 48}`}
                                                        strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.942)}`}
                                                        strokeLinecap="round"
                                                        className="transition-all duration-1500 ease-out"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <div className="text-3xl font-bold font-mono" style={{ color: colorMode ? accentColor : 'white' }}>94</div>
                                                    <div className="text-[10px] text-white/50 font-mono">SCORE</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                            {[
                                                { label: 'Linted', val: '98%' },
                                                { label: 'Typed', val: '100%' },
                                                { label: 'Docs', val: '87%' }
                                            ].map((item, i) => (
                                                <div key={i} className="text-[10px]">
                                                    <div className="font-mono text-white/90">{item.val}</div>
                                                    <div className="text-white/50">{item.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="border p-6 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 40px ${accentColor}25` : 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <Briefcase className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                            <span className="text-[10px] font-mono tracking-wider" style={{ color: colorMode ? accentColor : 'white' }}>PIPELINE_UPTIME</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold mb-1 font-mono" style={{ color: colorMode ? accentColor : 'white' }}>99.9%</div>
                                        <div className="text-xs uppercase text-white/60 tracking-wider mb-1">Pipeline Reliability</div>
                                        <div className="text-[10px] text-white/40 font-mono">Automated Error Handling</div>
                                        
                                        <div className="mt-6 h-28 flex items-end justify-between gap-0.5">
                                            {[
                                                { val: 45, label: 'J' },
                                                { val: 60, label: 'F' },
                                                { val: 55, label: 'M' },
                                                { val: 75, label: 'A' },
                                                { val: 70, label: 'M' },
                                                { val: 85, label: 'J' },
                                                { val: 90, label: 'J' },
                                                { val: 95, label: 'A' },
                                                { val: 88, label: 'S' },
                                                { val: 92, label: 'O' },
                                                { val: 98, label: 'N' },
                                                { val: 99, label: 'D' }
                                            ].map((item, i) => (
                                                <div key={i} className="flex-1 flex flex-col items-center group/bar">
                                                    <div
                                                        className="w-full rounded-t transition-all duration-1000 ease-out hover:opacity-80"
                                                        style={{
                                                            height: `${item.val}%`,
                                                            backgroundColor: colorMode ? accentColor : 'white',
                                                            transitionDelay: `${i * 80}ms`
                                                        }}
                                                    ></div>
                                                    <div className="text-[9px] mt-1 text-white/60 font-mono">
                                                        {item.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-4 flex items-center justify-between text-[10px] font-mono">
                                            <span className="text-white/50">Latency: <span className="text-white/90">12ms</span></span>
                                            <span className="text-white/50">Req/s: <span className="text-white/90">1.2K</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border p-8 transition-all duration-300 hover:shadow-2xl bg-black/50 backdrop-blur-sm relative overflow-hidden group"
                                 style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}15` : 'none' }}>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                     style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-bold flex items-center gap-3">
                                            <Briefcase className="h-6 w-6" style={{ color: colorMode ? accentColor : 'white' }} />
                                            <span>PROFESSIONAL EXPERIENCE</span>
                                        </h3>
                                        <span className="text-[10px] font-mono opacity-50 tracking-widest hidden md:block">CAREER_LOG</span>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="border-l-2 pl-6 py-2 relative" style={{ borderColor: `${accentColor}40` }}>
                                            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="text-lg font-bold">Data Analyst Intern</h4>
                                                    <p className="text-sm text-white/70">HNG Tech</p>
                                                </div>
                                                <span className="text-xs text-white/50 font-mono border px-2 py-1 rounded" style={{ borderColor: `${accentColor}30` }}>Aug 2025 – Nov 2025</span>
                                            </div>
                                            <ul className="text-sm text-white/80 leading-relaxed max-w-3xl space-y-1 list-disc list-inside">
                                                <li>Cleaned and transformed large business datasets using Python and SQL</li>
                                                <li>Wrote SQL queries for recurring reporting tasks</li>
                                                <li>Built dashboards in Metabase to support business insights</li>
                                                <li>Assisted team with lightweight automation pipelines</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => navigateToLayer('projects')}
                                    className="border px-6 py-3 transition-all inline-flex items-center gap-2 hover:shadow-lg hover:-translate-y-1 group"
                                    style={{ 
                                        borderColor: accentColor,
                                        backgroundColor: colorMode ? accentColor : 'transparent'
                                    }}
                                >
                                    <span className="text-xs uppercase tracking-wider">View Projects</span>
                                    <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {(isMobile || currentLayer === 'projects') && (
                    <section id="projects" className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
                        <div className="max-w-6xl w-full space-y-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                                    {'>'} <span style={{ color: colorMode ? accentColor : 'white' }}>PROJECTS</span>.showcase()
                                </h2>
                                <div className="h-px w-48 mx-auto transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                            </div>

                            <div className="space-y-6">
                                {projects.map((project, i) => (
                                    <div 
                                        key={i} 
                                        className="border p-6 md:p-8 transition-all group hover:shadow-lg hover:-translate-y-1"
                                        style={{ 
                                            borderColor: accentColor,
                                            backgroundColor: 'transparent'
                                        }}
                                    >
                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="md:col-span-2 space-y-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                                                    <p className="text-sm text-white/90">{project.desc}</p>
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map((tech, j) => (
                                                        <span
                                                            key={j}
                                                            className="border px-3 py-1 text-xs uppercase tracking-wider transition-colors duration-300"
                                                            style={{ 
                                                                borderColor: colorMode ? `${accentColor}80` : '#ffffff40',
                                                                color: colorMode ? accentColor : 'white'
                                                            }}
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                <a
                                                    href={project.url ?? "https://github.com/tadstech"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm border-b pb-1 hover:gap-3 transition-all"
                                                    style={{ borderColor: colorMode ? accentColor : 'white' }}
                                                >
                                                    <span className="uppercase tracking-wider">View Project</span>
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="border p-4 transition-colors duration-300" style={{ borderColor: colorMode ? `${accentColor}60` : '#ffffff30' }}>
                                                    <div className="text-xs text-white/90 mb-2 uppercase tracking-wider">Project Info</div>
                                                    <div className="space-y-2 text-sm">
                                                        {Object.entries(project.metrics).map(([key, value]) => (
                                                            <div key={key} className="flex justify-between">
                                                                <span>{key}</span>
                                                                <span className="font-mono" style={{ color: colorMode ? accentColor : 'white' }}>{value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}



                {(isMobile || currentLayer === 'contact') && (
                    <section id="contact" className="min-h-screen flex items-center justify-center px-4 pt-20">
                        <div className="max-w-3xl w-full">
                            <div className="border p-8 md:p-16 transition-all duration-300" style={{ borderColor: accentColor }}>
                                <div className="text-center space-y-8">
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                                            {'>'} <span style={{ color: colorMode ? accentColor : 'white' }}>CONTACT</span>.init()
                                        </h2>
                                        <div className="h-px w-48 mx-auto mt-4 transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                    </div>

                                    <p className="text-sm md:text-base text-white/90 max-w-md mx-auto">
                                        Open to internships, junior positions, and freelance projects in data analysis, 
                                        ML engineering, and data visualization.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-4 pt-4">
                                        <a
                                            href="mailto:motrenewed@gmail.com"
                                            className="border p-6 transition-all hover:shadow-lg hover:-translate-y-1 group"
                                            style={{ 
                                                borderColor: accentColor,
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                            <Mail className="h-6 w-6 mx-auto mb-3" style={{ color: colorMode ? accentColor : 'white' }} />
                                            <div className="text-xs uppercase tracking-wider mb-1">Email</div>
                                            <div className="text-sm font-mono text-white/90">motrenewed@gmail.com</div>
                                        </a>
                                        <a
                                            href="https://github.com/tadstech"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="border p-6 transition-all hover:shadow-lg hover:-translate-y-1 group"
                                            style={{ 
                                                borderColor: accentColor,
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                            <Github className="h-6 w-6 mx-auto mb-3" style={{ color: colorMode ? accentColor : 'white' }} />
                                            <div className="text-xs uppercase tracking-wider mb-1">GitHub</div>
                                            <div className="text-sm font-mono text-white/90">@tadstech</div>
                                        </a>
                                    </div>

                                    <div className="border-t pt-8 mt-8 transition-colors duration-300" style={{ borderColor: accentColor }}>
                                        <div className="text-xs text-white/90 space-y-2">
                                            <div>Lagos, Nigeria</div>
                                            <div>BSc Mathematics • University of Lagos • 2024-2028</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {!isMobile && (
                <div className="fixed bottom-4 right-4 flex gap-1 z-50">
                    {(['hero', 'experience', 'projects', 'contact'] as Layer[]).map((layer) => (
                        <button
                            key={layer}
                            onClick={() => navigateToLayer(layer)}
                            className={`h-2 transition-all cursor-pointer ${
                                currentLayer === layer ? 'w-8' : 'w-2'
                            }`}
                            style={{ 
                                backgroundColor: currentLayer === layer ? (colorMode ? accentColor : 'white') : '#ffffff40'
                            }}
                            aria-label={`Navigate to ${layer}`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};
