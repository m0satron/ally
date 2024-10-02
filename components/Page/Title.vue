<template>
  <h1 class="page-title">{{ title }}</h1>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped lang="scss">
@use '/assets/scss/colors' as *;
@use '/assets/scss/typography' as *;

.page-title {
  color: $text-color;
  font-size: 2.2rem;
  font-weight: $text-bold;
  margin: 2rem 0;
}
</style>
