<script lang="ts" setup>
import { useConfirm } from 'primevue/useconfirm'
import { useTasksStore } from '~/stores/tasks.store';

const tasksStore = useTasksStore()
const confirm = useConfirm()
const router = useRouter()

const onDeleteButtonClick = (event: Event, id: number) => {
  confirm.require({
    target: event.currentTarget as any,
    message: "Do you really want to delete the task?",
    accept: async () => {
      await tasksStore.deleteTask(id)
    }
  })
}

const onEditButtonClick = (id: number) => {
  router.push(`/tasks/${id}/edit`)
}

if(!tasksStore.tasks) {
  await tasksStore.fetchTasks({})
}
</script>

<template>
  <DataTable :value="tasksStore.tasks ?? []">
    <template #header>
      <div class="w-full flex justify-end">
        <Button severity="success" @click="router.push({path: '/tasks/new'})">Create</Button>
      </div>
    </template>
    <Column field="title" header="Title"/>
    <Column field="category" header="Category"/>
    <Column field="points" header="Points"/>
    <Column field="difficulty" header="Difficulty"/>
    <Column>
      <template #body="slotProps">
        <div class="flex flex-row gap-4">
          <Button @click="$event =>onDeleteButtonClick($event, slotProps.data.id)" severity="danger"><Icon name="mdi:trash-can"/></Button>
          <Button @click="() => onEditButtonClick(slotProps.data.id)" severity="warning"><Icon name="noto-v1:pencil"/></Button>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style lang="scss" scoped>

</style>