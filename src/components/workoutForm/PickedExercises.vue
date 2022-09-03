<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";
import { useStore } from "@/stores/store";

const store = useStore();
</script>

<template>
  <ul class="picked-exercises">
    <li
      v-for="item in store.pickedExercises"
      :key="item.id"
      class="picked-exercises__item"
      @click="log(item)"
    >
      {{ item.name }}
      <Icon width="12px" icon-name="angle-down"/>
    </li>
  </ul>
</template>