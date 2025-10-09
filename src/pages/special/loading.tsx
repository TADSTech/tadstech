import React, { useEffect, useState } from 'react';

type LoadingProps = {
  /** Message to display under the spinner */
  message?: string;
  /** Optional CSS class for wrapper */
  className?: string;
  /** Spinner size in pixels (width/height) */
  size?: number;
  /** If provided, the component will stay visible until this promise resolves. */
  until?: Promise<unknown>;
  /** Called when the component auto-hides after `until` resolves. */
  onFinish?: () => void;
  /** Whether to show only text (no spinner) */
  textOnly?: boolean;
};

export default function Loading({
  message = 'Loading...',
  className = '',
  size = 64,
  until,
  onFinish,
  textOnly = false,
}: LoadingProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (until) {
      (async () => {
        try {
          await until;
        } catch (err) {
            console.error('Loading: Error while waiting for "until" promise:', err);
          // swallow - caller can handle errors via their promise
        }
        if (!cancelled) {
          setVisible(false);
          onFinish?.();
        }
      })();
    }
    return () => {
      cancelled = true;
    };
  }, [until, onFinish]);

  if (!visible) return null;

  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: textOnly ? 'none' : 'inline-block',
    border: `${Math.max(2, Math.round(size * 0.09))}px solid rgba(0,0,0,0.08)`,
    borderTop: `${Math.max(2, Math.round(size * 0.09))}px solid var(--color-secondary, #3B82F6)`,
    animation: 'loading-spin 0.9s linear infinite',
    color: 'transparent',
    overflow: 'hidden',
  };

  return (
    <div
      className={`loading-root ${className}`}
      role="status"
      aria-live="polite"
      aria-busy={visible}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
    >
      <div className="loading-spinner" style={spinnerStyle} aria-hidden="true" />
      <div
        className="loading-text"
        style={{ fontSize: 16, color: 'var(--loading-text, #374151)', textAlign: 'center' }}
      >
        {message}
      </div>
    </div>
  );
}

// local keyframe injection so the component works without extra CSS imports
const style = document.createElement('style');
style.innerHTML = `@keyframes loading-spin { to { transform: rotate(360deg); } }`;
if (!document.head.querySelector('style[data-loading-keyframes]')) {
  style.setAttribute('data-loading-keyframes', '');
  document.head.appendChild(style);
}
