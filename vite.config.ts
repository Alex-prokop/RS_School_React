import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePlugin as remix } from '@remix-run/dev';

export default defineConfig({
  plugins: [
    react(),
    remix({
      appDirectory: 'app',
      serverBuildPath: 'build/index.js',
      publicPath: '/build/',
    }),
  ],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'public/build',
    rollupOptions: {
      input: 'src/entry.client.tsx',
      external: ['@reduxjs/toolkit'],
    },
  },
});
