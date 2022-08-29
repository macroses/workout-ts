<script setup lang="ts">
import Weekdays from '@/components/weekdays/Weekdays.vue';
import CalendarDates from '@/components/calendarDates/CalendarDates.vue';
</script>

<template>
  <div class="calendar-layout">
    <Weekdays />
    <ul ref="countCells" class="days">
      <CalendarDates/>
    </ul>
  </div>
</template>