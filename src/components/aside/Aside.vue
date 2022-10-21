<script setup lang="ts">

</script>

<template>
<aside class="active">
  53534
</aside>
</template>

<style>
aside {
  width: 0;
  background: var(--color-bg);
  height: 100vh;
  z-index: 3;
  border-right: 1px solid var(--color-border);
  transform: translateX(-100%);
  overflow: hidden;
  transition: transform 0.2s, width 0.2s;
}

aside.active {
  transform: translateX(0);
  width: 225px;
}
</style>