import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true,
    proxy: {
      '/v1': {
        target: 'https://devapi.bluwyre.ai',
        changeOrigin: true,
        secure: true
      }
    }
  },
  build: {
    outDir: 'build'
  },
  publicDir: 'public',
  optimizeDeps: {
    exclude: [
      '@innovatrics/dot-document-auto-capture',
      '@innovatrics/dot-face-auto-capture',
      '@innovatrics/dot-smile-liveness',
      '@innovatrics/dot-auto-capture-ui'
    ]
  },
  ssr: {
    noExternal: [
      '@innovatrics/dot-document-auto-capture',
      '@innovatrics/dot-face-auto-capture',
      '@innovatrics/dot-smile-liveness',
      '@innovatrics/dot-auto-capture-ui'
    ]
  }
})
