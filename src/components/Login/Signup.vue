<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useSignup from '@/composables/useSignup';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

const displayName = ref('');
const email = ref('');
const password = ref('');

const { signup, error } = useSignup();
const router = useRouter();

const handleSubmit = async () => {
  await signup(email.value, password.value, displayName.value);

  if(!error.value) {
    router.push('/home');
  }
}
</script>

<template>
  <div class="auth-box">
    <div v-if="error" class="err-msg">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="modal-auth__body">
        <Input
          inputType="text"
          :required="true"
          placeholder="Имя"
          v-model="displayName"
        />
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
          <Button size="md" @click="handleSubmit">Регистрация</Button>
        </div>

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