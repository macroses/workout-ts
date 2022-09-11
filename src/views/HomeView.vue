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

const getPickedDate = (date: Dayjs) => store.pickedDate = date;
const editWorkout = ref<Workout | null>(null);
const getEditWorkout = (workout: Workout) => editWorkout.value = workout;

// update
</script>

<template>
  <div class="calendar-layout">
    <div class="lock-layer" :class="{editMode: store.isEditMode}"></div>
    <Weekdays />
    <ul ref="countCells" class="days">
      <CalendarDates @pickDate="getPickedDate" />
    </ul>
  </div>
  <WorkoutForm />
  <ReadWorkoutData @editWorkout="getEditWorkout"/>
  <EditWorkout :editableWorkout="editWorkout"/>
</template>