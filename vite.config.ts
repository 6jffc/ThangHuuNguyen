import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: use a repo-relative base for GitHub Pages
  base: '/ThangHuuNguyen/',
})
