<script lang="ts" setup>
import {ref, watchEffect} from "vue";
import {auth} from "@/firebase/config";
import {signOut} from "firebase/auth";
import getUser from "@/composables/getUser";
import {useRouter} from "vue-router";
import {clickOutside} from "@/helpers/clickOutside";

import Icon from "../ui/Icon.vue";
import ThemeToggle from "@/components/header/ThemeToggle.vue";

const {user} = getUser();
const router = useRouter();
const isListActive = ref(false);
const list = ref(null);

const logOut = (): void => {
  signOut(auth);
  isListActive.value = false;
};

watchEffect(() => {
  if (!user.value) {
    router.push("/");
  }
});

clickOutside(list, () => (isListActive.value = false));
</script>

<template>
  <div
    v-if="user"
    class="logged">
    <div ref="list" class="user-name" @click="isListActive = !isListActive">
      {{ user.displayName }}
      <Icon :iconName="isListActive ? 'angle-up' : 'angle-down'" width="14px"/>
    </div>
    <ul class="user-funcs" :class="{active: isListActive}">
      <li class="user-funcs__item">
        <ThemeToggle/>
      </li>
      <li class="user-funcs__item">
        <router-link to="/settings" >персональные данные</router-link>
      </li>
      <li class="user-funcs__item" @click="logOut">
        Выйти
        <Icon width="17px" iconName="right-from-bracket"/>
      </li>
    </ul>
  </div>
</template>

<style>
.user-funcs {

  transform: scale(0);
  transform-origin: top right;
  transition: transform 0.2s;
}

.user-funcs.active {
  transform: scaleY(1);
}
</style>