import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/baby-shower-mayte/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    historyApiFallback: {
      rewrites: [
        { from: /\/baby-shower-mayte\/.*/, to: '/index.html' }
      ]
    }
  }
})