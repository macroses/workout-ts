<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";
import updateChallengeCollection from "@/composables/updateChallengeCollection";
import {useChallengeStore} from "@/stores/challengesStore";
import Icon from "@/components/ui/Icon.vue";

export interface ChallengeDate {
  date: Date,
  id: string,
  isComplete: boolean
}

const props = defineProps<{
  challengeDate: Dayjs | null
}>();

const store = useChallengeStore();

const { updateCollection, status } = updateChallengeCollection()
const { documents, pending } = getCollectionByUser('challenges');

const updateChallengeStatus = (
  challengeDates: Array<ChallengeDate>,
  challengeId: string,
  date: ChallengeDate
) => {
  challengeDates.forEach(el => {
    if(el.id === date.id) {
      date.isComplete = !date.isComplete
    }
  })

  updateCollection(challengeDates, challengeId);
  store.challengeStatus = status.value;
}
</script>

<template>
  <div class="challenge-task__list">
    <template
      class="challenge-item"
      v-for="challenge in documents"
      :key="challenge.id"
    >
      <template
        v-for="dates in challenge.challengeDates"
        :key="dates.id"
      >
      <div
        class="challenge-item__value"
        @click.self.stop="updateChallengeStatus(challenge.challengeDates, challenge.id, dates)"
        v-if="dayjs(dates.date.seconds * 1000).format('DD.MM.YYYY') === challengeDate.format('DD.MM.YYYY')"
        :style="{backgroundColor: `rgba(${challenge.challengeColor}, 0.2)`}"
      >
        <Icon
          class="challenge-item__icon"
          width="15px"
          :iconName="dates.isComplete ? 'square-check': 'square-xmark'"
        />
        {{ challenge.challengeName }}
      </div>
        <template v-else></template>
      </template>
    </template>
  </div>
</template>

<style>
.challenge-task__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2px;
}

.challenge-item__value {
  font-size: 11px;
  display: flex;
  gap: 2px;
  padding-left: 2px;
  align-items: center;
  border: 1px solid var(--color-text-inverted);
}

.challenge-item__icon {
  mix-blend-mode: color-dodge;
}
</style>