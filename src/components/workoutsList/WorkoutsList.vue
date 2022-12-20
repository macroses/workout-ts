<script setup lang="ts">
import {computed, ref, watch} from "vue";
import dayjs from "dayjs";
import getCollectionByUser from "@/composables/getCollectionByUser";
import Loader from "@/components/loader/Loader.vue";
import Icon from "@/components/ui/Icon.vue";
import Select from "@/components/ui/Select.vue";
import {sortingCollection} from "@/composables/sortCollection";

const { pending } = getCollectionByUser('workouts');

const listItemHeight = ref(null);
const elemMaxHeight = ref('');

const sortParameters = [
  {optionName: 'По дате', iconName: 'arrow-down', id: '1'},
  {optionName: 'По дате', iconName: 'arrow-up', id: '2'},
]

const activeIndex = ref<number | null>(null);
const activeSortOption = ref<string | null>('1');

const toggleWorkoutItem = (index: number, domElem: Array<HTMLLIElement>) => {
  activeIndex.value = index;
  elemMaxHeight.value = domElem[index].scrollHeight + 'px';
}

const getSortOptionValue = (optionValue: string) => activeSortOption.value = optionValue;
const sortedWorkouts = sortingCollection(activeSortOption);
</script>

<template>
  <div
    v-if="!pending"
    class="workouts-loader">
    <Loader/>
  </div>
  <div v-else class="workouts-list__wrap">
    <div class="filters">
      <div class="filters__item">
        <Select
          :options="sortParameters"
          @getOptionValue="getSortOptionValue"
        />
      </div>
    </div>
    <ul class="workouts-list">
      <li
        v-for="(workout, index) in sortedWorkouts"
        :key="workout.id"
        class="workouts-list__item"
        :class="{ active: activeIndex === index }"
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
            <Icon
              class="workouts-list__name--icon"
              width="12px"
              iconName="angle-down"
            />
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
  </div>

</template>

<style scoped>
.workouts-list__item.active .workouts-list__info {
  max-height: v-bind(elemMaxHeight);
}
</style>