import { defineStore } from 'pinia';
// @ts-ignore
import type {ChallengeWeekday} from "@/components/challenges/ChallengeWeekdays.vue";
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";
import getUser from "@/composables/getUser";
import {uid} from "uid";
import useChallengesCollection from "@/composables/useChallengesCollection";
import {CollectionStatus} from "@/types/collectionStatus";

export interface ChallengeStoreState {
  challengeName: string | null;
  challengeColor: string;
  challengeStartAt: Dayjs;
  challengeEndAt: Dayjs;
  chosenDays: Array<ChallengeWeekday>;
  userId?: string
}

const { user } = getUser();
const { addChallenge, status } = useChallengesCollection('challenges');

export const useChallengeStore = defineStore({
  id: 'challengeStore',
  state: (): ChallengeStoreState => ({
    challengeName: null,
    challengeColor: "213, 0, 0",
    challengeStartAt: dayjs(),
    challengeEndAt: dayjs(),
    chosenDays: [],
  }),
  actions: {
    resetData() {
      this.challengeName = null
      this.challengeColor = "213, 0, 0"
      this.challengeStartAt = dayjs()
      this.challengeEndAt = dayjs()
      this.chosenDays = []
    },

    pushToStoreWeekdays (day: ChallengeWeekday) {
      if(this.chosenDays?.includes(day)) {
        day.isChecked = false
        this.chosenDays = this.chosenDays.filter(el => el.id !== day.id);
      }
      else {
        day.isChecked = true;
        this.chosenDays?.push(day);
      }
    },

    async pushChallengeToServer() {
      if (!this.challengeName) return;

      await addChallenge({
        challengeName: this.challengeName,
        challengeColor: this.challengeColor,
        challengeStartAt: this.challengeStartAt.toDate(),
        challengeEndAt: this.challengeEndAt.toDate(),
        userId: user.value?.uid,
        chosenDays: this.chosenDays,
        challengeId: uid(20)
      })

      switch(status.value) {
        case CollectionStatus.Ok:
          this.resetData();
          break;
        default: { break }
      }
    },
  },

  getters: {
    sortChosenDays: (state: ChallengeStoreState) => {
      state.chosenDays = state.chosenDays.sort((a, b) => a.id - b.id);
    },

    parseToDate: (state: ChallengeStoreState) => {
      state.challengeStartAt = dayjs(state.challengeStartAt);
      state.challengeEndAt = dayjs(state.challengeEndAt);
    }
  }
})