import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      cachedChecks: false
    }
  },
  resolve: {
    alias: [{ find: 'src', replacement: resolve(__dirname, './src') }]
  }
});
