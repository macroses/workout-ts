<script setup lang="ts">
import { clickOutside } from "@/helpers/clickOutside";
import { ref, watch } from "vue";
import { useStore } from "@/stores/store";
import Icon from "@/components/ui/Icon.vue";

const colorCollection = [
  { id: 1, rgb: "213, 0, 0" },
  { id: 2, rgb: "230, 124, 115" },
  { id: 3, rgb: "244, 81, 3" },
  { id: 4, rgb: "246, 191, 38" },
  { id: 5, rgb: "51, 182, 121" },
  { id: 6, rgb: "11, 128, 67" },
  { id: 7, rgb: "3, 155, 229" },
  { id: 8, rgb: "63, 81, 181" },
  { id: 9, rgb: "121, 134, 203" },
  { id: 10, rgb: "142, 36, 170" },
  { id: 11, rgb: "97, 97, 97" },
];

const store = useStore();
const container = ref<null | HTMLAllCollection>(null);

const defaultColor = ref<string | undefined>(store.taskColor);
const isDropDownActive = ref<boolean>(false);

const toggleDropdown = () => (isDropDownActive.value = !isDropDownActive.value);

const dropColor = (color: string) => {
  isDropDownActive.value = false;
  store.taskColor = color;
  defaultColor.value = color;
};

clickOutside(container, () => (isDropDownActive.value = false));
</script>

<template>
  <div
    ref="container"
    class="dropdown-color__container"
    @click="toggleDropdown"
  >
    <div class="title" v-once>
      <Icon iconName="brush" width="15px" />
      Цвет задачи
    </div>
    <div
      class="dropdown-color__result"
      :style="{ backgroundColor: 'rgb(' + defaultColor + ')' }"
    ></div>
    <Icon iconName="angle-down" width="11px" />
    <ul v-if="isDropDownActive" class="dropdown-color">
      <li
        v-for="colorItem in colorCollection"
        :key="colorItem.id"
        :style="{ backgroundColor: 'rgb(' + colorItem.rgb + ')' }"
        :class="{ active: colorItem.rgb === defaultColor }"
        @click.stop="dropColor(colorItem.rgb)"
      ></li>
    </ul>
  </div>
</template>
