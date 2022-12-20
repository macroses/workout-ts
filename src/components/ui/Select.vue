<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";
import {ref} from "vue";
import {clickOutside} from "@/helpers/clickOutside";

interface Option {
  optionName: string,
  iconName: string,
  id: string
}

const props = defineProps<{
  options: Array<Option>
}>();

const selectRef = ref(null);
const isActiveOption = ref(false);

const emit = defineEmits<{
  (event: 'getOptionValue', workoutName: string): void
}>()

const optionNameValue = ref('');
const optionIcon = ref('');

const getOptionValue = (nameValue: Option) => {
  optionNameValue.value = nameValue.optionName;
  optionIcon.value = nameValue.iconName;
  isActiveOption.value = !isActiveOption.value
  emit("getOptionValue", nameValue.id);
}

// todo: можно добавить иконку на выбранной опции, чтоб было видно выбранную опцию

clickOutside(selectRef, () => isActiveOption.value = false);
</script>

<template>
  <div class="select" ref="selectRef">
    <div
      class="select__value"
      @click.stop="isActiveOption = !isActiveOption"
    >
      <div class="select__value-name">
        {{ optionNameValue || options[0].optionName }}
        <Icon width="10px" :iconName="optionIcon || 'arrow-down'"/>
      </div>
      <Icon width="12px" iconName="angle-down"/>
    </div>
    <ul
      class="select__list"
      :class="{active: isActiveOption}"
    >
      <li
        class="select__option"
        v-for="option in options"
        :key="option.id"
        @click.stop="getOptionValue(option)"
      >
        <div class="option__name">{{ option.optionName }}</div>
        <Icon
          width="12px"
          :iconName="option.iconName"
        />
      </li>
    </ul>
  </div>
</template>

<style>
.select {
  position: relative;
  font-size: 12px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  width: max-content;
  border-radius: 4px;
  min-width: 150px;
}

.select__list {
  position: absolute;
  top: calc(100% + 3px);
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transform: scaleY(0);
  transform-origin: top;
  border-radius: 4px;
  transition: transform 0.2s;
}

.select__value {
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select__value:hover {
  background-color: var(--color-bg-hover);
  color: var(--color-accent);
}

.select__list.active {
  transform: scaleY(1);
}

.select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  cursor: pointer;
}

.select__option:hover {
  background-color: var(--color-bg-hover);
  color: var(--color-accent);
}

.select__value-name {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>