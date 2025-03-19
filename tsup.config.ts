import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/main.ts'],
    format: ['esm'],
    minify: true,
    shims: true,
    clean: true,
    terserOptions: {
      compress: true,
      keep_fnames: false,
    },
    keepNames: false,
  },
])
