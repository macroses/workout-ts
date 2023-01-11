<script lang="ts" setup>
import { useChallengeStore } from "@/stores/challengesStore";
import Input from "@/components/ui/Input.vue";

const challengeStore = useChallengeStore();
</script>

<template>
  <div class="challenge-body__item">
    <div class="challenge-body__item-title">Название:</div>
    <Input
      v-model="challengeStore.challengeName"
      input-type="text"
      placeholder=""
    />
  </div>
</template>

<style scoped>
.challenge-body__item-title {
  font-size: 12px;
  margin-bottom: 4px;
}
</style>
