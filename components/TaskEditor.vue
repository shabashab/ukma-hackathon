<script lang="ts" setup>
import { TaskModel } from '~/models/task.model';
import { useCompetitionsStore } from '~/stores/competitions.store';

const competitionsStore = useCompetitionsStore()

onMounted(async () => {
  if(!competitionsStore.competitions)
    await competitionsStore.fetchCompetitions()
})

const props = defineProps<{
  newTaskData: Omit<TaskModel, 'id'>
}>()

const emit = defineEmits(['submit'])
</script>

<template>
  <div class="flex flex-col gap-3 px-5 box-border py-10">
    <div class="grid grid-cols-2 grid-rows-2 gap-4">
      <InputText
        v-model="newTaskData.title"
        placeholder="Task title"
      />
      <InputText
        v-model="newTaskData.category"
        placeholder="Category"
      />
      <Dropdown
        v-model="newTaskData.competition"
        placeholder="Competition"
        :options="competitionsStore.competitions ?? []"
        option-label="name"
        option-value="id"
      />
      <div class="grid grid-cols-2 gap-2">
        <InputNumber
          v-model="newTaskData.points"
          placeholder="Points"
          input-id="integeronly"
        />
        <InputNumber
          v-model="newTaskData.difficulty"
          placeholder="Difficulty"
          input-id="integeronly"
          :min="1"
          :max="5"
        />
      </div>
    </div>
    <Textarea
      v-model="newTaskData.description"
      placeholder="Task description"
      rows="20"
    />
    <Button @click="emit('submit')" severity="success">Submit</Button>
  </div>
</template>

<style lang="scss" scoped>

</style>