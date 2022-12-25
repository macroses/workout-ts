<script setup lang="ts">
import getCollectionByUser from "@/composables/getCollectionByUser";
import type {Dayjs} from "dayjs";
import {computed} from "vue";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"
import weekday from "dayjs/plugin/weekday";

dayjs.extend(isBetween);
dayjs.extend(weekday);

const props = defineProps<{
  challengeDate: Dayjs | null
}>();

const { documents, pending } = getCollectionByUser('challenges');

const checkEqualDates = computed(() => {
  return documents.value?.filter(challenge => {
    const start = dayjs(challenge.challengeStartAt.seconds * 1000);
    const end = dayjs(challenge.challengeEndAt.seconds * 1000);
    return dayjs(props.challengeDate).isBetween(start, end, null, '[]');
  })
})

// посмотреть день недели приходящего дня
// если приходящий день недели соответствует дням промежутка челленджа, то отрисовываем
// иначе ничего не делаем

</script>

<template>
  <div>{{dayjs(challengeDate).weekday()}}</div>
<div v-for="challenge in checkEqualDates">{{ challenge.challengeName }}</div>
</template>

<style scoped>

</style>