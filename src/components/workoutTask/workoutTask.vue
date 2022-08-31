<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import { computed } from 'vue';
import dayjs from 'dayjs';
import getCollection from '@/composables/getCollection';

const props = defineProps<{
  workoutDate: Dayjs | null
}>();

const { documents, isPending } = getCollection('workouts');

const checkEqualDates = computed(() => {

  // TODO: вынести наружу, чтобы не спамить пустыми тасками в ячейки не слать кучу запросов на получение коллекции
  if(!documents.value) return []
  return documents.value.filter(el => {
    if (props.workoutDate.isSame(dayjs(el.workoutDate.seconds*1000))) {
      return el.workoutName
    }
  })
});

</script>

<template>
<div
  class="workout-task"
  v-for="item in checkEqualDates"
>{{ item.workoutName }}
</div>
</template>