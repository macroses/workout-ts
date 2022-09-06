<script setup lang="ts">
import { ref, watch} from "vue";
import { useStore } from "@/stores/store";
import { useOnlyNumbers } from "@/helpers/usseOnlyNumbers";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import PickedExerciseSets from "@/components/workoutForm/PickedExerciseSets.vue";
import PickedExerciseTitle from "@/components/workoutForm/PickedExerciseTitle.vue";
import DropdownLoadType from "./DropdownLoadType.vue";
import type { LoadType } from "@/types/interface";

const store = useStore();

const isFormOpened = ref<boolean>(false);
const activeId = ref<string>('');

const toggleSelect = (id: string) => {
  activeId.value = id;
  isFormOpened.value = activeId.value === id;
}

// for active exercise
const saveSet = (exerciseTitle: string, exerciseId: string) => {
  if (!store.exerciseRepeats) return;
  store.saveSet(exerciseTitle, exerciseId)
  store.exerciseWeight = '';
  store.exerciseRepeats = '';
};

watch(activeId, (value) => {
  if(value) {
    store.exerciseWeight = '';
    store.exerciseRepeats = '';
  }
});
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="picked-exercises">
    <li
      v-for="pickedExercise in store.pickedExercises"
      :key="pickedExercise.id"
      class="picked-exercises__item"
      @click.stop="toggleSelect(pickedExercise.id)"
    >
      <PickedExerciseTitle :title="pickedExercise.name"/>
      <PickedExerciseSets :exerciseId="pickedExercise.id"/>

      <div
        class="picked-exercise__form"
        v-if="isFormOpened = activeId === pickedExercise.id"
      >
        <Input
          inputType="text"
          placeholder="вес"
          size="sm"
          v-model="store.exerciseWeight"
          @keydown="useOnlyNumbers($event)"
        />
        <Input
          inputType="text"
          placeholder="повторения"
          size="sm"
          v-model="store.exerciseRepeats"
          @keydown="useOnlyNumbers($event)"
        />
        <DropdownLoadType/>
        <Button size="sm" @click="saveSet(pickedExercise.name, pickedExercise.id)">Сохранить</Button>
      </div>
    </li>
  </TransitionGroup>
</template>