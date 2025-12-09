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
        title: "Junior ML Engineer & Python Data Engineer",
        tagline: "Junior ML Engineer & Python Data Engineer | Lagos, Nigeria | +234-704-102-9093 | motrenewed@gmail.com | linkedin.com/in/tadstech | github.com/tadstech",
        summary: "Junior Machine Learning & Data Engineering practitioner with strong Python skills and hands-on experience building end-to-end data and analytics projects. Skilled in Pandas, PyTorch, SQL, and API development, with growing experience in ETL workflows, deployment, and financial data analysis. Currently pursuing a B.Sc. in Mathematics, developing deep technical foundations in ML, data processing, and applied statistics. Interested in ML Engineering, Data Engineering, and building towards Finance and Quant capabilities.",
        contact: {
            email: "motrenewed@gmail.com",
            phone: "+234-704-102-9093",
            github: "github.com/tadstech",
            linkedin: "linkedin.com/in/tadstech",
            location: "Lagos, Nigeria"
        },
        skills: {
            core: ['Python (Pandas, NumPy, scikit-learn, PyTorch)', 'Data Engineering (ETL pipelines, data cleaning, API integration)', 'Machine Learning (classical ML, text classification, model evaluation)', 'Backend Development (FastAPI, REST APIs)', 'SQL (PostgreSQL, MySQL)', 'Data Visualization (Plotly, Dash)', 'Tools (Docker, Git/GitHub)'],
            learning: ['React & TypeScript', 'Supabase', 'CI/CD basics', 'Financial modeling basics']
        },
        education: {
            degree: "BSc Mathematics",
            institution: "University of Lagos",
            period: "2024 -- 2028",
            focus: "Statistics, Probability, Linear Algebra, Calculus"
        },
        projects: [
            {
                name: "Financial News Classifier",
                period: "Sep 2025 – Nov 2025",
                emoji: "📰",
                type: "ML Text Classification Project",
                description: "Financial news sentiment classifier using PyTorch and scikit-learn for analyzing market sentiment from news articles.",
                highlights: [
                    "Built financial news sentiment classifier using PyTorch and scikit-learn achieving 93% accuracy on test data",
                    "Developed FastAPI endpoint for interactive model predictions",
                    "Containerized application with Docker for portable deployment",
                    "Designed web UI to visualize inputs, predictions, and confidence scores"
                ],
                tech: ['Python', 'PyTorch', 'scikit-learn', 'FastAPI', 'Docker'],
                url: "https://tadstech.github.io/financial-news-classifier"
            },
            {
                name: "Brazilian Retail Intelligence System (BRIS)",
                period: "Sep 2025 – Nov 2025",
                emoji: "🇧🇷",
                type: "Data Engineering & BI System",
                description: "ETL workflows and dashboard for processing retail transaction data and visualizing business metrics.",
                highlights: [
                    "Created ETL workflows using SQLAlchemy to process retail transaction data",
                    "Designed FastAPI service for retrieving processed metrics",
                    "Built OrderGen, a rule-based synthetic order generator with Markov-Chain-style sampling for review simulation",
                    "Developed React and TypeScript dashboard to visualize revenue trends and logistics KPIs",
                    "Used Docker for local service orchestration"
                ],
                tech: ['Python', 'SQLAlchemy', 'FastAPI', 'PostgreSQL', 'Docker', 'React', 'TypeScript'],
                url: "https://brazilian-retail-intelligence-syste.vercel.app"
            },
            {
                name: "Mini Data Manim",
                period: "Aug 2025 – Sep 2025",
                emoji: "🗃️",
                type: "Browser-Based Data Animation Tool",
                description: "Frontend tool for animating charts and statistics with Python preprocessing for data cleaning.",
                highlights: [
                    "Built frontend tool in React and TypeScript for animating charts and statistics",
                    "Implemented Python preprocessing script to clean datasets and feed animation parameters to UI",
                    "Optimized rendering loops for smooth animation playback"
                ],
                tech: ['React', 'TypeScript', 'Python', 'Plotly'],
                url: "https://minidatamanim.web.app"
            },
            {
                name: "Naija Economic Dashboard",
                period: "Feb 2025",
                emoji: "🇳🇬",
                type: "Economic Data Visualization Project",
                description: "Interactive dashboard tracking Nigerian financial indicators with API integration.",
                highlights: [
                    "Built interactive dashboard using Dash to track Nigerian financial indicators",
                    "Integrated Central Bank of Nigeria APIs for inflation, FX rates, and GDP statistics",
                    "Implemented caching to reduce API calls and improve load times",
                    "Designed responsive charts for non-technical users"
                ],
                tech: ['Python', 'Dash', 'Plotly', 'API Integration'],
                url: "https://naija-econo-plotlydash.onrender.com"
            }
        ],
        experience: [
            {
                title: "Data Analyst Intern",
                period: "Aug 2025 – Nov 2025",
                company: "HNG Tech",
                emoji: "📈",
                highlights: [
                    "Cleaned and transformed large business datasets using Python and SQL",
                    "Wrote SQL queries for recurring reporting tasks",
                    "Built dashboards in Metabase to support business insights",
                    "Assisted team with lightweight automation pipelines"
                ]
            }
        ],
        personality: {
            workStyle: "I focus on writing clean, maintainable code and learning from every project.",
            philosophy: "Build things that work, learn from mistakes, and keep improving.",
            currentlyLearning: ["Advanced ML techniques", "Financial modeling", "Cloud deployment (AWS/GCP)"],
            interests: ["Open source projects", "Kaggle competitions", "Finance and quantitative analysis"]
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
                    <p className="mb-3 text-blue-400 font-bold">Core Skills:</p>
                    <ul className="ml-4 space-y-1">
                        {cvData.skills.core.map((skill, i) => (
                            <li key={i} className="text-neutral-300">→ {skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                    <p className="mb-3 text-purple-400 font-bold">Currently Learning:</p>
                    <ul className="ml-4 space-y-1">
                        {cvData.skills.learning.map((skill, i) => (
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