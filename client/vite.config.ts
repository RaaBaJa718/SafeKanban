import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001', // Ensure this matches your backend port
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://127.0.0.1:3001', // Ensure this matches your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
