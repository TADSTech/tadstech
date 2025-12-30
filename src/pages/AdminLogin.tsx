import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const { signIn, user, isAdmin } = useAuth();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (user && isAdmin) {
            navigate('/admin');
        }
    }, [user, isAdmin, navigate]);

    const handleSignIn = async () => {
        try {
            setLoading(true);
            setError('');
            await signIn();
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4">
            <Helmet>
                <title>Admin Login | TADS</title>
            </Helmet>

            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">{'\u003e'} ADMIN.login()</h1>
                    <p className="text-white/70">Sign in to manage blog posts</p>
                </div>

                <div className="border border-white/20 p-8 bg-black/50 backdrop-blur-sm space-y-6">
                    {error && (
                        <div className="border border-red-500 bg-red-500/10 p-4 flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-red-300">{error}</div>
                        </div>
                    )}

                    <button
                        onClick={handleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-white/40 hover:border-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <LogIn className="h-5 w-5" />
                        <span className="uppercase tracking-wider text-sm">
                            {loading ? 'Signing in...' : 'Sign in with Google'}
                        </span>
                    </button>

                    <p className="text-xs text-white/50 text-center">
                        Only authorized administrators can access this area
                    </p>
                </div>
            </div>
        </div>
    );
};
