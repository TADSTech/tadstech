import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Database, Twitter, Linkedin, Palette, TreePine } from 'lucide-react';

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

export const DatasetsChallenge: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
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
    const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);
    const [autoSwapInterval, setAutoSwapInterval] = useState<NodeJS.Timeout | null>(null);

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
            day: "2",
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

            day: "3",
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
        {

            day: "4",
            name: 'Netflix EDA - Content Strategy Analysis',
            description: 'This analysis explores the content strategy of Netflix through exploratory data analysis (EDA) of its movies and TV shows dataset. Key insights include content type distribution, genre popularity, release trends, and regional availability, providing a comprehensive overview of Netflix\'s content offerings and strategic focus areas.',
            dataset: 'Netflix movies and tv shows datasets',
            datasetUrl: 'https://www.kaggle.com/datasets/hqdataprofiler/cleaned-netflix-movies-and-tv-shows',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day4',
            xUrl: 'https://x.com/tads_tech/status/1984025368354025562',
            linkedinUrl: "https://www.linkedin.com/posts/tadstech_day-4-of-datasets-netflix-eda-summary-activity-7389792940266725376-dBWr?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI",
            status: 'completed',
            date: 'Oct 30, 2025'
        },
        {
            day: "5",
            name: 'Fruit Classification using Machine Learning',
            description: 'Developed a machine learning model to classify different types of fruits based on their physical characteristics. Utilized decision trees and random forests to achieve high accuracy in fruit identification.',
            dataset: 'Fruit Classification Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/pranavkapratwar/fruit-classification',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day5',
            xUrl: 'https://x.com/tads_tech/status/1984249100754464929',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_day-5-of-datasets-fruit-classification-activity-7390015150352789505-o-N1?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Oct 31, 2025'
        },
        {
            day: "6",
            name: 'Student Data Analysis & Multi‑Output Score Predictor',
            description: 'Predict three student exam scores (Math, Reading, Writing) simultaneously from demographic and preparatory features.',
            dataset: 'Student Performance Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/sadiajavedd/students-academic-performance-dataset',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day6',
            xUrl: 'https://x.com/tads_tech/status/1984693129060950216',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_day-6-student-data-analysis-multioutput-activity-7390459176461721600-RiLV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Nov 1, 2025'
        },
        {
            day: "7",
            name: 'Decoding Medical Costs: Analyzing Insurance Data',
            description: 'This project analyzes an insurance dataset and builds a model to predict insurance charges based on demographic and health-related features such as age, sex, BMI, number of children, smoking status, and region. Features include categorical encoding, one-hot encoding for regions, and DecisionTreeRegressor model evaluation.',
            dataset: 'Health Costs Insights: Insurance Data',
            datasetUrl: 'https://www.kaggle.com/datasets/saadaliyaseen/decoding-medical-costs-analyzing-insurance-data',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day7',
            xUrl: 'https://x.com/tads_tech/status/1985052602145345761',
            linkedinUrl: 'linkedin.com/posts/tadstech_day-7-of-datasets-decoding-medical-costs-activity-7390817634168102912-B_61?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Nov 2, 2025'
        },
        {
            day: "8",
            name: 'Energy Consumption & Cost Prediction',
            description: 'Built a predictive model to forecast energy costs based on customer characteristics. Decision Tree Regressor achieved test R2 score of 0.87 with mean absolute error of BRL 8-10. Key findings include building size and occupants as strongest predictors, cost variation of BRL 52-154, and regional consumption patterns.',
            dataset: 'Energy Consumption Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/andreylss/residential-and-commercial-energy-cost-dataset',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day8',
            xUrl: 'https://x.com/tads_tech/status/1985312468240085212',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_day-8-of-datasets-energy-consumption-cost-activity-7391078104980643840-RdqQ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Nov 3, 2025'
        },
        {
            day: "9",
            name: 'BMW Sales Data Analysis & Price Prediction',
            description: 'Comprehensive analysis of BMW sales trends from 2010-2024 with AdaBoost Regressor achieving strong price predictions. Key findings: Petrol vehicles lead market share with growing hybrid adoption, top models are 5 Series/3 Series/X3, automatic transmission dominates, regional variations in fuel preferences, and prices span from budget-friendly to luxury segments.',
            dataset: 'BMW Sales Data (2010-2024)',
            datasetUrl: 'https://www.kaggle.com/datasets/ahmadrazakashif/bmw-worldwide-sales-records-20102024',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day9',
            xUrl: 'https://x.com/tads_tech/status/1985744020501401752',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_day-9-dataset-of-the-day-bmw-sales-data-activity-7391509703392075777-35jI?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Nov 4, 2025'
        },
        {
            day: "10",
            name: 'Goodreads Books Dataset - Analysis & Rating Prediction',
            description: 'Comprehensive analysis of 3,045 Goodreads books with AdaBoost Regressor predicting ratings based on title characteristics, author info, and metadata. Key findings: Books concentrated in higher rating ranges, subtitles impact ratings, series books show distinct patterns, author count influences ratings, title complexity correlates with outcomes, and 12-feature model achieves strong predictive performance.',
            dataset: 'Goodreads Books Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/kutayahin/goodreads-books-dataset',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day10',
            status: 'completed',
            date: 'Nov 5, 2025'
        },
        {
            day: "11",
            name: 'Housing Price Analysis & Prediction',
            description: 'Comprehensive analysis of housing prices with focus on identifying key market drivers and building a predictive model. The project explores relationships between property features (area, bedrooms, amenities) and pricing, followed by an AdaBoost Regressor model for accurate price prediction. Key findings include area as the strongest predictor, air conditioning commanding ~₹2M premium (50% increase), furnishing status adding 30-40% premium, and parking availability providing significant value. Built an AdaBoost Regressor with Decision Tree base estimator achieving strong predictive performance for real estate valuation.',
            dataset: 'Housing Price Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/wardabilal/real-estate-price-insights',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day11',
            status: 'completed',
            date: 'Nov 6, 2025'
        },
        {
            day: "12",
            name: 'Heart Disease Prediction',
            description: 'Analyzes heart disease dataset with comprehensive EDA and Logistic Regression classification model. Features 2x2 EDA dashboard visualizing patient age, cholesterol, and blood pressure distributions. Built robust sklearn pipeline with standardization and one-hot encoding. Model evaluates with confusion matrix and classification metrics (Accuracy, Precision, Recall, F1-Score). Includes ready-to-use prediction function for binary classification (Heart Disease present or absent) based on patient medical features.',
            dataset: 'Heart Failure Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/tan5577/heart-failure-dataset',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day12',
            xUrl: 'https://x.com/tads_tech/status/1986794125035700720',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_machinelearning-datascience-healthcare-activity-7392562045709160448-25VZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Nov 7, 2025'
        },
        {
            day: "13",
            name: 'Car Price Prediction 2025',
            description: 'Comprehensive analysis of car pricing with machine learning-based price prediction. Multiple models (Lasso Regression, Random Forest, Gradient Boosting, XGBoost) were trained and evaluated to predict car prices based on brand, year, mileage, fuel type, and transmission. XGBoost emerged as the best performer with superior R² scores.',
            dataset: 'Car Price Prediction Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/aliiihussain/car-price-prediction',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day13',
            xUrl: 'https://x.com/tads_tech/status/1987180041856278530',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_datascience-machinelearning-python-activity-7392944134950617088-u7o6?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Nov 8, 2025'
        }
        ,
        {
            day: "14",
            name: 'Global Mobile Prices Analysis and Trend Forecasting',
            description: 'Professional EDA of global mobile phone listings with interactive Plotly visualizations and short-term trend forecasting when multi-year or release-date data is available. Includes a conservative supervised baseline pipeline (scaler + Ridge) with reproducible artifacts written to models/. Local dataset: data/Global_Mobile_Prices_2025_Extended.csv.',
            dataset: 'Global Mobile Prices Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/shahzadi786/world-smartphone-market-2025',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day14',
            status: 'completed',
            date: 'Nov 9, 2025'
        }
        ,
        {
            day: "15",
            name: 'Loan Eligibility Prediction',
            description: 'Supervised classification pipeline to predict loan approval. Includes data validation, preprocessing, categorical encoding, feature engineering (total income), model comparison (Logistic Regression, Decision Tree, Random Forest), and final model export. Local dataset: data/Loan_Eligibility_Prediction.csv.',
            dataset: 'Loan Eligibility Prediction',
            datasetUrl: 'https://www.kaggle.com/datasets/avineshprabhakaran/loan-eligibility-prediction',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day15',
            status: 'completed',
            date: 'Nov 10, 2025'
        },
        {
            day: "16-17",
            name: 'Ensemble-Powered Loan Payback Prediction',
            description: 'This project implements an ensemble-powered machine learning pipeline for predicting loan payback likelihood. The workflow includes data preprocessing with ordinal and one-hot encoding, cross-validation training of multiple models (XGBoost, LightGBM, CatBoost), and an ensemble combining CatBoost and LightGBM for improved performance. Additional visualizations provide insights into model comparisons, feature importance, and prediction distributions. To get the full experience, check out the Kaggle notebook: https://www.kaggle.com/code/miclenzy/ensemble-powered-loan-payback-prediction',
            dataset: 'Kaggle Playground Series S5E11 (Loan Default Prediction)',
            datasetUrl: 'https://www.kaggle.com/competitions/playground-series-s5e11',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day16',
            xUrl: 'https://x.com/tads_tech/status/1988705443137691728?t=_3wVLBUUG2ymM9oq-t59aQ&s=19',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_day-16-17-loan-payback-prediction-this-activity-7394473605797113856-RCKI?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI&utm_campaign=copy_link',
            status: 'completed',
            date: 'Nov 12, 2025'
        },
        {
            day: "18",
            name: 'SMS Spam Filter',
            description: 'This project builds a simple SMS spam filter using Naive Bayes classifier with TF-IDF vectorization. The pipeline includes data loading, preprocessing, model training, evaluation, and model persistence for inference. Includes visualizations for label distribution, text length analysis, confusion matrix, and prediction probabilities.',
            dataset: 'SMS Spam Collection Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day18',
            status: 'completed',
            date: 'Nov 13, 2025'
        },
        {
            day: "19",
            name: 'Student Performance Factors Analysis',
            description: 'Exploratory data analysis of student performance factors dataset with demographic, academic, and environmental features. Focus on attendance, hours studied, parental education, and their relation to exam scores.',
            dataset: 'Student Performance Factors Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/rabieelkharoua/students-performance-dataset',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day19',
            status: 'completed',
            date: 'Nov 14, 2025'
        },
        {
            day: "20",
            name: 'GPU Evolution Analysis',
            description: 'Comprehensive analysis of GPU evolution from 1999 to 2024, examining performance metrics, architectural changes, and market trends. Dataset includes detailed specifications, benchmarks, and historical pricing data for over 500 GPUs across multiple generations.',
            dataset: 'GPU Evolution Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/alanjo/gpu-evolution-dataset',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day20',
            status: 'completed',
            date: 'Nov 15, 2025'
        },
        {
            day: "21",
            name: 'UK Job Market Analysis 2025',
            description: 'Exploratory data analysis of 4,000 UK job postings from 2025, focusing on salary distributions and category trends. Includes a predictive model for salary estimation using Random Forest regression with job category and location features.',
            dataset: 'UK Jobs 2025 Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/jakupymeraj/jobs-a-2025-dataset',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day21',
            status: 'completed',
            date: 'Nov 16, 2025'
        },
        {
            day: "22",
            name: 'Iris Flower Classification',
            description: 'Exploratory data analysis and classification modeling of the classic Iris flower dataset using Random Forest. 150 samples with sepal and petal measurements across three species: setosa, versicolor, virginica. Petal dimensions provide better species separation while sepal measurements show more overlap. Random Forest classifier trained on measurement features achieving high accuracy with strong predictive performance.',
            dataset: 'Iris Flower Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/nalisha/machine-learning-practice-dataset-iris-flowers',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day22',
            status: 'completed',
            date: 'Nov 17, 2025'
        },
        {
            day: "23",
            name: 'Spotify Track Data Analysis',
            description: 'Extensive exploratory data analysis and classification modeling using Spotify track datasets. Analyzed track popularity, artist metrics, and music features to understand patterns in music data. Track popularity distributions and correlations with artist metrics, genre analysis and top artists by popularity. Visualizations including histograms, scatter plots, box plots, and heatmaps. Logistic Regression and Random Forest classifiers trained to predict track popularity categories with evaluation using accuracy, precision, recall, and confusion matrices.',
            dataset: 'Spotify Global Music Dataset (2009-2025)',
            datasetUrl: 'https://www.kaggle.com/datasets/wardabilal/spotify-global-music-dataset-20092025',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day23',
            status: 'completed',
            date: 'Nov 18, 2025'
        },
        {
            day: "24",
            name: 'Extensive EDA and ML on Patient Health Dataset',
            description: 'Conducted comprehensive exploratory data analysis (EDA) and machine learning modeling on patient health data to identify patterns and predict metabolic syndrome risk.',
            dataset: 'Processed patient health dataset containing demographic and clinical features for metabolic syndrome analysis.',
            datasetUrl: 'https://www.kaggle.com/datasets/jockeroika/eye-health',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day24',
            status: 'completed',
            date: 'Nov 19, 2025'
        },
        {
            day: "25",
            name: 'Extensive EDA with Plotly and ML on Diamonds Dataset',
            description: 'Conducted comprehensive exploratory data analysis using Matplotlib and Seaborn for visualizations and built a Random Forest regression model to predict diamond prices based on carat, cut, color, clarity, and other features.',
            dataset: 'Diamonds dataset containing physical attributes and price information for diamond gemstones.',
            datasetUrl: 'https://www.kaggle.com/datasets/ayeshaseherr/diamonds',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day25',
            status: 'completed',
            date: 'Nov 20, 2025'
        },
        {
            day: "26",
            name: 'Extensive EDA with Plotly and ML on Global Air Quality Dataset',
            description: 'Conducted comprehensive exploratory data analysis using interactive Plotly visualizations and built a Random Forest regression model to predict Air Quality Index (AQI) values based on pollutant measurements and location data.',
            dataset: 'Global air quality dataset containing AQI values, pollutant levels, and location information from various cities worldwide.',
            datasetUrl: 'https://www.kaggle.com/datasets/smeet888/global-air-quality-data15-days-hourly-50-cities',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day26',
            status: 'completed',
            date: 'Nov 21, 2025'
        },
        {
            day: "27",
            name: 'Extensive EDA with Plotly and ML on F1 Race Results Dataset',
            description: 'Conducted comprehensive exploratory data analysis using interactive Plotly visualizations and built a Random Forest regression model to predict final race positions based on grid position, constructor, driver, and race characteristics.',
            dataset: 'Formula 1 race results dataset containing comprehensive race data from 1950 to 2025, including driver performance, constructor information, qualifying results, and final race positions.',
            datasetUrl: 'https://www.kaggle.com/datasets/rockyt07/formula-1-championships-1950-2025',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day27',
            status: 'completed',
            date: 'Nov 22, 2025'
        }
        ,
        {
            day: "28",
            name: 'Extensive EDA with Plotly and ML on Global Gender Inequality Dataset',
            description: 'Conducted extensive exploratory data analysis using interactive dark-themed Plotly visualizations and built a Random Forest regression model to predict Gender Inequality Index values based on country characteristics and regional patterns.',
            dataset: 'Global Gender Inequality Index (GII) dataset from UNDP containing comprehensive gender equality metrics for countries and regions worldwide for 2023.',
            datasetUrl: 'https://www.kaggle.com/datasets/hammadfarooq470/global-gender-equality-rankings-2023',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day28',
            status: 'completed',
            date: 'Nov 23, 2025'
        },

        {
            day: "29",
            name: 'Mental Health Social Media Analysis',
            description: 'This day focuses on analyzing the relationship between social media usage patterns and mental health states using machine learning. We explore a comprehensive dataset containing demographic information, social media usage metrics, and mental health indicators to build a predictive model.',
            dataset: 'Mental Health Social Media Dataset',
            datasetUrl: 'https://www.kaggle.com/datasets/sonalshinde123/social-media-mental-health-indicators-dataset',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day29',
            status: 'completed',
            date: 'Nov 24, 2025'
        },

        {
            day: "30",
            name: 'Global Health Dataset - Comprehensive EDA & Ensemble ML',
            description: 'This is the grand finale of the 30-days-of-datasets challenge! Day 30 features an extensive analysis of the Unified Global Health Dataset - a comprehensive collection of health metrics from 195 countries spanning 30 years (1990-2021).',
            dataset: 'Global Health, Nutrition, Mortality, Economic Data',
            datasetUrl: 'https://www.kaggle.com/datasets/miguelroca/global-health-nutrition-mortality-economic-data',
            githubUrl: 'https://github.com/tadstech/30-days-of-datasets/tree/main/day30',
            xUrl: 'https://x.com/tads_tech/status/1993811349533806799?s=20',
            linkedinUrl: 'https://www.linkedin.com/posts/tadstech_its-been-about-29-days-since-i-began-a-journey-activity-7399576213784289280-QAfm?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF9rCfkBYTm_AC-w-u6nYqVkJGgsEdziUEI',
            status: 'completed',
            date: 'Nov 25, 2025'
        }
    ];

    const totalDays = 30;
    const completedDays = challengeDays.filter(d => d.status === 'completed').length + 1;
    const progressPercentage = (completedDays / totalDays) * 100;

    useEffect(() => {
        localStorage.setItem('tadstech-theme', colorMode ? 'blue' : 'gray');
    }, [colorMode]);

    useEffect(() => {
        return () => {
            if (holdTimer) clearTimeout(holdTimer);
            if (autoSwapInterval) clearInterval(autoSwapInterval);
        };
    }, [holdTimer, autoSwapInterval]);

    const handleThemeMouseDown = () => {
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setColorMode(prev => !prev);
            }, 5000);
            setAutoSwapInterval(interval);
        }, 5000);
        setHoldTimer(timer);
    };

    const handleThemeMouseUp = () => {
        if (holdTimer) {
            clearTimeout(holdTimer);
            setHoldTimer(null);
        }
        if (autoSwapInterval) {
            clearInterval(autoSwapInterval);
            setAutoSwapInterval(null);
        }
    };

    const handleThemeClick = () => {
        if (!autoSwapInterval) {
            setColorMode(prev => !prev);
        }
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

    // Phases definition
    const phases = [
        { name: "DATA CLEANING", range: "Days 1-7", description: "Foundations & Prep" },
        { name: "EDA", range: "Days 8-14", description: "Exploration & Viz" },
        { name: "BEGINNER ML", range: "Days 15-22", description: "Predictive Basics" },
        { name: "ADVANCED ML", range: "Days 23-30", description: "Deepening Knowledge" }
    ];

    const TimelineNode = ({ phase, index, currentDay }: { phase: any, index: number, currentDay: number }) => {
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
                    // Generate a "learning curve" that isn't linear - ups and downs but generally up
                    const baseHeight = 20 + (Math.log(i + 1) * 20);
                    const randomVar = Math.sin(i * 0.5) * 10;
                    const height = Math.min(100, Math.max(10, baseHeight + randomVar));

                    return (
                        <div
                            key={i}
                            className="flex-1 transition-all duration-1000 ease-out rounded-t-sm relative group"
                            style={{
                                height: mounted ? `${height}%` : '0%',
                                backgroundColor: colorMode ? `${accentColor}${Math.floor(20 + (i / 30) * 60)}` : `rgba(255, 255, 255, ${0.2 + (i / 30) * 0.6})`,
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
            {/* Loading Bar */}
            {isLoading && (
                <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-900 z-[100]">
                    <div
                        className="h-full transition-all duration-300 ease-out"
                        style={{
                            width: `${loadingProgress}%`,
                            backgroundColor: colorMode ? '#0ea5e9' : '#28333F'
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
                            onMouseDown={handleThemeMouseDown}
                            onMouseUp={handleThemeMouseUp}
                            onMouseLeave={handleThemeMouseUp}
                            onTouchStart={handleThemeMouseDown}
                            onTouchEnd={handleThemeMouseUp}
                            className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg relative cursor-pointer"
                            style={{
                                borderColor: accentColor,
                                backgroundColor: colorMode ? accentColor : 'transparent'
                            }}
                            title={autoSwapInterval ? "Auto-swapping active! Release to stop" : "Click to toggle, hold 5s for auto-swap"}
                        >
                            <Palette className={`h-4 w-4 ${autoSwapInterval ? 'animate-spin' : ''}`} />
                            <span className="text-xs uppercase tracking-wider hidden sm:inline">
                                {autoSwapInterval ? 'Auto' : colorMode ? 'Color' : 'B&W'}
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
                    // Skeleton Loading State
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
                        {/* Sidebar Skeleton */}
                        <div className="hidden lg:block relative">
                            <div className="sticky top-24 space-y-8">
                                <div className="border p-6 animate-pulse" style={{ borderColor: `${accentColor}20` }}>
                                    <div className="h-6 bg-gray-800 rounded w-32 mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-32 bg-gray-800 rounded"></div>
                                    </div>
                                </div>
                                <div className="border p-6 animate-pulse" style={{ borderColor: `${accentColor}20` }}>
                                    <div className="h-6 bg-gray-800 rounded w-32 mb-4"></div>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-4 bg-gray-800 rounded"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Skeleton */}
                        <div className="space-y-12">
                            <div className="border p-8 md:p-12 animate-pulse" style={{ borderColor: `${accentColor}20` }}>
                                <div className="h-12 bg-gray-800 rounded w-64 mb-4"></div>
                                <div className="h-1 w-48 bg-gray-800 rounded mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-800 rounded w-full"></div>
                                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="border p-6 animate-pulse" style={{ borderColor: `${accentColor}20` }}>
                                        <div className="h-6 bg-gray-800 rounded w-48 mb-3"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-gray-800 rounded w-full"></div>
                                            <div className="h-3 bg-gray-800 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Main Content
                    <>
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">

                            {/* Left Sidebar - Desktop Only */}
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

                            {/* Main Content */}
                            <div className="space-y-12">
                                <div className="text-center lg:text-left mb-16">
                                    <div className="inline-block border p-8 md:p-12 relative mb-8 transition-all duration-300 hover:shadow-2xl w-full" style={{ borderColor: accentColor, boxShadow: colorMode ? `0 0 30px ${accentColor}40` : 'none' }}>
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300" style={{ borderColor: accentColor }}></div>

                                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                                            {'>'} <span style={{ color: colorMode ? accentColor : 'white' }}>30 DAYS OF DATASETS</span>
                                        </h1>
                                        <div className="h-px w-48 mx-auto lg:mx-0 mb-4 transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                        <p className="text-sm md:text-base text-white/70 max-w-2xl">
                                            A personal challenge to explore and analyze a different dataset every day.
                                            Building practical data analysis skills through hands-on exploration.
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
                                            <Database className="h-5 w-5 transition-transform hover:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                            <span style={{ color: colorMode ? accentColor : 'white' }}>GOALS</span>
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2">
                                                    <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                    <span>Practice data cleaning and preparation techniques</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                    <span>Develop proficiency in exploratory data analysis</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                    <span>Create meaningful visualizations</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2">
                                                    <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                    <span>Extract actionable insights from data</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                    <span>Build a portfolio of data analysis work</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span style={{ color: colorMode ? accentColor : 'white' }}>{'>'}</span>
                                                    <span>Tools: Python, pandas, plotly, numpy, Jupyter</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Journey Timeline - Mobile Only */}
                                <div className="mb-16 relative lg:hidden">
                                    <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 hidden md:block transition-colors duration-300" style={{ backgroundColor: accentColor }}></div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                                        {[
                                            { phase: "PHASE 1", title: "FOUNDATIONS", days: "Days 1-7", desc: "Data Cleaning & EDA" },
                                            { phase: "PHASE 2", title: "PREDICTIVE", days: "Days 8-14", desc: "Regression & Classification" },
                                            { phase: "PHASE 3", title: "ADVANCED", days: "Days 15-22", desc: "NLP & Time Series" },
                                            { phase: "PHASE 4", title: "ADVANCED ML", days: "Days 23-30", desc: "Ensemble & Deep Learning" }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-black border p-4 relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl z-10 group" style={{ borderColor: accentColor }}>
                                                <div className="text-xs font-bold mb-1 transition-colors" style={{ color: colorMode ? accentColor : 'white' }}>{item.phase}</div>
                                                <div className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{item.title}</div>
                                                <div className="text-xs text-white/50 mb-2">{item.days}</div>
                                                <div className="text-sm text-white/80">{item.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-0 relative">
                                    {/* Connecting Line for Desktop */}
                                    <div className="absolute left-[-48px] top-0 bottom-0 w-px bg-gray-800 hidden lg:block"></div>

                                    {challengeDays.map((challenge, index) => (
                                        <div key={challenge.day} className="relative group/card">
                                            {/* Desktop Connector */}
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
                                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                                <h3 className="text-xl md:text-2xl font-bold">{challenge.name}</h3>
                                                                {challenge.status === 'completed' && (
                                                                    <span className="text-xs px-2 py-1 border group-hover:border-black/20 whitespace-nowrap transition-colors duration-300" style={{ borderColor: accentColor, color: colorMode ? accentColor : '#28333F' }}>
                                                                        COMPLETED
                                                                    </span>
                                                                )}
                                                                {challenge.status === 'in-progress' && (
                                                                    <span className="text-xs px-2 py-1 border whitespace-nowrap" style={{ borderColor: accentColor, color: colorMode ? accentColor : 'white' }}>
                                                                        IN PROGRESS
                                                                    </span>
                                                                )}
                                                                {challenge.status === 'upcoming' && (
                                                                    <span className="text-xs px-2 py-1 border whitespace-nowrap transition-colors duration-300" style={{ borderColor: accentColor, color: colorMode ? accentColor : '#28333F' }}>
                                                                        UPCOMING
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {challenge.date && (
                                                                <div className="text-xs transition-colors duration-300 group-hover:text-black/60" style={{ color: colorMode ? accentColor : '#28333F' }}>{challenge.date}</div>
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
                                                                        className="flex items-center gap-2 text-sm border px-3 py-1.5 hover:shadow-lg transition-all group/link"
                                                                        style={{
                                                                            borderColor: accentColor,
                                                                            backgroundColor: 'transparent'
                                                                        }}
                                                                    >
                                                                        <Database className="h-4 w-4 transition-transform group-hover/link:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                                                        <span className="text-xs uppercase tracking-wider">{challenge.dataset}</span>
                                                                        <ExternalLink className="h-3 w-3" />
                                                                    </a>
                                                                )}
                                                                {challenge.status === 'upcoming' && (
                                                                    <div className="flex items-center gap-2 text-sm border px-3 py-1.5 opacity-50" style={{ borderColor: accentColor }}>
                                                                        <Database className="h-4 w-4" style={{ color: colorMode ? accentColor : '#28333F' }} />
                                                                        <span className="text-xs uppercase tracking-wider" style={{ color: colorMode ? accentColor : '#28333F' }}>{challenge.dataset}</span>
                                                                    </div>
                                                                )}
                                                                {challenge.githubUrl && (
                                                                    <a
                                                                        href={challenge.githubUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 text-sm border px-3 py-1.5 hover:shadow-lg transition-all group/link"
                                                                        style={{
                                                                            borderColor: accentColor,
                                                                            backgroundColor: 'transparent'
                                                                        }}
                                                                    >
                                                                        <Github className="h-4 w-4 transition-transform group-hover/link:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                                                        <span className="text-xs uppercase tracking-wider">Code</span>
                                                                        <ExternalLink className="h-3 w-3" />
                                                                    </a>
                                                                )}
                                                                {challenge.xUrl && (
                                                                    <a
                                                                        href={challenge.xUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 text-sm border px-3 py-1.5 hover:shadow-lg transition-all group/link"
                                                                        style={{
                                                                            borderColor: accentColor,
                                                                            backgroundColor: 'transparent'
                                                                        }}
                                                                    >
                                                                        <Twitter className="h-4 w-4 transition-transform group-hover/link:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                                                        <span className="text-xs uppercase tracking-wider">Post</span>
                                                                        <ExternalLink className="h-3 w-3" />
                                                                    </a>
                                                                )}
                                                                {challenge.linkedinUrl && (
                                                                    <a
                                                                        href={challenge.linkedinUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 text-sm border px-3 py-1.5 hover:shadow-lg transition-all group/link"
                                                                        style={{
                                                                            borderColor: accentColor,
                                                                            backgroundColor: 'transparent'
                                                                        }}
                                                                    >
                                                                        <Linkedin className="h-4 w-4 transition-transform group-hover/link:scale-110 duration-300" style={{ color: colorMode ? accentColor : 'white' }} />
                                                                        <span className="text-xs uppercase tracking-wider">Post</span>
                                                                        <ExternalLink className="h-3 w-3" />
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
