<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import { ref } from "vue";
import ChallengeReadName from "@/components/challenges/ChallengeReadName.vue";
import ChallengeReadContent from "@/components/challenges/ChallengeReadContent.vue";
import Icon from "@/components/ui/Icon.vue";

const { documents, pending } = getCollectionByUser("challenges");
const activeChallenge = ref(0);

const getActiveChallenge = (activeIndex: number) => {
  activeChallenge.value = activeIndex;
};


</script>

<template>
  <div v-if="documents.length > 0" class="challenge-body__read">
    <ChallengeReadName
      @challengeNumber="getActiveChallenge"
      :challenges="documents"
    />
    <ChallengeReadContent
      :challenges="documents"
      :activeChallengeIndex="activeChallenge"
    />
  </div>
  <div v-else class="challenge-body__placeholder">
    <div class="challenge-body__placeholder-text">Добавьте новое испытание!</div>
    <div class="challenge-body__placeholder-icon">
      <Icon width="50px" iconName="trophy-star" />
    </div>

  </div>
</template>

<style>

</style>
