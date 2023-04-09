<script lang="ts" setup>
const currentAuthForm = ref<'login' | 'signup'>('login')

definePageMeta({
  layout: 'empty'
})
</script>

<template>
  <AppContainer class="grid place-items-center h-screen">
    <AuthLoginForm 
      @sign-up="currentAuthForm = 'signup'" 
      v-if="currentAuthForm == 'login'"
    />
    <AuthSignupForm 
      @login="currentAuthForm = 'login'" 
      v-else
    />
  </AppContainer>
</template>

<style lang="scss" scoped>

</style>