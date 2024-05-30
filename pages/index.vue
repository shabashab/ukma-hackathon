<script lang="ts" setup>
import { useTasksStore } from '../stores/tasks.store';
import { useTeamStore } from '../stores/team.store';
import {useCategoriesStore} from "~/stores/categories.store";

const tasksStore = useTasksStore()
const categiriesStore = useCategoriesStore()
const teamStore = useTeamStore()

const router = useRouter()

onMounted(async () => {
  watch(() => teamStore.team, value => {
    if(!value)
      router.push({path: '/team'})
  })

  if(!tasksStore.tasks)
    await tasksStore.fetchTasks({

    })

  if (!categiriesStore.categories)
    await categiriesStore.fetchCategories()
})

const selectedCategoryLabel = ref('');

watch(() => selectedCategoryLabel.value, async (value) => {
  console.log("test")
  await tasksStore.fetchTasks({
    categoryLabel: selectedCategoryLabel.value
  })
})
</script>

<template>
  <h1>Tasks</h1>
  <div class="flex justify-start items-center my-5">
    <CategorySelector v-model="selectedCategoryLabel"></CategorySelector>
  </div>
  <div class="grid grid-cols-3 grid-rows-[auto] gap-5">
    <TaskCard :task="task" v-for="task of tasksStore.tasks" />
  </div>
</template>