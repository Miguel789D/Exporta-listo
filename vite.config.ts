import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimizaciones de producción
    target: 'es2022',
    sourcemap: false,
    // Code-splitting manual para librerías pesadas
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Charts - recharts es pesado (~160KB)
          'vendor-charts': ['recharts'],
          // PDF generation - jspdf + html2canvas (~400KB combined)
          'vendor-pdf': ['jspdf'],
          // UI primitives
          'vendor-radix': [
            '@radix-ui/react-label',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
          ],
          // Forms
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // State management
          'vendor-state': ['zustand'],
        },
      },
    },
    // Aumentar límite de warning (opcional, para silenciar warnings)
    chunkSizeWarningLimit: 600,
  },
})
