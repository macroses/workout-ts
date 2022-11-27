<script setup lang="ts">
import ChartTonnage from '@/components/chartsStatistics/ChartTonnage.vue'
import getCollectionByUser from "@/composables/getCollectionByUser";
import { useStore } from "@/stores/store";
import {computed} from "vue";
import dayjs from "dayjs";

const store = useStore();
const { documents } = getCollectionByUser('workouts');

const sortedWorkoutsByDate = computed(() => {
  return documents.value?.sort((a, b) => a.workoutDate - b.workoutDate)
})

const tonnage = computed(() => sortedWorkoutsByDate?.value?.map(el => el.workoutTonnage))

const dates = computed(() => {
  return sortedWorkoutsByDate?.value?.map(el => dayjs(el?.workoutDate?.seconds * 1000).format('DD.MM'))
})
//
// const options = computed(() => {
//   return {
//     chart: {
//       height: 350,
//       type: 'line',
//       toolbar: {
//         show: false
//       }
//     },
//
</script>

<template>
<main>
  <div class="charts-grid">
    <ChartTonnage :xAxis="dates" :yAxis="tonnage"/>
<!--    <apexchart-->
<!--        width="100%"-->
<!--        height="350"-->
<!--        type="line"-->
<!--        :options="options"-->
<!--        :series="series"-->
<!--    ></apexchart>-->

  </div>
</main>
</template>

<style>
.charts-grid {
  width: 100%;
}
</style>