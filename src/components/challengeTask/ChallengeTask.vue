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
<div
  class="challenge-item"
  v-for="challenge in documents"
  :key="challenge.id"
>
  <div
    v-for="dates in challenge.challengeDates"
    :key="dates.id"
  >
    <span
      class="challenge-item__value"
      @click.self.stop="updateChallengeStatus(challenge.challengeDates, challenge.id, dates)"
      v-if="dayjs(dates.date.seconds * 1000).format('DD.MM.YYYY') === challengeDate.format('DD.MM.YYYY')"
    >
      <Icon width="13px" :iconName="dates.isComplete ? 'square-check': 'square-xmark'"/>
      {{ challenge.challengeName }}
    </span>
  </div>
</div>
</template>

<style>


.challenge-item__value {
  font-size: 11px;
}
</style>