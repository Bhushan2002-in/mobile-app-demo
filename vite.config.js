import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Set base for GitHub Pages (repo name)
  base: '/mobile-app-demo/',
  build: {
    outDir: 'docs', // deploy from /docs on the main branch
  },
  plugins: [react()],
});
