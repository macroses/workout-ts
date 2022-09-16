<script setup lang="ts">
import Icon from '../ui/Icon.vue';
import toggleColorTheme from "@/composables/toggleColorTheme";

const { userTheme, toggleTheme } = toggleColorTheme();
</script>

<template>
  <label class="switcher-box">
    <input type="checkbox" class="input-switch" @change="toggleTheme">
    <span class="switcher">
      <Icon
        width="15px"
        :iconName="userTheme === 'light-theme' ? 'sun-bright' : 'moon' "/>
    </span>
  </label>
</template>