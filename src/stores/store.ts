import { defineStore } from 'pinia'
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import type { Set, Store} from "@/types/interface";
import { uid } from "uid";

import weekday from 'dayjs/plugin/weekday';
dayjs.locale('ru');
dayjs.extend(weekday);

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({
    taskColor: '' || "3, 155, 229",
    workoutName: '',
    pickedExercises: [],
    exercisesUserDataSets: [],
    exerciseWeight: '',
    exerciseRepeats: '',
    initialDate: dayjs(),
  } as Store),
  actions: {
    saveSet(exerciseTitle: string, exerciseId: string) {
      const set: Set = {
        exerciseTitle: exerciseTitle,
        weight: this.exerciseWeight,
        repeats: this.exerciseRepeats,
        load: '',
        setId: uid(10),
        exerciseId: exerciseId
      };

      this.exercisesUserDataSets.push(set);
      this.exerciseWeight = '';
      this.exerciseRepeats = '';
    },
    filterSetsByExercise(exerciseId: string) { // отфильтруем подходы по ID упражнения
      const filteredSets: Set[] = [];

      this.exercisesUserDataSets.forEach(set => {
        if(set.exerciseId === exerciseId) {
          filteredSets.push(set)
        }
      });

      return filteredSets;
    }
  }
})
