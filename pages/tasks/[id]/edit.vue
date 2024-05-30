<script lang="ts" setup>
import type { TaskModel } from '~/models/task.model';
import { omit } from 'lodash'
import { useTasksStore } from '~/stores/tasks.store';

const route = useRoute()
const router = useRouter()

const supabase = useSupabaseClient()
const tasksStore = useTasksStore()

const task = reactive<TaskModel>({
  category: '',
  competition: '',
  description: '',
  id: 0,
  points: 0,
  title: '',
  difficulty: 0
})

onMounted(async () => {
  const { data } = await supabase
    .from('tasks')
    .select('id, title, description, competition, points, category, difficulty')
    .eq('id', parseInt(route.params.id as string))
    .single()
    .throwOnError()

  Object.assign(task, data)
})

const onSubmit = async () => {
  await supabase.from('tasks')
    .update(omit(task, 'id') as never)
    .eq('id', task.id)

  await tasksStore.fetchTasks()
  router.push('/tasks/management')
}
</script>

<template>
  <h1>Edit task "{{ task.title }}"</h1>
  <TaskEditor :new-task-data="task" @submit="onSubmit"/>
</template>

<style lang="scss" scoped>

</style>