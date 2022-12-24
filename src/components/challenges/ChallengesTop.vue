<script lang="ts" setup>
import {useAsideStore} from "@/stores/modalStore";
import {ref} from "vue";
import Icon from "@/components/ui/Icon.vue";

const modalStore = useAsideStore();

const activeTab = ref(1);

const challengeTabs = [
  {id: 1, name: 'Новый челлендж', counter: false},
  {id: 2, name: 'Все челленджи', counter: true},
];
</script>

<template>
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
</template>

<style scoped>

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