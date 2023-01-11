<script setup lang="ts">
import { computed } from "vue";
import getCollection from "@/composables/getCollection";
import type { Exercise } from "@/types/interface";
import { useStore } from "@/stores/store";

const props = defineProps<{ pickedMuscleGroupId: number | null }>();
const emits = defineEmits<{
  (e: "pickedExercise", item: Exercise): void;
}>();

const store = useStore();

const { documents } = getCollection("exercises");

const filtered = computed(() => {
  if (props.pickedMuscleGroupId !== null) {
    return documents.value?.filter((doc: Exercise) => {
      return doc.categoryId === props.pickedMuscleGroupId;
    });
  } else {
    return;
  }
});

const pickedExercise = (item: Exercise) => {
  emits("pickedExercise", item);
  item.isSelected = !item.isSelected;
};
</script>

<template>
  <ul
    v-if="pickedMuscleGroupId"
    class="exercises"
    :class="[pickedMuscleGroupId ? 'active' : null]"
  >
    <li class="exercise-item" v-for="item in filtered" :key="item.id">
      <button
        @click="pickedExercise(item)"
        class="exercise-item__btn"
        :class="[item.isSelected ? 'active' : null]"
        type="button"
      >
        {{ item.name }}
      </button>
    </li>
  </ul>
</template>
