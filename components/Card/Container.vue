<template>
  <template v-if="$props.cards && $props.cards.length">
    <div class="wrapper">
      <h2 v-if="$props.title">{{ $props.title }}</h2>

      <div class="card-container">
        <template v-if="$props.mobile">
          <CardMobile v-for="card in $props.cards" :key="card.title" v-bind="card" />
        </template>

        <template v-else>
          <CardDesktop v-for="card in $props.cards" :key="card.title" v-bind="card" />
        </template>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { CardProps } from '~/types/components/index'

defineProps<{ title?: string; cards: CardProps[]; mobile: boolean }>()
</script>

<style scoped lang="scss">
@use '/assets/scss/colors.scss' as *;
@use '/assets/typography' as *;

.wrapper {
  display: flex;
  flex-direction: column;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

h2 {
  color: $text-color;
  font-size: 1.5rem;
  font-weight: $text-bold;
}
</style>
