'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

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
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const passwordRules = useMemo(() => validatePassword(password), [password]);
  const allPasswordRulesMet = Object.values(passwordRules).every(Boolean);

  if (!isOpen) return null;

  const resetMessage = () => setMessage(null);

  const handleGoogle = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch {
      setMessage('Google sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === 'signup') {
        if (!allPasswordRulesMet) {
          setMessage('Please satisfy all password requirements before signing up.');
          setLoading(false);
          return;
        }
        await signUpWithEmail(email, password, name.trim() || null);
        setMessage('Account created. You can now sign in.');
        setMode('signin');
      } else {
        await signInWithEmail(email, password);
        onClose();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--auth" onClick={(event) => event.stopPropagation()}>
        <button className="modal__close" onClick={onClose} type="button">×</button>
        <h3 className="modal__title">Welcome to TaiResume</h3>
        <p className="modal__desc">
          Sign in with Google or use email and password to manage your coin wallet.
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'signin' ? 'auth-tab--active' : ''}`}
            onClick={() => {
              setMode('signin');
              resetMessage();
            }}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'signup' ? 'auth-tab--active' : ''}`}
            onClick={() => {
              setMode('signup');
              resetMessage();
            }}
          >
            Sign up
          </button>
        </div>

        <button className="btn btn--secondary btn--full" type="button" onClick={handleGoogle} disabled={loading}>
          Continue with Google
        </button>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <label className="auth-form__field">
              <span>Name</span>
              <input
                className="input"
                value={name}
                onChange={(event) => setName(event.target.value)}
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
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              required
            />
          </label>

          {mode === 'signup' && (
            <div className="password-rules">
              <p className="password-rules__title">Password requirements</p>
              <ul className="password-rules__list">
                <li className={passwordRules.uppercase ? 'password-rules__item password-rules__item--met' : 'password-rules__item'}>
                  Require uppercase character
                </li>
                <li className={passwordRules.lowercase ? 'password-rules__item password-rules__item--met' : 'password-rules__item'}>
                  Require lowercase character
                </li>
                <li className={passwordRules.special ? 'password-rules__item password-rules__item--met' : 'password-rules__item'}>
                  Require special character
                </li>
                <li className={passwordRules.numeric ? 'password-rules__item password-rules__item--met' : 'password-rules__item'}>
                  Require numeric character
                </li>
              </ul>
            </div>
          )}

          {message && <p className="auth-form__message">{message}</p>}

          <button className="btn btn--primary btn--full" type="submit" disabled={loading || (mode === 'signup' && !allPasswordRulesMet)}>
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in with Email' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
