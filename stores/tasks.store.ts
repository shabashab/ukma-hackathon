import { Database } from "~/database.types"
import { TaskModel } from "../models/task.model"

export const useTasksStore = defineStore('tasks', () => {
  const supabase = useSupabaseClient<Database>()
  const tasks = ref<TaskModel[] | null>()

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from('tasks')
     .select('id, title, description, competitions ( start_date, end_date ), points, category, difficulty')

    if(error) throw error

    tasks.value = data
  }

  const createTask = async (inputData: Omit<TaskModel, 'id'>) => {
    const { error, data } = await supabase
      .from('tasks').upsert(inputData)

    if(error) throw error

    await fetchTasks()
  }

  const deleteTask = async (id: number) => {
    const result = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .throwOnError()

    await fetchTasks()
  }

  return {
    tasks, fetchTasks, createTask, deleteTask
  }
})