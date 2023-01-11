<script lang="ts" setup>
import { useAsideStore } from "@/stores/modalStore";
import { ref } from "vue";
import Icon from "@/components/ui/Icon.vue";
import { useChallengeStore } from "@/stores/challengesStore";

const props = defineProps<{
  challengesCounter: number;
}>();

const emits = defineEmits<{
  (e: "dropTabId", tabId: number): void;
}>();

const modalStore = useAsideStore();
const challengeStore = useChallengeStore();

const activeTab = ref(1);

const challengeTabs = [
  { id: 1, name: "Новый челлендж", counter: false },
  { id: 2, name: "Активные", counter: true },
];

const closeResetModal = () => {
  modalStore.isChallengeModalActive = false;
  challengeStore.resetData();
};

const dropTabId = (id: number) => {
  activeTab.value = id;
  emits("dropTabId", activeTab.value);
};
</script>

<template>
  <div class="challenges-modal__top">
    <div
      v-for="tab in challengeTabs"
      :key="tab.id"
      :class="{ active: activeTab === tab.id }"
      class="challenges-modal__title"
      @click="dropTabId(tab.id)"
    >
      {{ tab.name }}
      <div v-if="tab.counter" class="challenges-counter">
        {{ challengesCounter }}
      </div>
    </div>
    <div class="challenges-close a11y-wrap" @click="closeResetModal">
      <Icon width="20px" iconName="xmark" />
    </div>
  </div>
</template>
