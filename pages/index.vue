<script lang="ts" setup>
const user = useSupabaseUser()
</script>

<template>
  <h1>{{ user }}</h1>
</template>