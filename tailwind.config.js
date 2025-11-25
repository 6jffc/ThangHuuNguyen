/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        academic: {
          bg: '#ffffff',
          text: '#111827',
          accent: '#2563EB',
          subtle: '#f9fafb',
          border: '#e5e7eb',
          secondary: '#4b5563'
        }
      }
    },
  },
  plugins: [],
}