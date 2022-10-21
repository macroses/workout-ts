<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/header/Header.vue';
import Aside from '@/components/aside/Aside.vue';

</script>

<template>
  <Header />
  <Aside></Aside>
  <RouterView />
</template>