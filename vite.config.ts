import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

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
