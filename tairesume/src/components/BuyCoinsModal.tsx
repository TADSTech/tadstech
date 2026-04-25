'use client';

import { useState } from 'react';
import { PURCHASE_AMOUNT } from '@/lib/coins';

interface BuyCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => Promise<void> | void;
  userEmail: string | null;
}

export default function BuyCoinsModal({ isOpen, onClose, onComplete, userEmail }: BuyCoinsModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaystack = () => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      alert('Payment not configured yet. Please contact support.');
      return;
    }

    setIsProcessing(true);

    // Paystack inline popup
    const handler = (window as unknown as { PaystackPop: { setup: (config: Record<string, unknown>) => { openIframe: () => void } } }).PaystackPop?.setup({
      key: publicKey,
      email: userEmail || 'user@tairesume.app',
      amount: 144000, // ₦1,440 in kobo
      currency: 'NGN',
      ref: `tairesume_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      metadata: {
        custom_fields: [
          { display_name: 'Product', variable_name: 'product', value: 'TaiResume Coins' },
          { display_name: 'Coins', variable_name: 'coins', value: PURCHASE_AMOUNT.toString() },
        ],
      },
      callback: async () => {
        try {
          await onComplete();
          onClose();
        } catch (error) {
          console.error('Purchase completion failed:', error);
          alert('Payment succeeded, but the coin credit failed. Please refresh the page.');
        } finally {
          setIsProcessing(false);
        }
      },
      onClose: () => {
        setIsProcessing(false);
      },
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
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>×</button>
        <h3 className="modal__title">Buy Coins</h3>
        <p className="modal__desc">
          Get {PURCHASE_AMOUNT} coins for ₦1,440. Use them to tailor your resume with AI.
        </p>

        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 4 }}>🪙</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--coin-gold)' }}>
            {PURCHASE_AMOUNT} Coins
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
            ₦1,440.00
          </div>
        </div>

        <button
          className="btn btn--primary btn--full btn--large"
          onClick={handlePaystack}
          disabled={isProcessing}
        >
          {isProcessing ? <span className="spinner" /> : 'Pay with Paystack'}
        </button>

        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
          Secure payment powered by Paystack
        </p>
      </div>
    </div>
  );
}
