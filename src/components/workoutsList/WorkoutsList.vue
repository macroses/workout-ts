<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import dayjs from "dayjs";
import Loader from "@/components/loader/Loader.vue";
import Icon from "@/components/ui/Icon.vue";
import {ref} from "vue";

const { documents, pending } = getCollectionByUser('workouts');

const listItemHeight = ref(null);
const elemMaxHeight = ref('');

const activeIndex = ref<number | null>(null);

const toggleWorkoutItem = (index: number, domElem: Array<HTMLLIElement>) => {
  activeIndex.value = index;
  elemMaxHeight.value = domElem[index].scrollHeight + 'px';
}
</script>

<template>
  <div
    v-if="!pending"
    class="workouts-loader">
    <Loader/>
  </div>
  <ul
    v-else
    class="workouts-list">
    <li
      v-for="(workout, index) in documents"
      :key="workout.id"
      class="workouts-list__item"
      :class="{active: activeIndex === index}"
      @click="toggleWorkoutItem(index, listItemHeight)"
    >
      <div
        :style="{backgroundImage: `linear-gradient(to right, transparent, rgba(${workout.color}, 0.2))`}"
        class="workouts-list__top">
        <div class="workouts-list__date">
          {{ dayjs(workout.workoutDate.seconds * 1000).format('DD.MM.YYYY') }}
        </div>
        <div class="workouts-list__name">
          {{ workout.workoutName }}
          <Icon class="workouts-list__name--icon" width="12px" iconName="angle-down"/>
        </div>
      </div>
      <div
        class="workouts-list__info"
        ref="listItemHeight"
      >
        <ul class="workouts-list__info-list">
          <li
            v-for="exercise in workout.exercisesUserDataSets"
            class="workouts-list__info-item"
          >
              <div class="workouts-list__info-name">
                {{ exercise.name }}
              </div>
              <div class="workouts-list__info-sets">
                <div
                  v-for="set in exercise.sets"
                  class="workouts-list__set"
                  :style="{backgroundColor: `rgba(${set.load}, 0.8)`}"
                >
                  <div class="workouts-list-weight">{{ set.weight }}</div>
                  x
                  <div class="workouts-list-repeats">{{ set.repeats }}</div>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.workouts-list__item.active .workouts-list__info {
  max-height: v-bind(elemMaxHeight)
}
</style>