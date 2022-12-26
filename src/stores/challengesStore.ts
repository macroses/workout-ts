import { defineStore } from 'pinia';
// @ts-ignore
import type {ChallengeWeekday} from "@/components/challenges/ChallengeWeekdays.vue";
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";
import getUser from "@/composables/getUser";
import {uid} from "uid";
import useChallengesCollection from "@/composables/useChallengesCollection";
import {CollectionStatus} from "@/types/collectionStatus";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday)

export interface ChallengeStoreState {
  challengeName: string | null;
  challengeColor: string;
  challengeStartAt: Dayjs | null;
  challengeEndAt: Dayjs | null;
  chosenDays: Array<ChallengeWeekday>;
  userId?: string,
  challengeDates: Dayjs[] | null
}

const { user } = getUser();
const { addChallenge, status } = useChallengesCollection('challenges');

export const useChallengeStore = defineStore({
  id: 'challengeStore',
  state: (): ChallengeStoreState => ({
    challengeName: null,
    challengeColor: "213, 0, 0",
    challengeStartAt: null,
    challengeEndAt: null,
    chosenDays: [],
    challengeDates: null
  }),
  actions: {
    resetData() {
      this.challengeName = null
      this.challengeColor = "213, 0, 0"
      this.challengeStartAt = null
      this.challengeEndAt = null
      this.chosenDays = []
      this.challengeDates = null
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
        challengeStartAt: this.challengeStartAt?.toDate(),
        challengeEndAt: this.challengeEndAt?.toDate(),
        userId: user.value?.uid,
        chosenDays: this.chosenDays,
        challengeId: uid(20),
        challengeDates: this.challengeDates
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
      if(state.challengeStartAt) {
        state.challengeStartAt = dayjs(state.challengeStartAt);
      }
      if(state.challengeEndAt) {
        state.challengeEndAt = dayjs(state.challengeEndAt);
      }
    },

    getChallengeDates: (state: ChallengeStoreState) => {

      if (state.chosenDays.length === 0) {
        state.challengeDates = null
      }

      if (state.challengeStartAt && state.challengeEndAt && state.chosenDays?.length !== 0) {

        const start = state.challengeStartAt;
        const end = state.challengeEndAt;

        const datesBetweenChosen = Array.from(Array(end.diff(start, 'day') + 1).keys()).map(i => start.add(i, 'day'));
        const filteredByChosenDay: Array<Dayjs> = []


        datesBetweenChosen.forEach(el => {
          state.chosenDays.forEach(chosenDay => {
            if (chosenDay.id == el.weekday()) {
              filteredByChosenDay.push({
                id: uid(20),
                date: el.toDate(),
                isComplete: false
              })
            }
          })
        })

        state.challengeDates = Array.from(new Set(filteredByChosenDay))
      }
    }
  }
})