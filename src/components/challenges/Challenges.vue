<script setup lang="ts">
import { ref } from "vue";
import { useAsideStore } from "@/stores/modalStore";
import { useChallengeStore } from "@/stores/challengesStore";
import getCollectionByUser from "@/composables/getCollectionByUser";
import ChallengesTop from "@/components/challenges/ChallengesTop.vue";
import ChallengeWeekdays from "@/components/challenges/ChallengeWeekdays.vue";
import ChallengeColors from "@/components/challenges/ChallengeColors.vue";
import ChallengeContinue from "@/components/challenges/ChallengeContinue.vue";
import ChallengeName from "@/components/challenges/ChallengeName.vue";
import Button from "@/components/ui/Button.vue";
import ChallengesAll from "@/components/challenges/ChallengesAll.vue";

const modalStore = useAsideStore();
const challengeStore = useChallengeStore();

const { documents, pending } = getCollectionByUser("challenges");
const activeTabId = ref(1);

const submitChallenge = () => {
  challengeStore.pushChallengeToServer();
  modalStore.isChallengeModalActive = false;
};

const closeResetModal = () => {
  modalStore.isChallengeModalActive = false;
  challengeStore.resetData();
};

const getTabId = (activeTab: number) => {
  activeTabId.value = activeTab;
};
</script>

<template>
  <div
    v-if="modalStore.isChallengeModalActive"
    @click.self="closeResetModal"
    class="challenges-layer"
  >
    <div class="challenges-modal">
      <ChallengesTop
        :challengesCounter="documents.length"
        @dropTabId="getTabId"
      />
      <div v-if="activeTabId === 1" class="challenge-body">
        <ChallengeName />
        <ChallengeColors />
        <ChallengeContinue />
        <ChallengeWeekdays />
      </div>
      <ChallengesAll v-if="activeTabId === 2" :challenges="documents.value" />
      <Button
        v-if="activeTabId === 1"
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
