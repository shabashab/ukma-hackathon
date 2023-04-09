<script lang="ts" setup>
import type { Database } from '../database.types';

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const router = useRouter()

definePageMeta({
  layout: 'empty'
})

const fillProfileFormData = reactive({
  username: '',
  fullName: ''
})

const onSubmitButtonClick = async () => {
  const { error } = await supabase.from('profiles').upsert({
    id: user.value!.id,
    'fullName': fillProfileFormData.fullName,
    'username': fillProfileFormData.username
  })

  if(error) throw error

  router.push({ path: '/' })
}
</script>

<template>
  <AppContainer class="grid place-items-center h-screen">
    <div class="flex flex-col items-stretch text-center gap-4 w-[400px] bg-light-200 px-6 py-5 rounded-xl">
      <h1 class="text-black/70">Fill your profile</h1>
      <InputText
        v-model="fillProfileFormData.fullName"
        placeholder="Full name"
      />
      <InputText
        v-model="fillProfileFormData.username"
        placeholder="GitHub Username"
      />
      <Button @click="onSubmitButtonClick">Submit</Button>
    </div>
  </AppContainer>
</template>

<style lang="scss" scoped>

</style>