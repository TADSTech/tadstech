import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, ChevronDown, Database, Code, BarChart3, TrendingUp, Github, Mail, Linkedin, ExternalLink, Globe } from 'lucide-react';

type Layer = 'hero' | 'stats' | 'skills' | 'projects' | 'contact';

export const MainPortfolio: React.FC = () => {
    const navigate = useNavigate();
    const [currentLayer, setCurrentLayer] = useState<Layer>('hero');
    const [isAnimating, setIsAnimating] = useState(false);
    const [statsAnimated, setStatsAnimated] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [displayText, setDisplayText] = useState('');
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
            impact: '+42% insights efficiency',
            tech: ['Python', 'SQL', 'React', 'PlotlyJs'],
            metrics: { complexity: 6, Status: 'Complete', Completion: 'Q3 2025' }
        },
        {
            name: 'FocusForge Analytics',
            impact: '10K+ data points/day',
            tech: ['Flutter', 'Firebase', 'Plotly', 'NLP'],
            metrics: { complexity: 10, Status: 'In Progress', Completion: 'Q2 2026'}
        },
        {
            name: 'NaijaDash',
            impact: 'Simplified national data visualization',
            tech: ['React', 'TypeScript', 'SQL', 'PlotlyJs', 'D3JS'],
            metrics: { complexity: 9, Status: 'In Progress', Completion: 'Q4 2025' }
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#28333F]">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white hover:text-[#28333F] transition-colors border border-white hover:border-[#28333F] px-3 py-1.5"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wider">Exit</span>
                    </button>
                    
                    <div className="hidden md:flex gap-2">
                        {(['hero', 'stats', 'skills', 'projects', 'contact'] as Layer[]).map((layer) => (
                            <button
                                key={layer}
                                onClick={() => navigateToLayer(layer)}
                                className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all ${
                                    currentLayer === layer
                                        ? 'bg-white text-black'
                                        : 'bg-transparent text-white border border-[#28333F] hover:border-white'
                                }`}
                            >
                                {layer}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex items-center gap-2 text-white border border-white px-3 py-1.5"
                    >
                        <Terminal className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wider">Menu</span>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-[#28333F] bg-black">
                        <div className="px-4 py-3 space-y-2">
                            {(['hero', 'stats', 'skills', 'projects', 'contact'] as Layer[]).map((layer) => (
                                <button
                                    key={layer}
                                    onClick={() => {
                                        navigateToLayer(layer);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`w-full px-3 py-2 text-xs uppercase tracking-wider transition-all text-left ${
                                        currentLayer === layer
                                            ? 'bg-white text-black'
                                            : 'bg-transparent text-white border border-[#28333F]'
                                    }`}
                                >
                                    {layer}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {currentLayer === 'hero' && (
                    <section className="min-h-screen flex items-center justify-center px-6 pt-28 pb-28">
                        <div className="max-w-5xl w-full">
                            <div className="border border-white p-12 md:p-20 relative">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#28333F]"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#28333F]"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#28333F]"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#28333F]"></div>

                                <div className="text-center space-y-8 md:space-y-12">
                                    <div className="h-12 sm:h-16 flex items-center justify-center px-2">
                                        <span className="text-1xl sm:text-2xl md:text-4xl tracking-widest leading-tight text-center break-words">
                                            {displayText}
                                            <span className="inline-block ml-1 animate-pulse" aria-hidden="true">_</span>
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Data Scientist</h1>
                                        <div className="h-px bg-[#28333F] w-40 mx-auto"></div>
                                        <p className="text-sm md:text-base text-white/70 uppercase tracking-widest">Front-End Developer</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8">
                                        <div className="border border-[#28333F] p-5 md:p-6">
                                            <div className="text-2xl md:text-3xl font-bold">02+</div>
                                            <div className="text-xs text-white/70 uppercase mt-1">Years Experience</div>
                                        </div>
                                        <div className="border border-[#28333F] p-5 md:p-6">
                                            <div className="text-2xl md:text-3xl font-bold">3</div>
                                            <div className="text-xs text-white/70 uppercase mt-1">FullStack Projects</div>
                                        </div>
                                        <div className="border border-[#28333F] p-5 md:p-6">
                                            <div className="text-2xl md:text-3xl font-bold">10+</div>
                                            <div className="text-xs text-white/70 uppercase mt-1">Tech Stack</div>
                                        </div>
                                        <div className="border border-[#28333F] p-5 md:p-6">
                                            <div className="text-2xl md:text-3xl font-bold">25+</div>
                                            <div className="text-xs text-white/70 uppercase mt-1">Repos</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-1 md:gap-2 pt-8">
                                        <a
                                            href="https://linkedin.com/in/tadstech"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="LinkeIdn"
                                            className="p-1 hover:opacity-80"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                        </a>
                                        <a
                                            href="https://github.com/tadstech"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="GitHub"
                                            className="p-1 hover:opacity-80"
                                        >
                                            <Github className="h-5 w-5" />
                                        </a>
                                        <a
                                            href="mailto:motrenewed@gmail.com"
                                            aria-label="Email"
                                            className="p-1 hover:opacity-80"
                                        >
                                            <Mail className="h-5 w-5" />
                                        </a>
                                        <a
                                            href="https://tadstechfe.web.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Website"
                                            className="p-1 hover:opacity-80"
                                        >
                                            <Globe className="h-5 w-5" />
                                        </a>
                                    </div>

                                    <div className="pt-4">
                                        <a
                                            href="/cv/TADS-CV-FULL.pdf"
                                            download
                                            className="inline-flex items-center gap-2 border border-white px-6 py-2.5 hover:bg-white hover:text-black transition-all text-xs uppercase tracking-wider"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            <span>Download Resume</span>
                                        </a>
                                    </div>

                                    <div className="pt-8 space-y-3">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-white/70 uppercase tracking-wider">30-Day Challenge</span>
                                            <span className="text-white font-bold">Day {challengeDay}/30</span>
                                        </div>
                                        <button
                                            onClick={() => navigate('/challenge')}
                                            className="w-full h-3 border border-white/30 relative overflow-hidden hover:border-white transition-all group"
                                        >
                                            <div
                                                className="h-full bg-white transition-all duration-500"
                                                style={{ width: `${(challengeDay / 30) * 100}%` }}
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
                                        className="mt-8 flex items-center gap-3 mx-auto border border-white px-8 py-3 hover:bg-white hover:text-black transition-all group"
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
                                    {'>'} DATA_INSIGHTS.analyze()
                                </h2>
                                <div className="h-px bg-[#28333F] w-48 mx-auto"></div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="border border-white p-6 bg-black">
                                    <div className="flex items-center justify-between mb-4">
                                        <Database className="h-6 w-6" />
                                        <span className="text-xs text-[#28333F]">DATA PROCESSING</span>
                                    </div>
                                    <div className="text-4xl font-bold mb-2">
                                        {statsAnimated ? '1.2M+' : '0'}
                                    </div>
                                    <div className="text-xs uppercase text-[#28333F]">Rows Analyzed</div>
                                    
                                    <div className="mt-4 space-y-1">
                                        {[85, 92, 78, 95, 88].map((val, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="text-[10px] text-[#28333F] w-8">Q{i+1}</div>
                                                <div className="flex-1 h-2 bg-[#28333F]">
                                                    <div
                                                        className="h-full bg-white transition-all duration-1000"
                                                        style={{ width: statsAnimated ? `${val}%` : '0%' }}
                                                    ></div>
                                                </div>
                                                <div className="text-[10px] w-8 text-right">{val}%</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border border-white p-6 bg-black">
                                    <div className="flex items-center justify-between mb-4">
                                        <Code className="h-6 w-6" />
                                        <span className="text-xs text-[#28333F]">CODE QUALITY</span>
                                    </div>
                                    <div className="text-4xl font-bold mb-2">
                                        {statsAnimated ? '94.2%' : '0%'}
                                    </div>
                                    <div className="text-xs uppercase text-[#28333F]">Test Coverage</div>
                                    
                                    <div className="mt-4 flex justify-center">
                                        <div className="relative w-32 h-32">
                                            <svg className="transform -rotate-90" viewBox="0 0 120 120">
                                                <circle
                                                    cx="60"
                                                    cy="60"
                                                    r="50"
                                                    fill="none"
                                                    stroke="#28333F"
                                                    strokeWidth="8"
                                                />
                                                <circle
                                                    cx="60"
                                                    cy="60"
                                                    r="50"
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="8"
                                                    strokeDasharray={`${2 * Math.PI * 50}`}
                                                    strokeDashoffset={statsAnimated ? `${2 * Math.PI * 50 * (1 - 0.94)}` : `${2 * Math.PI * 50}`}
                                                    className="transition-all duration-1000"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                                                94
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-white p-6 bg-black">
                                    <div className="flex items-center justify-between mb-4">
                                        <TrendingUp className="h-6 w-6" />
                                        <span className="text-xs text-[#28333F]">PERFORMANCE</span>
                                    </div>
                                    <div className="text-4xl font-bold mb-2">
                                        {statsAnimated ? '99.9%' : '0%'}
                                    </div>
                                    <div className="text-xs uppercase text-[#28333F]">Uptime SLA</div>
                                    
                                    <div className="mt-4 h-24 flex items-end gap-1">
                                        {[45, 60, 55, 75, 70, 85, 90, 95, 88, 92, 98, 99].map((val, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 bg-white transition-all duration-1000 delay-100"
                                                style={{
                                                    height: statsAnimated ? `${val}%` : '0%',
                                                    transitionDelay: `${i * 50}ms`
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="border border-white p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    TECHNOLOGY_STACK.distribution()
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { tech: 'Python/Data Science', percent: 35, count: '10 projects' },
                                        { tech: 'React/TypeScript', percent: 30, count: '4 projects' },
                                        { tech: 'SQL/Databases', percent: 20, count: '2 projects' },
                                        { tech: 'BI Tools (Power BI)', percent: 10, count: '8 projects' },
                                        { tech: 'Other (Flutter, etc)', percent: 5, count: '5 projects' }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between mb-1 text-sm">
                                                <span>{item.tech}</span>
                                                <span className="text-[#28333F]">{item.count}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-3 border border-[#28333F]">
                                                    <div
                                                        className="h-full bg-white transition-all duration-1000"
                                                        style={{
                                                            width: statsAnimated ? `${item.percent}%` : '0%',
                                                            transitionDelay: `${i * 100}ms`
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs w-12 text-right font-mono">{item.percent}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => navigateToLayer('skills')}
                                    className="border border-white px-6 py-3 hover:bg-white hover:text-black transition-all inline-flex items-center gap-2"
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
                        <div className="max-w-5xl w-full space-y-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                                    {'>'} SKILLS.execute()
                                </h2>
                                <div className="h-px bg-[#28333F] w-48 mx-auto"></div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {skillsData.map((skill, i) => (
                                    <div key={i} className="border border-white p-6">
                                        <div className="flex justify-between items-baseline mb-3">
                                            <span className="text-lg font-bold">{skill.name}</span>
                                            <span className="text-xs text-[#28333F] uppercase">
                                                {skill.category === 'data' ? 'DATA' : skill.category === 'dev' ? 'DEV' : 'BI'}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="h-8 border border-[#28333F] relative overflow-hidden">
                                                <div
                                                    className="h-full bg-white transition-all duration-1000 delay-300"
                                                    style={{ width: `${Math.min((skill.hours / 2000) * 100, 100)}%` }}
                                                ></div>
                                                <div className="absolute inset-0 flex items-center justify-end pr-2">
                                                    <span className="text-xs font-mono mix-blend-difference">{skill.hours}h</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-1">
                                                {Array.from({ length: 10 }).map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`flex-1 h-1 transition-all duration-500 ${
                                                            idx < Math.floor((skill.hours / 2000) * 10) ? 'bg-white' : 'bg-[#28333F]'
                                                        }`}
                                                        style={{ transitionDelay: `${idx * 50}ms` }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="border border-[#28333F] p-6 text-center">
                                    <Database className="h-8 w-8 mx-auto mb-3" />
                                    <div className="text-sm font-bold mb-2">DATA SCIENCE</div>
                                    <div className="text-xs text-[#28333F] space-y-1">
                                        <div>pandas • NumPy</div>
                                        <div>matplotlib • plotly</div>
                                        <div>scikit-learn</div>
                                    </div>
                                </div>
                                <div className="border border-[#28333F] p-6 text-center">
                                    <Code className="h-8 w-8 mx-auto mb-3" />
                                    <div className="text-sm font-bold mb-2">DEVELOPMENT</div>
                                    <div className="text-xs text-[#28333F] space-y-1">
                                        <div>React • Node.js</div>
                                        <div>Flutter • Dart</div>
                                        <div>Git • Firebase</div>
                                    </div>
                                </div>
                                <div className="border border-[#28333F] p-6 text-center">
                                    <BarChart3 className="h-8 w-8 mx-auto mb-3" />
                                    <div className="text-sm font-bold mb-2">BI & ANALYTICS</div>
                                    <div className="text-xs text-[#28333F] space-y-1">
                                        <div>Power BI • Tableau</div>
                                        <div>SQL • PostgreSQL</div>
                                        <div>Data Warehousing</div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => navigateToLayer('projects')}
                                    className="border border-white px-6 py-3 hover:bg-white hover:text-black transition-all inline-flex items-center gap-2"
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
                                    {'>'} PROJECTS.showcase()
                                </h2>
                                <div className="h-px bg-[#28333F] w-48 mx-auto"></div>
                            </div>

                            <div className="space-y-6">
                                {projects.map((project, i) => (
                                    <div key={i} className="border border-white p-6 md:p-8 hover:bg-white hover:text-black transition-all group">
                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="md:col-span-2 space-y-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                                                    <p className="text-sm text-[#28333F] group-hover:text-black/60">{project.impact}</p>
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map((tech, j) => (
                                                        <span
                                                            key={j}
                                                            className="border border-[#28333F] group-hover:border-black/20 px-3 py-1 text-xs uppercase tracking-wider"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                <a
                                                    href="https://github.com/tadstech"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm border-b border-current pb-1 hover:gap-3 transition-all"
                                                >
                                                    <span className="uppercase tracking-wider">View Project</span>
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="border border-[#28333F] group-hover:border-black/20 p-4">
                                                    <div className="text-xs text-[#28333F] group-hover:text-black/60 mb-2 uppercase">Metrics</div>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span>Complexity</span>
                                                            <span className="font-mono">{project.metrics.complexity}/10</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Status</span>
                                                            <span className="font-mono">{project.metrics.Status}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Completion</span>
                                                            <span className="font-mono">{project.metrics.Completion}</span>
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
                                    onClick={() => navigateToLayer('contact')}
                                    className="border border-white px-6 py-3 hover:bg-white hover:text-black transition-all inline-flex items-center gap-2"
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
                            <div className="border border-white p-8 md:p-16">
                                <div className="text-center space-y-8">
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                                            {'>'} CONTACT.init()
                                        </h2>
                                        <div className="h-px bg-[#28333F] w-48 mx-auto mt-4"></div>
                                    </div>

                                    <p className="text-sm md:text-base text-[#28333F] max-w-md mx-auto">
                                        Available for freelance data analysis, BI dashboard development, 
                                        and full-stack application projects.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-4 pt-4">
                                        <a
                                            href="mailto:motrenewed@gmail.com"
                                            className="border border-white p-6 hover:bg-white hover:text-black transition-all group"
                                        >
                                            <Mail className="h-6 w-6 mx-auto mb-3" />
                                            <div className="text-xs uppercase tracking-wider mb-1">Email</div>
                                            <div className="text-sm font-mono text-[#28333F] group-hover:text-black/60">motrenewed@gmail.com</div>
                                        </a>
                                        <a
                                            href="https://github.com/tadstech"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="border border-white p-6 hover:bg-white hover:text-black transition-all group"
                                        >
                                            <Github className="h-6 w-6 mx-auto mb-3" />
                                            <div className="text-xs uppercase tracking-wider mb-1">GitHub</div>
                                            <div className="text-sm font-mono text-[#28333F] group-hover:text-black/60">@tadstech</div>
                                        </a>
                                    </div>

                                    <div className="border-t border-[#28333F] pt-8 mt-8">
                                        <div className="text-xs text-[#28333F] space-y-2">
                                            <div>Lagos, Nigeria</div>
                                            <div>BSc Mathematics • University of Lagos</div>
                                            <div className="pt-4">
                                                <Terminal className="h-4 w-4 inline-block mr-2" />
                                                <span className="font-mono">system.status = READY_TO_BUILD</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate('/')}
                                        className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-all inline-flex items-center gap-2"
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
                        className={`w-2 h-2 transition-all ${
                            currentLayer === layer ? 'bg-white w-8' : 'bg-[#28333F]'
                        }`}
                        aria-label={`Navigate to ${layer}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};
