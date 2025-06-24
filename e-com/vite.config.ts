import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('https://fakestoreapi.com'),
    'import.meta.env.VITE_HOME': JSON.stringify('Home'),
    'import.meta.env.VITE_PRODUCTS': JSON.stringify('Products'),

  },
})
