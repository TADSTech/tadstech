'use client';

import { useState } from 'react';
import { Globe, Loader, AlertCircle } from 'lucide-react';

interface JobInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobInput({ value, onChange }: JobInputProps) {
  const [url, setUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url.trim()) return;
    setIsScraping(true);
    setScrapeError(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        onChange(data.text);
      } else {
        setScrapeError(data.error || 'Failed to scrape');
      }
    } catch {
      setScrapeError('Network error — try pasting manually');
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <div className="card">
      <label className="card__label">Job Description</label>

      <div className="input-row" style={{ marginBottom: 10 }}>
        <input
          className="input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://linkedin.com/jobs/view/..."
          onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
        />
        <button
          className="btn btn--secondary"
          onClick={handleScrape}
          disabled={isScraping || !url.trim()}
        >
          {isScraping ? (
            <>
              <Loader size={16} className="spin" aria-hidden="true" />
              Scraping…
            </>
          ) : (
            <>
              <Globe size={16} aria-hidden="true" />
              Scrape
            </>
          )}
        </button>
      </div>

      {scrapeError && (
        <p style={{ fontSize: '0.75rem', color: 'var(--error)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          <AlertCircle size={14} aria-hidden="true" />
          {scrapeError}
        </p>
      )}

      <textarea
        className="textarea textarea--small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste the job description here..."
      />
    </div>
  );
}
