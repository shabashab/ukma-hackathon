import { Database } from "../database.types"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient<Database>()

  if(to.path === '/auth') {
    if(user.value) {
      return {
        path: '/'
      }
    }

    return
  }

  if(!user.value) {
    return {
      path: '/auth'
    }
  }
  
  const profile = await supabase.from('profiles')
    .select('username, full_name')
    .eq('id', user.value.id)
    .single()


  if(profile.error && to.path !== '/fill-profile') {
    return {
      path: '/fill-profile'
    }
  }

  if(to.path === '/fill-profile') {
    return {
      path: '/'
    }
  }

  return;
})