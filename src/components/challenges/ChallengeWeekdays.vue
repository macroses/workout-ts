<script lang="ts" setup>
import { useChallengeStore } from "@/stores/challengesStore";
import {reactive, ref, watch} from "vue";
import type { ChallengeWeekday } from "@/types/challengeTypes";

const store = useChallengeStore();

const challengeWeekdays = reactive([
  { id: 0, weekday: "Пн", isChecked: false },
  { id: 1, weekday: "Вт", isChecked: false },
  { id: 2, weekday: "Ср", isChecked: false },
  { id: 3, weekday: "Чт", isChecked: false },
  { id: 4, weekday: "Пт", isChecked: false },
  { id: 5, weekday: "Сб", isChecked: false },
  { id: 6, weekday: "Вс", isChecked: false },
]);

const isArrayFilled = ref(false);

const pushToStoreWeekdays = (day: ChallengeWeekday) =>
  store.pushToStoreWeekdays(day);

watch(() => store.challengeDates, (value) => {
  if (value?.length === 0) {
    isArrayFilled.value = true;
  }
  else {
    isArrayFilled.value = false;
  }
})
</script>

<template>
  <div class="challenge-body__item">
    <div class="challenge-body__item-title" v-once>Повторять каждый(ые):</div>
    <div class="challenge-weekday">
      <div v-for="day in challengeWeekdays" :key="day.id" class="weekday-label">
        <span
          @click.stop="pushToStoreWeekdays(day)"
          :class="{ active: day.isChecked }"
          class="weekday-indicator"
        >
          {{ day.weekday }}
        </span>
      </div>
    </div>
    <div v-if="isArrayFilled" class="challenge-weekday-err">Нет дней, которые подходят под выбранный диапазон дат.</div>
  </div>
</template>

<style>
.challenge-weekday-err {
  position: absolute;
  font-size: 12px;
  top: 100%;
  left: 0;
  color: var(--color-icon-accent-red);
}
</style>