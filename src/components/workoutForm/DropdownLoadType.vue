<script lang="ts" setup>
import Icon from '@/components/ui/Icon.vue';
import { useStore } from '@/stores/store';
import { clickOutside } from '@/helpers/clickOutside';
import { ref } from 'vue';
import type { LoadType } from '@/types/interface';

const store = useStore();

const loadTypes: LoadType[] = [
  {id: "1", loadType: "размин.", activeLoadType: false, color: "147, 147, 147"},
  {id: "2", loadType: "легк.", activeLoadType: false, color: "102, 187, 106"},
  {id: "3", loadType: "средн.", activeLoadType: false, color: "246, 191, 38"},
  {id: "4", loadType: "тяж.", activeLoadType: false, color: "244, 81, 3"},
  {id: "5", loadType: "отказ", activeLoadType: false, color: "200, 0, 0"},
]

const isLoadType = ref<boolean>(false);
const list = ref<null | HTMLUListElement>(null);

const toggleLoadList = () => isLoadType.value = !isLoadType.value

const dropLoadType = (load: LoadType): void => {
  store.exerciseLoad = load;
  isLoadType.value = false;
}

clickOutside(list, () => isLoadType.value = false);
</script>

<template>
<div class="picked-exercise__load load">
  <div 
    class="load__result" 
    :class="{ notLoaded: !store.exerciseLoad }"
    @click="toggleLoadList"
    :style="{ backgroundColor: `rgb(${store.exerciseLoad?.color})` }"
  >
    {{ store.exerciseLoad?.loadType || 'нагрузка' }}
    <Icon :iconName="isLoadType ? 'angle-up' : 'angle-down'" width="12px"/>
  </div>
  <Transition>
    <ul class="load__list" v-if="isLoadType" ref="list">
      <li 
        v-for="load in loadTypes" 
        :key="load.id" 
        class="load__item"
        :style="{ backgroundColor: `rgb(${load.color})` }"
        @click="dropLoadType(load)"
      >
        {{ load.loadType }}
      </li>
    </ul>
  </Transition>
</div>
</template>