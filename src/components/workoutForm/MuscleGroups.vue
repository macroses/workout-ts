<script setup lang="ts">
import getCollection from '@/composables/getCollection';
import Icon from '../ui/Icon.vue';
import Loader from '../loader/Loader.vue';

const { documents, isPending } = getCollection('muscles');
</script>

<template>
  <div v-if="isPending" class="muscle-groups">
    <div class="muscle-groups__item" v-for="doc in documents" :key="doc.id">
      <Icon :iconName="doc.iconName" width="14px"/>
      {{ doc.name }}
    </div>
  </div>
  <Loader v-if="!isPending" size="md"/>
</template>