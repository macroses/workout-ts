<script setup lang="ts">
import { db } from "@/firebase/config";
import { collection, getDocs } from 'firebase/firestore';
import { ref } from "vue";
import getCollection from '../composables/getCollection';

const { documents } = getCollection('muscles');
</script>

<template>
  <main>
    <p v-for="doc in documents" :key="doc.id">
      {{ doc.name }}
      {{ doc.iconName }}
      {{ doc.id }}
    </p>
  </main>
</template>
