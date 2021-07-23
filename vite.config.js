import path from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default ({ command }) => ({

  base: command === 'serve' ? '' : '/build/',

  publicDir: 'fake_directory', // created to prevent Vite from automatically copy assets

  build: {
    manifest: true,

    outDir: 'public/build',

    rollupOptions: {
      input: [
        'resources/js/app.js',
        'resources/css/app.css',
      ],
    },
  },

  resolve: {
    alias: {
      '@': path.resolve('resources/js'),
    },
  },

  plugins: [
    svelte({
        /* inline options here */
    }),
  ],
})
