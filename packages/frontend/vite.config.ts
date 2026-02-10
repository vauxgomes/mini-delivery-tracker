// import react from '@vitejs/plugin-react'
import { reactRouter } from '@react-router/dev/vite'

import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [/*react()*/ reactRouter(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared') // Path mapping
    }
  }
})
