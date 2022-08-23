<script setup lang="ts">
import { ref } from "vue";
import Button from "../ui/Button.vue";
import ModalSignup from "../modalAuth/ModalSignup.vue";

const showModal = ref(false);
</script>

<template>
  <Button 
    size="md" 
    @click="showModal = true"
  >
    Войти
  </Button>
  <ModalSignup 
    :isModalOpen="showModal"
    @close="showModal = false"
  />
</template>