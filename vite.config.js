import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is '/' for Railway/Vercel; set VITE_BASE=/toolhub/ for GitHub Pages subpath.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false },
})
