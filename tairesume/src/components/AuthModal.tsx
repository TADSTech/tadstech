'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PasswordRules {
  uppercase: boolean;
  lowercase: boolean;
  special: boolean;
  numeric: boolean;
}

function validatePassword(password: string): PasswordRules {
  return {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    numeric: /[0-9]/.test(password),
  };
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; kind: 'info' | 'error' } | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const passwordRules = useMemo(() => validatePassword(password), [password]);
  const allPasswordRulesMet = Object.values(passwordRules).every(Boolean);

  if (!isOpen) return null;

  const resetMessage = () => setMessage(null);

  const switchMode = (next: 'signin' | 'signup' | 'forgot') => {
    setMode(next);
    resetMessage();
  };

  // ── Forgot password ──────────────────────────────────────────
  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw new Error(error.message);
      setResetSent(true);
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : 'Something went wrong.', kind: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // ── Sign in / Sign up ─────────────────────────────────────────
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === 'signup') {
        if (!allPasswordRulesMet) {
          setMessage({ text: 'Please satisfy all password requirements before signing up.', kind: 'error' });
          setLoading(false);
          return;
        }
        const { needsConfirmation } = await signUpWithEmail(email, password, name.trim() || null);
        if (needsConfirmation) {
          setConfirmed(true);
        } else {
          onClose();
        }
      } else {
        await signInWithEmail(email, password);
        onClose();
      }
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : 'Authentication failed.', kind: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // ── Screens ───────────────────────────────────────────────────

  // Post-signup: check your inbox
  if (confirmed) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal modal--auth" onClick={(e) => e.stopPropagation()}>
          <button className="modal__close" onClick={onClose} type="button">×</button>
          <h3 className="modal__title">Check your inbox</h3>
          <p className="modal__desc">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate
            your account and unlock your 5 free coins.
          </p>
          <button
            className="btn btn--secondary btn--full"
            type="button"
            onClick={() => { setConfirmed(false); setMode('signin'); setPassword(''); resetMessage(); }}
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  // Post-forgot: reset link sent
  if (resetSent) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal modal--auth" onClick={(e) => e.stopPropagation()}>
          <button className="modal__close" onClick={onClose} type="button">×</button>
          <h3 className="modal__title">Reset link sent</h3>
          <p className="modal__desc">
            Check <strong>{email}</strong> for a password reset link. It expires in 1 hour.
          </p>
          <button
            className="btn btn--secondary btn--full"
            type="button"
            onClick={() => { setResetSent(false); setMode('signin'); resetMessage(); }}
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  // Forgot password form
  if (mode === 'forgot') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal modal--auth" onClick={(e) => e.stopPropagation()}>
          <button className="modal__close" onClick={onClose} type="button">×</button>
          <h3 className="modal__title">Forgot your password?</h3>
          <p className="modal__desc">
            Enter your email and we'll send you a link to choose a new one.
          </p>

          <form className="auth-form" onSubmit={handleForgotPassword}>
            <label className="auth-form__field">
              <span>Email</span>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            {message && (
              <p className={`auth-form__message${message.kind === 'error' ? ' auth-form__message--error' : ''}`}>
                {message.text}
              </p>
            )}

            <button className="btn btn--primary btn--full" type="submit" disabled={loading}>
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>

          <button
            type="button"
            className="btn btn--secondary btn--full"
            style={{ marginTop: 8 }}
            onClick={() => switchMode('signin')}
          >
            ← Back to sign in
          </button>
        </div>
      </div>
    );
  }

  // Sign in / Sign up form
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--auth" onClick={(event) => event.stopPropagation()}>
        <button className="modal__close" onClick={onClose} type="button">×</button>
        <h3 className="modal__title">Welcome to TaiResume</h3>
        <p className="modal__desc">
          Sign in or create an account to manage your coin wallet.
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'signin' ? 'auth-tab--active' : ''}`}
            onClick={() => switchMode('signin')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'signup' ? 'auth-tab--active' : ''}`}
            onClick={() => switchMode('signup')}
          >
            Sign up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <label className="auth-form__field">
              <span>Name</span>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                autoComplete="name"
              />
            </label>
          )}

          <label className="auth-form__field">
            <span>Email</span>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="auth-form__field">
            <span>Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              required
            />
          </label>

          {mode === 'signin' && (
            <button
              type="button"
              className="btn btn--ghost"
              style={{ alignSelf: 'flex-end', fontSize: '0.78rem', padding: '2px 0' }}
              onClick={() => switchMode('forgot')}
            >
              Forgot password?
            </button>
          )}

          {mode === 'signup' && (
            <div className="password-rules">
              <p className="password-rules__title">Password requirements</p>
              <ul className="password-rules__list">
                <li className={`password-rules__item${passwordRules.uppercase ? ' password-rules__item--met' : ''}`}>
                  Require uppercase character
                </li>
                <li className={`password-rules__item${passwordRules.lowercase ? ' password-rules__item--met' : ''}`}>
                  Require lowercase character
                </li>
                <li className={`password-rules__item${passwordRules.special ? ' password-rules__item--met' : ''}`}>
                  Require special character
                </li>
                <li className={`password-rules__item${passwordRules.numeric ? ' password-rules__item--met' : ''}`}>
                  Require numeric character
                </li>
              </ul>
            </div>
          )}

          {message && (
            <p className={`auth-form__message${message.kind === 'error' ? ' auth-form__message--error' : ''}`}>
              {message.text}
            </p>
          )}

          <button
            className="btn btn--primary btn--full"
            type="submit"
            disabled={loading || (mode === 'signup' && !allPasswordRulesMet)}
          >
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
