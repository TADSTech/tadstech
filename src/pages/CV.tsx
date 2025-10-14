
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine, faDatabase, faCode, faRobot } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import './styles/cv.css';


const techStack = [
  'React', 'TypeScript', 'Python', 'SQL', 'Pandas', 'Plotly', 'TailwindCSS', 'Git', 'Firebase'
];

const timeline = [
  {
    year: '2023',
    title: 'SQL & Python Foundations',
    description: 'Started with SQL and Python, building dashboards and cleaning data for academic and freelance projects.'
  },
  {
    year: '2024',
    title: 'Business Intelligence & Data Viz',
    description: 'Created interactive reports and visualizations using Power BI, Tableau, and Plotly.'
  },
  {
    year: '2025',
    title: 'Full-Stack & Cloud',
    description: 'Developed web apps with React, TypeScript, and Firebase, integrating data workflows.'
  }
];

const expertise = [
  {
    icon: faChartLine,
    title: 'Data Visualization',
    desc: 'Presenting insights with beautiful, interactive charts and dashboards.'
  },
  {
    icon: faDatabase,
    title: 'SQL & Data Engineering',
    desc: 'Transforming and querying data for business intelligence.'
  },
  {
    icon: faCode,
    title: 'Clean Code',
    desc: 'Writing maintainable, scalable code for web and data apps.'
  },
  {
    icon: faRobot,
    title: 'Learning ML',
    desc: 'Exploring machine learning basics and analytics.'
  }
];

const CV: React.FC = () => {
  return (
    <section className="cv-section">
      <div className="cv-container">
        <Helmet>
          <title>CV | Michael Tunwashe (TADS)</title>
          <meta name="description" content="Curriculum Vitae for Michael Tunwashe (TADS) - SQL, Business Intelligence, Data Visualization, Python, React." />
          <meta name="keywords" content="CV, Resume, SQL, Business Intelligence, Data Visualization, Python, pandas, plotly, React, Full-Stack" />
          <meta property="og:title" content="CV | Michael Tunwashe (TADS)" />
          <meta property="og:description" content="Curriculum Vitae for Michael Tunwashe (TADS) - SQL, Business Intelligence, Data Visualization, Python, React." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://tadstech.web.app/cv" />
          <meta property="og:image" content="/assets/images/profile.jpg" />
          <meta name="author" content="Michael Tunwashe" />
        </Helmet>
        <header className="cv-header">
          <div className="about-avatar" style={{ marginBottom: '1.5rem' }}>
            <div className="avatar-circle">
              <FontAwesomeIcon icon={faUser} className="avatar-icon" aria-hidden="true" />
            </div>
          </div>
          <h1 className="cv-title">Michael Tunwashe (TADS)</h1>
          <h2 className="cv-subtitle bg-highlight">Data Analyst & Full-Stack Developer</h2>
          <p className="cv-contact">Email: motrenewed@gmail.com</p>
          <a
            className="cv-download-button"
            href="/cv/michael-tunwashe-cv.pdf"
            download
            aria-label="Download CV PDF"
          >
            Download CV
          </a>
        </header>

        <section className="cv-section-content">
          <h3 className="cv-section-title">Professional Summary</h3>
          <p className="cv-section-text">
            Data and business intelligence enthusiast with a strong foundation in SQL and Python for data analysis and visualization. Experienced in building dashboards, cleaning and transforming data, and presenting insights using tools like pandas and plotly. Passionate about helping businesses make data-driven decisions. Currently learning more advanced analytics and machine learning techniques.
          </p>
        </section>

        <section className="cv-section-content">
          <h3 className="cv-section-title">Core Expertise</h3>
          <div className="expertise-grid">
            {expertise.map((item, idx) => (
              <div className="expertise-item" key={idx}>
                <FontAwesomeIcon icon={item.icon} className="expertise-icon" aria-hidden="true" />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section-content">
          <h3 className="cv-section-title">Timeline</h3>
          <div className="timeline">
            {timeline.map((item, idx) => (
              <article className="timeline-item" key={idx} aria-label={`Timeline: ${item.title}`}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section-content">
          <h3 className="cv-section-title">Technical Skills</h3>
          <ul className="cv-skills-list">
            <li>SQL (PostgreSQL, MySQL, SQLite)</li>
            <li>Python (pandas, plotly, matplotlib, seaborn)</li>
            <li>Business Intelligence (Power BI, Tableau basics)</li>
            <li>Data Cleaning & Transformation</li>
            <li>Data Visualization (plotly, matplotlib, seaborn)</li>
            <li>Full-Stack Development (React, TypeScript, Node.js, Express)</li>
            <li>Version Control (Git, GitHub)</li>
            <li>Cloud (Firebase basics)</li>
          </ul>
        </section>

        <section className="cv-section-content">
          <h3 className="cv-section-title">Tech Stack</h3>
          <div className="tech-stack">
            {techStack.map((tech, idx) => (
              <span className="tech-chip" key={idx}>{tech}</span>
            ))}
          </div>
        </section>

        <section className="cv-section-content">
          <h3 className="cv-section-title">Experience</h3>
          <div className="cv-experience-item">
            <div className="cv-experience-title">Freelance Data Analyst & Developer</div>
            <div className="cv-experience-duration">2023 - Present</div>
            <ul>
              <li>Developed dashboards and reports using SQL, Python (pandas, plotly), and Power BI.</li>
              <li>Performed data cleaning, transformation, and visualization for business clients.</li>
              <li>Built web applications to automate data workflows and reporting.</li>
              <li>Exploring more advanced analytics and predictive techniques as part of ongoing learning.</li>
            </ul>
          </div>
          <div className="cv-experience-item">
            <div className="cv-experience-title">Full-Stack Developer (Personal Projects)</div>
            <div className="cv-experience-duration">2022 - Present</div>
            <ul>
              <li>Created portfolio and project showcase sites using React, TypeScript, and Firebase.</li>
              <li>Integrated REST APIs and implemented responsive UI/UX designs.</li>
            </ul>
          </div>
        </section>

        <section className="cv-section-content">
          <h3 className="cv-section-title">Education</h3>
          <ul>
            <li>BSc Mathematics (in progress) - University of Lagos</li>
            <li>Online courses: SQL, Python, Data Visualization, Business Intelligence, React</li>
          </ul>
        </section>

        <section className="cv-section-content">
          <h3 className="cv-section-title">Currently Learning</h3>
          <ul>
            <li>Advanced analytics and machine learning basics</li>
            <li>Full stack web app development</li>
            <li>Cloud engineering fundamentals</li>
          </ul>
        </section>

        <section className="cv-section-content">
          <h3 className="cv-section-title">Links</h3>
          <ul>
            <li><a className="cv-link" href="https://github.com/tadstech" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a className="cv-link" href="mailto:motrenewed@gmail.com">Email</a></li>
          </ul>
        </section>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="/contact" className="cv-download-button" aria-label="Contact TADS">Let's Work Together</a>
        </div>
      </div>
    </section>
  );
}

export default CV;
