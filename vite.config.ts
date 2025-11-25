import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace 'neural-nexus-portfolio' with your actual GitHub repository name
  base: ' https://6jffc.github.io/ThangHuuNguyen',
})
