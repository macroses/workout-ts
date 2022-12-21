<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Icon from "@/components/ui/Icon.vue";
import {useAsideStore} from "@/stores/modalStore";

const modalStore = useAsideStore();
</script>

<template>
  <div class="challenge-toggle">
    <Button
      @click="modalStore.isChallengeModalActive = true"
      size="md">
      <Icon width="15" icon-name="bolt"/>
      Challenge
    </Button>
  </div>
</template>

<style scoped>
.challenge-toggle {
  margin-left: auto;
}

.challenge-toggle svg {
  fill: var(--color-icon-accent-orange);
}
</style>