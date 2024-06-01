import '@sfxcode/nuxt-primevue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    'nuxt-windicss',
    'nuxt-primevue',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  ssr: false,
  build: {
    transpile: ['trpc-nuxt']
  },
  supabase: {
    redirect: false,
  },
  nitro: {
    routeRules: {
      '/**': {redirect: { to: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', statusCode: 301 }}
    }
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
})
