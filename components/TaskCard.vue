<script lang="ts" setup>
import type { TaskModel } from '~/models/task.model';

const router = useRouter()

const props = defineProps<{
  task: TaskModel
}>()

const onOpenButtonClick = () => {
  router.push({ path: `/tasks/${props.task.id}` })
}

const hasAnswer = computed(() => props.task.answers.length > 0)
</script>

<template>
  <div class="rounded-2xl shadow-lg shadow-dark-100/20 grid grid-rows-[1fr,auto,auto] gap-y-2 grid-cols-1 items-center justify-between text-center py-10 px-10 box-border" :class="{'text-black/30': hasAnswer}">
    <div>
      <h3 class="text-[32px] m-0 text-dark-700" :class="{'text-dark-700/30' : hasAnswer}">{{ task.title }}</h3>
      <div class="mt-2 text-dark-50/90" :class="{'text-dark-50/20' : hasAnswer}" >{{ task.category }}</div>
      <!-- <span>
        {{ task.description }}
      </span> -->
    </div>
  <div class="flex flex-row items-end justify-center gap-2 mt-4">
      <span class="text-[80px] font-bold">
        {{ task.points }}
      </span>
      <span>points</span>
    </div>
    <div class="flex flex-row justify-between items-end w-full">
      <span class="text-[26px] mt-8">
        <span v-for="n of task.difficulty">👹</span>
        <span v-for="n of (5 - task.difficulty)">😀</span>
      </span>
      <Button @click="onOpenButtonClick" class="h-[40px] shadow-vielet-300 shadow-sm" :disabled="hasAnswer">Open</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>