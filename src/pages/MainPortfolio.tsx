import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ChevronDown, Database, Code, BarChart3, TrendingUp, Github, Mail, Linkedin, ExternalLink, Globe, Palette, Activity, Cpu, Zap, FileCode, Wrench, PieChart } from 'lucide-react';

type Layer = 'hero' | 'stats' | 'skills' | 'projects' | 'mlDemo' | 'contact';

export const MainPortfolio: React.FC = () => {
    const navigate = useNavigate();
    const [currentLayer, setCurrentLayer] = useState<Layer>('hero');
    const [isAnimating, setIsAnimating] = useState(false);
    const [statsAnimated, setStatsAnimated] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [colorMode, setColorMode] = useState(false);
    const [predictionValue, setPredictionValue] = useState(50);
    const [isProcessing, setIsProcessing] = useState(false);
    const [modelOutput, setModelOutput] = useState<{ label: string; confidence: number } | null>(null);
    const fullText = '> MICHAEL_TUNWASHE._init()';

    const calculateChallengeDay = () => {
        const startDate = new Date('2025-10-27');
        const today = new Date();
        const diffTime = today.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return Math.min(Math.max(diffDays, 1), 30);
    };

    const challengeDay = calculateChallengeDay();

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

    const navigateToLayer = (layer: Layer) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentLayer(layer);
            setIsAnimating(false);
        }, 300);
    };

    const handlePrediction = () => {
        setIsProcessing(true);
        setModelOutput(null);
        
        setTimeout(() => {
            const confidence = 0.75 + (Math.random() * 0.24);
            const label = predictionValue > 50 ? 'Positive' : 'Negative';
            setModelOutput({ label, confidence });
            setIsProcessing(false);
        }, 1500);
    };

    const accentColor = colorMode ? '#0ea5e9' : '#28333F';

    const skillsData = [
        { name: 'Python', hours: 1400, category: 'data' },
        { name: 'SQL', hours: 160, category: 'data' },
        { name: 'React', hours: 700, category: 'dev' },
        { name: 'TypeScript', hours: 600, category: 'dev' },
        { name: 'Metabase', hours: 40, category: 'bi' },
        { name: 'pandas', hours: 900, category: 'data' },
        { name: 'Calc', hours: 200, category: 'data' },
        { name: 'Tableau', hours: 60, category: 'bi' },
    ];

    const projects = [
        {
            name: 'SalesScope Dashboard',
            desc: 'SalesScope is a lightweight sales analytics platform that showcases how businesses can track, explore, and visualize sales performance.',
            tech: ['Python', 'SQL', 'React', 'PlotlyJs', 'TailwindCSS'],
            metrics: { complexity: 6, Status: 'Complete', Completion: 'Q3 2025' },
            url: 'https://salesscope.web.app'
        },
        {
            name: 'Mini Data Manim',
            desc: 'Free and open-source, portable, data manipulation webapp',
            tech: ['React', 'exceljs', 'PlotlyJs', 'TailwindCSS', 'TypeScript'],
            metrics: { complexity: 8, Status: 'Complete', Completion: 'Q4 2025' },
            url: 'https://minidatamanim.web.app'
        },
        {
            name: 'Financial News Classifier',
            desc: 'AI-powered classification of financial news to Bullish, Bearish, or Neutral sentiment with enterprise-grade accuracy. Built with FinBERT model achieving 98% accuracy and real-time analysis capabilities.',
            tech: ['Python', 'FinBERT', 'Hugging Face', 'React', 'FastAPI'],
            metrics: { complexity: 8, Status: 'Complete', Completion: 'Q4 2025' },
            url: 'https://tadstech.github.io/financial-news-classifier'
        },
        {
            name: 'FocusForge Analytics',
            desc: 'ML powered productivity tracker and analytics app',
            tech: ['React', 'TailwindCSS', 'React-Native', 'Supabase', 'Plotly', 'NLP'],
            metrics: { complexity: 10, Status: 'In Progress', Completion: 'Q2 2026'}
        },
        {
            name: 'NaijaDash',
            desc: 'National data dashboard for Nigeria Simplified!!',
            tech: ['React', 'TypeScript', 'TailwindCSS', 'SQL', 'PlotlyJs', 'D3JS'],
            metrics: { complexity: 9, Status: 'In Progress', Completion: 'Q4 2025' }
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
                            onClick={() => setColorMode(!colorMode)}
                            className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg"
                            style={{ 
                                borderColor: accentColor,
                                backgroundColor: colorMode ? accentColor : 'transparent'
                            }}
                            title="Toggle color mode"
                        >
                            <Palette className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider hidden sm:inline">
                                {colorMode ? 'Color' : 'B&W'}
                            </span>
                        </button>
                    </div>
                    
                    <div className="hidden md:flex gap-2">
                        {(['hero', 'stats', 'skills', 'projects', 'mlDemo', 'contact'] as Layer[]).map((layer) => (
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
                                {layer === 'mlDemo' ? 'ML' : layer}
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
                    <div className="md:hidden border-t bg-black" style={{ borderColor: accentColor }}>
                        <div className="px-4 py-3 space-y-2">
                            {(['hero', 'stats', 'skills', 'projects', 'mlDemo', 'contact'] as Layer[]).map((layer) => (
                                <button
                                    key={layer}
                                    onClick={() => {
                                        navigateToLayer(layer);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full px-3 py-2 text-xs uppercase tracking-wider transition-all text-left"
                                    style={{
                                        backgroundColor: currentLayer === layer ? accentColor : 'transparent',
                                        border: `1px solid ${accentColor}`
                                    }}
                                >
                                    {layer === 'mlDemo' ? 'ML' : layer}
                                </button>
                            ))}
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

                                    <div className="space-y-3">
                                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                            FullStack <span style={{ color: colorMode ? accentColor : 'white' }}>Data Scientist</span>
                                        </h1>
                                        <div className="h-px w-40 mx-auto transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                        <p className="text-sm md:text-base text-white/90 uppercase tracking-widest">
                                            From <span style={{ color: colorMode ? accentColor : 'white' }}>modeling</span> to <span style={{ color: colorMode ? accentColor : 'white' }}>deployment</span>
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8">
                                        {[
                                            { value: '02+', label: 'Years Experience' },
                                            { value: '5', label: 'FullStack Projects' },
                                            { value: '10+', label: 'Tech Stack' },
                                            { value: '25+', label: 'Repositories' }
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
                                            { Icon: Globe, url: 'https://tadstechfe.web.app', label: 'Website' }
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

                                    <div className="pt-8 space-y-3">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-white/90 uppercase tracking-wider">30-Day Data Challenge</span>
                                            <span className="text-white font-bold" style={{ color: colorMode ? accentColor : 'white' }}>Day {challengeDay}/30</span>
                                        </div>
                                        <button
                                            onClick={() => navigate('/challenge')}
                                            className="w-full h-3 border relative overflow-hidden hover:border-white transition-all group"
                                            style={{ borderColor: accentColor }}
                                        >
                                            <div
                                                className="h-full transition-all duration-500"
                                                style={{ 
                                                    width: `${(challengeDay / 30) * 100}%`,
                                                    backgroundColor: colorMode ? accentColor : 'white'
                                                }}
                                            ></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-[10px] font-mono mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity">
                                                    VIEW CHALLENGE
                                                </span>
                                            </div>
                                        </button>
                                    </div>

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
                                            {statsAnimated ? '1.2M+' : '0'}
                                        </div>
                                        <div className="text-xs uppercase text-white/60 tracking-wider mb-1">Rows Analyzed</div>
                                        <div className="text-[10px] text-white/40 font-mono">Real-time Processing</div>
                                        
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
                                            <span className="text-[10px] font-mono tracking-wider" style={{ color: colorMode ? accentColor : 'white' }}>CODE_QUALITY</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold mb-1 font-mono" style={{ color: colorMode ? accentColor : 'white' }}>
                                            {statsAnimated ? '94.2%' : '0%'}
                                        </div>
                                        <div className="text-xs uppercase text-white/60 tracking-wider mb-1">Test Coverage</div>
                                        <div className="text-[10px] text-white/40 font-mono">CI/CD Pipeline Active</div>
                                        
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
                                            <span className="text-[10px] font-mono tracking-wider" style={{ color: colorMode ? accentColor : 'white' }}>SYS_UPTIME</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-bold mb-1 font-mono" style={{ color: colorMode ? accentColor : 'white' }}>
                                            {statsAnimated ? '99.9%' : '0%'}
                                        </div>
                                        <div className="text-xs uppercase text-white/60 tracking-wider mb-1">Service Reliability</div>
                                        <div className="text-[10px] text-white/40 font-mono">24/7 Monitoring Active</div>
                                        
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
                                            { tech: 'Python/Data Science', percent: 35, count: '10 projects', IconComponent: Database, proficiency: 'Expert' },
                                            { tech: 'React/TypeScript', percent: 30, count: '4 projects', IconComponent: FileCode, proficiency: 'Advanced' },
                                            { tech: 'SQL/Databases', percent: 20, count: '2 projects', IconComponent: Database, proficiency: 'Advanced' },
                                            { tech: 'BI Tools (Metabase)', percent: 10, count: '8 projects', IconComponent: PieChart, proficiency: 'Intermediate' },
                                            { tech: 'Other (Flutter, etc)', percent: 5, count: '5 projects', IconComponent: Wrench, proficiency: 'Intermediate' }
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
                        <div className="max-w-6xl w-full space-y-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 font-mono">
                                    {'>'} <span style={{ color: colorMode ? accentColor : 'white' }}>SKILLS</span>.execute()
                                </h2>
                                <div className="h-px w-48 mx-auto transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                <p className="text-sm text-white/60 mt-4 font-mono">Experience measured in hours • Proficiency scaled to 2000h</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {skillsData.map((skill, i) => {
                                    const proficiencyPercent = Math.min((skill.hours / 2000) * 100, 100);
                                    const level = proficiencyPercent >= 80 ? 'Expert' : proficiencyPercent >= 60 ? 'Advanced' : proficiencyPercent >= 40 ? 'Intermediate' : 'Developing';
                                    
                                    return (
                                        <div 
                                            key={i} 
                                            className="border p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-black/50 backdrop-blur-sm relative overflow-hidden group"
                                            style={{ 
                                                borderColor: accentColor,
                                                boxShadow: colorMode ? `0 0 20px ${accentColor}15` : 'none'
                                            }}
                                        >
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                                 style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                            
                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold mb-1">{skill.name}</h3>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-mono" 
                                                                  style={{ 
                                                                      backgroundColor: `${accentColor}20`,
                                                                      color: colorMode ? accentColor : 'white',
                                                                      border: `1px solid ${accentColor}40`
                                                                  }}>
                                                                {skill.category === 'data' ? '📊 DATA' : skill.category === 'dev' ? '💻 DEV' : '📈 BI'}
                                                            </span>
                                                            <span className="text-[10px] text-white/60 font-mono">{level}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold font-mono" style={{ color: colorMode ? accentColor : 'white' }}>
                                                            {Math.floor(proficiencyPercent)}
                                                        </div>
                                                        <div className="text-[10px] text-white/50">SCORE</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-3">
                                                    <div className="h-10 border rounded-lg relative overflow-hidden" style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}05` }}>
                                                        <div
                                                            className="h-full rounded-lg transition-all duration-1000 delay-300 ease-out relative"
                                                            style={{ 
                                                                width: `${proficiencyPercent}%`,
                                                                background: colorMode 
                                                                    ? `linear-gradient(90deg, ${accentColor}40 0%, ${accentColor} 100%)`
                                                                    : 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,1) 100%)',
                                                                boxShadow: colorMode ? `0 0 15px ${accentColor}60` : 'none'
                                                            }}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                                                        </div>
                                                        <div className="absolute inset-0 flex items-center justify-between px-3">
                                                            <span className="text-xs font-mono text-white/90 mix-blend-difference">{skill.hours}h</span>
                                                            <span className="text-xs font-mono text-white/90 mix-blend-difference">{Math.floor(proficiencyPercent)}%</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex gap-1">
                                                        {Array.from({ length: 10 }).map((_, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex-1 h-1.5 rounded-full transition-all duration-500"
                                                                style={{ 
                                                                    backgroundColor: idx < Math.floor(proficiencyPercent / 10)
                                                                        ? (colorMode ? accentColor : 'white') 
                                                                        : '#ffffff15',
                                                                    transitionDelay: `${idx * 60}ms`,
                                                                    boxShadow: idx < Math.floor(proficiencyPercent / 10) && colorMode
                                                                        ? `0 0 4px ${accentColor}`
                                                                        : 'none'
                                                                }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="flex justify-between text-[9px] text-white/40 font-mono pt-1">
                                                        <span>Beginner</span>
                                                        <span>Intermediate</span>
                                                        <span>Expert</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mt-12">
                                {[
                                    {
                                        icon: Database,
                                        title: 'DATA SCIENCE',
                                        gradient: 'from-blue-500/20 to-cyan-500/20',
                                        tools: ['pandas', 'NumPy', 'matplotlib', 'plotly', 'scikit-learn', 'statsmodels']
                                    },
                                    {
                                        icon: Code,
                                        title: 'DEVELOPMENT',
                                        gradient: 'from-purple-500/20 to-pink-500/20',
                                        tools: ['React', 'TypeScript', 'Node.js', 'Flutter', 'Dart', 'Firebase']
                                    },
                                    {
                                        icon: BarChart3,
                                        title: 'BI & ANALYTICS',
                                        gradient: 'from-green-500/20 to-emerald-500/20',
                                        tools: ['Power BI', 'Tableau', 'Metabase', 'SQL', 'PostgreSQL', 'ETL']
                                    }
                                ].map((category, idx) => (
                                    <div 
                                        key={idx}
                                        className="border p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-black/50 backdrop-blur-sm relative overflow-hidden group" 
                                        style={{ 
                                            borderColor: colorMode ? `${accentColor}60` : '#ffffff30',
                                            boxShadow: colorMode ? `0 0 20px ${accentColor}15` : 'none'
                                        }}
                                    >
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.gradient}`}></div>
                                        
                                        <div className="relative z-10">
                                            <category.icon className="h-10 w-10 mx-auto mb-4 transition-transform group-hover:scale-110 duration-300" 
                                                          style={{ color: colorMode ? accentColor : 'white' }} />
                                            <div className="text-sm font-bold mb-4 tracking-wider">{category.title}</div>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {category.tools.map((tool, i) => (
                                                    <span 
                                                        key={i}
                                                        className="text-[10px] px-2 py-1 rounded border font-mono transition-all duration-300"
                                                        style={{ 
                                                            borderColor: `${accentColor}40`,
                                                            backgroundColor: `${accentColor}10`,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                    onClick={() => navigateToLayer('mlDemo')}
                                    className="border px-6 py-3 hover:shadow-lg transition-all inline-flex items-center gap-2 hover:-translate-y-1"
                                    style={{ 
                                        borderColor: accentColor,
                                        backgroundColor: colorMode ? accentColor : 'transparent'
                                    }}
                                >
                                    <span className="text-xs uppercase tracking-wider">Try ML Demo</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {currentLayer === 'mlDemo' && (
                    <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
                        <div className="max-w-4xl w-full space-y-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                                    {'>'} ML_MODEL<span style={{ color: colorMode ? accentColor : 'white' }}>.predict()</span>
                                </h2>
                                <div className="h-px w-48 mx-auto transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                <p className="text-sm text-white/60 mt-4 max-w-2xl mx-auto leading-relaxed">
                                    Interactive demonstration of a binary classification model. 
                                    Adjust the input parameter and watch the model make real-time predictions with confidence scores.
                                </p>
                            </div>

                            <div className="border p-8 md:p-12 transition-all duration-300 hover:shadow-2xl" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 40px ${accentColor}30` : 'none' }}>
                                <div className="space-y-8">
                                    <div className="flex items-center justify-center gap-4">
                                        <Cpu className="h-8 w-8" style={{ color: colorMode ? accentColor : 'white' }} />
                                        <span className="text-2xl font-bold">Sentiment Classifier</span>
                                        <Activity className="h-8 w-8 animate-pulse" style={{ color: colorMode ? accentColor : 'white' }} />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/70">Input Feature Value</span>
                                            <span className="font-mono" style={{ color: colorMode ? accentColor : 'white' }}>{predictionValue}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={predictionValue}
                                            onChange={(e) => setPredictionValue(Number(e.target.value))}
                                            className="w-full h-2 rounded-none appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, ${colorMode ? accentColor : 'white'} 0%, ${colorMode ? accentColor : 'white'} ${predictionValue}%, ${accentColor}40 ${predictionValue}%, ${accentColor}40 100%)`
                                            }}
                                        />
                                        <div className="flex justify-between text-xs text-white/50">
                                            <span>MIN</span>
                                            <span>MAX</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePrediction}
                                        disabled={isProcessing}
                                        className="w-full border py-4 text-sm uppercase tracking-wider font-bold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        style={{ 
                                            borderColor: accentColor,
                                            backgroundColor: colorMode ? accentColor : 'transparent'
                                        }}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Zap className="h-4 w-4 animate-spin" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Cpu className="h-4 w-4" />
                                                <span>Run Prediction</span>
                                            </>
                                        )}
                                    </button>

                                    {isProcessing && (
                                        <div className="space-y-2 text-xs text-white/50 font-mono">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colorMode ? accentColor : 'white' }}></div>
                                                <span>Loading model weights...</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colorMode ? accentColor : 'white', animationDelay: '300ms' }}></div>
                                                <span>Preprocessing input features...</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colorMode ? accentColor : 'white', animationDelay: '600ms' }}></div>
                                                <span>Running forward pass...</span>
                                            </div>
                                        </div>
                                    )}

                                    {modelOutput && (
                                        <div className="border p-6 space-y-4" style={{ borderColor: accentColor }}>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-white/70">PREDICTION RESULT</span>
                                                <Activity className="h-4 w-4" style={{ color: colorMode ? accentColor : 'white' }} />
                                            </div>
                                            
                                            <div className="text-center py-4">
                                                <div className="text-4xl font-bold mb-2" style={{ color: colorMode ? accentColor : 'white' }}>
                                                    {modelOutput.label}
                                                </div>
                                                <div className="text-xs text-white/50 uppercase tracking-wider">Classification</div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-white/70">Confidence Score</span>
                                                    <span className="font-mono" style={{ color: colorMode ? accentColor : 'white' }}>
                                                        {(modelOutput.confidence * 100).toFixed(2)}%
                                                    </span>
                                                </div>
                                                <div className="h-3 border" style={{ borderColor: accentColor }}>
                                                    <div
                                                        className="h-full transition-all duration-1000"
                                                        style={{ 
                                                            width: `${modelOutput.confidence * 100}%`,
                                                            backgroundColor: colorMode ? accentColor : 'white'
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
                                                <div className="border p-3" style={{ borderColor: accentColor }}>
                                                    <div className="text-white/50 mb-1">Model</div>
                                                    <div className="font-mono">RandomForest</div>
                                                </div>
                                                <div className="border p-3" style={{ borderColor: accentColor }}>
                                                    <div className="text-white/50 mb-1">Accuracy</div>
                                                    <div className="font-mono">94.2%</div>
                                                </div>
                                                <div className="border p-3" style={{ borderColor: accentColor }}>
                                                    <div className="text-white/50 mb-1">Latency</div>
                                                    <div className="font-mono">12ms</div>
                                                </div>
                                                <div className="border p-3" style={{ borderColor: accentColor }}>
                                                    <div className="text-white/50 mb-1">Features</div>
                                                    <div className="font-mono">42</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-xs text-white/40 text-center pt-4 font-mono">
                                        * This is a simulated demonstration for portfolio purposes
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => navigateToLayer('contact')}
                                    className="border px-6 py-3 hover:shadow-lg transition-all inline-flex items-center gap-2 hover:-translate-y-1"
                                    style={{ 
                                        borderColor: accentColor,
                                        backgroundColor: colorMode ? accentColor : 'transparent'
                                    }}
                                >
                                    <span className="text-xs uppercase tracking-wider">Get In Touch</span>
                                    <ChevronDown className="h-4 w-4" />
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
