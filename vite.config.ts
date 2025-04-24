import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.VITE_APP_SUPABASE_URL': JSON.stringify(process.env.VITE_APP_SUPABASE_URL),
    'process.env.VITE_APP_SUPABASE_KEY': JSON.stringify(process.env.VITE_APP_SUPABASE_KEY),
    'process.env.VITE_APP_ENCRYPTION_KEY': JSON.stringify(process.env.VITE_APP_ENCRYPTION_KEY),
  },
})