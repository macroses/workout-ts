<script setup lang="ts">
import getCollection from '../composables/getCollection';
import useCollection from "@/composables/useCollection";
import { ref } from "vue";
import getUser from "@/composables/getUser";

const { documents } = getCollection('workouts');
const { addDocument, error, isPending } = useCollection('workouts');
const { user } = getUser();
const inp = ref<string>('');

const handleSubmit = async () => {
  const newPost = {
    title: inp.value,
    date: new Date(),
    userId: user.value?.uid,
    userName: user.value?.displayName
  }

  await addDocument(newPost);

  if(!error.value) {
    inp.value = '';
  }
};

</script>

<template>
  <main>

    <p v-for="doc in documents" :key="doc.id">
      {{ doc.title }}
    </p>

    <input type="text" v-model="inp" @keyup.enter.prevent="handleSubmit">
  </main>
</template>
