/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        surface: '#121212',
        surfaceHover: '#1f1f1f',
        primary: '#10b981', // Emerald green
        primaryHover: '#059669',
        textPrimary: '#f3f4f6',
        textSecondary: '#9ca3af',
        border: '#27272a',
        error: '#ef4444',
      }
    },
  },
  plugins: [],
}
