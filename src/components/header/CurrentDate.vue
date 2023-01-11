<script setup lang="ts">
import Button from "../ui/Button.vue";
import { computed } from "vue";
import {
  getResetCurrentMonth,
  getNextMonth,
  getPrevMonth,
} from "@/helpers/getDate";
import { useStore } from "@/stores/store";

const store = useStore();

const toPrevMonth = () => (store.initialDate = getPrevMonth(store.initialDate));
const toNextMonth = () => (store.initialDate = getNextMonth(store.initialDate));
const resetCurrentMonth = () => (store.initialDate = getResetCurrentMonth());

const month = computed(() => store.initialDate.format("MMMM"));
const year = computed(() => store.initialDate.format("YYYY"));
</script>

<template>
  <div class="header-currentdate">
    <Button size="md" @click="resetCurrentMonth">Сегодня</Button>
    <Button
      size="md"
      only-icon="onlyIcon"
      icon="angle-left"
      @click="toPrevMonth"
    />
    <Button
      size="md"
      only-icon="onlyIcon"
      icon="angle-right"
      @click="toNextMonth"
    />
    <span class="current-textdate">{{ month }} {{ year }}</span>
  </div>
</template>
