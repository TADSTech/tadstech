import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import slugify from 'slugify';
import { ArrowLeft, Save, Eye, Upload } from 'lucide-react';
import { createPost, updatePost, getAllPosts } from '../services/blogService';
import { MarkdownEditor } from '../components/admin/MarkdownEditor';
import { ImageUploader } from '../components/admin/ImageUploader';

export const AdminEditor: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [loading, setLoading] = useState(false);
    const [showImageUploader, setShowImageUploader] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'blog' as 'poem' | 'blog' | 'reflection' | 'note',
        tags: [] as string[],
        tagInput: '',
        readTime: 5,
        isPublished: false,
        seoTitle: '',
        seoDescription: '',
        ogImageUrl: '',
    });

    useEffect(() => {
        if (id) {
            loadPost();
        }
    }, [id]);

    const loadPost = async () => {
        if (!id) return;

        try {
            setLoading(true);
            const posts = await getAllPosts(true);
            const post = posts.find(p => p.id === id);

            if (post) {
                setFormData({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    category: post.category,
                    tags: post.tags,
                    tagInput: '',
                    readTime: post.readTime,
                    isPublished: post.isPublished,
                    seoTitle: post.seoTitle || '',
                    seoDescription: post.seoDescription || '',
                    ogImageUrl: post.ogImageUrl || '',
                });
            }
        } catch (error) {
            console.error('Error loading post:', error);
            alert('Failed to load post');
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: slugify(title, { lower: true, strict: true }),
        });
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = formData.tagInput.trim();
            if (tag && !formData.tags.includes(tag)) {
                setFormData({
                    ...formData,
                    tags: [...formData.tags, tag],
                    tagInput: '',
                });
            }
        }
    };

    const handleRemoveTag = (tag: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(t => t !== tag),
        });
    };

    const handleImageInsert = (markdown: string) => {
        setFormData({
            ...formData,
            content: formData.content + '\n\n' + markdown,
        });
        setShowImageUploader(false);
    };

    const handleSave = async (publish: boolean) => {
        if (!formData.title || !formData.content) {
            alert('Please fill in title and content');
            return;
        }

        try {
            setLoading(true);
            const postData = {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt || formData.content.substring(0, 200),
                content: formData.content,
                category: formData.category,
                tags: formData.tags,
                readTime: formData.readTime,
                publishedAt: new Date(),
                isPublished: publish,
                seoTitle: formData.seoTitle || formData.title,
                seoDescription: formData.seoDescription || formData.excerpt,
                ogImageUrl: formData.ogImageUrl,
            };

            if (id) {
                await updatePost(id, postData);
            } else {
                await createPost(postData);
            }

            navigate('/admin');
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            <Helmet>
                <title>{id ? 'Edit Post' : 'New Post'} | Admin</title>
            </Helmet>

            <nav className="border-b border-white/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back to Dashboard</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleSave(false)}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 border border-white/40 hover:border-white hover:bg-white/10 transition-all text-sm disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            Save Draft
                        </button>
                        <button
                            onClick={() => handleSave(true)}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-white/90 transition-all text-sm disabled:opacity-50 font-bold"
                        >
                            <Eye className="h-4 w-4" />
                            Publish
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider mb-2 text-white/70">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-white/40"
                                placeholder="Enter post title..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider mb-2 text-white/70">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full bg-black/50 border border-white/20 p-3 text-white font-mono text-sm focus:outline-none focus:border-white/40"
                                placeholder="post-slug"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider mb-2 text-white/70">
                                Excerpt
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-white/40 resize-none"
                                rows={3}
                                placeholder="Brief description..."
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs uppercase tracking-wider text-white/70">
                                    Content * (Markdown)
                                </label>
                                <button
                                    onClick={() => setShowImageUploader(!showImageUploader)}
                                    className="flex items-center gap-2 px-3 py-1 border border-white/40 hover:border-white hover:bg-white/10 transition-all text-xs"
                                >
                                    <Upload className="h-3 w-3" />
                                    {showImageUploader ? 'Hide' : 'Show'} Image Uploader
                                </button>
                            </div>

                            {showImageUploader && (
                                <div className="mb-4">
                                    <ImageUploader
                                        onImageInsert={handleImageInsert}
                                        blogPostId={id}
                                    />
                                </div>
                            )}

                            <div className="h-[600px]">
                                <MarkdownEditor
                                    value={formData.content}
                                    onChange={(content) => setFormData({ ...formData, content })}
                                    onImageClick={() => setShowImageUploader(true)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border border-white/20 p-6 bg-black/50 space-y-6">
                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2 text-white/70">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                    className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-white/40"
                                >
                                    <option value="blog">Blog</option>
                                    <option value="poem">Poem</option>
                                    <option value="reflection">Reflection</option>
                                    <option value="note">Note</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2 text-white/70">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    value={formData.tagInput}
                                    onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                                    onKeyDown={handleAddTag}
                                    className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-white/40"
                                    placeholder="Type and press Enter..."
                                />
                                {formData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {formData.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center gap-2 px-2 py-1 bg-white/10 border border-white/20 text-xs"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="text-white/50 hover:text-white"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2 text-white/70">
                                    Read Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-black/50 border border-white/20 p-3 text-white focus:outline-none focus:border-white/40"
                                    min="1"
                                />
                            </div>
                        </div>

                        <div className="border border-white/20 p-6 bg-black/50 space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider">SEO</h3>

                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2 text-white/70">
                                    SEO Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.seoTitle}
                                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 p-3 text-white text-sm focus:outline-none focus:border-white/40"
                                    placeholder="Defaults to title"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2 text-white/70">
                                    SEO Description
                                </label>
                                <textarea
                                    value={formData.seoDescription}
                                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 p-3 text-white text-sm focus:outline-none focus:border-white/40 resize-none"
                                    rows={3}
                                    placeholder="Defaults to excerpt"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2 text-white/70">
                                    OG Image URL
                                </label>
                                <input
                                    type="text"
                                    value={formData.ogImageUrl}
                                    onChange={(e) => setFormData({ ...formData, ogImageUrl: e.target.value })}
                                    className="w-full bg-black/50 border border-white/20 p-3 text-white text-sm focus:outline-none focus:border-white/40"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
