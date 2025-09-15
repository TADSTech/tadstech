import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faCode,
  faMobile,
  faDatabase,
  faRobot
} from '@fortawesome/free-solid-svg-icons';
import './styles/About.css';

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
    <div className="timeline-item">
      <div className="timeline-marker"></div>
      <div className="timeline-content">
        <div className="timeline-year">{year}</div>
        <h3 className="timeline-title">{title}</h3>
        <p className="timeline-description">{description}</p>
      </div>
    </div>
  );
};

const TechChip: React.FC<TechChipProps> = ({ label }) => {
  return (
    <span className="tech-chip">
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
      <div className="about-container">
        <div className="about-header">
          <div className="about-avatar">
            <div className="avatar-circle">
              <FontAwesomeIcon icon={faUser} className="avatar-icon" />
            </div>
          </div>
          
          <h1 className="about-title">The Average Data Scientist</h1>
          
          <p className="about-description">
            TADSTech is the personal brand of Michael — a mathematics student at the University of Lagos, 
            passionate about solving problems through data and design. With a foundation in 
            Flutter/Dart and a current transition into React and modern web technologies, 
            I focus on building clean, data-driven, and user-friendly solutions.
            </p>

        </div>

        <div className="about-section">
          <h2 className="section-title">Our Story</h2>
          
          <div className="timeline">
            <TimelineItem
            year="2023"
            title="First Lines of Code"
            description="Started with Python and mathematics-driven projects, building a strong base in problem-solving."
            />
            <TimelineItem
            year="2024"
            title="Exploring Mobile Development"
            description="Built several apps with Flutter/Dart, gaining hands-on experience delivering mobile-first solutions."
            />
            <TimelineItem
            year="2025"
            title="Transition into React"
            description="Shifting focus to web development with React, TypeScript, and modern frontend workflows."
            />
            <TimelineItem
            year="2026 and Beyond"
            title="Looking Ahead"
            description="Preparing to contribute to open-source, grow as a data scientist, and explore Rust as a systems hobby."
            />

          </div>
        </div>

        <div className="about-section">
          <h2 className="section-title">Our Expertise</h2>
          
          <div className="expertise-grid">
            <div className="expertise-item">
            <FontAwesomeIcon icon={faCode} className="expertise-icon" />
            <h3>Clean Code</h3>
            <p>Writing clear, maintainable, and well-structured solutions.</p>
            </div>

            <div className="expertise-item">
            <FontAwesomeIcon icon={faMobile} className="expertise-icon" />
            <h3>Cross-Platform</h3>
            <p>Experience with Flutter for mobile and React for the web.</p>
            </div>

            <div className="expertise-item">
            <FontAwesomeIcon icon={faDatabase} className="expertise-icon" />
            <h3>Data Science</h3>
            <p>Turning data into insights with Python, Pandas, and NumPy.</p>
            </div>

            <div className="expertise-item">
            <FontAwesomeIcon icon={faRobot} className="expertise-icon" />
            <h3>AI Curiosity</h3>
            <p>Learning the fundamentals of ML and its practical applications.</p>
            </div>

          </div>
        </div>

        <div className="about-section">
          <h2 className="section-title">Our Stack</h2>
          
          <div className="tech-stack">
            {techStack.map((tech, index) => (
              <TechChip key={index} label={tech} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;