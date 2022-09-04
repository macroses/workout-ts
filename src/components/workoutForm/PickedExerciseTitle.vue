<script lang="ts" setup>
import Icon from '@/components/ui/Icon.vue';

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="picked-exercise__title">
    {{ title }}
    <Icon width="12px" icon-name="angle-down"/>
  </div>
</template>