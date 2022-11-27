<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  xAxis: Array<string>,
  yAxis: Array<number>
}>();

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
      categories: props.xAxis
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
    data: props.yAxis
  }]
})
</script>

<template>
  <apexchart
      width="100%"
      height="350"
      type="line"
      :options="options"
      :series="series"
  ></apexchart>
</template>