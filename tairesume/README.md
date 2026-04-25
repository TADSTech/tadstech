# TaiResume

TaiResume is an AI resume tailoring app for Typst resumes and PDF resumes. Users can upload an existing PDF resume to extract text, upload a Typst file directly, or paste Typst manually before tailoring against a target job description.

## Final Stack

- Framework: Next.js + React + Bun runtime support
- Auth: Firebase Google Sign-In
- Database: Firestore (coin balances and transactions)
- Payments: Paystack (N1,440 for 10 coins)
- Ads: Adsterra-style rewarded ad flow (+1 coin)
- AI Standard: NVIDIA Gemma 2 2B-IT (1 coin)
- AI Advanced: Groq Llama 3.1 8B (5 coins)
- Typst: In-browser WASM compilation with @myriaddreamin/typst.ts
- Deploy target: tairesume.tadstech.dev

## Coin Economy

| Action | Coins |
| --- | --- |
| Sign up with Google | +5 |
| Watch rewarded ad | +1 |
| Buy with Paystack (N1,440) | +10 |
| Standard tailor (Gemma 2B) | -1 |
| Advanced tailor (Llama 3.1 8B) | -5 |

## Homepage Pitch

Sign up and get 5 free coins - tailor your first 5 resumes instantly.

## Local Development

Install dependencies and run:

```bash
bun install
bun run dev
```

You can also use npm:

```bash
npm install
npm run dev
```

## Required Environment Variables

Create a .env.local file in this directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=

NVIDIA_API_KEY=
GROQ_API_KEY=
```

## Main App Features

- Google sign-in and automatic signup bonus
- Coin wallet display and transaction-backed updates
- PDF resume upload with automatic text extraction
- Typst file upload for direct editor import
- Job description scrape endpoint
- Standard and advanced model selection with coin costs
- Tailoring endpoint with streaming Typst output
- In-browser Typst PDF compile and preview
- Rewarded ad modal for free coins
- Paystack modal to purchase coins

## Resume Import Flow

- Upload a PDF resume to extract its text into the tailoring input.
- Upload a Typst file to load the source directly into the editor.
- You can still paste Typst manually if you prefer.

## Production Notes

- Configure domain: tairesume.tadstech.dev
- Ensure Firestore security rules are applied before public launch
- Add server-side payment verification webhook for Paystack in production
- Keep Firestore coin writes merge-safe so payment and reward callbacks do not fail on a missing profile document
- Replace ad placeholder container with live Adsterra script in production
