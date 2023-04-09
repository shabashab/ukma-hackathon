import { User } from "@supabase/supabase-js";
import { Database } from "../database.types";
import { ProfileModel } from "../models/profile.model";

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient<Database>()

  const user = useSupabaseUser()
  const profile = ref<ProfileModel | null>(null)


  const fetchProfile = async () => {
    if(!user.value) {
      profile.value = null
      return
    }

    supabase.from('profiles')
      .select('id, username, fullName, team, isBuddy')
      .eq('id', user.value.id)
      .single()
      .then(({count, data, error}) => {
        if(error)
          return

        profile.value = data 
      })
  }

  watch(user, fetchProfile)

  return {
    user, profile, fetchProfile
  }
})