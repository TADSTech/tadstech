import type { Metadata } from 'next';
import { AuthProvider } from '@/hooks/useAuth';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaiResume — AI Resume Tailor',
  description: 'Tailor your Typst resume to any job listing with AI. Get 5 free coins on signup.',
  keywords: ['resume', 'tailor', 'typst', 'AI', 'job application'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Paystack inline script */}
        <script src="https://js.paystack.co/v1/inline.js" async />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
