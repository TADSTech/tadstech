import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ChevronDown, Database, Code, BarChart3, TrendingUp, Github, Mail, Linkedin, ExternalLink, Globe, Palette, Cpu, FileCode, Wrench, PieChart, Briefcase } from 'lucide-react';

type Layer = 'hero' | 'stats' | 'skills' | 'projects' | 'contact';

export const MainPortfolio: React.FC = () => {
    const navigate = useNavigate();
    const [currentLayer, setCurrentLayer] = useState<Layer>('hero');
    const [isAnimating, setIsAnimating] = useState(false);
    const [statsAnimated, setStatsAnimated] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('tadstech-theme');
        return saved ? saved === 'blue' : false;
    });
    const [autoSwapInterval, setAutoSwapInterval] = useState<NodeJS.Timeout | null>(null);
    const [clickCount, setClickCount] = useState(0);
    const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
    const fullText = '> MICHAEL_TUNWASHE._init()';

    useEffect(() => {
        localStorage.setItem('tadstech-theme', colorMode ? 'blue' : 'gray');
    }, [colorMode]);

    useEffect(() => {
        if (currentLayer === 'hero') {
            let i = 0;
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
    }, [currentLayer]);

    useEffect(() => {
        if (currentLayer === 'stats' && !statsAnimated) {
            setStatsAnimated(true);
        }
    }, [currentLayer, statsAnimated]);

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



    const accentColor = colorMode ? '#0ea5e9' : '#28333F';

    const projects = [
        {
            name: 'Brazilian Retail Intelligence System (BRIS)',
            desc: 'Comprehensive end-to-end Data Engineering and Business Intelligence platform combining raw data extraction, transformation, synthetic data generation, REST API development, and interactive React frontend visualization for retail analytics.',
            tech: ['Python', 'FastAPI', 'PostgreSQL', 'Supabase', 'Docker', 'React', 'TypeScript', 'Markov Chains'],
            metrics: { complexity: 9, Status: 'In Progress', Completion: 'Q4 2025' },
            url: 'https://brazilian-retail-intelligence-syste.vercel.app'
        },
        {
            name: 'SalesScope Dashboard',
            desc: 'End-to-end sales analytics platform with automated ETL pipelines, data validation, and interactive visualizations. Built complete data processing workflows from raw sales data to actionable business insights.',
            tech: ['Python', 'pandas', 'SQL', 'React', 'PlotlyJs', 'TailwindCSS'],
            metrics: { complexity: 4, Status: 'Complete', Completion: 'Q3 2025' },
            url: 'https://salesscope.web.app'
        },
        {
            name: 'Mini Data Manim',
            desc: 'Browser-based data manipulation platform with advanced statistical operations, data transformation pipelines, and dynamic visualization engine. Handles complex data workflows without external dependencies.',
            tech: ['React', 'TypeScript', 'exceljs', 'PlotlyJs', 'Statistical Libraries'],
            metrics: { complexity: 8, Status: 'Complete', Completion: 'Q4 2025' },
            url: 'https://minidatamanim.web.app'
        },
        {
            name: 'Financial News Classifier',
            desc: 'Production-ready ML pipeline for financial sentiment analysis with automated model serving, batch processing capabilities, and real-time inference API. Deployed with containerized microservices architecture.',
            tech: ['Python', 'FinBERT', 'FastAPI', 'Docker', 'Hugging Face', 'React'],
            metrics: { complexity: 8, Status: 'Complete', Completion: 'Q4 2025' },
            url: 'https://tadstech.github.io/financial-news-classifier'
        },
        {
            name: 'NaijaEconoDash',
            desc: 'Real-time economic data pipeline with automated data ingestion, transformation, and visualization. Processes multiple data sources with scheduled ETL jobs and interactive dashboard deployment.',
            tech: ['Python', 'pandas', 'Requests', 'PlotlyDash', 'Data Pipeline', 'Scheduling'],
            metrics: { complexity: 7, Status: 'Complete', Completion: 'Q4 2025' },
            url: 'https://naija-econo-plotlydash.onrender.com',
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden relative">
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
                            onClick={() => navigate('/terminal')}
                            className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg"
                            style={{ borderColor: accentColor }}
                        >
                            <Terminal className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider">Terminal</span>
                        </button>

                        <button
                            onClick={handleThemeClick}
                            className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg relative"
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
                            onClick={() => navigate('/ml-showcase')}
                            className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg"
                            style={{ borderColor: accentColor }}
                        >
                            <Cpu className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider hidden sm:inline">ML Demo</span>
                        </button>
                    </div>
                    
                    <div className="hidden md:flex gap-2">
                        {(['hero', 'stats', 'skills', 'projects', 'contact'] as Layer[]).map((layer) => (
                            <button
                                key={layer}
                                onClick={() => navigateToLayer(layer)}
                                className="px-3 py-1.5 text-xs uppercase tracking-wider transition-all hover:shadow-lg"
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
                        className="md:hidden flex items-center gap-2 text-white border px-3 py-1.5"
                        style={{ borderColor: accentColor }}
                    >
                        <Terminal className="h-4 w-4" />
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
                                {(['hero', 'stats', 'skills', 'projects', 'contact'] as Layer[]).map((layer, idx) => (
                                    <button
                                        key={layer}
                                        onClick={() => {
                                            navigateToLayer(layer);
                                            setMobileMenuOpen(false);
                                        }}
                                        className="relative group overflow-hidden px-4 py-3 text-xs uppercase tracking-wider transition-all font-mono"
                                        style={{
                                            backgroundColor: currentLayer === layer ? `${accentColor}20` : 'transparent',
                                            border: `1px solid ${currentLayer === layer ? accentColor : `${accentColor}40`}`,
                                        }}
                                    >
                                        <div className="absolute top-0 right-0 text-[8px] font-mono opacity-30" style={{ color: accentColor }}>
                                            0{idx + 1}
                                        </div>
                                        <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full" 
                                             style={{ 
                                                 width: currentLayer === layer ? '100%' : '0%',
                                                 backgroundColor: accentColor 
                                             }}
                                        ></div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentLayer === layer ? accentColor : 'transparent', border: `1px solid ${accentColor}` }}></div>
                                            <span className="relative z-10">{layer.toUpperCase()}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="border-t pt-3 space-y-2" style={{ borderColor: `${accentColor}40` }}>
                                <button
                                    onClick={() => navigate('/ml-showcase')}
                                    className="w-full px-4 py-3 text-xs uppercase tracking-wider transition-all font-mono flex items-center justify-between group relative overflow-hidden"
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: `1px solid ${accentColor}`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <div className="flex items-center gap-3">
                                        <Cpu className="h-4 w-4" />
                                        <div className="text-left">
                                            <div className="text-xs">ML_PIPELINE_DEMO</div>
                                            <div className="text-[8px] text-white/50">Interactive Visualization</div>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => {
                                        handleThemeClick();
                                    }}
                                    className="w-full px-4 py-3 text-xs uppercase tracking-wider transition-all font-mono flex items-center justify-between group relative overflow-hidden"
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
                                    <span>LAYERS: {(['hero', 'stats', 'skills', 'projects', 'contact'] as Layer[]).length}</span>
                                    <span>MODE: {colorMode ? 'CLR' : 'B&W'}</span>
                                    <span>STATUS: ACTIVE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {currentLayer === 'hero' && (
                    <section className="min-h-screen flex items-center justify-center px-6 pt-28 pb-28">
                        <div className="max-w-5xl w-full animate-fadeIn">
                            <div className="border p-12 md:p-20 relative transition-all duration-300 hover:shadow-2xl" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 30px ${accentColor}40` : 'none' }}>
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>

                                <div className="text-center space-y-8 md:space-y-12">
                                    <div className="h-12 sm:h-16 flex items-center justify-center px-2">
                                        <span className="text-xl sm:text-2xl md:text-4xl tracking-widest leading-tight text-center break-words" style={{ color: colorMode ? accentColor : 'white' }}>
                                            {displayText}
                                            <span className="inline-block ml-1 animate-pulse" aria-hidden="true">_</span>
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                            FullStack <span style={{ color: colorMode ? accentColor : 'white' }}>Data Scientist</span>
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
                                            FullStack Data Scientist with 2 years of Python experience specializing in end-to-end data solutions from <span style={{ color: colorMode ? accentColor : 'white' }}>Machine Learning Engineering</span> to <span style={{ color: colorMode ? accentColor : 'white' }}>ETL pipeline development and deployment</span>. Worked on projects in data engineering, automated workflows, AI and ML engineering, kaggle competitions and production-ready analytics systems.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8">
                                        {[
                                            { value: '02+', label: 'Coding Experience' },
                                            {value: '3M', label: 'Working Experience' },
                                            { value: '4', label: 'End-to-End Projects' },
                                            { value: '15+', label: 'Data Tools' },
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
                                                className="p-2 hover:opacity-80 transition-all border hover:shadow-lg hover:-translate-y-1"
                                                style={{ borderColor: accentColor }}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        ))}
                                    </div>

                                    <div className="pt-4">
                                        <a
                                            href="/cv/TADS-CV-FULL.pdf"
                                            download
                                            className="inline-flex items-center gap-2 border px-6 py-2.5 hover:shadow-lg transition-all text-xs uppercase tracking-wider hover:-translate-y-1"
                                            style={{ 
                                                borderColor: accentColor,
                                                backgroundColor: colorMode ? accentColor : 'transparent',
                                                color: 'white'
                                            }}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            <span>Download Resume</span>
                                        </a>
                                    </div>

                                    <div className="pt-8 space-y-3 relative group/challenge">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-white/90 uppercase tracking-wider">30-Day Data Challenge</span>
                                            <span className="font-bold" style={{ color: colorMode ? accentColor : 'white' }}>COMPLETED</span>
                                        </div>
                                        
                                        <button
                                            onClick={() => navigate('/challenge')}
                                            className="w-full h-10 border relative overflow-hidden transition-all hover:shadow-lg group"
                                            style={{ 
                                                borderColor: accentColor,
                                                backgroundColor: colorMode ? `${accentColor}10` : 'rgba(255,255,255,0.05)'
                                            }}
                                        >
                                            {/* Progress fill - Full width now */}
                                            <div
                                                className="absolute inset-0 opacity-20"
                                                style={{ 
                                                    backgroundColor: colorMode ? accentColor : 'white',
                                                }}
                                            ></div>
                                            
                                            {/* Animated shine effect */}
                                            <div 
                                                className="absolute inset-0 opacity-30"
                                                style={{
                                                    background: `linear-gradient(90deg, transparent 0%, ${colorMode ? accentColor : 'white'} 50%, transparent 100%)`,
                                                    animation: 'shine 3s infinite',
                                                    backgroundSize: '200% 100%'
                                                }}
                                            ></div>

                                            {/* Text */}
                                            <div className="absolute inset-0 flex items-center justify-center gap-2">
                                                <span className="text-xs font-mono font-bold tracking-widest" style={{ color: colorMode ? accentColor : 'white' }}>
                                                    VIEW JOURNEY
                                                </span>
                                                <ExternalLink className="h-3 w-3" style={{ color: colorMode ? accentColor : 'white' }} />
                                            </div>

                                            {/* Background grid pattern */}
                                            <div 
                                                className="absolute inset-0 opacity-10 pointer-events-none"
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

                                    {/* Add keyframe animation for shine effect */}
                                    <style>{`
                                        @keyframes shine {
                                            0% { background-position: -200% 0; }
                                            100% { background-position: 200% 0; }
                                        }
                                    `}</style>

                                    <button
                                        onClick={() => navigateToLayer('stats')}
                                        className="mt-8 flex items-center gap-3 mx-auto border px-8 py-3 hover:shadow-lg transition-all group hover:-translate-y-1"
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

                {currentLayer === 'stats' && (
                    <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
                        <div className="max-w-6xl w-full space-y-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                                    {'>'} DATA_INSIGHTS<span style={{ color: colorMode ? accentColor : 'white' }}>.analyze()</span>
                                </h2>
                                <div className="h-px w-48 mx-auto transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                <p className="text-sm text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
                                    Real-time analytics and performance metrics across data processing, code quality, and system uptime.
                                </p>
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
                                        <div className="text-4xl md:text-5xl font-bold mb-1 font-mono" style={{ color: colorMode ? accentColor : 'white' }}>
                                            {statsAnimated ? '30+' : '0'}
                                        </div>
                                        <div className="text-xs uppercase text-white/60 tracking-wider mb-1">Datasets Analyzed</div>
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
                                                                    width: statsAnimated ? `${item.val}%` : '0%',
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
                                        <div className="text-4xl md:text-5xl font-bold mb-1 font-mono" style={{ color: colorMode ? accentColor : 'white' }}>
                                            {statsAnimated ? '94%' : '0%'}
                                        </div>
                                        <div className="text-xs uppercase text-white/60 tracking-wider mb-1">Avg. Accuracy</div>
                                        <div className="text-[10px] text-white/40 font-mono">Across Deployed Models</div>
                                        
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
                                                        strokeDashoffset={statsAnimated ? `${2 * Math.PI * 48 * (1 - 0.942)}` : `${2 * Math.PI * 48}`}
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
                                            <TrendingUp className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                            <span className="text-[10px] font-mono tracking-wider" style={{ color: colorMode ? accentColor : 'white' }}>PIPELINE_UPTIME</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold mb-1 font-mono" style={{ color: colorMode ? accentColor : 'white' }}>
                                            {statsAnimated ? '99.9%' : '0%'}
                                        </div>
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
                                                            height: statsAnimated ? `${item.val}%` : '0%',
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

                            <div className="border p-8 md:p-10 transition-all duration-300 hover:shadow-2xl bg-black/50 backdrop-blur-sm relative overflow-hidden group" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 40px ${accentColor}25` : 'none' }}>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                     style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                        <BarChart3 className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                        <span className="font-mono">TECH_STACK<span style={{ color: colorMode ? accentColor : 'white' }}>.distribution()</span></span>
                                    </h3>
                                    <div className="space-y-6">
                                        {[
                                            { tech: 'Python/ML Engineering', percent: 40, count: '12 projects', IconComponent: Database, proficiency: 'Expert' },
                                            { tech: 'Data Pipeline & ETL', percent: 25, count: '8 projects', IconComponent: Database, proficiency: 'Advanced' },
                                            { tech: 'Frontend Development', percent: 20, count: '4 projects', IconComponent: FileCode, proficiency: 'Advanced' },
                                            { tech: 'DevOps & Deployment', percent: 10, count: '6 projects', IconComponent: Wrench, proficiency: 'Intermediate' },
                                            { tech: 'Dashboard & Viz', percent: 5, count: '3 projects', IconComponent: PieChart, proficiency: 'Intermediate' }
                                        ].map((item, i) => (
                                            <div key={i} className="group/item">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <item.IconComponent className="h-5 w-5" style={{ color: colorMode ? accentColor : 'white' }} />
                                                        <div>
                                                            <div className="text-sm font-medium text-white/95">{item.tech}</div>
                                                            <div className="text-[10px] text-white/50 font-mono">{item.proficiency}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xs font-mono" style={{ color: colorMode ? accentColor : 'white' }}>{item.count}</div>
                                                        <div className="text-[10px] text-white/50 font-mono">{item.percent}%</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-4 border rounded-full overflow-hidden relative" style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}>
                                                        <div
                                                            className="h-full rounded-full transition-all duration-1000 ease-out relative"
                                                            style={{
                                                                width: statsAnimated ? `${item.percent}%` : '0%',
                                                                backgroundColor: colorMode ? accentColor : 'white',
                                                                transitionDelay: `${i * 150}ms`,
                                                                boxShadow: colorMode ? `0 0 12px ${accentColor}80` : 'none'
                                                            }}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm w-12 text-right font-mono font-bold" style={{ color: colorMode ? accentColor : 'white' }}>{item.percent}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-8 pt-6 border-t grid grid-cols-3 gap-4 text-center" style={{ borderColor: `${accentColor}30` }}>
                                        <div>
                                            <div className="text-2xl font-bold font-mono" style={{ color: colorMode ? accentColor : 'white' }}>29</div>
                                            <div className="text-[10px] text-white/60 uppercase tracking-wider">Total Projects</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold font-mono" style={{ color: colorMode ? accentColor : 'white' }}>8</div>
                                            <div className="text-[10px] text-white/60 uppercase tracking-wider">Technologies</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold font-mono" style={{ color: colorMode ? accentColor : 'white' }}>5K+</div>
                                            <div className="text-[10px] text-white/60 uppercase tracking-wider">Hours Coded</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => navigateToLayer('skills')}
                                    className="border px-6 py-3 transition-all inline-flex items-center gap-2 hover:shadow-lg hover:-translate-y-1"
                                    style={{ 
                                        borderColor: accentColor,
                                        backgroundColor: colorMode ? accentColor : 'transparent'
                                    }}
                                >
                                    <span className="text-xs uppercase tracking-wider">View Skills</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {currentLayer === 'skills' && (
                    <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
                        <div className="max-w-6xl w-full space-y-12">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 font-mono">
                                    {'>'} <span style={{ color: colorMode ? accentColor : 'white' }}>EXPERIENCE</span>.load()
                                </h2>
                                <div className="h-px w-48 mx-auto transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                <p className="text-sm text-white/60 mt-4 font-mono">Tools & Languages • Crafted through real-world projects</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-black/50 backdrop-blur-sm relative overflow-hidden group"
                                     style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}15` : 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold mb-6" style={{ color: colorMode ? accentColor : 'white' }}>DATA & ML ENGINEERING</h3>
                                        <div className="space-y-4">
                                            {[
                                                { name: 'Python & pandas', level: 'Expert', percent: 95 },
                                                { name: 'SQL & SQLAlchemy', level: 'Advanced', percent: 85 },
                                                { name: 'scikit-learn & MLOps', level: 'Advanced', percent: 80 },
                                                { name: 'ETL & Pipelines', level: 'Expert', percent: 90 }
                                            ].map((skill, i) => (
                                                <div key={i} className="space-y-1">
                                                    <div className="flex justify-between items-baseline">
                                                        <span className="text-sm font-medium">{skill.name}</span>
                                                        <span className="text-xs font-mono text-white/60">{skill.level}</span>
                                                    </div>
                                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full transition-all duration-1000" 
                                                             style={{ 
                                                                 width: `${skill.percent}%`,
                                                                 backgroundColor: colorMode ? accentColor : 'white'
                                                             }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-black/50 backdrop-blur-sm relative overflow-hidden group"
                                     style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}15` : 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold mb-6" style={{ color: colorMode ? accentColor : 'white' }}>DEVELOPMENT</h3>
                                        <div className="space-y-4">
                                            {[
                                                { name: 'React', level: 'Advanced', percent: 85 },
                                                { name: 'TypeScript', level: 'Advanced', percent: 80 },
                                                { name: 'Node.js', level: 'Intermediate', percent: 65 },
                                                { name: 'Flutter', level: 'Intermediate', percent: 60 }
                                            ].map((skill, i) => (
                                                <div key={i} className="space-y-1">
                                                    <div className="flex justify-between items-baseline">
                                                        <span className="text-sm font-medium">{skill.name}</span>
                                                        <span className="text-xs font-mono text-white/60">{skill.level}</span>
                                                    </div>
                                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full transition-all duration-1000" 
                                                             style={{ 
                                                                 width: `${skill.percent}%`,
                                                                 backgroundColor: colorMode ? accentColor : 'white'
                                                             }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-black/50 backdrop-blur-sm relative overflow-hidden group"
                                     style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}15` : 'none' }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold mb-6" style={{ color: colorMode ? accentColor : 'white' }}>SYSTEMS & DEPLOYMENT</h3>
                                        <div className="space-y-4">
                                            {[
                                                { name: 'Docker & Containers', level: 'Advanced', percent: 80 },
                                                { name: 'Database Management', level: 'Advanced', percent: 85 },
                                                { name: 'Dashboard Platforms', level: 'Advanced', percent: 85 },
                                                { name: 'API Development', level: 'Advanced', percent: 80 }
                                            ].map((skill, i) => (
                                                <div key={i} className="space-y-1">
                                                    <div className="flex justify-between items-baseline">
                                                        <span className="text-sm font-medium">{skill.name}</span>
                                                        <span className="text-xs font-mono text-white/60">{skill.level}</span>
                                                    </div>
                                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full transition-all duration-1000" 
                                                             style={{ 
                                                                 width: `${skill.percent}%`,
                                                                 backgroundColor: colorMode ? accentColor : 'white'
                                                             }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border p-8 transition-all duration-300 hover:shadow-2xl bg-black/50 backdrop-blur-sm relative overflow-hidden group"
                                 style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}15` : 'none' }}>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                     style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                        <Briefcase className="h-6 w-6 transition-transform group-hover:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                        <span>PROFESSIONAL EXPERIENCE</span>
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="border-l-2 pl-6 py-2" style={{ borderColor: `${accentColor}40` }}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="text-lg font-bold">Data Analyst</h4>
                                                    <p className="text-sm text-white/70">HNG Tech Internship</p>
                                                </div>
                                                <span className="text-xs text-white/50 font-mono">3 months</span>
                                            </div>
                                            <p className="text-sm text-white/80 leading-relaxed">
                                                Performed comprehensive data analysis, created visualizations, and generated actionable insights from large datasets. Built dashboards and reports for stakeholder decision-making.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => navigateToLayer('projects')}
                                    className="border px-6 py-3 transition-all inline-flex items-center gap-2 hover:shadow-lg hover:-translate-y-1"
                                    style={{ 
                                        borderColor: accentColor,
                                        backgroundColor: colorMode ? accentColor : 'transparent'
                                    }}
                                >
                                    <span className="text-xs uppercase tracking-wider">View Projects</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {currentLayer === 'projects' && (
                    <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
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
                                                    <div className="text-xs text-white/90 mb-2 uppercase tracking-wider">Metrics</div>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span>Complexity</span>
                                                            <span className="font-mono" style={{ color: colorMode ? accentColor : 'white' }}>{project.metrics.complexity}/10</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Status</span>
                                                            <span className="font-mono" style={{ color: colorMode ? accentColor : 'white' }}>{project.metrics.Status}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Completion</span>
                                                            <span className="font-mono" style={{ color: colorMode ? accentColor : 'white' }}>{project.metrics.Completion}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => navigate('/ml-showcase')}
                                    className="border px-6 py-3 hover:shadow-lg transition-all inline-flex items-center gap-2 hover:-translate-y-1"
                                    style={{ 
                                        borderColor: accentColor,
                                        backgroundColor: colorMode ? accentColor : 'transparent'
                                    }}
                                >
                                    <span className="text-xs uppercase tracking-wider">View ML Pipeline Demo</span>
                                    <Cpu className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </section>
                )}



                {currentLayer === 'contact' && (
                    <section className="min-h-screen flex items-center justify-center px-4 pt-20">
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
                                        Available for freelance data analysis, BI dashboard development, 
                                        and full-stack application projects.
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
                                            <div>BSc Mathematics • University of Lagos</div>
                                            <div className="pt-4">
                                                <Terminal className="h-4 w-4 inline-block mr-2" style={{ color: colorMode ? accentColor : 'white' }} />
                                                <span className="font-mono">system.status = READY_TO_BUILD</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate('/terminal')}
                                        className="border px-8 py-3 transition-all inline-flex items-center gap-2 hover:shadow-lg hover:-translate-y-1"
                                        style={{ 
                                            borderColor: accentColor,
                                            backgroundColor: colorMode ? accentColor : 'transparent'
                                        }}
                                    >
                                        <Terminal className="h-4 w-4" />
                                        <span className="text-xs uppercase tracking-wider">Back to Terminal</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <div className="fixed bottom-4 right-4 flex gap-1 z-50">
                {(['hero', 'stats', 'skills', 'projects', 'contact'] as Layer[]).map((layer) => (
                    <button
                        key={layer}
                        onClick={() => navigateToLayer(layer)}
                        className={`h-2 transition-all ${
                            currentLayer === layer ? 'w-8' : 'w-2'
                        }`}
                        style={{ 
                            backgroundColor: currentLayer === layer ? (colorMode ? accentColor : 'white') : '#ffffff40'
                        }}
                        aria-label={`Navigate to ${layer}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};
