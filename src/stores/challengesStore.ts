import { defineStore } from 'pinia';

export const useChallengeStore = defineStore({
  id: 'challengeStore',
  state: () => ({
    challengeName: null,
    challengeColor: "213, 0, 0",
    challengeDaysCounter: null
  }),
})