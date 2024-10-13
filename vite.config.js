import image from "@rollup/plugin-image"
import { defineConfig } from 'vite'

export default {
  base: './',
  build: {
    manifest: true,
    minify: 'false',
    modules : 'esnext',
    outDir: './docs'
  },
  plugins: [
    {
      ...image(),
      enforce: 'pre',
    },
  ]
}
