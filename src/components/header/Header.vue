<script setup lang="ts">
import Burger from "./Burger.vue";
import Logo from "./Logo.vue";
import CurrentDate from "./CurrentDate.vue";
import { useAsideStore } from "@/stores/modalStore";
import UserAuth from "./UserAuth.vue";
import ChallengeToggle from "@/components/header/ChallengeToggle.vue";

const asideStore = useAsideStore();
const toggleAside = () => (asideStore.isAsideActive = true);
</script>

<template>
  <header class="header red">
    <Burger @click="toggleAside" />
    <Logo />
    <CurrentDate />
    <ChallengeToggle />
    <UserAuth />
  </header>
</template>
