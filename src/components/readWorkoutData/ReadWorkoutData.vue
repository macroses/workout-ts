<script lang="ts" setup>
import { useStore } from '@/stores/store';
import dayjs from 'dayjs';
import Icon from '../ui/Icon.vue';
import deleteWorkoutCollection from '@/composables/deleteWorkoutCollection';
import type { Workout } from "@/types/interface";

const store = useStore();
const emits = defineEmits<{
  (e: 'editWorkout', workout: Workout): void
}>();

const editWorkout = (workout: Workout) => {
  emits('editWorkout', workout);
  store.isEditMode = true;
}

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
        v-for="exerciseItem in store.readWorkout?.exercisesUserDataSets"
        :key="exerciseItem.id"
        class="workout-data__list-item">
        <div class="workout-data__exercise-name">
          {{ exerciseItem.name }}
        </div>
        <ul class="workout-data__sets-list">
          <li v-for="setItem in exerciseItem.sets" 
            :style="{ backgroundColor: `rgb(${setItem.load})` }"
            :key="setItem.setId"
          > 
            {{setItem.weight}} x {{ setItem.repeats }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>

<style>

</style>