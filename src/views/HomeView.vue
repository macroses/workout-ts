<script setup lang="ts">
import type {Workout} from "@/types/interface";
import type {Dayjs} from 'dayjs';
import Weekdays from '@/components/weekdays/Weekdays.vue';
import CalendarDates from '@/components/calendarDates/CalendarDates.vue';
import WorkoutForm from '@/components/workoutForm/WorkoutForm.vue';
import EditWorkout from "@/components/editWorkout/EditWorkout.vue";
import ReadWorkoutData from "@/components/readWorkoutData/ReadWorkoutData.vue";
import {useStore} from "@/stores/store";
import {ref} from "vue";

const store = useStore();

const emits = defineEmits<{
  (e: 'blockIntersection', next): void
}>();

const getPickedDate = (date: Dayjs) => store.pickedDate = date;
const editWorkout = ref<Workout | null>(null);
const getEditWorkout = (workout: Workout) => editWorkout.value = workout;

const blockIntersection = () => {
// с зажатой тренировкой наведем на это поле, чтобы переключить месяц
//  TODO: додумать как сделать таймаут однократным. Как сделать событие попадание в блок однократным.
  setTimeout(() => {
    emits('blockIntersection', 'lol')
  }, 2000);
}
</script>

<template>
  <div class="calendar-layout">
    <div class="lock-layer" :class="{editMode: store.isEditMode}"></div>
    <Weekdays />
    <ul ref="countCells" class="days">
      <CalendarDates @pickDate="getPickedDate" />
    </ul>
    <div class="next-month" @dragover="blockIntersection"></div>
  </div>
  <WorkoutForm />
  <ReadWorkoutData @editWorkout="getEditWorkout"/>
  <EditWorkout :editableWorkout="editWorkout"/>
</template>