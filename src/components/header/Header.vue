<script setup lang="ts">
import Burger from './Burger.vue';
import Logo from './Logo.vue';
import CurrentDate from './CurrentDate.vue';
import ThemeToggle from './ThemeToggle.vue';
import UserAuth from './UserAuth.vue';

</script>

<template>
  <header class="header">
    <Burger />
    <Logo />
    <CurrentDate />
    <ThemeToggle />
    <UserAuth />
  </header>
</template>