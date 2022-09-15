<script lang="ts" setup>
import type { Dayjs } from "dayjs";
import { computed, ref } from "vue";
import { getEmptyDays, getDaysArr, getDateEquality } from "@/helpers/getDate";
import updateWorkoutDate from '@/composables/updateWorkoutDate';
import { useStore } from "@/stores/store";
import WorkoutTask from "../workoutTask/workoutTask.vue";

const store = useStore();
const emits = defineEmits<{
  (e: 'pickDate', day: Dayjs): void
}>();

const { updateCollection, status } = updateWorkoutDate();

const activeCellIndex = ref<number>(0); // выделение активной ячейки
const dragObjectId = ref<string>('');
const draggedDate = ref<Date | null>(null);

const emptyDaysCells = computed(() => getEmptyDays(store.initialDate));
const filledDaysCells = computed(() => getDaysArr(store.initialDate));

const pickDate = (date: Dayjs, index: number): void => {
  store.readWorkout = null;
  activeCellIndex.value = index;

  if(activeCellIndex.value === index) {
    store.pickedDate = date;
  }
  
  emits('pickDate', date)
};

const handleStartDrag = (id: string) => dragObjectId.value = id;

const handleDrop = async (day: Dayjs) => {
  draggedDate.value = day.toDate();
  store.readWorkout = null; // очистим, чтобы закрыть модалку для чтения
  await updateCollection(dragObjectId.value, draggedDate.value);
}
// const taskReplace = () => store.taskReplace(dragObjectId, draggedDate);
// const taskCopy = () => store.taskCopy(dragObjectId, draggedDate);
</script>

<template>
  <li
    v-for="(_, index) in emptyDaysCells"
    :key="index"
    class="calendar-cell"
  ></li>
  <li
    ref="cell"
    v-for="( day, index ) in filledDaysCells"
    :key="day.format('D')"
    :class="[ { today: getDateEquality(day) }, { activeCell: index === activeCellIndex } ]"
    class="calendar-cell"
    @click="pickDate(day, index)"
    @drop="handleDrop(day)"
    @dragenter.prevent
    @dragover.prevent
  >
    <span class="day-num">{{ day.format('D') }}</span>
    <WorkoutTask
      @handleStartDrag="handleStartDrag"
      :workoutDate="day"
      :loadingStatus="status"
    />
  </li>
</template>