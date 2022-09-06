<script lang="ts" setup>
import { useStore } from "@/stores/store";
import Icon from "../ui/Icon.vue";

const props = defineProps<{ exerciseId: string }>();

const store = useStore();

const deleteSet = (clickedSetId: string) => store.deleteSetItem(clickedSetId)
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="picked-exercise__sets">
    <li
      v-for="set in store.filterSetsByExercise(exerciseId)"
      :key="set.setId"
      class="picked-exercise__set"
    >
      <div class="picked-exercise__box" :style="{ backgroundColor: `rgb(${set.load})` }">
        {{ set.weight }} x {{ set.repeats }}
        <Icon @click="deleteSet(set.setId)" width="13px" iconName="xmark"/>
      </div>
    </li>
  </TransitionGroup>
</template>