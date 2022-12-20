<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import {computed} from "vue";
import dayjs from "dayjs";
import Loader from "@/components/loader/Loader.vue";

const { documents, pending } = getCollectionByUser('workouts');

const sortedWorkoutsByDate = computed(() => {
  return documents.value?.sort((a, b) => a.workoutDate - b.workoutDate)
})

const tonnage = computed(() => sortedWorkoutsByDate?.value?.map(el => el.workoutTonnage))

const dates = computed(() => {
  return sortedWorkoutsByDate?.value?.map(el => dayjs(el?.workoutDate?.seconds * 1000).format('DD.MM'))
})

const options = computed(() => {
  return {
    chart: {
      height: 350,
      type: 'area',
      toolbar: { show: false },
    },
    stroke: {
      width: 1,
      curve: 'smooth',
    },
    grid: {
      borderColor: "var(--color-bg-hover)"
    },
    xaxis: {
      tickAmount: 5,
      categories: dates.value,
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      min: 0,
      max: Math.max(...tonnage.value) + 5000
    }
  };
})
const series = computed(() => {
  return [{
    name: 'Тоннаж',
    data: tonnage.value
  }]
})
</script>

<template>

  <apexchart
      v-if="pending"
      width="100%"
      height="350"
      type="line"
      :options="options"
      :series="series"
  ></apexchart>
  <div class="chart-loader" v-else>
    <Loader/>
  </div>
</template>