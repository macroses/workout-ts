<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import updateChallengeCollection from "@/composables/updateChallengeCollection";
import { useChallengeStore } from "@/stores/challengesStore";

export interface ChallengeDate {
  date: Date;
  id: string;
  isComplete: boolean;
}

const props = defineProps<{
  challengeDate: Dayjs | null;
}>();

const store = useChallengeStore();

const { updateCollection, status } = updateChallengeCollection();
const { documents, pending } = getCollectionByUser("challenges");

const updateChallengeStatus = (
  challengeDates: Array<ChallengeDate>,
  challengeId: string,
  date: ChallengeDate
) => {
  challengeDates.forEach((el) => {
    if (el.id === date.id) {
      date.isComplete = !date.isComplete;
    }
  });

  updateCollection(challengeDates, challengeId);
  store.challengeStatus = status.value;
};
</script>

<template>
  <div class="challenge-task__list">
    <template
      class="challenge-item"
      v-for="challenge in documents"
      :key="challenge.id"
    >
      <template v-for="dates in challenge.challengeDates" :key="dates.id">
        <div
          class="challenge-item__value"
          :class="{ checked: dates.isComplete }"
          :title="challenge.challengeName"
          @click.stop="
            updateChallengeStatus(challenge.challengeDates, challenge.id, dates)
          "
          v-if="
            dayjs(dates.date.seconds * 1000).format('DD.MM.YYYY') ===
            challengeDate.format('DD.MM.YYYY')
          "
          :style="[
            !dates.isComplete
              ? { 'background-color': `rgba(${challenge.challengeColor}, 0.4)` }
              : { 'background-color': `rgba(${challenge.challengeColor}, 1)` },
          ]"
        >
          <div class="challenge-item__icon-wrap"></div>
        </div>
        <template v-else></template>
      </template>
    </template>
  </div>
</template>

<style>
.challenge-item__value.checked .challenge-item__icon-wrap {
  background-color: transparent;
}
</style>
