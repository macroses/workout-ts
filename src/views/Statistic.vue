<script setup lang="ts">
import ChartTonnage from '@/components/chartsStatistics/ChartTonnage.vue'
import WorkoutsList from "@/components/workoutsList/WorkoutsList.vue";

</script>

<template>
<main>
  <div class="charts-grid">
    <ChartTonnage />
    <WorkoutsList />
  </div>
</main>
</template>

<style>
.charts-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}
</style>