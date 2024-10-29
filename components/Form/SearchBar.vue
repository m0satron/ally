<template>
  <input
    v-model="model"
    type="text"
    :placeholder="placeholder"
    @keydown.enter="handleSubmit"
  />
</template>
<script setup lang="ts">
const model = defineModel<string>();
const placeholder = ref<string>("Look for a block");

const emit = defineEmits<{
  (e: "submit", value: string): void;
}>();

const handleSubmit = () => model.value && emit("submit", model.value);
</script>

<style scoped lang="scss">
input {
  flex: 1;
  padding: 8px;
  border-radius: 0.5rem;
  border: none;
  height: 3rem;
}
</style>
