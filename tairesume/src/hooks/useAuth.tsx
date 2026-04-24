'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { getUserProfile, createUserProfile, getBalance, spendCoins, earnCoins, STANDARD_COST, ADVANCED_COST, AD_REWARD, PURCHASE_AMOUNT } from '@/lib/coins';

interface AuthContextType {
  user: User | null;
  coins: number;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
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

  const refreshCoins = useCallback(async () => {
    if (!user) {
      setCoins(0);
      return;
    }
    const balance = await getBalance(user.uid);
    setCoins(balance);
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Check if user profile exists, create if new
        const profile = await getUserProfile(firebaseUser.uid);
        if (!profile) {
          await createUserProfile(
            firebaseUser.uid,
            firebaseUser.email,
            firebaseUser.displayName,
            firebaseUser.photoURL
          );
        }
        const balance = await getBalance(firebaseUser.uid);
        setCoins(balance);
      } else {
        setCoins(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const spend = async (model: 'standard' | 'advanced'): Promise<boolean> => {
    if (!user) return false;
    const cost = model === 'standard' ? STANDARD_COST : ADVANCED_COST;
    const type = model === 'standard' ? 'tailor_standard' as const : 'tailor_advanced' as const;
    const success = await spendCoins(user.uid, cost, type);
    if (success) {
      setCoins(prev => prev - cost);
    }
    return success;
  };

  const earnFromAd = async () => {
    if (!user) return;
    await earnCoins(user.uid, AD_REWARD, 'ad_reward');
    setCoins(prev => prev + AD_REWARD);
  };

  const earnFromPurchase = async () => {
    if (!user) return;
    await earnCoins(user.uid, PURCHASE_AMOUNT, 'purchase');
    setCoins(prev => prev + PURCHASE_AMOUNT);
  };

  return (
    <AuthContext.Provider value={{
      user,
      coins,
      loading,
      signInWithGoogle,
      logout,
      refreshCoins,
      spend,
      earnFromAd,
      earnFromPurchase,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
