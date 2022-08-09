import { defineNuxtConfig } from 'nuxt';
export default defineNuxtConfig({
  css: [
    '~/assets/styles/main.css',
    '~/assets/styles/thirdparty.css',
    '~/assets/styles/tooltip.css',
  ],
  ssr: false,
  typescript: {
    strict: true,
  },
});
