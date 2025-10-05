import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Enables dark mode via the `.dark` class
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include TS/JS and React files
  ],
  theme: {
    screens: {
      'md': '768px',
    },
    extend: {
      colors: {
        primary: '#1F2937', // Custom primary color (gray-800)
        secondary: '#3B82F6', // Blue-500
        background: '#FAFAFA', // Light mode background
        accent: '#8B5CF6', // Fix: remove extra '#' and simplify name
        'dark-background': '#111827', // Slightly darker, better dark contrast
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Your base font
      },
      transitionProperty: {
        'theme': 'background-color, color, border-color, fill, stroke', // Smooth theme switching
      },
    },
  },
  plugins: [],
}

export default config
