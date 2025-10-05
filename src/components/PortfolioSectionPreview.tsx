import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import './portfoliopreviewsection.css';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  html_url: string;
}

const PortfolioPreviewSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.github.com/users/tadstech/repos?sort=updated&per_page=6');
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data: GitHubRepo[] = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      console.error('Error fetching GitHub repos:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <section className="portfolio-preview-section" id="portfolio-preview">
        <div className="portfolio-preview-container">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="portfolio-preview-section" id="portfolio-preview">
        <div className="portfolio-preview-container">
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-preview-section" id="portfolio-preview">

      <div className="portfolio-preview-container">
        <h2 className="portfolio-preview-title">Latest Projects</h2>
        <p className="portfolio-preview-description">
          Discover my recent open-source contributions on GitHub, spanning data science, full-stack development, and innovative solutions.
        </p>
        
        <div className="projects-grid">
          {repos.map((repo) => (
            <article
              key={repo.id}
              className="project-card"
              onClick={() => window.open(repo.html_url, '_blank')}
              aria-label={`View ${repo.name} project`}
            >
              <div className="project-content">
                <h3 className="project-title">{repo.name}</h3>
                <p className="project-description">
                  {repo.description || 'Innovative project in development'}
                </p>
                {repo.language && (
                  <span className="project-category">{repo.language}</span>
                )}
                <div className="project-stats">
                  <div className="stat">
                    <FontAwesomeIcon icon={faStar} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="stat">
                    <FontAwesomeIcon icon={faCodeBranch} />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
                <div className="project-footer">
                  <span className="update-time">Updated {formatDate(repo.updated_at)}</span>
                </div>
              </div>
              <div className="project-arrow">→</div>
            </article>
          ))}
        </div>

        <a
          href="/github"
          className="more-projects-btn"
          aria-label="View More Projects"
        >
          View More Projects
          <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
        </a>
      </div>
    </section>
  );
};

export default PortfolioPreviewSection;