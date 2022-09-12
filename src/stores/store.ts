import type { Exercise, Store} from "@/types/interface";
import { defineStore } from 'pinia'
import dayjs from "dayjs";
import 'dayjs/locale/ru';
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
    exerciseWeight: '',
    exerciseRepeats: '',
    sets: null,
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
      this.exerciseWeight = '';
      this.exerciseRepeats = '';
      this.exerciseLoad = null;
      this.initialDate = dayjs();
      this.pickedDate = null;
      this.readWorkout = null;
    },

    putToStorePickedExercises<T extends Exercise>(exercise: T): void {
      if(this.pickedExercises?.includes(exercise)) {
        this.pickedExercises = this.pickedExercises.filter(el => el.id !== exercise.id);
      }
      else {
        this.pickedExercises?.push(exercise)
      }
    },

    async pushWorkoutToBase (): Promise<void> {
      if(!this.workoutName) return;

      await addDocument({
        workoutDate: this.pickedDate?.toDate() ?? null,
        workoutName: this.workoutName.slice(0, 20),
        color: this.taskColor,
        userId: user.value?.uid ?? null,
        userName: user.value?.displayName ?? null,
        exercisesUserDataSets: this.pickedExercises
      });

      switch(status.value) {
        // очищаем все
        case CollectionStatus.Ok:
          this.restoreDefaultsState();
          break;
        default: { break }
      }
    },
  }
})
