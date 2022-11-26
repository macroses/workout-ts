<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import { useStore } from "@/stores/store";
import {computed} from "vue";
import dayjs from "dayjs";
import type { Workout, Exercise, Set } from "@/types/interface";

const store = useStore();
const { documents } = getCollectionByUser('workouts');

const sortedWorkoutsByDate = computed(() => {
  return documents.value?.sort((a, b) => a.workoutDate - b.workoutDate)
})

const options = computed(() => {
  return {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    xaxis: {
      tickAmount: 5,
      categories: sortedWorkoutsByDate?.value?.map(el => dayjs(el?.workoutDate?.seconds * 1000).format('DD.MM'))
    },
    title: {
      text: 'Тоннаж последних 7 тренировок',
      align: 'left',
      style: {
        fontSize: "16px",
        color: '#666'
      }
    },
    yaxis: {
      min: 0,
      max: 10000
    }
  };
})
const series = computed(() => {
  return [{
    name: 'Тоннаж',
    data: sortedWorkoutsByDate?.value?.map(el => el.workoutTonnage)
  }]
})
</script>

<template>
<main>
  <div class="charts-grid">
    <apexchart
        width="100%"
        height="350"
        type="line"
        :options="options"
        :series="series"
    ></apexchart>
  </div>

</main>
</template>

<style>
.charts-grid {
  width: 100%;
}
</style>