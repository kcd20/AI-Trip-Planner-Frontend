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
});
