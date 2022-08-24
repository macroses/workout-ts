<!-- <script setup lang="ts">
import { ref } from "vue";
// import { useRouter } from "vue-router";

import Icon from "../ui/Icon.vue";
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
import useSignup from "@/composables/useSignup";

const props = defineProps<{
  isModalOpen: boolean
}>();

const emits = defineEmits<{
  (e: 'close'): void
}>();



const closeModal = () => emits('close');
</script>

<template>
<teleport to="body">
  <Transition name="modal-auth">
    <div v-if="isModalOpen" class="modal-auth-mask" @click.self="closeModal">
      <div class="modal-auth-container">
        <div class="modal-auth__title">
          Регистрация
          <div class="a11y-wrap">
            <Icon width="20px" iconName="xmark" @click="closeModal"/>
          </div>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="modal-auth__body">
          <Input 
            inputType="email" 
            :required="true"
            placeholder="Почта"
            v-model="email"
          />
          <Input 
            inputType="password" 
            :required="true"
            placeholder="Пароль"
            v-model="password"
          />
          <div class="btn-block">
            <Button size="md" @click="closeModal">Отмена</Button>
            <Button size="md" @click="handleSubmit">Регистрация</Button>
          </div>
          <div v-if="error">{{ error }}</div>
        </div>
        </form>
      </div>
    </div>
  </Transition>
</teleport>
</template>

<style>
.modal-auth__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> -->