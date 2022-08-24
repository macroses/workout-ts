<script setup lang="ts">
import Icon from "./Icon.vue";

const props = defineProps<{
  isDisabled?: boolean,
  onlyIcon?: string
  icon?: string,
  size: string
}>()

</script>

<template>
<button
  type="button"
  class="button"
  :size="size"
  :disabled="isDisabled"
  :class="[size, onlyIcon]"
>
  <Icon 
    v-if="icon"
    width="16px" 
    :iconName="icon"
    />
  <slot/>
</button>
</template>