<script lang="ts" setup>
import { AnswerModel } from '~/models/answer.model';
import { Database } from '~/database.types';
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
    <Column field="team.name" header="Team" />
    <Column field="task.title" header="Task" />
    <Column field="grade" header="Grade" />
    <Column>
      <template #body="slotProps">
        <Button @click="router.push({path: `/answers/${slotProps.data.id}`})">Open</Button>
      </template>
    </Column>
  </DataTable>
</template>

<style lang="scss" scoped>

</style>