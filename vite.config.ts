import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Gesti-n-de-Tareas-con-React/', // nombre del repo en GitHub
})
