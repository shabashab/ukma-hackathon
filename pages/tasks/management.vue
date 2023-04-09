<script lang="ts" setup>
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore()

onMounted(async () => {
  if(!tasksStore.tasks)
    await tasksStore.fetchTasks()
})
</script>

<template>
  <h1>Task management</h1>
  <TasksManagementTable/>
</template>

<style lang="scss" scoped>

</style>