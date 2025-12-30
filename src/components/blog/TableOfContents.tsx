import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TableOfContentsProps {
    content: string;
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const extractedHeadings: Heading[] = [];
        const lines = content.split('\n');

        lines.forEach((line, index) => {
            const h2Match = line.match(/^## (.+)$/);
            const h3Match = line.match(/^### (.+)$/);

            if (h2Match) {
                const text = h2Match[1];
                const id = `heading-${index}`;
                extractedHeadings.push({ id, text, level: 2 });
            } else if (h3Match) {
                const text = h3Match[1];
                const id = `heading-${index}`;
                extractedHeadings.push({ id, text, level: 3 });
            }
        });

        setHeadings(extractedHeadings);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -80% 0px' }
        );

        const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
        elements.forEach(el => el && observer.observe(el));

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-4 right-4 z-40 flex items-center gap-2 px-4 py-3 bg-black border border-white/40 hover:border-white hover:bg-white/10 transition-all shadow-lg"
            >
                <List className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Contents</span>
            </button>

            <div
                className={`lg:block ${isOpen ? 'block' : 'hidden'
                    } fixed lg:sticky top-24 right-4 lg:right-auto max-h-[calc(100vh-8rem)] overflow-auto z-30`}
            >
                <div className="border border-white/20 bg-black/95 backdrop-blur-sm p-4 w-64">
                    <div className="flex items-center justify-between mb-4 lg:mb-3">
                        <h3 className="text-xs uppercase tracking-wider font-bold">Contents</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden text-white/50 hover:text-white"
                        >
                            ×
                        </button>
                    </div>
                    <nav className="space-y-2">
                        {headings.map((heading) => (
                            <a
                                key={heading.id}
                                href={`#${heading.id}`}
                                onClick={() => setIsOpen(false)}
                                className={`block text-sm transition-colors ${heading.level === 3 ? 'pl-4' : ''
                                    } ${activeId === heading.id
                                        ? 'text-white font-bold'
                                        : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                {heading.text}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
};
