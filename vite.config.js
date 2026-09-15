import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',            // relative base -> deployable on any host / subfolder
  build: { target: 'es2020', assetsInlineLimit: 2048 },
})
