<script setup lang="ts">
import type { Dayjs } from 'dayjs';

import { ref } from 'vue';
import Weekdays from '@/components/weekdays/Weekdays.vue';
import CalendarDates from '@/components/calendarDates/CalendarDates.vue';
import WorkoutForm from '@/components/workoutForm/WorkoutForm.vue';

const pickedDate = ref<Dayjs | null>(null);

const getPickedDate = (e: Dayjs) => pickedDate.value = e;
const closeForm = () => pickedDate.value = null;
</script>

<template>
  <div class="calendar-layout">
    <Weekdays />
    <ul ref="countCells" class="days">
      <CalendarDates @pickDate="getPickedDate" />
    </ul>
  </div>
  <WorkoutForm 
    :pickedDate="pickedDate"
    @close="closeForm"
  />
</template>