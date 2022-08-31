<script setup lang="ts">
import Icon from "./Icon.vue";

const props = defineProps<{
  isDisabled?: boolean,
  onlyIcon?: string
  icon?: string,
  size: string,
  accent?: boolean
}>()
</script>

<template>
<button
  type="button"
  class="button"
  :size="size"
  :disabled="isDisabled"
  :class="[size, onlyIcon? 'onlyIcon' : null, accent? 'accent' : null]"
>
  <Icon 
    v-if="icon"
    width="16px" 
    :iconName="icon"
    />
  <slot/>
</button>
</template>