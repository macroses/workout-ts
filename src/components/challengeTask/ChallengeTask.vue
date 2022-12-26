<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";

const props = defineProps<{
  challengeDate: Dayjs | null
}>();

const { documents, pending } = getCollectionByUser('challenges');

const log = (i) => {
  console.log(i)
}
</script>

<template>
<div v-for="challenge in documents" :key="challenge.id">
  <div
    v-for="(dates, index) in challenge.challengeDates"
    :key="dates.id"
  >
    <span
      @click.self.stop="log(dates.id)"
      v-if="dayjs(dates.date.seconds * 1000).format('DD.MM.YYYY') === challengeDate.format('DD.MM.YYYY')"
    >
      {{ challenge.challengeName }}
    </span>
  </div>
</div>
</template>

<style>

</style>