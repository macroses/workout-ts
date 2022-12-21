<script setup lang="ts">
import {useAsideStore} from "@/stores/modalStore";
import {useChallengeStore} from "@/stores/challengesStore";
import {useOnlyNumbers} from "@/helpers/usseOnlyNumbers";
import Icon from "@/components/ui/Icon.vue";
import {ref} from "vue";
import Input from "@/components/ui/Input.vue";
import DropdownColor from "@/components/ui/DropdownColor.vue";

const modalStore = useAsideStore();
const challengeStore = useChallengeStore();

const activeTab = ref(1);

const challengeTabs = [
  {id: 1, name: 'Новый челлендж', counter: false},
  {id: 2, name: 'Все челленджи', counter: true},
];

const colorCollection = [
  {id: 1, rgb: '213, 0, 0'},
  {id: 2, rgb: '230, 124, 115'},
  {id: 3, rgb: '244, 81, 3'},
  {id: 4, rgb: '246, 191, 38'},
  {id: 5, rgb: '51, 182, 121'},
  {id: 6, rgb: '11, 128, 67'},
  {id: 7, rgb: '3, 155, 229'},
  {id: 8, rgb: '63, 81, 181'},
  {id: 9, rgb: '121, 134, 203'},
  {id: 10, rgb: '142, 36, 170'},
  {id: 11, rgb: '97, 97, 97'},
];
</script>

<template>
<div
  v-if="modalStore.isChallengeModalActive"
  @click.self="modalStore.isChallengeModalActive = false"
  class="challenges-layer">
  <div class="challenges-modal">
    <div class="challenges-modal__top">
      <div
        v-for="tab in challengeTabs"
        :key="tab.id"
        :class="{active: activeTab === tab.id}"
        class="challenges-modal__title"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
        <div v-if="tab.counter" class="challenges-counter">0</div>
      </div>
      <div class="challenges-close a11y-wrap" @click="modalStore.isChallengeModalActive = false">
        <Icon width="20px" iconName="xmark"/>
      </div>
    </div>
    <div class="challenge-body">
      <div class="challenge-body__item">
        <div class="challenge-body__item-title">Название:</div>
        <Input
          inputType="text"
          placeholder=""
          v-model="challengeStore.challengeName"
        />
      </div>
      <div class="challenge-body__item">
        <div class="challenge-body__item-title">Выберит цвет:</div>
        <div class="challenge-color">
          <label
            v-for="color in colorCollection"
            :key="color.id"
            class="color-label"
            :style="{backgroundColor: `rgb(${color.rgb})`}"
          >
            <input
              class="color-input"
              type="radio"
              name="color"
              :value="color.rgb"
              v-model="challengeStore.challengeColor"
              @change="challengeStore.challengeColor = color.rgb"
            >
            <span class="color-indicator"></span>
          </label>
        </div>
      </div>
      <div class="challenge-body__item">
        <div class="challenge-body__item-title">Продолжительность:</div>
        <Input
          placeholder="от 10 до 100 дней"
          v-model.number="challengeStore.challengeDaysCounter"
          inputType="text"
          @keydown="useOnlyNumbers($event)"
        />
      </div>
      <div class="challenge-body__item"></div>


    </div>
  </div>
</div>
</template>

<style scoped>
.color-input {
  position: absolute;
  visibility: hidden;
  width: 1px;
  height: 1px;
}

.color-label {
  width: 30px;
  height: 30px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.input-wrap {
  margin-bottom: 0;
}

.challenge-color {
  display: flex;
  gap: 4px;
  margin-top: 5px;
}

.color-indicator {
  width: 20px;
  height: 20px;
  background-color: var(--color-bg);
  display: none;
  border-radius: 2px;
}

.color-input:checked + .color-indicator {
  display: block;
}

.challenge-body__item-title {
  font-size: 12px;
  margin-bottom: 4px;
}

.challenge-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 12px 0 0;
}

.challenges-layer {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  background-color: rgba(0,0,0, 0.3);
  z-index: 999;
  padding: 12px;
}

.challenges-modal {
  width: 100%;
  max-width: 800px;
  height: 500px;
  border-radius: 4px;
  background-color: var(--color-bg);
  padding: 6px 20px 12px;
  position: relative;
}

.challenges-close {
  position: absolute;
  top: 0;
  right: 0;
}

.challenges-modal__top {
  display: flex;
  gap: 24px;
  padding: 9px 0;
  user-select: none;
  border-bottom: 1px solid var(--color-border);
}

.challenges-modal__title {
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.challenges-modal__title.active {
  color: var(--color-accent);
}

.challenges-modal__title.active::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 1px;
  background-color: var(--color-accent);
}

.challenges-counter {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: center;
  background: var(--color-accent);
  color: var(--color-text-inverted);
}
</style>