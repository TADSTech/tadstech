import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    language: string;
    code: string;
    showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, showLineNumbers = false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-4">
            <div className="flex items-center justify-between bg-black/70 border-t border-x border-white/20 px-4 py-2">
                <span className="text-xs uppercase tracking-wider text-white/50">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1 text-xs border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                    title="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="h-3 w-3" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="h-3 w-3" />
                            Copy
                        </>
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                showLineNumbers={showLineNumbers}
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderTop: 'none',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};
