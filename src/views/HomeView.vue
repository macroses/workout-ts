<script setup lang="ts">
import { db } from "@/firebase/config";
import { collection, getDocs } from 'firebase/firestore';
import { ref } from "vue";

const workouts = ref([]);

const colRef = collection(db,'workouts');

getDocs(colRef)
  .then(snapshot => {
    let docs: [] = [];
    snapshot.docs.forEach(doc => {
      docs.push({ ...doc.data(), id: doc.id })
    })

    workouts.value = docs
  })
</script>

<template>
  <main>
    <p v-for="workout in workouts" :key="workout.id">{{ workout.title }}</p>
  </main>
</template>
