import React, { useState, useEffect } from 'react';
import { Type } from 'lucide-react';

export type FontSize = 'small' | 'medium' | 'large' | 'xl';

interface FontControlsProps {
    onChange: (size: FontSize) => void;
}

const FONT_SIZES: Record<FontSize, { label: string; value: string }> = {
    small: { label: 'S', value: '16px' },
    medium: { label: 'M', value: '18px' },
    large: { label: 'L', value: '20px' },
    xl: { label: 'XL', value: '24px' },
};

export const FontControls: React.FC<FontControlsProps> = ({ onChange }) => {
    const [fontSize, setFontSize] = useState<FontSize>(() => {
        const saved = localStorage.getItem('tadstech-font-size');
        return (saved as FontSize) || 'medium';
    });

    useEffect(() => {
        onChange(fontSize);
        localStorage.setItem('tadstech-font-size', fontSize);
    }, [fontSize, onChange]);

    return (
        <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-white/50" />
            <div className="flex gap-1">
                {(Object.keys(FONT_SIZES) as FontSize[]).map((size) => (
                    <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`px-3 py-1 text-xs border transition-all ${fontSize === size
                                ? 'border-white bg-white text-black'
                                : 'border-white/40 hover:border-white'
                            }`}
                        title={`Font size: ${FONT_SIZES[size].value}`}
                    >
                        {FONT_SIZES[size].label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export { FONT_SIZES };
