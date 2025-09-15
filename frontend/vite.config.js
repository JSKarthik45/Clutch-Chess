import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'images/ClutChess.svg',
      ],
      manifest: {
        name: 'CLUTCHESS',
        short_name: 'Clutchess',
        description: 'Play, Practice And Improve Your Chess Skills',
        theme_color: '#000000ff',
        icons: [
          {
            src: 'images/ClutChess.svg',  // path relative to `public/`
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },
      devOptions: {
        enabled: true // enables PWA during development
      }
    })
  ],
  server : {
    port: 3000, 
    //host: "0.0.0.0",
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
