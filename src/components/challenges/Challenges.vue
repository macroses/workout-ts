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

const closeResetModal = () => {
  modalStore.isChallengeModalActive = false;
  challengeStore.resetData()
}
</script>

<template>
<div
  v-if="modalStore.isChallengeModalActive"
  @click.self="closeResetModal"
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
