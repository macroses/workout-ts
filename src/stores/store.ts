import type {Exercise, Store, Workout} from "@/types/interface";
import { defineStore } from 'pinia'
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import weekday from 'dayjs/plugin/weekday';
import { CollectionStatus } from '@/types/collectionStatus';
import useCollection from "@/composables/useCollection";
import getUser from '@/composables/getUser';
import {uid} from "uid";

dayjs.locale('ru');
dayjs.extend(weekday);

const { addDocument, status } = useCollection('workouts');
const { user } = getUser(); // получаем актуального юзера

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({
    taskColor: '' || "3, 155, 229",
    workoutName: '',
    pickedExercises: [] || null,
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
      this.sets = null;
      this.exerciseLoad = null;
      this.initialDate = dayjs();
      this.pickedDate = null;
      this.readWorkout = null;
      this.isEditMode = false;
    },

    putToStorePickedExercises<T extends Exercise>(exercise: T): void {
      if(this.pickedExercises?.includes(exercise)) {
        this.pickedExercises = this.pickedExercises.filter(el => el.id !== exercise.id);
      }
      else {
        this.pickedExercises?.push(exercise)
      }
    },

    deleteSetFromExercise (clickedSetId: string) {
      this.pickedExercises?.forEach(exercise => {
        exercise.sets = exercise.sets.filter(set => set.setId !== clickedSetId)
      })
    },

    async pushWorkoutToBase (workout: Workout | null, newDate: Date | null): Promise<void> {
      if(!this.workoutName) return;

      if (!workout) { // если ничего не пришло, то забираем то, что есть в сторе
        await addDocument({
          workoutDate: this.pickedDate?.toDate() ?? null,
          workoutName: this.workoutName.slice(0, 20),
          color: this.taskColor ?? null,
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
      }

      else { // иначе берем из аргумента
        // при копировании тренировки
        // TODO: пока неприменимо
        await addDocument({
          workoutDate: newDate,
          workoutName: workout.workoutName,
          color: workout.color,
          userId: workout.userId,
          userName: workout.userName,
          id: uid(20),
          exercisesUserDataSets: workout.exercisesUserDataSets
        });
      }
    },
  }
})
