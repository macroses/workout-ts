<script setup lang="ts">
import Burger from './Burger.vue';
import Logo from './Logo.vue';
import CurrentDate from './CurrentDate.vue';
import {useAsideStore} from "@/stores/asideStore";
import UserAuth from './UserAuth.vue';

const asideStore = useAsideStore();
const toggleAside = () => asideStore.isAsideActive = !asideStore.isAsideActive
</script>

<template>
  <header class="header red">
    <Burger @click="toggleAside"/>
    <Logo />
    <CurrentDate />
    <UserAuth />
  </header>
</template>