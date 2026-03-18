import { defineConfig } from 'vite';

export default defineConfig({
  base: '/malluscorner/', // Use relative paths for assets to support GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
