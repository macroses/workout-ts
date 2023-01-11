<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useLogin from "@/composables/useLogin";
import authErrors from "@/errors/authErrors";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";

const emits = defineEmits<{
  (e: "changeAuthMethodToSignup", login: string): void;
}>();

const email = ref<string>("");
const password = ref<string>("");

const { login, error, pending } = useLogin();
const router = useRouter();

const handleSubmit = async (): Promise<void> => {
  await login(email.value, password.value);

  if (!error.value) {
    await router.push("/home");
  }
};

const changeAuthMethodToSignup = () => {
  emits("changeAuthMethodToSignup", "signup");
};
</script>

<template>
  <div class="auth-box">
    <div v-if="error" class="err-msg">{{ authErrors(error) }}</div>
    <div class="auth-title">Вход</div>
    <form @submit.prevent="handleSubmit">
      <div class="modal-auth__body">
        <Input
          v-model="email"
          :required="true"
          inputType="email"
          placeholder="Почта"
        />
        <Input
          v-model="password"
          :required="true"
          inputType="password"
          placeholder="Пароль"
        />
        <div class="auth-tip" @click="changeAuthMethodToSignup">
          Нет аккаунта? Пройдите регистрацию
        </div>
        <div class="btn-block">
          <Button v-if="!pending" size="md" @click="handleSubmit">Войти</Button>
          <Button
            v-if="pending"
            :isDisabled="true"
            size="md"
            @click="handleSubmit"
            >Loading...
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
.auth-box {
  max-width: 400px;
  margin: 0 auto;
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
