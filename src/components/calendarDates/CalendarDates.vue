<script lang="ts" setup="">
import { computed } from "vue";
import { getEmptyDays, getDaysArr, getDateEquality } from "@/helpers/getDate";
import { useStore } from "@/stores/store";

const store = useStore();

const emptyDaysCells = computed(() => getEmptyDays(store.initialDate));
const filledDaysCells = computed(() => getDaysArr(store.initialDate));

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
  >
    <span :key="day" class="day-num">{{ day.format('D') }}</span>
<!--    <CalendarDayTasks-->
<!--        :day="day.format('DD.MM.YYYY')"-->
<!--    />-->
  </li>
</template>