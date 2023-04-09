<script lang="ts" setup>
import { useTasksStore } from '../stores/tasks.store';

definePageMeta({
  middleware: 'require-team'
})

const tasksStore = useTasksStore()

onMounted(async () => {
  if(!tasksStore.tasks)
    await tasksStore.fetchTasks()

  console.log(tasksStore.tasks)
})
</script>

<template>
  <h1>Tasks</h1>
  <div class="grid grid-cols-3 grid-rows-[auto] gap-5">
    <TaskCard :task="task" v-for="task of tasksStore.tasks?.filter(value => (new Date((value as any).competitions.start_date) > new Date(Date.now()) && new Date((value as any).competitions.end_date) < new Date(Date.now())))" />
  </div>
</template>