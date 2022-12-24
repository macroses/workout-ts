<script setup lang="ts">
import {useAsideStore} from "@/stores/modalStore";
import {useChallengeStore} from "@/stores/challengesStore";
import ChallengesTop from "@/components/challenges/ChallengesTop.vue";
import ChallengeWeekdays from "@/components/challenges/ChallengeWeekdays.vue";
import ChallengeColors from "@/components/challenges/ChallengeColors.vue";
import ChallengeContinue from "@/components/challenges/ChallengeContinue.vue";
import ChallengeName from "@/components/challenges/ChallengeName.vue";
import Button from "@/components/ui/Button.vue";

const modalStore = useAsideStore();
const challengeStore = useChallengeStore();

const submitChallenge = () => {
  challengeStore.pushChallengeToServer();
  modalStore.isChallengeModalActive = false;
}
</script>

<template>
<div
  v-if="modalStore.isChallengeModalActive"
  @click.self="modalStore.isChallengeModalActive = false"
  class="challenges-layer">
  <div class="challenges-modal">
    <ChallengesTop/>
    <div class="challenge-body">
      <ChallengeName />
      <ChallengeColors />
      <ChallengeContinue />
      <ChallengeWeekdays />
    </div>
    <Button
      size="md"
      accent
      @click="submitChallenge"
      class="challenges-button"
    >
      Сохранить
    </Button>
  </div>
</div>
</template>

<style>
.input-wrap {
  margin-bottom: 0;
}

.challenges-button {
  margin-left: auto;
}

.challenge-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 24px;
  padding: 12px 0;
  margin-bottom: 24px;
}

.challenges-layer {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  background-color: rgba(0,0,0, 0.3);
  z-index: 999;
  padding: 12px;
}

.challenges-modal {
  width: 100%;
  max-width: 800px;
  border-radius: 4px;
  background-color: var(--color-bg);
  padding: 6px 20px 12px;
  position: relative;
}

</style>