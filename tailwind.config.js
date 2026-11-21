/** @type {import('tailwindcss').Config} */
export default {
  // Components live at the repository root as well as in src/.
  // Scanning only src/ silently drops nearly every utility used by the UI.
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
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