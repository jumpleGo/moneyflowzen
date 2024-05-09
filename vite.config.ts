import { fileURLToPath, URL } from 'node:url'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteImageOptimizer()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/global.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
