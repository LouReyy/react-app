// vite.config.ts
import { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [react()],
  server: {
    proxy: {
      '/sparql-endpoint': {
        target: 'http://example.org', // Replace with your actual SPARQL endpoint
        changeOrigin: true,
      },
    },
  },
};

export default config;
