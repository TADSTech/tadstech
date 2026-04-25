'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Coins, Zap, Star } from 'lucide-react';
import { COIN_PACKS, CoinPack } from '@/lib/coins';

interface BuyCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (amount: number) => Promise<void> | void;
  userEmail: string | null;
}

// Load Paystack script lazily — only when the modal is first opened.
// Loading it globally causes a 403 on their CSS file due to CORS/CSP restrictions.
function usePaystackScript(enabled: boolean) {
  const loaded = useRef(false);
  useEffect(() => {
    if (!enabled || loaded.current || document.getElementById('paystack-inline')) return;
    loaded.current = true;
    const script = document.createElement('script');
    script.id = 'paystack-inline';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
  }, [enabled]);
}

const PACK_ICONS = [Coins, Zap, Star];

export default function BuyCoinsModal({ isOpen, onClose, onComplete, userEmail }: BuyCoinsModalProps) {
  const [selected, setSelected] = useState<CoinPack>(COIN_PACKS[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  usePaystackScript(isOpen);

  const handlePaystack = () => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      alert('Payment not configured yet. Please contact support.');
      return;
    }

    const PaystackPop = (window as unknown as {
      PaystackPop?: { setup: (config: Record<string, unknown>) => { openIframe: () => void } }
    }).PaystackPop;

    if (!PaystackPop) {
      alert('Payment system is still loading. Please try again in a moment.');
      return;
    }

    // Snapshot selected pack into a local const so the Paystack callback
    // closure always references the pack the user chose, not a stale state value.
    const pack = selected;

    setIsProcessing(true);

    const handler = PaystackPop.setup({
      key: publicKey,
      email: userEmail || 'user@tairesume.app',
      amount: pack.amountKobo,
      currency: 'NGN',
      ref: `tairesume_${pack.id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      metadata: {
        custom_fields: [
          { display_name: 'Pack', variable_name: 'pack', value: pack.label },
          { display_name: 'Coins', variable_name: 'coins', value: pack.coins.toString() },
        ],
      },
      callback: function () {
        Promise.resolve()
          .then(() => onComplete(pack.coins))
          .then(() => { onClose(); })
          .catch((err) => {
            console.error('Purchase completion failed:', err);
            alert('Payment succeeded, but the coin credit failed. Please refresh the page.');
          })
          .finally(() => { setIsProcessing(false); });
      },
      onClose: () => { setIsProcessing(false); },
    });

    if (handler) {
      handler.openIframe();
    } else {
      setIsProcessing(false);
      alert('Payment system loading. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--buy-coins" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={18} aria-hidden="true" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <Coins size={20} aria-hidden="true" style={{ color: 'var(--coin-gold)' }} />
          <h3 className="modal__title" style={{ margin: 0 }}>Buy Coins</h3>
        </div>
        <p className="modal__desc">Pick a pack and pay with Paystack. Coins are added instantly.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {COIN_PACKS.map((pack, i) => {
            const Icon = PACK_ICONS[i] ?? Coins;
            const isSelected = selected.id === pack.id;
            return (
              <button
                key={pack.id}
                type="button"
                className={`coin-pack-option${isSelected ? ' coin-pack-option--selected' : ''}`}
                onClick={() => setSelected(pack)}
                aria-pressed={isSelected}
              >
                <div className="coin-pack-option__icon">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div className="coin-pack-option__body">
                  <div className="coin-pack-option__name">
                    {pack.label}
                    {pack.badge && (
                      <span className="coin-pack-option__badge">{pack.badge}</span>
                    )}
                  </div>
                  <div className="coin-pack-option__coins">
                    <Coins size={13} aria-hidden="true" />
                    {pack.coins} coins
                  </div>
                </div>
                <div className="coin-pack-option__price">
                  ₦{pack.priceNGN.toLocaleString()}
                </div>
              </button>
            );
          })}
        </div>

        <button
          className="btn btn--primary btn--full btn--large"
          onClick={handlePaystack}
          disabled={isProcessing}
          style={{ minHeight: 48 }}
        >
          {isProcessing ? (
            <span className="spinner" />
          ) : (
            <>
              <Coins size={16} aria-hidden="true" />
              Pay ₦{selected.priceNGN.toLocaleString()} · {selected.coins} coins
            </>
          )}
        </button>

        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
          Secure payment powered by Paystack
        </p>
      </div>
    </div>
  );
}
