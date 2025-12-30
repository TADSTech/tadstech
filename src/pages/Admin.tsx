import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { getAllPosts, deletePost, updatePost, type BlogPost } from '../services/blogService';
import { PlusCircle, Edit2, Trash2, Eye, Heart, Share2, LogOut, FileText } from 'lucide-react';

export const Admin: React.FC = () => {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const allPosts = await getAllPosts(true);
            setPosts(allPosts);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            await deletePost(id);
            setPosts(posts.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        }
    };

    const handleTogglePublish = async (post: BlogPost) => {
        try {
            await updatePost(post.id, { isPublished: !post.isPublished });
            setPosts(posts.map(p => p.id === post.id ? { ...p, isPublished: !p.isPublished } : p));
        } catch (error) {
            console.error('Error toggling publish status:', error);
            alert('Failed to update post');
        }
    };

    const handleSignOut = async () => {
        if (confirm('Sign out?')) {
            await signOut();
            navigate('/');
        }
    };

    const filteredPosts = posts.filter(post => {
        if (filter === 'published') return post.isPublished;
        if (filter === 'draft') return !post.isPublished;
        return true;
    });

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            <Helmet>
                <title>Admin Dashboard | TADS</title>
            </Helmet>

            <nav className="border-b border-white/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold">{'\u003e'} ADMIN.dashboard()</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                            View Site
                        </button>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-4 py-2 border border-white/40 hover:border-white hover:bg-white/10 transition-all text-sm"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Blog Posts</h2>
                        <p className="text-white/70 text-sm">Manage your blog content</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/editor')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 transition-all font-bold uppercase tracking-wider text-sm"
                    >
                        <PlusCircle className="h-5 w-5" />
                        New Post
                    </button>
                </div>

                <div className="flex gap-2 mb-6">
                    {(['all', 'published', 'draft'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 text-xs uppercase tracking-wider transition-all border ${filter === f
                                ? 'border-white bg-white text-black'
                                : 'border-white/40 hover:border-white'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-12 text-white/70">Loading posts...</div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-12 border border-white/20 bg-white/5">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-white/30" />
                        <p className="text-white/70">No posts found</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className="border border-white/20 p-6 bg-black/50 backdrop-blur-sm hover:border-white/40 transition-all"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span
                                                className={`text-xs px-2 py-1 border ${post.isPublished
                                                    ? 'border-green-500 text-green-500 bg-green-500/10'
                                                    : 'border-yellow-500 text-yellow-500 bg-yellow-500/10'
                                                    } uppercase tracking-wider`}
                                            >
                                                {post.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                            <span className="text-xs text-white/50">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                        <p className="text-sm text-white/70 mb-4 line-clamp-2">{post.excerpt}</p>
                                        <div className="flex items-center gap-4 text-xs text-white/50">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {post.views || 0}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Heart className="h-3 w-3" />
                                                {post.likes || 0}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Share2 className="h-3 w-3" />
                                                {post.shares || 0}
                                            </span>
                                            <span>
                                                {new Date(post.publishedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-col gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/editor/${post.id}`)}
                                            className="flex items-center gap-2 px-4 py-2 border border-white/40 hover:border-white hover:bg-white/10 transition-all text-sm flex-1 lg:flex-initial justify-center"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleTogglePublish(post)}
                                            className="px-4 py-2 border border-white/40 hover:border-white hover:bg-white/10 transition-all text-sm flex-1 lg:flex-initial"
                                        >
                                            {post.isPublished ? 'Unpublish' : 'Publish'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="flex items-center gap-2 px-4 py-2 border border-red-500/40 text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-all text-sm flex-1 lg:flex-initial justify-center"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="hidden sm:inline">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
