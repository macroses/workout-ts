<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";
import dayjs from "dayjs";
import {useChallengeStore} from "@/stores/challengesStore";

const store = useChallengeStore();
</script>

<template>
  <div class="challenge-body__item">
    <div class="challenge-start__title" v-once>Продолжительность:</div>
    <div class="challenge-start__content">
      <label class="datepicker-toggle">
        <span class="datepicker-toggle__name" v-once>Начало:</span>
        <Icon width="17px" iconName="calendar-days"/>
        <input type="date" class="datepicker-input" v-model="store.challengeStartAt" name="start">
        <span class="challenge-start__value">{{ store.challengeStartAt ? dayjs(store.challengeStartAt).format('DD.MM.YYYY') : '' }}</span>
      </label>

      <label class="datepicker-toggle">
        <span class="datepicker-toggle__name" v-once>Конец:</span>
        <Icon width="17px" iconName="calendar-days"/>
        <input type="date" class="datepicker-input" v-model="store.challengeEndAt" name="end">
        <span class="challenge-start__value">{{ store.challengeEndAt ? dayjs(store.challengeEndAt).format('DD.MM.YYYY') : ''}}</span>
      </label>
    </div>
  </div>
</template>
