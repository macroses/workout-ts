<script setup lang="ts">
import Burger from "./Burger.vue";
import Logo from "./Logo.vue";
import CurrentDate from "./CurrentDate.vue";
import { useAsideStore } from "@/stores/modalStore";
import UserAuth from "./UserAuth.vue";
import ChallengeToggle from "@/components/header/ChallengeToggle.vue";

const asideStore = useAsideStore();
const toggleAside = () => (asideStore.isAsideActive = !asideStore.isAsideActive);
</script>

<template>
  <header class="header red">
    <Burger @click="toggleAside" />
    <Logo />
    <CurrentDate v-if="$route.name === 'home'"/>
    <div class="header__personal">
      <ChallengeToggle v-if="$route.name === 'home'" />
      <UserAuth />
    </div>
  </header>
</template>
