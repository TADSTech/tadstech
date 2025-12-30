import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import slugify from 'slugify';

// Load environment variables from .env file
const envFile = await Bun.file('.env').text();
const envVars: Record<string, string> = {};
envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        envVars[match[1].trim()] = match[2].trim();
    }
});

const firebaseConfig = {
    apiKey: envVars.VITE_FIREBASE_API_KEY,
    authDomain: envVars.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: envVars.VITE_FIREBASE_PROJECT_ID,
    storageBucket: envVars.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envVars.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: envVars.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Import writeups data
const writeupData = await import('../src/data/writeups.json').then(m => m.default);

async function migrateToFirestore() {
    console.log('Starting migration...');
    console.log(`Found ${writeupData.length} posts to migrate`);

    let successCount = 0;
    let errorCount = 0;

    for (const writeup of writeupData) {
        try {
            const slug = slugify(writeup.title, { lower: true, strict: true });

            const postData = {
                title: writeup.title,
                slug,
                excerpt: writeup.excerpt,
                content: writeup.content,
                category: writeup.category,
                tags: writeup.tags,
                readTime: writeup.readTime,
                publishedAt: Timestamp.fromDate(new Date(writeup.timestamp)),
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                isPublished: true,
                seoTitle: writeup.title,
                seoDescription: writeup.excerpt,
                ogImageUrl: '',
                views: 0,
                likes: 0,
                shares: 0,
            };

            const docRef = await addDoc(collection(db, 'blog_posts'), postData);
            console.log(`✓ Migrated: "${writeup.title}" (ID: ${docRef.id}, slug: ${slug})`);
            successCount++;
        } catch (error) {
            console.error(`✗ Failed to migrate: "${writeup.title}"`, error);
            errorCount++;
        }
    }

    console.log('\n=== Migration Complete ===');
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log('\nYou can now view your posts at /admin after signing in!');
}

migrateToFirestore()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Migration failed:', error);
        process.exit(1);
    });
