<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
  xAxis: Array<string>,
  yAxis: Array<number>
}>();

const maxYvalue = ref(props.yAxis);

const options = computed(() => {
  return {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      },
    },
    stroke: {
      width: 1,
      curve: 'smooth',
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        colorStops: [
          [

            {
              offset: 0,
              color: "#FF2E92",
              opacity: 0.3
            },
            {
              offset: 99,
              color: "#0085FF",
              opacity: 0.1
            }
          ]
        ]
      }
    },
    grid: {
      borderColor: "var(--color-bg-hover)"
    },
    xaxis: {
      tickAmount: 5,
      categories: props.xAxis,
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      min: 0,
      max: Math.max(...props.yAxis) + 5000
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