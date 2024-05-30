<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import FloatLabel from "primevue/floatlabel";
import {useCategoriesStore} from "~/stores/categories.store";

const categiriesStore = useCategoriesStore()

const selectedCategoryLabel = defineModel<string>()

if (!categiriesStore.categories)
  await categiriesStore.fetchCategories()
</script>

<template>
  <FloatLabel>
    <Dropdown v-model="selectedCategoryLabel" :options="categiriesStore.categories" class="w-[300px]" :show-clear="true">
    </Dropdown>
    <label>
      Select category
    </label>
  </FloatLabel>
</template>

<style scoped lang="scss">

</style>