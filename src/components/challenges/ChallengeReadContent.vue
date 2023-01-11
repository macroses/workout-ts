<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";
import type { ChallengeStoreState } from "@/types/challengeTypes";
import type { ChallengeDate } from "@/types/challengeTypes";
import dayjs from "dayjs";

const props = defineProps<{
  challenges: Array<ChallengeStoreState> | undefined;
  activeChallengeIndex: number;
}>();

const fillCondition = (date: ChallengeDate) => {
  if (dayjs(date.date.seconds * 1000) <= dayjs() && !date.isComplete) {
    return "#f75d7d";
  }

  if (date.isComplete) {
    return "#51ac51";
  }
};

const changeIconName = (date: ChallengeDate) => {
  if (dayjs(date.date.seconds * 1000) <= dayjs() && !date.isComplete) {
    return "square-x";
  } else if (date.isComplete) {
    return "square-check";
  } else {
    return "square";
  }
};

const challengeCheckedItemsCount = (challenge: ChallengeStoreState) => {
  const counterChecked = challenge.challengeDates?.reduce((a, b) => {
    if (b.isComplete) a++;
    return a;
  }, 0);

  return Math.round((100 / challenge.challengeDates!.length) * counterChecked!);
};
</script>

<template>
  <template v-for="(challenge, index) in challenges" :key="challenge.id">
    <div v-if="index === activeChallengeIndex" class="challenge-item__content">
      <div class="challenge-item__name">
        {{ challenge.challengeName }}
        <div class="challenge-done">
          Челлендж выполнен на {{ challengeCheckedItemsCount(challenge) }}%
        </div>
      </div>
      <ul class="challenges-item__value-list">
        <li
          class="challenges-item__value"
          v-for="date in challenge.challengeDates"
          :key="date.id"
        >
          <Icon
            width="20px"
            :style="{ fill: `${fillCondition(date)}` }"
            fill="#d9d9d9"
            :iconName="changeIconName(date)"
          />
          {{ dayjs(date.date.seconds * 1000).format("DD.MM.YYYY") }}
        </li>
      </ul>
    </div>
    <template v-else></template>
  </template>
</template>
