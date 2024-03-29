<script setup lang="ts">
import getCollection from "@/composables/getCollection";
import Icon from "../ui/Icon.vue";
import Loader from "../loader/Loader.vue";
import { ref, watchEffect } from "vue";
import { useStore } from "@/stores/store";

const { documents, pending } = getCollection("muscles");
const emits = defineEmits<{
  (e: "pickMuscleGroup", muscleGroupId: number): void;
  (e: "resetMuscleGroup"): void;
}>();

const store = useStore();

const isGroupPicked = ref(true);
const pickedGroup = ref("");

const pickMuscleGroup = (muscleGroupId: number, muscleGroupName: string) => {
  emits("pickMuscleGroup", muscleGroupId); // id наверх, для фильтрации упражнений по группам мышц
  isGroupPicked.value = false;
  pickedGroup.value = muscleGroupName;
};

const resetMuscleGroup = () => {
  emits("resetMuscleGroup");
  isGroupPicked.value = true;
};

watchEffect(() => {
  if (!store.pickedExercises?.length) isGroupPicked.value = true;
});
</script>

<template>
  <div v-if="pending && isGroupPicked" class="muscle-groups">
    <div
      class="muscle-groups__item"
      v-for="doc in documents"
      :key="doc.id"
      @click="pickMuscleGroup(doc.muscleId, doc.name)"
    >
      <Icon :iconName="doc.iconName" width="14px" />
      {{ doc.name }}
    </div>
  </div>
  <button @click="resetMuscleGroup" class="picked-group" v-else>
    {{ pickedGroup }}
    <Icon iconName="angle-down" width="14px" />
  </button>
  <Loader v-if="!pending" size="md" />
</template>
