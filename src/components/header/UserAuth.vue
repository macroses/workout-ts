<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
import { clickOutside } from '@/helpers/clickOutside';

import Icon from "../ui/Icon.vue";
import ThemeToggle from '@/components/header/ThemeToggle.vue'

const { user } = getUser();
const router = useRouter();
const isListActive = ref<boolean>(false);
const list = ref<null | HTMLAllCollection >(null);

const logOut = ():void => {
  signOut(auth);
  isListActive.value = false;
}

watchEffect(() => {
  if (!user.value) {
    router.push('/');
  }
})

clickOutside(list, () => isListActive.value = false)
</script>

<template>
  <div 
    class="logged" v-if="user"
    @click="isListActive = true"
  >
    <div class="user-name">{{ user.displayName }}</div>
    <Icon width="14px" iconName="angle-down"/>
    <ul 
      ref="list"
      class="user-funcs" 
      v-if="isListActive"
    >
      <li class="user-funcs__item" @click="logOut">Выйти</li>
      <li class="user-funcs__item"><ThemeToggle/></li>
    </ul>
  </div>
</template>