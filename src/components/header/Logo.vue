<script setup lang="ts">
import { RouterLink } from "vue-router";
import Icon from '../ui/Icon.vue';
</script>

<template>
  <RouterLink to="/"  class="header-logo">
    <Icon iconName="book" width="20px"/>
    Дневник тренировок
  </RouterLink>
</template>