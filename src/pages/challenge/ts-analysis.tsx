import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Database, Palette, TrendingUp, LineChart, Twitter, Linkedin } from 'lucide-react';

interface ChallengeDay {
    day: string;
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

export const TSAnalysis: React.FC = () => {
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

    const challengeDays: ChallengeDay[] = [
        {
            day: "1",
            name: 'Time Series Fundamentals',
            description: 'Core concepts: trends, seasonality, cyclical patterns, noise. Setting up Python environment with pandas, matplotlib, and statsmodels. PLaying with some example data',
            dataset: 'Daily Climate time series data',
            datasetUrl: 'https://www.kaggle.com/datasets/sumanthvrao/daily-climate-time-series-data',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day1',
            xUrl: 'https://x.com/tads_tech/status/2009296701887029721?s=20',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_day-1-understanding-the-rhythm-of-climate-activity-7415062511281979392-uz8M?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed'
        },
        {
            day: "2",
            name: 'Data Acquisition & Preprocessing',
            description: 'Loading financial data using yfinance, inspecting and testing.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day2',
            xUrl: 'https://x.com/tads_tech/status/2009678300902236279?s=20',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_datascience-timeseries-python-activity-7415455894727270400-nzQq?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed'
        },
        {
            day: "3",
            name: 'Visualization Techniques',
            description: 'Line plots, seasonal decomposition plots, rolling statistics visualization with plotly. Understanding visual patterns in gold prices.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day3',
            status: 'completed'
        },
        {
            day: "4",
            name: 'Stationarity Concepts',
            description: 'Understanding stationarity, visual inspection methods, why it matters for forecasting. Mean, variance, and autocorrelation over time.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day4',
            status: 'completed'
        },
        {
            day: "5",
            name: 'ADF Test & Differencing',
            description: 'Augmented Dickey-Fuller test implementation, interpreting p-values, applying differencing to achieve stationarity in gold price data.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day5',
            xUrl: 'https://x.com/tads_tech/status/2010658865600446812?s=20',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_30daysoftimeseries-timeseriesanalysis-datascience-ugcPost-7416425880622632960-Nhrk?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed'
        },
        {
            day: "6",
            name: 'Autocorrelation Analysis',
            description: 'ACF/PACF plots, interpreting correlations at different lags, identifying model parameters from correlograms.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day6',
            xUrl: 'https://x.com/tads_tech/status/2011087978504871992?s=20',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_30daysoftimeseries-timeseriesanalysis-datascience-share-7416854276267896832-9QVF?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed'
        },
        {
            day: "7",
            name: 'Week 1 Project: Gold Price General EDA',
            description: 'Complete exploratory data analysis on gold price data with stationarity testing, decomposition, and comprehensive visualization dashboard.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day7',
            xUrl: 'https://x.com/tads_tech/status/2011409795732156697?s=20',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_30daysoftimeseries-timeseriesanalysis-datascience-share-7417176002822307841-FHXJ',
            status: 'completed'
        },
        {
            day: "8",
            name: 'Moving Average Smoothing',
            description: 'Simple moving average (SMA), weighted moving average (WMA), exponential moving average (EMA). Understanding lag and smoothing trade-offs.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day8',
            status: 'upcoming'
        },
        {
            day: "9",
            name: 'Simple Exponential Smoothing',
            description: 'SES implementation with statsmodels, alpha parameter tuning, generating forecasts for stationary data without trend.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day9',
            status: 'upcoming'
        },
        {
            day: "10",
            name: "Holt's Linear Trend",
            description: 'Double exponential smoothing for trending data. Level and trend components, optimizing alpha and beta parameters.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day10',
            status: 'upcoming'
        },
        {
            day: "11",
            name: "Holt-Winters' Seasonal",
            description: 'Triple exponential smoothing with seasonal components. Additive vs multiplicative seasonality, parameter optimization.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day11',
            status: 'upcoming'
        },
        {
            day: "12",
            name: 'Autoregressive (AR) Models',
            description: 'AR process fundamentals, order selection using PACF, fitting AR models with statsmodels. Understanding AR coefficients.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day12',
            status: 'upcoming'
        },
        {
            day: "13",
            name: 'ARMA Models',
            description: 'Combining AR and MA components, model identification using ACF/PACF, parameter estimation and model fitting.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day13',
            status: 'upcoming'
        },
        {
            day: "14",
            name: 'Week 2 Project: Exponential Smoothing Forecaster',
            description: 'Apply Holt-Winters and exponential smoothing techniques to build a gold price forecasting system with visualizations.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day14',
            status: 'upcoming'
        },
        {
            day: "15",
            name: 'ARIMA Fundamentals',
            description: 'Integration component explained, ARIMA(p,d,q) notation, complete model building workflow from data to forecast.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day15',
            status: 'upcoming'
        },
        {
            day: "16",
            name: 'ARIMA Parameter Selection',
            description: 'Grid search for optimal parameters, AIC/BIC information criteria, using auto_arima from pmdarima for automation.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day16',
            status: 'upcoming'
        },
        {
            day: "17",
            name: 'ARIMA Diagnostics',
            description: 'Residual analysis for model validation, Ljung-Box test for autocorrelation, checking normality and homoscedasticity.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day17',
            status: 'upcoming'
        },
        {
            day: "18",
            name: 'SARIMA for Seasonality',
            description: 'Seasonal ARIMA models, seasonal parameters (P,D,Q,s), identifying and modeling gold price seasonality patterns.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day18',
            status: 'upcoming'
        },
        {
            day: "19",
            name: 'Model Evaluation Metrics',
            description: 'MAE, RMSE, MAPE implementation. Understanding forecast error in financial context, comparing model performance.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day19',
            status: 'upcoming'
        },
        {
            day: "20",
            name: 'Confidence Intervals',
            description: 'Prediction intervals from ARIMA, quantifying uncertainty in gold price forecasts, visualizing forecast bands.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day20',
            status: 'upcoming'
        },
        {
            day: "21",
            name: 'Rolling Forecasts & Backtesting',
            description: 'Walk-forward validation methodology, realistic backtesting for financial data, avoiding look-ahead bias.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day21',
            status: 'upcoming'
        },
        {
            day: "22",
            name: 'Week 3 Project: ARIMA Gold Forecaster',
            description: 'Build a complete ARIMA forecasting pipeline for gold prices with automated parameter selection and diagnostics.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day22',
            status: 'upcoming'
        },
        {
            day: "23",
            name: 'Feature Engineering for TS',
            description: 'Creating lag features, rolling statistics, datetime features. Preparing time series data for machine learning models.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day23',
            status: 'upcoming'
        },
        {
            day: "24",
            name: 'Prophet Introduction',
            description: 'Facebook Prophet for time series forecasting. Automatic trend and seasonality detection, handling holidays.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day24',
            status: 'upcoming'
        },
        {
            day: "25",
            name: 'Prophet Advanced',
            description: 'Custom seasonalities, adding regressors, cross-validation with Prophet for robust model evaluation.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day25',
            status: 'upcoming'
        },
        {
            day: "26",
            name: 'LSTM for Time Series',
            description: 'Introduction to recurrent neural networks, sequence modeling basics, preparing data for LSTM input.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day26',
            status: 'upcoming'
        },
        {
            day: "27",
            name: 'LSTM Implementation',
            description: 'Building LSTM model with TensorFlow/Keras for gold price prediction. Architecture design and training.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day27',
            status: 'upcoming'
        },
        {
            day: "28",
            name: 'Ensemble Methods',
            description: 'Combining multiple forecasters, weighted averaging, stacking predictions from ARIMA, Prophet, and LSTM.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day28',
            status: 'upcoming'
        },
        {
            day: "29",
            name: 'Exogenous Variables',
            description: 'Adding USD index, interest rates, and other external factors to improve gold price forecast accuracy.',
            dataset: 'Yahoo Finance Gold + USD Index',
            datasetUrl: 'https://finance.yahoo.com/quote/DX-Y.NYB/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day29',
            status: 'upcoming'
        },
        {
            day: "30",
            name: 'Final Project: Production Gold Forecaster',
            description: 'Complete 7-30 day gold price forecasting system with multiple models, confidence intervals, and production-ready pipeline.',
            dataset: 'Yahoo Finance Gold (GLD)',
            datasetUrl: 'https://finance.yahoo.com/quote/GLD/',
            githubUrl: 'https://github.com/tadstech/30-days-of-tsa/tree/main/day30',
            status: 'upcoming'
        }
    ];

    const totalDays = 30;
    const completedDays = challengeDays.filter(d => d.status === 'completed').length;
    const progressPercentage = (completedDays / totalDays) * 100;

    useEffect(() => {
        localStorage.setItem('tadstech-theme', colorMode ? 'blue' : 'gray');
    }, [colorMode]);

    const accentColor = colorMode ? '#f59e0b' : '#28333F';

    const phases = [
        { name: "FOUNDATIONS", range: "Days 1-7", description: "Concepts & EDA" },
        { name: "CLASSICAL", range: "Days 8-14", description: "Smoothing & AR" },
        { name: "ARIMA", range: "Days 15-22", description: "ARIMA & Validation" },
        { name: "ADVANCED", range: "Days 23-30", description: "ML & Production" }
    ];

    const TimelineNode = ({ phase, index, currentDay }: { phase: typeof phases[0], index: number, currentDay: number }) => {
        const startDay = index === 0 ? 1 : index === 1 ? 8 : index === 2 ? 15 : 23;
        const endDay = index === 0 ? 7 : index === 1 ? 14 : index === 2 ? 22 : 30;
        const isCompleted = currentDay > endDay;
        const isActive = currentDay >= startDay && currentDay <= endDay;

        return (
            <div className="relative flex gap-4 pb-8 last:pb-0 group">
                <div className="flex flex-col items-center">
                    <div
                        className={`w-4 h-4 rounded-full border-2 z-10 transition-all duration-500 ${isCompleted || isActive ? 'bg-white border-white' : 'bg-black border-gray-700'
                            }`}
                        style={{
                            backgroundColor: (isCompleted || isActive) ? (colorMode ? accentColor : 'white') : 'black',
                            borderColor: (isCompleted || isActive) ? (colorMode ? accentColor : 'white') : '#374151'
                        }}
                    />
                    {index < 3 && (
                        <div
                            className={`w-0.5 h-full absolute top-4 transition-all duration-1000 ${isCompleted ? 'bg-white' : 'bg-gray-800'
                                }`}
                            style={{ backgroundColor: isCompleted ? (colorMode ? accentColor : 'white') : '#1f2937' }}
                        />
                    )}
                </div>
                <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-50'}`}>
                    <div className="text-xs font-bold mb-0.5" style={{ color: isActive || isCompleted ? (colorMode ? accentColor : 'white') : 'gray' }}>
                        {phase.name}
                    </div>
                    <div className="text-[10px] text-gray-500">{phase.range}</div>
                </div>
            </div>
        );
    };

    const GrowthChart = () => {
        const [mounted, setMounted] = useState(false);
        useEffect(() => setMounted(true), []);

        return (
            <div className="h-48 w-full flex items-end gap-1 px-2">
                {[...Array(30)].map((_, i) => {
                    const baseHeight = 20 + (Math.log(i + 1) * 20);
                    const randomVar = Math.sin(i * 0.5) * 10;
                    const height = Math.min(100, Math.max(10, baseHeight + randomVar));

                    return (
                        <div
                            key={i}
                            className="flex-1 transition-all duration-1000 ease-out rounded-t-sm relative group"
                            style={{
                                height: mounted ? `${height}%` : '0%',
                                backgroundColor: colorMode ? `${accentColor}${Math.floor(20 + (i / 30) * 60).toString(16).padStart(2, '0')}` : `rgba(255, 255, 255, ${0.2 + (i / 30) * 0.6})`,
                                transitionDelay: `${i * 30}ms`
                            }}
                        >
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 text-[10px] whitespace-nowrap bg-black border px-2 py-1 z-20 pointer-events-none" style={{ borderColor: accentColor }}>
                                Day {i + 1}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

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
                        <div className="flex items-center gap-2 text-amber-400">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider hidden sm:inline">Time Series Analysis</span>
                        </div>

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
                                {colorMode ? 'Gold' : 'B&W'}
                            </span>
                        </button>

                        <div className="text-xs text-white/70">
                            <span className="hidden md:inline">Progress: </span>
                            <span className="font-bold text-white">{completedDays}/30</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-24 pb-16 px-4">
                {isLoading ? (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
                        <div className="hidden lg:block relative">
                            <div className="sticky top-24 space-y-8">
                                <div className="border p-6 animate-pulse" style={{ borderColor: `${accentColor}20` }}>
                                    <div className="h-6 bg-gray-800 rounded w-32 mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-32 bg-gray-800 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-12">
                            <div className="border p-8 md:p-12 animate-pulse" style={{ borderColor: `${accentColor}20` }}>
                                <div className="h-12 bg-gray-800 rounded w-64 mb-4"></div>
                                <div className="h-1 w-48 bg-gray-800 rounded mb-4"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
                        <div className="hidden lg:block relative">
                            <div className="sticky top-24 space-y-8">
                                <div className="border p-6" style={{ borderColor: accentColor }}>
                                    <h2 className="text-xl font-bold mb-4">GROWTH METRICS</h2>
                                    <GrowthChart />
                                    <div className="mt-4 text-xs text-gray-400 text-center">Complexity vs Time</div>
                                </div>

                                <div className="border p-6" style={{ borderColor: accentColor }}>
                                    <h2 className="text-xl font-bold mb-6">LEARNING PATH</h2>
                                    <div className="flex flex-col">
                                        {phases.map((phase, i) => (
                                            <TimelineNode
                                                key={i}
                                                phase={phase}
                                                index={i}
                                                currentDay={completedDays}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="text-center lg:text-left mb-16">
                                <div className="inline-block border p-8 md:p-12 relative mb-8 transition-all duration-300 hover:shadow-2xl w-full" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 30px ${accentColor}40` : 'none' }}>
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>

                                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                                        {'>'} <span style={{ color: colorMode ? accentColor : 'white' }}>30 DAYS OF TSA</span>
                                    </h1>
                                    <div className="h-px w-48 mx-auto lg:mx-0 mb-4 transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                    <p className="text-sm md:text-base text-white/70 max-w-2xl">
                                        A structured journey through time-series analysis and forecasting.
                                        Building towards production-ready gold price prediction systems.
                                    </p>
                                </div>

                                <div className="max-w-2xl space-y-4 lg:hidden">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-white/70 uppercase tracking-wider">Challenge Progress</span>
                                        <span className="text-white font-bold" style={{ color: colorMode ? accentColor : 'white' }}>{completedDays}/30</span>
                                    </div>
                                    <div className="w-full h-4 border relative overflow-hidden transition-colors duration-300" style={{ borderColor: accentColor }}>
                                        <div
                                            className="h-full transition-all duration-1000"
                                            style={{
                                                width: `${progressPercentage}%`,
                                                backgroundColor: colorMode ? accentColor : 'white'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-12">
                                <div className="border p-6 transition-all duration-300 hover:shadow-2xl" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 20px ${accentColor}20` : 'none' }}>
                                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <LineChart className="h-5 w-5 transition-transform hover:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                        <span style={{ color: colorMode ? accentColor : 'white' }}>OBJECTIVE</span>
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                <span>Forecast daily gold prices 7-30 days ahead</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                <span>Master stationarity testing and differencing</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                <span>Build ARIMA/SARIMA forecasting pipelines</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                <span>Implement Prophet and LSTM models</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                <span>Validate with MAE, RMSE, MAPE metrics</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                <span>Tools: Python, pandas, statsmodels, TensorFlow</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-0 relative">
                                <div className="absolute left-[-48px] top-0 bottom-0 w-px bg-gray-800 hidden lg:block"></div>

                                {challengeDays.map((challenge, index) => (
                                    <div key={challenge.day} className="relative group/card">
                                        <div className="absolute left-[-54px] top-10 w-12 h-px bg-gray-800 hidden lg:block group-hover/card:bg-white transition-colors duration-300"></div>
                                        <div className="absolute left-[-56px] top-[38px] w-2 h-2 rounded-full bg-black border border-gray-800 hidden lg:block group-hover/card:border-white transition-colors duration-300"></div>

                                        {index > 0 && (
                                            <div className="w-px h-6 mx-auto transition-colors duration-300 lg:hidden" style={{ backgroundColor: accentColor }}></div>
                                        )}
                                        <div
                                            className={`border p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${challenge.status === 'completed'
                                                ? 'hover:bg-white hover:text-black group'
                                                : challenge.status === 'in-progress'
                                                    ? ''
                                                    : ''
                                                }`}
                                            style={{
                                                borderColor: challenge.status === 'completed' ? 'white' : challenge.status === 'in-progress' ? accentColor : accentColor,
                                                boxShadow: colorMode ? `0 0 20px ${accentColor}15` : 'none'
                                            }}
                                        >
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-shrink-0">
                                                    <div className={`w-20 h-20 border flex items-center justify-center transition-all duration-300 ${challenge.status === 'completed'
                                                        ? 'group-hover:border-black/20'
                                                        : ''
                                                        }`} style={{ borderColor: accentColor }}>
                                                        <div className="text-center">
                                                            <div className="text-xs transition-colors duration-300 group-hover:text-black/60" style={{ color: colorMode ? accentColor : '#28333F' }}>DAY</div>
                                                            <div className="text-2xl font-bold">{challenge.day.toString().padStart(2, '0')}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex-1 space-y-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-2 transition-colors">{challenge.name}</h3>
                                                        <p className="text-sm text-white/70 group-hover:text-black/70 transition-colors">{challenge.description}</p>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2 text-xs">
                                                        <a
                                                            href={challenge.datasetUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 px-4 py-2 border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group/chip"
                                                            style={{
                                                                borderColor: `${accentColor}60`,
                                                                background: `linear-gradient(135deg, ${accentColor}15 0%, transparent 100%)`,
                                                                boxShadow: `0 2px 8px ${accentColor}20`
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.boxShadow = `0 4px 20px ${accentColor}40`;
                                                                e.currentTarget.style.borderColor = accentColor;
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.boxShadow = `0 2px 8px ${accentColor}20`;
                                                                e.currentTarget.style.borderColor = `${accentColor}60`;
                                                            }}
                                                        >
                                                            <Database className="h-3.5 w-3.5 transition-transform duration-300 group-hover/chip:rotate-12" style={{ color: accentColor }} />
                                                            <span className="hidden sm:inline font-medium">{challenge.dataset}</span>
                                                            <span className="sm:hidden font-medium">Dataset</span>
                                                            <ExternalLink className="h-3 w-3 opacity-50 group-hover/chip:opacity-100 transition-opacity" />
                                                        </a>
                                                        <a
                                                            href={challenge.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 px-4 py-2 border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group/chip"
                                                            style={{
                                                                borderColor: `${accentColor}60`,
                                                                background: `linear-gradient(135deg, ${accentColor}15 0%, transparent 100%)`,
                                                                boxShadow: `0 2px 8px ${accentColor}20`
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.boxShadow = `0 4px 20px ${accentColor}40`;
                                                                e.currentTarget.style.borderColor = accentColor;
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.boxShadow = `0 2px 8px ${accentColor}20`;
                                                                e.currentTarget.style.borderColor = `${accentColor}60`;
                                                            }}
                                                        >
                                                            <Github className="h-3.5 w-3.5 transition-transform duration-300 group-hover/chip:scale-110" style={{ color: accentColor }} />
                                                            <span className="font-medium">Code</span>
                                                            <ExternalLink className="h-3 w-3 opacity-50 group-hover/chip:opacity-100 transition-opacity" />
                                                        </a>
                                                        {challenge.xUrl && (
                                                            <a
                                                                href={challenge.xUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 px-4 py-2 border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group/chip"
                                                                style={{
                                                                    borderColor: 'rgba(29, 161, 242, 0.4)',
                                                                    background: 'linear-gradient(135deg, rgba(29, 161, 242, 0.15) 0%, transparent 100%)',
                                                                    boxShadow: '0 2px 8px rgba(29, 161, 242, 0.2)'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(29, 161, 242, 0.4)';
                                                                    e.currentTarget.style.borderColor = '#1DA1F2';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(29, 161, 242, 0.2)';
                                                                    e.currentTarget.style.borderColor = 'rgba(29, 161, 242, 0.4)';
                                                                }}
                                                            >
                                                                <Twitter className="h-3.5 w-3.5 transition-transform duration-300 group-hover/chip:scale-110" style={{ color: '#1DA1F2' }} />
                                                                <span className="font-medium hidden sm:inline">Post</span>
                                                            </a>
                                                        )}
                                                        {challenge.linkedinUrl && (
                                                            <a
                                                                href={challenge.linkedinUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 px-4 py-2 border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group/chip"
                                                                style={{
                                                                    borderColor: 'rgba(0, 119, 181, 0.4)',
                                                                    background: 'linear-gradient(135deg, rgba(0, 119, 181, 0.15) 0%, transparent 100%)',
                                                                    boxShadow: '0 2px 8px rgba(0, 119, 181, 0.2)'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 119, 181, 0.4)';
                                                                    e.currentTarget.style.borderColor = '#0077B5';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 119, 181, 0.2)';
                                                                    e.currentTarget.style.borderColor = 'rgba(0, 119, 181, 0.4)';
                                                                }}
                                                            >
                                                                <Linkedin className="h-3.5 w-3.5 transition-transform duration-300 group-hover/chip:scale-110" style={{ color: '#0077B5' }} />
                                                                <span className="font-medium hidden sm:inline">LinkedIn</span>
                                                            </a>
                                                        )}
                                                    </div>

                                                    {challenge.date && (
                                                        <div className="text-xs text-white/50 group-hover:text-black/50 transition-colors">
                                                            Completed: {challenge.date}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-shrink-0 flex items-start">
                                                    <div className={`px-3 py-1 text-xs uppercase tracking-wider border ${challenge.status === 'completed'
                                                        ? 'text-green-400 border-green-400/50 group-hover:text-green-600 group-hover:border-green-600/50'
                                                        : challenge.status === 'in-progress'
                                                            ? 'text-amber-400 border-amber-400/50'
                                                            : 'text-gray-500 border-gray-500/50'
                                                        }`}>
                                                        {challenge.status === 'completed' ? 'Done' : challenge.status === 'in-progress' ? 'Active' : 'Soon'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
