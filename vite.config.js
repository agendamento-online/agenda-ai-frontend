import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        name: 'Agenda Ai!',
        short_name: 'Agenda Ai!',
        description: 'É um projeto para...',
        theme_color: '#fffff',
        background_color: '#fffff',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/agenda-ai-logo.png',
            sizes: '542x388',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
