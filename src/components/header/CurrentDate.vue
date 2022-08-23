<script setup lang="ts">
import Button from "../ui/Button.vue";

</script>

<template>
  <div class="header-currentdate">
    <Button size="md">Сегодня</Button>
    <Button size="md" onlyIcon="onlyIcon" icon="angle-left"/>
    <Button size="md" onlyIcon="onlyIcon" icon="angle-right"/>
    <span class="current-textdate">август 2022</span>
  </div>
</template>