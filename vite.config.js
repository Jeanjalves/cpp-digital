import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({

      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.svg',
        'icon-192.png',
        'icon-512.png',
        'icons.svg'
      ],

      manifest: {

        name: 'CPP Digital',
        short_name: 'CPP Digital',

        description: 'Aplicativo digital CPP',

        theme_color: '#0f172a',
        background_color: '#0f172a',

        display: 'standalone',

        scope: '/',
        start_url: '/',

        icons: [

          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },

          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }

        ]

      },

      workbox: {

        globPatterns: ['**/*.{js,css,html,png,svg,pdf}'],

        runtimeCaching: [

          {
            urlPattern: ({ request }) =>
              request.destination === 'document',

            handler: 'NetworkFirst',

            options: {
              cacheName: 'pages-cache'
            }
          },

          {
            urlPattern: ({ request }) =>
              request.destination === 'image',

            handler: 'CacheFirst',

            options: {
              cacheName: 'images-cache'
            }
          },

          {
            urlPattern: ({ url }) =>
              url.pathname.endsWith('.pdf'),

            handler: 'CacheFirst',

            options: {
              cacheName: 'pdf-cache',

              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }

        ]

      }

    })

  ]
})