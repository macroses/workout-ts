import { defineStore } from 'pinia'
import dayjs from "dayjs";

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({
    initialDate: dayjs()
  }),
  getters: {

  },
  actions: {
    increment() {

    }
  }
})
