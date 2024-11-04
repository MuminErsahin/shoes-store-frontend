import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari13'],
    outDir: 'dist',
    sourcemap: true,
    polyfillDynamicImport: true
  },
  server: {
    port: 3000
  }
})