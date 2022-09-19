<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import {computed} from 'vue';
import dayjs from 'dayjs';
import getCollectionByUser from '@/composables/getCollectionByUser';
import type { Workout } from '@/types/interface';
import { useStore } from '@/stores/store';

const props = defineProps<{
  workoutDate: Dayjs | null
}>();

const emits = defineEmits<{
  (e: 'handleStartDrag', workout: Workout): void
}>();

const store = useStore();

const { documents } = getCollectionByUser('workouts');

const handleStartDrag = (workout: Workout) => {
  emits('handleStartDrag', workout);
  store.isDragged = true;
}

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

// const getMousePosition = (event) => {
//   event.target.addEventListener('mousemove', function() {
//     console.log(event.clientX)
//   })
// }
// todo найти позицию мыши при зажатой кнопке. Определить в каой половине окна она находится
// todo найти ширину окна, поделить на 2. Определить где находится курсор, слева или справа
</script>

<template>
<div
  class="workout-task"
  v-for="item in checkEqualDates"
  :key="item.id"
  :class="[item.id === store.readWorkout?.id ? 'active-cell' : null]"
  :style="{ backgroundColor: `rgb(${item.color})` }"
  @click.stop="pushWorkoutToStore(item)"
  draggable="true"
  @dragstart="handleStartDrag(item)"
  @mousedown="getMousePosition"
>
  <div class="workout-task__name">
    {{ item.workoutName }}
  </div>
</div>
</template>

