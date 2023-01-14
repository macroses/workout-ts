<script lang="ts" setup>
import Icon from "@/components/ui/Icon.vue";
import { useChallengeStore } from "@/stores/challengesStore";
import { ref } from "vue";
import dayjs from "dayjs";

const store = useChallengeStore();
const startAt = ref("");
const endAt = ref("");

const startAtValid = ref(false);
const endAtValid = ref(false);

const today = dayjs().format('DD.MM.YYYY');

const resetErrors = () => {
  startAtValid.value = false;
  endAtValid.value = false;
}

const setStart = () => {
  if (dayjs(startAt.value).format('DD.MM.YYYY') < today) {
    startAtValid.value = true;
    startAt.value = "";
    return;
  }

  startAtValid.value = false;
  store.challengeStartAt = dayjs(startAt.value);
};

const setEnd = () => {
  if (dayjs(endAt.value).format('DD.MM.YYYY') <= dayjs(startAt.value).format('DD.MM.YYYY') || !startAt.value) {
    endAtValid.value = true;
    endAt.value = "";
    return;
  }

  if (dayjs(endAt.value).format('DD.MM.YYYY') <= today) {
    endAtValid.value = true;
    endAt.value = "";
    return;
  }

  endAtValid.value = false;
  store.challengeEndAt = dayjs(endAt.value);
};

const title = "Помните, что дата начала не может быть раньше сегодняшнего дня. А дата окончания не может быть раньше начальной даты.😀"
</script>

<template>
  <div class="challenge-body__item">
    <div v-once class="challenge-start__title" :title="title">
      Продолжительность
      <Icon width="15px" iconName="square-question" />:
    </div>
    <div class="challenge-start__content">
      <label class="datepicker-toggle">
        <span v-once class="datepicker-toggle__name">Начало:</span>
        <Icon icon-name="calendar-days" width="17px" />
        <input
          v-model="startAt"
          class="datepicker-input"
          name="start"
          type="date"
          @change="setStart"
          @click="resetErrors"
        />
        <span class="challenge-start__value">{{
          startAt ? dayjs(startAt).format("DD.MM.YYYY") : ""
        }}</span>

      </label>

      <label class="datepicker-toggle">
        <span v-once class="datepicker-toggle__name">Конец:</span>
        <Icon icon-name="calendar-days" width="17px" />
        <input
          v-model="endAt"
          class="datepicker-input"
          name="end"
          type="date"
          @change="setEnd"
          @click="resetErrors"
        />
        <span class="challenge-start__value">{{
          endAt ? dayjs(endAt).format("DD.MM.YYYY") : ""
        }}</span>
      </label>
      <span v-if="startAtValid" class="challenge-err start">Не раньше сегодняшнего дня</span>
      <span v-if="endAtValid" class="challenge-err start">Не раньше даты начала</span>
    </div>

  </div>
</template>

<style>
.challenge-err {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 12px;
  color: var(--color-icon-accent-red);
}
</style>