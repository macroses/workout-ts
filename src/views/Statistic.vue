<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import { getDaysArr } from "@/helpers/getDate";
import { useStore } from "@/stores/store";
import { computed, ref } from "vue";
import dayjs from "dayjs";

const store = useStore();

const dates = ref([])

const { documents } = getCollectionByUser('workouts');
const filledDaysCells = computed(() => {
  // let dates = [];
  // documents.value?.forEach(doc => {
  //   dates = [...dates, doc.workoutDate]
  // })
});

console.log(filledDaysCells)

const options = computed(() => {
  return {
    chart: {
      id: 'workout-tonnage',
      width: 800,
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      },

    },
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 2
    },
    xaxis: {
      labels: {},
      categories: []
    },

  };
})
const series = computed(() => {
  return [{
    name: 'Общий объем',
    data: [30, 40, 45, 50, 49, ],
  }];
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

    <div v-for="doc in documents" :key="doc.id">
      <div v-for="exercise in doc.exercisesUserDataSets">
        <div v-for="set in exercise.sets">{{ set.weight }}</div>
      </div>
    </div>
<!--    <div v-for="el in filledDaysCells">{{el}}</div>-->
  </div>

</main>
</template>

<style>
.charts-grid {
  width: 100%;
}
</style>