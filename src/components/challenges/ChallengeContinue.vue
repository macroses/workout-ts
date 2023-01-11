<script lang="ts" setup>
import Icon from "@/components/ui/Icon.vue";
import { useChallengeStore } from "@/stores/challengesStore";
import { ref } from "vue";
import dayjs from "dayjs";

const store = useChallengeStore();
const startAt = ref("");
const endAt = ref("");

const setStart = () => {
  store.challengeStartAt = dayjs(startAt.value);
};
const setEnd = () => {
  store.challengeEndAt = dayjs(endAt.value);
};
</script>

<template>
  <div class="challenge-body__item">
    <div v-once class="challenge-start__title">Продолжительность:</div>
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
        />
        <span class="challenge-start__value">{{
          endAt ? dayjs(endAt).format("DD.MM.YYYY") : ""
        }}</span>
      </label>
    </div>
  </div>
</template>
