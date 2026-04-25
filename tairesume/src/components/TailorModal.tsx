'use client';

import { useState } from 'react';
import { X, Wand2, Zap, Coins } from 'lucide-react';
import { STANDARD_COST, ADVANCED_COST } from '@/lib/coins';

interface TailorModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  onConfirm: (model: 'standard' | 'advanced') => void;
}

export default function TailorModal({ isOpen, onClose, coins, onConfirm }: TailorModalProps) {
  const [selected, setSelected] = useState<'standard' | 'advanced'>('standard');

  if (!isOpen) return null;

  const canAffordStandard = coins >= STANDARD_COST;
  const canAffordAdvanced = coins >= ADVANCED_COST;

  const handleConfirm = () => {
    onConfirm(selected);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--tailor" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} type="button" aria-label="Close">
          <X size={18} aria-hidden="true" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <Wand2 size={20} aria-hidden="true" style={{ color: 'var(--accent)' }} />
          <h3 className="modal__title" style={{ margin: 0 }}>Choose a model</h3>
        </div>
        <p className="modal__desc">
          Pick how much firepower you want. You have{' '}
          <strong style={{ color: 'var(--coin-gold)' }}>{coins} coin{coins !== 1 ? 's' : ''}</strong>.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {/* Standard */}
          <button
            type="button"
            className={`tailor-model-option${selected === 'standard' ? ' tailor-model-option--selected' : ''}${!canAffordStandard ? ' tailor-model-option--disabled' : ''}`}
            onClick={() => canAffordStandard && setSelected('standard')}
            disabled={!canAffordStandard}
            aria-pressed={selected === 'standard'}
          >
            <div className="tailor-model-option__icon">
              <Wand2 size={20} aria-hidden="true" />
            </div>
            <div className="tailor-model-option__body">
              <div className="tailor-model-option__name">Standard</div>
              <div className="tailor-model-option__desc">
                Gemma 2B — fast and good for most resumes. May occasionally miss nuances.
              </div>
            </div>
            <div className="tailor-model-option__cost">
              <Coins size={14} aria-hidden="true" />
              {STANDARD_COST} coin
            </div>
          </button>

          {/* Pro */}
          <button
            type="button"
            className={`tailor-model-option tailor-model-option--pro${selected === 'advanced' ? ' tailor-model-option--selected' : ''}${!canAffordAdvanced ? ' tailor-model-option--disabled' : ''}`}
            onClick={() => canAffordAdvanced && setSelected('advanced')}
            disabled={!canAffordAdvanced}
            aria-pressed={selected === 'advanced'}
          >
            <div className="tailor-model-option__icon">
              <Zap size={20} aria-hidden="true" />
            </div>
            <div className="tailor-model-option__body">
              <div className="tailor-model-option__name">
                Pro
                <span className="tailor-model-option__badge">Best quality</span>
              </div>
              <div className="tailor-model-option__desc">
                Llama 3.1 8B — stronger reasoning, better formatting, more accurate tailoring.
              </div>
            </div>
            <div className="tailor-model-option__cost">
              <Coins size={14} aria-hidden="true" />
              {ADVANCED_COST} coins
            </div>
          </button>
        </div>

        {!canAffordStandard && (
          <p style={{ fontSize: '0.8rem', color: 'var(--error)', marginBottom: 12 }}>
            You need at least {STANDARD_COST} coin to tailor. Watch an ad or buy a pack to top up.
          </p>
        )}

        <button
          className="btn btn--primary btn--full"
          style={{ minHeight: 48, fontSize: '1rem', fontWeight: 700 }}
          onClick={handleConfirm}
          disabled={!canAffordStandard}
          type="button"
        >
          <Wand2 size={16} aria-hidden="true" />
          Tailor with {selected === 'standard' ? 'Standard' : 'Pro'} — {selected === 'standard' ? STANDARD_COST : ADVANCED_COST} coin{selected === 'advanced' ? 's' : ''}
        </button>
      </div>
    </div>
  );
}
