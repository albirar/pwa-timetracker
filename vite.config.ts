import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'
import { copy } from 'vite-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        VitePWA({
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
            },
            injectRegister: 'auto',
            strategies: 'generateSW',
            registerType: "autoUpdate",
            manifest: {
                "name": "Albirar-Timetracker",
                "lang": "ca",
                "short_name": "Timetracker",
                "background_color": "#FFFFFF",
                "theme_color": "#FFFFFF",
                "start_url": "/",
                "display": "standalone",
                "icons": [
                    {
                        "src": "/assets/stopwatch-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "/assets/stopwatch-256x256.png",
                        "sizes": "256x256",
                        "type": "image/png"
                    },
                    {
                        "src": "/assets/stopwatch-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    },
                    {
                        "src": "/assets/maskable_icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "maskable"
                    },
                    {
                        "src": "/assets/maskable_icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ]
            }
        }),
        copy( [
            { src: "src/assets", dest: "dist/" }
        ])
    ]
})
