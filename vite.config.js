import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  appType: 'mpa',
  base: '',
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'), // Homepage
        auctions: resolve(__dirname, './pages/auctions/index.html'), // Auction listing page
        auctionItem: resolve(__dirname, './pages/auctions/item/index.html'), // Individual auction page
        login: resolve(__dirname, './pages/auth/login/index.html'), // Login page
        register: resolve(__dirname, './pages/auth/register/index.html'), // Register page
        profile: resolve(__dirname, './pages/profile/index.html'), // Profile page
        createAuction: resolve(__dirname, './pages/post/create/index.html'), // Create auction page
        editAuction: resolve(__dirname, './pages/post/edit/index.html'), // Edit auction page
      },
    },
  },
});