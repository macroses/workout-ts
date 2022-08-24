<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useLogin from '../composables/useLogin';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

const email = ref('');
const password = ref('');

const { login, error } = useLogin();
const router = useRouter();

const handleSubmit = async () => {
  await login(email.value, password.value);

  if(!error.value) {
    router.push('/home');
    console.log('логин');
    
  }
}


</script>

<template>
  <div class="auth-box">
    <div class="title">
      <RouterLink to="/">Регистрация</RouterLink> |
      Вход
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
        <Button size="md" @click="handleSubmit">Войти</Button>
      </div>
      <div v-if="error" class="err-msg">{{ error }}</div>
    </div>
    </form>
  </div>
</template>

<style>
.auth-box {
  max-width: 400px;
  margin: 50px auto;
  position: relative;
}

.err-msg {
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 12px;
  color: red;
}
</style>