<script lang="ts" setup>
import { Database } from '~/database.types';
import { useTasksStore } from '../../stores/tasks.store';
import { inferAsyncReturnType } from '@trpc/server';

const route = useRoute()
const supabase = useSupabaseClient<Database>()

const tasksStore = useTasksStore()

const scoredPoints = ref<number>(0)

if(!tasksStore.tasks)
  await tasksStore.fetchTasks()

const fetchAnswer = async () => {
  const { data: answer } = await supabase
    .from('answers')
    .select('id, team:teams ( id, name ), task, text, grade')
    .eq('id', parseInt(route.params.id as string))
    .single()

  if(answer && answer.grade)
    scoredPoints.value = answer.grade

  return answer
}

const answer = ref<inferAsyncReturnType<typeof fetchAnswer>>(await fetchAnswer())

const onSubmitButtonClick = async () => {
  await supabase.from('answers').update({
    grade: scoredPoints.value
  }).eq('id', parseInt(route.params.id as string))

  await fetchAnswer()
}
</script>

<template>
  <h1>Answer #{{ route.params.id }}</h1>
  <h2>Task: {{ tasksStore.tasks!.find(value => value.id == answer?.task)?.title }}</h2>
  <h2>Team: {{ answer?.team?.name }}</h2>
  <h3>Max points: {{ tasksStore.tasks!.find(value => value.id == answer?.task)?.points }}</h3>
  <p>
    {{ tasksStore.tasks!.find(value => value.id == answer?.task)?.description }}
  </p>
  <h2>Answer:</h2>
  <p class="whitespace-pre-wrap">
    {{ answer?.text }}
  </p>
  <h2>Submission:</h2>
  <span>Points scored:<br><br></span>
  <InputNumber :min="0" :max="tasksStore.tasks!.find(value => value.id == answer?.task)?.points as number" v-model="scoredPoints" placeholder="Points scored"/><br><br>
  <Button @click="onSubmitButtonClick">Submit</Button>
</template>

<style lang="scss" scoped>

</style>