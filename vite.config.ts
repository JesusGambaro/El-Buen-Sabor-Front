import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': 'src/components/',
      '@admin': 'src/components/admin',
      '@app': 'src/components/app',
      '@redux': 'src/redux/',
      '@utils': 'src/utils/',
    },
  },
  server: {
    port: 5173,
  }
});
