import { defineStore } from 'pinia';

export const useAsideStore = defineStore({
  id: 'asideStore',
  state: () => ({
    isAsideActive: false
  }),
})
