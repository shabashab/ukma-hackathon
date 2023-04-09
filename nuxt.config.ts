import '@sfxcode/nuxt-primevue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@sfxcode/nuxt-primevue',
    '@pinia/nuxt',
    'nuxt-windicss',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  build: {
    transpile: ['trpc-nuxt']
  },
  css: [
    'primevue/resources/themes/lara-light-indigo/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    '~/assets/main.scss'
  ],
  pinia: {
    autoImports: [
      'defineStore',
    ]
  },
  primevue: {
    config: {
      ripple: true,
    },
  },
})
