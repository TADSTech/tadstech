import React from 'react';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCode, faMobile, faDatabase, faRobot } from '@fortawesome/free-solid-svg-icons';
import './styles/About.css';
import Footer from '../components/Footer';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
}

interface TechChipProps {
  label: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description }) => {
  return (
    <article className="timeline-item" aria-label={`Timeline: ${title}`}>
      <div className="timeline-marker"></div>
      <div className="timeline-content">
        <div className="timeline-year">{year}</div>
        <h3 className="timeline-title">{title}</h3>
        <p className="timeline-description">{description}</p>
      </div>
    </article>
  );
};

const TechChip: React.FC<TechChipProps> = ({ label }) => {
  return (
    <span className="tech-chip" aria-label={`Technology: ${label}`}>
      {label}
    </span>
  );
};

const About: React.FC = () => {
  const techStack = [
    'React', 'TypeScript', 'JavaScript', 'Python',
    'Flutter', 'Dart', 'Git', 'SQL',
    'Pandas', 'NumPy', 'TailwindCSS'
  ];

  return (
    <div className="about-page">
      <Helmet>
        <title>About TADS | Michael Tunwashe - Data Scientist & Developer</title>
        <meta
          name="description"
          content="Learn about Michael Tunwashe, the data scientist and full-stack developer behind TADS. Specializing in React, Flutter, and data-driven solutions."
        />
        <meta
          name="keywords"
          content="TADS, Michael Tunwashe, data scientist, full-stack developer, React, Flutter, Python, Nigeria, machine learning, web development"
        />
        <meta name="author" content="Michael Tunwashe" />
        <meta property="og:title" content="About TADS - Michael Tunwashe" />
        <meta
          property="og:description"
          content="Discover Michael Tunwashe's journey in data science and full-stack development, building innovative solutions with React, Flutter, and Python."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://tadstech.com/about" />
      </Helmet>

      <div className="about-container">
        <div className="about-header">
          <div className="about-avatar">
            <div className="avatar-circle">
              <FontAwesomeIcon icon={faUser} className="avatar-icon" aria-hidden="true" />
            </div>
          </div>
          
          <h1 className="about-title">Michael Tunwashe</h1>
          
          <p className="about-description">
            As the mind behind TADSTech, I'm a mathematics student at the University of Lagos, blending data science and full-stack development to craft innovative solutions. Specializing in React and Flutter, I deliver scalable, user-focused applications backed by data-driven insights. My mission? Solve complex problems with clean code and creative design.
          </p>
          <a href="/contact" className="about-cta" aria-label="Contact TADS">Get in Touch</a>
        </div>

        <section className="about-section">
          <h2 className="section-title">My Journey</h2>
          
          <div className="timeline">
            <TimelineItem
              year="2023"
              title="Python & Data Science Beginnings"
              description="Kicked off with Python, building data visualization tools and statistical models for academic projects."
            />
            <TimelineItem
              year="2024"
              title="Mobile App Development"
              description="Developed cross-platform apps with Flutter, including a task management app used by 100+ local users."
            />
            <TimelineItem
              year="2025"
              title="Mastering React & Web"
              description="Transitioned to React and TypeScript, launching responsive web apps with modern workflows."
            />
            <TimelineItem
              year="2026+"
              title="Future Vision"
              description="Aiming to contribute to open-source AI tools and explore Rust for high-performance systems."
            />
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">Core Expertise</h2>
          
          <div className="expertise-grid">
            <div className="expertise-item">
              <FontAwesomeIcon icon={faCode} className="expertise-icon" aria-hidden="true" />
              <h3>Clean Code</h3>
              <p>Delivering modular, maintainable code for scalable applications.</p>
            </div>
            <div className="expertise-item">
              <FontAwesomeIcon icon={faMobile} className="expertise-icon" aria-hidden="true" />
              <h3>Cross-Platform Apps</h3>
              <p>Building seamless experiences for web, iOS, and Android with React and Flutter.</p>
            </div>
            <div className="expertise-item">
              <FontAwesomeIcon icon={faDatabase} className="expertise-icon" aria-hidden="true" />
              <h3>Data Science</h3>
              <p>Transforming raw data into actionable insights using Python and SQL.</p>
            </div>
            <div className="expertise-item">
              <FontAwesomeIcon icon={faRobot} className="expertise-icon" aria-hidden="true" />
              <h3>Machine Learning</h3>
              <p>Applying ML models to solve real-world problems with precision.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">Tech Stack</h2>
          <p className="tech-stack-description">
            A curated set of tools to build robust, modern applications.
          </p>
          <div className="tech-stack">
            {techStack.map((tech, index) => (
              <TechChip key={index} label={tech} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;