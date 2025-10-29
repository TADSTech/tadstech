import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Database, Twitter, Linkedin } from 'lucide-react';

interface ChallengeDay {
    day: number;
    name: string;
    description: string;
    dataset: string;
    datasetUrl: string;
    githubUrl: string;
    xUrl?: string;
    linkedinUrl?: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    date?: string;
}

export const Challenge: React.FC = () => {
    const navigate = useNavigate();

    const challengeDays: ChallengeDay[] = [
        {
            day: 1,
            name: 'Hospital Operations Analysis',
            description: 'Data cleaning, exploratory analysis, and visualization of hospital operations data. Focus on patient flow, resource utilization, and operational efficiency metrics.',
            dataset: 'Hospital Operations Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/jaderz/hospital-beds-management',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day1',
            xUrl: 'https://x.com/tads_tech/status/1982886727049183239',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_tadsography-dotd-dataanalytics-activity-7388650594791718912-v4Zk?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Oct 27, 2025'
        },
        {
            day: 2,
            name: 'Tsunami Prediction',
            description: 'Built a machine learning model to predict tsunami occurrence based on earthquake characteristics. The Random Forest classifier achieved 80-90% accuracy in identifying tsunami risk from seismic data.',
            dataset: 'Earthquake & Tsunami Risk Assessment',
            datasetUrl: 'https://www.kaggle.com/datasets/ahmeduzaki/global-earthquake-tsunami-risk-assessment-dataset/data',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day2',
            xUrl: 'https://x.com/tads_tech/status/1983180607203999910',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_day-2-of-datasets-alongside-isaac-joseph-activity-7388943206178156544-fd3C?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Oct 28, 2025'
        },
        {

            day: 3,
            name: 'Health and Lifestyle Recommendation System',
            description: 'This health recommendation system uses a rule-based engine for immediate, explainable advice and an ML-based Random Forest classifier to predict a healthy lifestyle and provide targeted, feature-importance-based suggestions.',
            dataset: 'Health and Lifestyle Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/jockeroika/life-style-data',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day3',
            xUrl: 'https://x.com/tads_tech/status/1983663228908687623',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_day-3-of-datasets-alongside-isaac-joseph-activity-7389428255369641984-Nnxh?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Oct 29, 2025'
        },
    ];

    const totalDays = 30;
    const completedDays = challengeDays.filter(d => d.status === 'completed').length;
    const progressPercentage = (completedDays / totalDays) * 100;

    return (
        <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#28333F]">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/portfolio')}
                        className="flex items-center gap-2 text-white hover:text-[#28333F] transition-colors border border-white hover:border-[#28333F] px-3 py-1.5"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wider">Back to Portfolio</span>
                    </button>

                    <div className="text-xs text-white/70">
                        <span className="hidden md:inline">Progress: </span>
                        <span className="font-bold text-white">{completedDays}/30</span>
                    </div>
                </div>
            </nav>

            <div className="pt-24 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block border border-white p-8 md:p-12 relative mb-8">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#28333F]"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#28333F]"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#28333F]"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#28333F]"></div>

                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                                {'>'} 30 DAYS OF DATASETS
                            </h1>
                            <div className="h-px bg-[#28333F] w-48 mx-auto mb-4"></div>
                            <p className="text-sm md:text-base text-white/70 max-w-2xl">
                                A personal challenge to explore and analyze a different dataset every day.
                                Building practical data analysis skills through hands-on exploration.
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto space-y-4">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-white/70 uppercase tracking-wider">Challenge Progress</span>
                                <span className="text-white font-bold">Day {completedDays}/30</span>
                            </div>
                            <div className="w-full h-4 border border-white/30 relative overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-1000"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <div className="border border-[#28333F] p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Database className="h-5 w-5" />
                                GOALS
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#28333F]">{'>'}</span>
                                        <span>Practice data cleaning and preparation techniques</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#28333F]">{'>'}</span>
                                        <span>Develop proficiency in exploratory data analysis</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#28333F]">{'>'}</span>
                                        <span>Create meaningful visualizations</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#28333F]">{'>'}</span>
                                        <span>Extract actionable insights from data</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#28333F]">{'>'}</span>
                                        <span>Build a portfolio of data analysis work</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[#28333F]">{'>'}</span>
                                        <span>Tools: Python, pandas, plotly, numpy, Jupyter</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-0">
                        {challengeDays.map((challenge, index) => (
                            <div key={challenge.day} className="relative">
                                {index > 0 && (
                                    <div className="w-px h-6 bg-[#28333F] mx-auto"></div>
                                )}
                                <div
                                    className={`border p-6 md:p-8 transition-all ${
                                        challenge.status === 'completed'
                                            ? 'border-white hover:bg-white hover:text-black group'
                                            : challenge.status === 'in-progress'
                                            ? 'border-white/70'
                                            : 'border-[#28333F]'
                                    }`}
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <div className={`w-20 h-20 border flex items-center justify-center ${
                                                challenge.status === 'completed'
                                                    ? 'border-[#28333F] group-hover:border-black/20'
                                                    : 'border-[#28333F]'
                                            }`}>
                                                <div className="text-center">
                                                    <div className="text-xs text-[#28333F] group-hover:text-black/60">DAY</div>
                                                    <div className="text-2xl font-bold">{challenge.day.toString().padStart(2, '0')}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <h3 className="text-xl md:text-2xl font-bold">{challenge.name}</h3>
                                                    {challenge.status === 'completed' && (
                                                        <span className="text-xs px-2 py-1 border border-[#28333F] group-hover:border-black/20 whitespace-nowrap">
                                                            COMPLETED
                                                        </span>
                                                    )}
                                                    {challenge.status === 'in-progress' && (
                                                        <span className="text-xs px-2 py-1 border border-white whitespace-nowrap">
                                                            IN PROGRESS
                                                        </span>
                                                    )}
                                                    {challenge.status === 'upcoming' && (
                                                        <span className="text-xs px-2 py-1 border border-[#28333F] text-[#28333F] whitespace-nowrap">
                                                            UPCOMING
                                                        </span>
                                                    )}
                                                </div>
                                                {challenge.date && (
                                                    <div className="text-xs text-[#28333F] group-hover:text-black/60 mb-3">{challenge.date}</div>
                                                )}
                                                <p className="text-sm text-white/70 group-hover:text-black/70 leading-relaxed">
                                                    {challenge.description}
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                                                    {challenge.status !== 'upcoming' && (
                                                        <a
                                                            href={challenge.datasetUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-sm border border-[#28333F] group-hover:border-black/20 px-3 py-1.5 hover:bg-[#28333F] hover:text-white group-hover:hover:bg-black/10 transition-all"
                                                        >
                                                            <Database className="h-4 w-4" />
                                                            <span className="text-xs uppercase tracking-wider">{challenge.dataset}</span>
                                                            <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    )}
                                                    {challenge.status === 'upcoming' && (
                                                        <div className="flex items-center gap-2 text-sm border border-[#28333F] px-3 py-1.5 opacity-50">
                                                            <Database className="h-4 w-4" />
                                                            <span className="text-xs uppercase tracking-wider text-[#28333F]">{challenge.dataset}</span>
                                                        </div>
                                                    )}

                                                    {challenge.status !== 'upcoming' && (
                                                        <a
                                                            href={challenge.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-sm border-b border-current pb-0.5 hover:gap-3 transition-all"
                                                        >
                                                            <Github className="h-4 w-4" />
                                                            <span className="uppercase tracking-wider text-xs">View on GitHub</span>
                                                            <ExternalLink className="h-3 w-3" />
                                                        </a>
                                                    )}
                                                </div>

                                                {challenge.status !== 'upcoming' && (challenge.xUrl || challenge.linkedinUrl) && (
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-[#28333F] group-hover:text-black/60 uppercase tracking-wider">Posts</span>
                                                        <div className="flex items-center gap-2">
                                                            {challenge.xUrl && (
                                                                <a
                                                                    href={challenge.xUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-1.5 border border-[#28333F] group-hover:border-black/20 hover:bg-[#28333F] hover:text-white group-hover:hover:bg-black/10 transition-all"
                                                                    aria-label="View post on X (Twitter)"
                                                                >
                                                                    <Twitter className="h-4 w-4" />
                                                                </a>
                                                            )}
                                                            {challenge.linkedinUrl && (
                                                                <a
                                                                    href={challenge.linkedinUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-1.5 border border-[#28333F] group-hover:border-black/20 hover:bg-[#28333F] hover:text-white group-hover:hover:bg-black/10 transition-all"
                                                                    aria-label="View post on LinkedIn"
                                                                >
                                                                    <Linkedin className="h-4 w-4" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center border border-[#28333F] p-8">
                        <p className="text-sm text-[#28333F] mb-4">
                            Follow the journey on GitHub
                        </p>
                        <a
                            href="https://github.com/tadstech/30-days-of-datasets"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-white px-6 py-2.5 hover:bg-white hover:text-black transition-all text-xs uppercase tracking-wider"
                        >
                            <Github className="h-4 w-4" />
                            <span>View Repository</span>
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
