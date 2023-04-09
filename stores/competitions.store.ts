import { CompetitionModel } from "~/models/competition.model"
import { Database } from "~/database.types"

export const useCompetitionsStore = defineStore('competitions', () => {
  const supabase = useSupabaseClient<Database>()
  const competitions = ref<CompetitionModel[] | null>()

  const fetchCompetitions = async () => {
    const { data, error } = await supabase
      .from('competitions')
      .select('id, start_date, end_date, name')
    
    if(error) throw error

    const newCompetitions= data.map<CompetitionModel>(value => {
      return {
        ...value,
        'start_date': new Date(value.start_date),
        'end_date': new Date(value.end_date)
      }
    })

    competitions.value = newCompetitions
  }

  return {
    competitions, fetchCompetitions
  }
})