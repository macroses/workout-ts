<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import { ref } from "vue";
import ChallengeReadName from "@/components/challenges/ChallengeReadName.vue";
import ChallengeReadContent from "@/components/challenges/ChallengeReadContent.vue";

const { documents, pending } = getCollectionByUser("challenges");
const activeChallenge = ref(0);

const getActiveChallenge = (activeIndex: number) => {
  activeChallenge.value = activeIndex;
};
</script>

<template>
  <div class="challenge-body__read">
    <ChallengeReadName
      @challengeNumber="getActiveChallenge"
      :challenges="documents"
    />
    <ChallengeReadContent
      :challenges="documents"
      :activeChallengeIndex="activeChallenge"
    />
  </div>
</template>
