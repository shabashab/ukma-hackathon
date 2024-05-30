import type { Database } from "../database.types";
import type { ProfileModel } from "../models/profile.model";

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient<Database>()

  const user = useSupabaseUser()
  const profile = ref<ProfileModel | null>(null)


  const fetchProfile = async () => {
    if(!user.value) {
      profile.value = null
      return
    }

    const {data, error} = await supabase.from('profiles')
      .select('id, username, fullName, team, isBuddy')
      .eq('id', user.value.id)
      .single()

    if(!error) {
      profile.value = data
    }
  }

  watch(user, fetchProfile, {immediate: true})

  return {
    user, profile, fetchProfile
  }
})