<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import Login from '../components/Login/Login.vue';
import Signup from "@/components/Login/Signup.vue";
import getUser from "@/composables/getUser";
import { useRouter } from 'vue-router';

const isSignup = ref<boolean>(true);
const { user } = getUser();

const router = useRouter();

const handleReg = () :void => {
  console.log('its reg')
  isSignup.value = true;
}

const handleLogin = () :void => {
  isSignup.value = false;
}

watchEffect(() => {
  if(user.value) {
    router.push('/home');
  }
})
</script>

<template>
  <div class="auth-container">
    <div class="auth-body">
      <div class="auth-title">
        <div 
          @click="isSignup = true" 
          :class="{active: isSignup}"
        >
          Регистрация
        </div>
        <div @click="isSignup = false" 
          :class="{active: !isSignup}"
        >
          Вход
        </div>
      </div>
      <Signup
        v-if="isSignup"
        @handleReg="handleReg"/>
      <Login
        v-else
        @handleLogin="handleLogin"/>
    </div>
  </div>
</template>

<style>
  
</style>