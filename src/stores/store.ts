import type { Exercise, Set, Store} from "@/types/interface";
import { defineStore } from 'pinia'
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import { uid } from "uid";
import weekday from 'dayjs/plugin/weekday';
import useCollection, { CollectionStatus } from '@/composables/useCollection';
import getUser from '@/composables/getUser';

dayjs.locale('ru');
dayjs.extend(weekday);

const { addDocument, status } = useCollection('workouts');
const { user } = getUser(); // получаем актуального юзера

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({
    taskColor: '' || "3, 155, 229",
    workoutName: '',
    pickedExercises: [],
    exercisesUserDataSets: [],
    exerciseWeight: '',
    exerciseRepeats: '',
    exerciseLoad: null,
    initialDate: dayjs(),
    pickedDate: null,
    readWorkout: null,
    isEditMode: false
  } as Store),
  actions: {
    restoreDefaultsState () {
      this.taskColor = '' || "3, 155, 229";
      this.workoutName = '';
      this.pickedExercises = [];
      this.exercisesUserDataSets = [];
      this.exerciseWeight = '';
      this.exerciseRepeats = '';
      this.exerciseLoad = null;
      this.initialDate = dayjs();
      this.pickedDate = null;
      this.readWorkout = null;
    },
    saveSet(exerciseTitle: string, exerciseId: string, isSelected: boolean): void {
      const set: Set = {
        exerciseTitle: exerciseTitle,
        weight: this.exerciseWeight,
        repeats: this.exerciseRepeats,
        load: this.exerciseLoad?.color || '',
        setId: uid(10),
        exerciseId: exerciseId,
        isSelected: isSelected
      };

      this.exercisesUserDataSets.push(set);
      this.exerciseWeight = '';
      this.exerciseRepeats = '';
    },
    putToStorePickedExercises<T extends Exercise>(exercise: T): void {
      if(this.pickedExercises.includes(exercise)) { // удалим, если уже есть в массиве
        this.pickedExercises = this.pickedExercises.filter(el => el.id !== exercise.id);
      }
      else {
        this.pickedExercises.push(exercise)
      }
    },

    filterSetsByExercise (exerciseId: string): Set[] { // отфильтруем подходы по ID упражнения
      const filteredSets: Set[] = [];
      this.exercisesUserDataSets.forEach(set => {
        if(set.exerciseId === exerciseId) {
          filteredSets.push(set)
        }
      });
      return filteredSets;
    },

    deleteSetItem (clickedSetId: string): void {
      this.exercisesUserDataSets = this.exercisesUserDataSets.filter(set => {
        return set.setId !== clickedSetId
      });
    },

    async pushWorkoutToBase (): Promise<void> {
      if(!this.workoutName) return;

      await addDocument({
        workoutDate: this.pickedDate?.toDate() ?? null,
        workoutName: this.workoutName.slice(0, 20),
        color: this.taskColor,
        userId: user.value?.uid ?? null,
        userName: user.value?.displayName ?? null,
        exercisesUserDataSets: this.exercisesUserDataSets
      });

      switch(status.value) {
        // очищаем все
        case CollectionStatus.Ok:
          this.restoreDefaultsState()
          break;
        default: { break }
      }
    },
  }
})
