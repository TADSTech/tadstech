import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCodeBranch,
  faCircle,
  faSearch,
  faExternalLinkAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import './styles/GitHubPage.css';
import Footer from '../components/Footer.tsx';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  html_url: string;
  topics?: string[];
}

const GitHubPage: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');

  useEffect(() => {
    document.title =
      'TADS - Open Source Developer | Data Science & Full-Stack Engineering';
    fetchGitHubRepos();
  }, []);

  useEffect(() => {
    filterAndSortRepos();
  }, [repos, searchTerm, sortBy]);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.github.com/users/tadstech/repos?sort=updated&per_page=100'
      );
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

      const data: GitHubRepo[] = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortRepos = () => {
    const filtered = repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (repo.language &&
          repo.language.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    setFilteredRepos(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 1) return 'Updated today';
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) return `Updated ${Math.ceil(diffDays / 7)} weeks ago`;
    return `Updated ${Math.ceil(diffDays / 30)} months ago`;
  };

  const openRepo = (url: string) => window.open(url, '_blank');

  if (loading)
    return (
      <div className="github-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Fetching repositories from GitHub...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="github-page">
        <div className="error-message">
          <h2>Unable to load repositories</h2>
          <p>{error}</p>
          <button onClick={fetchGitHubRepos} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="github-page">
      <header className="github-header">
        <h1>TADS - Open Source Projects</h1>
        <p>
          A curated portfolio of data-driven web apps, AI pipelines, and full-stack tools
          built with modern technologies like <strong>React</strong>,{' '}
          <strong>Python</strong>, and <strong>Next.js</strong>. Every repository reflects
          a passion for building elegant, scalable solutions.
        </p>
      </header>

      <section className="github-controls" aria-label="Repository Search and Sorting">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search repositories"
          />
        </div>

        <div className="sort-container">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e) => setSortBy(e.target.value as any)}
            className="sort-select"
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Starred</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </section>

      <section className="repos-overview">
        <h2>Featured Open Source Work</h2>
        <p>
          Explore {filteredRepos.length} repositories showcasing my contributions to the
          open-source ecosystem. Click a card to view its code, documentation, and live
          demo links directly on GitHub.
        </p>
      </section>

      <section className="repos-grid">
        {filteredRepos.length === 0 ? (
          <div className="no-results">
            <h3>No repositories found</h3>
            <p>Try adjusting your search filters or sorting preferences.</p>
          </div>
        ) : (
          filteredRepos.map((repo) => (
            <article
              key={repo.id}
              className="repo-card"
              onClick={() => openRepo(repo.html_url)}
              aria-label={`Open ${repo.name} repository on GitHub`}
            >
              <div className="repo-header">
                <h3 className="repo-name">{repo.name}</h3>
                <FontAwesomeIcon icon={faExternalLinkAlt} className="external-icon" />
              </div>

              <p className="repo-description">
                {repo.description || 'No description available for this repository.'}
              </p>

              {repo.language && (
                <div className="repo-language">
                  <FontAwesomeIcon icon={faCircle} className="language-icon" />
                  <span>{repo.language}</span>
                </div>
              )}

              <div className="repo-stats">
                <div className="stat">
                  <FontAwesomeIcon icon={faStar} />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="stat">
                  <FontAwesomeIcon icon={faCodeBranch} />
                  <span>{repo.forks_count}</span>
                </div>
              </div>

              <footer className="repo-footer">
                <span className="update-time">{formatDate(repo.updated_at)}</span>
              </footer>
            </article>
          ))
        )}
      </section>

      <section className="contribution-section">
        <div className="contribution-header">
          <FontAwesomeIcon icon={faUsers} className="contribution-icon" />
          <h2>Collaborate or Contribute</h2>
        </div>
        <p>
          All repositories under <strong>@tadstech</strong> are open source and actively
          maintained. Contributions, pull requests, and discussions are welcome. Check
          each README file for contribution guidelines.
        </p>

        <button
          onClick={() => openRepo('https://github.com/tadstech')}
          className="github-button"
          aria-label="Visit TADS GitHub Profile"
        >
          Visit My GitHub
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default GitHubPage;
