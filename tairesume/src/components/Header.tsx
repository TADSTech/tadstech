'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { user, coins, loading, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__left">
        <Link href="/" className="header__back">
          ← back to home
        </Link>
        <div className="header__brand">
          Tai<span>Resume</span>
        </div>
      </div>

      <div className="header__right">
        {!loading && user && (
          <div className="coin-balance">
            <span className="coin-balance__icon">🪙</span>
            <span>{coins}</span>
          </div>
        )}

        {loading ? (
          <div className="auth-btn" style={{ opacity: 0.5 }}>
            <div className="spinner" />
          </div>
        ) : user ? (
          <button className="auth-btn" onClick={logout} title="Sign out">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt=""
                className="auth-btn__avatar"
                referrerPolicy="no-referrer"
                width={24}
                height={24}
                unoptimized
              />
            )}
            <span>{user.displayName?.split(' ')[0] || 'User'}</span>
          </button>
        ) : (
          <button className="auth-btn auth-btn--signin" onClick={() => setIsAuthOpen(true)}>
            Sign in
          </button>
        )}
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
