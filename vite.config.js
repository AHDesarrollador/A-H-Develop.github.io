import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/A-H-Develop.github.io/',  // ← reemplaza con el nombre exacto del repo
});
