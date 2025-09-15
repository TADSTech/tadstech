import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include TypeScript and JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937', // Custom primary color
        secondary: '#3B82F6', // Custom secondary color
        background: '#FAFAFA', // Light mode background
        'accent-color': '##8B5CF6',
        'dark-background': '#1F2937', // Dark mode background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode with class-based toggling
} satisfies Config;