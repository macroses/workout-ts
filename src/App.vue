<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/header/Header.vue';
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>