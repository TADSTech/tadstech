import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Mail, Github, Linkedin } from 'lucide-react';

interface Command {
    input: string;
    output: React.ReactNode;
}

export const DesktopRender: React.FC = () => {
    const navigate = useNavigate();
    const [commandHistory, setCommandHistory] = useState<Command[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const cvData = {
        name: "Michael Tunwashe",
        title: "Data Scientist",
        tagline: "Data Scientist | Lagos, Nigeria | +234-704-102-9093 | motrenewed@gmail.com | linkedin.com/in/tadstech | github.com/tadstech",
        summary: "FullStack Data Scientist with 2 years of Python experience specializing in end-to-end data solutions from ETL pipeline development to ML model deployment. Expert in data engineering, automated workflows, and production-ready analytics systems. Combines deep technical expertise in data processing with full-stack development capabilities for comprehensive data-driven solutions.",
        contact: {
            email: "motrenewed@gmail.com",
            phone: "+234-704-102-9093",
            github: "github.com/tadstech",
            linkedin: "linkedin.com/in/tadstech",
            location: "Lagos, Nigeria"
        },
        skills: {
            dataScience: [
                "Python (pandas, NumPy, scikit-learn, SQLAlchemy)",
                "ETL Pipeline Development & Data Engineering",
                "SQL (PostgreSQL, MySQL) & Database Management",
                "Statistical Analysis & Predictive Modeling",
                "Docker, Containerization & Deployment",
                "Data Visualization (Plotly, Metabase, Dash)"
            ],
            development: [
                "React, TypeScript, Next.js",
                "FastAPI, REST APIs & Microservices",
                "Docker & Container Orchestration",
                "Git, CI/CD & DevOps Practices",
                "Database Administration & Optimization"
            ]
        },
        education: {
            degree: "BSc Mathematics",
            institution: "University of Lagos",
            period: "2024 -- 2028",
            focus: "Statistics, Probability, Linear Algebra, Calculus"
        },
        projects: [
            {
                name: "Brazilian Retail Intelligence System (BRIS)",
                period: "Nov 2025 - Present",
                emoji: "🇧🇷",
                type: "Enterprise Data Engineering & BI Solution",
                description: "Comprehensive end-to-end Data Engineering and Business Intelligence platform combining raw data extraction, transformation, synthetic data generation, REST API development, and interactive React frontend visualization for retail analytics.",
                highlights: [
                    "Designed modular microservices architecture with dual-environment ETL pipeline (Local SQLAlchemy + Production Supabase)",
                    "Implemented intelligent synthetic data generation (OrderGen) using Markov Chains for NLP-powered Portuguese review generation",
                    "Built FastAPI backend with asynchronous processing for long-running data operations and incremental data loading",
                    "Created robust PostgreSQL schema with automated migrations, foreign keys, and row-level security (RLS)",
                    "Developed React + TypeScript dashboard with interactive visualizations for Revenue, Customer Behavior, and Logistics metrics",
                    "Containerized entire application stack with Docker for production deployment and development consistency"
                ],
                tech: ["Python", "FastAPI", "PostgreSQL", "Supabase", "Docker", "React", "TypeScript", "Pandas", "Markov Chains"],
                url: ""
            },
            {
                name: "SalesScope Dashboard",
                period: "Jun 2025 -- Aug 2025",
                emoji: "📊",
                type: "End-to-End Sales Analytics Platform",
                description: "End-to-end sales analytics platform with automated ETL pipelines, data validation, and interactive visualizations. Built complete data processing workflows from raw sales data to actionable business insights.",
                highlights: [
                    "Designed and implemented automated ETL pipelines for 6+ months of sales data processing",
                    "Built data validation and cleaning workflows using Python and pandas",
                    "Created interactive dashboard with React and TypeScript for stakeholder reporting",
                    "Optimized SQL queries for efficient data extraction and transformation",
                    "Delivered actionable insights that improved sales strategy and performance tracking"
                ],
                tech: ["Python", "pandas", "SQL", "React", "PlotlyJs", "TailwindCSS"],
                url: "https://salesscope.web.app"
            },
            {
                name: "Mini Data Manim",
                period: "Aug 2025 - Oct 2025",
                emoji: "🗃️",
                type: "Advanced Data Manipulation Platform",
                description: "Browser-based data manipulation platform with advanced statistical operations, data transformation pipelines, and dynamic visualization engine. Handles complex data workflows without external dependencies.",
                highlights: [
                    "Developed web-based platform for complex data manipulation with Excel-like functionality",
                    "Implemented advanced statistical operations including data transformation pipelines",
                    "Built dynamic visualization engine using Plotly.js with support for multiple chart types",
                    "Created multi-sheet workbook functionality with inline editing and data validation",
                    "Optimized browser performance for handling large datasets without backend dependencies"
                ],
                tech: ["React", "TypeScript", "exceljs", "PlotlyJs", "Statistical Libraries"],
                url: "https://minidatamanim.web.app"
            },
            {
                name: "Financial News Classifier",
                period: "Oct 2025 - Nov 2025",
                emoji: "📰",
                type: "Production ML Pipeline",
                description: "Production-ready ML pipeline for financial sentiment analysis with automated model serving, batch processing capabilities, and real-time inference API. Deployed with containerized microservices architecture.",
                highlights: [
                    "Built production ML pipeline using FinBERT model for financial sentiment analysis",
                    "Achieved ~80% accuracy in classifying financial news as Bullish, Bearish, or Neutral",
                    "Implemented containerized microservices architecture with Docker for scalable deployment",
                    "Developed real-time inference API with FastAPI and batch processing capabilities",
                    "Created automated model serving pipeline with confidence metrics and monitoring"
                ],
                tech: ["Python", "FinBERT", "FastAPI", "Docker", "Hugging Face", "React"],
                url: "https://tadstech.github.io/financial-news-classifier"
            },
            {
                name: "NaijaEconoDash",
                period: "Nov 2025",
                emoji: "🇳🇬",
                type: "Real-time Economic Data Pipeline",
                description: "Real-time economic data pipeline with automated data ingestion, transformation, and visualization. Processes multiple data sources with scheduled ETL jobs and interactive dashboard deployment.",
                highlights: [
                    "Built automated data ingestion pipeline for multiple economic data sources",
                    "Implemented scheduled ETL jobs for real-time data processing and transformation",
                    "Created interactive dashboard using Plotly Dash for economic indicator visualization",
                    "Designed data pipeline architecture for handling time-series economic data",
                    "Deployed scalable dashboard with automated data refresh and monitoring"
                ],
                tech: ["Python", "pandas", "Requests", "PlotlyDash", "Data Pipeline", "Scheduling"],
                url: "https://naija-econo-plotlydash.onrender.com"
            }
        ],
        experience: [
            {
                title: "Data Analyst Intern",
                period: "Aug 2025 - Nov 2025",
                company: "HNG Tech",
                emoji: "📈",
                highlights: [
                    "Performed data cleaning, transformation, and exploratory analysis on business datasets",
                    "Created SQL queries for reporting and automated data extraction",
                    "Built business intelligence reports using Metabase and Plotly dash"
                ]
            }
        ],
        personality: {
            workStyle: "I believe in clean code, clear documentation, and making data accessible to everyone.",
            philosophy: "Data should tell stories, not confuse people.",
            currentlyLearning: ["Advanced ML techniques", "Cloud architecture (AWS/GCP)", "More Backend technologies"],
            interests: ["Open source", "Data visualization", "Teaching others to code"]
        }
    };

    const commands: { [key: string]: () => React.ReactNode } = {
        help: () => (
            <div className="space-y-3">
                <p className="text-cyan-400">📚 Available Commands:</p>
                <div className="ml-4 grid grid-cols-2 gap-2">
                    <p><span className="text-green-400">about.init()</span> <span className="text-neutral-500">- Who is Michael. T?</span></p>
                    <p><span className="text-green-400">skills.init()</span> <span className="text-neutral-500">- My tech stack</span></p>
                    <p><span className="text-green-400">projects.init()</span> <span className="text-neutral-500">- Past and Present Projects</span></p>
                    <p><span className="text-green-400">experience.init()</span> <span className="text-neutral-500">- Work history</span></p>
                    <p><span className="text-green-400">contact.init()</span> <span className="text-neutral-500">- Get in touch</span></p>
                    <p><span className="text-green-400">education.init()</span> <span className="text-neutral-500">- Academic background</span></p>
                    <p><span className="text-green-400">uwsm $portfolio</span> <span className="text-neutral-500">- launch portfolio site</span></p>
                    <p><span className="text-green-400">personality.init()</span> <span className="text-neutral-500">- Work philosophy</span></p>
                    <p><span className="text-green-400">cls</span> <span className="text-neutral-500">- Clear screen</span></p>
                </div>
                <p className="mt-3 text-yellow-400 text-sm">Tip: Try "uwsm $portfolio" to see the full site!</p>
            </div>
        ),
        "about.init()": () => (
            <div className="space-y-4">
                <div className="border-l-4 border-cyan-500 pl-4">
                    <h2 className="text-2xl font-bold text-white mb-1">{cvData.name}</h2>
                    <p className="text-cyan-400 text-lg">{cvData.title}</p>
                    <p className="text-yellow-300 text-sm mt-1">{cvData.tagline}</p>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                    {cvData.summary}
                </p>
                <div className="flex items-center gap-2 text-neutral-400">
                    <span>{cvData.contact.location}</span>
                </div>
            </div>
        ),
        "skills.init()": () => (
            <div className="space-y-5">
                <div className="border-l-4 border-blue-500 pl-4">
                    <p className="mb-3 text-blue-400 font-bold">Data Science & Analytics:</p>
                    <ul className="ml-4 space-y-1">
                        {cvData.skills.dataScience.map((skill, i) => (
                            <li key={i} className="text-neutral-300">→ {skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                    <p className="mb-3 text-purple-400 font-bold">Web Development:</p>
                    <ul className="ml-4 space-y-1">
                        {cvData.skills.development.map((skill, i) => (
                            <li key={i} className="text-neutral-300">→ {skill}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ),
        "projects.init()": () => (
            <div className="space-y-6">
                {cvData.projects.map((project, i) => (
                    <div key={i} className="border-l-4 border-green-500 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{project.emoji}</span>
                            <h3 className="font-bold text-white text-lg">{project.name}</h3>
                        </div>
                        <p className="text-sm text-neutral-500 mb-1">{project.period}</p>
                        <p className="text-cyan-400 mb-2">{project.type}</p>
                        <p className="text-neutral-400 text-sm mb-3 italic">{project.description}</p>
                        <ul className="space-y-1">
                            {project.highlights.map((highlight, j) => (
                                <li key={j} className="text-sm text-neutral-300">✓ {highlight}</li>
                            ))}
                        </ul>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {project.tech.map((tech, j) => (
                                <span key={j} className="px-2 py-1 bg-neutral-800 text-xs text-cyan-400 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {project.url && (
                            <div className="mt-3">
                                <a 
                                    href={project.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-400 hover:text-blue-300 underline"
                                >
                                    🔗 View Live Project
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ),
        "contact.init()": () => (
            <div className="space-y-3">
                <p className="mb-4 text-cyan-400 font-bold">Let's Connect!</p>
                <div className="space-y-2">
                    {Object.entries(cvData.contact).map(([key, value]) => (
                        <div key={key} className="flex gap-3">
                            <span className="w-28 text-neutral-500 capitalize">{key}:</span>
                            <span className="text-blue-400">{value}</span>
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-yellow-300 text-sm">Always happy to chat about data, code, or collaboration!</p>
            </div>
        ),
        "education.init()": () => (
            <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                <h3 className="font-bold text-white text-lg">{cvData.education.degree}</h3>
                <p className="text-cyan-400">{cvData.education.institution}</p>
                <p className="text-neutral-500 text-sm">{cvData.education.period}</p>
                <p className="text-neutral-300">Focus Areas: {cvData.education.focus}</p>
            </div>
        ),
        "experience.init()": () => (
            <div className="space-y-6">
                {cvData.experience.map((exp, i) => (
                    <div key={i} className="border-l-4 border-orange-500 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{exp.emoji}</span>
                            <h3 className="font-bold text-white">{exp.title}</h3>
                        </div>
                        <p className="text-sm text-neutral-500">{exp.period} | {exp.company}</p>
                        <ul className="mt-3 space-y-1">
                            {exp.highlights.map((highlight, j) => (
                                <li key={j} className="text-sm text-neutral-300">• {highlight}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        ),
        "personality.init()": () => (
            <div className="space-y-4">
                <div className="border-l-4 border-pink-500 pl-4">
                    <p className="text-pink-400 font-bold mb-2">Work Philosophy:</p>
                    <p className="text-neutral-300 italic">"{cvData.personality.philosophy}"</p>
                </div>
                <div>
                    <p className="text-cyan-400 mb-2">Work Style:</p>
                    <p className="text-neutral-300">{cvData.personality.workStyle}</p>
                </div>
                <div>
                    <p className="text-green-400 mb-2">Currently Learning:</p>
                    <ul className="ml-4 space-y-1">
                        {cvData.personality.currentlyLearning.map((item, i) => (
                            <li key={i} className="text-neutral-300">→ {item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ),
        "uwsm $portfolio": () => (
            <div className="text-center py-6">
                <p className="text-cyan-400 text-lg font-bold mb-2">Opening Main Portfolio...</p>
                <p className="text-neutral-400 text-sm">Redirecting to full portfolio site</p>
                <div className="mt-4 flex justify-center">
                    <div className="animate-pulse flex gap-2">
                        <div className="h-2 w-2 bg-cyan-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-cyan-400 rounded-full animation-delay-200"></div>
                        <div className="h-2 w-2 bg-cyan-400 rounded-full animation-delay-400"></div>
                    </div>
                </div>
            </div>
        ),
        cls: () => ''
    };

    const handleCommand = async (input: string) => {
        const trimmedInput = input.trim().toLowerCase();
        
        if (trimmedInput === 'cls') {
            setCommandHistory([]);
            return;
        }

        if (trimmedInput === 'uwsm $portfolio') {
            setCommandHistory(prev => [...prev, { input, output: commands["uwsm $portfolio"]() }]);
            setIsTransitioning(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
            return;
        }

        let output: React.ReactNode;
        
        if (commands[trimmedInput]) {
            output = commands[trimmedInput]();
        } else {
            output = (
                <div className="text-red-400">
                    Command not found: {trimmedInput}
                    <br />
                    <span className="text-neutral-500">Type 'help' to see available commands</span>
                </div>
            );
        }

        setCommandHistory(prev => [...prev, { input, output }]);
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[newIndex].input);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setCurrentInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setCurrentInput(commandHistory[newIndex].input);
                }
            }
        } else if (e.key === 'Enter' && currentInput.trim()) {
            handleCommand(currentInput);
            setCurrentInput('');
            setHistoryIndex(-1);
        }
    };

    const handleClose = () => {
        try {
            window.location.href = 'about:home';
        } catch {
            try {
                window.location.href = 'about:blank';
            } catch {
                window.location.href = 'https://www.google.com';
            }
        }
    };

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleOpenPortfolio = () => {
        navigate('/');
    };

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [commandHistory]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className={`flex h-full w-full flex-col transition-all duration-1000 ${isTransitioning ? 'opacity-0 scale-75 rotate-6' : 'opacity-100 scale-100 rotate-0'}`}>
            <div className="flex items-center justify-between gap-2 border-b border-neutral-800 bg-neutral-900 px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                        <button 
                            type="button"
                            onClick={handleClose}
                            className="rounded-full"
                            style={{ 
                                cursor: 'pointer',
                                width: '12px',
                                height: '12px',
                                minWidth: '12px',
                                minHeight: '12px',
                                backgroundColor: 'red',
                                border: 'none',
                                padding: 0
                            }}
                            aria-label="Close"
                        ></button>
                        <button 
                            type="button"
                            onClick={handleFullscreen}
                            className="rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex-shrink-0"
                            style={{ 
                                cursor: 'pointer',
                                width: '12px',
                                height: '12px',
                                minWidth: '12px',
                                minHeight: '12px',
                                border: 'none',
                                padding: 0
                            }}
                            aria-label="Fullscreen"
                        ></button>
                        <button 
                            type="button"
                            onClick={handleOpenPortfolio}
                            className="rounded-full bg-green-500 hover:bg-green-600 transition-colors flex-shrink-0"
                            style={{ 
                                cursor: 'pointer',
                                width: '12px',
                                height: '12px',
                                minWidth: '12px',
                                minHeight: '12px',
                                border: 'none',
                                padding: 0
                            }}
                            aria-label="Open Portfolio"
                        ></button>
                    </div>
                    <span className="ml-2 text-sm text-neutral-500">michael@archlinux:~/cv</span>
                </div>
                <Terminal className="h-4 w-4 text-blue-400" />
            </div>

            <div className="flex-1 overflow-y-auto bg-black p-6 font-mono text-sm">
                <div className="mb-6 border-l-4 border-cyan-400 bg-gradient-to-r from-neutral-900/50 to-transparent pl-4 py-2">
                    <pre className="text-xl font-bold text-cyan-400 leading-tight">
{String.raw`
+==============================================+
| _________  ________  ________  ________      |
||\___   ___\\   __  \|\   ___ \|\   ____\     |
|\|___ \  \_\ \  \|\  \ \  \_|\ \ \  \___|_    |
|     \ \  \ \ \   __  \ \  \ \\ \ \_____  \   |
|      \ \  \ \ \  \ \  \ \  \_\\ \|____|\  \  |
|       \ \__\ \ \__\ \__\ \_______\____\_\  \ |
|        \|__|  \|__|\|__|\|_______|\_________\|
|                                  \|_________||
+==============================================+
`}
                    </pre>
                    <div className="mt-3 space-y-2">
                        <p className="text-2xl font-bold text-white">MICHAEL TUNWASHE</p>
                        <p className="text-lg text-green-400 font-semibold">Data Scientist</p>
                        <p className="text-sm text-neutral-400 mt-2">Lagos, Nigeria | +234-704-102-9093 | motrenewed@gmail.com | linkedin.com/in/tadstech | github.com/tadstech</p>
                        <div className='flex gap-4 mt-3'>
                            <a href='mailto:motrenewed@gmail.com' target='_blank' className='text-neutral-500 hover:text-cyan-400 transition-colors'><Mail className="h-5 w-5"/></a>
                            <a href='https://github.com/tadstech' target='_blank' className='text-neutral-500 hover:text-cyan-400 transition-colors'><Github className="h-5 w-5"/></a>
                            <a href='https://linkedin.com/in/tadstech' target='_blank' className='text-neutral-500 hover:text-cyan-400 transition-colors'><Linkedin className="h-5 w-5"/></a>
                        </div>
                    </div>
                </div>

                <div className="mb-6 text-neutral-400 border-l-2 border-blue-500 pl-3">
                    <p className="text-sm">Type <span className="text-cyan-400 font-semibold">'help'</span> to see available commands</p>
                </div>

                {commandHistory.map((cmd, i) => (
                    <div key={i} className="mb-4">
                        <div className="mb-2">
                            <span className="text-green-500">michael@archlinux</span>
                            <span className="text-neutral-500">:</span>
                            <span className="text-blue-500">~/cv</span>
                            <span className="text-neutral-500">$ </span>
                            <span className="text-white">{cmd.input}</span>
                        </div>
                        <div className="ml-0 text-neutral-300">{cmd.output}</div>
                    </div>
                ))}

                <div className="flex items-center">
                    <span className="text-green-500">michael@archlinux</span>
                    <span className="text-neutral-500">:</span>
                    <span className="text-blue-500">~/cv</span>
                    <span className="text-neutral-500">$ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white outline-none"
                        spellCheck={false}
                    />
                </div>

                <div ref={terminalEndRef} />
            </div>
        </div>
    );
}