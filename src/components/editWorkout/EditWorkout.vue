<script setup lang="ts">
import type {Workout, Exercise} from "@/types/interface";
import {ref, watchEffect} from "vue";
import {useStore} from "@/stores/store";
import Button from '@/components/ui/Button.vue';
import updateWorkoutCollection from "@/composables/updateWorkoutCollection";
import DropdownColor from "@/components/ui/DropdownColor.vue";
import MuscleGroups from "@/components/workoutForm/MuscleGroups.vue";
import ExercisesList from "@/components/workoutForm/ExercisesList.vue";
import PickedExercises from "@/components/workoutForm/PickedExercises.vue";

const props = defineProps<{ editableWorkout: Workout | null }>();
const store = useStore();

const newWorkoutName = ref<string | null>(null);
const pickedMuscleGroupId = ref<number | null>(null);

const updateWorkout = async (): Promise<void> => {
  if (!newWorkoutName.value) return;
  await updateWorkoutCollection(
      props.editableWorkout?.id as string,
      newWorkoutName.value,
      store.taskColor
  )
};

const getPickedMuscleGroup = (muscleGroup: number) => pickedMuscleGroupId.value = muscleGroup;
const getPickedExercises = (exercise: Exercise) => store.putToStorePickedExercises(exercise);
const resetMuscleGroups = () => pickedMuscleGroupId.value = null;

const closeForm = (): void => {
  store.isEditMode = false;
  store.restoreDefaultsState();
};

watchEffect(() => {
  newWorkoutName.value = props.editableWorkout?.workoutName ?? null;
  // store.exercisesUserDataSets = [store.exercisesUserDataSets, ...props.editableWorkout?.exercisesUserDataSets]
  // store.exercisesUserDataSets = props.editableWorkout?.exercisesUserDataSets
});
</script>

<template>
<div class="edit-workout" :class="{active: store.isEditMode}">
  <input type="text" v-model="newWorkoutName">

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

  <div class="workout-form__btns">
    <Button size="md" @click="closeForm">Закрыть</Button>
    <Button size="md" :accent="true" @click.stop="updateWorkout">Сохранить</Button>
  </div>
</div>
</template>

<style>

</style>