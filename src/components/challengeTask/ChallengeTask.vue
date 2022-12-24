<script setup lang="ts">
import { getDateRange } from "@/helpers/getDate";
import getCollectionByUser from "@/composables/getCollectionByUser";
import type {Dayjs} from "dayjs";
import {computed} from "vue";
import dayjs from "dayjs";

const props = defineProps<{
  challengeDate: Dayjs | null
}>();

const { documents, pending } = getCollectionByUser('challenges')
</script>

<template>
<div v-for="challenge in documents">{{ challenge.challengeName }}</div>
</template>

<style scoped>

</style>