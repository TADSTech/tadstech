'use client';

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import {
  getUserProfile,
  createUserProfile,
  getBalance,
  spendCoins,
  earnCoins,
  STANDARD_COST,
  ADVANCED_COST,
  AD_REWARD,
  PURCHASE_AMOUNT,
} from '@/lib/coins';

interface AuthContextType {
  user: User | null;
  coins: number;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string | null) => Promise<{ needsConfirmation: boolean }>;
  logout: () => Promise<void>;
  refreshCoins: () => Promise<void>;
  spend: (model: 'standard' | 'advanced') => Promise<boolean>;
  earnFromAd: () => Promise<void>;
  earnFromPurchase: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  const syncProfile = useCallback(async (supabaseUser: User) => {
    try {
      const profile = await getUserProfile(supabaseUser.id);
      if (!profile) {
        await createUserProfile(
          supabaseUser.id,
          supabaseUser.email ?? null,
          supabaseUser.user_metadata?.display_name ?? supabaseUser.user_metadata?.full_name ?? null,
        );
      }
      const balance = await getBalance(supabaseUser.id);
      setCoins(balance);
    } catch (error) {
      console.error('Profile sync error:', error);
      setCoins(0);
    }
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        syncProfile(currentUser).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await syncProfile(currentUser);
      } else {
        setCoins(0);
      }
    });

    return () => subscription.unsubscribe();
  }, [syncProfile]);

  const refreshCoins = useCallback(async () => {
    if (!user) { setCoins(0); return; }
    const balance = await getBalance(user.id);
    setCoins(balance);
  }, [user]);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string | null = null
  ): Promise<{ needsConfirmation: boolean }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName?.trim() || null },
        emailRedirectTo: `${window.location.origin}/app`,
      },
    });

    if (error) throw new Error(error.message);

    // If identities is empty the user already exists
    if (data.user && data.user.identities?.length === 0) {
      throw new Error('An account with this email already exists. Please sign in.');
    }

    // Supabase sends a confirmation email; session is null until confirmed
    const needsConfirmation = !data.session;
    return { needsConfirmation };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCoins(0);
  };

  const spend = async (model: 'standard' | 'advanced'): Promise<boolean> => {
    if (!user) return false;
    const cost = model === 'standard' ? STANDARD_COST : ADVANCED_COST;
    const type = model === 'standard' ? 'tailor_standard' as const : 'tailor_advanced' as const;
    const success = await spendCoins(user.id, cost, type);
    if (success) setCoins((prev) => prev - cost);
    return success;
  };

  const earnFromAd = async () => {
    if (!user) return;
    await earnCoins(user.id, AD_REWARD, 'ad_reward');
    setCoins((prev) => prev + AD_REWARD);
  };

  const earnFromPurchase = async () => {
    if (!user) return;
    await earnCoins(user.id, PURCHASE_AMOUNT, 'purchase');
    setCoins((prev) => prev + PURCHASE_AMOUNT);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        coins,
        loading,
        signInWithEmail,
        signUpWithEmail,
        logout,
        refreshCoins,
        spend,
        earnFromAd,
        earnFromPurchase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
