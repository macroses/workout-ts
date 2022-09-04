<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";
import { useStore } from "@/stores/store";
import {computed, ref, watch} from "vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";

const store = useStore();

const isFormOpened = ref<boolean>(false);
const activeId = ref<string>('');


const toggleSelect = (id: string) => {
  activeId.value = id;
  isFormOpened.value = activeId.value === id;
}

// for active exercise
const saveSet = (exerciseTitle: string, exerciseId: string) => {
  store.saveSet(exerciseTitle, exerciseId)
  store.exerciseWeight = '';
  store.exerciseRepeats = '';
}

watch(activeId, (value) => {
  if(value) {
    store.exerciseWeight = '';
    store.exerciseRepeats = '';
  }
})
</script>

<template>
  <ul class="picked-exercises">
    <li
      v-for="item in store.pickedExercises"
      :key="item.id"
      class="picked-exercises__item"
      @click.stop="toggleSelect(item.id)"
    >
      <div class="picked-exercise__title">
        {{ item.name }}
        <Icon width="12px" icon-name="angle-down"/>
      </div>



      <div class="picked-exercise__form"
        v-if="isFormOpened = activeId === item.id"
      >
        <Input
          inputType="text"
          placeholder="вес"
          size="sm"
          v-model="store.exerciseWeight"
        />
        <Input
            inputType="text"
            placeholder="вес"
            size="sm"
            v-model="store.exerciseRepeats"
        />
        <Button size="sm" @click="saveSet(item.name, item.id)">Сохранить</Button>
      </div>
    </li>
  </ul>
</template>