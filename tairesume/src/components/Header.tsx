'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Coins, Sun, Moon, User } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onOpenProfile?: () => void;
}

export default function Header({ onOpenProfile }: HeaderProps) {
  const { user, coins, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ||
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'User';

  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className="header">
      <div className="header__left">
        <Link href="/" className="header__back">
          <ArrowLeft size={16} aria-hidden="true" />
          back to home
        </Link>
        <div className="header__brand">
          Tai<span>Resume</span>
        </div>
      </div>

      <div className="header__right">
        {!loading && user && (
          <div className="coin-balance">
            <Coins size={16} aria-hidden="true" className="coin-balance__icon" />
            <span>{coins}</span>
          </div>
        )}

        {!loading && user && onOpenProfile && (
          <button
            className="btn btn--ghost"
            onClick={onOpenProfile}
            aria-label="Open profile manager"
            title="My Profile"
            type="button"
          >
            <User size={16} aria-hidden="true" />
            <span style={{ fontSize: '0.82rem' }}>Profile</span>
          </button>
        )}

        {/* Only render theme toggle after mount to avoid hydration mismatch */}
        {mounted && (
          <button
            className="btn btn--ghost theme-toggle"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            type="button"
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        )}

        {loading ? (
          <div className="auth-btn" style={{ opacity: 0.5 }}>
            <div className="spinner" />
          </div>
        ) : user ? (
          <button className="auth-btn" onClick={logout} title="Sign out">
            <span>{displayName.split(' ')[0]}</span>
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
