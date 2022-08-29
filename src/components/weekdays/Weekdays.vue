<script lang="ts" setup="">
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",]
</script>

<template>
  <ul class="weekdays">
    <li v-for="item in weekDays" :key="item">{{ item }}</li>
  </ul>
</template>