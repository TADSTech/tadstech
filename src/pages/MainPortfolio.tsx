import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Database, Code, Github, Mail, Linkedin, ExternalLink, Palette, Briefcase, Cpu, Feather, TreePine } from 'lucide-react';
import { motion } from 'motion/react';

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
    const [showToast, setShowToast] = useState(false);
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

    useEffect(() => {
        const toastTimer = setTimeout(() => {
            setShowToast(true);
        }, 3000);

        return () => clearTimeout(toastTimer);
    }, []);

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

    const investigations = [
        {
            name: '1. Financial News Sentiment Analysis',
            question: 'Does financial news sentiment contain stable predictive signal for short-term market returns?',
            status: 'Complete',
            approach: 'Data sources: News data and historical price data. Baseline: Naive return models. Comparison: Linear models vs shallow neural networks.',
            evaluation: 'Out-of-sample performance and stability across time windows',
            failure: 'Observed accuracy is regime-dependent, unstable across time periods, or driven by data leakage',
            tech: ['Python', 'PyTorch', 'scikit-learn', 'HF Transformers', 'Gradio'],
            metrics: { Status: 'Complete', Started: 'Oct 2025' },
            url: 'https://tadstech.github.io/financial-news-classifier'
        },
        {
            name: '2. Hybrid Music Recommendation Methods',
            question: 'Under what conditions does each recommendation method fail, and does a hybrid approach offer interpretable improvement over single-method baselines?',
            status: 'Complete',
            approach: 'Methods: Content-based filtering (semantic embeddings), Collaborative filtering (neural matrix factorization), Hybrid (weighted combination). Data: Music listening dataset with user-track interactions and metadata. Baseline: Implicit popularity models. Evaluation: Precision@k, Recall@k, NDCG@k, Hit Rate with temporal train/test splitting.',
            evaluation: 'Precision@k, Recall@k, NDCG@k, Hit Rate. Temporal train/test splitting to simulate realistic prediction scenarios.',
            failure: 'CBF and CF show baseline performance of 0.0, indicating dataset sparsity or embedding misalignment. Hybrid marginal improvement but still poor in absolute terms. Results reveal insufficient interaction density for matrix factorization.',
            tech: ['Python', 'PyTorch', 'scikit-learn', 'Pandas', 'BGE embeddings'],
            metrics: { Status: 'Complete', Completion: 'Dec 2025' },
            url: 'https://github.com/tadstech/mousiki-mini'
        }
    ];

    const appliedSystems = [
        {
            name: 'Brazilian Retail Intelligence System',
            desc: 'ETL workflows and dashboard for processing retail transaction data',
            url: 'https://brazilian-retail-intelligence-syste.vercel.app'
        },
        {
            name: 'Naija Economic Dashboard',
            desc: 'Interactive dashboard tracking Nigerian financial indicators',
            url: 'https://naija-econo-plotlydash.onrender.com'
        },
        {
            name: 'Mini Data Manim',
            desc: 'Animation tool for charts with Python preprocessing',
            url: 'https://minidatamanim.web.app'
        }
    ];

    return (
        <motion.div
            className="min-h-screen bg-black text-white font-mono overflow-x-hidden relative"
            exit={{
                opacity: 0,
                scale: 0.95,
                borderRadius: "20px",
                overflow: "hidden",
                transition: { duration: 0.5, ease: "easeInOut" }
            }}
        >
            <Helmet>
                <title>Michael Tunwashe | Statistical & ML Investigation | Financial Data Research</title>
                <meta name="description" content="Investigating statistical and machine learning questions using real-world financial and economic data. Research-oriented approach focused on evaluation, assumptions, and limitations. Building toward quant-adjacent and ML research roles." />
                <meta name="keywords" content="Michael Tunwashe, TADS, Statistical Analysis, Machine Learning Research, Financial Data, Economic Data, Quantitative Analysis, Time Series, Research Methodology, Data Investigation, Model Evaluation" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tadstech.web.app/" />
                <meta property="og:title" content="Michael Tunwashe | Statistical & ML Investigation | Financial Data Research" />
                <meta property="og:description" content="Investigating statistical and machine learning questions using real-world financial and economic data. Research-oriented methodology focused on questions, evaluation, and limitations." />
                <meta property="og:image" content="https://tadstech.web.app/logo.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://tadstech.web.app/" />
                <meta property="twitter:title" content="Michael Tunwashe | Mathematics Student | Statistical & ML Research" />
                <meta property="twitter:description" content="Mathematics student investigating statistical and machine learning questions using real-world data, particularly financial and economic data." />
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
                            className="btn-interactive flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg cursor-pointer"
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
                            className="btn-interactive flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg relative cursor-pointer"
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
                            className="btn-interactive flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg cursor-pointer"
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
                                className="btn-interactive px-3 py-1.5 text-xs uppercase tracking-wider transition-all hover:shadow-lg cursor-pointer"
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
                        <div className="max-w-7xl w-full animate-fadeIn">
                            <div className="relative">
                                {/* Geometric grid background */}
                                <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-10 pointer-events-none">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className="border-r transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                    ))}
                                </div>

                                <div className="relative z-10">
                                    {/* Terminal prompt */}
                                    <div className="mb-8 md:mb-12">
                                        <div className="inline-block border px-4 py-2 font-mono text-sm md:text-base" style={{ borderColor: accentColor }}>
                                            <span style={{ color: colorMode ? accentColor : 'white' }}>{displayText}</span>
                                            <span className="inline-block ml-1 animate-pulse" aria-hidden="true">_</span>
                                        </div>
                                    </div>

                                    {/* Main content grid */}
                                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                                        {/* Left column - vertical accent */}
                                        <div className="hidden md:flex flex-col justify-center">
                                            <div className="space-y-4">
                                                {['Quantitative', 'Research', 'Statistical', 'Analysis'].map((word, i) => (
                                                    <div key={i} className="border-l-2 pl-4 py-2 transition-all duration-300 hover:pl-6" style={{ borderColor: accentColor }}>
                                                        <span className="text-xs uppercase tracking-widest opacity-60">{word}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Center column - main content */}
                                        <div className="md:col-span-2 space-y-6">
                                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                                <span className="block mb-2">Quantitative Research</span>
                                                <span className="block text-2xl md:text-3xl lg:text-4xl" style={{ color: colorMode ? accentColor : 'white' }}>
                                                    & Applied ML Analysis
                                                </span>
                                            </h1>

                                            <div className="border-l-2 pl-4 py-3 space-y-2" style={{ borderColor: `${accentColor}40` }}>
                                                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                                    Working with uncertainty, models, and financial data. Focused on statistical analysis, time-series modeling, and quantitative research methods. Building toward quant-adjacent and research-oriented ML roles.
                                                </p>
                                                <div className="flex flex-wrap gap-2 text-xs text-white/60 font-mono">
                                                    <span>Lagos, Nigeria</span>
                                                    <span>•</span>
                                                    <span>motrenewed@gmail.com</span>
                                                </div>
                                            </div>

                                            {/* Employment tiers */}
                                            <div className="grid grid-cols-1 gap-3 py-4">
                                                <div className="border p-3 transition-all hover:border-opacity-100" style={{ borderColor: `${accentColor}60` }}>
                                                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: colorMode ? accentColor : 'white' }}>Seeking Roles In</div>
                                                    <div className="text-sm text-white/80">Quantitative Research • Risk Analytics • Statistical Analysis</div>
                                                </div>
                                                <div className="border p-3 transition-all hover:border-opacity-100" style={{ borderColor: `${accentColor}40` }}>
                                                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: colorMode ? accentColor : 'white' }}>Core Capabilities</div>
                                                    <div className="text-sm text-white/80">Applied ML • Forecasting • Time-Series Analysis</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom section - links and actions */}
                                    <div className="mt-8 md:mt-12 grid md:grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: `${accentColor}20` }}>
                                        <div className="md:col-span-2 flex flex-wrap gap-3">
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
                                                    className="border px-4 py-2 hover:opacity-80 transition-all inline-flex items-center gap-2 text-sm"
                                                    style={{ borderColor: `${accentColor}40` }}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                    <span className="text-xs uppercase tracking-wider">{label}</span>
                                                </a>
                                            ))}
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <motion.a
                                                href="/challenge"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="border px-4 py-2 text-center transition-all hover:shadow-lg text-sm cursor-pointer"
                                                style={{
                                                    borderColor: accentColor,
                                                    backgroundColor: colorMode ? `${accentColor}20` : 'transparent'
                                                }}
                                            >
                                                <div className="text-xs uppercase tracking-wider" style={{ color: colorMode ? accentColor : 'white' }}>30-Day Challenges</div>
                                            </motion.a>
                                            <motion.button
                                                onClick={() => navigate('/cv')}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="border px-4 py-2 text-center transition-all hover:shadow-lg text-sm"
                                                style={{
                                                    borderColor: accentColor,
                                                    backgroundColor: colorMode ? accentColor : 'transparent'
                                                }}
                                            >
                                                <div className="text-xs uppercase tracking-wider text-white cursor-pointer">Full Resume</div>
                                            </motion.button>
                                        </div>
                                    </div>

                                    <div className="text-center mt-8">
                                        <motion.button
                                            onClick={() => navigateToLayer('experience')}
                                            whileHover={{ scale: 1.05, y: -4 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-flex items-center gap-3 border px-8 py-3 hover:shadow-lg transition-all group hover:-translate-y-1"
                                            style={{
                                                borderColor: accentColor,
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                            <span className="text-xs uppercase tracking-wider">View Experience</span>
                                            <ChevronDown className="h-4 w-4 animate-bounce group-hover:animate-none" />
                                        </motion.button>
                                    </div>
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

                                        <h3 className="text-xl font-bold mb-3" style={{ color: colorMode ? accentColor : 'white' }}>Mathematical Foundations</h3>
                                        <p className="text-sm text-white/70 mb-6 leading-relaxed font-mono">
                                            Probability, statistics, and linear algebra applied to <span className="text-white font-bold">model evaluation</span> and <span className="text-white font-bold">uncertainty quantification</span>.
                                        </p>

                                        <div className="mt-auto space-y-4">
                                            <div className="h-px w-full bg-white/10"></div>
                                            <div className="flex flex-wrap gap-2">
                                                {['Probability', 'Statistics', 'Linear Algebra', 'Calculus'].map((tech) => (
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

                                        <h3 className="text-xl font-bold mb-3" style={{ color: colorMode ? accentColor : 'white' }}>Data & Modeling</h3>
                                        <p className="text-sm text-white/70 mb-6 leading-relaxed font-mono">
                                            Working with <span className="text-white font-bold">Pandas</span>, <span className="text-white font-bold">PyTorch</span>, and <span className="text-white font-bold">scikit-learn</span> for applied ML and statistical analysis.
                                        </p>

                                        <div className="mt-auto space-y-4">
                                            <div className="h-px w-full bg-white/10"></div>
                                            <div className="flex flex-wrap gap-2">
                                                {['Pandas', 'NumPy', 'PyTorch', 'scikit-learn', 'SQL'].map((tech) => (
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

                                        <h3 className="text-xl font-bold mb-3" style={{ color: colorMode ? accentColor : 'white' }}>Supporting Tools</h3>
                                        <p className="text-sm text-white/70 mb-6 leading-relaxed font-mono">
                                            Using <span className="text-white font-bold">Docker</span>, <span className="text-white font-bold">Git</span>, and <span className="text-white font-bold">Linux</span> to support reproducible research workflows.
                                        </p>

                                        <div className="mt-auto space-y-4">
                                            <div className="h-px w-full bg-white/10"></div>
                                            <div className="flex flex-wrap gap-2">
                                                {['Docker', 'Git', 'Linux', 'React', 'TypeScript', 'APIs'].map((tech) => (
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
                                        <div className="text-[10px] text-white/40 font-mono">30-Day Challenges Completed</div>

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
                                <motion.button
                                    onClick={() => navigateToLayer('projects')}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border px-6 py-3 transition-all inline-flex items-center gap-2 hover:shadow-lg hover:-translate-y-1 group"
                                    style={{
                                        borderColor: accentColor,
                                        backgroundColor: colorMode ? accentColor : 'transparent'
                                    }}
                                >
                                    <span className="text-xs uppercase tracking-wider">View Projects</span>
                                    <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
                                </motion.button>
                            </div>
                        </div>
                    </section>
                )}

                {(isMobile || currentLayer === 'projects') && (
                    <section id="projects" className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
                        <div className="max-w-6xl w-full space-y-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                                    {'>'} <span style={{ color: colorMode ? accentColor : 'white' }}>PROJECTS</span>.list()
                                </h2>
                                <div className="h-px w-48 mx-auto transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                <p className="text-sm text-white/60 mt-4 font-mono">Research Projects & Statistical Questions</p>
                            </div>

                            <div className="space-y-6">
                                {investigations.map((inv, i) => (
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
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <h3 className="text-2xl font-bold">{inv.name}</h3>
                                                        <span className="border px-2 py-1 text-xs uppercase tracking-wider"
                                                            style={{ borderColor: colorMode ? accentColor : '#ffffff60' }}>
                                                            {inv.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-base text-white/90 font-semibold mb-4">{inv.question}</p>
                                                </div>

                                                <div className="space-y-3 text-sm text-white/80">
                                                    <div>
                                                        <span className="text-white/60 font-mono uppercase text-xs">Approach: </span>
                                                        <span>{inv.approach}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-white/60 font-mono uppercase text-xs">Evaluation: </span>
                                                        <span>{inv.evaluation}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-white/60 font-mono uppercase text-xs">Failure Mode: </span>
                                                        <span>{inv.failure}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {inv.tech.map((tech, j) => (
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
                                                    href={inv.url ?? "https://github.com/tadstech"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm border-b pb-1 hover:gap-3 transition-all"
                                                    style={{ borderColor: colorMode ? accentColor : 'white' }}
                                                >
                                                    <span className="uppercase tracking-wider">View Investigation</span>
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="border p-4 transition-colors duration-300" style={{ borderColor: colorMode ? `${accentColor}60` : '#ffffff30' }}>
                                                    <div className="text-xs text-white/90 mb-2 uppercase tracking-wider">Investigation Info</div>
                                                    <div className="space-y-2 text-sm">
                                                        {Object.entries(inv.metrics).map(([key, value]) => (
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

                            <div className="mt-12 border-t pt-8" style={{ borderColor: `${accentColor}40` }}>
                                <div className="mb-6">
                                    <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: colorMode ? accentColor : 'white' }}>
                                        Applied Systems (Supporting Work)
                                    </h3>
                                    <p className="text-xs text-white/60 font-mono">ETL workflows, dashboards, and data tools</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    {appliedSystems.map((system, i) => (
                                        <a
                                            key={i}
                                            href={system.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="border p-4 transition-all hover:shadow-lg hover:-translate-y-1 group"
                                            style={{ borderColor: `${accentColor}40`, backgroundColor: 'transparent' }}
                                        >
                                            <h4 className="text-sm font-bold mb-2 group-hover:gap-2 inline-flex items-center">
                                                {system.name}
                                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </h4>
                                            <p className="text-xs text-white/70">{system.desc}</p>
                                        </a>
                                    ))}
                                </div>
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
                                        Open to research-oriented ML roles, quant-adjacent positions, and applied data analysis contracts aligned with statistical investigation methodology.
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
                            className={`h-2 transition-all cursor-pointer ${currentLayer === layer ? 'w-8' : 'w-2'
                                }`}
                            style={{
                                backgroundColor: currentLayer === layer ? (colorMode ? accentColor : 'white') : '#ffffff40'
                            }}
                            aria-label={`Navigate to ${layer}`}
                        ></button>
                    ))}
                </div>
            )}

            {/* Toast notification */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={showToast ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed bottom-4 left-4 z-50 max-w-sm"
                style={{ pointerEvents: showToast ? 'auto' : 'none' }}
            >
                <div 
                    className="border p-4 bg-black/95 backdrop-blur-md shadow-2xl relative overflow-hidden"
                    style={{ 
                        borderColor: accentColor,
                        boxShadow: colorMode ? `0 0 30px ${accentColor}40` : '0 10px 40px rgba(0,0,0,0.5)'
                    }}
                >
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}>
                    </div>
                    
                    <div className="relative z-10 flex items-start gap-3">
                        <div className="flex-shrink-0 p-2 border rounded" style={{ borderColor: `${accentColor}60` }}>
                            <Database className="h-5 w-5" style={{ color: colorMode ? accentColor : 'white' }} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="text-sm font-bold" style={{ color: colorMode ? accentColor : 'white' }}>
                                    Explore 30+ Datasets
                                </h4>
                                <button
                                    onClick={() => setShowToast(false)}
                                    className="text-white/60 hover:text-white transition-colors"
                                    aria-label="Close notification"
                                >
                                    <span className="text-lg leading-none">×</span>
                                </button>
                            </div>
                            
                            <p className="text-xs text-white/80 mb-3 leading-relaxed">
                                Check out the 30-Day Challenges page for hands-on data analysis projects and explorations.
                            </p>
                            
                            <motion.a
                                href="/challenge"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider border px-3 py-1.5 transition-all cursor-pointer"
                                style={{
                                    borderColor: accentColor,
                                    backgroundColor: colorMode ? `${accentColor}20` : 'transparent',
                                    color: colorMode ? accentColor : 'white'
                                }}
                            >
                                <span>View Challenges</span>
                                <ExternalLink className="h-3 w-3" />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
