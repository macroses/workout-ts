<script setup lang="ts">
import Icon from "../ui/Icon.vue";
import toggleColorTheme from "@/composables/toggleColorTheme";

const { userTheme, toggleTheme } = toggleColorTheme();
</script>

<template>
  <div class="switcher-box">
    <div
      class="light"
      :class="{active: userTheme === 'light-theme'}"
      @click.stop="toggleTheme('light-theme')">
      <Icon
        width="17px"
        icon-name="sun-bright"/>
    </div>
    <div
      class="dark"
      @click.stop="toggleTheme('dark-theme')"
      :class="{active: userTheme === 'dark-theme'}">
      <Icon
        width="17px"
        icon-name="moon"/>
    </div>
    <div
      class="dark"
      @click.stop="toggleTheme('prefer')"
      :class="{active: userTheme === 'prefer'}">
      <Icon
        width="17px"
        icon-name="gear"/>
    </div>
  </div>
</template>
