import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { API_BASE_URL } from '../utils/api';
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': `${API_BASE_URL}/api`, // replace with your backend port if different
    },
  },
});
