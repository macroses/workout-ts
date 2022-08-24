<script setup lang="ts">
import Icon from "../ui/Icon.vue";
import Input from "../ui/Input.vue";
import {ref} from "vue";

const props = defineProps<{
  isModalOpen: boolean
}>();

const emits = defineEmits<{
  (e: 'close'): void
}>();

const nickName = ref('');
const email = ref('');
const password = ref('');

const closeModal = () => emits('close');
</script>

<template>
<teleport to="body">
  <Transition name="modal-auth">
    <div v-if="isModalOpen" class="modal-auth-mask" @click.self="closeModal">
      <div class="modal-auth-container">
        <div class="modal-auth__title">
          Регистрация
          <Icon width="20px" iconName="xmark"/>
        </div>
        <div class="modal-auth__body">
          <Input 
              inputType="text" 
              :required="true"
              placeholder="Имя"
            />
          <Input 
              inputType="email" 
              :required="true"
              placeholder="Почта"
            />
          <Input 
              inputType="password" 
              :required="true"
              placeholder="Пароль"
            />

        </div>
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
</style>