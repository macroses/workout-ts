<script lang="ts" setup>
import {useChallengeStore} from "@/stores/challengesStore";
import {reactive} from "vue";

export interface ChallengeWeekday {
  id: number,
  weekday: string,
  isChecked: boolean
}

const store = useChallengeStore();

const challengeWeekdays = reactive([
  {id: 0, weekday: 'Пн', isChecked: false},
  {id: 1, weekday: 'Вт', isChecked: false},
  {id: 2, weekday: 'Ср', isChecked: false},
  {id: 3, weekday: 'Чт', isChecked: false},
  {id: 4, weekday: 'Пт', isChecked: false},
  {id: 5, weekday: 'Сб', isChecked: false},
  {id: 6, weekday: 'Вс', isChecked: false}
]);

const pushToStoreWeekdays = (day: ChallengeWeekday) => store.pushToStoreWeekdays(day);
</script>

<template>
  <div class="challenge-body__item">
    <div class="challenge-body__item-title" v-once>Повторять каждый(ые):</div>
    <div class="challenge-weekday">
      <div
        v-for="day in challengeWeekdays"
        :key="day.id"
        class="weekday-label"
      >
        <span
          @click.stop="pushToStoreWeekdays(day)"
          :class="{ active: day.isChecked }"
          class="weekday-indicator"
        >
          {{ day.weekday }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.challenge-weekday {
  display: flex;
  gap: 4px;
  margin-top: 5px;
}

.weekday-indicator {
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  font-size: 12px;
  cursor: pointer;
  border-radius: 2px;
}

.weekday-indicator.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-text-inverted);
}

.challenge-body__item-title {
  font-size: 12px;
  margin-bottom: 4px;
}

</style>