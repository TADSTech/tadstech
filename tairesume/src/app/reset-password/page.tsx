'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [sessionReady, setSessionReady] = useState(false);

  // Supabase puts the recovery token in the URL hash; the client
  // picks it up automatically via onAuthStateChange PASSWORD_RECOVERY
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('Passwords do not match.');
      setStatus('error');
      return;
    }
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setStatus('error');
    } else {
      setStatus('done');
      setMessage('Password updated. Redirecting you to the app…');
      setTimeout(() => router.push('/app'), 2000);
    }
  };

  if (!sessionReady) {
    return (
      <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Verifying reset link…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 16px' }}>
        <div className="modal" style={{ position: 'static', transform: 'none', width: '100%' }}>
          <h3 className="modal__title">Choose a new password</h3>
          <p className="modal__desc">Pick something strong — at least 8 characters.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-form__field">
              <span>New password</span>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                autoComplete="new-password"
                required
              />
            </label>

            <label className="auth-form__field">
              <span>Confirm password</span>
              <input
                className="input"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat new password"
                autoComplete="new-password"
                required
              />
            </label>

            {message && (
              <p className={`auth-form__message${status === 'error' ? ' auth-form__message--error' : ''}`}>
                {message}
              </p>
            )}

            <button
              className="btn btn--primary btn--full"
              type="submit"
              disabled={status === 'loading' || status === 'done'}
            >
              {status === 'loading' ? 'Updating…' : 'Set new password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
