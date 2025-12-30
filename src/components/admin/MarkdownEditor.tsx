import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bold, Italic, Code, Link as LinkIcon, Image, List, ListOrdered, Heading1, Heading2 } from 'lucide-react';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    onImageClick: () => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, onImageClick }) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const insertMarkdown = (before: string, after = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

        onChange(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    const toolbarButtons = [
        { icon: Heading1, action: () => insertMarkdown('# ', ''), tooltip: 'Heading 1' },
        { icon: Heading2, action: () => insertMarkdown('## ', ''), tooltip: 'Heading 2' },
        { icon: Bold, action: () => insertMarkdown('**', '**'), tooltip: 'Bold' },
        { icon: Italic, action: () => insertMarkdown('_', '_'), tooltip: 'Italic' },
        { icon: Code, action: () => insertMarkdown('`', '`'), tooltip: 'Inline code' },
        { icon: LinkIcon, action: () => insertMarkdown('[', '](url)'), tooltip: 'Link' },
        { icon: Image, action: onImageClick, tooltip: 'Insert image' },
        { icon: List, action: () => insertMarkdown('\n- ', ''), tooltip: 'Bullet list' },
        { icon: ListOrdered, action: () => insertMarkdown('\n1. ', ''), tooltip: 'Numbered list' },
    ];

    return (
        <div className="grid lg:grid-cols-2 gap-4 h-full">
            <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-2 pb-2 border-b border-white/20">
                    {toolbarButtons.map((btn, idx) => (
                        <button
                            key={idx}
                            onClick={btn.action}
                            title={btn.tooltip}
                            className="p-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                        >
                            <btn.icon className="h-4 w-4" />
                        </button>
                    ))}
                </div>
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 bg-black/50 border border-white/20 p-4 text-white font-mono text-sm focus:outline-none focus:border-white/40 resize-none"
                    placeholder="Write your content in markdown..."
                    spellCheck={false}
                />
            </div>

            <div className="border border-white/20 p-4 bg-black/50 overflow-auto">
                <div className="prose prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-400 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-black/70 prose-pre:border prose-pre:border-white/20">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {value || '*Preview will appear here...*'}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};
