import { TeamModel } from "~/models/team.model"
import { Database } from "../database.types"
import { useAuthStore } from "./auth.store"
import { v4 as uuid } from 'uuid'

export const useTeamStore = defineStore('team', () => {
  const supabase = useSupabaseClient<Database>()
  const authStore = useAuthStore()

  const team = ref<TeamModel | null>()

  const fetchTeam = async () => {
    if(!authStore.profile)
      return

    const { data, error } = await supabase.from('teams')
      .select('id, name, profiles!profiles_team_fkey ( id, fullName, username ), created_by')
      .eq('id', authStore.profile.team)
      .single()

    if(!data || error) {
      if(error)
        console.error(error)

      team.value = null
      return
    }

    if(!data.profiles)
      data.profiles = []

    team.value = (data as unknown) as TeamModel
  }

  watch(() => authStore.profile, async (newProfile) => {
    if(!newProfile)
      return

    await fetchTeam()
  }, {
    immediate: true
  })
  
  const create = async (name: string) => {
    if(!authStore.user)
      return

    const { data, error } = await supabase.from('teams').upsert({
      id: uuid(),
      created_by: authStore.user.id,
      name: name
    })
      .select('id, name, profiles!profiles_team_fkey ( fullName, username ), created_by')
      .single()
      .throwOnError()

    if(!data)
      return

    if(!data.profiles)
      data.profiles = []

    team.value = (data as unknown) as TeamModel

    await supabase.from('profiles').update({team: data.id}).eq('id', authStore.user.id)
    await authStore.fetchProfile()
  }

  const join = async (inviteCode: string) => {
    const {data, error} = await supabase.from('teams').select('id').eq('id', inviteCode)

    if(error || !data)
      throw new Error('Invalid invite code')

    await supabase.from('profiles')
      .update({
        team: inviteCode
      })
      .eq('id', authStore.user!.id)

    await authStore.fetchProfile()
    await fetchTeam()
  }

  return {
    fetchTeam,
    create,
    team,
    join
  }
})