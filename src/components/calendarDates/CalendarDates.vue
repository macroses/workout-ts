<script lang="ts" setup>
import { computed, ref } from "vue";
import { getEmptyDays, getDaysArr, getDateEquality } from "@/helpers/getDate";
import { useStore } from "@/stores/store";
import type { Dayjs } from "dayjs";
import WorkoutTask from "../workoutTask/workoutTask.vue";

const store = useStore();
const emits = defineEmits<{
  (e: 'pickDate', day: Dayjs): void
}>();

const activeCellIndex = ref<number>(0); // выделение активной ячейки

const emptyDaysCells = computed(() => getEmptyDays(store.initialDate));
const filledDaysCells = computed(() => getDaysArr(store.initialDate));

const pickDate = (date: Dayjs, index: number) => {
  activeCellIndex.value = index;

  if(activeCellIndex.value === index) {
    store.pickedDate = date;
  }
  
  emits('pickDate', date)
};
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
  >
    <span class="day-num">{{ day.format('D') }}</span>
    <WorkoutTask 
      :workoutDate="day"
    />
  </li>
</template>