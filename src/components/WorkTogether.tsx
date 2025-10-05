import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './worktogether.css';

const WorkTogether: React.FC = () => {
  return (
    <section
      className="work-together-section"
      id="contact"
      aria-labelledby="work-together-title"
    >
      <div className="work-together-container">
        <div className="work-together-content">
          <h2 className="work-together-title" id="work-together-title">
            Let’s Build Something <span className="bg-highlight">Data-Driven</span>
          </h2>
          <p className="work-together-description">
            Have an idea that needs technical precision and creative execution?
            I'm open to discussing new projects and collaborations.
          </p>
          <a
            href="mailto:motrenewed@gmail.com?subject=Let's%20Collaborate%20(TADS)"
            className="work-together-button"
            aria-label="Email TADS (Michael Tunwashe) to start a project"
          >
            Let’s Work Together
            <FontAwesomeIcon icon={faArrowRight} className="ml-10 pl-3.5" />
          </a>
        </div>
      </div>

      {/* Light SEO metadata */}
      <meta
        name="description"
        content="Collaborate with Michael Tunwashe (TADS) — a data scientist and full-stack developer skilled in Python, React, and machine learning. Build data-driven solutions with impact."
      />
      <meta
        name="keywords"
        content="TADS, Michael Tunwashe, data scientist, full-stack developer, React, Next.js, Python, machine learning, data analytics, Lagos"
      />
    </section>
  );
};

export default WorkTogether;
