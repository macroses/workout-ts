<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import {computed, ref, watchEffect} from 'vue';
import dayjs from 'dayjs';
import getCollectionByUser from '@/composables/getCollectionByUser';
import type { Workout } from '@/types/interface';
import { useStore } from '@/stores/store';
import {clickOutside} from "@/helpers/clickOutside";

const props = defineProps<{
  workoutDate: Dayjs | null
}>();

const store = useStore();

const { documents } = getCollectionByUser('workouts');

const checkEqualDates = computed(() => {
  if(!documents.value) return []
  return documents.value.filter(el => {
    if (props.workoutDate?.isSame(dayjs(el.workoutDate.seconds * 1000))) {
      return el;
    }
  })
});

const pushWorkoutToStore = (workout: Workout) => {
  store.readWorkout = workout;
  store.pickedDate = null;
};
</script>

<template>
<div
  class="workout-task"
  v-for="item in checkEqualDates"
  :key="item.id"
  :class="[item.id === store.readWorkout?.id ? 'active-cell' : null]"
  :style="{ backgroundColor: `rgb(${item.color})` }"
  @click.stop="pushWorkoutToStore(item)"
>
  <div class="workout-task__name">
    {{ item.workoutName }}
  </div>
</div>
</template>

