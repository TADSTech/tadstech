import Helmet from 'react-helmet';

const CV: React.FC = () => {
  return (
    <div className="cv-page">
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
      <section className="cv-header">
        <h1 className="cv-title">Michael Tunwashe (TADS)</h1>
        <h2 className="cv-subtitle">SQL & Data Visualization Enthusiast</h2>
        <p className="cv-contact">Email: motrenewed@gmail.com</p>
      </section>
      <section className="cv-summary">
        <h3>Professional Summary</h3>
        <p>
          Data and business intelligence enthusiast with a strong foundation in SQL and Python for data analysis and visualization. Experienced in building dashboards, cleaning and transforming data, and presenting insights using tools like pandas and plotly. Passionate about helping businesses make data-driven decisions. Currently learning more advanced analytics and machine learning techniques.
        </p>
      </section>
      <section className="cv-skills">
        <h3>Technical Skills</h3>
        <ul>
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
      <section className="cv-experience">
        <h3>Experience</h3>
        <div className="cv-job">
          <h4>Freelance Data Analyst & Developer</h4>
          <span>2023 - Present</span>
          <ul>
            <li>Developed dashboards and reports using SQL, Python (pandas, plotly), and Power BI.</li>
            <li>Performed data cleaning, transformation, and visualization for business clients.</li>
            <li>Built web applications to automate data workflows and reporting.</li>
            <li>Exploring more advanced analytics and predictive techniques as part of ongoing learning.</li>
          </ul>
        </div>
        <div className="cv-job">
          <h4>Full-Stack Developer (Personal Projects)</h4>
          <span>2022 - Present</span>
          <ul>
            <li>Created portfolio and project showcase sites using React, TypeScript, and Firebase.</li>
            <li>Integrated REST APIs and implemented responsive UI/UX designs.</li>
            <li>Managed deployment and CI/CD pipelines for web apps.</li>
          </ul>
        </div>
      </section>
      <section className="cv-education">
        <h3>Education</h3>
        <ul>
          <li>BSc Computer Science (in progress) - University of Namibia</li>
          <li>Online courses: SQL, Python, Data Visualization, Business Intelligence, React</li>
        </ul>
      </section>
      <section className="cv-learning">
        <h3>Currently Learning</h3>
        <ul>
          <li>Advanced analytics and machine learning basics</li>
          <li>Business intelligence tools (Power BI, Tableau)</li>
          <li>Cloud engineering fundamentals</li>
        </ul>
      </section>
      <section className="cv-links">
        <h3>Links</h3>
        <ul>
          <li><a href="https://github.com/tadstech" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="mailto:motrenewed@gmail.com">Email</a></li>
        </ul>
      </section>
    </div>
  );
}

export default CV;
