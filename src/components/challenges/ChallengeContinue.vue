<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";
import {ref} from "vue";
import dayjs from "dayjs";
import {useChallengeStore} from "@/stores/challengesStore";

const store = useChallengeStore();

const startAt = ref();
const endAt = ref();
</script>

<template>
  <div class="challenge-body__item">
    <div class="challenge-start__title" v-once>Продолжительность:</div>
    <div class="challenge-start__content">
      <label class="datepicker-toggle">
        <span class="datepicker-toggle__name" v-once>Начало:</span>
        <Icon width="17px" iconName="calendar-days"/>
        <input type="date" class="datepicker-input" v-model="startAt" @change="store.challengeStartAt = startAt" name="start">
        <span class="challenge-start__value">{{ dayjs(startAt).format('DD.MM.YYYY') }}</span>
      </label>

      <label class="datepicker-toggle">
        <span class="datepicker-toggle__name" v-once>Конец:</span>
        <Icon width="17px" iconName="calendar-days"/>
        <input type="date" class="datepicker-input" v-model="endAt" @change="store.challengeEndAt = endAt" name="end">
        <span class="challenge-start__value">{{ dayjs(endAt).format('DD.MM.YYYY') }}</span>
      </label>
    </div>
  </div>
</template>

<style>
.datepicker-toggle__name {
  font-size: 12px;
}

.challenge-start__value {
  font-size: 12px;
  font-weight: bold;
  color: var(--color-accent);
}

.challenge-start__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.datepicker-toggle {
  display: inline-flex;
  gap: 8px;
  position: relative;
}

.datepicker-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;
}
.datepicker-input::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.challenge-start__title {
  font-size: 12px;
}
</style>