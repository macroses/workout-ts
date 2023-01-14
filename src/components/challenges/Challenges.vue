<script lang="ts" setup>
import {ref, watch} from "vue";
import {useAsideStore} from "@/stores/modalStore";
import {useChallengeStore} from "@/stores/challengesStore";
import getCollectionByUser from "@/composables/getCollectionByUser";
import ChallengesTop from "@/components/challenges/ChallengesTop.vue";
import ChallengeWeekdays from "@/components/challenges/ChallengeWeekdays.vue";
import ChallengeColors from "@/components/challenges/ChallengeColors.vue";
import ChallengeContinue from "@/components/challenges/ChallengeContinue.vue";
import ChallengeName from "@/components/challenges/ChallengeName.vue";
import Button from "@/components/ui/Button.vue";
import ChallengesAll from "@/components/challenges/ChallengesAll.vue";
import Icon from "@/components/ui/Icon.vue";

const modalStore = useAsideStore();
const challengeStore = useChallengeStore();

const {documents, pending} = getCollectionByUser("challenges");
const activeTabId = ref(1);
const isSubmitDisabled = ref(false);

const submitChallenge = () => {
  if (
    challengeStore.challengeName &&
    challengeStore.challengeStartAt &&
    challengeStore.challengeEndAt &&
    challengeStore.challengeDates?.length !== 0 || challengeStore.challengeDates !== null
  ) {
    challengeStore.pushChallengeToServer();
    modalStore.isChallengeModalActive = false;
  }
  else {
    isSubmitDisabled.value = true;
    return;
  }
};

const closeResetModal = () => {
  modalStore.isChallengeModalActive = false;
  challengeStore.resetData();
  isSubmitDisabled.value = false;
  activeTabId.value = 1;
};

const getTabId = (activeTab: number) => activeTabId.value = activeTab;

watch(() => activeTabId.value, value => isSubmitDisabled.value = false)
</script>

<template>
  <div
    v-if="modalStore.isChallengeModalActive"
    class="challenges-layer"
    @click.self="closeResetModal"
  >
    <div class="challenges-modal">
      <ChallengesTop
        :challengesCounter="documents.length"
        @dropTabId="getTabId"
      />
      <div v-if="activeTabId === 1" class="challenge-body">
        <ChallengeName/>
        <ChallengeColors/>
        <ChallengeContinue/>
        <ChallengeWeekdays/>
      </div>
      <ChallengesAll v-if="activeTabId === 2" :challenges="documents.value"/>
      <div class="challenge-handle">
        <div v-if="isSubmitDisabled" class="err-info">
          <Icon width="15px" iconName="circle-exclamation" />
          Заполните все параметры: название, дату начала, окончания и дни повторения.
        </div>
        <Button
          v-if="activeTabId === 1"
          accent
          class="challenges-button"
          size="md"
          @click="submitChallenge">
          Сохранить
        </Button>
      </div>
    </div>
  </div>
</template>

<style>
.challenge-handle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}
</style>