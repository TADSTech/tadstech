"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Coins } from 'lucide-react';
import BuyCoinsModal from '@/components/BuyCoinsModal';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { COIN_PACKS } from '@/lib/coins';

const freePlans = [
  {
    name: 'Signup bonus',
    coins: '+5 coins',
    price: 'Free',
    note: 'Credited automatically when you create an account.',
  },
  {
    name: 'Rewarded ad',
    coins: '+1 coin',
    price: 'Free',
    note: 'Watch a short ad to top up without spending cash.',
  },
];

export default function PricingPage() {
  const { user, earnFromPurchase } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      setIsAuthOpen(true);
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
          <h1 className="hero__title">Simple coins. No subscriptions.</h1>
          <p className="hero__subtitle">
            Sign up for free coins, earn more by watching ads, or buy a pack when you need to power through applications.
          </p>
        </section>

        {/* Free plans */}
        <section style={{ marginTop: 24 }}>
          <p className="card__label" style={{ marginBottom: 12 }}>Free ways to earn</p>
          <div className="pricing-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {freePlans.map((plan) => (
              <article key={plan.name} className="pricing-card">
                <p className="pricing-card__name">{plan.name}</p>
                <p className="pricing-card__coins">{plan.coins}</p>
                <p className="pricing-card__price">{plan.price}</p>
                <p className="pricing-card__note">{plan.note}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Paid packs */}
        <section style={{ marginTop: 32 }}>
          <p className="card__label" style={{ marginBottom: 12 }}>Coin packs</p>
          <div className="pricing-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {COIN_PACKS.map((pack) => (
              <article key={pack.id} className={`pricing-card pricing-card--pack${pack.badge ? ' pricing-card--featured' : ''}`}>
                {pack.badge && (
                  <span className="pricing-card__badge">{pack.badge}</span>
                )}
                <p className="pricing-card__name">{pack.label}</p>
                <p className="pricing-card__coins">
                  <Coins size={18} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  {pack.coins} coins
                </p>
                <p className="pricing-card__price">₦{pack.priceNGN.toLocaleString()}</p>
                <p className="pricing-card__note">
                  ₦{Math.round(pack.priceNGN / pack.coins)} per coin
                </p>
                <button
                  type="button"
                  className="btn btn--primary btn--full"
                  style={{ marginTop: 16, minHeight: 44 }}
                  onClick={handleCheckout}
                >
                  Buy {pack.coins} coins
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Usage reference */}
        <section style={{ marginTop: 32 }}>
          <p className="card__label" style={{ marginBottom: 12 }}>What coins cost</p>
          <div className="pricing__grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
            {[
              { label: 'Standard tailor', cost: '1 coin' },
              { label: 'Pro tailor', cost: '5 coins' },
              { label: 'Resume from Scratch', cost: 'Free' },
              { label: 'Watch ad', cost: '+1 coin' },
            ].map((item) => (
              <div key={item.label} className="pricing__item">
                <span>{item.label}</span>
                <strong>{item.cost}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BuyCoinsModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onComplete={earnFromPurchase}
        userEmail={user?.email ?? null}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
