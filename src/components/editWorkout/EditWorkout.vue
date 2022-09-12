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
import Input from "@/components/ui/Input.vue";

const props = defineProps<{ editableWorkout: Workout | null }>();
const store = useStore();

const pickedMuscleGroupId = ref<number | null>(null);

const updateWorkout = async (): Promise<void> => {
  if (!store.workoutName) return;
  await updateWorkoutCollection(
    props.editableWorkout?.id as string,
    store.workoutName,
    store.taskColor,
    store.pickedExercises as Exercise[]
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
  if(props.editableWorkout) {
    store.workoutName = props.editableWorkout.workoutName;
    store.taskColor = props.editableWorkout.color;
    store.pickedExercises = props.editableWorkout.exercisesUserDataSets
  }
});
</script>

<template>
<div class="edit-workout" :class="{active: store.isEditMode}">
  <div class="edit-workout__title" v-once>Редактированиe</div>
  <Input
    size="md"
    required
    inputType="text"
    v-model="store.workoutName"
    placeholder="Название тренировки"
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

  <div class="workout-form__btns" v-once>
    <Button size="md" @click="closeForm">Закрыть</Button>
    <Button size="md" :accent="true" @click.stop="updateWorkout">Сохранить</Button>
  </div>
</div>
</template>

<style>

</style>