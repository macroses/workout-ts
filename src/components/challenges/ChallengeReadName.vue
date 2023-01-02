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
