# Firebase Blog System Setup Guide (Firestore Only)

This guide will help you configure Firebase for your blog system using only Firestore (no Storage billing required).

## Prerequisites

- Firebase account
- Firebase project created  
- Node/Bun installed

## Step 1: Enable Firebase Services

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `tadstech`

### Enable Firestore Database

1. Click **Firestore Database** in the left sidebar
2. Click **Create Database**
3. Choose **Production mode** (we'll add custom rules)
4. Select your preferred location
5. Click **Enable**

### Enable Firebase Authentication

1. Click **Authentication** in the left sidebar
2. Click **Get Started**
3. Go to **Sign-in method** tab
4. Click **Google**
5. Toggle **Enable**
6. Select your support email
7. Click **Save**

**Note:** Firebase Storage is NOT required for this setup. Images are stored as base64 data directly in Firestore.

## Step 2: Get Firebase Configuration

1. In Firebase Console, click the gear icon next to **Project Overview**
2. Click **Project settings**
3. Scroll down to **Your apps** section
4. Click **Web** icon (`</>`) to add a web app
5. Register app (name: `tadstech-blog`)
6. Copy the configuration values

## Step 3: Create `.env` File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in the values from your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=tadstech.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tadstech
VITE_FIREBASE_STORAGE_BUCKET=tadstech.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id-here
VITE_FIREBASE_APP_ID=your-app-id-here

VITE_ADMIN_EMAIL=your-email@gmail.com
```

**Important**: Replace `your-email@gmail.com` with the Google account you want to use for admin access.

## Step 4: Deploy Firestore Rules

1. Open `firestore.rules`
2. Replace `your-email@gmail.com` with your admin email (line 7)
3. Deploy rules:

```bash
firebase deploy --only firestore:rules
```

## Step 5: Migrate Existing Data

Run the migration script to transfer your writeups from JSON to Firestore:

```bash
bun run scripts/migrateToFirestore.ts
```

This will:
- Read `src/data/writeups.json`
- Generate slugs for each post
- Upload all posts to Firestore
- Set initial analytics to 0

## Step 6: Test the Setup

1. Start the dev server:

```bash
bun run dev
```

2. Navigate to `/admin/login`
3. Sign in with your Google account (the one set in `VITE_ADMIN_EMAIL`)
4. You should see the admin dashboard with your migrated posts

## Step 7: Build and Deploy

When ready to deploy:

```bash
bun run build
firebase deploy
```

## Image Storage Notes

**Images are stored as base64 data URLs directly in Firestore**, which means:
- ✅ No Firebase Storage billing required
- ✅ No additional setup needed
- ✅ Images are part of Firestore backups
- ⚠️ Keep image file sizes reasonable (< 500KB recommended)
- ⚠️ Firestore has a 1MB document size limit

### Best Practices for Images:
- Compress images before uploading
- Use appropriate image formats (WebP recommended)
- Resize images to appropriate dimensions before upload
- Avoid uploading very high-resolution images

## Troubleshooting

### "Permission denied" errors

- Check that Firestore rules are deployed
- Verify your email in the rules matches your Google account
- Make sure you're signed in with the correct Google account

### Migration fails

- Ensure `.env` file exists and has correct values
- Check Firebase project ID matches
- Verify Firestore is enabled in Firebase Console

### Can't sign in

- Verify Google authentication is enabled in Firebase Console
- Check that `VITE_ADMIN_EMAIL` matches your Google account
- Clear browser cache and try again

### Image upload fails

- Check image file size (must be reasonable for base64 encoding)
- Verify you're signed in as admin
- Check browser console for specific errors

## Security Notes

- Never commit `.env` to version control (already in `.gitignore`)
- Keep your Firebase API keys secure
- Only add trusted emails to Firestore rules for admin access
- Monitor Firestore usage to stay within free tier limits

## Next Steps

- Set up custom domain in Firebase Hosting
- Configure Firebase Analytics
- Set up Cloud Functions for sitemap generation
- Enable Firebase Performance Monitoring
- Consider image optimization workflow before upload
