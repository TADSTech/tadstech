'use client';

import { Coins } from 'lucide-react';
import { STANDARD_COST, ADVANCED_COST } from '@/lib/coins';

interface ModelSelectorProps {
  model: 'standard' | 'advanced';
  onChange: (model: 'standard' | 'advanced') => void;
  coins: number;
}

export default function ModelSelector({ model, onChange, coins }: ModelSelectorProps) {
  return (
    <div className="card">
      <label className="card__label">AI Model</label>
      <div className="model-selector">
        <button
          className={`model-option ${model === 'standard' ? 'model-option--active' : ''}`}
          onClick={() => onChange('standard')}
          type="button"
        >
          <div className="model-option__name">Standard</div>
          <div className="model-option__meta">Gemma 2B — good for basic tailoring</div>
          <div className="model-option__cost">
            <Coins size={14} aria-hidden="true" style={{ color: 'var(--coin-gold)' }} />
            {STANDARD_COST} coin
          </div>
        </button>

        <button
          className={`model-option ${model === 'advanced' ? 'model-option--active' : ''}`}
          onClick={() => onChange('advanced')}
          type="button"
        >
          <div className="model-option__name">Advanced ⭐</div>
          <div className="model-option__meta">Llama 3.1 8B — better quality &amp; formatting</div>
          <div className="model-option__cost">
            <Coins size={14} aria-hidden="true" style={{ color: 'var(--coin-gold)' }} />
            {ADVANCED_COST} coins
            {coins < ADVANCED_COST && (
              <span style={{ color: 'var(--error)', marginLeft: 4, fontSize: '0.68rem' }}>
                (insufficient)
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
