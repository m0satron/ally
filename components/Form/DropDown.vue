<template>
  <div ref="dropdown" class="dropdown">
    <button @click="toggleDropdown">
      <span>{{ model?.label || placeholder || "Select" }}</span>
      <img
        alt="icon"
        :src="ChevronDown"
        class="icon"
        :class="{ open: showDropdown }"
      />
    </button>
    <ul v-if="showDropdown" class="list">
      <li
        v-for="option in options"
        :key="option.value"
        class="list-item"
        @click="select(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { OptionProps, OptionsList } from "@/types/components";
import ChevronDown from "~/assets/icons/chevron-down.svg";

const model = defineModel<OptionProps>();
defineProps<{ options: OptionsList; placeholder: string }>();

const dropdown = ref<HTMLElement | null>(null);
const showDropdown = ref<boolean>(false);
onClickOutside(dropdown, () => (showDropdown.value = false));
const toggleDropdown = () => (showDropdown.value = !showDropdown.value);

const select = (option: OptionProps) => {
  model.value = option;
  showDropdown.value = false;
};
</script>

<style scoped lang="scss">
@use "assets/scss/colors" as *;
@use "assets/scss/typography" as *;
@use "sass:color";
.dropdown {
  position: relative;
}

.dropdown button {
  padding: 8px 16px;
  border-radius: 0.3125rem;
  border: none;
  background: rgba(255, 255, 255, 0.41);
  color: #fff;
  font-family: Rajdhani;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  list-style: none;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  margin: 0;
  z-index: 10;
  min-width: fit-content;
  width: 100%;
  z-index: 1000;
  background-color: white;
  -webkit-box-shadow: 0px 0px 2.5rem -22px color.scale($text-color, $alpha: -0.85%);
  -moz-box-shadow: 0px 0px 2.5rem -22px color.scale($text-color, $alpha: -0.85%);
  box-shadow: 0px 0px 2.5rem -22px color.scale($text-color, $alpha: -0.85%);
}

.list-item {
  padding: 8px 16px;
  border-radius: 0.3125rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: lighten($medium-purple, 50%);
  }

  & {
    background-color: white;
  }
}

.icon {
  margin-left: 0.3125rem;
  transition: all 100ms ease-in-out;
}

.icon.open {
  rotate: 180deg;
}
</style>
