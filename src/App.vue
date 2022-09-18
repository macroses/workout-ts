<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/header/Header.vue';

const getDroppedValue = (msg) => {
  console.log(msg)
}
</script>

<template>
  <Header />
  <main>
    <RouterView @blockIntersection="getDroppedValue"/>
  </main>
</template>