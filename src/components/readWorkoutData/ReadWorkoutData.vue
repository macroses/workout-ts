<script lang="ts" setup>
import { useStore } from '@/stores/store';
import dayjs from 'dayjs';
import Icon from '../ui/Icon.vue';
import { computed } from "vue";

interface ResultSet {
  exerciseId: string
  exerciseTitle: string
  sets: Array<{
    weight: string,
    repeats: string,
    load?: string,
    setId: string
  }>
}

const store = useStore();

const result = computed(() => {
  return store.readWorkout?.exercisesUserDataSets.reduce((acc: ResultSet[], current): ResultSet[] => {
    const found = acc.find(el => el.exerciseId === current.exerciseId);

    if (found) {
      found.sets.push({
        weight: current.weight,
        repeats: current.repeats,
        load: current.load,
        setId: current.setId
      });
    } else {
      acc.push({
        exerciseId: current.exerciseId,
        exerciseTitle: current.exerciseTitle,
        sets: [{
          weight: current.weight,
          repeats: current.repeats,
          load: current.load,
          setId: current.setId
        }]
      })
    }

    return acc;
  }, [])
})

</script>

<template>
<div class="workout-data active" v-if="store.readWorkout">
  <div class="workout-data__title" :style="{ backgroundColor: `rgb(${ store.readWorkout?.color })` }">
    <div class="workout-data__name">{{ store.readWorkout?.workoutName }}</div>
    <div class="workout-data__date">{{ dayjs.unix(store.readWorkout?.workoutDate?.seconds).format('DD.MM.YYYY') }}</div>
    <div class="a11y-wrap">
      <Icon width="20px" iconName="xmark"/>
    </div>
  </div>
  <!-- <div class="workout-data__funcs">
    <div class="workout-data__icon edit">
      <Icon width="20px" iconName="pen"/>
    </div>
    <div class="workout-data__icon delete">
      <Icon width="20px" iconName="trash"/>
    </div>
  </div> -->
  <div class="workout-data__content">
    <ul class="workout-data__list">
      <li
        v-for="workout in result"
        class="workout-data__list-item">
        <div class="workout-data__exercise-name">
          {{ workout.exerciseTitle }}
        </div>
        <ul class="workout-data__sets-list">
          <li v-for="set in workout.sets" :style="{ backgroundColor: `rgb(${set.load})` }"> {{set.weight}} x {{ set.repeats }}</li>
        </ul>
      </li>
    </ul>

<!--    <div v-for="item in result">{{item}}</div>-->
  </div>
</div>
</template>

<style>

</style>