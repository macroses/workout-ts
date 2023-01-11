<script setup lang="ts">
import { useAsideStore } from "@/stores/modalStore";
import { clickOutside } from "@/helpers/clickOutside";
import { ref } from "vue";

const asideStore = useAsideStore();
const asideRef = ref(null);

// clickOutside(asideRef, () => asideStore.isAsideActive = false);
</script>

<template>
  <aside
    ref="asideRef"
    class="aside"
    :class="{ active: asideStore.isAsideActive }"
  >
    <router-link to="/statistic">stats</router-link>
  </aside>
</template>

<style>
.aside {
  width: 0;
  background: var(--color-bg);
  height: calc(100vh - 57px);
  z-index: 3;
  position: fixed;
  top: 57px;
  border-right: 1px solid var(--color-border);
  transform: translateX(-100%);
  overflow: hidden;
  transition: transform 0.2s, width 0.2s;
}

.aside.active {
  transform: translateX(0);
  width: 225px;
}
</style>
