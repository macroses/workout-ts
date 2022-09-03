import { defineStore } from 'pinia'
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import type { Exercise } from "@/types/interface";

import weekday from 'dayjs/plugin/weekday';
dayjs.locale('ru');
dayjs.extend(weekday);

export const useStore = defineStore({
  id: 'mainStore',
  state: () => ({
    initialDate: dayjs(),

    taskColor: '' || "3, 155, 229",
    workoutName: '',
    pickedExercises: []
  })
})
