import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faCodeBranch, 
  faCircle,
  faSearch,
  faExternalLinkAlt,
  faUsers
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
    fetchGitHubRepos();
  }, []);

  useEffect(() => {
    filterAndSortRepos();
  }, [repos, searchTerm, sortBy]);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.github.com/users/tadstech/repos?sort=updated&per_page=100');
      
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

  const filterAndSortRepos = () => {
    const filtered = repos.filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (repo.language && repo.language.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort repositories
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
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Updated today';
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) return `Updated ${Math.ceil(diffDays / 7)} weeks ago`;
    return `Updated ${Math.ceil(diffDays / 30)} months ago`;
  };

  const openRepoInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="github-page">
        <div className="github-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading repositories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-page">
        <div className="github-container">
          <div className="error-message">
            <h2>Error Loading Repositories</h2>
            <p>{error}</p>
            <button onClick={fetchGitHubRepos} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="github-page">
      <div className="github-container">
        <div className="github-header">
          <h1>Open Source Data Science Tools and Web apps</h1>
          <p>
            Explore our collection of production-ready data science tools, web apps, and libraries. 
            All projects are MIT licensed and community-supported.
          </p>
        </div>

        <div className="github-controls">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-container">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars' | 'name')}
              className="sort-select"
            >
              <option value="updated">Last Updated</option>
              <option value="stars">Stars</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="repos-info">
          <span className="repo-count">{filteredRepos.length} repositories</span>
          <span className="view-hint">Click any card to view on GitHub</span>
        </div>

        <div className="repos-grid">
          {filteredRepos.length === 0 ? (
            <div className="no-results">
              <h3>No repositories found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          ) : (
            filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="repo-card"
                onClick={() => openRepoInNewTab(repo.html_url)}
              >
                <div className="repo-header">
                  <h3 className="repo-name">{repo.name}</h3>
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="external-icon" />
                </div>
                
                <p className="repo-description">
                  {repo.description || 'No description provided'}
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

                <div className="repo-footer">
                  <span className="update-time">{formatDate(repo.updated_at)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="contribution-section">
          <div className="contribution-header">
            <FontAwesomeIcon icon={faUsers} className="contribution-icon" />
            <h2>Want to contribute?</h2>
          </div>
          
          <p>
            We welcome contributions! All our projects are open source and 
            community maintained. Check the README in each repository for 
            contribution guidelines.
          </p>

          <button
            onClick={() => openRepoInNewTab('https://github.com/tadstech')}
            className="github-button"
          >
            View on GitHub
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GitHubPage;