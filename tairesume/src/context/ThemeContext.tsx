'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start with 'dark' on both server and client to avoid hydration mismatch.
  // The inline script in layout.tsx has already set the correct data-theme on <html>
  // before React hydrates, so there's no visible flash. We correct React's state
  // in useEffect after hydration.
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read the actual theme set by the inline script and sync React state
    const actual = (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark';
    setTheme(actual);
    setMounted(true);
  }, []);

  // Keep html[data-theme] in sync whenever theme changes (after mount)
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('tairesume-theme', theme);
    } catch {
      // localStorage blocked (private browsing, etc.) — silently ignore
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
