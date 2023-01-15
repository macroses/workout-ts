<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Icon from "@/components/ui/Icon.vue";
import { useAsideStore } from "@/stores/modalStore";

const modalStore = useAsideStore();
</script>

<template>
  <div class="challenge-toggle">
    <Button size="md" @click="modalStore.isChallengeModalActive = true">
      <Icon width="15" icon-name="trophy-star" />
      <span class="challenge-toggle__text">Challenge</span>
    </Button>
  </div>
</template>

<style scoped>
.challenge-toggle svg {
  fill: var(--color-icon-accent-orange);
}
</style>
