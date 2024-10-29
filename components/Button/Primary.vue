<template>
  <button class="ripple" :disabled="props.disabled" :class="buttonClass">
    <p class="button-text">{{ props.label }}</p>
    <img v-if="icon" alt="icon" :src="icon" class="icon" />
  </button>
</template>

<script lang="ts" setup>
import ArrowRight from "~/assets/icons/arrow-right.svg";
import ArrowRightPurple from "~/assets/icons/arrow-right-purple.svg";
import type { ButtonProps } from "~/types/components/index";

const props = defineProps<ButtonProps>();

const icon = computed(() => {
  if (props.icon === "arrow-right") {
    if (props.type === "secondary") {
      return ArrowRightPurple;
    } else {
      return ArrowRight;
    }
  }
  return null;
});

const buttonClass = computed(() => `button button--${props.type || "primary"}`);
</script>

<style scoped lang="scss">
@use "/assets/scss/colors.scss" as *;
@use "sass:color";

.button {
  display: flex;
  border-radius: 0.625rem;
  justify-content: space-evenly;
  align-items: center;
  padding: 1.125rem 1.5rem;
  border: none;
  cursor: pointer;
  background-position: center;
  transition: background 400ms ease-in-out;
  text-transform: capitalize;

  .button-text {
    margin: 0 0.6rem;
  }

  &--primary {
    color: $text-color;

    &:hover {
      background-color: color.scale($light-blue, $lightness: -15%);
    }

    &:active {
      background-color: color.scale($light-blue, $lightness: -25%);
    }

    & {
      background-color: $light-blue;
    }
  }

  &--secondary {
    color: $medium-purple;

    &:hover {
      background-color: color.scale(white, $lightness: -15%);
    }

    &:active {
      background-color: color.scale(white, $lightness: -25%);
    }

    & {
      background-color: white;
    }

    .icon {
      stroke: $medium-purple;
    }
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>
