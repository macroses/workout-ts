<script setup lang="ts">
import { ref } from 'vue';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
import { clickOutside } from '@/helpers/clickOutside';

import Icon from "../ui/Icon.vue";

const { user } = getUser();
const router = useRouter();
const isListActive = ref(false);
const list = ref(null);

const logOut = ():void => {
  signOut(auth);
  router.push('/login');
  isListActive.value = false;
}

clickOutside(list, () => isListActive.value = false)
</script>

<template>
  <div 
    class="logged" v-if="user"
    @click="isListActive = true"
  >
    <div class="user-name" v-if="user.displayName.length < 10">{{ user.displayName }}</div>
    <div class="user-name" v-else>{{ user.displayName.substring(0,10)+"..." }}</div>
    <Icon width="14px" iconName="angle-down"/>
    <ul 
      ref="list"
      class="user-funcs" 
      v-if="isListActive"
    >
      <li class="user-funcs__item" @click="logOut">Выйти</li>
    </ul>
  </div>
</template>