# TaiResume

TaiResume is an AI resume tailoring app for Typst resumes and PDF resumes. Users can upload an existing PDF resume to extract text, upload a Typst file directly, or paste Typst manually before tailoring against a target job description.

## Final Stack

- Framework: Next.js + React + Bun runtime support
- Auth: Supabase Auth (email/password + email confirmation)
- Database: Supabase Postgres (coin balances and transactions)
- Payments: Paystack (N1,440 for 10 coins)
- Ads: Adsterra-style rewarded ad flow (+1 coin)
- AI Standard: NVIDIA Gemma 2 2B-IT (1 coin)
- AI Advanced: Groq Llama 3.1 8B (5 coins)
- Typst: In-browser WASM compilation with @myriaddreamin/typst.ts
- Deploy target: tairesume.tadstech.dev

## Coin Economy

| Action | Coins |
| --- | --- |
| Sign up | +5 |
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
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=

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

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy your Project URL and anon key into `.env.local`
3. Open **SQL Editor** and run the contents of `supabase-setup.sql` — this creates the `users` table, RLS policies, and the `spend_coins` / `earn_coins` RPC functions
4. In **Authentication → URL Configuration**, set:
   - **Site URL**: `https://tairesume.tadstech.dev`
   - **Redirect URLs**: `https://tairesume.tadstech.dev/app`, `https://tairesume.tadstech.dev/reset-password`
5. Configure a custom SMTP provider (Resend recommended) under **Authentication → SMTP Settings**

## Deployment

Deployed at: **https://tairesume.tadstech.dev**

### Vercel (recommended)

1. Import the repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `tairesume`
3. Add all environment variables from `.env.local`
4. In Vercel **Settings → Domains**, add `tairesume.tadstech.dev`
5. Add the CNAME record in your DNS provider:
   - Name: `tairesume`
   - Value: `cname.vercel-dns.com`
