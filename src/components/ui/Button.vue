<script setup lang="ts">
import { ref } from "vue";
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