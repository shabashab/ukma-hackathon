<script lang="ts" setup>
import type { TaskModel } from '~/models/task.model';
import type { Database } from '~/database.types';
import type { AnswerModel } from '~/models/answer.model';
import { useTeamStore } from '~/stores/team.store';
import { useConfirm } from 'primevue/useconfirm'
import { useAuthStore } from '../../../stores/auth.store';


const supabase = useSupabaseClient<Database>()

const route = useRoute()
const router = useRouter()

const toast = useToast()

const confirm = useConfirm()

const teamStore = useTeamStore()

const task = ref<TaskModel>()
const answer = ref<AnswerModel | null>()

const answerText = ref<string>('')
const authStore = useAuthStore()

const fetchAnswer = async () => {
  const { data: answerData, error: answerError } = await supabase.
    from('answers')
    .select('*')
    .eq('team', teamStore.team!.id)
    .eq('task', task.value!.id)
    .single()

  if(answerError || !answerData)
    return

  answer.value = answerData
}

const { data: taskData } = await supabase
  .from('tasks')
  .select('id, title, description, category, difficulty, points')
  .eq('id', parseInt(route.params.id as string))
  .single()
  .throwOnError()

if(!taskData) {
  router.push('/')
}

task.value = taskData as any

if(teamStore.team)
  await fetchAnswer()
else
  watchOnce(() => teamStore.team, fetchAnswer)

const onSubmitAnswerButtonClick = () => {
  confirm.require({
    message: "Are you sure you want to submit your answer? You cannot change the answer in the future",
    header: "Are you sure?",
    accept: async () => {
      try {
        await supabase
            .from('answers')
            .upsert({
              text: answerText.value,
              task: task.value!.id,
              team: teamStore.team!.id,
            })

        await fetchAnswer()

        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Answer submitted successfully'
        })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while submitting the answer'
        })
      }

    }
  })
}
</script>

<template>
  <div class="py-10" v-if="task">
    <div class="grid grid-cols-[3fr,1fr] items-start w-full">
      <div>
        <h1>{{ task.title }}</h1>
        <div class="whitespace-pre-wrap">{{ task.description }}</div>
      </div>
      <div class="flex flex-col items-center gap-4">
        <div>
          <span class="text-[80px] font-bold">
            {{ task.points }}
          </span>
          <span>points</span>
        </div>
        <span class="text-[26px] mt-8">
          <span v-for="n of task.difficulty">👹</span>
          <span v-for="n of (5 - task.difficulty)">😀</span>
        </span>
      </div>
    </div>
    <div v-if="!answer">
      <h2>Submit your answer</h2>
      <div class="flex flex-col items-start gap-4">
        <Textarea v-model="answerText" rows="20" cols="80" placeholder="Answer text"/>
        <Button @click="onSubmitAnswerButtonClick" severity="success">Submit</Button>
      </div>
    </div>
    <div v-else>
      <h2>Your answer:</h2>
      <div class="flex flex-col items-start gap-4">
        <Textarea rows="20" cols="80" disabled :model-value="answer.text" placeholder="Answer text"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>