import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  appType: 'mpa',
  base: '',
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        login: resolve(__dirname, './pages/auth/login/index.html'),
        register: resolve(__dirname, './pages/auth/register/index.html'),
        profile: resolve(__dirname, './pages/profile/index.html'),
        createPost: resolve(__dirname, './pages/post/create/index.html'),
        editPost: resolve(__dirname, './pages/post/edit/index.html'),
      },
    },
  },
});