<script setup lang="ts">
import getCollection from '../composables/getCollection';
import useCollection from "@/composables/useCollection";
import { ref } from "vue";

const { documents } = getCollection('muscles');
const { addDocument, error, isPending } = useCollection('muscles');
const inp = ref<string>('');

const handleSubmit = async () => {
  const newPost = {
    message: inp.value,
    date: new Date()
  }

  await addDocument(newPost);

  if(!error.value) {
    inp.value = '';
  }
};

</script>

<template>
  <main>

        <p v-if="isPending" v-for="doc in documents" :key="doc.id">
          {{ doc.name }}
          {{ doc.iconName }}
          {{ doc.id }}
          {{ doc.date }}
        </p>
        <p v-if="!isPending">ЗАГРУЖАЕТСЯ ЕБАТЬ!</p>

    <input type="text" v-model="inp" @keyup.enter.prevent="handleSubmit">
  </main>
</template>
