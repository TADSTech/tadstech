import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Search, X, Heart, Share2, Calendar, Clock, Eye, Download, Palette, TreePine, Copy, Check } from 'lucide-react';
import { getAllPosts, incrementViews, toggleLike, incrementShares, type BlogPost } from '../services/blogService';
import { BlogReader } from '../components/blog/BlogReader';
import html2pdf from 'html2pdf.js';

type FilterType = 'all' | 'poem' | 'blog' | 'reflection' | 'note';
type FontSize = 'small' | 'medium' | 'large' | 'xl';

const FONT_SIZES = {
    small: '16px',
    medium: '18px',
    large: '20px',
    xl: '24px',
};

export const Writing: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug?: string }>();

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [fontSize, setFontSize] = useState<FontSize>(() => {
        const saved = localStorage.getItem('tadstech-font-size');
        return (saved as FontSize) || 'large';
    });
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('tadstech-theme');
        return saved ? saved === 'blue' : false;
    });
    const [holidayMode, setHolidayMode] = useState(() => {
        const now = new Date();
        const isHolidaySeason = now.getMonth() === 11 && now.getDate() <= 29;
        const saved = localStorage.getItem('tadstech-holiday');
        return saved !== null ? saved === 'true' : isHolidaySeason;
    });
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

    const holidayColors = ['#dc2626', '#16a34a'];
    const getHolidayColor = () => holidayColors[Math.floor(Date.now() / 1000) % 2];
    const accentColor = holidayMode ? getHolidayColor() : (colorMode ? '#0ea5e9' : '#28333F');

    useEffect(() => {
        loadPosts();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (slug && posts.length > 0) {
            const post = posts.find(p => p.slug === slug);
            if (post) {
                setSelectedPost(post);
                incrementViews(post.id);
            }
        } else {
            setSelectedPost(null);
        }
    }, [slug, posts]);

    useEffect(() => {
        localStorage.setItem('tadstech-font-size', fontSize);
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem('tadstech-theme', colorMode ? 'blue' : 'gray');
    }, [colorMode]);

    useEffect(() => {
        const stored = localStorage.getItem('tadstech-liked-posts');
        if (stored) {
            setLikedPosts(new Set(JSON.parse(stored)));
        }
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const allPosts = await getAllPosts();
            setPosts(allPosts);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch =
            debouncedSearch === '' ||
            post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            post.content.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));

        const matchesCategory = filter === 'all' || post.category === filter;

        return matchesSearch && matchesCategory;
    });

    const handlePostClick = (post: BlogPost) => {
        navigate(`/writing/${post.slug}`);
    };

    const handleBackClick = () => {
        navigate('/writing');
    };

    const handleLike = async (postId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const isLiked = likedPosts.has(postId);

        if (isLiked) {
            likedPosts.delete(postId);
        } else {
            likedPosts.add(postId);
            await toggleLike(postId, true);
        }

        setLikedPosts(new Set(likedPosts));
        localStorage.setItem('tadstech-liked-posts', JSON.stringify([...likedPosts]));

        setPosts(posts.map(p =>
            p.id === postId
                ? { ...p, likes: isLiked ? Math.max(0, (p.likes ?? 0) - 1) : (p.likes ?? 0) + 1 }
                : p
        ));
    };

    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [shareCopied, setShareCopied] = useState(false);

    const handleShare = async (post: BlogPost, e: React.MouseEvent) => {
        e.stopPropagation();
        const url = `${window.location.origin}/writing/${post.slug}`;
        setShareUrl(url);
        setShareModalOpen(true);

        await incrementShares(post.id);
        setPosts(posts.map(p => p.id === post.id ? { ...p, shares: (p.shares ?? 0) + 1 } : p));
    };

    const copyShareUrl = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleDownload = async (post: BlogPost) => {
        const themeColor = colorMode ? '#0ea5e9' : '#28333F';

        const element = document.createElement('div');
        element.innerHTML = `
            <div style="
                padding: 60px 40px;
                font-family: 'Georgia', 'Times New Roman', serif;
                background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                color: #ffffff;
                min-height: 100vh;
            ">
                <!-- Header -->
                <div style="
                    border-left: 6px solid ${themeColor};
                    padding-left: 20px;
                    margin-bottom: 40px;
                ">
                    <h1 style="
                        font-size: 42px;
                        margin: 0 0 15px 0;
                        font-weight: bold;
                        color: #ffffff;
                        line-height: 1.2;
                    ">${post.title}</h1>
                    <div style="
                        font-size: 14px;
                        color: #999999;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        margin-bottom: 10px;
                    ">
                        ${post.category} • ${new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}
                    </div>
                    <div style="
                        font-size: 14px;
                        color: #666666;
                    ">
                        ${post.readTime} min read
                    </div>
                </div>

                <!-- Excerpt -->
                ${post.excerpt ? `
                <div style="
                    background: rgba(255, 255, 255, 0.05);
                    border-left: 4px solid ${themeColor};
                    padding: 20px 25px;
                    margin-bottom: 40px;
                    font-style: italic;
                    font-size: 18px;
                    line-height: 1.6;
                    color: #cccccc;
                ">
                    ${post.excerpt}
                </div>
                ` : ''}

                <!-- Content -->
                <div style="
                    font-size: 16px;
                    line-height: 1.8;
                    color: #e0e0e0;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                ">
                    ${post.content.split('\n').map(paragraph =>
            paragraph.trim()
                ? `<p style="margin: 0 0 20px 0;">${paragraph}</p>`
                : ''
        ).join('')}
                </div>

                <!-- Footer -->
                <div style="
                    margin-top: 60px;
                    padding-top: 30px;
                    border-top: 2px solid ${themeColor};
                    text-align: center;
                    color: #666666;
                    font-size: 12px;
                ">
                    <div style="margin-bottom: 10px;">
                        <strong style="color: ${themeColor};">TADS TECH</strong>
                    </div>
                    <div>
                        Generated from tadstech.com/writing/${post.slug}
                    </div>
                    <div style="margin-top: 10px;">
                        © ${new Date().getFullYear()} Michael Tunwashe. All rights reserved.
                    </div>
                </div>
            </div>
        `;

        const opt = {
            margin: 0,
            filename: `${post.slug}.pdf`,
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: {
                scale: 2,
                backgroundColor: '#000000',
                logging: false
            },
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'portrait' as const,
                compress: true
            }
        };

        html2pdf().set(opt).from(element).save();
    };

    const handleThemeToggle = () => {
        setColorMode(prev => {
            const newValue = !prev;
            localStorage.setItem('tadstech-theme', newValue ? 'blue' : 'gray');
            return newValue;
        });
    };

    const handleHolidayToggle = () => {
        setHolidayMode(prev => {
            const newValue = !prev;
            localStorage.setItem('tadstech-holiday', String(newValue));
            return newValue;
        });
    };

    const getCategoryLabel = (cat: string) => {
        return cat.charAt(0).toUpperCase() + cat.slice(1) + 's';
    };

    if (selectedPost) {
        return (
            <div className="min-h-screen bg-black text-white font-mono" style={{ fontSize: FONT_SIZES[fontSize] }}>
                <Helmet>
                    <title>{selectedPost.title} | TADS</title>
                    <meta name="description" content={selectedPost.excerpt} />
                </Helmet>

                <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
                        <button
                            onClick={handleBackClick}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                            style={{
                                boxShadow: `0 0 20px ${accentColor}20, 0 0 40px ${accentColor}10`
                            }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back</span>
                        </button>

                        <div className="flex items-center gap-2">
                            {(['small', 'medium', 'large', 'xl'] as FontSize[]).map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setFontSize(size)}
                                    className={`px-3 py-2 rounded-lg text-xs uppercase tracking-wider transition-all duration-300 ${fontSize === size
                                        ? 'bg-white/20 border-white/40'
                                        : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                                        } border`}
                                    style={fontSize === size ? {
                                        boxShadow: `0 0 20px ${accentColor}30, 0 0 40px ${accentColor}15`
                                    } : {}}
                                >
                                    {size[0]}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleLike(selectedPost.id, { stopPropagation: () => { } } as any)}
                                className={`p-2 rounded-xl border transition-all duration-300 ${likedPosts.has(selectedPost.id)
                                    ? 'border-red-500/50 bg-red-500/10'
                                    : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                                    }`}
                            >
                                <Heart className={`h-4 w-4 ${likedPosts.has(selectedPost.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                            <button
                                onClick={(e) => handleShare(selectedPost, e)}
                                className="p-2 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                            >
                                <Share2 className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => handleDownload(selectedPost)}
                                className="p-2 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                            >
                                <Download className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4 border ${selectedPost.category === 'poem' ? 'border-purple-500/50 bg-purple-500/10 text-purple-400' :
                                selectedPost.category === 'reflection' ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' :
                                    selectedPost.category === 'note' ? 'border-green-500/50 bg-green-500/10 text-green-400' :
                                        'border-orange-500/50 bg-orange-500/10 text-orange-400'
                                }`}>
                                {selectedPost.category}
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">{selectedPost.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(selectedPost.publishedAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {selectedPost.readTime} min read
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Eye className="h-4 w-4" />
                                    {selectedPost.views}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Heart className="h-4 w-4" />
                                    {selectedPost.likes}
                                </span>
                            </div>
                        </div>

                        <BlogReader post={selectedPost} />
                    </div>
                </div>

                {/* Share Modal */}
                {shareModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
                        onClick={() => setShareModalOpen(false)}
                    >
                        <div
                            className="bg-black border rounded-2xl p-8 max-w-md w-full mx-4 relative"
                            style={{
                                borderColor: accentColor,
                                boxShadow: `0 0 40px ${accentColor}30, 0 0 80px ${accentColor}15`
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShareModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <h3 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>
                                Share Post
                            </h3>

                            <p className="text-sm text-white/70 mb-4">
                                Copy the link below to share this post:
                            </p>

                            <div className="flex gap-2 mb-6">
                                <input
                                    type="text"
                                    value={shareUrl}
                                    readOnly
                                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-sm text-white/90 focus:outline-none"
                                />
                                <button
                                    onClick={copyShareUrl}
                                    className="px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 hover:scale-105"
                                    style={{
                                        borderColor: accentColor,
                                        backgroundColor: shareCopied ? accentColor : 'transparent',
                                        color: shareCopied && colorMode ? 'black' : 'white',
                                        boxShadow: shareCopied ? `0 0 20px ${accentColor}50` : ''
                                    }}
                                >
                                    {shareCopied ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            <span className="text-sm">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            <span className="text-sm">Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="text-xs text-white/50 text-center">
                                Link copied to clipboard automatically increments share count
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-mono" style={{ fontSize: FONT_SIZES[fontSize] }}>
            <Helmet>
                <title>Writing | TADS</title>
                <meta name="description" content="Thoughts, reflections, and creative writing by Michael Tunwashe" />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{'\u003e'} WRITING.index()</h1>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Thoughts, reflections, poems, and notes on technology, life, and everything in between.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleThemeToggle}
                                className="p-3 rounded-xl border transition-all duration-300 hover:scale-105"
                                style={{
                                    borderColor: accentColor,
                                    backgroundColor: colorMode ? accentColor : 'transparent',
                                    boxShadow: `0 0 20px ${accentColor}40, 0 0 40px ${accentColor}20`
                                }}
                                title={`Toggle color theme (Current: ${colorMode ? 'Blue' : 'B&W'})`}
                            >
                                <Palette className="h-5 w-5" style={{ color: colorMode ? 'black' : 'white' }} />
                            </button>
                            <button
                                onClick={handleHolidayToggle}
                                className="p-3 rounded-xl border transition-all duration-300 hover:scale-105"
                                style={{
                                    borderColor: holidayMode ? getHolidayColor() : '#ffffff40',
                                    backgroundColor: holidayMode ? '#16a34a' : 'transparent',
                                    boxShadow: holidayMode ? `0 0 20px ${getHolidayColor()}40, 0 0 40px ${getHolidayColor()}20` : ''
                                }}
                                title={`Toggle holiday mode (${holidayMode ? 'ON' : 'OFF'})`}
                            >
                                <TreePine className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search posts, tags, or content..."
                                className="w-full pl-12 pr-12 py-4 bg-white/5 border rounded-2xl text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all duration-300 backdrop-blur-md"
                                style={{
                                    borderColor: searchQuery ? accentColor : 'rgba(255, 255, 255, 0.2)',
                                    boxShadow: searchQuery ? `0 0 30px ${accentColor}40, 0 0 60px ${accentColor}20` : ''
                                }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-all duration-300"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {(['all', 'blog', 'poem', 'reflection', 'note'] as FilterType[]).map((cat) => {
                                const count = cat === 'all'
                                    ? posts.length
                                    : posts.filter(p => p.category === cat).length;

                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className="px-4 py-2 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 border hover:scale-105"
                                        style={filter === cat ? {
                                            backgroundColor: accentColor,
                                            borderColor: accentColor,
                                            color: colorMode ? 'black' : 'white',
                                            boxShadow: `0 0 20px ${accentColor}50, 0 0 40px ${accentColor}25`
                                        } : {
                                            borderColor: 'rgba(255, 255, 255, 0.2)',
                                            color: 'white'
                                        }}
                                    >
                                        {cat === 'all' ? 'All' : getCategoryLabel(cat)} ({count})
                                    </button>
                                );
                            })}
                        </div>

                        {(searchQuery || filter !== 'all') && (
                            <div className="text-sm text-white/60">
                                Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-sm text-white/60">
                        <span>Font size:</span>
                        {(['small', 'medium', 'large', 'xl'] as FontSize[]).map((size) => (
                            <button
                                key={size}
                                onClick={() => setFontSize(size)}
                                className="px-3 py-1 rounded-lg text-xs uppercase tracking-wider transition-all duration-300 border hover:scale-105"
                                style={fontSize === size ? {
                                    backgroundColor: accentColor,
                                    borderColor: accentColor,
                                    color: colorMode ? 'black' : 'white',
                                    boxShadow: `0 0 15px ${accentColor}50`
                                } : {
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white'
                                }}
                            >
                                {size[0]}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-white/60">Loading posts...</div>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <p className="text-xl text-white/70 mb-2">No posts found</p>
                        <p className="text-sm text-white/50">Try adjusting your search or filter</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                onClick={() => handlePostClick(post)}
                                className="group cursor-pointer rounded-2xl border bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = accentColor;
                                    e.currentTarget.style.boxShadow = `0 0 30px ${accentColor}30, 0 0 60px ${accentColor}15, 0 8px 30px rgba(0, 0, 0, 0.4)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.3)`;
                                }}
                            >
                                <div className="mb-4">
                                    <span className={`inline-block px-2 py-1 rounded-lg text-xs uppercase tracking-wider border ${post.category === 'poem' ? 'border-purple-500/50 bg-purple-500/10 text-purple-400' :
                                        post.category === 'reflection' ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' :
                                            post.category === 'note' ? 'border-green-500/50 bg-green-500/10 text-green-400' :
                                                'border-orange-500/50 bg-orange-500/10 text-orange-400'
                                        }`}>
                                        {post.category}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold mb-3 leading-tight group-hover:text-white/90 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-sm text-white/70 mb-4 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-3 w-3" />
                                            {post.views}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Heart className="h-3 w-3" />
                                            {post.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {post.readTime}m
                                        </span>
                                    </div>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                                    <button
                                        onClick={(e) => handleLike(post.id, e)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${likedPosts.has(post.id)
                                            ? 'border-red-500/50 bg-red-500/10 text-red-400'
                                            : 'border-white/20 hover:border-white/30 hover:bg-white/5'
                                            }`}
                                    >
                                        <Heart className={`h-3 w-3 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                        <span className="text-xs">Like</span>
                                    </button>
                                    <button
                                        onClick={(e) => handleShare(post, e)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-white/20 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                                    >
                                        <Share2 className="h-3 w-3" />
                                        <span className="text-xs">Share</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* Share Modal */}
            {shareModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
                    onClick={() => setShareModalOpen(false)}
                >
                    <div
                        className="bg-black border rounded-2xl p-8 max-w-md w-full mx-4 relative"
                        style={{
                            borderColor: accentColor,
                            boxShadow: `0 0 40px ${accentColor}30, 0 0 80px ${accentColor}15`
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShareModalOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <h3 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>
                            Share Post
                        </h3>

                        <p className="text-sm text-white/70 mb-4">
                            Copy the link below to share this post:
                        </p>

                        <div className="flex gap-2 mb-6">
                            <input
                                type="text"
                                value={shareUrl}
                                readOnly
                                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-sm text-white/90 focus:outline-none"
                            />
                            <button
                                onClick={copyShareUrl}
                                className="px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 hover:scale-105"
                                style={{
                                    borderColor: accentColor,
                                    backgroundColor: shareCopied ? accentColor : 'transparent',
                                    color: shareCopied && colorMode ? 'black' : 'white',
                                    boxShadow: shareCopied ? `0 0 20px ${accentColor}50` : ''
                                }}
                            >
                                {shareCopied ? (
                                    <>
                                        <Check className="h-4 w-4" />
                                        <span className="text-sm">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4" />
                                        <span className="text-sm">Copy</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="text-xs text-white/50 text-center">
                            Link copied to clipboard automatically increments share count
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
