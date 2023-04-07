<script lang="ts" setup>
const emit = defineEmits(['sign-up'])

const supabase = useSupabaseClient()
const loginLoading = ref<boolean>(false)
const router = useRouter()

const loginFormData = reactive({
  email: '',
  password: ''
})

const onLoginButtonClick = async () => {
  loginLoading.value = true

  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginFormData.email,
    password: loginFormData.password
  })

  loginLoading.value = false

  if(error) alert('Invalid e-mail or password. ' + error.message)

  router.push({ path: '/fill-profile' })
}
</script>

<template>
  <div class="flex flex-col items-stretch text-center gap-4 w-[400px] bg-light-200 px-6 py-5 rounded-xl">
    <h1 class="text-black/70">Login</h1>
    <InputText
      placeholder="E-mail"
      v-model="loginFormData.email"
    />
    <Password
      placeholder="Password"
      input-class="w-full"
      v-model="loginFormData.password"
      :feedback="false"
    />
    <Button :loading="loginLoading" @click="onLoginButtonClick">
      Log in
    </Button>
    <Button @click="emit('sign-up')" text>Sign up</Button>
  </div>
</template>

<style lang="scss" scoped>

</style>