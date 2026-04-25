'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Coins, ShieldOff } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

/**
 * Detect adblockers by injecting a bait element with ad-like class names
 * and checking if it gets hidden/zeroed by the blocker's CSS rules.
 * Falls back to a fetch-based check against a known ad domain.
 */
async function detectAdBlocker(): Promise<boolean> {
  // Method 1: bait element — adblockers inject CSS that hides elements with
  // class names like "ad-banner", "adsbox", "doubleclick" etc.
  return new Promise((resolve) => {
    const bait = document.createElement('div');
    bait.className = 'ad-banner ads adsbox doubleclick ad-placement';
    bait.style.cssText = 'width:1px;height:1px;position:absolute;left:-9999px;top:-9999px;';
    document.body.appendChild(bait);

    // Give the blocker a tick to apply its CSS
    requestAnimationFrame(() => {
      const blocked =
        bait.offsetHeight === 0 ||
        bait.offsetWidth === 0 ||
        bait.style.display === 'none' ||
        bait.style.visibility === 'hidden' ||
        getComputedStyle(bait).display === 'none' ||
        getComputedStyle(bait).visibility === 'hidden';

      document.body.removeChild(bait);

      if (blocked) {
        resolve(true);
        return;
      }

      // Method 2: fetch bait — try to load a known ad script URL
      // Most adblockers block requests to doubleclick.net
      fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      })
        .then(() => resolve(false))   // request went through — no blocker
        .catch(() => resolve(true));  // blocked
    });
  });
}

export default function AdModal({ isOpen, onClose, onComplete }: AdModalProps) {
  const [countdown, setCountdown] = useState(15);
  const [adFinished, setAdFinished] = useState(false);
  const [adBlocked, setAdBlocked] = useState<boolean | null>(null); // null = checking
  const checkedRef = useRef(false);

  // Run adblocker check once when modal opens
  useEffect(() => {
    if (!isOpen) {
      setCountdown(15);
      setAdFinished(false);
      // Reset check so it runs again next open
      checkedRef.current = false;
      setAdBlocked(null);
      return;
    }

    if (checkedRef.current) return;
    checkedRef.current = true;

    detectAdBlocker().then((blocked) => {
      setAdBlocked(blocked);
    });
  }, [isOpen]);

  // Only start countdown if no adblocker detected
  useEffect(() => {
    if (!isOpen || adBlocked !== false) return;

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
  }, [isOpen, adBlocked]);

  const handleClaim = useCallback(() => {
    onComplete();
    onClose();
  }, [onComplete, onClose]);

  if (!isOpen) return null;

  // ── Adblocker detected ────────────────────────────────────────
  if (adBlocked === true) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal__close" onClick={onClose} type="button" aria-label="Close">
            <X size={18} aria-hidden="true" />
          </button>

          <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
            <ShieldOff
              size={40}
              aria-hidden="true"
              style={{ color: 'var(--error)', marginBottom: 12 }}
            />
            <h3 className="modal__title">Adblocker Detected</h3>
            <p className="modal__desc" style={{ marginBottom: 16 }}>
              We detected an adblocker on your browser. Watching ads is how you earn free coins — the ad needs to load for the reward to count.
            </p>

            <div style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '14px 16px',
              textAlign: 'left',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              marginBottom: 20,
              lineHeight: 1.6,
            }}>
              <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 6 }}>
                To earn coins with ads:
              </strong>
              <ol style={{ paddingLeft: 18, margin: 0 }}>
                <li>Disable your adblocker for <strong>tairesume.tadstech.dev</strong></li>
                <li>Or add this site to your adblocker&apos;s whitelist / allowlist</li>
                <li>Reload the page and try again</li>
              </ol>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              Alternatively, you can buy a coin pack — no ads required.
            </p>

            <button className="btn btn--secondary btn--full" onClick={onClose} type="button">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Checking (brief flash, usually instant) ───────────────────
  if (adBlocked === null) {
    return (
      <div className="modal-overlay">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div className="spinner" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Checking ad availability…</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Normal ad flow ────────────────────────────────────────────
  return (
    <div className="modal-overlay" onClick={adFinished ? onClose : undefined}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} type="button">
          <X size={18} aria-hidden="true" />
        </button>
        <h3 className="modal__title">Watch Ad — Earn 1 Coin</h3>
        <p className="modal__desc">
          Watch a short ad to earn 1 coin for free.
        </p>

        {/* Adsterra ad container */}
        <div className="ad-container" id="adsterra-container">
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Ad loading...
          </span>
        </div>

        {!adFinished && (
          <div className="ad-countdown">
            <div className="ad-countdown__timer">{countdown}</div>
            <div className="ad-countdown__text">seconds remaining</div>
          </div>
        )}

        <button
          className={`btn btn--gold btn--full btn--large ${adFinished ? 'claim-btn--visible' : 'claim-btn--hidden'}`}
          onClick={handleClaim}
          type="button"
        >
          <Coins size={16} aria-hidden="true" /> Claim 1 Coin
        </button>
      </div>
    </div>
  );
}
