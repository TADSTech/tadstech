import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Heart, Share2, Calendar, Clock, Eye, Palette, Download, Copy, X } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import writeupData from '../data/writeups.json';

interface Writeup {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    timestamp: Date;
    category: 'poem' | 'blog' | 'reflection' | 'note';
    readTime: number;
    tags: string[];
}

interface WriteupStats {
    [key: string]: {
        views: number;
        likes: number;
        shares: number;
    };
}

export const Writing: React.FC = () => {
    const navigate = useNavigate();
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('tadstech-theme');
        return saved ? saved === 'blue' : false;
    });
    const [selectedWriteup, setSelectedWriteup] = useState<Writeup | null>(null);
    const [filter, setFilter] = useState<'all' | 'poem' | 'blog' | 'reflection' | 'note'>('all');
    const [stats, setStats] = useState<WriteupStats>({});
    const [liked, setLiked] = useState<Set<string>>(new Set());
    const [shareModal, setShareModal] = useState<{ open: boolean; writeupId: string | null; copied: boolean }>({ open: false, writeupId: null, copied: false });

    const accentColor = colorMode ? '#0ea5e9' : '#28333F';

    const writeups: Writeup[] = writeupData.map(w => ({
        ...w,
        timestamp: new Date(w.timestamp as unknown as string),
        category: w.category as 'poem' | 'blog' | 'reflection' | 'note'
    }));

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const writeupId = params.get('writeup');
        
        if (writeupId) {
            const writeup = writeups.find(w => w.id === writeupId);
            if (writeup) {
                setSelectedWriteup(writeup);
            }
        }
    }, [writeups]);

    useEffect(() => {
        const stored = localStorage.getItem('tadstech-writeup-stats');
        if (stored) {
            setStats(JSON.parse(stored));
        } else {
            const initial: WriteupStats = {};
            writeups.forEach(w => {
                initial[w.id] = { views: Math.floor(Math.random() * 100) + 10, likes: Math.floor(Math.random() * 20), shares: Math.floor(Math.random() * 5) };
            });
            setStats(initial);
            localStorage.setItem('tadstech-writeup-stats', JSON.stringify(initial));
        }
        
        const likedStored = localStorage.getItem('tadstech-writeup-likes');
        if (likedStored) {
            setLiked(new Set(JSON.parse(likedStored)));
        }
    }, []);

    useEffect(() => {
        if (selectedWriteup && stats[selectedWriteup.id]) {
            const newStats = { ...stats };
            newStats[selectedWriteup.id].views += 1;
            setStats(newStats);
            localStorage.setItem('tadstech-writeup-stats', JSON.stringify(newStats));
        }
    }, [selectedWriteup?.id]);

    const handleLike = (id: string) => {
        const isLiked = liked.has(id);
        const newLiked = new Set(liked);
        
        if (isLiked) {
            newLiked.delete(id);
        } else {
            newLiked.add(id);
        }
        
        setLiked(newLiked);
        localStorage.setItem('tadstech-writeup-likes', JSON.stringify(Array.from(newLiked)));

        const newStats = { ...stats };
        if (!newStats[id]) newStats[id] = { views: 0, likes: 0, shares: 0 };
        newStats[id].likes += isLiked ? -1 : 1;
        setStats(newStats);
        localStorage.setItem('tadstech-writeup-stats', JSON.stringify(newStats));
    };

    const downloadPDF = (writeup: Writeup) => {
        const element = document.createElement('div');
        element.innerHTML = `
            <div style="font-family: 'Monaco', 'Menlo', monospace; padding: 40px; line-height: 1.6; color: #000; background: #fff;">
                <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: bold;">${writeup.title}</h1>
                <p style="margin: 0 0 20px 0; color: #666; font-size: 12px;">
                    ${writeup.category.toUpperCase()} • ${new Date(writeup.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <div style="margin-top: 30px; color: #333; font-size: 14px; white-space: pre-wrap; word-wrap: break-word;">
                    ${writeup.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </div>
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
                    <p>By Michael Tunwashe | tadstech.web.app</p>
                    <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
        `;

        const opt = {
            margin: 10,
            filename: `${writeup.id}-${writeup.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
        };

        html2pdf().set(opt).from(element).save();

        const newStats = { ...stats };
        if (!newStats[writeup.id]) newStats[writeup.id] = { views: 0, likes: 0, shares: 0 };
        newStats[writeup.id].shares += 1;
        setStats(newStats);
        localStorage.setItem('tadstech-writeup-stats', JSON.stringify(newStats));
    };

    const handleShare = (writeup: Writeup) => {
        setShareModal({ open: true, writeupId: writeup.id, copied: false });
    };

    const handleCopyToClipboard = () => {
        if (!shareModal.writeupId) return;
        
        const writeup = writeups.find(w => w.id === shareModal.writeupId);
        if (!writeup) return;

        const url = `${window.location.origin}/writing?writeup=${writeup.id}`;
        navigator.clipboard.writeText(url).then(() => {
            setShareModal(prev => ({ ...prev, copied: true }));
            
            const newStats = { ...stats };
            if (!newStats[writeup.id]) newStats[writeup.id] = { views: 0, likes: 0, shares: 0 };
            newStats[writeup.id].shares += 1;
            setStats(newStats);
            localStorage.setItem('tadstech-writeup-stats', JSON.stringify(newStats));
            
            setTimeout(() => setShareModal(prev => ({ ...prev, copied: false })), 2000);
        });
    };

    const closeShareModal = () => {
        setShareModal({ open: false, writeupId: null, copied: false });
    };

    const selectWriteupHandler = (writeup: Writeup) => {
        setSelectedWriteup(writeup);
        window.history.pushState(null, '', `/writing?writeup=${writeup.id}`);
    };

    const deselectWriteupHandler = () => {
        setSelectedWriteup(null);
        window.history.pushState(null, '', '/writing');
    };

    const filteredWriteups = filter === 'all' 
        ? writeups 
        : writeups.filter(w => w.category === filter);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getCategoryColor = (category: string) => {
        switch(category) {
            case 'poem': return colorMode ? '#ec4899' : '#be123c';
            case 'blog': return colorMode ? '#8b5cf6' : '#6d28d9';
            case 'reflection': return colorMode ? '#f59e0b' : '#d97706';
            case 'note': return colorMode ? '#10b981' : '#059669';
            default: return accentColor;
        }
    };

    const toggleTheme = () => {
        setColorMode(prev => !prev);
        localStorage.setItem('tadstech-theme', colorMode ? 'gray' : 'blue');
    };

    return (
        <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden relative" style={{ color: 'white' }}>
            <Helmet>
                {selectedWriteup ? (
                    <>
                        <title>{selectedWriteup.title} | TADS Writing</title>
                        <meta name="description" content={selectedWriteup.excerpt} />
                        <meta name="keywords" content={selectedWriteup.tags.join(', ')} />
                        <meta name="author" content="Michael Tunwashe" />
                        <meta property="og:title" content={selectedWriteup.title} />
                        <meta property="og:description" content={selectedWriteup.excerpt} />
                        <meta property="og:url" content={`${window.location.origin}/writing?writeup=${selectedWriteup.id}`} />
                        <meta property="og:type" content="article" />
                        <meta name="twitter:title" content={selectedWriteup.title} />
                        <meta name="twitter:description" content={selectedWriteup.excerpt} />
                        <meta name="article:author" content="Michael Tunwashe" />
                        <meta name="article:published_time" content={new Date(selectedWriteup.timestamp).toISOString()} />
                        <meta name="article:tag" content={selectedWriteup.tags.join(', ')} />
                        <link rel="canonical" href={`${window.location.origin}/writing?writeup=${selectedWriteup.id}`} />
                    </>
                ) : (
                    <>
                        <title>Writing | TADS Portfolio</title>
                        <meta name="description" content="A collection of thoughts, poems, and reflections on data science, engineering, and personal growth." />
                        <meta name="keywords" content="writing, blog, poetry, data science, engineering, reflections" />
                        <meta name="author" content="Michael Tunwashe" />
                        <meta property="og:title" content="Writing | TADS Portfolio" />
                        <meta property="og:description" content="A collection of thoughts, poems, and reflections on data science, engineering, and personal growth." />
                        <meta property="og:url" content={`${window.location.origin}/writing`} />
                        <meta property="og:type" content="website" />
                        <meta name="twitter:title" content="Writing | TADS Portfolio" />
                        <meta name="twitter:description" content="A collection of thoughts, poems, and reflections on data science, engineering, and personal growth." />
                        <link rel="canonical" href={`${window.location.origin}/writing`} />
                    </>
                )}
            </Helmet>
            {/* Background grid */}
            <div className="fixed inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accentColor} 2px, ${accentColor} 4px)`,
                    backgroundSize: '100% 4px'
                }}></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b transition-colors duration-300" style={{ borderColor: accentColor }}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white transition-all border px-3 py-1.5 hover:shadow-lg"
                        style={{ borderColor: accentColor }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wider hidden sm:inline">Back</span>
                    </button>
                    <div className="text-center">
                        <h1 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: accentColor }}>WRITEUPS</h1>
                        <p className="text-[10px] text-white/50">Thoughts, poems & reflections</p>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center text-white transition-all border p-2 hover:shadow-lg"
                        style={{ borderColor: accentColor }}
                        title="Toggle theme"
                    >
                        <Palette className="h-4 w-4" />
                    </button>
                </div>
            </nav>

            <div className="pt-24 pb-20">
                {!selectedWriteup ? (
                    <section className="max-w-7xl mx-auto px-4">
                        <div className="mb-12 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: accentColor }}>
                                {'>'} THOUGHTS.explore()
                            </h2>
                            <p className="text-white/70 max-w-2xl leading-relaxed">
                                A collection of my innermost thoughts
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {(['all', 'blog', 'poem', 'reflection', 'note'] as const).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className="px-4 py-2 text-xs uppercase tracking-wider transition-all border"
                                    style={{
                                        borderColor: filter === cat ? accentColor : `${accentColor}40`,
                                        backgroundColor: filter === cat ? accentColor : 'transparent',
                                        color: filter === cat ? (colorMode ? '#000' : '#fff') : 'white'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max">
                            {filteredWriteups.map((writeup) => (
                                <div
                                    key={writeup.id}
                                    onClick={() => selectWriteupHandler(writeup)}
                                    className="border p-6 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
                                    style={{ borderColor: accentColor }}
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                         style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>
                                    
                                    <div className="relative z-10 space-y-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                    <span
                                                        className="text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider font-bold border"
                                                        style={{
                                                            backgroundColor: `${getCategoryColor(writeup.category)}20`,
                                                            borderColor: getCategoryColor(writeup.category),
                                                            color: getCategoryColor(writeup.category)
                                                        }}
                                                    >
                                                        {writeup.category}
                                                    </span>
                                                    <span className="text-[10px] text-white/50 font-mono">
                                                        {formatDate(writeup.timestamp)} • {formatTime(writeup.timestamp)}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform truncate">
                                                    {writeup.title}
                                                </h3>
                                                <p className="text-sm text-white/70 line-clamp-2">
                                                    {writeup.excerpt}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${accentColor}30` }}>
                                            <div className="flex items-center gap-4 text-[10px] text-white/50 font-mono">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {writeup.readTime} min
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {stats[writeup.id]?.views || 0}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-white/50">
                                                <span className="flex items-center gap-1">
                                                    <Heart className="h-3 w-3" fill={liked.has(writeup.id) ? accentColor : 'none'} style={{ color: liked.has(writeup.id) ? accentColor : 'inherit' }} />
                                                    {stats[writeup.id]?.likes || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredWriteups.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-white/50">No writeups found in this category.</p>
                            </div>
                        )}
                    </section>
                ) : (
                    <section className="max-w-4xl mx-auto px-4">
                        <button
                            onClick={deselectWriteupHandler}
                            className="mb-8 flex items-center gap-2 text-white transition-all border px-4 py-2 hover:shadow-lg"
                            style={{ borderColor: accentColor }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider">Back to list</span>
                        </button>

                        <article className="border p-8 bg-black/50 backdrop-blur-sm relative overflow-hidden group"
                                 style={{ borderColor: accentColor }}>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                                 style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)` }}></div>

                            <div className="relative z-10 space-y-6">
                                <div className="space-y-4 pb-6 border-b" style={{ borderColor: `${accentColor}30` }}>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span
                                            className="text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider font-bold border"
                                            style={{
                                                backgroundColor: `${getCategoryColor(selectedWriteup.category)}20`,
                                                borderColor: getCategoryColor(selectedWriteup.category),
                                                color: getCategoryColor(selectedWriteup.category)
                                            }}
                                        >
                                            {selectedWriteup.category}
                                        </span>
                                    </div>

                                    <h1 className="text-3xl md:text-4xl font-bold">
                                        {selectedWriteup.title}
                                    </h1>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-white/60 font-mono">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(selectedWriteup.timestamp)} • {formatTime(selectedWriteup.timestamp)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{selectedWriteup.readTime} min read</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            <span>{stats[selectedWriteup.id]?.views || 0} views</span>
                                        </div>
                                    </div>

                                    {selectedWriteup.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {selectedWriteup.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] border px-2 py-1 rounded-sm"
                                                    style={{
                                                        borderColor: `${accentColor}40`,
                                                        color: accentColor
                                                    }}
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-4">
                                    {selectedWriteup.content.split('\n\n').map((paragraph, i) => (
                                        <p key={i} className="whitespace-pre-wrap">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <div className="pt-6 border-t flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between" style={{ borderColor: `${accentColor}30` }}>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleLike(selectedWriteup.id)}
                                            className="flex items-center gap-2 px-4 py-2 border transition-all hover:shadow-lg"
                                            style={{
                                                borderColor: liked.has(selectedWriteup.id) ? accentColor : `${accentColor}40`,
                                                backgroundColor: liked.has(selectedWriteup.id) ? `${accentColor}20` : 'transparent'
                                            }}
                                        >
                                            <Heart
                                                className="h-4 w-4"
                                                fill={liked.has(selectedWriteup.id) ? accentColor : 'none'}
                                                style={{ color: liked.has(selectedWriteup.id) ? accentColor : 'white' }}
                                            />
                                            <span className="text-xs uppercase tracking-wider">
                                                {stats[selectedWriteup.id]?.likes || 0}
                                            </span>
                                        </button>

                                        <button
                                            onClick={() => handleShare(selectedWriteup)}
                                            className="flex items-center gap-2 px-4 py-2 border transition-all hover:shadow-lg"
                                            style={{ borderColor: `${accentColor}40` }}
                                        >
                                            <Share2 className="h-4 w-4" />
                                            <span className="text-xs uppercase tracking-wider">
                                                {stats[selectedWriteup.id]?.shares || 0}
                                            </span>
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => downloadPDF(selectedWriteup)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 border transition-all hover:shadow-lg"
                                        style={{ borderColor: `${accentColor}40` }}
                                    >
                                        <Download className="h-4 w-4" />
                                        <span className="text-xs uppercase tracking-wider">Download PDF</span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    </section>
                )}
            </div>

            {shareModal.open && shareModal.writeupId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-black border p-6 max-w-md w-full" style={{ borderColor: accentColor }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold" style={{ color: accentColor }}>Share Writeup</h3>
                            <button
                                onClick={closeShareModal}
                                className="text-white/50 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <p className="text-sm text-white/70 mb-4">Copy the link to share this writeup:</p>
                        
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                value={`${window.location.origin}/writing?writeup=${shareModal.writeupId}`}
                                readOnly
                                className="flex-1 bg-white/5 border px-3 py-2 text-sm text-white font-mono"
                                style={{ borderColor: `${accentColor}40` }}
                            />
                            <button
                                onClick={handleCopyToClipboard}
                                className="flex items-center gap-2 px-4 py-2 border transition-all hover:shadow-lg"
                                style={{ 
                                    borderColor: shareModal.copied ? accentColor : `${accentColor}40`,
                                    backgroundColor: shareModal.copied ? `${accentColor}20` : 'transparent'
                                }}
                            >
                                <Copy className="h-4 w-4" />
                                <span className="text-xs uppercase tracking-wider">
                                    {shareModal.copied ? 'Copied!' : 'Copy'}
                                </span>
                            </button>
                        </div>

                        <button
                            onClick={closeShareModal}
                            className="w-full px-4 py-2 border text-sm uppercase tracking-wider transition-all hover:shadow-lg"
                            style={{ borderColor: `${accentColor}40` }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
