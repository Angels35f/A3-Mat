import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida
  },
  server: {
    open: true,
  },
  base: '/A3-Mat/',
});