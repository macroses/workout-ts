<script lang="ts" setup>
import {useChallengeStore} from "@/stores/challengesStore";

const challengeStore = useChallengeStore();

const colorCollection = [
  {id: 1, rgb: '213, 0, 0'},
  {id: 2, rgb: '230, 124, 115'},
  {id: 3, rgb: '244, 81, 3'},
  {id: 4, rgb: '246, 191, 38'},
  {id: 5, rgb: '51, 182, 121'},
  {id: 6, rgb: '11, 128, 67'},
  {id: 7, rgb: '3, 155, 229'},
  {id: 8, rgb: '63, 81, 181'},
  {id: 9, rgb: '121, 134, 203'},
  {id: 10, rgb: '142, 36, 170'},
  {id: 11, rgb: '97, 97, 97'},
];

</script>

<template>
  <div class="challenge-body__item">
    <div class="challenge-body__item-title">Цвет:</div>
    <div class="challenge-color">
      <label
        v-for="color in colorCollection"
        :key="color.id"
        class="color-label"
        :style="{backgroundColor: `rgb(${color.rgb})`}"
      >
        <input
          class="color-input"
          type="radio"
          name="color"
          :value="color.rgb"
          max="100"
          v-model="challengeStore.challengeColor"
          @change="challengeStore.challengeColor = color.rgb"
        >
        <span class="color-indicator"></span>
      </label>
    </div>
  </div>
</template>

<style scoped>


</style>