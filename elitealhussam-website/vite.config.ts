import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { blogPlugin } from './vite-plugin-blog.ts'

export default defineConfig({
  plugins: [react(), blogPlugin()],
})
