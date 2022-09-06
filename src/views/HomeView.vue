<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import Weekdays from '@/components/weekdays/Weekdays.vue';
import CalendarDates from '@/components/calendarDates/CalendarDates.vue';
import WorkoutForm from '@/components/workoutForm/WorkoutForm.vue';
import {useStore} from "@/stores/store";

const store = useStore();

const getPickedDate = (date: Dayjs) => store.pickedDate = date;
const closeForm = () => store.pickedDate = null;
</script>

<template>
  <div class="calendar-layout">
    <Weekdays />
    <ul ref="countCells" class="days">
      <CalendarDates @pickDate="getPickedDate" />
    </ul>
  </div>
  <WorkoutForm
    @close="closeForm"
  />
</template>