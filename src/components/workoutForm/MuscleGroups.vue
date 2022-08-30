<script setup lang="ts">
import getCollection from '@/composables/getCollection';
import Icon from '../ui/Icon.vue';

const { documents } = getCollection('muscles');
</script>

<template>
  <div class="muscle-groups">
    <div class="muscle-groups__item" v-for="doc in documents" :key="doc.id">
      <Icon :iconName="doc.iconName" width="14px"/>
      {{ doc.name }}
    </div>
  </div>
  
</template>



<style>
.muscle-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  border: 1px solid var(--color-border);
  border-bottom: none;
  gap: 1px;
}

.muscle-groups__item {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 4px 8px;
  font-size: 14px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
}

.muscle-groups__item:hover {
  background-color: var( --color-bg-hover);
}

.muscle-groups__item:not(:nth-child(2n)) {
  border-right: 1px solid var(--color-border);
}
</style>