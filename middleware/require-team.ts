import { useAuthStore } from "~/stores/auth.store"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  if(!(authStore.profile?.team))
    return '/team'

  return
})