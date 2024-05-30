import type { Database } from "~/database.types"

export const useCategoriesStore = defineStore('categories', () => {
  const supabase = useSupabaseClient<Database>()
  const categories = ref<string[]>()

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('tasks').select('category')

    if (error) {
      console.error(error)
    }

    if (data) {
      categories.value = Array.from(new Set(data.map((task: {category: string}) => task.category.trim())))
    }
  }
  return {
    categories, fetchCategories
  }
})