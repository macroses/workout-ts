<script lang="ts" setup>
const props = defineProps<{
  width: string
  iconName?: string
}>();
</script>

<template>
  <svg viewBox="0 0 24 24" :width="width">
    <use :xlink:href="`/light.svg#${iconName}`"></use>
  </svg>
</template>

<style scoped>
svg {
  height: auto;
  fill: var(--color-icon);
}
</style>