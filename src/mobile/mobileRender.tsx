import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ChevronRight, Sparkles, Mail, Github, Linkedin } from 'lucide-react';

interface Command {
    input: string;
    output: React.ReactNode;
}

export const MobileRender: React.FC = () => {
    const navigate = useNavigate();
    const [commandHistory, setCommandHistory] = useState<Command[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const cvData = {
        name: "Michael Tunwashe",
        title: "Data Scientist & Front-End Developer",
        tagline: "Turning data into interactive insights",
        summary: "Hey there! I'm Michael, a data enthusiast who loves making sense of numbers and building cool stuff with code. Whether it's wrangling messy datasets, creating slick dashboards, or building full-stack apps, I'm all about solving problems and making data work for people.",
        contact: {
            email: "motrenewed@gmail.com",
            phone: "+234-704-102-9093",
            github: "github.com/tadstech",
            website: "tadstech.web.app",
            linkedin: "linkedin.com/in/tadstech",
            location: "LA, Nigeria"
        },
        skills: {
            dataScience: [
                "Python (pandas, NumPy): my daily drivers",
                "SQL wizardry (PostgreSQL, MySQL)",
                "Statistical analysis & predictive modeling",
                "Data viz with Plotly, Matplotlib, Seaborn",
                "BI tools: Metabase, Tableau"
            ],
            development: [
                "React & TypeScript - building responsive UIs",
                "Flutter & Dart - cross-platform magic",
                "Firebase & PostgreSQL - data persistence",
                "REST APIs - connecting the dots",
                "Git & GitHub - version control"
            ]
        },
        education: {
            degree: "BSc Mathematics",
            institution: "University of Lagos",
            period: "2024 - 2028",
            focus: "Stats, Probability, Linear Algebra & Calculus",
            funFact: "Currently exploring how math powers machine learning!"
        },
        projects: [
            {
                name: "SalesScope Dashboard",
                period: "2024-2025",
                emoji: "📊",
                type: "Real-time Analytics Platform",
                description: "A slick dashboard that turns sales data into actionable insights",
                highlights: [
                    "Crunched sales data with SQL & Python to spot trends nobody saw coming",
                    "Built a real-time React dashboard that stakeholders actually love using",
                    "Integrated Firebase & Power BI for seamless reporting",
                    "Helped the team make smarter decisions with data-driven recommendations"
                ],
                tech: ["React", "TypeScript", "Python", "SQL", "Firebase"]
            },
            {
                name: "FocusForge Analytics",
                period: "2025 - Present",
                emoji: "🎯",
                type: "Behavioral Analytics App",
                description: "Tracking habits and behaviors with beautiful visualizations",
                highlights: [
                    "Designed data models that capture user patterns like a detective",
                    "Created a cross-platform experience (web + mobile) with React & Flutter",
                    "Built a Node.js backend to keep everything running smoothly",
                    "Visualized engagement metrics with Plotly - data that tells a story"
                ],
                tech: ["React", "Flutter", "Node.js", "MongoDB", "Plotly"]
            },
            {
                name: "NaijaDash",
                period: "2025 - Present",
                emoji: "🇳🇬",
                type: "Nigeria Insights Dashboard",
                description: "A comprehensive dashboard providing insights into Nigeria's socio-economic data",
                highlights: [
                    "Integrated various data sources for a holistic view",
                    "Developed interactive visualizations to explore key metrics",
                    "Implemented user feedback to enhance usability",
                    "Collaborated with local experts to ensure relevance"
                ],
                tech: ["React", "TypeScript", "Python", "SQL", "D3.js", "Plotly"]
            }
        ],
        experience: [
            {
                title: "Data Analyst Intern",
                period: "2025",
                company: "HNG Tech",
                emoji: "📈",
                highlights: [
                    "Analyzing datasets to uncover hidden business insights",
                    "Building predictive models that actually work in production",
                    "Creating dashboards that make data accessible to everyone",
                    "Automating workflows so teams can focus on what matters"
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

    const quickCommands = [
        { cmd: 'about.init()', icon: '', label: 'Who is Michael. T?' },
        { cmd: 'skills.init()', icon: '', label: 'My tech stack' },
        { cmd: 'projects.init()', icon: '', label: 'Past and Present Projects' },
        { cmd: 'contact.init()', icon: '', label: 'Get in touch' },
        { cmd: 'education.init()', icon: '', label: 'Academic background' },
        { cmd: 'experience.init()', icon: '', label: 'Work history' },
        { cmd: 'uwsm $portfolio', icon: '', label: 'Launch portfolio site' },
        { cmd: 'personality.init()', icon: '', label: 'Work philosophy' },
        { cmd: 'cls', icon: '', label: 'Clear screen' }
    ];

    const commands: { [key: string]: () => React.ReactNode } = {
        help: () => (
            <div className="space-y-3">
                <p className="text-cyan-400">Available Commands:</p>
                <div className="space-y-2">
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
                                <li key={j} className="text-sm text-neutral-300">{highlight}</li>
                            ))}
                        </ul>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {project.tech.map((tech, j) => (
                                <span key={j} className="px-2 py-1 bg-neutral-800 text-xs text-cyan-400 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ),
        "contact.init()": () => (
            <div className="space-y-3">
                <p className="mb-4 text-cyan-400 font-bold">Let's Connect</p>
                <div className="space-y-2">
                    {Object.entries(cvData.contact).map(([key, value]) => (
                        <div key={key} className="flex gap-3">
                            <span className="w-28 text-neutral-500 capitalize">{key}:</span>
                            <span className="text-blue-400">{value}</span>
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-yellow-300 text-sm">Always happy to chat about data, code, or collaboration</p>
                <div className='flex gap-4 mt-3 justify-center'>
                    <a href='mailto:motrenewed@gmail.com' target='_blank' className='text-neutral-500 hover:text-cyan-400 transition-colors'><Mail className="h-6 w-6"/></a>
                    <a href='https://github.com/tadstech' target='_blank' className='text-neutral-500 hover:text-cyan-400 transition-colors'><Github className="h-6 w-6"/></a>
                    <a href='https://linkedin.com/in/tadstech' target='_blank' className='text-neutral-500 hover:text-cyan-400 transition-colors'><Linkedin className="h-6 w-6"/></a>
                </div>
            </div>
        ),
        "education.init()": () => (
            <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                <h3 className="font-bold text-white text-lg">{cvData.education.degree}</h3>
                <p className="text-cyan-400">{cvData.education.institution}</p>
                <p className="text-neutral-500 text-sm">{cvData.education.period}</p>
                <p className="text-neutral-300">Focus Areas: {cvData.education.focus}</p>
                <p className="text-yellow-300 text-sm italic">{cvData.education.funFact}</p>
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
                                <li key={j} className="text-sm text-neutral-300">{highlight}</li>
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
                navigate('/portfolio');
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

    const handleQuickCommand = (cmd: string) => {
        handleCommand(cmd);
        setShowCommandPalette(false);
        inputRef.current?.focus();
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
            e.preventDefault();
            handleCommand(currentInput);
            setCurrentInput('');
            setHistoryIndex(-1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentInput.trim()) {
            handleCommand(currentInput);
            setCurrentInput('');
        }
    };

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [commandHistory]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className={`flex w-full flex-col bg-black transition-all duration-1000 ${isTransitioning ? 'opacity-0 scale-75 rotate-6' : 'opacity-100 scale-100 rotate-0'}`} style={{height: '100vh'}}>
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-3 shrink-0">
                <div className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-cyan-400" />
                    <span className="text-sm font-mono text-neutral-400">michael@mobile:~/cv</span>
                </div>
                <button
                    onClick={() => setShowCommandPalette(!showCommandPalette)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-semibold active:bg-cyan-500/30 transition-colors"
                >
                    <Sparkles className="h-4 w-4" />
                    Quick Commands
                </button>
            </div>

            <div className="border-b border-neutral-800 bg-gradient-to-br from-neutral-900 to-black px-6 py-12 shrink-0">
                <h1 className="text-5xl font-bold text-white mb-3">MICHAEL TUNWASHE</h1>
                <p className="text-green-400 text-xl font-semibold mb-4">Data Scientist & Front-End Developer</p>
                <p className="text-neutral-300 text-base mb-3">Turning data into beautiful, interactive insights</p>
                <p className="text-neutral-400 text-base mb-6">Based in LA, Nigeria | Open to opportunities worldwide</p>
                <div className='flex gap-6 mb-6'>
                    <a href='mailto:motrenewed@gmail.com' target='_blank' className='text-neutral-500 hover:text-cyan-400 transition-colors'><Mail className="h-7 w-7"/></a>
                    <a href='https://github.com/tadstech' target='_blank' className='text-neutral-500 hover:text-cyan-400 transition-colors'><Github className="h-7 w-7"/></a>
                    <a href='https://linkedin.com/in/tadstech' target='_blank' className='text-neutral-500 hover:text-cyan-400 transition-colors'><Linkedin className="h-7 w-7"/></a>
                </div>
                <div className="text-neutral-400 text-sm space-y-1">
                    <p>Type <span className="text-cyan-400 font-semibold">'help'</span> to see available commands</p>
                    <p>Try <span className="text-yellow-400 font-semibold">'ask [question]'</span> to learn more about me</p>
                </div>
            </div>

            {showCommandPalette && (
                <div className="absolute inset-0 bg-black/95 z-50 flex flex-col">
                    <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
                        <h3 className="text-lg font-semibold text-white">Quick Commands</h3>
                        <button
                            onClick={() => setShowCommandPalette(false)}
                            className="text-neutral-400 text-2xl"
                        >
                            ×
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {quickCommands.map(({ cmd, label }) => (
                            <button
                                key={cmd}
                                onClick={() => handleQuickCommand(cmd)}
                                className="w-full flex items-center gap-3 p-4 bg-neutral-800/50 rounded-lg active:bg-neutral-700 transition-colors"
                            >
                                <div className="flex-1 text-left">
                                    <p className="text-cyan-400 font-mono font-semibold">{cmd}</p>
                                    <p className="text-neutral-400 text-sm">{label}</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-neutral-500" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm" style={{ paddingBottom: '80px' }}>
                {commandHistory.map((cmd, i) => (
                    <div key={i} className="mb-4">
                        <div className="mb-2 flex items-center gap-2">
                            <ChevronRight className="h-3 w-3 text-green-500" />
                            <span className="text-white">{cmd.input}</span>
                        </div>
                        <div className="ml-5 text-neutral-300">{cmd.output}</div>
                    </div>
                ))}

                <div ref={terminalEndRef} />
            </div>

            <form 
                onSubmit={handleSubmit}
                className="fixed bottom-0 left-0 right-0 border-t border-neutral-800 bg-neutral-900 px-4 py-3 safe-area-bottom"
            >
                <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-green-500 shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type command or 'help'..."
                        className="flex-1 bg-neutral-800 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-cyan-500 text-black rounded-lg font-semibold text-sm active:bg-cyan-600 transition-colors shrink-0"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
