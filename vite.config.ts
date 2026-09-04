import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from "sass";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/billing-app-test",
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
})
