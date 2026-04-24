'use client';

import { useState, useEffect, useCallback } from 'react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function AdModal({ isOpen, onClose, onComplete }: AdModalProps) {
  const [countdown, setCountdown] = useState(15);
  const [adFinished, setAdFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCountdown(15);
      setAdFinished(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setAdFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleClaim = useCallback(() => {
    onComplete();
    onClose();
  }, [onComplete, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={adFinished ? onClose : undefined}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>×</button>
        <h3 className="modal__title">Watch Ad — Earn 5 Coins</h3>
        <p className="modal__desc">
          Watch a short ad to earn 5 coins for free.
        </p>

        {/* Adsterra ad container */}
        <div className="ad-container" id="adsterra-container">
          {/* Adsterra script will be injected here */}
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Ad loading...
          </span>
        </div>

        {!adFinished ? (
          <div className="ad-countdown">
            <div className="ad-countdown__timer">{countdown}</div>
            <div className="ad-countdown__text">seconds remaining</div>
          </div>
        ) : (
          <button className="btn btn--gold btn--full btn--large" onClick={handleClaim}>
            🪙 Claim 5 Coins
          </button>
        )}
      </div>
    </div>
  );
}
