import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TaiResume — AI Resume Tailor',
  description: 'Tailor your Typst resume to any job listing with AI. Get 5 free coins on signup.',
  keywords: ['resume', 'tailor', 'typst', 'AI', 'job application'],
};

// Inline script runs synchronously before React hydrates to prevent FOUC.
const themeScript = `
  try {
    var saved = localStorage.getItem('tairesume-theme');
    var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', saved || preferred);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Theme script must run before any paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
