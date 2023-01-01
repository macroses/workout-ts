<script setup lang="ts">
import type {Collection} from "@/types/interface";
import {ref} from "vue";

const props = defineProps<{
  challenges: Array<Collection> | undefined
}>();

const emits = defineEmits<{
  (e: 'challengeNumber', activeChallengeNumber: number): void
}>();

const activeChallenge = ref(0);

const setActiveChallengeNumber = (index: number) => {
  emits('challengeNumber', index);
  activeChallenge.value = index;
}
</script>

<template>
  <ul class="challenges-list">
    <li
      v-for="(challenge, index) in challenges"
      :key="challenge.id"
      class="challenges-item"
      :class="{ active: activeChallenge === index }"
      @click="setActiveChallengeNumber(index)"
    >
      {{ challenge.challengeName }}
    </li>
  </ul>
</template>

<style scoped>
.challenges-list {
  width: 200px;
  border-right: 1px solid var(--color-border);
}

.challenges-item {
  font-size: 11px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.challenges-item.active {
  background-color: var(--color-bg-hover);
  color: var(--color-accent);
}
</style>