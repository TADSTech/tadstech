import { supabase } from './supabase';
import { CoinTransaction, UserProfile } from '@/types';

export const SIGNUP_BONUS = 5;
export const STANDARD_COST = 1;
export const ADVANCED_COST = 5;
export const AD_REWARD = 1;
export const PURCHASE_AMOUNT = 10; // kept for backward compat

export interface CoinPack {
  id: string;
  coins: number;
  priceNGN: number;   // in Naira
  amountKobo: number; // Paystack uses kobo (1 NGN = 100 kobo)
  label: string;
  badge?: string;
}

export const COIN_PACKS: CoinPack[] = [
  {
    id: 'starter',
    coins: 10,
    priceNGN: 1440,
    amountKobo: 144000,
    label: 'Starter',
  },
  {
    id: 'value',
    coins: 20,
    priceNGN: 2000,
    amountKobo: 200000,
    label: 'Value',
    badge: 'Popular',
  },
  {
    id: 'pro',
    coins: 30,
    priceNGN: 2500,
    amountKobo: 250000,
    label: 'Pro',
    badge: 'Best value',
  },
];

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uid)
    .single();

  if (error || !data) return null;
  return data as UserProfile;
}

export async function createUserProfile(
  uid: string,
  email: string | null,
  displayName: string | null,
): Promise<UserProfile> {
  const profile: UserProfile = {
    uid,
    email,
    displayName,
    photoURL: null,
    coins: SIGNUP_BONUS,
    createdAt: Date.now(),
  };

  const { error } = await supabase.from('users').upsert(
    {
      uid,
      email,
      display_name: displayName,
      photo_url: null,
      coins: SIGNUP_BONUS,
      created_at: new Date().toISOString(),
      transactions: [
        {
          type: 'signup_bonus',
          amount: SIGNUP_BONUS,
          timestamp: Date.now(),
          description: 'Welcome bonus — 5 free coins!',
        } satisfies CoinTransaction,
      ],
    },
    { onConflict: 'uid', ignoreDuplicates: true }
  );

  // AbortError means the Supabase auth lock was stolen by a concurrent request
  // (React Strict Mode double-mount). The upsert may have succeeded — treat as ok.
  if (error && error.message !== 'AbortError') throw new Error(error.message);
  return profile;
}

export async function getBalance(uid: string): Promise<number> {
  const { data, error } = await supabase
    .from('users')
    .select('coins')
    .eq('uid', uid)
    .single();

  if (error || !data) return 0;
  return data.coins ?? 0;
}

export async function spendCoins(
  uid: string,
  amount: number,
  type: 'tailor_standard' | 'tailor_advanced'
): Promise<boolean> {
  // Use an RPC function for atomic decrement + balance check
  const { data, error } = await supabase.rpc('spend_coins', {
    p_uid: uid,
    p_amount: amount,
    p_type: type,
    p_description: type === 'tailor_standard' ? 'Standard resume tailor' : 'Advanced resume tailor',
  });

  if (error || !data) return false;
  return true;
}

export async function earnCoins(
  uid: string,
  amount: number,
  type: 'ad_reward' | 'purchase'
): Promise<void> {
  const transaction: CoinTransaction = {
    type,
    amount,
    timestamp: Date.now(),
    description: type === 'ad_reward' ? 'Watched ad — earned 1 coin' : `Purchased ${amount} coins`,
  };

  const { error } = await supabase.rpc('earn_coins', {
    p_uid: uid,
    p_amount: amount,
    p_type: type,
    p_description: transaction.description,
  });

  if (error) throw new Error(error.message);
}
