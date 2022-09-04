<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";
import { useStore } from "@/stores/store";
import type {Exercise} from "@/types/interface";

const store = useStore();
const x = (item: Exercise) => {
  console.log(item)
}
</script>

<template>
  <ul class="picked-exercises">
    <li
      v-for="item in store.pickedExercises"
      :key="item.id"
      class="picked-exercises__item"
      @click="x(item)"
    >
      <div class="picked-exercise__title">
        {{ item.name }}
        <Icon width="12px" icon-name="angle-down"/>
      </div>
    </li>
  </ul>
</template>