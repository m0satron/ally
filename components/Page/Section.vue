<template>
  <section class="section">
    <h2>{{ $props.title }}</h2>
    <p>{{ $props.description }}</p>
  </section>
</template>

<script setup lang="ts">
import type { SectionProps } from '@/types/components'

defineProps<SectionProps>()
</script>

<style scoped lang="scss">
@use '/assets/scss/colors' as *;
@use '/assets/scss/typography' as *;

h2 {
  color: $text-color;
  font-size:2rem;
  font-weight: $text-bold;
}

p {
  font-size:1.3rem;
}
</style>
