"use client";

import { useState } from 'react';
import Link from 'next/link';
import BuyCoinsModal from '@/components/BuyCoinsModal';
import { useAuth } from '@/hooks/useAuth';

const plans = [
  {
    name: 'Starter boost',
    coins: '5 coins',
    price: 'Free on signup',
    note: 'Enough for a handful of tailored applications right away.',
  },
  {
    name: 'Rewarded ad',
    coins: '+1 coin',
    price: 'Free',
    note: 'Watch a rewarded ad to top up without spending cash.',
  },
  {
    name: 'Paystack pack',
    coins: '10 coins',
    price: 'N1,440',
    note: 'A simple top-up for heavier application sessions.',
  },
];

export default function PricingPage() {
  const { user, signInWithGoogle, earnFromPurchase } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      await signInWithGoogle();
      return;
    }

    setIsCheckoutOpen(true);
  };

  return (
    <div className="page-shell">
      <header className="landing-header">
        <div className="landing-header__brand">Tai<span>Resume</span></div>
        <nav className="landing-header__nav">
          <Link href="/" className="btn btn--ghost">Home</Link>
          <Link href="/features" className="btn btn--ghost">Features</Link>
          <Link href="/app" className="btn btn--primary">Open App</Link>
        </nav>
      </header>

      <main className="content-page">
        <section className="content-hero">
          <p className="hero__eyebrow">Pricing</p>
          <h1 className="hero__title">A simple coin system that keeps tailoring transparent.</h1>
          <p className="hero__subtitle">
            Sign in once, earn a starter bonus, and decide whether to top up with an ad or a Paystack pack.
          </p>
        </section>

        <section className="pricing-cards">
          {plans.map((plan) => {
            const isPaystackPlan = plan.name === 'Paystack pack';

            return (
            <article key={plan.name} className="pricing-card">
              <p className="pricing-card__name">{plan.name}</p>
              <p className="pricing-card__coins">{plan.coins}</p>
              <p className="pricing-card__price">{plan.price}</p>
              <p className="pricing-card__note">{plan.note}</p>
              {isPaystackPlan && (
                <button type="button" className="btn btn--primary btn--full" onClick={handleCheckout}>
                  Checkout
                </button>
              )}
            </article>
            );
          })}
        </section>
      </main>

      <BuyCoinsModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onComplete={earnFromPurchase}
        userEmail={user?.email ?? null}
      />
    </div>
  );
}
