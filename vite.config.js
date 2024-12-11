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
        name: 'Agenda Ai! Serviços',
        short_name: 'Agenda Ai!',
        description: 'É um projeto para...',
        theme_color: '#ADD8E6',
        background_color: '#ADD8E6',
        display: 'standalone',
        icons: [
          {
            src: 'icons/agenda-ai-icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/agenda-ai-logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
