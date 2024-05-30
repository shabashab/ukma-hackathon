<script lang="ts" setup>
import { useTasksStore } from '../stores/tasks.store';
import { useTeamStore } from '../stores/team.store';
import {useCategoriesStore} from "~/stores/categories.store";
import type {TaskModel} from "~/models/task.model";

const tasksStore = useTasksStore()
const categiriesStore = useCategoriesStore()
const teamStore = useTeamStore()

const router = useRouter()

onMounted(async () => {
  watch(() => teamStore.team, value => {
    if(!value)
      router.push({path: '/team'})
  })

  if(!teamStore?.team)
    await teamStore.fetchTeam()

  if(!tasksStore.tasks)
    await tasksStore.fetchTasks({
      teamId: teamStore!.team!.id
    })

  if (!categiriesStore.categories)
    await categiriesStore.fetchCategories()

  await answerStore.fetchTeamAnswers(teamStore.team!.id)
})

const selectedCategoryLabel = ref('');

watch(() => selectedCategoryLabel.value, async (value) => {
  await tasksStore.fetchTasks({
    categoryLabel: selectedCategoryLabel.value,
    teamId: teamStore!.team!.id
  })
})

const sortTasksByAnswers = (tasks: TaskModel[]) => {
  return tasks.sort((a, b) => {
    if (a.answers.length > b.answers.length) {
      return 1;
    }
    if (a.answers.length < b.answers.length) {
      return -1;
    }
    return 0;
  });
}
</script>

<template>
  <h1>Tasks</h1>
  <div class="flex justify-start items-center my-5">
    <CategorySelector v-model="selectedCategoryLabel"></CategorySelector>
  </div>
  <div class="grid grid-cols-3 grid-rows-[auto] gap-5" v-if="tasksStore.tasks">
    <TaskCard :task="task" v-for="task of sortTasksByAnswers(tasksStore.tasks)" />
  </div>
</template>