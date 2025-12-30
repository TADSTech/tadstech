import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { BlogPost } from '../../services/blogService';
import { FontControls, type FontSize, FONT_SIZES } from './FontControls';
import { ReadingMode } from './ReadingMode';
import { TableOfContents } from './TableOfContents';
import { CodeBlock } from './CodeBlock';

interface BlogReaderProps {
    post: BlogPost;
}

export const BlogReader: React.FC<BlogReaderProps> = ({ post }) => {
    const [fontSize, setFontSize] = useState<FontSize>('medium');
    const [readingMode, setReadingMode] = useState(false);

    return (
        <div className="relative">
            <div className="sticky top-20 z-20 bg-black/95 backdrop-blur-sm border-b border-white/20 pb-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <FontControls onChange={setFontSize} />
                    <ReadingMode onChange={setReadingMode} />
                </div>
            </div>

            <div className="flex gap-8">
                <article
                    className={`flex-1 transition-all duration-300 ${readingMode ? 'max-w-3xl mx-auto' : 'max-w-full'
                        }`}
                    style={{
                        fontSize: FONT_SIZES[fontSize].value,
                        lineHeight: readingMode ? '1.8' : '1.6',
                    }}
                >
                    <div className="prose prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:mb-4
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-code:text-pink-400 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-transparent prose-pre:p-0
            prose-blockquote:border-l-4 prose-blockquote:border-white/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white/70
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-li:mb-2
            prose-img:rounded prose-img:border prose-img:border-white/20
            prose-table:border-collapse prose-table:border prose-table:border-white/20
            prose-th:border prose-th:border-white/20 prose-th:bg-white/5 prose-th:px-4 prose-th:py-2
            prose-td:border prose-td:border-white/20 prose-td:px-4 prose-td:py-2
            prose-hr:border-white/20"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h2: ({ node, children, ...props }) => {
                                    const text = String(children);
                                    const id = `heading-${text.toLowerCase().replace(/\s+/g, '-')}`;
                                    return (
                                        <h2 id={id} {...props}>
                                            {children}
                                        </h2>
                                    );
                                },
                                h3: ({ node, children, ...props }) => {
                                    const text = String(children);
                                    const id = `heading-${text.toLowerCase().replace(/\s+/g, '-')}`;
                                    return (
                                        <h3 id={id} {...props}>
                                            {children}
                                        </h3>
                                    );
                                },
                                code({ node, inline, className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    const code = String(children).replace(/\n$/, '');

                                    return !inline && match ? (
                                        <CodeBlock language={match[1]} code={code} />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                                img({ node, src, alt, ...props }: any) {
                                    return (
                                        <img
                                            src={src}
                                            alt={alt || 'Blog image'}
                                            loading="lazy"
                                            {...props}
                                        />
                                    );
                                },
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>

                {!readingMode && (
                    <aside className="hidden xl:block w-64 flex-shrink-0">
                        <TableOfContents content={post.content} />
                    </aside>
                )}
            </div>

            {readingMode && (
                <div className="xl:hidden">
                    <TableOfContents content={post.content} />
                </div>
            )}
        </div>
    );
};
