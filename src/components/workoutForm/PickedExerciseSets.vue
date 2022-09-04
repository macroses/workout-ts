<script lang="ts" setup="">
import { useStore } from "@/stores/store";

const props = defineProps<{
  exerciseId: string
}>()

const store = useStore();
</script>

<template>
  <ul class="picked-exercise__sets">
    <li
        v-for="set in store.filterSetsByExercise(exerciseId)"
        :key="set.exerciseId"
        class="picked-exercise__set"
    >
      {{ set.weight }} x {{ set.repeats }}
    </li>
  </ul>
</template>