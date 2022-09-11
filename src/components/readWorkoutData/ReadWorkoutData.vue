<script lang="ts" setup>
import { useStore } from '@/stores/store';
import dayjs from 'dayjs';
import Icon from '../ui/Icon.vue';
import { computed } from "vue";
import deleteWorkoutCollection from '@/composables/deleteWorkoutCollection';
import type { Workout } from "@/types/interface";

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
const emits = defineEmits<{
  (e: 'editWorkout', workout: Workout): void
}>();

const editWorkout = (workout: Workout) => {
  emits('editWorkout', workout);
  store.isEditMode = true;
}

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
});

const deleteWorkoutAndCloseReadModal = (id: string): void => {
  const approveDelete = confirm('Удалить тренировку?')
  if (approveDelete) {
    deleteWorkoutCollection(id);

  }
  store.readWorkout = null;
}
</script>

<template>
<div class="workout-data" :class="{ active: store.readWorkout && !store.isEditMode }">
  <div class="workout-data__header" :style="{ backgroundColor: `rgb(${ store.readWorkout?.color })` }">
    
    <div class="workout-data__date">{{ dayjs.unix(store.readWorkout?.workoutDate?.seconds).format('DD.MM.YYYY') }}</div>
    <div class="workout-data__funcs">
      <div class="a11y-wrap" @click="editWorkout(store.readWorkout)">
        <Icon width="20px" iconName="pen"/>
      </div>
      <div class="a11y-wrap" @click="deleteWorkoutAndCloseReadModal(store.readWorkout?.id)">
        <Icon width="20px" iconName="trash" />
      </div>
      <div class="a11y-wrap" @click="store.readWorkout = null">
        <Icon width="20px" iconName="xmark"/>
      </div>
    </div>
  </div>
  <div class="workout-data__content">
    <div class="workout-data__name">{{ store.readWorkout?.workoutName }}</div>
    <ul class="workout-data__list">
      <li
        v-for="workout in result"
        :key="workout.exerciseId"
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