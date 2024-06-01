<script lang="ts" setup>
import Toast from "primevue/toast";
</script>

<template>
  <div>
    <ConfirmDialog />
<!--    <ConfirmPopup />-->
    <AppHeader/>
    <Toast />
    <AppContainer>
      <slot />
    </AppContainer>
  </div>
</template>

<style lang="scss" scoped>

</style>