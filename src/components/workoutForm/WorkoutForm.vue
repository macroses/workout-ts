<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import type { Exercise } from '@/types/interface';

import { ref } from 'vue';
import { useStore } from '@/stores/store';

import getUser from '@/composables/getUser';
import useCollection, { CollectionStatus } from '@/composables/useCollection';

import Input from '../ui/Input.vue';
import DropdownColor from '../ui/DropdownColor.vue';
import Button from '../ui/Button.vue';
import MuscleGroups from './MuscleGroups.vue';
import Loader from '../loader/Loader.vue';
import WorkoutFormTitle from './WorkoutFormTitle.vue';
import ExercisesList from './ExercisesList.vue';
import PickedExercises from './PickedExercises.vue';

const props = defineProps<{ pickedDate: Dayjs | null }>();
const emits = defineEmits<{ (e: 'close'): void }>();
const store = useStore();

const { user } = getUser();
const { addDocument, status } = useCollection('workouts');

const workoutName = ref<string>('');
const pickedMuscleGroupId = ref<number | null>(null);

const closeForm = () => emits('close');

const getPickedMuscleGroup = (muscleGroup: number) => pickedMuscleGroupId.value = muscleGroup 
const resetMuscleGroups = () => pickedMuscleGroupId.value = null;

// const workoutExercises = ref<Exercise[]>([]);

const getPickedExercises = (exercise: Exercise) => {
  if(store.pickedExercises.includes(exercise)) { // удалим, если уже есть в массиве
    store.pickedExercises = store.pickedExercises.filter(el => el.id !== exercise.id);
  }
  else {
    store.pickedExercises.push(exercise)
  }
}


const handleSubmit = async () => {
  if(!workoutName.value) return;

  await addDocument({
    workoutDate: props.pickedDate?.toDate() ?? null,
    workoutName: workoutName.value,
    color: store.taskColor,
    userId: user.value?.uid ?? null,
    userName: user.value?.displayName ?? null,
    pickedExercise: store.pickedExercises
  });

  switch(status.value) {
    case CollectionStatus.Ok:
      workoutName.value = '';
      break;
    default: { break }
  }
}

</script>

<template>
  <div class="workout-form" :class="{ active: pickedDate }">
    <WorkoutFormTitle :pickedDate="pickedDate" @close="closeForm"/>
    <form 
      class="workout-form__body" 
      @submit.prevent="handleSubmit">
      <Input 
        v-model="workoutName"
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
        :pickedMuscleGroupId="pickedMuscleGroupId"
        @pickedExercise="getPickedExercises"
      />
      <PickedExercises />
      <div class="workout-form__btns">
        <Button size="sm" @click="closeForm">Закрыть</Button>
        <Button size="sm" :accent="true" @click="handleSubmit">Сохранить</Button>
      </div>
    </form>
    <Loader size="lg" v-if="status === CollectionStatus.Pending"/>
  </div>
</template>