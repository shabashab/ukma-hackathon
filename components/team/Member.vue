<script lang="ts" setup>
import type { ProfileModel } from '~/models/profile.model';

const props = defineProps<{
  profile: ProfileModel,
  captain?: boolean
}>()
</script>

<template>
  <div class="grid grid-cols-[auto,1fr] grid-rows-2 gap-x-4 items-center justify-start items-center gap-2">
    <img class="rounded-full w-[55px] col-start-1 col-end-2 row-start-1 row-end-3" :src="`https://github.com/${profile.username}.png`" alt="">
    {{ props.profile.fullName }}
    <span v-if="props.captain">
      Captain
      <Icon v-if="props.captain" name="noto-v1:crown"/>
    </span>
    <span v-else>
      Member
    </span>
  </div>
</template>

<style lang="scss" scoped>

</style>