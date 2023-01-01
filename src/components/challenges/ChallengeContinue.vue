<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";
import {useChallengeStore} from "@/stores/challengesStore";
import {ref} from "vue";
import dayjs from "dayjs";

const store = useChallengeStore();
const startAt = ref('');
const endAt = ref('');

const setStart = () => store.challengeStartAt = startAt.value;
const setEnd = () => store.challengeEndAt = endAt.value;
</script>

<template>
  <div class="challenge-body__item">
    <div class="challenge-start__title" v-once>Продолжительность:</div>
    <div class="challenge-start__content">
      <label class="datepicker-toggle">
        <span class="datepicker-toggle__name" v-once>Начало:</span>
        <Icon width="17px" iconName="calendar-days"/>
        <input type="date" class="datepicker-input" v-model="startAt" name="start" @change="setStart">
        <span class="challenge-start__value">{{ startAt ? dayjs(startAt).format('DD.MM.YYYY') : '' }}</span>
      </label>

      <label class="datepicker-toggle">
        <span class="datepicker-toggle__name" v-once>Конец:</span>
        <Icon width="17px" iconName="calendar-days"/>
        <input type="date" class="datepicker-input" v-model="endAt" name="end" @change="setEnd">
        <span class="challenge-start__value">{{ endAt ? dayjs(endAt).format('DD.MM.YYYY') : '' }}</span>
      </label>
    </div>
  </div>
</template>
