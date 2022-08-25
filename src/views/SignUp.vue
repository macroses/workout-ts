<script lang="ts" setup>
import { ref } from 'vue';
import Login from '../components/Login/Login.vue';
import Signup from "@/components/Login/Signup.vue";

const isSignup = ref(true);

const handleReg = () :void => {
  console.log('its reg')
  isSignup.value = true;
}

const handleLogin = () :void => {
  console.log('its log')
  isSignup.value = false;
}
</script>

<template>
  <div class="auth-title">
    <div @click="isSignup = true">Регистрация</div>
    <div @click="isSignup = false">Вход</div>
  </div>
  <Signup
    v-if="isSignup"
    @handleReg="handleReg"/>
  <Login
    v-else
    @handleLogin="handleLogin"/>
</template>

<style>
.auth-title {
  display: flex;
  margin: 0 auto;
  width: 600px;
}
</style>