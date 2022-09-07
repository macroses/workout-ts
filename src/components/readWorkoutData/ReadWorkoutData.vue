<script lang="ts" setup>
import { useStore } from '@/stores/store';
import dayjs from 'dayjs';
import Icon from '../ui/Icon.vue';

const store = useStore();
</script>

<template>
<div class="workout-data active">
  <div class="workout-data__title" :style="{ backgroundColor: `rgb(${ store.readWorkout?.color })` }">
    <div class="workout-data__name">{{ store.readWorkout?.workoutName }}</div>
    <div class="workout-data__date">{{ dayjs.unix(store.readWorkout?.workoutDate.seconds).format('DD.MM.YYYY') }}</div>
    <div class="a11y-wrap">
      <Icon width="20px" iconName="xmark"/>
    </div>
  </div>
  <div class="workout-data__funcs">
    <div class="workout-data__icon edit">
      <Icon width="20px" iconName="pen"/>
    </div>
    <div class="workout-data__icon delete">
      <Icon width="20px" iconName="trash"/>
    </div>
  </div>
  <div class="workout-data__content">
    <ul class="workout-data__list">
      <li
        v-for="workout in store.readWorkout?.exercisesUserDataSets"
        class="workout-data__list-item">{{ workout.exerciseTitle }}</li>
    </ul>
  </div>
</div>
</template>