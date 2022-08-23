<script setup lang="ts">
const props = defineProps<{
  inputType: string,
  placeholder: string,
  required?: boolean
}>()
</script>

<template>
  <label>
    <input 
      :type="inputType" 
      :placeholder="placeholder" 
      :required="required">
  </label>
</template>

<style scoped>

</style>