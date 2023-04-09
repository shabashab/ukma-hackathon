<script lang="ts" setup>
import { useCompetitionsStore } from '~/stores/competitions.store';
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore()

const router = useRouter()

const newTaskData = reactive({
  title: '',
  category: '',
  competition: '',
  points: 0,
  description: '',
  difficulty: 0
})

const onCreateButtonClick = async () => {
  await tasksStore.createTask(newTaskData)

  router.push('/tasks/management')
}
</script>

<template>
  <h1>New task</h1>
  <TaskEditor 
    @submit="onCreateButtonClick" 
    :new-task-data="newTaskData"
  />
</template>

<style lang="scss" scoped>

</style>