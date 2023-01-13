<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import Login from "../components/Login/Login.vue";
import Signup from "@/components/Login/Signup.vue";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

const isSignup = ref<boolean>(true);
const { user } = getUser();

const router = useRouter();

const handleReg = (): void => {
  isSignup.value = true;
};

const handleLogin = (): void => {
  isSignup.value = false;
};

const getAuthMethod = (loginMethod: string) => {
  isSignup.value = loginMethod !== "login";
};

watchEffect(() => {
  if (user.value) {
    router.push("/home");
  }
});
</script>

<template>
  <div class="auth-container">
    <div class="auth-body">
      <div class="auth-carousel">
        <div class="auth-tip-time">Что-то тут должно быть для красоты...</div>
        <div class="img-wrap">
          <img src="/think.png" alt="thinking guy">
        </div>
      </div>
      <Signup
        v-if="isSignup"
        @handleReg="handleReg"
        @changeAuthMethodToLogin="getAuthMethod" />
      <Login
        v-else
        @handleLogin="handleLogin"
        @changeAuthMethodToSignup="getAuthMethod" />
    </div>
  </div>
</template>

<style>
.img-wrap {
  width: 100%;
  height: 200px;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.auth-carousel {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.auth-carousel .auth-tip-time {
  font-size: 13px;
  margin-bottom: 16px;
}
</style>
