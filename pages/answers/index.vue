<script lang="ts" setup>
import type { AnswerModel } from '~/models/answer.model';
import type { Database } from '~/database.types';
import { useTasksStore } from '~/stores/tasks.store';

const router = useRouter()

const supabase = useSupabaseClient<Database>()

const tasksStore = useTasksStore()

const answers = ref<any[]>([])

onMounted(async () => {
  if(!tasksStore.tasks)
    await tasksStore.fetchTasks()

  const { data, error } = await supabase
    .from('answers')
    .select('id, team:teams ( id, name ), task, grade')

  if(error || !data)
    return

  answers.value = data.map(valueData => ({
    ...valueData,
    task: tasksStore.tasks!.find(task => task.id === valueData.task)
  }))
})
</script>

<template>
  <h1>Answers</h1>
  <DataTable :value="answers">
    <Column field="team.name" header="Team" sortable/>
    <Column field="task.title" header="Task" sortable/>
    <Column field="grade" header="Grade" sortable/>
    <Column>
      <template #body="slotProps">
        <Button :severity="slotProps.data.grade ? 'warning' : 'info'" @click="router.push({path: `/answers/${slotProps.data.id}`})">Open</Button>
      </template>
    </Column>
  </DataTable>
</template>

<style lang="scss" scoped>

</style>