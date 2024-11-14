<template>
  <div class="wrapper" :class="{ 'wrapper-dense': $props.dense }">
    <div class="inner-background" />
    <div class="background" />

    <div class="content">
      <div v-if="$props.media" class="media-container">
        <img :src="$props.media" alt="hero image" class="hero-image" />
      </div>
      <CardGlass v-bind="$props" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeroProps } from "@/types/components";

defineProps<HeroProps>();
</script>

<style scoped lang="scss">
@use "/assets/scss/colors" as *;

.wrapper {
  position: relative;
  display: flex;
  padding: 2.5rem;
  padding-top: 2.5rem;
  padding-bottom: 3.18rem;
  height: 40rem;
  &-dense {
    height: unset;
  }
}

.background,
.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  background-color: $deep-purple;
  border-radius: 1.25rem;
  img {
    width: 100%;
    height: 100%;
    border-radius: 1.25rem;
  }
}

.inner-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $medium-purple;
  border-radius: 1.25rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  z-index: 3;
  width: 100%;
}

.hero-image {
  object-fit: none;
  // object-fit: cover;
  width: 100%;
  border-radius: 1.25rem;
}

.media-container {
  margin: auto;
  width: 100%;
  height: 60%;
}
</style>
