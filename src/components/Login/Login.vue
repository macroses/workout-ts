<script lang="ts" setup>
import {onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import useLogin from "@/composables/useLogin";
import authErrors from "@/errors/authErrors";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import useGoogleAuth from "@/composables/googleAuth";
const handleGoogleAuth = () => useGoogleAuth();

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
    <div class="auth-title">Вход</div>
    <form @submit.prevent="handleSubmit" class="auth__form">
      <div class="modal-auth__body">
        <div class="input-block">
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
          <div v-if="error" class="err-msg">{{ authErrors(error) }}</div>
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
          <Button size="md" @click="handleGoogleAuth">
            <img src="/Google.svg" alt="Google auth">
            Войти с Google
          </Button>
          <div class="auth-tip" @click="changeAuthMethodToSignup">
            Нет аккаунта? Пройдите регистрацию
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style>

</style>
