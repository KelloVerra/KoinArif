import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { terser } from 'rollup-plugin-terser'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/KoinArif/',
  build: {
    outDir: 'build',
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false, // This removes all comments
      }
    },
    rollupOptions: {
      plugins: [
        terser()
      ]
    }
  },
})
