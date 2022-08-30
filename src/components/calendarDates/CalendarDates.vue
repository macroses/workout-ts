<script lang="ts" setup="">
import { computed } from "vue";
import { getEmptyDays, getDaysArr, getDateEquality } from "@/helpers/getDate";
import { useStore } from "@/stores/store";
import type { Dayjs } from "dayjs";

const store = useStore();
const emits = defineEmits<{
  (e: 'pickDate', day: Dayjs): void
}>()

const emptyDaysCells = computed(() => getEmptyDays(store.initialDate));
const filledDaysCells = computed(() => getDaysArr(store.initialDate));

const pickDate = (date: Dayjs) => emits('pickDate', date);
</script>

<template>
  <li
    v-for="(_, index) in emptyDaysCells"
    :key="index"
    class="calendar-cell"
  ></li>
  <li
    v-for="( day, index ) in filledDaysCells"
    :key="index"
    :class="{ today: getDateEquality(day) }"
    class="calendar-cell"
    @click="pickDate(day)"
  >
    <span class="day-num">{{ day.format('D') }}</span>
<!--    <CalendarDayTasks-->
<!--        :day="day.format('DD.MM.YYYY')"-->
<!--    />-->
  </li>
</template>