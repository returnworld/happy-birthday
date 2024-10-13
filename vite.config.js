import image from "@rollup/plugin-image"
import { defineConfig } from 'vite'

export default {
  base: './',
  build: {
    outDir: './docs',
    emptyOutDir: true, // also necessary
  },
  plugins: [
    {
      ...image(),
      enforce: 'pre',
    },
  ]
}
