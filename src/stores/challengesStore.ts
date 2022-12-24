import { defineStore } from 'pinia';
// @ts-ignore
import type {ChallengeWeekday} from "@/components/challenges/ChallengeWeekdays.vue";
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";
import getUser from "@/composables/getUser";

export interface ChallengeStoreState {
  challengeName: string | null;
  challengeColor: string;
  challengeStartAt: Dayjs | string;
  challengeEndAt: Dayjs | string;
  chosenDays: Array<ChallengeWeekday>;
  userId?: string
}

const { user } = getUser();

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
    pushToStoreWeekdays (day: ChallengeWeekday) {
      if(this.chosenDays?.includes(day)) {
        day.isChecked = false
        this.chosenDays = this.chosenDays.filter(el => el.id !== day.id);
      }
      else {
        day.isChecked = true;
        this.chosenDays?.push(day);
      }
    }
  },
  getters: {
    sortChosenDays: (state: ChallengeStoreState) => {
      state.chosenDays = state.chosenDays.sort((a, b) => a.id - b.id);
    },

    // parseToDate: (state: ChallengeStoreState) => {
    //   state.challengeStartAt = dayjs(state.challengeStartAt);
    //   state.challengeEndAt = dayjs(state.challengeEndAt);
    // }
  }
})