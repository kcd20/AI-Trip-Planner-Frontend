/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker'
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
  test: {
    globals: true, // Optional: makes `expect`, `describe`, etc. globally available
    environment: 'jsdom', // Needed for DOM-related tests
  },
});
