import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import './styles/cv.css';

const CV: React.FC = () => {
  return (
    <div className="cv-section">
      {/* SEO Metadata */}
      <Helmet>
        <title>Michael Tunwashe (TADS) | Data Scientist & Full-Stack Developer</title>
        <meta
          name="description"
          content="Michael Tunwashe (TADS) — Data Scientist, Full-Stack Developer, and Mathematics Major at the University of Lagos. Specializing in machine learning, analytics, and scalable web systems."
        />
        <meta
          name="keywords"
          content="TADS, Michael Tunwashe, Data Scientist, Full Stack Developer, Nigeria, React, Next.js, Machine Learning, Tailwind, Supabase, Python, Kaggle"
        />
        <meta name="author" content="Michael Tunwashe" />
        <meta property="og:title" content="TADS — The Average Data Scientist" />
        <meta
          property="og:description"
          content="Portfolio and CV of Michael Tunwashe (TADS): blending data science, mathematics, and full-stack development."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="cv-container">
        {/* Header */}
        <header className="cv-header" aria-label="Header Section">
          <h1 className="cv-title">
            <span className="bg-highlight">TADS</span> — Michael Tunwashe
          </h1>
          <p className="cv-subtitle">The Average Data Scientist</p>
          <a
            href="/cv/michael-tunwashe-cv.pdf"
            download
            className="cv-download-button"
            aria-label="Download Michael Tunwashe CV"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Download CV
          </a>
        </header>

        {/* About */}
        <article className="cv-section-content" id="about">
          <h2 className="cv-section-title">About Me</h2>
          <p className="cv-section-text">
            I’m <strong>Michael Tunwashe</strong> — widely known as <strong>TADS</strong> — a data scientist and
            full-stack developer blending analytical precision with creative execution. As a mathematics major at the
            University of Lagos, I leverage deep quantitative reasoning to design <strong>data-driven systems</strong>{' '}
            that solve real-world problems. My work philosophy: <em>Consistency and clarity outperform talent</em>.  
            Beyond code, I explore human perspective through <strong>#tadsography</strong>, my visual storytelling brand.
          </p>
        </article>

        {/* Experience */}
        <article className="cv-section-content" id="experience">
          <h2 className="cv-section-title">Experience</h2>

          <div className="cv-experience-item">
            <h3 className="cv-experience-title">Freelance Data Scientist & Developer</h3>
            <p className="cv-experience-duration">2023 – Present</p>
            <ul className="cv-section-text">
              <li>
                Delivered <strong>end-to-end data projects</strong> — from raw data cleaning to model deployment —
                increasing client insights and operational efficiency.
              </li>
              <li>
                Built and deployed <strong>ML-powered web apps</strong> using React, Next.js, Tailwind, and Supabase.
              </li>
              <li>
                Created data visualization dashboards improving client decision-making speed by up to{' '}
                <strong>30%</strong>.
              </li>
              <li>
                Designed REST APIs and full-stack workflows integrating analytics into production systems.
              </li>
            </ul>
          </div>
        </article>

        {/* Projects */}
        <article className="cv-section-content" id="projects">
          <h2 className="cv-section-title">Key Projects</h2>

          <div className="cv-project-item">
            <h3 className="cv-project-title">FocusForge</h3>
            <p className="cv-section-text">
              A productivity and focus management platform built with <strong>Next.js</strong>,{' '}
              <strong>TailwindCSS</strong>, <strong>MUI</strong>, and <strong>Supabase</strong>. Enables structured time
              tracking, personalized goals, and data-backed productivity analytics.
            </p>
          </div>

          <div className="cv-project-item">
            <h3 className="cv-project-title">Kaggle & Data Analytics</h3>
            <p className="cv-section-text">
              Actively developing advanced data workflows — conducting <strong>exploratory data analysis</strong>,
              cleaning large datasets, and training ML models for finance, HR, and research applications. Ranked among
              consistent contributors on Kaggle’s public datasets.
            </p>
          </div>
        </article>

        {/* Skills */}
        <article className="cv-section-content" id="skills">
          <h2 className="cv-section-title">Skills</h2>
          <ul className="cv-skills-list">
            <li>
              <strong>Data & Analytics:</strong> EDA, feature engineering, data visualization, and quantitative finance
            </li>
            <li>
              <strong>Machine Learning:</strong> Python, Pandas, NumPy, scikit-learn, Matplotlib, and applied statistics
            </li>
            <li>
              <strong>Development:</strong> JavaScript/TypeScript, React, Next.js, TailwindCSS, Supabase, Node.js
            </li>
            <li>
              <strong>Core Strengths:</strong> Analytical problem-solving, clean design systems, and cross-platform
              development
            </li>
          </ul>
        </article>

        {/* Contact */}
        <article className="cv-section-content" id="contact">
          <h2 className="cv-section-title">Contact</h2>
          <p className="cv-section-text">
            Open to collaborations, freelance opportunities, and data partnerships.
          </p>
          <p className="cv-section-text">
            Email: <a href="mailto:motrenewed@gmail.com" className="cv-link">motrenewed@gmail.com</a>
          </p>
          <p className="cv-section-text">
            Connect:{" "}
            <a href="https://linkedin.com/in/tadstech" className="cv-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>{" "}
            |{" "}
            <a href="https://twitter.com/tads_tech" className="cv-link" target="_blank" rel="noopener noreferrer">
              X (Twitter)
            </a>{" "}
            |{" "}
            <a href="https://instagram.com/tadstech" className="cv-link" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
        </article>
      </div>
    </div>
  );
};

export default CV;
