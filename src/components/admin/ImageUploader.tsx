import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { uploadImage, deleteImage, type BlogImage } from '../../services/imageService';
import { Upload, X, Copy, Check, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
    onImageInsert: (markdown: string) => void;
    blogPostId?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageInsert, blogPostId }) => {
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<BlogImage[]>([]);
    const [copiedId, setCopiedId] = useState<string>('');
    const [dragActive, setDragActive] = useState(false);

    const handleUpload = async (file: File) => {
        if (!user?.email) return;

        try {
            setUploading(true);
            const image = await uploadImage(file, user.email, blogPostId);
            setImages([...images, image]);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(f => f.type.startsWith('image/'));

        if (imageFiles.length > 0) {
            handleUpload(imageFiles[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleUpload(files[0]);
        }
    };

    const copyMarkdown = (image: BlogImage) => {
        const markdown = `![${image.altText}](${image.imageData})`;
        navigator.clipboard.writeText(markdown);
        setCopiedId(image.id);
        setTimeout(() => setCopiedId(''), 2000);
    };

    const insertMarkdown = (image: BlogImage) => {
        const markdown = `![${image.altText}](${image.imageData})`;
        onImageInsert(markdown);
    };

    const handleDelete = async (image: BlogImage) => {
        if (!confirm('Delete this image?')) return;

        try {
            await deleteImage(image.id);
            setImages(images.filter(img => img.id !== image.id));
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete image');
        }
    };

    return (
        <div className="space-y-4">
            <div
                className={`border-2 border-dashed p-8 text-center transition-all ${dragActive
                    ? 'border-white bg-white/10'
                    : 'border-white/40 hover:border-white/60'
                    }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={uploading}
                />
                <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                >
                    {uploading ? (
                        <>
                            <div className="h-12 w-12 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <p className="text-sm text-white/70">Uploading...</p>
                        </>
                    ) : (
                        <>
                            <Upload className="h-12 w-12 text-white/50" />
                            <div>
                                <p className="text-sm font-bold mb-1">Click to upload or drag and drop</p>
                                <p className="text-xs text-white/50">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </>
                    )}
                </label>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="border border-white/20 bg-black/50 overflow-hidden group relative"
                        >
                            <img
                                src={image.imageData}
                                alt={image.altText}
                                className="w-full h-32 object-cover"
                            />
                            <div className="p-2 space-y-2">
                                <p className="text-xs text-white/70 truncate">{image.altText}</p>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => insertMarkdown(image)}
                                        className="flex-1 px-2 py-1 border border-white/40 hover:border-white hover:bg-white/10 transition-all text-xs flex items-center justify-center gap-1"
                                        title="Insert into editor"
                                    >
                                        <ImageIcon className="h-3 w-3" />
                                        Insert
                                    </button>
                                    <button
                                        onClick={() => copyMarkdown(image)}
                                        className="flex-1 px-2 py-1 border border-white/40 hover:border-white hover:bg-white/10 transition-all text-xs flex items-center justify-center gap-1"
                                        title="Copy markdown"
                                    >
                                        {copiedId === image.id ? (
                                            <><Check className="h-3 w-3" /> Copied</>
                                        ) : (
                                            <><Copy className="h-3 w-3" /> Copy</>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(image)}
                                        className="px-2 py-1 border border-red-500/40 text-red-500 hover:border-red-500 hover:bg-red-500/10 transition-all text-xs"
                                        title="Delete image"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
