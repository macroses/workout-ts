<script setup lang="ts">
import { useAsideStore } from "@/stores/modalStore";
import { useRoute } from "vue-router";
import Icon from "@/components/ui/Icon.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";

const asideStore = useAsideStore();
const asideRef = ref(null);
const route = useRoute();

watch(() => route.name, (to, from) => {
  asideStore.isAsideActive = false
})

</script>

<template>
  <aside
    class="aside"
    ref="asideRef"
    :class="{ active: asideStore.isAsideActive }">
    <div class="a11y-wrap" @click="asideStore.isAsideActive = false">
      <Icon width="20px" iconName="xmark" />
    </div>
    <ul class="aside__list">
      <li class="aside__item">
        <router-link class="aside__link" to="/statistic">
          Статистика
          <Icon width="18px" icon-name="chart-simple"/>
        </router-link>
      </li>
    </ul>
  </aside>
</template>
