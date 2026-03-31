import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import packageJson from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        catalog: "http://localhost:4173/assets/remoteEntry.js",
        cart: "http://localhost:4174/assets/remoteEntry.js",
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    })
  ],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5175
  },
  preview: {
    port: 4175,
  },
})
