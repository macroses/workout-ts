<script setup lang="ts">
import type { Exercise } from '@/types/interface';

import { ref } from 'vue';
import { useStore } from '@/stores/store';

import Input from '../ui/Input.vue';
import DropdownColor from '../ui/DropdownColor.vue';
import Button from '../ui/Button.vue';
import MuscleGroups from './MuscleGroups.vue';
import Loader from '../loader/Loader.vue';
import WorkoutFormTitle from './WorkoutFormTitle.vue';
import ExercisesList from './ExercisesList.vue';
import PickedExercises from './PickedExercises.vue';

const store = useStore();

const pickedMuscleGroupId = ref<number | null>(null);

const getPickedMuscleGroup = (muscleGroup: number) => pickedMuscleGroupId.value = muscleGroup
const resetMuscleGroups = () => pickedMuscleGroupId.value = null;

const closeForm = () => {
  resetMuscleGroups();
  store.restoreDefaultsState();
};

const getPickedExercises = (exercise: Exercise) => {
  store.putToStorePickedExercises(exercise);
}

const handleSubmit = async () => {
  await store.pushWorkoutToBase(null, null);
  if(store.workoutName) {
    closeForm();
  }
}
</script>

<template>
<div class="workout-form" :class="{ active: store.pickedDate }">
  <WorkoutFormTitle :pickedDate="store" @close="closeForm"/>
  <div class="workout-form__body">
    <Input 
      v-model="store.workoutName"
      inputType="text" 
      placeholder="Название тренировки"
      required
    />
    <DropdownColor />
    <MuscleGroups
      @pickMuscleGroup="getPickedMuscleGroup"
      @resetMuscleGroup="resetMuscleGroups"
    />
    <ExercisesList
      v-if="pickedMuscleGroupId"
      :pickedMuscleGroupId="pickedMuscleGroupId"
      @pickedExercise="getPickedExercises"
    />
    <PickedExercises />
  </div>
<!--  <Loader size="lg" v-if="status === CollectionStatus.Pending"/>-->
  <div class="workout-form__btns">
    <Button size="md" @click="closeForm">Закрыть</Button>
    <Button size="md" :accent="true" @click.stop="handleSubmit">Сохранить</Button>
  </div>

</div>
</template>