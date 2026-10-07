import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    proxy: {
      '/topup-api': {
        target: process.env.TOPUP_LOCAL_API_BASE || 'http://127.0.0.1:8000',
        rewrite: path => path.replace(/^\/topup-api/, '/steam-topups/public'),
      },
    },
  },
})
