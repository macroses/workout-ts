<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import { computed } from 'vue';
import dayjs from 'dayjs';
import getCollectionByUser from '@/composables/getCollectionByUser';
import deleteWorkoutCollection from "@/composables/deleteWorkoutCollection";
import Icon from "@/components/ui/Icon.vue";

const props = defineProps<{
  workoutDate: Dayjs | null
}>();

const { documents } = getCollectionByUser('workouts');

const checkEqualDates = computed(() => {
  if(!documents.value) return []
  return documents.value.filter(el => {
    if (props.workoutDate?.isSame(dayjs(el.workoutDate.seconds * 1000))) {
      return el;
    }
  })
});
</script>

<template>
<div
  class="workout-task"
  v-for="item in checkEqualDates"
  :style="{ backgroundColor: `rgb(${item.color})` }"
  @click.stop
>
  <div class="workout-task__name">
    {{ item.workoutName }}
    <Icon width="16px" iconName="xmark" @click="deleteWorkoutCollection(item.id)"/>
  </div>
</div>
</template>