import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface ReadingModeProps {
    onChange: (enabled: boolean) => void;
}

export const ReadingMode: React.FC<ReadingModeProps> = ({ onChange }) => {
    const [enabled, setEnabled] = useState(() => {
        const saved = localStorage.getItem('tadstech-reading-mode');
        return saved === 'true';
    });

    useEffect(() => {
        onChange(enabled);
        localStorage.setItem('tadstech-reading-mode', String(enabled));
    }, [enabled, onChange]);

    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`flex items-center gap-2 px-3 py-1 text-xs border transition-all ${enabled
                    ? 'border-white bg-white text-black'
                    : 'border-white/40 hover:border-white'
                }`}
            title="Toggle reading mode"
        >
            <BookOpen className="h-4 w-4" />
            Reading Mode
        </button>
    );
};
