import {
    collection,
    addDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    Timestamp,
    doc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface BlogImage {
    id: string;
    blogPostId?: string;
    imageData: string; // base64 data URL
    altText: string;
    fileName: string;
    uploadedAt: Date;
    uploadedBy: string;
}

interface FirestoreBlogImage extends Omit<BlogImage, 'id' | 'uploadedAt'> {
    uploadedAt: Timestamp;
}

const COLLECTION_NAME = 'blog_images';

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export const uploadImage = async (
    file: File,
    userEmail: string,
    blogPostId?: string
): Promise<BlogImage> => {
    try {
        // Convert image to base64
        const base64Data = await convertToBase64(file);

        const imageData: Omit<FirestoreBlogImage, 'id' | 'uploadedAt'> & { uploadedAt: Timestamp } = {
            blogPostId,
            imageData: base64Data,
            fileName: file.name,
            altText: file.name.replace(/\.[^/.]+$/, ''),
            uploadedAt: Timestamp.now(),
            uploadedBy: userEmail,
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), imageData);

        return {
            id: docRef.id,
            ...imageData,
            uploadedAt: imageData.uploadedAt.toDate(),
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const deleteImage = async (imageId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, imageId));
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

export const getImagesByPost = async (blogPostId: string): Promise<BlogImage[]> => {
    try {
        const imagesRef = collection(db, COLLECTION_NAME);
        const q = query(imagesRef, where('blogPostId', '==', blogPostId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data() as FirestoreBlogImage;
            return {
                ...data,
                id: doc.id,
                uploadedAt: data.uploadedAt.toDate(),
            };
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};
