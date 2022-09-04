<script setup lang="ts">
const props = defineProps<{
  inputType: string,
  placeholder: string,
  required?: boolean,

  modelValue: any,
  size?: string
}>()
</script>

<template>
  <label class="input-wrap">
    <input
      class="baseInput"
      :class="size"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"

      :type="inputType" 
      :required="required"
      :placeholder="placeholder"
    >
  </label>
</template>

<style scoped>
.input-wrap {
  display: flex;
  position: relative;
  margin-bottom: 16px;
}
.baseInput {
  width: 100%;
  display: block;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 8px;
  outline: none;
}

.baseInput:focus {
  border-color: var(--color-accent);
}

.baseInput.sm {
  height: 28px;
  font-size: 12px;
}
</style>