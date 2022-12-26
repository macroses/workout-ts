<script lang="ts" setup>
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {computed} from 'vue';
import getCollectionByUser from '@/composables/getCollectionByUser';
import type {Workout} from '@/types/interface';
import {useStore} from '@/stores/store';

const props = defineProps<{
  workoutDate: Dayjs | null
}>();

const emits = defineEmits<{
  (e: 'handleStartDrag', workout: Workout): void
}>();

const store = useStore();

const {documents} = getCollectionByUser('workouts');

const handleStartDrag = (workout: Workout) => {
  emits('handleStartDrag', workout);
  store.isDragged = true;
}

const checkEqualDates = computed(() => {
  if (!documents.value) return []
  return documents.value.filter(el => {
    if (props.workoutDate?.isSame(dayjs(el?.workoutDate?.seconds * 1000))) {
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
    v-for="item in checkEqualDates"
    :key="item.id"
    :class="[item.id === store.readWorkout?.id ? 'active-cell' : null]"
    :style="{ backgroundColor: `rgb(${item.color})` }"
    class="workout-task"
    draggable="true"
    @dragstart="handleStartDrag(item)"
    @click.stop="pushWorkoutToStore(item)"
  >
    <div class="workout-task__name">
      {{ item.workoutName }}
    </div>
  </div>
</template>

