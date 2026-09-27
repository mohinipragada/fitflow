// vite.config.js - settings for Vite, the tool that runs our React app in development.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /<repo-name>/, so the deploy workflow sets BASE_PATH.
  // On your own computer it stays "/".
  base: process.env.BASE_PATH || '/',
  server: {
    port: 5173,
    // Proxy: when React calls "/api/...", Vite forwards it to the Express server.
    // This means the frontend can simply call fetch('/api/workouts').
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
