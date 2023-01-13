<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useSignup from "@/composables/useSignup";
import authErrors from "@/errors/authErrors";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import useGoogleAuth from "@/composables/googleAuth";
const handleGoogleAuth = () => useGoogleAuth();

const emits = defineEmits<{
  (e: "changeAuthMethodToLogin", login: string): void;
}>();

const displayName = ref("");
const email = ref("");
const password = ref("");

const { signup, error } = useSignup();
const router = useRouter();

const handleSubmit = async () => {
  await signup(email.value, password.value, displayName.value);

  if (!error.value) {
    router.push("/home");
  }
};

const changeAuthMethodToLogin = () => {
  emits("changeAuthMethodToLogin", "login");
};
</script>

<template>
  <div class="auth-box">
    <div class="auth-title">Регистрация</div>
    <form @submit.prevent="handleSubmit" class="auth__form">
      <div class="modal-auth__body">
        <div class="input-block">
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
          <div v-if="error" class="err-msg">{{ authErrors(error) }}</div>
        </div>


        <div class="btn-block">
          <Button size="md" @click="handleSubmit">Регистрация</Button>
          <Button size="md" @click="handleGoogleAuth">
            <img src="/Google.svg" alt="Google auth">
            Войти с Google
          </Button>
          <div @click="changeAuthMethodToLogin" class="auth-tip">
            Уже зарегистрированы? Тогда войдите
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
