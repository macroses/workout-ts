<script setup lang="ts">
import Icon from "../ui/Icon.vue";
import { useStore } from "@/stores/store";

const store = useStore();

const emits = defineEmits<{ (e: "close"): void }>();
const closeForm = () => emits("close");
</script>

<template>
  <div class="workout-form__title">
    <div class="workout-form__name">
      <div class="workout-form__icon">
        <Icon width="20px" iconName="clipboard-check" />
      </div>
      Тренировка
      <span class="workout-form__date">{{
        store.pickedDate?.format("DD.MM.YYYY")
      }}</span>
    </div>
    <div class="a11y-wrap" @click="closeForm">
      <Icon width="20px" iconName="xmark" />
    </div>
  </div>
</template>
