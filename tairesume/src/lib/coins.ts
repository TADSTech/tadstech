import { doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { db } from './firebase';
import { CoinTransaction, UserProfile } from '@/types';

const SIGNUP_BONUS = 5;
const STANDARD_COST = 1;
const ADVANCED_COST = 5;
const AD_REWARD = 5;
const PURCHASE_AMOUNT = 10;

export { SIGNUP_BONUS, STANDARD_COST, ADVANCED_COST, AD_REWARD, PURCHASE_AMOUNT };

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data() as UserProfile;
  }
  return null;
}

export async function createUserProfile(
  uid: string,
  email: string | null,
  displayName: string | null,
  photoURL: string | null
): Promise<UserProfile> {
  const profile: UserProfile = {
    uid,
    email,
    displayName,
    photoURL,
    coins: SIGNUP_BONUS,
    createdAt: Date.now(),
  };

  const ref = doc(db, 'users', uid);
  await setDoc(ref, profile);

  // Record signup bonus transaction
  await addTransaction(uid, {
    type: 'signup_bonus',
    amount: SIGNUP_BONUS,
    timestamp: Date.now(),
    description: 'Welcome bonus — 5 free coins!',
  });

  return profile;
}

export async function getBalance(uid: string): Promise<number> {
  const profile = await getUserProfile(uid);
  return profile?.coins ?? 0;
}

export async function spendCoins(uid: string, amount: number, type: 'tailor_standard' | 'tailor_advanced'): Promise<boolean> {
  const balance = await getBalance(uid);
  if (balance < amount) return false;

  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    coins: increment(-amount),
  });

  await addTransaction(uid, {
    type,
    amount: -amount,
    timestamp: Date.now(),
    description: type === 'tailor_standard' ? 'Standard resume tailor' : 'Advanced resume tailor',
  });

  return true;
}

export async function earnCoins(uid: string, amount: number, type: 'ad_reward' | 'purchase'): Promise<void> {
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    coins: increment(amount),
  });

  await addTransaction(uid, {
    type,
    amount,
    timestamp: Date.now(),
    description: type === 'ad_reward' ? 'Watched ad — earned 5 coins' : `Purchased ${amount} coins`,
  });
}

async function addTransaction(uid: string, transaction: CoinTransaction): Promise<void> {
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    transactions: arrayUnion(transaction),
  });
}
