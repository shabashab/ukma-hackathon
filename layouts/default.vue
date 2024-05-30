<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore()
</script>

<template>
  <div>
    <ConfirmDialog />
<!--    <ConfirmPopup />-->
    <AppHeader/>
    <AppContainer>
      <slot />
    </AppContainer>
  </div>
</template>

<style lang="scss" scoped>

</style>