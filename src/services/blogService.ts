import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    increment
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: 'poem' | 'blog' | 'reflection' | 'note';
    tags: string[];
    readTime: number;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
    seoTitle?: string;
    seoDescription?: string;
    ogImageUrl?: string;
    views?: number;
    likes?: number;
    shares?: number;
}

interface FirestoreBlogPost extends Omit<BlogPost, 'id' | 'publishedAt' | 'createdAt' | 'updatedAt'> {
    publishedAt: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

const COLLECTION_NAME = 'blog_posts';

const convertTimestamps = (data: FirestoreBlogPost & { id: string }): BlogPost => {
    return {
        ...data,
        publishedAt: data.publishedAt.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
    };
};

export const getAllPosts = async (includeUnpublished = false): Promise<BlogPost[]> => {
    try {
        const postsRef = collection(db, COLLECTION_NAME);
        let q = query(postsRef, orderBy('publishedAt', 'desc'));

        if (!includeUnpublished) {
            q = query(postsRef, where('isPublished', '==', true), orderBy('publishedAt', 'desc'));
        }

        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => {
            const data = doc.data() as FirestoreBlogPost;
            return convertTimestamps({ ...data, id: doc.id });
        });

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
        const postsRef = collection(db, COLLECTION_NAME);
        const q = query(postsRef, where('slug', '==', slug));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        const docSnap = snapshot.docs[0];
        const data = docSnap.data() as FirestoreBlogPost;
        return convertTimestamps({ ...data, id: docSnap.id });
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        throw error;
    }
};

export const createPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
        const now = Timestamp.now();
        const postData = {
            ...post,
            publishedAt: Timestamp.fromDate(post.publishedAt),
            createdAt: now,
            updatedAt: now,
            views: 0,
            likes: 0,
            shares: 0,
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), postData);
        return docRef.id;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const updatePost = async (id: string, post: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const updateData: any = {
            ...post,
            updatedAt: Timestamp.now(),
        };

        if (post.publishedAt) {
            updateData.publishedAt = Timestamp.fromDate(post.publishedAt);
        }

        await updateDoc(docRef, updateData);
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

export const deletePost = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

export const incrementViews = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            views: increment(1)
        });
    } catch (error) {
        console.error('Error incrementing views:', error);
    }
};

export const toggleLike = async (id: string, shouldIncrement: boolean): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            likes: increment(shouldIncrement ? 1 : -1)
        });
    } catch (error) {
        console.error('Error toggling like:', error);
        throw error;
    }
};

export const incrementShares = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            shares: increment(1)
        });
    } catch (error) {
        console.error('Error incrementing shares:', error);
    }
};
