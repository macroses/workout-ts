<script setup lang="ts">
import { RouterLink } from "vue-router";
import Icon from "../ui/Icon.vue";
</script>

<template>
  <RouterLink to="/home" class="header-logo">
    <Icon icon-name="book" width="20px" />
    <span class="header-logo__text">Дневник тренировок</span>
  </RouterLink>
</template>
