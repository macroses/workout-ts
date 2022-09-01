<script setup lang="ts">
import {computed, ref} from 'vue';
import getCollection from '@/composables/getCollection';

const props = defineProps<{
  pickedMuscleGroupId: number | null
}>();

const { documents } = getCollection('exercises');
const filtered = computed(() => {
  if (props.pickedMuscleGroupId !== null) {
    return documents.value.filter(doc => doc.categoryId === props.pickedMuscleGroupId)
  }
})

const activeItem = ref(0);

const pickedExercise = (index: number) => {
  activeItem.value = index;
}
</script>

<template>
  <ul class="exercises">
    <li class="exercise-item" v-for="(item, index) in filtered" :key="item.id">
      <button
        @click="pickedExercise(index)"
        class="exercise-item__btn"
        :class="{active: activeItem === index}"
        type="button"
      >
        {{ item.name }}
      </button>
    </li>
  </ul>
</template>
