'use client';

import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { user, coins, loading, signInWithGoogle, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__left">
        <a href="https://tadstech.dev" className="header__back" target="_blank" rel="noopener">
          ← tadstech.dev
        </a>
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
              <img src={user.photoURL} alt="" className="auth-btn__avatar" referrerPolicy="no-referrer" />
            )}
            <span>{user.displayName?.split(' ')[0] || 'User'}</span>
          </button>
        ) : (
          <button className="auth-btn auth-btn--signin" onClick={signInWithGoogle}>
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
