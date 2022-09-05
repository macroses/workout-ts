import type { Exercise, Set, Store} from "@/types/interface";
import { defineStore } from 'pinia'
import dayjs from "dayjs";
import 'dayjs/locale/ru';
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
    saveSet(exerciseTitle: string, exerciseId: string): void {
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
    putToStorePickedExercises<T extends Exercise>(exercise: T) {
      if(this.pickedExercises.includes(exercise)) { // удалим, если уже есть в массиве
        this.pickedExercises = this.pickedExercises.filter(el => el.id !== exercise.id);
      }
      else {
        this.pickedExercises.push(exercise)
      }
    },

    filterSetsByExercise(exerciseId: string): Set[] { // отфильтруем подходы по ID упражнения
      const filteredSets: Set[] = [];
      this.exercisesUserDataSets.forEach(set => {
        if(set.exerciseId === exerciseId) {
          filteredSets.push(set)
        }
      });
      return filteredSets;
    },

    deleteSetItem(clickedSetId: string): void {
      this.exercisesUserDataSets = this.exercisesUserDataSets.filter(set => {
        return set.setId !== clickedSetId
      });
    }
  }
})
