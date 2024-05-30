<script lang="ts" setup>
import { useTasksStore } from '../stores/tasks.store';
import { useTeamStore } from '../stores/team.store';

const tasksStore = useTasksStore()
const teamStore = useTeamStore()

const router = useRouter()

onMounted(async () => {
  watch(() => teamStore.team, value => {
    if(!value)
      router.push({path: '/team'})
  })

  if(!tasksStore.tasks)
    await tasksStore.fetchTasks()
})
</script>

<template>
  <h1>Tasks</h1>
  <div class="grid grid-cols-3 grid-rows-[auto] gap-5">
    <TaskCard :task="task" v-for="task of tasksStore.tasks" />
  </div>
</template>