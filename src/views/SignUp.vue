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
  isSignup.value = true;
}


const handleLogin = () :void => {
  isSignup.value = false;
}

const getAuthMethod = (loginMethod: string) => {
  isSignup.value = loginMethod !== 'login';
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
      <Transition :duration="100" mode="out-in" name="slideMonth">
        <Signup
          v-if="isSignup"
          @handleReg="handleReg"
          @changeAuthMethodToLogin="getAuthMethod"
        />
        <Login
          v-else
          @handleLogin="handleLogin"
          @changeAuthMethodToSignup="getAuthMethod"
        />
      </Transition>
    </div>
  </div>
</template>

<style>
  
</style>