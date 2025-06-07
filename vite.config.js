// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Make the server accessible externally
    port: 6294 // Or your desired port
  }
});