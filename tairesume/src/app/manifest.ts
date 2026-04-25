import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TaiResume — AI Resume Tailor',
    short_name: 'TaiResume',
    description: 'Tailor your Typst resume to any job listing with AI',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#A78BFA',
    icons: [
      {
        src: '/icons/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  };
}
